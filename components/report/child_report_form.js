import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, TextField, Box, Avatar } from '@mui/material';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as employeeService from "../services/employeeService";
import UploadAndDisplayImage from '../uplloadImage';


const genderItems = [
    { id: 'bad', title: 'Bad' },
    { id: 'average', title: 'Average' },
    { id: 'good', title: 'Good' },
    { id: 'excellent', title: 'Excellent' },
]


const initialFValues = {
    id: '',
    performance: '',
    attendance:'',
    progress: '',
    learningSpeed: '',
    remark: '',
    mark: '',
    status: '',
}

export const ChildReportForm = (props) => {
    const { addOrEdit, recordForEdit ,userInfo} = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('performance' in fieldValues)
            temp.performance = fieldValues.performance ? "" : "This field is required."
        if ('attendance' in fieldValues)
            temp.attendance = fieldValues.attendance ? "" : "This field is required."
        if ('progress' in fieldValues)
            temp.progress = fieldValues.progress ? "" : "This field is required."
        if ('learningSpeed' in fieldValues)
            temp.learningSpeed = fieldValues.learningSpeed ? "" : "This field is required."
        if ('remark' in fieldValues)
            temp.remark = fieldValues.remark ? "" : "This field is required."
        if ('mark' in fieldValues)
            temp.mark = fieldValues.mark ? "" : "This field is required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."

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
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src={userInfo.image || "/static/images/avatars/default_profile.png"}
                            sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                            }}
                        />
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {userInfo.username}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                             {userInfo.phone}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {userInfo.address}
                        </Typography>
                    </Box>
                    {/* <img
                        style={{
                            borderRadius: 4,
                        }}
                        src={`/static/images/avatars/avatar_1.png`}
                        width={80}
                        height={80}
                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        loading="lazy"
                    /> */}

                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                        name="performance"
                        label="Performance"
                        value={values.performance}
                        onChange={handleInputChange}
                        error={errors.performance}
                    />
                    <Controls.Input
                        label="Attendance"
                        name="attendance"
                        value={values.attendance}
                        onChange={handleInputChange}
                        error={errors.attendance}
                    />
                    <Controls.Input
                        label="Progress"
                        name="progress"
                        value={values.progress}
                        onChange={handleInputChange}
                        error={errors.progress}
                    />
                    <Controls.Input
                        label="Learning Speed"
                        name="learningSpeed"
                        // type='number'
                        error={errors.learningSpeed}
                        value={values.learningSpeed}
                        onChange={handleInputChange}
                    />


                </Grid>
                <Grid item xs={4}>
                    <Controls.RadioGroup
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                    <Controls.Input
                        label="Total Marks"
                        name="mark"
                        type='number'
                        value={values.mark}
                        onChange={handleInputChange}
                        error={errors.mark}
                    />
                    <Controls.Input
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Remark"
                        name="remark"
                        multiline
                        rows={4}
                        value={values.remark}
                        error={errors.remark}
                        onChange={handleInputChange}
                        variant="outlined"
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
