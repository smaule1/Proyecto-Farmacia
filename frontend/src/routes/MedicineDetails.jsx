import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Container, styled, Button, Typography, Pagination, List, ListItem, ListItemButton, ListItemText, Box }from '@mui/material';
import Grid from '@mui/material/Grid2';
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
  width: '250',
  height: 50,
  textAlign: 'center',
  cursor: 'pointer',
}));

const StyledTypography = styled(Typography)(({ }) => ({
    boxShadow: '0 1px 5px #7749F8',
    border: '1px solid #7749F8',
    borderRadius: 10,
    width: '60%',
    height: 40,
    marginBottom: 10,
    margin: 'auto',
    padding: '8px 20px 20px',
}));

const CustomPagination = styled(Pagination)(({ }) => ({
  '& .MuiPaginationItem-root': {
    borderColor: '#7749F8',
  },
  '& .MuiPaginationItem-previousNext': {
    backgroundColor: '#7749F8',
  },
}));

function MedicineDetail() { 
  const navigate = useNavigate();
  const { id, user } = useParams();

  const [data, setData] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [page, setDataPage] = useState(1);
  const [activeItems, setActiveItems] = useState([]);
  
  const itemsPerPage = 2;
  const amountOfPages = Math.ceil(purchases.length / itemsPerPage);

  const {
    currentUser
  } = useContext(CurrentUserContext);

  const changePage = () => {
      const newActiveItems = purchases.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setActiveItems(newActiveItems);
  };

  const handlePage = (event, newPage) => {
    setDataPage(newPage);
  };

  function formatDate(fechaRecibida){
    const fecha = new Date(fechaRecibida);
    const diaConFormato = (fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate();  
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();
    return (año + '-' + mes + '-' + diaConFormato) ;
  }
  
  function sortPurchases(jsonPurchases) {
    //Patrón?
    let result = [];
    for(const element of jsonPurchases){
      if(element.medicamento === id){
        result.push(element);
      }
    }

    for (let i = 0; i < result.length; i++) {
      result[i].fecha = formatDate(result[i].fecha);
    }
    setPurchases(result);
  };

  async function canjear() {
    const date = new Date();
    let pharmacyId;

    const urlPharmacy = `/api/pharmacies/getPharmacyByName/${currentUser.nombreUsuario}`;
    try {
      //Fetches pharmacy id
      const pharmacyResponse = await fetch(urlPharmacy);
      if (!pharmacyResponse.ok) {
        throw new Error(`Response status: ${pharmacyResponse.status}`);
      }
      pharmacyId = await pharmacyResponse.json();
    } catch (error) {
      console.error(error.message);
      alert('Ocurrió un error inesperado');
    }

    const url = `/api/canjes/registrar`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          fecha: date, 
          cliente: user, 
          farmacia: pharmacyId._id,
        }),
        headers: myHeaders,
        credentials: 'include'
      });

      if (response.ok) {
        alert('Canje registrado correctamente');    
        navigate("/userState");              
      } else {
        setAlertMessage("Ningún campo puede quedar vacío");    
      }     

    } catch (error) {
      console.error(error.message);
      alert('Ocurrió un error inesperado');
    }
  };

  useEffect(() => {
    async function fetchPurchasesById() {
      const urlMedicine = `/api/medicines/getMedicineById/${id}`;
      const urlPurchases = `/api/purchases/getPurchasesByUser/${user}`;
      try {
        //Fetches Medicine
        const medicineResponse = await fetch(urlMedicine);
        if (!medicineResponse.ok) {
          throw new Error(`Response status: ${medicineResponse.status}`);
        }
        const jsonMedicine = await medicineResponse.json();
        setData(jsonMedicine);

        //Fetches Purchases
        const purchasesResponse = await fetch(urlPurchases);
        if (!purchasesResponse.ok) {
          throw new Error(`Response status: ${purchasesResponse.status}`);
        }
        const jsonPurchases = await purchasesResponse.json();
        
        
        //Fetches Pharmacy information
        for (const element of jsonPurchases){
          const urlFarmacia = `/api/pharmacies/getPharmacyById/${element.farmacia}`;
          const responseFarmacia = await fetch(urlFarmacia);
          if (!responseFarmacia.ok) {
            throw new Error(`Response status: ${responseFarmacia.status}`);
          }
          const jsonFarmacia = await responseFarmacia.json();
          element.farmacia = jsonFarmacia.nombre;
        }

        sortPurchases(jsonPurchases);

      } catch (error) {
        console.error(error.message);
      }
    };  
    fetchPurchasesById();
  }, []);

  useEffect(() => {
    changePage();
  }, [purchases, page]);

  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5, pb: 5}}>
        <h2>Detalles de medicina</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, textAlign: 'center'}}>
          <Grid size={6} >
            <Typography sx={{ fontSize: 32}}>{data.nombre || ""}</Typography>
            <Typography sx={{ fontSize: 14 }}>{data.descripcion || ""}</Typography>

            <Typography variant="body1" sx={{px: 2, pb: 1, pt: 5}}>Puntos que otorga: </Typography>
            <StyledTypography variant="body1">{data.puntosUnitarios || ""}</StyledTypography>

            <Typography variant="body1" sx={{px: 2, py: 1}}>Puntos requeridos:</Typography>
            <StyledTypography variant="body1">{data.puntosRequeridos || ""}</StyledTypography>
            
            <Typography variant="body1" sx={{px: 2, py: 1}}>Puntos disponibles:</Typography>
            <StyledTypography variant="body1" >98123</StyledTypography>

          </Grid>
        <Grid size={6}>
          <Typography variant="body1" sx={{px: 2, py: 1}}>Imagen:</Typography>
        </Grid>
      </Grid>

        <Grid container sx={{mt: 10, mx: 'auto', textAlign: 'center'}}>
          <Button variant="contained" onClick={canjear}
            sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none', m: 'auto', mb: 5 }}>Canjear</Button>
        </Grid>

        <hr></hr>
        <h4 style={{paddingTop: '30px'}}>Solicitudes de compra con estos medicamentos</h4>

        <Box>
          <Grid sx={{width: '100%'}}>
            <List variant="outlined" sx={{display: 'flex'}}>
              {(activeItems.length !== 0) ? activeItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton sx={{ borderRadius: '10px', p: 2, border: '2px solid rgba(163,159,170,.5)' }}>
                    <Grid container direction="row" spacing={2} sx={{ mx: 'auto' }}>
                      <Typography sx={{ fontSize: 16 }}>Fecha: {item.fecha}</Typography>
                      <Typography sx={{ fontSize: 16 }}>Número de Factura: {item.numeroFactura}</Typography>
                      <Typography sx={{ fontSize: 16 }}>Farmacia donde fue adquirido: {item.farmacia}</Typography>
                      <Typography sx={{ fontSize: 16 }}>Número de Canje: </Typography>
                    </Grid>
                    <Typography sx={{ px: 2, py: 1, borderRadius: 20, fontSize: 12, color: 'white'}}>{item.estado}</Typography>
                  </ListItemButton>
                </ListItem>
              )) : (<p>No hay solicitudes con este medicamento</p>)}
            </List>
          </Grid>
        </Box>

        <CustomPagination count={amountOfPages} page={page} variant="outlined" shape="rounded" siblingCount={0} boundaryCount={1}
          sx={{ mt: 5, display: 'flex', justifyContent: 'center' }} onChange={handlePage} />
        
      </Container> 
    </div>
  )
}

export default MedicineDetail
