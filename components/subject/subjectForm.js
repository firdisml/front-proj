import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import { useSelector, useDispatch } from 'react-redux';
import { addClass } from '../../actions/subjectActions'


const subject = [
    { id: 'Malay', title: 'Malay' },
    { id: 'English', title: 'English' },
    { id: 'History', title: 'History' },
    { id: 'Science', title: 'Science' },
    { id: 'Geography', title: 'Geography' },
    { id: 'Mathematics', title: 'Mathematics' },
    { id: 'Moral', title: 'Moral' },
]

const days = [
    { id: 'Monday', title: 'Monday' },
    { id: 'Tuesday', title: 'Tuesday' },
    { id: 'Wednesday', title: 'Wednesday' },
    { id: 'Thursday', title: 'Thursday' },
    { id: 'Friday', title: 'Friday' },
    { id: 'Saturday', title: 'Saturday' },
    { id: 'Sunday', title: 'Sunday' },
]

const edu_level = [
    { id: 'Primary', title: 'Primary' },
    { id: 'Lower Secondary', title: 'Lower Secondary' },
    { id: 'Vocational', title: 'Vocational' },
    { id: 'Upper Secondary Education', title: 'Upper Secondary Education' },
    { id: 'Undergraduate', title: 'Undergraduate' },
    { id: 'Graduate (Master)', title: 'Graduate (Master)' },
    { id: 'Graduate (Doctoral)', title: 'Graduate (Doctoral)' },
]

const time = [
    { id: '0800-1000', title: '0800-1000' },
    { id: '1000-1200', title: '1000-1200' },
    { id: '1200-1400', title: '1200-1400' },
    { id: '1400-1600', title: '1400-1600' },
    { id: '1600-1800', title: '1600-1800' },
    { id: '1800-2000', title: '1800-2000' },
    { id: '2000-2200', title: '2000-2200' },
]

const initialFValues = {
    subject: 'Malay',
    education_level: 'Primary',
    time: '0800-1000',
    days: 'Monday',
}

export const SubjectForm = (props) => {
    const { addOrEdit, recordForEdit } = props
    const dispatch = useDispatch();
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            dispatch(addClass(JSON.parse(localStorage.getItem('id')), values.subject,
                values.education_level, values.time, values.days))
        }

    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // column={['event', 'time', 'status', 'price', 'location']}
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Select
                        name="subject"
                        label="Subject"
                        value={values.subject}
                        onChange={handleInputChange}
                        options={subject}
                    // error={errors.type}
                    />
                    <Controls.Select
                        name="education_level"
                        label="Education Level"
                        value={values.education_level}
                        onChange={handleInputChange}
                        options={edu_level}
                    // error={errors.type}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="days"
                        label="Days"
                        value={values.days}
                        onChange={handleInputChange}
                        options={days}
                    // error={errors.type}
                    />

                    <Controls.Select
                        name="time"
                        label="Time"
                        value={values.time}
                        onChange={handleInputChange}
                        options={time}
                    // error={errors.type}
                    />





                    {/* <div> */}
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>

                    {/* </div> */}
                </Grid>
            </Grid>
        </Form>
    )
}
