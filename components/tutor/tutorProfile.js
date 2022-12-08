import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export const TutorProfile = (props) => {
    const { values, item_id } = props

    const openDialog = (e) => {
        if (onClickBook && typeof onClickBook === "function") {
            onClickBook(e);
        }
    }
    // column={['event', 'time', 'status', 'price', 'location']}
    return (

        <Grid container sx={{ paddingLeft: 6, paddingRight: 6 }}>
            <Grid item xs={2}>
                <img
                    style={{
                        borderRadius: 4,
                    }}
                    src={values.image || "/static/images/avatars/default_profile.png"}
                    width={120}
                    height={120}
                    // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    // alt={item.title}
                    loading="lazy"
                />
            </Grid>

            <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                    {values.username}
                </Typography>
                {/* <Rating name="read-only" value={values.rating || 0} readOnly /> */}
                <Stack direction="row" alignItems="center" gap={1}>
                    <PhoneIcon />
                    <Typography variant="body1" gutterBottom>
                        {values.phone}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <SchoolIcon />
                    <Typography variant="body1" gutterBottom>
                        {values.quialification || ''}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <PlaceIcon />
                    <Typography variant="body1" gutterBottom>
                        {values.address}
                    </Typography>
                </Stack>
            </Grid>


        </Grid>

    )
}
