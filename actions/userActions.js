import Axios from "axios"
import Cookie from 'js-cookie'
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, USER_LOGOUT, GET_USERLIST_REQUEST,
    GET_USERLIST_SUCCESS, GET_USERLIST_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_FAIL,
    DELETE_USER_SUCCESS, USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    GET_USERDATA_SUCCESS, GET_USERDATA_FAIL,
    GET_USERDATA_REQUEST,
    GET_CHILDLIST_REQUEST, GET_CHILDLIST_SUCCESS,
    GET_CHILDLIST_FAIL,
    GET_TUTORLIST_REQUEST, GET_TUTORLIST_SUCCESS,
    GET_TUTORLIST_FAIL,
    GET_SELFDATA_REQUEST,
    GET_SELFDATA_SUCCESS,
    GET_SELFDATA_FAIL,

} from "../constants/userConstants"

// import {firebaseAdmin} from '../firebaseAdmin'
import { firebase, auth, db } from '../firebase.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { collection, addDoc, doc, onSnapshot, getDoc, getDocs, query, where, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    signInWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
            const uid = response.user.uid

            try {

                let type = await checkUserType(uid)

                if (type) {
                    localStorage.setItem('id', JSON.stringify(uid));
                    localStorage.setItem('email', JSON.stringify(email));
                    localStorage.setItem('type', JSON.stringify(type));

                }

                if (type === 'admin')
                    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { id: uid } });
                else if (type === 'Tutor' || type === 'Parent' || type === 'Child' || type === 'Admin')
                    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { id: uid, type: type } });
                else
                    dispatch({ type: USER_SIGNIN_FAIL, payload: 'invalid id' });

            } catch (e) {
                console.error("Error adding document: ", e);
                dispatch({ type: USER_SIGNIN_FAIL, payload: e });
            }
        })
        .catch(error => {
            alert(error.message)
            dispatch({ type: USER_SIGNIN_FAIL, payload: error });
        })

}


const updatePassowrd = (password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {} });
    const user = auth.currentUser;
    updatePassword(user, password).then(() => {
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: { } });
    }).catch((error) => {
        alert(error.message)
        dispatch({ type: USER_SIGNIN_FAIL, payload: error });
        // An error ocurred
        // ...
    });

}



const signUp = (email, password, username, phone, address, type, age,) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const id = userCredential.user.uid;
            await setUserData(id, email, username, phone, address, type, age)
            if (type === 'Tutor') {
                await createTutor(id)
            }
            dispatch({ type: USER_REGISTER_SUCCESS, payload: {} });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(error)
            dispatch({ type: USER_REGISTER_FAIL, payload: errorCode });
            // ..
        })
        .catch(error => {
            alert(error.message)
            dispatch({ type: USER_REGISTER_FAIL, payload: error });
        })

}

const createTutor = async (uid) => {

    let updated_value = { data: [] }
    if (!uid) {
        // dispatch({ type: USER_UPDATE_FAIL, payload: 'No ID Found' });
        return 'fail'
    }

    try {
        await setDoc(doc(db, "comments", uid), updated_value);
        await setDoc(doc(db, "rating", uid), updated_value);

        // console.log("ITEM successfully added", docRef.id);
        return 'success'
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        return 'fail'
    }

}

const setUserData = async (uid, email, username, phone, address, type, age, quialification, resume, status, parentId, image) => {
    // dispatch({ type: USER_UPDATE_REQUEST, payload: {} });
    console.log(image)
    let updated_value = {}
    if (!uid) {
        // dispatch({ type: USER_UPDATE_FAIL, payload: 'No ID Found' });
        return 'fail'
    }

    if (email) {
        updated_value['email'] = email
    }

    if (username) {
        updated_value['username'] = username
    }

    if (address) {
        updated_value['address'] = address
    }

    if (phone) {
        updated_value['phone'] = phone
    }

    if (type) {
        updated_value['type'] = type
    }

    if (age) {
        updated_value['age'] = age
    }

    if (quialification) {
        updated_value['quialification'] = quialification
    }

    if (status) {
        updated_value['status'] = status
    } else {
        updated_value['status'] = 'pending'
    }

    if (resume) {
        updated_value['resume'] = await handleUpload(resume)
    }

    if (parentId) {
        updated_value['parentId'] = parentId
    }


    if (image) {
        updated_value['image'] = await handleUpload(image)
    }

    try {
        await setDoc(doc(db, "users", uid), updated_value);

        // console.log("ITEM successfully added", docRef.id);
        return 'success'
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        return 'fail'
    }

}

