import Head from 'next/head'
import { Box, Container, Button, Stack } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import Popup from '../components/Popup'
import { EventForm } from '../components/event/EventForm'
import { useSelector, useDispatch } from 'react-redux';
import { addTimeslot, getTimeslot, deleteTimeslot } from '../actions/timeslotActions'
import Controls from "../components/controls/Controls"
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Form } from '../components/useForm';
import Timetable from 'react-timetable-events'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import moment from 'moment';
import { useDate } from '../components/dateFunction'
import { getClass, deleteClass, getChildClass, deleteChildClass, updateModules } from '../actions/subjectActions'
// import moment from 'moment';
import { SubjectForm } from '../components/subject/subjectForm'
import ModulesView from '../components/subject/modulesView'
import TutorRating from '../components/tutor/tutorRating'
import StudentList from '../components/children/studentList'
import { getStudent } from '../actions/subjectActions'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import EventIcon from '@mui/icons-material/Event';
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


const ChildTimetable = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [value, setValue] = React.useState(0);
  const [tutorId, setTutorId] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [openPopup4, setOpenPopup4] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const didMount = useRef(false);
  const classes = useSelector(state => state.classes);
  const { data, loading: loading2 } = classes
  const classesUpdate = useSelector(state => state.classesUpdate);
  const { status } = classesUpdate

  const student = useSelector(state => state.student);
  const { data: studentData, loading } = student



  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''


  const column = type === 'Parent' ? ['student_name', 'tutor_name', 'subject', 'education_level', 'days', 'time'] : ['subject', 'education_level', 'days', 'time']


  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeSearch = (e) => {
    setSearch(e)
  };
  const openDialog = (e) => {
    setOpenPopup(true)
  };

  const onClickEvent = (e, type, row) => {
    console.log(type)
    if (type === 'Delete') {
      console.log(row.id)
      dispatch(deleteClass(row.item_id))

    } else if (type === 'Disprove') {
      console.log(row)
      dispatch(deleteChildClass(row.item_id, row.classId))
    } else if (type === 'PDF') {
      console.log(row)
      if (row.module)
        openInNewTab(row.module)
    } else if (type === 'Upload') {
      console.log(row.item_id)
      setSelectedId(row.item_id)
      setOpenPopup2(true)
    }
    else if (type === 'Report') {
      setTutorId(row.id)
      setOpenPopup3(true)
    }
    else if (type === 'Student') {
      const tempData = studentData.filter(a1 => a1.class_id === row.item_id);
      setStudentList(tempData)
      setOpenPopup4(true)
    }

  }

  const onClickAdd = (e) => {
    dispatch(updateModules(selectedId, e.pdf))
  };

  const onClickBack = (e) => {
    setOpenPopup3(false)
  };

  useEffect(() => {
    if (type === 'Tutor') {
      dispatch(getClass(id))
    } else {
      dispatch(getChildClass(id,
        type))
    }

    setOpenPopup(false)
    return () => {
      //
    };
  }, [status]);

  useEffect(() => {
    dispatch(getStudent(id))
    return () => {
      //
    };
  }, []);


  // useEffect(() => {
  //   if (didMount.current) {
  //     setOpen(true)
  //     if (status) {
  //       setError(false)
  //     } else {
  //       setError(true)
  //     }
  //     setOpMessage(status ? 'Operation success!' : 'Operation failed!')

  //   }
  //   didMount.current = true;
  // }, [status]);



  function formatDataforDisplay(items) {
    let formatData = {}
    formatData = {
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': [],
    }

    items.forEach((a1, i) => {
      const timeArray = a1.time.split('-')
      const start_time = timeArray[0].substring(0, 2)
      const end_time = timeArray[1].substring(0, 2)

      const m2 = moment({ year: 2017, month: 0, day: 4, hour: start_time, minute: 0, second: 3, millisecond: 123 });
      const m3 = moment({ year: 2017, month: 0, day: 4, hour: end_time, minute: 0, second: 3, millisecond: 123 });
      let title = a1.subject
      if (a1.student_name) {
        title = `${a1.student_name}       
        ~\n ${title}`
      }

      if (type === 'Tutor') {
        const tempData = studentData.filter(a2 => a2.class_id === a1.item_id);
        console.log(tempData)
        if (tempData&&tempData.length>0) {
          title = `${tempData[0].username}       
        ~\n ${title}`
        }
      }

      formatData[a1.days].push(
        {
          id: i,
          name: title,
          type: "custom",
          startTime: m2.toDate(),
          endTime: m3.toDate(),
        },
      )


    })

    return formatData
  }





  return (<>
    <Head>
      <title>
        TimeTable
      </title>
    </Head>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading || loading2}
    // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box sx={{ ml: 3, mr: 3 }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

        <Tab label={'Manage Timeslot'} {...a11yProps(0)} />
        <Tab label={'View Timeslot'} {...a11yProps(1)} />

      </Tabs>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // py: 8
      }}
    >

      <Container maxWidth={false}>
        <TabPanel value={value} index={0}>
          <Popup
            title="Subject"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <SubjectForm />
          </Popup>

          <Popup
            maxWidth="sm"
            title="Upload Modules"
            openPopup={openPopup2}
            setOpenPopup={setOpenPopup2}>
            <ModulesView
              addOrEdit={(e) => onClickAdd(e)}
            />

          </Popup>

          <Popup
            title="Tutor Reviews"
            openPopup={openPopup3}
            setOpenPopup={setOpenPopup3}>
            <TutorRating
              id={tutorId}
              back={onClickBack}
            />

          </Popup>

          <Popup
            maxWidth="sm"
            title="Students"
            openPopup={openPopup4}
            setOpenPopup={setOpenPopup4}>
            <StudentList
              dataList={studentList}
            // id={tutorId}
            // back={onClickBack}
            />

          </Popup>
          <TableToolbar
            icon={<EventIcon fontSize="large" />}
            title={'Timeslot'}
            showAdd={type === 'Tutor' ? true : false}
            onChangeSearch={onChangeSearch}
            onChange={openDialog}
          />

          {/* <a href="https://google.com" target="_blank" rel="noopener noreferrer" /> */}

          <Box sx={{ mt: 3 }}>

            <MemoTable
              data={data}
              column={column}
              title={'Events'}
              search={search}
              showDelete={type === 'Tutor' ? true : false}
              // action={type === 'Child' ? false : true}
              // showApprove={true}
              onChange={onClickEvent}
              // showApprove={true}
              showReport={type === 'Parent' ? true : false}
              showUpload={type === 'Tutor' ? true : false}
              showPDF={type === 'Child' ? true : false}
              showDisprove={type === 'Parent' ? true : false}
              showStudent={type === 'Tutor' ? true : false}
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Timetable
            events={formatDataforDisplay(data)}
            style={{ height: '500px' }}
          />
        </TabPanel>
      </Container>
    </Box>
  </>
  )
};

ChildTimetable.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);

export default ChildTimetable;
