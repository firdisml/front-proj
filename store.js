import { createStore ,combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  userSigninReducer,
  getUserListReducer,
  deleteUserReducer,
  userSignUpReducer,
  getUserDataReducer,
  userUpdateReducer,
  getChildListReducer,
  getTutorListReducer,
  getSelfDataReducer
} from './reducers/userReducers'
import {
  getReportReducer,
  addReportReducer,
  getFeedbackReducer
} from './reducers/reportReducers'

import {
  getEventReducer,
  updateEventReducer,
  addEventReducer
  
} from './reducers/eventReducers'

import {
  getTimeslotReducer,
  updateTimeslotReducer,
} from './reducers/timeslotReducers'

import {
  getBookingReducer,
  updateBookingReducer,
  getPaymentReducer
} from './reducers/paymentReducers'
import { getClassReducer,getStudentReducer,updateClassReducer ,getUserTimetableReducer} from './reducers/subjectReducers'
import { getCommentsReducer,updateCommentsReducer ,getRatingReducer,updateRatingReducer} from './reducers/commentsReducers'


const initialState = {
  
  posts: [{id: 1, title: 'Test Post 121212'}],
  userSignin:{"":""},
  userSignUp:{"":""},
  userData:{data:{}},
  selfData:{data:{}},
  userUpdate:{data:[],status:false},
  childList:{data:[]},
  tutorList:{data:[]},
  student:{data:[],loading:false},
  userTimetable:{data:[],loading:false},
  rating:{data:[]},
  ratingUpdate:{data:[],status:false},
  comments:{data:[]},
  commentUpdate:{data:[],status:false},
  feedbacks:{data:[]},
  payments:{data:[]},
  report:{data:[]},
  reportUpdate:{data:[],status:false},
  classes:{data:[]},
  userList:{data:[],status:false},
  event:{data:[],status:false},
  eventUpdate:{status:false},
  userUpdate:{status:false},
  booking:{data:[],status:false},
  bookingUpdate:{status:false},
  timeslot:{data:[],status:false},
  timeslotUpdate:{status:false},
}

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userSignUp:userSignUpReducer,
  userData:getUserDataReducer,
  userUpdate:userUpdateReducer,
  selfData:getSelfDataReducer,
  posts:userSigninReducer,
  classes:getClassReducer,
  student:getStudentReducer,
  feedbacks:getFeedbackReducer,
  userTimetable:getUserTimetableReducer,
  payments:getPaymentReducer,
  rating:getRatingReducer,
  ratingUpdate:updateRatingReducer,
  comments:getCommentsReducer,
  commentUpdate:updateCommentsReducer,
  classesUpdate:updateClassReducer,
  report:getReportReducer,
  reportUpdate:addReportReducer,
  userList:getUserListReducer,
  tutorList:getTutorListReducer,
  childList:getChildListReducer,
  event:getEventReducer,
  eventUpdate:updateEventReducer,
  booking:getBookingReducer,
  bookingUpdate:updateBookingReducer,
  timeslot:getTimeslotReducer,
  timeslotUpdate:updateTimeslotReducer,
});
let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store