const updateUserInfo = (uid, email, phone, address, type, age, quialification, resume, status, image, username, subject) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: {} });

    console.log(uid)
    const Batch = writeBatch(db);
    const sfRef = doc(db, "users", uid);

    if (!uid) {
        dispatch({ type: USER_UPDATE_FAIL, payload: 'No ID Found' });
        return
    }

    if (email) {
        Batch.update(sfRef, { "email": email });
    }

    if (username) {
        Batch.update(sfRef, { "username": username });
    }

    if (address) {
        Batch.update(sfRef, { "address": address });
    }

    if (phone) {
        Batch.update(sfRef, { "phone": phone });
    }

    if (type) {
        Batch.update(sfRef, { "type": type });
    }

    if (age) {
        Batch.update(sfRef, { "age": age });
    }

    if (quialification) {
        Batch.update(sfRef, { "quialification": quialification });
    }

    if (status) {
        Batch.update(sfRef, { "status": status });
    }



    if (subject) {
        Batch.update(sfRef, { "subject": subject });
    }

    if (resume) {
        let resumeUrl = await handleUpload(resume)
        Batch.update(sfRef, { "resume": resumeUrl });
        // updated_value['resume'] = await handleUpload(resume)
    }

    if (image) {
        let imageUrl = await handleUpload(image)
        console.log(imageUrl)
        Batch.update(sfRef, { "image": imageUrl });
        // updated_value['resume'] = await handleUpload(resume)
    }

    try {
        await Batch.commit();
        dispatch({ type: USER_UPDATE_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error });
    }


}


const getChildList = (id) => async (dispatch) => {
    dispatch({ type: GET_CHILDLIST_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "users"), where("parentId", "==", id));
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        dispatch({ type: GET_CHILDLIST_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CHILDLIST_FAIL, payload: {} });
    }
}

const getTutorList = () => async (dispatch) => {
    dispatch({ type: GET_TUTORLIST_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "users"), where("type", "==", 'Tutor'), where("status", "==", "Active"));
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        dispatch({ type: GET_TUTORLIST_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_TUTORLIST_FAIL, payload: {} });
    }
}

const getTutorList2 = () => async (dispatch) => {
    dispatch({ type: GET_TUTORLIST_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "users"), where("type", "==", 'Tutor'));
        const docSnap = await getDocs(q)
        const studentList = await getStudentByTutor()

        console.log(studentList)
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id, students: studentList[doc.id]||[] })
        })
        console.log(data)
        dispatch({ type: GET_TUTORLIST_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_TUTORLIST_FAIL, payload: {} });
    }
}


