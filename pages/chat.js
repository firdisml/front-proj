import React, { useEffect, useState, useRef ,useCallback} from 'react'
import Head from 'next/head'
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { IconButton, Tooltip } from '@mui/material'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/icons-material/Circle';
import SendIcon from '@mui/icons-material/Send';
import ListSubheader from '@mui/material/ListSubheader';
// import { collection, query, where, onSnapshot } from "firebase/firestore";
import { DashboardLayout } from '../components/dashboard-layout'
import { firebase, auth, db } from '../firebase.js'
import { getAllUserData } from '../actions/userActions';
import { collection, addDoc, doc, onSnapshot, getDoc, getDocs, query, where, setDoc, deleteDoc, writeBatch, updateDoc, arrayUnion } from "firebase/firestore";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();
    const [userData, setUserData] = useState({});
    const [snapShot, setSnapshot] = useState(null);
    const [chatName, setChatName] = useState('');
    const [message, setMessage] = useState('');
    const [selectChat, setSelectedChat] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const messagesEndRef = useRef(null)
    let existed = []

    const formatUserData = (userData) => {
        let arr = []
        for (let id in userData) {
            if (id !== JSON.parse(localStorage.getItem('id'))) {
                arr.push(userData[id])
            }
        }

        return arr
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = useCallback(async () => {
       const id=selectChat
       const chat=message

        if (!chat) {
            return
        }

      
        console.log("here")
        const q = doc(db, "chat", id);
        setMessage('')
        // Atomically add a new region to the "regions" array field.
        await updateDoc(q, {
            chat: arrayUnion({ senderId: JSON.parse(localStorage.getItem('id')), message: chat || '', time: new Date().toLocaleTimeString() })
        });


    })

    // const callApi = useCallback(arg => {
    //     dispatch(getUserData(id))
    //     // return setter(args)
    //   }, [id])


    const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''
    const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
    const typeId = type === 'Tutor' ? 'tutorId' : 'clientId'

    const q = query(collection(db, "chat"), where(typeId, "==", id));

    useEffect(() => {
        let totUser = {}
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc, i) => {
                let key = doc.data().tutorId
                if (!existed.includes(doc.data().tutorId)) {
                    let userDetail = { username: doc.data().tutorname, image: doc.data().tutorImage, chatId: doc.id, id: doc.data().tutorId }
                    totUser[key] = userDetail
                    existed.push(doc.data().tutorId)
                }

                totUser[key] = { ...totUser[key], chat: doc.data().chat }
                let key2 = doc.data().clientId
                if (!existed.includes(doc.data().clientId)) {
                    let userDetail2 = { username: doc.data().clientName, image: doc.data().clientImage, chatId: doc.id, id: doc.data().clientId }
                    totUser[key2] = userDetail2
                    existed.push(doc.data().clientId)
                }
                totUser[key2] = { ...totUser[key2], chat: doc.data().chat }
                setUserData(totUser)

            });
            setSnapshot(querySnapshot)


        });

        return () => unsubscribe()

    }, []);

    const setChatNUser = (chatId, userId,chatUser) => {
        setSelectedChat(chatId)
        setSelectedUser(userId)
        setChatName(chatUser)
    }

    useEffect(() => {
        scrollToBottom()
        if(!selectedUser){
            let data=formatUserData(userData)
            if(data.length>0)
            setChatNUser (data[0].chatId, data[0].id,data[0].username)
        }
        return () => {
            //
        };
    }, [snapShot]);

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            sendMessage()
            event.preventDefault();
            // callMyFunction();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [sendMessage]);

    const getMessageContent = (id, message, time) => {

        if (id !== JSON.parse(localStorage.getItem('id'))) {
            return (
                <ListItem key={time + id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="left" primary={message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary={time}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            )
        } else {
            return (
                <ListItem key={time + id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="right" primary={message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary={time}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            )
        }

    }

    function isEmpty(obj) {
        for (const property in obj) {
          return true;
        }
        return false;
      }

    return (
        <>
            <Head>
                <title>
                    CHAT
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    // py: 3
                }}
            >


                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}>

                        <List>
                            {formatUserData(userData).map((a1) =>
                                <ListItem
                                    selected={a1.id === selectedUser}
                                    button key={a1.username} onClick={e => { setChatNUser(a1.chatId, a1.id,a1.username) }}>
                                    <ListItemIcon>
                                        <Avatar alt="Alice" src={a1.image} />
                                    </ListItemIcon>
                                    <ListItemText primary={a1.username}>{a1.username}</ListItemText>
                                </ListItem>
                            )}



                        </List>
                    </Grid>
                    <Grid item xs={9}>

                        <List className={classes.messageArea}>
                            <ListSubheader>
                                {chatName}
                            <Divider />
                            </ListSubheader>
        
                            {selectedUser && isEmpty(userData) &&
                                userData[selectedUser].chat.map((a1) =>
                                    getMessageContent(a1.senderId, a1.message, a1.time)
                                )}
                            {/* <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="2">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" secondary="09:31"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem> */}

                            <ListItem ref={messagesEndRef}>
                            </ListItem>

                        </List>
                        <Divider />
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                <TextField value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    id="outlined-basic-email"
                                    label="Type Something" fullWidth />
                            </Grid>
                            <Grid xs={1} align="right">
                                <Tooltip title="Send">
                                    <IconButton onClick={e => sendMessage()}><SendIcon />  </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* </Container> */}
            </Box>
        </>
    );
}

Chat.getLayout = (page) => (
    <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
        {page}
    </DashboardLayout>
);


export default Chat;