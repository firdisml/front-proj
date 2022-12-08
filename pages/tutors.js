import Head from 'next/head'
import { Box, Container, Button, Stack, Grid } from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEvent, updateEvent, addEvent } from '../actions/eventActions'
import ImgMediaCard from '../components/tutor/tutorCardview'
import { getTutorList } from '../actions/userActions'
import SelectedTutor from '../components/tutor/selectedView';
import Popup from '../components/Popup';
import Checkout from '../components/payment/checkout';
import { getChildList } from '../actions/userActions'
import TutorRating from '../components/tutor/tutorRating';
import Controls from '../components/controls/Controls';
import { Form } from '../components/useForm';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

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

const states = [
    { id: 'Selangor', title: 'Selangor' },
    { id: 'Johor', title: 'Johor' },
    { id: 'Kedah', title: 'Kedah' },
    { id: 'Kelantan', title: 'Kelantan' },
    { id: 'Melaka', title: 'Melaka' },
    { id: 'Negeri Sembilan', title: 'Negeri Sembilan' },
    { id: 'Pahang', title: 'Pahang' },
    { id: 'Perak', title: 'Perak' },
    { id: 'Perlis', title: 'Perlis' },
    { id: 'Pulau Pinang', title: 'Pulau Pinang' },
    { id: 'Sabah', title: 'Sabah' },
    { id: 'Sarawak', title: 'Sarawak' },
    { id: 'Terengganu', title: 'Terengganu' },
    { id: 'Kuala Lumpur', title: 'Kuala Lumpur' },
    { id: 'Labuan', title: 'Labuan' },
    { id: 'Putrajaya', title: 'Putrajaya' },
]

const Tutors = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('None');

    const childList = useSelector(state => state.childList);
    const { data: childData, loading: loading2 } = childList

    const [selected, setSelected] = useState({});

    const tutorList = useSelector(state => state.tutorList);
    const { data } = tutorList

    const bookingUpdate = useSelector(state => state.bookingUpdate);
    const { loading } = bookingUpdate

    const [openPopup, setOpenPopup] = useState(false);

    const eventUpdate = useSelector(state => state.eventUpdate);
    const { status } = eventUpdate


    const [paymentInfo, setPaymentInfo] = useState({});

    const [values, setValues] = useState({
        education_level: '',
        subject: '',
        state: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    function getFilterData(data) {

        if (!values.education_level && !values.subject && !values.state) {
            return data
        }

        let tempData = []

        data.forEach(a1 => {
            let valid = true
            if (values.subject) {
                if (a1.subject !== values.subject) {
                    valid = false
                }
            }

            if (values.state) {
                if (!a1.address.toLowerCase().includes(values.state.toLowerCase())) {
                    valid = false
                }
            }


            if (values.education_level) {
                if (a1.quialification !== values.education_level) {
                    valid = false
                }
            }


            if (valid) {
                tempData.push(a1)
            }

        })



        console.log(tempData)
        return tempData

    }



    const onClickBook = (e, id) => {
        setSelected({ id: id, type: e })
    }



    useEffect(() => {
        dispatch(getChildList(JSON.parse(localStorage.getItem('id'))))
        dispatch(getTutorList())
        return () => {
            //
        };
    }, [status]);

    const getChilddata = (e) => {
        let array = []
        e.forEach(a1 => {
            array.push(
                { id: a1.id, title: a1.username },
            )
        })
        return array
    }


    const onClickAdd = (e) => {
        if (childData.length > 0) {
            setPaymentInfo(e)
            setOpenPopup(true)
        } else {
            alert("At least one children is needed")
        }


    }


    const onCLickBack = () => {
        setSelected({})

    }


    const getContent = () => {

        if (selected.type === 'BOOK') {
            return (
                <SelectedTutor
                    id={selected.id}
                    onClickAdd={onClickAdd}

                    back={onCLickBack} />
            )

        } else if (selected.type === 'RATE') {

            return (
                <TutorRating

                    id={selected.id}
                    onClickAdd={onClickAdd}
                    back={onCLickBack} />
            )

        } else {
            return (
                <Box sx={{
                    mt: -2,
                    rowGap: 1,
                }}>
                    <Grid
                        container
                        sx={{ columnGap: 0 }}
                    >

                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Form>
                                <Controls.Select
                                    name="education_level"
                                    label="Education Level"
                                    value={values.education_level}
                                    onChange={handleChange}
                                    options={edu_level}
                                // error={errors.type}
                                />
                            </Form>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Form>
                                <Controls.Select
                                    name="subject"
                                    label="Subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                    options={subjects}
                                // error={errors.type}
                                />
                            </Form>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Form>
                                <Controls.Select
                                    name="state"
                                    label="State"
                                    value={values.state}
                                    onChange={handleChange}
                                    options={states}
                                // error={errors.type}
                                />
                            </Form>
                        </Grid>
                    </Grid>



                    <Grid
                        sx={{ mt: 1 }}
                        container
                        spacing={2}
                    >

                        {getFilterData(data).map((a1, i) =>
                            <Grid
                                key={i + 'tutor1'}
                                item
                                xs={3}
                            >
                                <ImgMediaCard
                                    level={a1.quialification}
                                    id={a1.id}
                                    name={a1.username}
                                    description={a1.address}
                                    image={a1.image}
                                    onClickBook={onClickBook}

                                />

                            </Grid>
                        )}
                    </Grid>
                </Box >
            )
        }

    }



    return (<>
        <Head>
            <title>
                TUTORS
            </title>
        </Head>

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading || loading2}
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >


            <Popup
                title="Timeslot"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <Checkout
                    paymentInfo={paymentInfo}
                    childData={getChilddata(childData)} />
                {/* <EventForm
              addOrEdit={(e) => onClickAdd(e)} /> */}
            </Popup>
            <Container maxWidth={false}>
                <Box sx={{ mt: 0 }}>
                    {getContent()}

                </Box>
            </Container>
        </Box>
    </>
    )
};

Tutors.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
        {page}
    </DashboardLayout>
);

export default Tutors;
