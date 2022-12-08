import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import { AccountProfile } from '../components/account/account-profile'
import { AccountProfileDetails } from '../components/account/account-profile-details'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import { FeedbackCard } from '../components/feedback/feedback_card'
import { useSelector, useDispatch } from 'react-redux';
import { addFeedback } from '../actions/reportActions'
import CustomizedSnackbars from '../components/snackBar'

const Feedback = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onClickEvent = (e) => {
        // id, event, time, status, location, price
        dispatch(addFeedback(JSON.parse(localStorage.getItem('email')), e.message, e.type))
    }

    const email = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('email')) : ''
  

    return (
        <>
            <Head>
                <title>
                    Feedback
                </title>
            </Head>
            {/* <CustomizedSnackbars open={open} setOpen={setOpen(false)}/> */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Feedback
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <FeedbackCard
                                email={email}
                                onSubmit={(e) => onClickEvent(e)}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

Feedback.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
        {page}
    </DashboardLayout>
);

export default Feedback;
