import * as constants from "./LoginConstant";
import {fromJS, Map} from 'immutable';

const initialState = {
    token: "",
    loadingLogin: false,
    loadingInscription: false,
    errorsLogin: false,
    errorsInscription: true,
    image: null,
    userDetails: null,
    pwdDetails: Map(),
    errorsPwd: true,
    inscriptionValue:null,
    forgotValue:null,
    lodingForgot:false,
    loadingPwd:false,
    loadingEmail:false,
    EmailDetails:Map(),

};

function LoginReducer(state = fromJS(initialState), action) {
    switch (action.type) {
        case constants.INSCRIPTION_REQUEST:
            return state.set('loadingInscription', true);
        case constants.INSCRIPTION_SUCCESS:
            return state.set('loadingInscription', false).set('inscriptionValue', action.payload);
        case constants.INSCRIPTION_FAILURE:
            return state.set('errorsInscription', action.error);

        case constants.SET_INSCRIPTION_VALUE:
            return state.set('inscriptionValue', action.value);

        case constants.LOGIN_USER_REQUEST:
            return state.set('loadingLogin', true).set('errorsLogin', false);
        case constants.LOGIN_USER_SUCCESS:
            return state.set('token', fromJS(action.payload)).set('loadingLogin', false).set('errorsLogin', false);
        case constants.LOGIN_USER_FAILURE:
            return state.set('errorsLogin', true).set('loadingLogin', false);

            case constants.SET_ERROS_MSG:
            return state.set('errorsLogin', false)

        case constants.LOGIN_FORGOT_REQUEST:
            return state.set('forgotValue', null).set('lodingForgot',true);
        case constants.LOGIN_FORGOT_SUCCESS:
            return state.set('forgotValue', fromJS(action.payload)).set('lodingForgot',false);
        case constants.LOGIN_FORGOT_FAILURE:
            return state.set('lodingForgot',false).set('forgotValue',null);

        case constants.LOGIN_GET_USER_REQUEST:
            return state.set('loadingLogin', true);
        case constants.LOGIN_GET_USER_SUCCESS:
            return state.set('userDetails', fromJS(action.payload)).set('loadingLogin', false);
        case constants.LOGIN_GET_USER_FAILURE:
            return state.set('errorsLogin', action.error);



        case constants.LOGIN_CHECK_PWD_REQUEST:
            return state.set('loadingPwd', true);
        case constants.LOGIN_CHECK_PWD_SUCCESS:
            return state.set('pwdDetails', fromJS(action.payload)).set('loadingPwd',false);
        case constants.LOGIN_CHECK_PWD_FAILURE:
            return state.set('errorsPwd', action.error);

            case constants.LOGIN_CHANGE_EMAIL_REQUEST:
            return state.set('loadingEmail', true);
        case constants.LOGIN_CHANGE_EMAIL_SUCCESS:
            return state.set('EmailDetails', fromJS(action.payload)).set('loadingEmail',false);
        case constants.LOGIN_CHANGE_EMAIL_FAILURE:
            return state.set('errorsPwd', action.error);
        default:
            return state;
    }
}

export default LoginReducer;