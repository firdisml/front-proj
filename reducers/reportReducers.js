import {
    GET_REPORT_REQUEST, GET_REPORT_SUCCESS,
    GET_REPORT_FAIL, REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS, REPORT_UPDATE_FAIL,
    GET_FEEDBACK_REQUEST,GET_FEEDBACK_FAIL,
    GET_FEEDBACK_SUCCESS
} from "../constants/reportConstant"


function getReportReducer(state = {}, action) {
    switch (action.type) {
        case GET_REPORT_REQUEST:
            return { ...state, status: false ,loading:true};
        case GET_REPORT_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_REPORT_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function getFeedbackReducer(state = {}, action) {
    switch (action.type) {
        case GET_FEEDBACK_REQUEST:
            return { ...state, status: false,loading:true };
        case GET_FEEDBACK_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_FEEDBACK_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function addReportReducer(state = {}, action) {
    switch (action.type) {
        case REPORT_UPDATE_REQUEST:
            return { ...state,loading: true ,status:false};
        case REPORT_UPDATE_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case REPORT_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


export {
    getReportReducer,
    addReportReducer,
    getFeedbackReducer
}