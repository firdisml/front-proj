import Head from 'next/head'
import { Box, Container, Button, Stack } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import Popup from '../components/Popup'
import { useSelector, useDispatch } from 'react-redux';
import { getEvent, updateEvent, addEvent } from '../actions/eventActions'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import UserAddMain from '../components/user/UserAddMain'
import { getChildList } from '../actions/userActions'
import UserEditMain from '../components/user/UserEditMain'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
const Childs = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('None');
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [childID, setChildId] = useState('');
  const firstRun = useRef(true)
  const didMount = useRef(false);
  const [open, setOpen] = React.useState(false);

  const [opMessage, setOpMessage] = useState('');
  const childList = useSelector(state => state.childList);
  const { data,loading } = childList

  const userSignUp = useSelector(state => state.userSignUp);
  const {  status:signUpStatus } = userSignUp;


  const userUpdate = useSelector(state => state.userUpdate);
  const { status } = userUpdate

  
  const onClickEvent = (e,type,row) => {
    // console.log(e)
    setOpenPopup2(true)
  };

  const onChangeSearch = (e) => {
    setSearch(e)
  };
  const openDialog = (e) => {
    setOpenPopup(true)
  };


  useEffect(() => {
    dispatch(getChildList(JSON.parse(localStorage.getItem('id'))))
    return () => {
      //
    };
  }, [signUpStatus]);


  useEffect(() => {
    if (!firstRun.current) {
        console.log('here')
        if (signUpStatus) {
          setOpenPopup(false)
            // router.push('/login');
        }
    } else {
        console.log('here')
        firstRun.current = false
    }
    return () => {
        //
    };
}, [signUpStatus]);



  function getSortData(items) {
    // console.log(items)
    let data2 = JSON.parse(JSON.stringify(items));

    const arr1 = data2.map(obj => {
      const myArray = obj.start_date.split("/");
      let day = parseInt(myArray[0]);
      let month = parseInt(myArray[1]);
      let year = parseInt(myArray[2]);
      let price = parseInt(obj.price) || 0;
      return { ...obj, date: new Date(year, month, day), price: price };
    });

    if (filter === 'None') {
      return data2
    }

    if (filter === 'Date') {
      const sortedAsc = arr1.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date),
      );
      return sortedAsc
    }
    if (filter === 'DateAsc') {
      const sortedAsc = arr1.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date),
      );
      return sortedAsc
    }

    if (filter === 'PriceAsc') {
      const sortedAsc = arr1.sort(
        (objA, objB) => objA.price - objB.price,
      );
      return sortedAsc
    }

    if (filter === 'Price') {
      const sortedAsc = arr1.sort(
        (objA, objB) => objB.price - objA.price,
      );
      return sortedAsc
    }

  }

  return (<>
    <Head>
      <title>
        Childs
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
        <Popup
          title="Add Child Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <UserAddMain
            addOrEdit={(e) => onClickAdd(e)} />
        </Popup>

        <Popup
          title="Edit Child Form"
          openPopup={openPopup2}
          setOpenPopup={setOpenPopup2}>
          <UserEditMain
          childId={childID}
             />
        </Popup>
        <TableToolbar
          icon={<EscalatorWarningIcon fontSize="large" />}
          title={'Child'}
          showAdd={true}
          onChangeSearch={onChangeSearch}
          onChange={openDialog}
        />

        <Box sx={{ mt: 3 }}>
          {/* <Collapse in={open}>
            {opMessage && <Alert
              severity={status ? "success" : "success"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {opMessage}
            </Alert>}
          </Collapse> */}
          <MemoTable
            data={data}
            column={['username', 'email', 'phone']}
            title={'Events'}
            search={search}
            showAvatar={true}
            showEdit={true}
            // showDelete={true}
            // showApprove={true}
            onChange={onClickEvent}
            action={true}
          // showApprove={true}
          />
        </Box>
      </Container>
    </Box>
  </>
  )
};

Childs.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);

export default Childs;
