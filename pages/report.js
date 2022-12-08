import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import { useSelector, useDispatch } from 'react-redux';
import { getPayment, getPaymentById, updateBooking } from '../actions/paymentAction'
import { DashboardLayout } from '../components/dashboard-layout'
import { ChildReportDetails } from '../components/report/child_report_details'
import { getReport } from '../actions/reportActions';
import { ChildReport } from '../components/report/child_report';
import Popup from '../components/Popup'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// const data2 = [
//   { name: 'max', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
//   { name: 'john', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
//   { name: 'jessie', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
//   // { name: 'sam', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
//   // { name: 'jenny', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
//   // { name: 'lisa', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
// ]
const Report = () => {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [values, setValues] = useState({});

  const report = useSelector(state => state.report);
  const { data,loading } = report


  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

  const onChangeSearch = (e) => {
    setSearch(e)
  };

  const onClickEvent = (e) => {
    setValues(e)
    setOpenPopup(true)
    // dispatch(updateEvent(row.id, type === 'Approve' ? 'received' : 'rejected'))
  }





  useEffect(() => {
    if (type === 'Parent') {
      dispatch(getReport(id))
    }else{
      dispatch(getReport(id,'Child'))
    }

    return () => {
      //
    };
  }, []);
  return (
    <>
      <Head>
        <title>
          Child Report
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
        <Container maxWidth="lg">

          <Popup
            title={type==='Child'?"My Report Card":"Child Report Card"}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <ChildReport
              done={e => setOpenPopup(false)}
              values={values}
            // childData={getChilddata(childData)}
            />
            {/* <EventForm
              addOrEdit={(e) => onClickAdd(e)} /> */}
          </Popup>

          <Grid
            container
            spacing={3}
          >
            {/* <ClassCard /> */}
            {data.map((a1, i) =>

              <Grid
                key={i}
                item
                lg={4}
                md={6}
                xs={12}
              >
                <ChildReportDetails values={a1} onClickDetail={e => { onClickEvent(a1) }} />
              </Grid>
            )}

          </Grid>
        </Container>
      </Box>
    </>
  )
}

Report.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);

export default Report;
