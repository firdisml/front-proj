import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker ';
import Stack from '@mui/material/Stack';

export default function TimePickers(props) {
  const { name, onChange, value } = props;
  // const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    onChange({ name: name, value: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label={name || 'Date and Time'}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
