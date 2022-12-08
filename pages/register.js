import Head from 'next/head'
import NextLink from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signUp, getUser } from '../actions/userActions'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
const Register = () => {
    const router = useRouter();
    const firstRun = useRef(true)
    const userSignUp = useSelector(state => state.userSignUp);
    const { loading, data, error, status } = userSignUp;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!firstRun.current) {
            console.log('here')
            if (status) {
                router.push('/login');
            }
        } else {
            console.log('here')
            firstRun.current = false
        }
        return () => {
            //
        };
    }, [data]);

    const signIn = () => {
        router.push('/login');
    }


    const formik = useFormik({

        initialValues: {
            username: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            type: '',
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(255)
                .required(
                    'Username is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required'),
            password: Yup
                .string()
                .min(6)
                .required(
                    'Password must be at least 6 characters'),
            email: Yup
                .string()
                .max(255)
                .required(
                    'Email is required'),
            phone: Yup
                .string()
                .max(255)
                .required(
                    'Phone is required'),
            address: Yup
                .string()
                .max(255)
                .required(
                    'Address is required'),
            type: Yup
                .string()
                .max(255)
                .required(
                    'Type is required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(signUp(values.email, values.password, values.username, values.phone, values.address, values.type, values.password, '19'));
            setSubmitting(false)
        }
    });

    return (
        <>
            <Head>
                <title>SIGN UP</title>
            </Head>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box
                component="main"
                style={{
                    // height: "100vh",
                    backgroundImage: `url(/static/images/background.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',

                }}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    background: '#FFFFFF',


                }}
            >


                <Container maxWidth="sm" sx={{
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    boxShadow: "20px 20px 60px #a3a3a3,-20px -20px 60px #ffffff",
                }}>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{
                            my: 3,
                        }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Sign Up
                            </Typography>

                        </Box>

                        <Box
                            sx={{
                                pb: 1,
                                pt: 3
                            }}
                        >

                        </Box>

                        <Grid

                            container
                            spacing={1}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    required
                                    error={Boolean(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="Username"
                                    margin="normal"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // type="name"
                                    value={formik.values.username}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                xs={6}
                                item
                            >
                                <FormControl error={Boolean(formik.touched.type && formik.errors.type)} required margin="normal" sx={{ minWidth: 120, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={formik.values.type}
                                        name="type"
                                        label="Type *"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}
                                        <MenuItem value={'Parent'}>Parent</MenuItem>
                                        <MenuItem value={'Tutor'}>Tutor</MenuItem>
                                    </Select>
                                    <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <TextField
                            required
                            error={Boolean(formik.touched.address && formik.errors.address)}
                            fullWidth
                            helperText={formik.touched.address && formik.errors.address}
                            label="Address"
                            margin="normal"
                            name="address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // type="name"
                            value={formik.values.address}
                            variant="outlined"
                        />

                        <TextField
                            required
                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                            fullWidth
                            helperText={formik.touched.phone && formik.errors.phone}
                            label="Phone"
                            margin="normal"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // type="phone"
                            value={formik.values.phone}
                            variant="outlined"
                        />

                        <TextField
                            required
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />


                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign Up Now
                            </Button>
                            <Grid

                                container
                                spacing={1}
                            >
                                <Grid
                                    item
                                >
                                    <Typography
                                        color="textPrimary"
                                        variant="overline"
                                    >
                                        Already have an Account?
                                    </Typography>
                                </Grid >
                                <Grid
                                    item

                                >
                                    <Button onClick={signIn} variant="text" style={{
                                        display: 'inline-block',
                                        padding: 0,
                                        minHeight: 0,
                                        minWidth: 0,
                                    }}>SIGN IN</Button>
                                </Grid >
                            </Grid >
                        </Box>

                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register


