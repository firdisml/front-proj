import React, { useEffect, useState, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './addressForm';
import PaymentForm from './paymentForm';
import Review from './review';
import SelectChildren from './selectChildren';
import { useSelector, useDispatch } from 'react-redux';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import { addPayment } from '../../actions/paymentAction';
import { getMonth } from 'date-fns';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        A+Class Home Tuition
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Child Detail', 'Payment details', 'Review your order'];

const initialFValues = {
  child: '',
  subscription: '',
  cardName: '',
  cardNum: '',
  cardExp: '',
  cardCvv: '',
}

const theme = createTheme();

export default function Checkout({ childData, paymentInfo }) {
  const firstRun = useRef(true)
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectChildren childData={childData} child={values.child}
          subscription={values.subscription} onChange={handleInputChange} />;
      case 1:
        return <PaymentForm values={values} onChange={handleInputChange} />;
      case 2:
        return <Review paymentDetail={values} paymentInfo={paymentInfo}
          totalPayment={getTotal(paymentInfo.price, values.subscription)} onChange={handleInputChange} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {

      let childId


      // var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      // var mastPattern = /^(?:5[1-5][0-9]{14})$/;
      // var amexPattern = /^(?:3[47][0-9]{13})$/;
      // var discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
      var cvvPattern = /^[0-9]{3,4}$/;
      var expiredPattern = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/;


      // var isVisa = visaPattern.test(values.cardNum) === true;
      // var isMast = mastPattern.test(values.cardNum) === true;
      // var isAmex = amexPattern.test(values.cardNum) === true;
      // var isDisc = discPattern.test(values.cardNum) === true;
      var isCvv = cvvPattern.test(values.cardCvv) === true;
      var isExp = expiredPattern.test(values.cardExp) === true;

      childData.forEach(a1 => {
        if (a1.title === values.child) {
          childId = a1.id
        }
      })


      if (!childId) {
        alert("Please select child!")
        return
      }

      if (!values.cardNum) {
        alert("Please enter a valid card number.");
        return
      }

      if (!isCvv) {
        alert("Please enter a valid cvv.");
        return
      }

      if (!isExp) {
        alert("Please enter a valid expired date.");
        return
      }


      if (!values.child) {
        alert("Please select child!")
        return
      }

      if (!values.subscription) {
        alert("Please select subscription plan!")
        return
      }

      if (!values.cardName || !values.cardNum || !values.cardExp || !values.cardCvv) {
        alert("Please key in all payment information!")
        return
      }


      const data = {
        studentId: childId,
        subscription: values.subscription,
        // months: getMonth(values.subscription),
        totalPrice: getTotal(paymentInfo.price, values.subscription),
        classId: paymentInfo.item_id,
        subject: paymentInfo.subject,
        price: paymentInfo.price,
        tutorId: paymentInfo.id
      }
      console.log(data)
      dispatch(addPayment(JSON.parse(localStorage.getItem('id')), data))
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  function getTotal(price, sub) {

    try {
      switch (sub) {
        case '1 month':
          return parseInt(price)
        // break
        case '2 months':
          return parseInt(price) * 2
        // break
        case '3 months':
          return parseInt(price) * 3
        // break
        case '6 months':
          return parseInt(price) * 6
        // break
        case '1 year':
          return parseInt(price) * 12
        // break
        default:
          return 0

      }
    } catch (e) {
      console.log(e)
      return 0
    }


  }



  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('subject' in fieldValues)
      temp.subject = fieldValues.subject ? "" : "This field is required."
    if ('education_level' in fieldValues)
      temp.education_level = fieldValues.education_level ? "" : "This field is required."
    if ('startTime' in fieldValues)
      temp.startTime = fieldValues.startTime ? "" : "This field is required."

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
              Thank you for your order.
            </Typography>
            {/* <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </React.Fragment>
      {/* </Paper> */}
      <Copyright />
    </Container>

  );
}