import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import Controls from '../controls/Controls';
import { Form } from '../useForm';

const edu_level = [
  { id: 'Primary', title: 'Primary' },
  { id: 'Lower Secondary', title: 'Lower Secondary' },
  { id: 'Vocational', title: 'Vocational' },
  { id: 'Upper Secondary Education', title: 'Upper Secondary Education' },
  { id: 'Undergraduate', title: 'Undergraduate' },
  { id: 'Graduate (Master)', title: 'Graduate (Master)' },
  { id: 'Graduate (Doctoral)', title: 'Graduate (Doctoral)' },
]

const subjects = [
  { id: 'Malay', title: 'Malay' },
  { id: 'English', title: 'English' },
  { id: 'History', title: 'History' },
  { id: 'Science', title: 'Science' },
  { id: 'Geography', title: 'Geography' },
  { id: 'Mathematics', title: 'Mathematics' },
  { id: 'Moral', title: 'Moral' },
]

export const AccountProfileDetails = (props) => {
  const { onSubmit } = props
  const [values, setValues] = useState({
    username: '',
    age: '',
    phone: '',
    address: '',
    education_level:'',
    subject:''
  });

  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const submit = () => {
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(values)
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate

    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {type === "Tutor" && <Form>
                <Controls.Select
                  name="education_level"
                  label="Education Level"
                  value={values.education_level}
                  onChange={handleChange}
                  options={edu_level}
                // error={errors.type}
                />
              </Form>}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {type === "Tutor" && <Form>
                <Controls.Select
                  name="subject"
                  label="Main subject"
                  value={values.subject}
                  onChange={handleChange}
                  options={subjects}
                // error={errors.type}
                />
              </Form>}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            onClick={submit}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
