import Head from 'next/head'
import { Box, Container, Button, Stack } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import { useSelector, useDispatch } from 'react-redux';
import { getPayment, getPaymentById, updateBooking } from '../actions/paymentAction'
import { getStudent } from '../actions/subjectActions'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Popup from '../components/Popup';
import { ChildReportForm } from '../components/report/child_report_form'
import { addReport } from '../actions/reportActions'
// import Backdrop from '@mui/material/Backdrop'
// import CircularProgress from '@mui/material/CircularProgress'
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
const Student = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState({});

    const student = useSelector(state => state.student);
    const { data, loading } = student
    const [openPopup, setOpenPopup] = useState(false);

    
    const reportUpdate = useSelector(state => state.reportUpdate);
    const { loading:loading2 } = reportUpdate

    const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
    const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

    const onChangeSearch = (e) => {
        setSearch(e)
    };

    const onClickEvent = (e, type, row) => {
        setOpenPopup(true)
        setSelectedStudent(row)
        // id, event, time, status, location, price
        // dispatch(updateEvent(row.id, type==='Approve'?'received':'rejected'))
    }

    const onClickAdd = (e) => {
      
       let para = {
            performance: e.performance,
            attendance: e.attendance,
            progress: e.progress,
            learningSpeed: e.learningSpeed,
            remark: e.remark,
            mark: e.mark,
            status: e.status,
            subject: selectedStudent.subject,
            image: selectedStudent.image,
            studentName: selectedStudent.username,
            studentEmail: selectedStudent.email,
            studentPhone: selectedStudent.phone,
            studentAddress: selectedStudent.address,
        }
        // tutorId,parentId,studentId,para
        dispatch(addReport(id, selectedStudent.parentId, selectedStudent.studentId, para))
        setOpenPopup(false)

    }


    useEffect(() => {
        dispatch(getStudent(id))
        return () => {
            //
        };
    }, []);




    return (<>
        <Head>
            <title>
                Students
            </title>
        </Head>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading }
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading||loading2}
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Popup
                    title="Child Report Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}>
                    <ChildReportForm
                        userInfo={selectedStudent}
                        addOrEdit={(e) => onClickAdd(e)} />
                </Popup>
                <TableToolbar
                    icon={<EscalatorWarningIcon fontSize="large" />}
                    title={'Student'}
                    //   showAdd={true}
                    // showUpdate={false}
                    // showExport={false}
                    // showImport={false}
                    // showAction={false}
                    onChangeSearch={onChangeSearch}
                //   onChange={openDialog}
                />

                <Box sx={{ mt: 3 }}>

                    <MemoTable
                        data={data}
                        column={['email', 'username', 'subject']}
                        title={'Payment'}
                        search={search}
                        // showDelete={true}

                        // showApprove={true}
                        showAvatar={true}
                        action={true}
                        onChange={onClickEvent}
                        showReport={true}
                    />
                </Box>
            </Container>
        </Box>
    </>
    )
};

Student.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
        {page}
    </DashboardLayout>
);

export default Student;
