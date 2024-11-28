import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ListItem, List, ListItemText, Typography, ListItemButton, Link}from '@mui/material';
import Grid from '@mui/material/Grid2';
import CurrentUserContext from '../Context';


function Home() {  
    const navigate = useNavigate();
    const [activeItems, setActiveItems] = useState([]);

    const {
        currentUser
    } = useContext(CurrentUserContext);

    const statusColors = {
        Pendiente: '#398EA1', 
        Aprobada: '#4DAF62', 
        Rechazada: '#923335' 
      };

    useEffect(() => {
        async function fetchPurchasesById() {
          const url = `/api/purchases/getLastPurchasesByUser/${currentUser._id}`;
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            setActiveItems(json);

          } catch (error) {
            console.error(error.message);
          }
        };
    
        async function fetchPendingPurchases() {
          const url = `/api/purchases/getLastPurchases`;
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setActiveItems(json);
            console.log(json)

          } catch (error) {
            console.error(error.message);
          }
        };
      
        (currentUser.rol === 'Usuario') ? fetchPurchasesById() : fetchPendingPurchases();

      }, []);

  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Compras recientes</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 3, mx: 'auto', width: '80%', textAlign: 'center'}}>
          <Grid size={12}>
            <List variant="outlined">
                {(activeItems.length !== 0) ? activeItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton  onClick={() => { navigate(`/userHistory/purchaseData/${item._id}`) }} sx={{ borderRadius: '10px', p: 2, border: '2px solid rgba(163,159,170,.5)'}}>
                            <ListItemText primary={"Numero de Factura: " + item.numeroFactura} />
                            <Typography sx={{px: 2, py: 1, borderRadius: 20, fontSize: 12, color: 'white', backgroundColor: statusColors[item.estado]}}>{item.estado}</Typography>
                        </ListItemButton>
                    </ListItem>
                )): (<p>No se encontraron compras</p>)}
            </List>
          </Grid>
        </Grid>
      </Container> 
    </div>
  )
}

export default Home
