import {call, fork, put, take} from 'redux-saga/effects';
import LoginApi from "./LoginApi";
import {
    inscriptionSuccess,
    inscriptionFailure,
    loginAddAdminFailure,
    loginAddAdminSuccess,
    loginCheckPwdFailure,
    loginCheckPwdSuccess,
    loginForgotFailure,
    loginForgotSuccess,
    loginGetUserFailure,
    loginGetUserSuccess,
    loginOutUserFailure,
    loginOutUserSuccess,
    loginUserFailure,
    loginUserSuccess,
    loginGetUserRequest,
    loginChangeEmailSuccess,loginChangeEmailFailure
} from "./LoginAction";
import {
    INSCRIPTION_REQUEST,
    LOGIN_ADD_ADMIN_REQUEST, LOGIN_CHANGE_EMAIL_REQUEST,
    LOGIN_CHECK_PWD_REQUEST,
    LOGIN_FORGOT_REQUEST,
    LOGIN_GET_USER_REQUEST,
    LOGIN_OUT_USER_REQUEST,
    LOGIN_USER_REQUEST,
} from "./LoginConstant";
import history from "../../history";


function* LoginUser(user) {
    let respUser;
    let jwtToken;
    try {
        respUser = yield call(LoginApi.apiLoginUser, user);
        switch (respUser.status) {
            case 200:
                history.push("/");
                jwtToken = respUser.headers.authorization;
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('email', user.email);
                yield put(loginUserSuccess(jwtToken));
                yield put(loginGetUserRequest(user.email));
                break;
            case 403:
                yield put(loginUserFailure(false));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginUserFailure(false))
    } finally {

    }
    return respUser;
}
function* Inscription(obj) {
    let respUser;
    try {
        respUser = yield call(LoginApi.apiInscription, obj);
        switch (respUser.status) {
            case 200:
                yield put(inscriptionSuccess(respUser.data));
                break;
            case 403:
                yield put(inscriptionFailure(false));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(inscriptionFailure(false))
    } finally {

    }
    return respUser;
}

function* LogUserForgot(user) {
    let respUser;
    try {
        respUser = yield call(LoginApi.apiLoginForgot, user);
        switch (respUser.status) {
            case 200:
                localStorage.removeItem('token');
                yield put(loginForgotSuccess(respUser.data));
                break;
            case 400:
                yield put(loginForgotFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginForgotFailure(error))
    } finally {

    }
    return respUser;
}

function* LogOUTUser(email) {
    let respUser;
    try {
        if(localStorage.getItem("token")!==null || localStorage.getItem("email")!==null || localStorage.getItem("user")!==null)
        respUser = yield call(LoginApi.apiLogOutUser, email);
        else
            history.push("/LoginUser");
        switch (respUser.status) {
            case 200:
                history.push("/LoginUser");
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('user');
                yield put(loginOutUserSuccess(true));
                break;
            case 400:
                yield put(loginOutUserFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginUserFailure(error))
    } finally {

    }
    return respUser;
}

function* LogUserCheckPwd(user) {
    let respUser;
    try {
        respUser = yield call(LoginApi.apiLoginCheckPwdUser, user);
        switch (respUser.status) {
            case 200:
                yield put(loginCheckPwdSuccess(respUser.data));
                break;
            case 400:
                yield put(loginCheckPwdFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginCheckPwdFailure(error))
    } finally {

    }
    return respUser;
}

function* LogUserChangeEmail(user) {
    let respUser;
    let newUSer;
    try {
        respUser = yield call(LoginApi.apiLoginChangeEmail, user);
        switch (respUser.status) {
            case 200:
                if(respUser.data.type === 1){
                    newUSer = JSON.parse(localStorage.getItem("user"));
                    newUSer.sexe = respUser.data.confirmPwd;
                    localStorage.setItem("user",JSON.stringify(newUSer))
                    // localStorage.setItem("email",respUser.data.newPwd)
                }
                yield put(loginChangeEmailSuccess(respUser.data));
                break;
            case 400:
                yield put(loginChangeEmailFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginChangeEmailFailure(error))
    } finally {

    }
    return respUser;
}

function* LogUserAddAdmin(strEmail) {
    let respUser;
    try {
        respUser = yield call(LoginApi.apiLoginAddAdmin, strEmail);
        switch (respUser.status) {
            case 200:
                history.push("/LoginAdmin");
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                yield put(loginAddAdminSuccess(respUser.data));
                break;
            case 400:
                yield put(loginAddAdminFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginAddAdminFailure(error))
    } finally {

    }
    return respUser;
}

function* getUser(email) {
    let respUser;
    try {
        respUser = yield call(LoginApi.apiLogGetUser, email);
        switch (respUser.status) {
            case 200:
                localStorage.setItem('user', JSON.stringify(respUser.data));
                yield put(loginGetUserSuccess(respUser.data));
                break;
            case 400:
                yield put(loginGetUserFailure(respUser.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(loginGetUserFailure(error))
    } finally {

    }
    return respUser;
}


//-----------------Watcher ------------------------
function* LoginWatcher() {
    while (true) {
        const action = yield take([
            INSCRIPTION_REQUEST,
            LOGIN_USER_REQUEST,
            LOGIN_OUT_USER_REQUEST,
            LOGIN_GET_USER_REQUEST,
            LOGIN_CHECK_PWD_REQUEST,
            LOGIN_FORGOT_REQUEST,
            LOGIN_ADD_ADMIN_REQUEST,
            LOGIN_CHANGE_EMAIL_REQUEST
        ]);
        switch (action.type) {
            case INSCRIPTION_REQUEST:
                yield fork(Inscription, action.obj);
                break;
            case LOGIN_USER_REQUEST:
                yield fork(LoginUser, action.user);
                break;
            case LOGIN_OUT_USER_REQUEST:
                yield fork(LogOUTUser, action.email);
                break;
            case LOGIN_GET_USER_REQUEST:
                yield fork(getUser, action.email);
                break;
            case LOGIN_CHECK_PWD_REQUEST:
                yield fork(LogUserCheckPwd, action.user);
                break;
            case LOGIN_CHANGE_EMAIL_REQUEST:
                yield fork(LogUserChangeEmail, action.user);
                break;
            case LOGIN_FORGOT_REQUEST:
                yield fork(LogUserForgot, action.user);
                break;
            case LOGIN_ADD_ADMIN_REQUEST:
                yield fork(LogUserAddAdmin, action.strEmail);
                break;
            default:
                break;
        }
    }
}

export default LoginWatcher
