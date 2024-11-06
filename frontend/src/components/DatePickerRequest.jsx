import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

function DatePickerRequest( {handleDate, StyledTextField} ) {  
    const [date, setDate] = useState('');

    const changeDate = (newValue) => {
      setDate(newValue)
      handleDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker 
          onAccept={changeDate}
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