import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as employeeService from "../services/employeeService";
import UploadAndDisplayImage from '../uplloadImage';


const genderItems = [
    { id: 'Pending', title: 'Pending' },
    { id: 'Approved', title: 'Approved' },
    { id: 'Rejected', title: 'Rejected' },
]

const initialFValues = {
    id: 0,
    pdf: null,
}

const ModulesView = (props) => {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {

        let temp = { ...errors }
        if ('pdf' in fieldValues)
            temp.pdf = fieldValues.pdf ? "" : "This field is required."

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
            addOrEdit(values, resetForm);
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
                <Grid item xs={4}>
                    <UploadAndDisplayImage
                        accept="application/pdf"
                        name='pdf'
                        selectedImage={values.pdf}
                        setSelectedImage={handleDateInputChange} />


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
        </Form >
    )
}

export default ModulesView
