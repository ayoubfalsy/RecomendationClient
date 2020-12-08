import {call, fork, put, take} from 'redux-saga/effects';
import LoginApi from "./PostApi";
import {
    addPostSuccess, addPostFailure,
    getPostUserSuccess, getPostUserFailure,
    deletePostUserSuccess, deletePostUserFailure,
    getAllPostUserSuccess, getAllPostUserFailure,
    getAllPostUserSearchSuccess,getAllPostUserSearchFailure
} from "./PostAction";
import {
    ADD_POST_REQUEST, DELETE_POST_USER_REQUEST, GET_ALLPOST_USER_REQUEST, GET_ALLPOSTSEARCH_USER_REQUEST,
    GET_POST_USER_REQUEST
} from "./PostConstant";
import history from "../../history";

function* addPost(post) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        {
            respUser = yield call(LoginApi.apiAddPost, post);

        }
     else
         history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                yield put(addPostSuccess(respUser.data));
                break;
            case 403:
                yield put(addPostFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(addPostFailure(error))
    } finally {

    }
    return respUser;
}

function* getPostUser(user,lngPage,lngSize) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        {
            respUser = yield call(LoginApi.apigetPostUser, user,lngPage,lngSize);
        }
        else
            history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                yield put(getPostUserSuccess(respUser.data));
                break;
            case 403:
                yield put(getPostUserFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(getPostUserFailure(error))
    } finally {

    }
    return respUser;
}

function* getAllPostUser(user) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        {
            respUser = yield call(LoginApi.apigetAllPost, user);
        }
        else
            history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                yield put(getAllPostUserSuccess(respUser.data));
                break;
            case 403:
                yield put(getAllPostUserFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(getAllPostUserFailure(error))
    } finally {

    }
    return respUser;
}

function* getAllPostSearchUser(user) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        {
            respUser = yield call(LoginApi.apigetAllPost, user);
        }
        else
            history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                yield put(getAllPostUserSearchSuccess(respUser.data));
                break;
            case 403:
                yield put(getAllPostUserSearchFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(getAllPostUserSearchFailure(error))
    } finally {

    }
    return respUser;
}

function* deletePostUser(userId) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        {
            respUser = yield call(LoginApi.apiDeletePostUser, userId);
        }
        else
            history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                yield put(deletePostUserSuccess(userId));
                break;
            case 403:
                yield put(deletePostUserFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(getPostUserFailure(error))
    } finally {

    }
    return respUser;
}



//-----------------Watcher ------------------------
function* PostWatcher() {
    while (true) {
        const action = yield take([
            ADD_POST_REQUEST,
            GET_POST_USER_REQUEST,
            GET_ALLPOST_USER_REQUEST,
            GET_ALLPOSTSEARCH_USER_REQUEST,
            DELETE_POST_USER_REQUEST
        ]);
        switch (action.type) {
                case ADD_POST_REQUEST:
                yield fork(addPost, action.post);
                break; case GET_POST_USER_REQUEST:
                yield fork(getPostUser, action.user,action.lngPage,action.lngSize);
                break;
                case GET_ALLPOST_USER_REQUEST:
                yield fork(getAllPostUser, action.user);
                break;
                case GET_ALLPOSTSEARCH_USER_REQUEST:
                yield fork(getAllPostSearchUser, action.user);
                break;
                case DELETE_POST_USER_REQUEST:
                yield fork(deletePostUser,action.userId);
                break;
            default:
                break;
        }
    }
}

export default PostWatcher
