import {
    GET_CLASS_REQUEST, GET_CLASS_SUCCESS, GET_CLASS_FAIL,
    ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS, ADD_CLASS_FAIL,
    UPDATE_CLASS_REQUEST, UPDATE_CLASS_SUCCESS,
    UPDATE_CLASS_FAIL, DELETE_CLASS_REQUEST,
    DELETE_CLASS_SUCCESS, DELETE_CLASS_FAIL,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,
    GET_USERS_TIMETABLE_FAIL,
    GET_USERS_TIMETABLE_SUCCESS,
    GET_USERS_TIMETABLE_REQUEST,

} from "../constants/subjectConstants"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc, setDoc,updateDoc } from "firebase/firestore";
import { firebase, auth, db } from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";

const getClass = (id) => async (dispatch) => {
    dispatch({ type: GET_CLASS_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "classes"), where("id", "==", id));
        const docSnap = await getDocs(q)
        let data = [];
        docSnap.forEach((doc) => {
            data.push({ ...doc.data(), item_id: doc.id })
        })
        dispatch({ type: GET_CLASS_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CLASS_FAIL, payload: {} });
    }
}

const getChildClass = (id, type) => async (dispatch) => {
    dispatch({ type: GET_CLASS_REQUEST, payload: {} });
    try {
        let typeId = type === 'Parent' ? 'parentid' : 'studentId'
        const q = query(collection(db, "childclass"), where(typeId, "==", id));
        let classData = await getClassData()
        const docSnap = await getDocs(q)

        let data = [];
        let existed = [];
        let existed_user_data = {}
        let existed_user_data_array = []

        for await (const result of docSnap.docs) {
            const results = result.data()
            if (!existed_user_data_array.includes(results.studentId)) {
                let tempData = await getUserData2(results.studentId)
                existed_user_data[results.studentId] = tempData
                existed_user_data_array.push(results.studentId)

            }

            if (!existed_user_data_array.includes(results.tutorId)) {
                let tempData = await getUserData2(results.tutorId)
                existed_user_data[results.tutorId] = tempData
                existed_user_data_array.push(results.tutorId)
            }

        }


        docSnap.forEach((doc) => {

            if (type === 'Parent') {



                let uniId = doc.data().classId + doc.data().studentId
                if (!existed.includes(uniId)) {
                    existed.push(uniId)

                    let studentData = existed_user_data[doc.data().studentId]
                    let tutorData = existed_user_data[doc.data().tutorId]

                    data.push({
                        ...classData[doc.data().classId],
                        classId:doc.data().classId,
                        item_id: doc.id,
                        student_name: studentData ? studentData['username'] : "",
                        tutor_name: tutorData ? tutorData['username'] : "",
                        studentData: studentData || {},
                        tutorData: tutorData || {}
                    })
                }
            } else {
                if (!existed.includes(doc.data().classId)) {
                    existed.push(doc.data().classId)
                    data.push({ ...classData[doc.data().classId], item_id: doc.id })
                }
            }

        })

        console.log(data)
        dispatch({ type: GET_CLASS_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CLASS_FAIL, payload: {} });
    }
}

const getUserData2 = async (id) => {
    try {
        const q = doc(db, "users", id);
        const docSnap = await getDoc(q)
        return docSnap.data()

    } catch (e) {
        return {}
    }
}



const getStudent = (id) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_REQUEST, payload: {} });
    try {
        // let typeId=type==='Parent'?'parentid':'studentId'
        const q = query(collection(db, "childclass"), where('tutorId', "==", id));
        let classData = await getClassData()
        let studentData = await getStudentData()
        const docSnap = await getDocs(q)
        let data = [];
        let existed = [];
        docSnap.forEach((doc) => {
            // if (!existed.includes(doc.data().classId)) {
            //     existed.push(doc.data().classId)
            data.push({ ...classData[doc.data().classId], ...studentData[doc.data().studentId], item_id: doc.id, studentId: doc.data().studentId, class_id: doc.data().classId })
            // }
        })

        dispatch({ type: GET_STUDENT_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_STUDENT_FAIL, payload: {} });
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

const getClassData = async () => {
    let classObject = {};
    try {
        const q = query(collection(db, "classes"));
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

// column={['event','time','status','price','location']}
const addClass = (id, subject, education_level, time, days) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST, payload: {} });
    if (!id || !subject || !education_level || !time || !days) {

    }

    let price = 20
    switch (education_level) {
        case 'Primary':
            price = 20
            break
        case 'Lower Secondary':
            price = 40
            break
        case 'Vocational':
            price = 50
            break
        case 'Upper Secondary Education':
            price = 70
            break
        case 'Undergraduate':
            price = 80
            break
        case 'Graduate (Master)':
            price = 100
            break
        case 'Graduate (Doctoral)':
            price = 130
            break

    }

    const data = {
        id: id || '',
        subject: subject,
        education_level: education_level,
        time: time,
        days: days,
        price: price
    };

    try {
        const docRef = await addDoc(collection(db, "classes"), data);
        console.log("ITEM successfully added", docRef.id);
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: UPDATE_CLASS_FAIL, payload: e });
    }
}


