import Axios from "axios"
import Cookie from 'js-cookie'
import {
    GET_TIMESLOT_REQUEST, GET_TIMESLOT_SUCCESS,
    GET_TIMESLOT_FAIL, TIMESLOT_UPDATE_REQUEST,
    TIMESLOT_UPDATE_SUCCESS, TIMESLOT_UPDATE_FAIL
} from "../constants/timeslotConstants"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from "firebase/storage";

const getTimeslot = () => async (dispatch) => {
    dispatch({ type: GET_TIMESLOT_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "timeslot"));

        const q2 = query(collection(db, "booking"));
        const docSnap2 = await getDocs(q2)

        let booked_date=[]
        docSnap2.forEach((doc) => {
            let cData = doc.data()
            booked_date.push(cData.booking_date)
        })
        // let userNameMap=await getUsersName()
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            let cData = doc.data()
            if(booked_date.includes(cData.startDatetime)){
                cData.status='booked'
            }
            data.push({ ...cData, id: doc.id })
        })
        dispatch({ type: GET_TIMESLOT_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_TIMESLOT_FAIL, payload: {} });
    }
}

const addTimeslot = (startDatetime, endDatetime,date, startTime, endTime) => async (dispatch) => {
    dispatch({ type: TIMESLOT_UPDATE_REQUEST, payload: {} });


    if (!startDatetime || !endDatetime) {
        dispatch({ type: TIMESLOT_UPDATE_FAIL, payload:'invalud input!'});
        return
    }

    const data = {
        startDatetime: startDatetime,
        endDatetime: endDatetime,
        date:date,
        startTime:startTime,
        endTime:endTime,
        status:'empty'
    };

    try {
        const docRef = await addDoc(collection(db, "timeslot"), data);
        console.log("ITEM successfully added", docRef.id);
        dispatch({ type: TIMESLOT_UPDATE_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: TIMESLOT_UPDATE_FAIL, payload: e });
    }
}

const updateTimeslot = (id, threshold, type, duration) => async (dispatch) => {
    // dispatch({ type: THRESHOLD_ADD_REQUEST, payload: { threshold, type, duration } });
    // try {
    //     const { data } = await Axios.post("http://localhost:9020/editThreshold", { id, threshold, type, duration });
    //     if (data.errorCode === "000") {
    //         dispatch({ type: THRESHOLD_ADD_SUCCESS, payload: data });
    //         // Cookie.set('userInfo', JSON.stringify(data));  
    //     }
    //     else {
    //         dispatch({ type: THRESHOLD_ADD_FAIL, payload: data.errormessage });
    //     }
    // } catch (error) {
    //     dispatch({ type: THRESHOLD_ADD_FAIL, payload: error.message });
    // }
}


const deleteTimeslot = (id) => async (dispatch) => {
    dispatch({ type: TIMESLOT_UPDATE_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "timeslot", id));
        console.log("timeslot successfully delete");
        dispatch({ type: TIMESLOT_UPDATE_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding timeslot: " + e);
        dispatch({ type: TIMESLOT_UPDATE_FAIL, payload: e });
    }
}





export { getTimeslot, addTimeslot, updateTimeslot, deleteTimeslot };