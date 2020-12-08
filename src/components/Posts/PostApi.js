import {
    ADD_POST_URL, DELETE_POST_USER_URL, GET_AllPOST_USER_URL, GET_POST_USER_URL
} from "../../GeneralConstants";
import axios from 'axios';

class PostApi {
    apiAddPost(post) {
        let url = ADD_POST_URL;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(post),
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

    apigetAllPost(posts) {
        let url = GET_AllPOST_USER_URL;
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(posts),
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

    apigetPostUser(lngId,lngPage,lngSize) {
        let url = GET_POST_USER_URL+"/"+lngId+"/"+lngPage+"/"+lngSize;
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



    apiDeletePostUser(userId) {
        let url = DELETE_POST_USER_URL+"/"+userId;
        return axios({
            method: 'delete',
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
}

export default new PostApi();
