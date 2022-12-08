import {
    GET_EVENT_REQUEST, GET_EVENT_SUCCESS,
    GET_EVENT_FAIL, EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS, EVENT_UPDATE_FAIL
} from "../constants/eventConstants"


function getEventReducer(state = {}, action) {
    switch (action.type) {
        case GET_EVENT_REQUEST:
            return { ...state, status: false };
        case GET_EVENT_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_EVENT_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function addEventReducer(state = {}, action) {
    switch (action.type) {
        case EVENT_UPDATE_REQUEST:
            return { ...state,loading: true ,status:false};
        case EVENT_UPDATE_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case EVENT_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


function updateEventReducer(state = {}, action) {
    switch (action.type) {
        case EVENT_UPDATE_REQUEST:
            return { ...state,loading: true ,status:false};
        case EVENT_UPDATE_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case EVENT_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


export {
    getEventReducer,
    addEventReducer,
    updateEventReducer

}




