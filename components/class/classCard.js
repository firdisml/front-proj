import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';



export const ClassCard = (props) => {
    const { subject, level, price, time, days, image, onClickBook ,item_id} = props

    const openDialog = (e) => {
        if (onClickBook && typeof onClickBook === "function") {
            onClickBook(e);
        }
    }
    // column={['event', 'time', 'status', 'price', 'location']}
    return (

        <Grid container>
            <Grid item xs={1}>
                <img
                    style={{
                        borderRadius: 4,
                    }}
                    src={image || `/static/images/avatars/avatar_1.png`}
                    width={80}
                    height={80}
                    // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    // alt={item.title}
                    loading="lazy"
                />


            </Grid>
            <Grid item xs={8}>
                <Typography variant="subtitle2" gutterBottom>
                    {subject} - {level}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {days} {time}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6" gutterBottom>

                </Typography>

                <Typography variant="h6" gutterBottom>
                    ${price || 20}
                </Typography>



            </Grid>
            <Grid item xs={1}>
                <Button
                    onClick={() => { openDialog('ADD') }}
                    color="primary"
                    variant="contained"
                // type="submit"
                >
                    Add
                </Button>
            </Grid>
        </Grid>

    )
}
