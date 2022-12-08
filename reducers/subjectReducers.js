import {
    GET_CLASS_REQUEST,GET_CLASS_SUCCESS,GET_CLASS_FAIL,
    ADD_CLASS_REQUEST,ADD_CLASS_SUCCESS,ADD_CLASS_FAIL,
    UPDATE_CLASS_REQUEST,UPDATE_CLASS_SUCCESS,
    UPDATE_CLASS_FAIL,DELETE_CLASS_REQUEST,
    DELETE_CLASS_SUCCESS,DELETE_CLASS_FAIL,
    GET_STUDENT_REQUEST,
GET_STUDENT_SUCCESS,
GET_STUDENT_FAIL,
GET_USERS_TIMETABLE_FAIL,
GET_USERS_TIMETABLE_SUCCESS,
GET_USERS_TIMETABLE_REQUEST,
} from "../constants/subjectConstants"


function getClassReducer(state = {}, action) {
    switch (action.type) {
        case GET_CLASS_REQUEST:
            return { ...state, status: false ,data:[],loading:true};
        case GET_CLASS_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_CLASS_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function getStudentReducer(state = {}, action) {
    switch (action.type) {
        case GET_STUDENT_REQUEST:
            return { ...state, status: false ,data:[],loading:true};
        case GET_STUDENT_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true ,loading:false};
        case GET_STUDENT_FAIL:
            return { ...state, loading: false, error: action.payload, status: false,loading:false };
        default: return state;
    }
}



function getUserTimetableReducer(state = {}, action) {
    switch (action.type) {
        case GET_USERS_TIMETABLE_REQUEST:
            return { ...state, status: false ,data:[],loading:true};
        case GET_USERS_TIMETABLE_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true ,loading:false};
        case GET_USERS_TIMETABLE_FAIL:
            return { ...state, loading: false, error: action.payload, status: false,loading:false };
        default: return state;
    }
}



function addClassReducer(state = {}, action) {
    switch (action.type) {
        case ADD_CLASS_REQUEST:
            return { ...state,loading: true ,status:false};
        case ADD_CLASS_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case ADD_CLASS_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}



function updateClassReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_CLASS_REQUEST:
            return { ...state,loading: true ,status:false};
        case UPDATE_CLASS_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case UPDATE_CLASS_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}



function deleteClassReducer(state = {}, action) {
    switch (action.type) {
        case DELETE_CLASS_REQUEST:
            return { ...state,loading: true ,status:false};
        case DELETE_CLASS_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case DELETE_CLASS_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


export {
    getClassReducer,
    addClassReducer,
    updateClassReducer,
    deleteClassReducer,
    getStudentReducer,
    getUserTimetableReducer
}




