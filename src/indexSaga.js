import {all, fork} from "redux-saga/effects";
import LoginWatcher from "./components/Login/LoginSaga";
import PostWatcher from "./components/Posts/PostSaga";


export default function* IndexSaga() {
    try {
        yield all([
            fork(LoginWatcher),
            fork(PostWatcher),
        ])
    } catch (e) {
        console.log(e)
    }

}
