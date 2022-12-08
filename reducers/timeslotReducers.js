import {
    GET_TIMESLOT_REQUEST, GET_TIMESLOT_SUCCESS,
    GET_TIMESLOT_FAIL, TIMESLOT_UPDATE_REQUEST,
    TIMESLOT_UPDATE_SUCCESS, TIMESLOT_UPDATE_FAIL
} from "../constants/timeslotConstants"


function getTimeslotReducer(state = {}, action) {
    switch (action.type) {
        case GET_TIMESLOT_REQUEST:
            return { ...state, status: false ,loading:true};
        case GET_TIMESLOT_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_TIMESLOT_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function updateTimeslotReducer(state = {}, action) {
    switch (action.type) {
        case TIMESLOT_UPDATE_REQUEST:
            return { ...state,loading: true ,status:false};
        case TIMESLOT_UPDATE_SUCCESS:
            return { ...state,loading: false, data: action.payload, status: true };
        case TIMESLOT_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}




export {
    getTimeslotReducer,
    updateTimeslotReducer

}




