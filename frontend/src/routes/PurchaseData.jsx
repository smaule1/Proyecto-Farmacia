import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, styled, Button, Typography, Box, Link }from '@mui/material';
import Grid from '@mui/material/Grid2';
import CurrentUserContext from '../Context';

const StyledTypography = styled(Typography)(({ }) => ({
    boxShadow: '0 1px 5px #7749F8',
    border: '1px solid #7749F8',
    borderRadius: 10,
    width: '90%',
    height: 40,
    marginBottom: 10,
    padding: '8px 20px 20px',
}));

function PurchaseData() { 
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState([]);
    
    const {
      currentUser
    } = useContext(CurrentUserContext);

    function backButton(){
      return(
          <Button onClick={() => {navigate(-1);}} variant="contained" sx={{m: 'auto', borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Volver</Button>
      );
   }

    function renderButtons(){
      return(
        <>
          <Grid size={6}>
            <Button variant="contained" sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Aprobar</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="contained" sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Reprobar</Button>
          </Grid>
        </>
      );
   }

    function renderInput(){
        return(
            <div>
                <Typography variant="body1" sx={{px: 2, py: 1}}>Usuario:</Typography>
                <StyledTypography variant="body1">{data.cliente}</StyledTypography>
            </div>
        );
    }
    useEffect(() => {
      async function fetchPurchasesById() {
        const url = `/api/purchases/getPurchaseById/${id}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const jsonPurchase = await response.json();

          const urlFarmacia = `/api/pharmacies/getPharmacyById/${jsonPurchase.farmacia}`;
          const responseFarmacia = await fetch(urlFarmacia);
          if (!responseFarmacia.ok) {
            throw new Error(`Response status: ${responseFarmacia.status}`);
          }
          const jsonFarmacia = await responseFarmacia.json();
          
          jsonPurchase.farmacia = jsonFarmacia.nombre;
          setData(jsonPurchase);
        } catch (error) {
          console.error(error.message);
        }
      };
    
      fetchPurchasesById();
    }, []);

  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Compra Realizada</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10}}>

          <Grid size={4} >
            <Typography variant="body1" sx={{px: 2, py: 1}}>Farmacia:</Typography>
            <StyledTypography variant="body1">{data.farmacia}</StyledTypography>

            <Typography variant="body1" sx={{px: 2, py: 1}}>Fecha:</Typography>
            <StyledTypography variant="body1">{data.fecha}</StyledTypography>

            <Typography variant="body1" sx={{px: 2, py: 1}}>Número de Factura:</Typography>
            <StyledTypography variant="body1">{data.numeroFactura}</StyledTypography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1" sx={{px: 2, py: 1}}>Medicamento:</Typography>
            <StyledTypography variant="body1">{data.medicamento}</StyledTypography>
            
            <Typography variant="body1" sx={{px: 2, py: 1}}>Cantidad:</Typography>
            <StyledTypography variant="body1" >{data.cantidad}</StyledTypography>

            {currentUser.rol !== 'Usuario' && renderInput()}

          </Grid>
          <Grid size={4}>
             <Typography variant="body1" sx={{px: 2, py: 1}}>Imagen de la factura:</Typography>
             <Box component="img" sx={{ height: 200, width: 200}} src="https://cdn-icons-png.flaticon.com/512/25/25666.png"></Box>
          </Grid>
        </Grid>

        <Grid container sx={{mt: 10, mx: 'auto', width: 450, textAlign: 'center'}}>
          {currentUser.rol !== 'Usuario' ? renderButtons() : backButton()}
        </Grid>
        
      </Container> 
    </div>
  )
}

export default PurchaseData
