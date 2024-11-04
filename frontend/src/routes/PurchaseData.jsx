import React from 'react';
import { TextField, Container, styled, Button, Autocomplete, InputAdornment, Typography }from '@mui/material';
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
  width: '100%',
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


function PurchaseData() {  
  return (
    <div>      
        <Container maxWidth="lg" sx={{mt: 5}}>
        <h2>Compra1</h2>
        <hr></hr>

        <Grid container spacing={5} sx={{mt: 10, mx: 'auto', width: '100%'}}>
          <Grid size={4} >
            <Typography variant="body1" sx={{px: 2, py: 1}}>Farmacia:</Typography>
            <Autocomplete noOptionsText="No se encontraron resultados" options={farmacias} 
            renderInput={(params) => <StyledTextField {...params} placeholder='Farmacia'/>} sx={{display: 'flex', justifyContent: 'center'}}/>

            <Typography variant="body1" sx={{px: 2, py: 1}}>Fecha:</Typography>
            <AmountCheckBox CustomCheckBox={CustomCheckBox}/>

            <Typography variant="body1" sx={{px: 2, py: 1}}>Número de Factura:</Typography>
            <DatePickerRequest StyledTextField={StyledTextField}/>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1" sx={{px: 2, py: 1}}>Medicamento:</Typography>
            <Autocomplete noOptionsText="No se encontraron resultados" options={medicamentos} renderInput={(params) => <StyledTextField {...params} placeholder='Medicamento'/>} />
            
            <Typography variant="body1" sx={{px: 2, py: 1}}>Cantidad:</Typography>
            <StyledTextField id="outlined-required" placeholder="Número de Factura"/>
            
            <Typography variant="body1" sx={{px: 2, py: 1}}>Usuario:</Typography>
            <StyledTextField slotProps={{ input: { startAdornment: (
                <InputAdornment position="start">
                    <UploadFileIcon fontSize="large" sx={{color: 'black', mb: 0.5}}/>
                </InputAdornment>
                )}}} id="outlined-basic" placeholder="Imagen de Factura"/>
          </Grid>
          <Grid size={4}>
            <DatePickerRequest StyledTextField={StyledTextField}/>
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

export default PurchaseData
