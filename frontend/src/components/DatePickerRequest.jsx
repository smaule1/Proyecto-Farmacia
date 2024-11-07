import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

function DatePickerRequest( {date, handleDate, StyledTextField} ) {  
    const today = new Date(); // Obtener la fecha actual

    const changeDate = (newValue) => {
      handleDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker 
          value = {date}
          onAccept={changeDate}
          maxDate={today}
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