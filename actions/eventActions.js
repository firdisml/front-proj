import Axios from "axios"
import Cookie from 'js-cookie'
import {
    GET_EVENT_REQUEST, GET_EVENT_SUCCESS,
    GET_EVENT_FAIL, EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS, EVENT_UPDATE_FAIL
} from "../constants/eventConstants"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from "firebase/storage";

const getEvent = () => async (dispatch) => {
    dispatch({ type: GET_EVENT_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "event"));
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            let starting_Time
            let cData=doc.data()
            console.log(cData)
            if(cData.start_date&&cData.start_time){
                starting_Time=`${cData.start_date}  ${cData.start_time}`
            }else{
                starting_Time= ''
            }

            data.push({ ...doc.data(), id: doc.id ,starting_Time:starting_Time })
        })
        console.log(data)
        dispatch({ type: GET_EVENT_SUCCESS, payload: data});
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_EVENT_FAIL, payload: {} });
    }
}

// column={['event','time','status','price','location']}
const addEvent = (event, location, description, price, status,type,start_date,start_time,image) => async (dispatch) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: {} });

    console.log(image)
    const { uri } = image;
    const imageurl = await handleUpload(image)
    console.log(imageurl)

    const data = {
        title: event || 'Event',
        Location: location || 'Not yet decide',
        description: description || 'Not yet decide',
        price: price || 'Free',
        status: status || 'pending',
        type: type || 'Not yet decide',
        start_date: start_date || 'Not yet decide',
        start_time: start_time || 'pending',
        image:imageurl
    };

    try {
        const docRef = await addDoc(collection(db, "event"), data);
        console.log("ITEM successfully added", docRef.id);
        dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: EVENT_UPDATE_FAIL, payload: e });
    }
}

async function uploadImageAsync(uri, name) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    })
    console.log(blob)

    //   blob=null

    const fileRef = ref(getStorage(), name);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it


    return await getDownloadURL(fileRef);
}

async function handleUpload  (file)  {
    if (!file) {
        alert("Please upload an image first!");
    }

    const storageRef = ref(getStorage(), `/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

   const hey= await uploadTask

    return await getDownloadURL(storageRef);

 
};



const updateEvent = (id, event, time, status, location, price) => async (dispatch) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: {} });
    const Batch = writeBatch(db);
    const sfRef = doc(db, "event", id);

    if (event) {
        Batch.update(sfRef, { "event": event });
    }

    if (time) {
        Batch.update(sfRef, { "time": time });
    }
    if (status) {
        Batch.update(sfRef, { "status": status });
    }

    if (location) {
        Batch.update(sfRef, { "location": location });
    }

    if (price) {
        Batch.update(sfRef, { "price": price });
    }


    try {
        await Batch.commit();
        dispatch({ type: EVENT_UPDATE_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: EVENT_UPDATE_FAIL, payload: error });
    }


}



const deleteEvent = (id) => async (dispatch) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "events", id));
        console.log("eContact successfully delete");
        dispatch({ type: EVENT_UPDATE_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: EVENT_UPDATE_FAIL, payload: e });
    }
}





export { getEvent, addEvent, deleteEvent, updateEvent };