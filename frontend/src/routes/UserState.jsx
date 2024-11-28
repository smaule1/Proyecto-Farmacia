import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Container, styled, Button, Typography, List, ListItem, ListItemButton, ListItemText, Pagination }from '@mui/material';
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

function UserState() { 
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const [activeItems, setActiveItems] = useState([]);
  const [page, setDataPage] = useState(1);
  const [email, setEmail] = useState('');
  
  const itemsPerPage = 3;
  const amountOfPages = Math.ceil(data.length / itemsPerPage);

  const {
    currentUser
  } = useContext(CurrentUserContext);

  const changePage = () => {
    const newActiveItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    setActiveItems(newActiveItems);
  };

  const handlePage = (event, newPage) => {
    setDataPage(newPage);
  };

  function calculateMedicineData(purchase, medicine, points){
    const globalPoints = purchase.cantidad * medicine.puntosUnitarios;
    const builtData = {
      name: medicine.nombre,
      description: medicine.descripcion,
      globalPoints: globalPoints,
      usedPoints: 0,
      availablePoints: points,
      medicineId: medicine._id,
    };
    setData(prevData => [...prevData, builtData]);
  }

  function renderInput(){
      return(
          <div>
              <hr></hr>
              <h4 style={{textAlign: 'center'}}>Medicamentos</h4>
              <Grid size={8}>
                <List variant="outlined" sx={{ display: 'flex', width: '100%'}}>
                  {activeItems.map((item, index) => (
                    <ListItem key = {index}>
                      <ListItemButton onClick={() => { navigate(`/userState/medicineDetail/${item.medicineId}/${user}`) }} sx={{ borderRadius: '10px', p: 2 }}>
                        <Grid container direction="column" spacing={2} sx={{ mx: 'auto' }}>
                          <Typography sx={{ fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.name}</Typography>
                          <Typography sx={{ fontSize: 14 }}>Descripción: {item.description}</Typography>
                          <Typography sx={{ fontSize: 16 }}> Cantidad de puntos acumulados hasta el momento: {item.globalPoints}</Typography>
                          <Typography sx={{ fontSize: 16 }}>Cantidad de puntos usados en canjes: {item.usedPoints}</Typography>
                          <Typography sx={{ fontSize: 16 }}>Cantidad de puntos disponibles: {item.availablePoints}</Typography>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  ))}      
                </List>
              </Grid>
                <CustomPagination count={amountOfPages} page={page} variant="outlined" shape="rounded" siblingCount={0} boundaryCount={1}
                sx={{ my: 5, display: 'flex', justifyContent: 'center' }} onChange={handlePage} />
          </div>
      );
  }
  
  async function checkUser(){
    setData([]);
    let jsonUser;
    let jsonPurchases;
    let jsonMedicines;
    let points = 0;

    const urlUser = `/api/users/getUserByEmail/${email}`;
      try {
        //Fetches User
        const response = await fetch(urlUser);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        jsonUser = await response.json();
        points = jsonUser[0].puntos;
        setUser(jsonUser[0]._id);

      } catch (error) {
        console.error(error.message);
      }

    const urlPurchase = `/api/purchases/medicineByUser/${jsonUser[0]._id}`;
      try {
        //Fetches Purchase
        const response = await fetch(urlPurchase);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        jsonPurchases = await response.json();

      } catch (error) {
        console.error(error.message);
      }

    for(const element of jsonPurchases){
      const urlMedicine = `/api/medicines/getMedicineById/${element.medicamento}`;
      try {
        //Fetches Medicine
        const response = await fetch(urlMedicine);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        jsonMedicines = await response.json();
        calculateMedicineData(element, jsonMedicines, points);
        
      } catch (error) {
        console.error(error.message);
      }
    }
  } 

  useEffect(() => {
    changePage();
  }, [data, page]);

  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5, paddingBottom: 5}}>
        <h2>Detalles de usuario</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, textAlign: 'center'}}>
          <Grid size={12}>
            <Typography variant="body1" sx={{px: 2, py: 1}}>Ingrese un email:</Typography>
            <StyledTextField id="outlined-basic" placeholder="Email" onChange={(newValue) => { setEmail(newValue.target.value)}}/>
          </Grid>
        </Grid>
        
        <Grid container sx={{mt: 10, mx: 'auto', textAlign: 'center'}}>
          <Button variant="contained" onClick={checkUser}
            sx={{borderRadius: 3, width: 220, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none', m: 'auto', mb: 5 }}>Buscar</Button>
        </Grid>

        {(activeItems.length > 0) && renderInput()}
        
      </Container> 
    </div>
  )
}

export default UserState
