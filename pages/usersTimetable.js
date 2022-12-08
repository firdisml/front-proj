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
import Timetable from 'react-timetable-events'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AccountProfileDetails } from '../components/account/account-profile-details'
import StudentList from '../components/children/studentList'
import { getTutorNStudentTimetable } from '../actions/subjectActions'
// import { UserForm } from '../components/user/userForm'
import moment from 'moment';
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

const UsersTimetable = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [timetable, setTimetable] = useState([]);
    const [value, setValue] = React.useState(0);
    const userTimetable = useSelector(state => state.userTimetable);
    const { data,loading } = userTimetable

    const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
    const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

    const onClickEvent = (e, type, row) => {
        if (type === 'Report') {
            setTimetable(row.timeTable)
            setOpenPopup(true)
            // dispatch(updateUserInfo(row.id, '', '', '', '', '', '', '', 'Active', '', ''))
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        dispatch(getTutorNStudentTimetable())
        return () => {
            //
        };
    }, []);

    function filterData(array, type) {
        let tempArr = []
        array.forEach(a1 => {
            if (a1.type === type) {
                tempArr.push(a1)
            }
        })

        return tempArr
    }

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
                Timetable
            </title>
        </Head>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Popup
            title="Timetable"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <Timetable
                events={formatDataforDisplay(timetable)}
                style={{ height: '500px' }}
            />
        </Popup>

        <Box sx={{ ml: 3, mr: 3 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                <Tab label={'Tutors'} {...a11yProps(0)} />
                <Tab label={'Students'} {...a11yProps(1)} />

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
                    <TableToolbar
                        icon={<EventIcon fontSize="large" />}
                        title={'Tutor'}
                    />
                    <Box sx={{ mt: 3 }}>
                        <MemoTable
                            data={filterData(data, 'Tutor')}
                            column={['email', 'username']}
                            title={'Events'}
                            search={search}
                            showAvatar={true}
                            action={true}
                            showReport={true}
                            onChange={onClickEvent}
                        />
                    </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <TableToolbar
                        icon={<EventIcon fontSize="large" />}
                        title={'Student'}
                    />
                    <Box sx={{ mt: 3 }}>
                        <MemoTable
                            data={filterData(data, 'Child')}
                            column={['email',
                                'username',
                            'age']}
                            title={'Events'}
                            search={search}
                            showReport={true}
                            showAvatar={true}
                            onChange={onClickEvent}

                        />
                    </Box>
                </TabPanel>
            </Container>
        </Box >
    </>
    )
};

UsersTimetable.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
        {page}
    </DashboardLayout>
);

export default UsersTimetable;