const getStudentByTutor = async () => {
    let tutorStudent = {}

    try {
        // let typeId=type==='Parent'?'parentid':'studentId'
        const q = query(collection(db, "childclass"));
        let studentData = await getStudentData()
        const docSnap = await getDocs(q)
        // let data = [];
        // let existed = {};
        docSnap.forEach((doc) => {
            let tempDoc = doc.data()
            // if (!existed.includes(doc.data().classId)) {
            //     existed.push(doc.data().classId)
            if (tutorStudent[tempDoc.tutorId]) {
                let existed = tutorStudent[tempDoc.tutorId].some(a1 => {
                    return a1.studentId === tempDoc.studentId
                })

                if (!existed) {
                    tutorStudent[tempDoc.tutorId].push({ ...studentData[tempDoc.studentId], item_id: doc.id, studentId: tempDoc.studentId })

                }

            } else {
                tutorStudent[tempDoc.tutorId] = []
                tutorStudent[tempDoc.tutorId].push({ ...studentData[tempDoc.studentId], item_id: doc.id, studentId: tempDoc.studentId })
            }
            // data.push({ ...studentData[doc.data().studentId], item_id: doc.id, studentId: doc.data().studentId })
            // }
        })



        return tutorStudent
    } catch (e) {
        console.log(e)
        return tutorStudent
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


async function handleUpload(file) {
    if (!file) {
        alert("Please upload an image first!");
    }

    const storageRef = ref(getStorage(), `/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    const hey = await uploadTask

    return await getDownloadURL(storageRef);


};


const getUserData = (id) => async (dispatch) => {
    console.log(id)
    dispatch({ type: GET_USERDATA_REQUEST, payload: {} });
    try {
        const q = doc(db, "users", id);
        const docSnap = await getDoc(q)
        let data = docSnap.data()
        console.log(data)
        dispatch({ type: GET_USERDATA_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_USERDATA_FAIL, payload: {} });
    }
}


const getSelfData = (id) => async (dispatch) => {
    console.log(id)
    dispatch({ type: GET_SELFDATA_REQUEST, payload: {} });
    try {
        const q = doc(db, "users", id);
        const docSnap = await getDoc(q)
        let data = docSnap.data()
        console.log(data)
        dispatch({ type: GET_SELFDATA_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_SELFDATA_FAIL, payload: {} });
    }
}









const checkUserType = async (id) => {

    const ref = doc(db, "users", id)
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        // Convert to City object
        const item = docSnap.data();
        // Use a City instance method
        return item.type
    } else {
        return 'invalid'
    }

}

const getUserList = (id) => async (dispatch) => {
    dispatch({ type: GET_USERLIST_REQUEST, payload: {} });
    try {
        const { data } = await Axios.get("http://localhost:3005/getUserList");
        let allUsersData = await getAllUserData()

        let parentData = []
        let childData = []
        data.users.forEach(a1 => {
            let tempData = allUsersData[a1.uid] || {}
            let parentName = ''
            let parentEmail = ''
            if (tempData.type === 'Child') {
                let parentData = allUsersData[tempData.parentId]
                if (parentData) {
                    parentName = parentData.username
                    parentEmail = parentData.email
                }
                childData.push({ ...a1, ...tempData, parent_Name: parentName, parent_Email: parentEmail })
            } else {
                parentData.push({ ...a1, ...tempData, parent_Name: parentName, parent_Email: parentEmail })
            }

        })


        // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        // var removed = arr.splice(2, 2);
        let sortedData = []
        parentData.forEach(a1 => {
            sortedData.push(a1)
            childData.forEach((a2, i) => {
                if (a2.parentId === a1.uid) {
                    sortedData.push(a2)
                    childData.splice(i, i);
                }
            })

        })


        // data.users
        dispatch({ type: GET_USERLIST_SUCCESS, payload: sortedData });

    } catch (error) {
        console.log(error)
        dispatch({ type: GET_USERLIST_FAIL, payload: error.message });
    }
}

const getAllUserData = async () => {

    let classObject = {};
    try {
        const q = query(collection(db, "users"));
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

const addUser = (email, password, name, phone, address, type, age, parentId, image) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: {} });

    try {
        const { data } = await Axios.post("http://localhost:3005/createNewUser", { email: email, password: password });

        if (data.status === 'success') {
            // uid, email, username, phone, address, type, age, quialification, resume, status,parentId,image
            await setUserData(data.id, email, name, phone, address, type, age, "", "", "", parentId, image)
            alert('succesfully added')
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        } else {
            alert(data.message)
        }


    } catch (error) {
        alert(error.message)
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: {} });
    try {
        const { data } = await Axios.post("http://localhost:3005/deleteusers", { uid: id });
        await deleteDoc(doc(db, "users", id));
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.users });

    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}


const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    signOut(auth).then(() => {
        localStorage.setItem('id', '');
        localStorage.setItem('email', '');
        localStorage.setItem('type', '');
        // dispatch({ type: USER_LOGOUT })
    }).catch((error) => {
        // An error happened.
    });

    // history.push('/')
}


export {
    signin, getUserList, deleteUser,
    setUserData, signUp, updateUserInfo,
    getUserData, addUser, getChildList,
    getTutorList,
    logout,
    getSelfData,
    updatePassowrd,
    getTutorList2
};