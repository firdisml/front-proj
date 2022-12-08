import Axios from "axios"
import Cookie from 'js-cookie'
import {
    GET_REPORT_REQUEST, GET_REPORT_SUCCESS,
    GET_REPORT_FAIL, REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS, REPORT_UPDATE_FAIL,
    ADD_FEEDBACK_REQUEST, ADD_FEEDBACK_SUCCESS,
    ADD_FEEDBACK_FAIL,
    GET_FEEDBACK_REQUEST, GET_FEEDBACK_SUCCESS,
    GET_FEEDBACK_FAIL
} from "../constants/reportConstant"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc, setDoc } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'

const getReport = (id, type) => async (dispatch) => {
    dispatch({ type: GET_REPORT_REQUEST, payload: {} });
    try {
        let searchId = 'parentId'
        if (type === 'Child') {
            searchId = 'studentId'
        }
        const q = query(collection(db, "report"), where(searchId, "==", id));
        const docSnap = await getDocs(q)
        // let studentData = await getStudentData()
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        dispatch({ type: GET_REPORT_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_REPORT_FAIL, payload: {} });
    }
}





// column={['REPORT','time','status','price','location']}
const addReport = (tutorId, parentId, studentId, para) => async (dispatch) => {
    dispatch({ type: REPORT_UPDATE_REQUEST, payload: {} });

    if (!tutorId || !parentId || !studentId) {
        dispatch({ type: ADD_FEEDBACK_FAIL, payload: 'invalid input!' });
        return
    }



    let date = new Date()
    const data = {
        tutorId: tutorId,
        parentId: parentId,
        studentId: studentId,
        createdDate: date.toString(),
        performance: para.performance || "",
        attendance: para.attendance || "",
        progress: para.progress || "",
        learningSpeed: para.learningSpeed || "",
        remark: para.remark || "",
        mark: para.mark || "",
        status: para.status || "",
        image: para.image || "",
        subject: para.subject || "",
        studentName: para.studentName || "",
        studentEmail: para.studentEmail || "",
        studentPhone: para.studentPhone || "",
        studentAddress: para.studentAddress || "",

    };

    try {
        const docRef = await addDoc(collection(db, "report"), data);
        console.log("ITEM successfully added", docRef.id);
        alert("Successfully submitted");
        dispatch({ type: REPORT_UPDATE_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: REPORT_UPDATE_FAIL, payload: e });
    }
}



const deleteReport = (id) => async (dispatch) => {
    dispatch({ type: REPORT_UPDATE_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "reports", id));
        console.log("eContact successfully delete");
        dispatch({ type: REPORT_UPDATE_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: REPORT_UPDATE_FAIL, payload: e });
    }
}


const getFeedback = () => async (dispatch) => {
    dispatch({ type: GET_FEEDBACK_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "feedback"));
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        dispatch({ type: GET_FEEDBACK_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_FEEDBACK_FAIL, payload: {} });
    }
}

const addFeedback = (email, message, type) => async (dispatch) => {
    dispatch({ type: ADD_FEEDBACK_REQUEST, payload: {} });

    if (!email || !message || !type) {
        dispatch({ type: ADD_FEEDBACK_FAIL, payload: 'invalid input!' });
        return
    }

    const data = {
        email: email,
        message: message,
        type: type,

    };

    try {
        const docRef = await addDoc(collection(db, "feedback"), data);
        console.log("ITEM successfully added", docRef.id);
        alert("Successfully submitted");
        dispatch({ type: ADD_FEEDBACK_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: ADD_FEEDBACK_FAIL, payload: e });
    }
}


const getStudentData = async () => {

    let classObject = {};
    try {
        const q = query(collection(db, "users"), where('type', "==", 'Child'));
        console.log(q)
        const docSnap = await getDocs(q)
        // let data = [];
        docSnap.forEach((doc) => {
            classObject[doc.id] = doc.data()
            // data.push({ ...doc.data(), id: doc.id })
        })
        return classObject
    } catch (e) {
        return classObject
    }
}






export { getReport, addReport, deleteReport, addFeedback, getFeedback };