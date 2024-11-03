import React from 'react';
import { InputAdornment, IconButton }from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function AmountCheckBox({CustomCheckBox}) {  
  const [value, setValue] = React.useState('');

  const handleIncrease = () => {
    const numberValue = Number(value);
    if(value === '' ? setValue(1): setValue(numberValue + 1));
  };
  
  const handleDecrease = () => {
    if (value - 1 == 0 ? setValue(''): setValue(value - 1));
  };
  
  const handleChange = (e) => {
    const receivedValue = e.target.value;
    const numericValue = Number(receivedValue);

    if (receivedValue === '' || (Number.isInteger(numericValue) && numericValue >= 0)) {
      setValue(receivedValue); // Solo actualiza el estado si es válido
    } else{
      setValue('');
    }
  };

  return (
    <CustomCheckBox id="outlined-required" type="number" value={value} placeholder="Cantidad"  onChange={handleChange} slotProps={{ input: {
        startAdornment: (
        <InputAdornment position="end">
            <IconButton onClick={handleDecrease} disabled={value <= 0}>
            <ArrowDropDownIcon />
            </IconButton>
        </InputAdornment>
        ),
        endAdornment: (
        <InputAdornment position="start">
            <IconButton onClick={handleIncrease}>
            <ArrowDropUpIcon />
            </IconButton>
        </InputAdornment>
        ),
    }}}/>
  )
}

export default AmountCheckBox
