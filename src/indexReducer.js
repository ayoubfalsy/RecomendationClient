import {combineReducers} from 'redux-immutable';
import LoginReducer from "./components/Login/LoginReducer";
import PostReducer from "./components/Posts/PostReducer";


const IndexReducer = combineReducers({
    LoginReducer,
    PostReducer
});

export default IndexReducer;
