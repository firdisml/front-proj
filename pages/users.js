import Head from 'next/head'
import { Box, Container } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import Popup from '../components/Popup'
import { useSelector, useDispatch } from 'react-redux';
import { EventForm } from '../components/event/EventForm'
import { getUserList, deleteUser, addUser } from '../actions/userActions'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import UserAddMain from '../components/user/UserAddMain'
import { getTutorList2, updateUserInfo } from '../actions/userActions'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AccountProfileDetails } from '../components/account/account-profile-details'
import StudentList from '../components/children/studentList'
// import { UserForm } from '../components/user/userForm'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import GroupIcon from '@mui/icons-material/Group';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Users = () => {
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('');
  const [opMessage, setOpMessage] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup4, setOpenPopup4] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [value, setValue] = React.useState(0);
  const userList = useSelector(state => state.userList);
  const { data,loading } = userList

  const userUpdate = useSelector(state => state.userUpdate);
  const { status } = userUpdate

  const tutorList = useSelector(state => state.tutorList);
  const { data: data2 } = tutorList

  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

  const openDialog = (e) => {
    setOpenPopup(true)
  };



  const onChangeSearch = (e) => {
    setSearch(e)
  };

  const onClickEvent = (e, type, row) => {
    // id, event, time, status, location, price
    if (confirm('Are you sure you want to delete this user?')) {
      if(row.type==='Admin'){
        alert("Cannot delete admin account!")
      }else{
        dispatch(deleteUser(row.uid))
      }
    
      // console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      // console.log('Thing was not saved to the database.');
    }
  }

  const onClickEvent2 = (e, type, row) => {
    if (type === 'Approve') {
      dispatch(updateUserInfo(row.id, '', '', '', '', '', '', '', 'Active', '', ''))
    } else if (type === 'Disprove') {
      dispatch(updateUserInfo(row.id, '', '', '', '', '', '', '', 'Inactive', '', ''))
    } else if (type === 'Edit') {
      setOpenPopup2(true)
      setSelectedId(row.id)
    } else if (type === 'Delete') {
      if (confirm('Are you sure you want to delete this user?')) {
        dispatch(deleteUser(row.id))
        // console.log('Thing was saved to the database.');
      } else {
        // Do nothing!
        // console.log('Thing was not saved to the database.');
      }

    } else if (type === 'PDF') {
      if (row.resume) {
        openInNewTab(row.resume)
      }
      else {
        alert("Resume not found!");
      }
    } else if (type === 'Student') {
      setStudentList(row.students)
      setOpenPopup4(true)
  }

  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  const uploadUserInfo = (values) => {
    // uid, email, phone, address, type, age, quialification, resume, status,image
    dispatch(updateUserInfo(selectedId,
      "", values.phone || "", values.address || "", "", values.age || "", "", "", "", "", values.username
    ))
    setOpenPopup2(false)
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickAdd = (e) => {
    // event, location, description, price, status,type,start_date,start_time
    // event, location, description, price, status,type,start_date,start_time
    // name, phone, address, type, age
    dispatch(addUser(e.email, e.password, e.name, e.phone, e.address, "child", e.age))
    setOpenPopup(false)

  }

  useEffect(() => {
    dispatch(getUserList())
    dispatch(getTutorList2())
    return () => {
      //
    };
  }, [status]);


  useEffect(() => {
    if (didMount.current) {
      setOpen(true)
      setOpMessage(status ? 'Operation success!' : 'Operation failed!')

    }
    didMount.current = true;
  }, [status]);

  return (<>
    <Head>
      <title>
        Users Management
      </title>
    </Head>
    <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading }
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    <Box sx={{ ml: 3, mr: 3 }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

        <Tab label={'Manage Users'} {...a11yProps(0)} />
        <Tab label={'Manage Tutor'} {...a11yProps(1)} />

      </Tabs>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >

      <Container maxWidth={false}>
        <TabPanel value={value} index={0}>
          <Popup
            title="User Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <UserAddMain
              addOrEdit={(e) => onClickAdd(e)} />
          </Popup>


          <TableToolbar
            icon={<GroupIcon fontSize="large" />}
            title={'Users'}
            showAdd={true}
            // showUpdate={false}
            // showExport={false}
            // showImport={false}
            // showAction={false}
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
              column={['email','username','type','parent_Name','parent_Email']}
              title={'Events'}
              search={search}
              showAvatar={true}
              action={true}
              showDelete={true}
              onChange={onClickEvent}
            />




          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Popup
            title="Tutor Form"
            openPopup={openPopup2}
            setOpenPopup={setOpenPopup2}>
            <AccountProfileDetails
              onSubmit={(e) => uploadUserInfo(e)}
            />
          </Popup>
          <Popup
            maxWidth="sm"
            title="Student List"
            openPopup={openPopup4}
            setOpenPopup={setOpenPopup4}>
            <StudentList
              dataList={studentList}
            // id={tutorId}
            // back={onClickBack}
            />

          </Popup>
          <MemoTable
            data={data2}
            showEdit={true}
            column={['email',
              'username',
              'address',
              'phone',
              'age',
              'quialification',
              'status']}
            title={'Events'}
            search={search}
            showAvatar={true}
            action={true}
            showApprove={true}
            showDelete={true}
            showDisprove={true}
            onChange={onClickEvent2}
            showPDF={true}
            showStudent={true}
          />

        </TabPanel>
      </Container>
    </Box >
  </>
  )
};

Users.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);

export default Users;
