import React from 'react';
import { TextField, Container, styled, Button, Select, MenuItem, ListItem, List, ListItemText, Box, Pagination, Typography, ListItemButton, Link}from '@mui/material';
import Grid from '@mui/material/Grid2';

const StyledTextField = styled(TextField)(({ }) => ({
    '& .MuiOutlinedInput-root':{
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
    '& input':{
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
    
    '& .MuiSelect-select':{
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

function userHistory() {  
    const [state, setState] = React.useState('');
    const [page, setDataPage] = React.useState(1);
    const itemsPerPage = 4;

    const testData = Array.from({ length: 20 }, (_, index) => `Compra ${index + 1}`);
    const amountOfPages = Math.ceil(testData.length / itemsPerPage);

    const activeItems = testData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleChange = (newState) => {
        setState(newState);
    };

    const handlePage = (event, newPage) => {
        setDataPage(newPage);
        console.log(page);
    };
  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Historial de Compras</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 3, mx: 'auto', width: '100%', textAlign: 'center'}}>
          <Grid size={3} >
            <h4 style={{marginBottom: 20}}>Filtro de búsqueda</h4>
            <StyledTextField id="outlined-required" placeholder="Número de Factura"/>
            <CustomSelect value={state} id="demo-simple-select" placeholder="Estado" onChange={(newValue) => {handleChange(newValue.target.value)}} displayEmpty>
                <MenuItem value="" disabled>Estado</MenuItem>
                <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
                <MenuItem value={'Rechazado'}>Rechazado</MenuItem>
            </CustomSelect>
            <Button variant="contained" sx={{borderRadius: 3, width: 100, backgroundColor: '#7749F8',  fontWeight: 600, textTransform: 'none'}}>Aplicar</Button>
          </Grid>
          <Grid xs={1}>
          <Box sx={{ width: '2px',  backgroundColor: 'grey.400', height: '100%'}}/>
          
        </Grid>
          <Grid size={8}>
            <List variant="outlined">
                {activeItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton  component={Link} to={`/userHistory/purchaseData/Compra${index + 1}`} sx={{ borderRadius: '10px', p: 2, border: '2px solid rgba(163,159,170,.5)'}}>
                            <ListItemText primary={item} />
                            <Typography sx={{px: 2, py: 1, borderRadius: 20, fontSize: 12, color: 'white', backgroundColor: '#4DAF62'}}>Pendiente</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>

        <CustomPagination count={amountOfPages} page={page} variant="outlined" shape="rounded" siblingCount={0} boundaryCount={1} 
        sx={{mt: 5, display: 'flex', justifyContent: 'center'}} onChange={handlePage}/>
        
      </Container> 
    </div>
  )
}

export default userHistory
