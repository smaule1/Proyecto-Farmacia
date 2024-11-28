import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid2';
import AmountCheckBox from '../components/ModifiableCheckBox.jsx';
import { TextField, Container, styled, Button, Autocomplete }from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../Context';


const StyledTextField = styled(TextField)(({ }) => ({
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#7749F8',
        borderRadius: '10px',
        height: 55,
      },
      '&:hover fieldset': {
        borderColor: '#7749F8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7749F8',
      },
  },
  '& input::placeholder':{
    paddingLeft: 5,
  },
  
  boxShadow: '0 1px 5px #7749F8',
  borderRadius: 10,
  width: '60%',
  height: 50,
  textAlign: 'center',
  cursor: 'pointer',
}));

const CustomCheckBox = styled(StyledTextField)({
  '& input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input::-webkit-outer-spin-button': {
    display: 'none',
  },
  '& input':{
    textAlign: 'center',
  },
});

function Medicine() {
  const navigate = useNavigate();
  const [selectedMedicine, setSelectedMedicina] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [totalPuntos, setTotalPuntos] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [medicamentos, setMedicamentos] = useState([]);
  const [estados] = useState([
    { nombre: "Permitido", _id: 1 },
    { nombre: "Prohibido", _id: 2 },
  ]);
  // States necesarios
  const [alertMessage, setAlertMessage] = useState('');

  const {
    currentUser
  } = useContext(CurrentUserContext);

  const handleTotal = (value) => {
    const numericValue = Number(value);
    setTotalPuntos(numericValue);
  };
  
  const handlePuntos = (value) => {
    const numericValue = Number(value);
    setPuntos(numericValue);
  };

  function backButton(){
    return(
        <Button onClick={() => {navigate(-1);}} variant="contained" sx={{m: 'auto', borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Volver</Button>
    );
  }

  const changeValues = (value) => {
    if (!value) return;
    setSelectedEstado(value.estado || NULL);
    setTotalPuntos(Number(value.puntosRequeridos) || 0);
    setPuntos(Number(value.puntosUnitarios) || 0);
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    setAlertMessage('');

    if(selectedMedicine == null) {
      setAlertMessage("Error: Debe seleccionar una medicina.");
      return;
    }
    if(selectedEstado == null) {
      setAlertMessage("Error: Debe seleccionar un estado.");
      return;
    }
    if(selectedMedicine == null) {
      setAlertMessage("Error: Debe seleccionar una medicina.");
      return;
    }
    if (selectedEstado.nombre != "Prohibido") {
      if(totalPuntos <= 0) {
        setAlertMessage("Error: Debe especificar la cantidad de puntos necesarios.");
        return;
      }
      if(puntos <= 0) {
        setAlertMessage("Error: Debe especificar la cantidad de puntos unitarios.");
        return;
      }

      selectedMedicine.puntosRequeridos = totalPuntos
      selectedMedicine.puntosUnitarios = puntos
    }

    selectedMedicine.estado = selectedEstado
    await setBeneficio()
  };

  async function setBeneficio() {
    const url = `/api/medicines/setBeneficio`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ id:selectedMedicine._id, estado:selectedEstado.nombre, totalPuntos:totalPuntos, puntos:puntos}),
        headers: myHeaders,
        credentials: 'include'
      });

      if (response.ok){
        setAlertMessage('El medicamento se actualizó exitosamente.')
      } else {
        const errorMessage = await response.text();
        setAlertMessage(errorMessage);
      }
    } catch (error) {
      console.error(error.message);
      setAlertMessage('Ocurrió un error inesperado.');
    }
  };

  useEffect(() => {
    async function fetchMedicines() {
      const url = `/api/medicines/getAll`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setMedicamentos(json);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchMedicines();
  }, []);

return (
  <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Agregar o eliminar medicamento al beneficio</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, mx: 'auto', width: '100%', textAlign: 'center'}}>
          <Grid size={6}>
            <Autocomplete noOptionsText="No se encontraron resultados" options={medicamentos}
             getOptionLabel={(option) => option.nombre} renderOption={(props, option) => (
              <li {...props} key={option._id}> {/* Esto es para manejar hijos repetidos (Aunque no debería suceder) */}
                {option.nombre}
              </li>)}
            renderInput={(params) => <StyledTextField {...params} placeholder='Medicamento'/>} onChange={(event, newValue) => {setSelectedMedicina(newValue); changeValues(newValue)}} />
          </Grid>
          <Grid size={6}>
            <Autocomplete noOptionsText="No se encontraron resultados" options={estados}
              getOptionLabel={(option) => option.nombre || selectedEstado} renderOption={(props, option) => (
                <li {...props} key={option._id}> {/* Esto es para manejar hijos repetidos (Aunque no debería suceder) */}
                  {option.nombre}
                </li>)}
              renderInput={(params) => <StyledTextField {...params} placeholder='Estado'/>} onChange={(event, newValue) => setSelectedEstado(newValue)} value={selectedEstado || null}/>
          </Grid>
          <Grid size={6}>
           <AmountCheckBox handleQuantity={handleTotal} CustomCheckBox={CustomCheckBox} placeholder="Puntos Necesarios" 
            value={totalPuntos || ''} setValue={setTotalPuntos}/>
          </Grid>
          <Grid size={6}>
           <AmountCheckBox handleQuantity={handlePuntos} CustomCheckBox={CustomCheckBox} placeholder="Puntos por Unidad" 
            value={puntos || ''} setValue={setPuntos}/>
          </Grid>
        </Grid>

        <Grid container sx={{mt: 10, mx: 'auto', width: 450, textAlign: 'center'}}>
          <Grid size={6}>
            <Button variant="contained" onClick={handleUpdate} sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Actualizar</Button>
          </Grid>
          <Grid size={6}>
            {backButton()}
          </Grid>
        </Grid>

        <div className="mt-3">
          {alertMessage && <div className="alert alert-danger row h-20" role="alert">{alertMessage}</div>}
        </div>
        
      </Container> 
    </div>
)
}

export default Medicine;