const updateClass = (id, subject, education_level, time, days) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST, payload: {} });
    const Batch = writeBatch(db);
    const sfRef = doc(db, "classes", id);

    if (subject) {
        Batch.update(sfRef, { "subject": subject });
    }

    if (education_level) {
        Batch.update(sfRef, { "education_level": education_level });
    }
    if (time) {
        Batch.update(sfRef, { "time": time });
    }

    if (days) {
        Batch.update(sfRef, { "days": days });
    }

    try {
        await Batch.commit();
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: UPDATE_CLASS_FAIL, payload: error });
    }


}

const deleteChildClass = (id,classId) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "childclass", id));
        console.log("classes successfully delete");
        console.log(classId)
        const docRef3 = doc(db, "classes", classId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef3, {
            status: 'free'
        });
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: UPDATE_CLASS_FAIL, payload: e });
    }
}


const deleteClass = (id) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "classes", id));
        console.log("classes successfully delete");
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: UPDATE_CLASS_FAIL, payload: e });
    }
}

const updateModules = (uid, module) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST, payload: {} });
    const Batch = writeBatch(db);
    console.log(uid)
    const sfRef = doc(db, "classes", uid);

    if (!uid) {
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: 'No ID Found' });
        return
    }

    if (module) {
        let moduleUrl = await handleUpload(module)
        Batch.update(sfRef, { "module": moduleUrl });
    }

    try {
        await Batch.commit();
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: {} });

    } catch (error) {
        console.log(error)
        dispatch({ type: UPDATE_CLASS_FAIL, payload: error });
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



const getTutorNStudentTimetable = (id) => async (dispatch) => {
    dispatch({ type: GET_USERS_TIMETABLE_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "users"), where("type", "in", ['Child', 'Tutor']));
        let classData = await getClassData()
        let childClass = await getAllChildClass()
        const docSnap = await getDocs(q)
        let data = [];

        let tutorClass = {}
        for (let key in classData) {
            let keyId=classData[key].id
            if (tutorClass[keyId]) {
                tutorClass[keyId].push({ ...classData[key], classId: keyId })
            } else {
                tutorClass[keyId] = []
                tutorClass[keyId].push({ ...classData[key], classId: keyId })
            }

        }

        // console.log(tutorClass)
        docSnap.forEach((doc) => {
            let tempData2 = doc.data()

            if (tempData2.type === 'Child') {
                let timeTable = []
                if (childClass[doc.id]) {
                    childClass[doc.id].forEach(a2 => {
                        timeTable.push({ ...a2, ...classData[a2.classId] })
                    })
                }
                data.push({ ...doc.data(), item_id: doc.id, timeTable: timeTable })
            } else {
                let timeTable = []
                if (tutorClass[doc.id]) {
                    tutorClass[doc.id].forEach(a2 => {
                        timeTable.push(a2)
                    })
                }
                data.push({ ...doc.data(), item_id: doc.id, timeTable: timeTable })
            }




        })

        console.log(data)
        dispatch({ type: GET_USERS_TIMETABLE_SUCCESS, payload: data });
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_USERS_TIMETABLE_FAIL, payload: {} });
    }
}


const getAllChildClass = async () => {
    let classObject = {};
    try {
        const q = query(collection(db, "childclass"));
        const docSnap = await getDocs(q)
        docSnap.forEach((doc) => {
            let temData = doc.data()
            if (classObject[temData.studentId]) {
                classObject[temData.studentId].push(temData)
            } else {
                classObject[temData.studentId] = []
                classObject[temData.studentId].push(temData)
            }

        })
        return classObject
    } catch (e) {
        return classObject
    }
}









export { addClass, updateClass, getClass, deleteClass, getChildClass, deleteChildClass, getStudent, updateModules,getTutorNStudentTimetable };