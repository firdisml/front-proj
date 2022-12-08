import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, GET_USERLIST_FAIL, GET_USERLIST_REQUEST, GET_USERLIST_SUCCESS,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,
  DELETE_USER_REQUEST, DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USERDATA_SUCCESS, GET_USERDATA_FAIL,
  GET_USERDATA_REQUEST,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,

  GET_CHILDLIST_REQUEST, GET_CHILDLIST_SUCCESS,
  GET_CHILDLIST_FAIL,

  GET_TUTORLIST_REQUEST, GET_TUTORLIST_SUCCESS,
  GET_TUTORLIST_FAIL,

  GET_SELFDATA_REQUEST,
  GET_SELFDATA_SUCCESS,
  GET_SELFDATA_FAIL,




} from "../constants/userConstants"



function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      console.log(action.payload)
      return { ...state, loading: false, userInfo: action.payload, login: true };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload, login: false };
    case USER_LOGOUT:
      return { ...state, login: false };
    default: return state;
  }
}

function userSignUpReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, data: action.payload, status: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true, status: false };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}




function getUserDataReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERDATA_REQUEST:
      return { ...state, loading: true, data: {} };
    case GET_USERDATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case GET_USERDATA_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}


function getSelfDataReducer(state = {}, action) {
  switch (action.type) {
    case GET_SELFDATA_REQUEST:
      return { ...state, loading: true };
    case GET_SELFDATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case GET_SELFDATA_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}




function getUserListReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERLIST_REQUEST:
      return { loading: true };
    case GET_USERLIST_SUCCESS:
      return { loading: false, data: action.payload, status: true };
    case GET_USERLIST_FAIL:
      return { loading: false, error: action.payload, status: false };
    default: return state;
  }
}


function getChildListReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHILDLIST_REQUEST:
      return { ...state, loading: true };
    case GET_CHILDLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case GET_CHILDLIST_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function getTutorListReducer(state = {}, action) {
  switch (action.type) {
    case GET_TUTORLIST_REQUEST:
      return { ...state, loading: true };
    case GET_TUTORLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case GET_TUTORLIST_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function deleteUserReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, data: action.payload, status: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload, status: false };
    default: return state;
  }
}

export {
  userSigninReducer,
  getUserListReducer,
  deleteUserReducer,
  userSignUpReducer,
  getUserDataReducer,
  userUpdateReducer,
  getChildListReducer,
  getTutorListReducer,
  getSelfDataReducer
}