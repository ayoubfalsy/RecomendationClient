import * as constants from "./PostConstant";
export const addPostRequest = (post) => {
    return {
        type: constants.ADD_POST_REQUEST
        , post
    }
};
export const addPostSuccess = (payload) => {
    return {
        type: constants.ADD_POST_SUCCESS,
        payload
    }
};
export const addPostFailure = (error) => {
    return {
        type: constants.ADD_POST_FAILURE,
        error
    }
};

export const getPostUserRequest = (user,lngPage,lngSize) => {
    return {
        type: constants.GET_POST_USER_REQUEST
        , user,lngPage,lngSize
    }
};
export const getPostUserSuccess = (payload) => {
    return {
        type: constants.GET_POST_USER_SUCCESS,
        payload
    }
};
export const getPostUserFailure = (error) => {
    return {
        type: constants.GET_POST_USER_FAILURE,
        error
    }
};

export const deletePostUserRequest = (userId) => {
    return {
        type: constants.DELETE_POST_USER_REQUEST
        , userId
    }
};
export const deletePostUserSuccess = (payload) => {
    return {
        type: constants.DELETE_POST_USER_SUCCESS,
        payload
    }
};
export const deletePostUserFailure = (error) => {
    return {
        type: constants.DELETE_POST_USER_FAILURE,
        error
    }
};

export const getAllPostUserRequest = (user) => {
    return {
        type: constants.GET_ALLPOST_USER_REQUEST
        , user
    }
};
export const getAllPostUserSuccess = (payload) => {
    return {
        type: constants.GET_ALLPOST_USER_SUCCESS,
        payload
    }
};
export const getAllPostUserFailure = (error) => {
    return {
        type: constants.GET_ALLPOST_USER_FAILURE,
        error
    }
};

export const getAllPostUserSearchRequest = (user) => {
    return {
        type: constants.GET_ALLPOSTSEARCH_USER_REQUEST
        , user
    }
};
export const getAllPostUserSearchSuccess = (payload) => {
    return {
        type: constants.GET_ALLPOSTSEARCH_USER_SUCCESS,
        payload
    }
};
export const getAllPostUserSearchFailure = (error) => {
    return {
        type: constants.GET_ALLPOSTSEARCH_USER_FAILURE,
        error
    }
};

export const setAllPostSearch = () => {
    return {
        type: constants.SET_ALL_POST_SEARCH
    }
};
export const setNotification = () => {
    return {
        type: constants.SET_NOTIFICATION
    }
};






