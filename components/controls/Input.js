import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const { name, type,label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            type={type?type:''}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
