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


function getCommentsReducer(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS_REQUEST:
            return { ...state, status: false, data: [], loading: true };
        case GET_COMMENTS_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_COMMENTS_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function updateCommentsReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_COMMENTS_REQUEST:
            return { ...state, loading: true, status: false, loading: true };
        case UPDATE_COMMENTS_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case UPDATE_COMMENTS_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}


function getRatingReducer(state = {}, action) {
    switch (action.type) {
        case GET_RATING_REQUEST:
            return { ...state, status: false, data: [], loading: true };
        case GET_RATING_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case GET_RATING_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}

function updateRatingReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_RATING_REQUEST:
            return { ...state, loading: true, status: false, loading: true };
        case UPDATE_RATING_SUCCESS:
            return { ...state, loading: false, data: action.payload, status: true };
        case UPDATE_RATING_FAIL:
            return { ...state, loading: false, error: action.payload, status: false };
        default: return state;
    }
}



export {
    getCommentsReducer,
    updateCommentsReducer,
    getRatingReducer,
    updateRatingReducer
}




