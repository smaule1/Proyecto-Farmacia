import React from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function AmountCheckBox({ handleQuantity, CustomCheckBox, placeholder, value, setValue }) {  

  const handleIncrease = () => {
    const numberValue = Number(value);
    setValue(value === '' ? 1 : numberValue + 1);
  };
  
  const handleDecrease = () => {
    setValue(value - 1 === 0 ? '' : value - 1);
  };
  
  const handleChange = (e) => {
    const receivedValue = e.target.value;
    const numericValue = Number(receivedValue);

    if (receivedValue === '' || (Number.isInteger(numericValue) && numericValue >= 0)) {
      setValue(receivedValue);
    } else {
      setValue('');
    }
  };

  React.useEffect(() => {
    handleQuantity(value);
  }, [value]);

  return (
    <CustomCheckBox 
      id="outlined-required" 
      type="number" 
      value={value} 
      placeholder={placeholder}
      onChange={handleChange} 
      slotProps={{ 
        input: {
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
        }
      }} 
    />
  );
}

export default AmountCheckBox;
