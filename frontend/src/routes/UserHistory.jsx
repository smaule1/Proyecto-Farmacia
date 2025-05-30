import { useState, useEffect, useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, styled, Button, Select, MenuItem, ListItem, List, ListItemText, Box, Pagination, Typography, ListItemButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CurrentUserContext from '../Context';
import DatePickerRequest from '../components/DatePickerRequest';

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
  '& input': {
    textAlign: 'center',
  },
  boxShadow: '0 1px 5px #7749F8',
  borderRadius: 10,
  width: '100%',
  height: 50,
  marginBottom: 20,
}));

const CustomSelect = styled(Select)(({ }) => ({
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#7749F8',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7749F8',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7749F8',
  },

  '& .MuiSelect-select': {
    textAlign: 'center',
    padding: '30px',
  },

  boxShadow: '0 1px 5px #7749F8',
  borderRadius: 10,
  width: '100%',
  height: 50,
  marginBottom: 20,
}));

const CustomPagination = styled(Pagination)(({ }) => ({
  '& .MuiPaginationItem-root': {
    borderColor: '#7749F8',
  },
  '& .MuiPaginationItem-previousNext': {
    backgroundColor: '#7749F8',
  },
}));

function UserHistory() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [sequence, setSequence] = useState(0);
  const [state, setState] = useState('Pendiente');
  const [page, setDataPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [statusOrder, setstatusOrder] = useState({
    Pendiente: 1,
    Aprobado: 2,
    Rechazado: 3
  });

  const itemsPerPage = 4;
  const amountOfPages = Math.ceil(data.length / itemsPerPage);

  const {
    currentUser
  } = useContext(CurrentUserContext);

  const statusColors = {
    Pendiente: '#398EA1',
    Aprobada: '#4DAF62',
    Rechazada: '#923335'
  };

    const order = () => {
        data.sort(function (a, b) {
          return statusOrder[a.estado] - statusOrder[b.estado];
        });
        setData(data);
    };

    const changePage = () => {
        const newActiveItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        setActiveItems(newActiveItems);
    };

    const handleState = (newState) => {
        switch (newState){
            case 'Aprobado':
                setstatusOrder({
                    Pendiente: 2,
                    Aprobada: 1,
                    Rechazada: 3
                })   
                break;
            case 'Pendiente':
                setstatusOrder({
                    Pendiente: 1,
                    Aprobada: 2,
                    Rechazada: 3
                })
                break;
            default:
                setstatusOrder({
                    Pendiente: 2,
                    Aprobada: 3,
                    Rechazada: 1
                })
                break;
        }
        setState(newState);
    };

  const handlePage = (event, newPage) => {
    setDataPage(newPage);
  };

  const handleDate = (value) => {
    setSelectedDate(value);
  };

  const handleSequence = (value) => {
    const numericValue = Number(value.target.value);
    setSequence(numericValue);
  };

  const handleFiltros = () => {

    let filterData = filteredData;
    
    if (selectedDate !== null) {
      filterData = filteredData.filter(purchase => Date.parse(purchase.fecha) === Date.parse(selectedDate));
    }

    if (sequence !== 0 && filterData[0]) {
      filterData = filterData.filter(purchase => purchase.numeroFactura === sequence);
    }

    (filterData[0]) ? setData(filterData) : setData([]);
  };

  const deleteDate = () => {
    setSelectedDate(null);
  };

  useEffect(() => {
      async function fetchPurchasesById() {
        const url = `/api/purchases/getPurchaseByUser/${currentUser._id}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          setData(json);
          setFilteredData(json);

    } catch (error) {
      console.error(error.message);
    }
  };

  async function fetchPendingPurchases() {
    const url = `/api/purchases/getAll`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setFilteredData(json);


    } catch (error) {
      console.error(error.message);
    }
  };

  (currentUser.rol === 'Usuario') ? fetchPurchasesById() : fetchPendingPurchases();
    handleState('Pendiente');
  }, []);


  useEffect(() => {
    setData(filteredData);
    handleFiltros();
  }, [selectedDate, sequence]);


  useEffect(() => {
    order();
    changePage();
  }, [state, data, page]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <h2>Historial de Compras</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{ mt: 3, mx: 'auto', width: '100%', textAlign: 'center' }}>
          <Grid size={3} >
            <h4 style={{ marginBottom: 20 }}>Filtro de búsqueda</h4>

            {currentUser.rol === 'Usuario' && <StyledTextField onChange={handleSequence} placeholder="Número de Factura" />}

            <Grid size={12}>
              <DatePickerRequest date={selectedDate} handleDate={handleDate} StyledTextField={StyledTextField} />
              
              {selectedDate && <Button variant="contained" onClick={deleteDate}
              sx={{borderRadius: 3, width: 130, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none', mb: 2}}>Borrar Fecha</Button>}
            </Grid>

            <CustomSelect value={state} id="demo-simple-select" placeholder="Estado" onChange={(newValue) => { handleState(newValue.target.value) }} displayEmpty>
              <MenuItem value="" disabled>Estado</MenuItem>
              <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
              <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
              <MenuItem value={'Rechazado'}>Rechazado</MenuItem>
            </CustomSelect>
          </Grid>
          <Grid xs={1}>
            <Box sx={{ width: '2px', backgroundColor: 'grey.400', height: '100%' }} />

          </Grid>
          <Grid size={8}>
            <List variant="outlined">
              {(activeItems.length !== 0) ? activeItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => { navigate(`/userHistory/purchaseData/${item._id}`) }} sx={{ borderRadius: '10px', p: 2, border: '2px solid rgba(163,159,170,.5)' }}>
                    <ListItemText primary={"Numero de Factura: " + item.numeroFactura} />
                    <Typography sx={{ px: 2, py: 1, borderRadius: 20, fontSize: 12, color: 'white', backgroundColor: statusColors[item.estado] }}>{item.estado}</Typography>
                  </ListItemButton>
                </ListItem>
              )) : (<p>No se encontraron compras</p>)}
            </List>
          </Grid>
        </Grid>

        <CustomPagination count={amountOfPages} page={page} variant="outlined" shape="rounded" siblingCount={0} boundaryCount={1}
          sx={{ mt: 5, display: 'flex', justifyContent: 'center' }} onChange={handlePage} />

      </Container>
    </div>
  )
}

export default UserHistory
