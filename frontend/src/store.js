import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  userReducer,
  allUsersReducer,
  profileReducer,
  forgotPasswordReducer,
  sendEmailReducer,
  recommendationReducer
} from "./reducers/userReducer";

import {
  commentReducer,
  allcommentReducer
} from "./reducers/suggestionReducer";


const reducer = combineReducers({
  allUsers: allUsersReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  sendEmail: sendEmailReducer,
  recommendation: recommendationReducer,
  comment: commentReducer,
  allcomment: allcommentReducer
});


let initialState = { };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

