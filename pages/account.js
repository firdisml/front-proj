import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import { AccountProfile } from '../components/account/account-profile'
import { AccountProfileDetails } from '../components/account/account-profile-details'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, updateUserInfo } from '../actions/userActions'




const Account = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const { data } = userData

  const userUpdate = useSelector(state => state.userUpdate);
  const { status } = userUpdate

  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

  const callApi = useCallback(arg => {
    dispatch(getUserData(id))
    // return setter(args)
  }, [id])

  useEffect(() => {
    callApi();
    // dispatch(getUserData(id))
    return () => {
      //
    };
  }, [status,callApi]);

  const uploadImage = (image) => {
    // uid, email, phone, address, type, age, quialification, resume, status,image
    dispatch(updateUserInfo(id,
      "", "", "", "", "", "", "", "", image
    ))
  }

  const uploadResume = (resume) => {
    // uid, email, phone, address, type, age, quialification, resume, status,image
    dispatch(updateUserInfo(id,
      "", "", "", "", "", "", resume, "", ""
    ))
  }

  const uploadUserInfo = (values) => {
    console.log(values.subject)
    // uid, email, phone, address, type, age, quialification, resume, status,image
    dispatch(updateUserInfo(id,
      "", values.phone || "", values.address || "", "", values.age, values.education_level, "", "", "", values.username,values.subject
    ))
  }



  return (
    <>
      <Head>
        <title>
          Account
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 1 }}
            variant="h4"
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile
                name={data.username}
                address={data.address}
                age={data.age}
                image={data.image}
                setResume={(e) => uploadResume(e)}
                setSelectedImage={(e) => uploadImage(e)}

              />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails
                onSubmit={(e) => uploadUserInfo(e)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )

}

Account.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);

export default Account;
