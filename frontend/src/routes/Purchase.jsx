import React from 'react';
import { TextField, Container, styled, Button, Autocomplete, InputAdornment, IconButton }from '@mui/material';
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

const farmacias = [
  { label: 'Increible', id: 1 },
  { label: 'Farmacia', id: 2 },
];

const medicamentos = [
  { label: 'Increible', id: 1 },
  { label: 'Medicamento', id: 2 },
];


function Purchase() {  
  return (
    <div>      
        <Container maxWidth="lg" >
        <h2>Registrar una Compra</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, mx: 'auto', width: '100%', textAlign: 'center'}}>
          <Grid size={6} >
          <Autocomplete noOptionsText="No se encontraron resultados" options={farmacias} renderInput={(params) => <StyledTextField {...params} placeholder='Farmacia'/>} />
          </Grid>
          <Grid size={6}>
          <Autocomplete noOptionsText="No se encontraron resultados" options={medicamentos} renderInput={(params) => <StyledTextField {...params} placeholder='Medicamento'/>} />
          </Grid>
          <Grid size={6}>
            <DatePickerRequest StyledTextField={StyledTextField}/>
          </Grid>
          <Grid size={6}>
           <AmountCheckBox CustomCheckBox={CustomCheckBox}/>
          </Grid>
          <Grid size={6}>
            <StyledTextField id="outlined-required" placeholder="Múmero de Factura"/>
          </Grid>
          <Grid size={6}>
            <StyledTextField slotProps={{ input: { startAdornment: (
              <InputAdornment position="start">
                <UploadFileIcon fontSize="large" sx={{color: 'black', mb: 0.5}}/>
              </InputAdornment>
            )}}} id="outlined-basic" placeholder="Imagen de Factura"/>
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
