import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function DatePickerRequest( {StyledTextField} ) {  
    const [date, setDate] = React.useState('');

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          onChange={(newValue) => {setDate(newValue);}}
          slots={{
            textField: (params) => (
              <StyledTextField {...params} placeholder="Fecha de compra" />
            ),
          }}
        />
      </LocalizationProvider>
    )
}
export default DatePickerRequest