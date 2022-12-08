import {
    GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS,
    GET_BOOKING_FAIL, BOOKING_UPDATE_REQUEST,

    GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAIL,
    BOOKING_UPDATE_SUCCESS, BOOKING_UPDATE_FAIL
} from "../constants/paymentConstants"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc,updateDoc } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'
import { v4 } from "uuid";


const getBooking = () => async (dispatch) => {
    dispatch({ type: GET_BOOKING_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "booking"));
        let userNameMap = await getUsersName()
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            let cData = doc.data()
            data.push({ ...doc.data(), id: doc.id, purchaser: userNameMap.get(cData.user_id) })
        })
        dispatch({ type: GET_BOOKING_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_BOOKING_FAIL, payload: {} });
    }
}

const getPayment = () => async (dispatch) => {
    dispatch({ type: GET_PAYMENT_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "payment"));
        let userNameMap = await getUsersName()
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            let cData = doc.data()
            data.push({ ...doc.data(), id: doc.id, client: userNameMap.get(cData.id) ,tutor: userNameMap.get(cData.tutorId)})
        })
        dispatch({ type: GET_PAYMENT_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_PAYMENT_FAIL, payload: {} });
    }
}

const getPaymentById = (id) => async (dispatch) => {
    dispatch({ type: GET_PAYMENT_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "payment"), where('id', "==", id));
        let userNameMap = await getUsersName()
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            let cData = doc.data()
            data.push({ ...doc.data(), id: doc.id, client: userNameMap.get(cData.id),tutor: userNameMap.get(cData.tutorId) })
        })
        dispatch({ type: GET_PAYMENT_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_PAYMENT_FAIL, payload: {} });
    }
}



const addPayment = (id, para) => async (dispatch) => {
    dispatch({ type: BOOKING_UPDATE_REQUEST, payload: {} });


    if (!id) {
        dispatch({ type: BOOKING_UPDATE_FAIL, payload: 'invalid input!' });
        return
    }

    let toDate = new Date()
    let latest_updated_date = toDate.toString()
    // let dateOnly=toDate.toDateString()

    // id: "5df3180a09ea16dc4b95f910",
    // invoice_no: "201906-28",
    // // balance: "$2,283.74",
    // fullname: "MANTRIX",
    // email: "susanafuentes@mantrix.com",
    // phone: "+1 (872) 588-3809",
    // address: "922 Campus Road, Drytown, Wisconsin, 1986",
    // trans_date: "26-11-2021",
    // // due_date: "26-11-2021",
    // companyID: "10001",
    // companyName: "A+Class Home Tuition",
    // items: [
    //   {
    //     sno: 1,
    //     desc: "FinePix Pro2 3D Camera",
    //     qty: 2,
    //     rate: 1600.00,
    let clientInfo = await getUserData2(id)
    const data = {
        invoiceId: v4().toString().replace("-","").substring(0,8),
        id: id,
        tutorId: para.tutorId,
        address:clientInfo.address||'',
        clientName: clientInfo.username||'',
        phone: clientInfo.phone||'',
        email: clientInfo.email||'',
        price: para.price,
        date: latest_updated_date,
        subject: para.subject,
        subscription: para.subscription,
        totalPrice: para.totalPrice,

    };


    const data2 = {
        parentid: id,
        studentId: para.studentId,
        classId: para.classId,
        date: latest_updated_date,
        subject: para.subject,
        tutorId: para.tutorId,
        subscription: para.subscription,
    };
    // classes
    try {
        const docRef = await addDoc(collection(db, "payment"), data);
        const docRef2 = await addDoc(collection(db, "childclass"), data2);

        const docRef3 = doc(db, "classes", para.classId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef3, {
            status: 'booked'
        });
        addChat(id, para.tutorId, 'Parent')
        addChat(para.studentId, para.tutorId, 'Child')
        console.log("ITEM successfully added", docRef.id);
        alert('succesfully added')
        dispatch({ type: BOOKING_UPDATE_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        alert('failed, please try again later!')
        dispatch({ type: BOOKING_UPDATE_FAIL, payload: e });
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

const addChat = async (clientId, tutorId, type) => {
    try {
        let exist = await checkExist(clientId, tutorId)
        if (!exist) {
            let clientInfo = await getUserData2(clientId)
            let tutorInfo = await getUserData2(tutorId)
            let data = {
                clientName: clientInfo.username,
                clientImage: clientInfo.image || "",
                clientId: clientId,
                tutorImage: tutorInfo.image || "",
                tutorname: tutorInfo.username,
                tutorId: tutorId,
                type: type,
                chat: []
            }
            await addDoc(collection(db, "chat"), data);
        }

    } catch (e) {
        console.log(e)
    }
}


const checkExist = async (id, tutorId) => {
    try {
        const q = query(collection(db, "chat"), where("clientId", "==", id));
        const docSnap = await getDocs(q)
        // console.log(docSnap)
        // let exist = docSnap.some(doc => doc.data()['tutorId'] === tutorId)
        let exist = false
        docSnap.forEach((doc) => {

            if (doc.data()['tutorId'] === tutorId) {
                exist = true
            }
            // data.push({ ...doc.data(), id: doc.id })
        })
        console.log(exist)
        return exist
        // return exist
    } catch (e) {
        console.log(e)
        return false
    }
}


const getUsersName = async () => {
    let usersName = new Map();
    try {
        const q = query(collection(db, "users"));
        const docSnap = await getDocs(q)
        // let data = [];

        docSnap.forEach((doc) => {
            usersName.set(doc.id, doc.data().username);
            // data.push({ ...doc.data(), id: doc.id })
        })
        return usersName
    } catch (e) {
        return usersName
    }
}






const updateBooking = (id, status) => async (dispatch) => {
    dispatch({ type: BOOKING_UPDATE_REQUEST, payload: {} });
    const Batch = writeBatch(db);
    const sfRef = doc(db, "event", id);

    if (status) {
        Batch.update(sfRef, { "status": status });
    }

    try {
        await Batch.commit();
        dispatch({ type: BOOKING_UPDATE_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: BOOKING_UPDATE_FAIL, payload: error });
    }

}



const deleteBooking = (id) => async (dispatch) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "booking", id));
        console.log("eContact successfully delete");
        dispatch({ type: EVENT_UPDATE_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: EVENT_UPDATE_FAIL, payload: e });
    }
}





export { getBooking, updateBooking, deleteBooking, addPayment, getPayment, getPaymentById };