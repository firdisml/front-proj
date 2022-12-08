import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import Controls from "../controls/Controls";
import {  Form } from '../useForm';





export const UserLoginDetail = (props) => {
    const { name, email, password, handleChange ,errors} = props

    return (

        <Grid container>
            <Grid item xs={12} md={12}>
                <Controls.Input
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    // error={errors.name}
                />

                <Controls.Input
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    // error={errors.email}
                />
                <Controls.Input
                    label="Password"
                    name="password"
                    type='password'
                    value={password}
                    onChange={handleChange}
                    // error={errors.password}
                />

            </Grid>


        </Grid>

     

    )
}
