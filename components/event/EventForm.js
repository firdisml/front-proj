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
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'Concert',
    startDate: new Date(),
    startTime: new Date(),
    isPermanent: false,
}

export const EventForm = (props) => {
    const { addOrEdit, recordForEdit } = props
    const [selectedImage, setSelectedImage] = useState(null);
    const validate = (fieldValues = values) => {
        // description: "321"
        // id: 0
        // isPermanent: false
        // location: "312"
        // price: "3213"
        // startDate: Wed Aug 10 2022 15:06:56 GMT+0800 (Malaysia Time) {}
        // startTime: Wed Aug 10 2022 15:06:56 GMT+0800 (Malaysia Time) {}
        // status: "Approved"
        // title: "312"
        // type: "Concert"
        let temp = { ...errors }
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('location' in fieldValues)
            temp.location = fieldValues.location ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "This field is required."
        if ('startTime' in fieldValues)
            temp.startTime = fieldValues.startTime ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('type' in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required."

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
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        Event IMAGE
                    </Typography>
                    <UploadAndDisplayImage
                        name='image'
                        selectedImage={values.image}
                        setSelectedImage={handleDateInputChange} />

                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        name="title"
                        label="title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.Input
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                    <Controls.Input
                        label="Location"
                        name="location"
                        value={values.location}
                        onChange={handleInputChange}
                        error={errors.location}
                    />
                    <Controls.Input
                        label="Price"
                        name="price"
                        type='number'
                        value={values.price}
                        onChange={handleInputChange}
                    />


                </Grid>
                <Grid item xs={4}>


                    <Controls.RadioGroup
                        name="status"
                        label="Status"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.type}
                    />
                    <Controls.DatePicker
                        name="startDate"
                        label="Date"
                        value={values.startDate}
                        onChange={handleDateInputChange}
                    />
                    <Controls.TimePicker
                        name="startTime"
                        label="Time"
                        value={values.startTime}
                        onChange={handleDateInputChange}
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
