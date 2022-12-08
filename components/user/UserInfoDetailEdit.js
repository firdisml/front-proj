import React from 'react'
import { Grid } from '@mui/material';
import Controls from "../controls/Controls";
import { Form } from '../useForm';

export const UserInfoDetailEdit = (props) => {
    const { age, phone, address, handleChange, errors ,name} = props

    return (

  
            <Grid container>
                <Grid item xs={12} md={12}>

                <Controls.Input
                        label="Name"
                        name="name"
                        // type='number'
                        value={name}
                        onChange={handleChange}
                        // error={errors.age}
                    />

                    <Controls.Input
                        label="Age"
                        name="age"
                        type='number'
                        value={age}
                        onChange={handleChange}
                        // error={errors.age}
                    />

                    <Controls.Input
                        label="Phone"
                        name="phone"
                        type='number'
                        value={phone}
                        onChange={handleChange}
                        // error={errors.phone}
                    />

                    <Controls.Input
                        label="Address"
                        name="address"
                        multiline
                        rows={4}
                        value={address}
                        onChange={handleChange}
                        // error={errors.address}
                    />

                </Grid>
            </Grid>


    )
}
