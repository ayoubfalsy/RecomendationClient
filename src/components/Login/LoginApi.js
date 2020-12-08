import {
    GET_USER_URL, INSCRIPTION_URL,
    LOGIN_ADMIN_URL, LOGIN_CHANGE_EMAIL_URL,
    LOGIN_CHECK_PWD_URL_IMAGE,
    LOGIN_FORGOT_URL_IMAGE,
    LOGIN_URL,
    LOGOUT_URL
} from "../../GeneralConstants";
import axios from 'axios';

class LoginApi {
    apiLoginUser(user) {
        let resp;
        let url = LOGIN_URL;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }

    apiInscription(obj) {
        let resp;
        let url = INSCRIPTION_URL;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }

    apiLoginCheckPwdUser(user) {
        let resp;
        let url = LOGIN_CHECK_PWD_URL_IMAGE;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }

    apiLoginChangeEmail(user) {
        let resp;
        let url = LOGIN_CHANGE_EMAIL_URL;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }



    apiLogOutUser(strEmail) {
        let url = LOGOUT_URL;
        return axios({
            method: 'post',
            url: url,
            data: strEmail,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        }).then(response => {
            return response;

        }).catch(err => {
            return err
        });
    }

    apiLogGetUser(email) {
        let url = GET_USER_URL + '/' + email;
        return axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        }).then(response => {
            return response;

        }).catch(err => {
            return err
        });
    }

    apiLoginForgot(user) {
        let resp;
        let url = LOGIN_FORGOT_URL_IMAGE + '/' + user;
        return axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }

    apiLoginAddAdmin(strEmail) {
        let resp;
        let url = LOGIN_ADMIN_URL + '/' + strEmail;
        return axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            }
        }).then(response => {
            return response;

        }).catch(err => {
            resp = {
                status: 403,
            };
            return resp
        });

    }
}

export default new LoginApi();
