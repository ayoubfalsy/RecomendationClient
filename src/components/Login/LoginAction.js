import * as constants from "./LoginConstant";

export const inscriptionRequest = (obj) => {
    return {
        type: constants.INSCRIPTION_REQUEST
        ,obj
    }
};
export const inscriptionSuccess = (payload) => {
    return {
        type: constants.INSCRIPTION_SUCCESS,
        payload
    }
};
export const inscriptionFailure = (error) => {
    return {
        type: constants.INSCRIPTION_FAILURE,
        error
    }
};

export const setInscriptionValue = (value) => {
    return {
        type: constants.SET_INSCRIPTION_VALUE
        ,value
    }
};


export const loginUserRequest = (user) => {
    return {
        type: constants.LOGIN_USER_REQUEST,
        user
    }
};
export const loginUserSuccess = (payload) => {
    return {
        type: constants.LOGIN_USER_SUCCESS,
        payload
    }
};
export const loginUserFailure = (error) => {
    return {
        type: constants.LOGIN_USER_FAILURE,
        error
    }
};

export const loginForgotRequest = (user) => {
    return {
        type: constants.LOGIN_FORGOT_REQUEST,
        user
    }
};
export const loginForgotSuccess = (payload) => {
    return {
        type: constants.LOGIN_FORGOT_SUCCESS,
        payload
    }
};
export const loginForgotFailure = (error) => {
    return {
        type: constants.LOGIN_FORGOT_FAILURE,
        error
    }
};

export const loginOutUserRequest = (email) => {
    return {
        type: constants.LOGIN_OUT_USER_REQUEST,
        email
    }
};
export const loginOutUserSuccess = (payload) => {
    return {
        type: constants.LOGIN_OUT_USER_SUCCESS,
        payload
    }
};
export const loginOutUserFailure = (error) => {
    return {
        type: constants.LOGIN_OUT_USER_FAILURE,
        error
    }
};

export const loginGetUserRequest = (email) => {
    return {
        type: constants.LOGIN_GET_USER_REQUEST,
        email
    }
};
export const loginGetUserSuccess = (payload) => {
    return {
        type: constants.LOGIN_GET_USER_SUCCESS,
        payload
    }
};
export const loginGetUserFailure = (error) => {
    return {
        type: constants.LOGIN_GET_USER_FAILURE,
        error
    }
};

export const loginCheckPwdRequest = (user) => {
    return {
        type: constants.LOGIN_CHECK_PWD_REQUEST,
        user
    }
};
export const loginCheckPwdSuccess = (payload) => {
    return {
        type: constants.LOGIN_CHECK_PWD_SUCCESS,
        payload
    }
};
export const loginCheckPwdFailure = (error) => {
    return {
        type: constants.LOGIN_CHECK_PWD_FAILURE,
        error
    }
};

export const loginChangeEmailRequest = (user) => {
    return {
        type: constants.LOGIN_CHANGE_EMAIL_REQUEST,
        user
    }
};
export const loginChangeEmailSuccess = (payload) => {
    return {
        type: constants.LOGIN_CHANGE_EMAIL_SUCCESS,
        payload
    }
};
export const loginChangeEmailFailure = (error) => {
    return {
        type: constants.LOGIN_CHANGE_EMAIL_FAILURE,
        error
    }
};

export const loginAddAdminRequest = (strEmail) => {
    return {
        type: constants.LOGIN_ADD_ADMIN_REQUEST
        , strEmail
    }
};
export const loginAddAdminSuccess = (payload) => {
    return {
        type: constants.LOGIN_ADD_ADMIN_SUCCESS,
        payload
    }
};
export const loginAddAdminFailure = (error) => {
    return {
        type: constants.LOGIN_ADD_ADMIN_FAILURE,
        error
    }
};

export const setErrorsMsg = () => {
    return {
        type: constants.SET_ERROS_MSG
    }
};



