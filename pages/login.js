import Head from 'next/head'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signin, getUser } from '../actions/userActions'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, Grid, Link, TextField, Typography ,Select} from '@mui/material'
import { Paper } from '@mui/material';
import Image from '../public/static/images/auth.jpeg';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error, login } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (login) {
            switch (userInfo.type) {
                case 'Admin':
                    router.push('/users');
                    break;
                case 'Child':
                    router.push('/timetable');
                    break;
                case 'Tutor':
                    router.push('/timetable');
                    break;
                case 'Parent':
                    router.push('/childs');
                    break;
            }

        }
        if (userInfo) {

        }
        return () => {
            //
        };
    }, [userInfo]);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .max(255)
                .required(
                    'email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: (values, { setSubmitting }) => {

            dispatch(signin(values.email, values.password));
            setSubmitting(false)
        }
    });

    const signUp=()=>{
        router.push('/register');
    }

    return (
        <>
            <Head>
                <title>Login </title>
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
                                Sign in
                            </Typography>

                        </Box>

                        <Box
                            sx={{
                                pb: 1,
                                pt: 3
                            }}
                        >

                        </Box>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="name"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <TextField
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
                                Sign In Now
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
                                        Need an Account?
                                    </Typography>
                                </Grid >
                                <Grid
                                    item

                                >
                                    <Button onClick={signUp} variant="text" style={{
                                        display: 'inline-block',
                                        padding: 0,
                                        minHeight: 0,
                                        minWidth: 0,
                                    }}>SIGN UP</Button>
                                </Grid >
                            </Grid >
                        </Box>

                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login


