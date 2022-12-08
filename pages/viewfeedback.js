import Head from 'next/head'
import { Box, Container, Button, Stack } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import { useSelector, useDispatch } from 'react-redux';
import { getFeedback } from '../actions/reportActions'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const ViewFeedback = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const feedbacks = useSelector(state => state.feedbacks);
    const { data ,loading} = feedbacks

    const onChangeSearch = (e) => {
        setSearch(e)
    };

    useEffect(() => {
        dispatch(getFeedback())
        return () => {
            //
        };
    }, []);





    return (<>
        <Head>
            <title>
                View Feedback
            </title>
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
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >

            <Container maxWidth={false}>

                <TableToolbar
                    icon={<DataThresholdingIcon fontSize="large" />}
                    title={'Feedback'}
                    //   showAdd={true}
                    onChangeSearch={onChangeSearch}
                //   onChange={openDialog}
                />

                <Box sx={{ mt: 3 }}>

                    <MemoTable
                        data={data}
                        column={ ['email', 'message','type']}
                        title={'Events'}
                        search={search}
                        // showAvatar={true}
                        // showDelete={true}
                        // showApprove={true}
                        // onChange={onClickEvent}
                        action={false}
                    // showApprove={true}
                    />
                </Box>
            </Container>
        </Box>
    </>
    )
};

ViewFeedback.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined"?JSON.parse(localStorage.getItem('type')):''}>
        {page}
    </DashboardLayout>
);

export default ViewFeedback;
