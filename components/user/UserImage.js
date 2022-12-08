import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import UploadAndDisplayImage from '../uplloadImage';



export const UserImage = (props) => {
    const { image, handleChange } = props

    return (

        <Grid container>
            <Grid item xs={12} md={12}>
                <UploadAndDisplayImage
                    name='image'
                    selectedImage={image}
                    setSelectedImage={handleChange} />
            </Grid>
        </Grid>

    )
}
