import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  userReducer,
  allUsersReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";


const reducer = combineReducers({
  allUsers: allUsersReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
});


let initialState = { };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

