import {
    GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL, UPDATE_COMMENTS_REQUEST,
    UPDATE_COMMENTS_SUCCESS, UPDATE_COMMENTS_FAIL,
    GET_RATING_REQUEST,
    GET_RATING_SUCCESS,
    GET_RATING_FAIL,

    UPDATE_RATING_REQUEST,
    UPDATE_RATING_SUCCESS,
    UPDATE_RATING_FAIL,
} from "../constants/commentConstants"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const getComments = (id) => async (dispatch) => {
    dispatch({ type: GET_COMMENTS_REQUEST, payload: {} });
    try {
        const q = doc(db, "comments", id);
        const docSnap = await getDoc(q)
        let data = docSnap.data()
        let comments = data.data ? data.data : []
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: comments });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_COMMENTS_FAIL, payload: {} });
    }
}

const getRating = (id) => async (dispatch) => {
    dispatch({ type: GET_RATING_REQUEST, payload: {} });
    try {
        const q = doc(db, "rating", id);
        const docSnap = await getDoc(q)
        let data = docSnap.data()
        // let comments=data.data?data.data:[]
        dispatch({ type: GET_RATING_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_RATING_FAIL, payload: {} });
    }
}

const getUserData2 = async (id) => {
    try {
        const q = doc(db, "users", id);
        const docSnap = await getDoc(q)
        return docSnap.data()

    } catch (e) {

    }
}


const setRating = (id, senderId, rating, existed) => async (dispatch) => {
    dispatch({ type: UPDATE_RATING_REQUEST, payload: {} });
    try {

        let exi = existed || []
        const q = doc(db, "rating", id);
        let obj = exi.find(o => o.senderId === senderId);
        if (obj) {
            await updateDoc(q, {
                data: arrayRemove(obj)
            });
        }

        await updateDoc(q, {
            data: arrayUnion({
                senderId: senderId,
                rating: rating,
            })
        });

        dispatch({ type: UPDATE_RATING_SUCCESS, payload: '' });
    } catch (error) {
        console.log(error)
        dispatch({ type: UPDATE_RATING_FAIL, payload: error.message });
    }
}


const addComment = (id, senderId, message,rating) => async (dispatch) => {
    dispatch({ type: UPDATE_COMMENTS_REQUEST, payload: {} });
    
    try {
        const senderData = await getUserData2(senderId)
        const q = doc(db, "comments", id);
        await updateDoc(q, {
            data: arrayUnion({
                senderId: senderId,
                rating:rating||'3',
                image: senderData.image||"",
                username: senderData.username||"s",
                message: message || '',
                time: new Date().toLocaleTimeString()
            })
        });

        dispatch({ type: UPDATE_COMMENTS_SUCCESS, payload: '' });
    } catch (error) {
        console.log(error)
        dispatch({ type: UPDATE_COMMENTS_FAIL, payload: error.message });
    }
}






export { addComment, getComments, getRating, setRating };