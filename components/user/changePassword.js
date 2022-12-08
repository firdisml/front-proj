import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import Controls from "../controls/Controls";



export const ChangePassword = (props) => {
    const { password, handleChange,change } = props

    const onClickChange = () => {
        if (change && typeof change === "function") {
            change();
        }
    }

    return (

        <Grid container>
            <Grid item xs={12} md={12}>
                <Controls.Input
                    label="Password"
                    name="password"
                    type='password'
                    value={password}
                    onChange={handleChange}
                // error={errors.password}
                />


            </Grid>

            <Button
                onClick={e => onClickChange()}
                color="primary"
                variant="contained"
                type="submit"
            >
                Change
            </Button>

        </Grid>



    )
}
