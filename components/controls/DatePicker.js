import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';

export default function DatePickers(props) {

  const { value, name, onChange, ...other } = props;

  // const {  name,onChange, ...other } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>

        <DesktopDatePicker
          label="For desktop"
          value={value}
          nmae={name}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            onChange({ name: name, value: newValue });
            // setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

      </Stack>
    </LocalizationProvider>
  );
}
