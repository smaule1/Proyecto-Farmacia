import { useState, useEffect, useRef } from 'react';
import { TextField, Container, styled, Button, Autocomplete, InputAdornment, Box }from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Grid from '@mui/material/Grid2';
import DatePickerRequest from '../components/DatePickerRequest';
import AmountCheckBox from '../components/AmountCheckBox';

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

function Purchase() {  
  const [farmacias, setFarmacias] = useState([
    { nombre: "Farmacia", _id: 1 },
    { nombre: "Increible", _id: 2 },
  ]);
  const [medicamentos, setMedicamentos] = useState([
    { nombre: "Farmacia Acia (Comedia)", _id: 1 },
    { nombre: "Farmacia Acia (Comedia)", _id: 2 },
    { nombre: "Farmacia Acia (Comedia)", _id: 3 },
    { nombre: "Farmacia Acia (Comedia)", _id: 4 },
  ]);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    async function fetchPharmacies() {
      const url = `/api/pharmacies/getAll`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setFarmacias(json);
      } catch (error) {
        console.error(error.message);
      }
    };

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
  
    fetchPharmacies();
    fetchMedicines();
  }, []);
  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Registrar una Compra</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, mx: 'auto', width: '100%', textAlign: 'center'}}>
          <Grid size={6} >
            <Autocomplete noOptionsText="No se encontraron resultados" options={farmacias}
             getOptionLabel={(option) => option.nombre} renderOption={(props, option) => (
              <li {...props} key={option._id}> {/* Esto es para manejar hijos repetidos (Aunque no debería suceder) */}
                {option.nombre}
              </li>)}
            renderInput={(params) => <StyledTextField {...params} placeholder='Farmacia'/>} />
          </Grid>
          <Grid size={6}>
            <Autocomplete noOptionsText="No se encontraron resultados" options={medicamentos}
              getOptionLabel={(option) => option.nombre} renderOption={(props, option) => (
                <li {...props} key={option._id}> {/* Esto es para manejar hijos repetidos (Aunque no debería suceder) */}
                  {option.nombre}
                </li>)}
              renderInput={(params) => <StyledTextField {...params} placeholder='Farmacia'/>} />
          </Grid>
          <Grid size={6}>
            <DatePickerRequest StyledTextField={StyledTextField}/>
          </Grid>
          <Grid size={6}>
           <AmountCheckBox CustomCheckBox={CustomCheckBox}/>
          </Grid>
          <Grid size={6}>
            <StyledTextField id="outlined-required" placeholder="Número de Factura"/>
          </Grid>
          <Grid size={6}>

            <StyledTextField onClick={handleIconClick} value={fileName} slotProps={{ input: { readOnly: true, startAdornment: (
              <InputAdornment position="start">
                <UploadFileIcon fontSize="large" sx={{color: 'black', mb: 0.5, cursor: 'pointer'}}/>
              </InputAdornment>)}}} 
               id="outlined-basic" placeholder="Imagen de Factura"/>

              <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{display: 'none'}}/>

          </Grid>
        </Grid>

        <Grid container sx={{mt: 10, mx: 'auto', width: 450, textAlign: 'center'}}>
          <Grid size={6}>
            <Button variant="contained" sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Registrar Compra</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" sx={{borderRadius: 3, width: 150, borderColor: '#7749F8', color: '#6610F2', fontWeight: 600, textTransform: 'none'}}>Cancelar</Button>
          </Grid>
        </Grid>
        
      </Container> 
    </div>
  )
}

export default Purchase
