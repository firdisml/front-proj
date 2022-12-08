import {
    GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS,
    GET_BOOKING_FAIL, BOOKING_UPDATE_REQUEST,
    BOOKING_UPDATE_SUCCESS, BOOKING_UPDATE_FAIL,
    GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAIL,
} from "../constants/paymentConstants"

function getBookingReducer(state = {}, action) {
    switch (action.type) {
        case GET_BOOKING_REQUEST:
            return { ...state, status: false ,loading:true};
        case GET_BOOKING_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_BOOKING_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function getPaymentReducer(state = {}, action) {
    switch (action.type) {
        case GET_PAYMENT_REQUEST:
            return { ...state, status: false ,loading:true};
        case GET_PAYMENT_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_PAYMENT_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


function updateBookingReducer(state = {}, action) {
    switch (action.type) {
        case BOOKING_UPDATE_REQUEST:
            return { ...state, loading: true, status: false };
        case BOOKING_UPDATE_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case BOOKING_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


export {
    getBookingReducer,
    updateBookingReducer,
    getPaymentReducer,
}