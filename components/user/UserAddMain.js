import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserImage } from './UserImage';
import { UserLoginDetail } from './UserLoginDetail';
import { UserInfoDetail } from './UserInfoDetail';
import { useForm, Form } from '../useForm';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../actions/userActions'

const initialFValues = {
  name: '',
  email: '',
  password: '',
  address: '',
  age: '',
  phone: '',
  image: '',
}


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tuition System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Children Image', 'Children Login Detail', 'Children Info'];
const theme = createTheme();

export default function UserAddMain(props) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UserImage image={values.image} handleChange={handleDateInputChange} />;
      case 1:
        return <UserLoginDetail
          name={values.name}
          email={values.email}
          password={values.password}
          // errors={errors}
          handleChange={handleInputChange} />;
      case 2:
        return <UserInfoDetail
          // errors={errors}
          age={values.age}
          phone={values.phone}
          address={values.address}
          handleChange={handleInputChange} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleSubmit = e => {
    dispatch(addUser(values.email, values.password,
      values.name, values.phone, values.address, 'Child', values.age,
      JSON.parse(localStorage.getItem('id')), values.image))
    // setActiveStep(activeStep + 1);
  }

  const validate = (fieldValues = values) => {

    let temp = { ...errors }
    for (let key in initialFValues) {
      if (key in fieldValues)
        temp[key] = fieldValues.description ? "" : `This field is required.`
    }
    // if (password in fieldValues)
    //   temp[password] = fieldValues.password ? "" : `This field is required.`
    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    handleDateInputChange
  } = useForm(initialFValues, true, validate);

  const handleNext = (e) => {
    if (activeStep === steps.length - 1) {
      handleSubmit(e)
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (

    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}

      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you.
            </Typography>
            <Typography variant="subtitle1">
              Your child name is {values.name}. We are adding your child account {values.email}.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Form onSubmit={handleSubmit}>
              {getStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  // type={activeStep === steps.length ? 'submit' : 'button'}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                </Button>
              </Box>
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
      {/* </Paper> */}
      {/* <Copyright /> */}
    </Container>

  );
}