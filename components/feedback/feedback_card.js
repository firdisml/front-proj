import { useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    TextareaAutosize
} from '@mui/material'

const states = [
    {
        value: 'Complaint',
        label: 'Complaint'
    },
    {
        value: 'Suggestions',
        label: 'Suggestions'
    },
    {
        value: 'Error',
        label: 'Error'
    },
    {
        value: 'Others',
        label: 'Others'
    }
];

export const FeedbackCard = ({ onSubmit, email }) => {
    const [values, setValues] = useState({
        message: '',
        type: 'Complaint',

    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const submit = () => {
        if (onSubmit && typeof onSubmit === "function") {
            onSubmit(values)
            setValues({
                message: '',
                type: 'Complaint',
            })
        }
    }

    return (
        <form
            autoComplete="off"
            noValidate

        >
            <Card>
                <CardHeader
                    subheader="We would love to hear your thoughts, suggestions, concerns, or problems with anything we can improve!"
                    title="Feedback Form"
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
                                disabled
                                fullWidth
                                label="Email Address"
                                name="email"
                                // onChange={handleChange}
                                required
                                value={email}
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
                                label="Feedback type"
                                name="type"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.type}
                                variant="outlined"
                            >
                                {states.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                id="standard-multiline-flexible"
                                label="Feedback"
                                name="message"
                                multiline
                                rows={4}
                                value={values.message}
                                onChange={handleChange}
                                variant="standard"
                            />
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
                        Submit
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
