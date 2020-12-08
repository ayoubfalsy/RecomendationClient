import * as constants from "./PostConstant";
import {fromJS,List} from 'immutable';
import {isImmEmpty} from "../../globalComponents/utils/HelperFunctions";

const initialState = {
    loadingPost: false,
    errorsPost: false,
    userDetails: null,
    listPostUser:List(),
    listAllPostUser:List(),
    listAllSearchPosts:List(),
    loadingPostUser:false,
    loadingPostUserNotification:null,
    loadingAllPostUser:false,
    lastPost:false,
    lastAllPost:false,
};
function PostReducer(state = fromJS(initialState), action) {
    switch (action.type) {
        case constants.ADD_POST_REQUEST:
            return state.set('loadingPost', true).set("loadingPostUserNotification",true);
        case constants.ADD_POST_SUCCESS:
            let listPostUser = state.get('listPostUser');
            let post = listPostUser.find(data => data.get('postId') === action.payload.postId);
            let postIndex = listPostUser.findIndex(data => data.get('postId') === action.payload.postId);
            if(isImmEmpty(post)){
                listPostUser = listPostUser.unshift(fromJS(action.payload));
            }else{
                listPostUser = listPostUser.set(postIndex,fromJS(action.payload));
            }
            return state.set('post', fromJS(action.payload)).set('loadingPost', false).set('listPostUser', listPostUser).set('loadingPostUserNotification',false);
        case constants.ADD_POST_FAILURE:
            return state.set('errorsPost', action.error);

        case constants.GET_POST_USER_REQUEST:
            return state.set('loadingPostUser', true);
        case constants.GET_POST_USER_SUCCESS:
            console.log("test")
            let listPosts = state.get('listPostUser');
            listPosts =  listPosts.concat(fromJS(action.payload.content));
            return state.set('listPostUser', listPosts).set('loadingPostUser', false).set("lastPost",action.payload.last)
        case constants.GET_POST_USER_FAILURE:
            return state.set('errorsPost', action.error);

        case constants.GET_ALLPOST_USER_REQUEST:
            return state.set('loadingAllPostUser', true);
        case constants.GET_ALLPOST_USER_SUCCESS:
            let listAllPosts = state.get('listAllPostUser');
            listAllPosts =  listAllPosts.concat(fromJS(action.payload.content));
            return state.set('listAllPostUser', listAllPosts).set('loadingAllPostUser', false).set("lastAllPost",action.payload.last);
        case constants.GET_ALLPOST_USER_FAILURE:
            return state.set('errorsPost', action.error);

        case constants.GET_ALLPOSTSEARCH_USER_REQUEST:
            return state.set('loadingAllPostUser', true);
        case constants.GET_ALLPOSTSEARCH_USER_SUCCESS:
            let listAllSearchPosts = state.get('listAllSearchPosts');

                listAllSearchPosts =  listAllSearchPosts.concat(fromJS(action.payload.content));

            return state.set('listAllSearchPosts', listAllSearchPosts).set('loadingAllPostUser', false).set("lastAllPost",action.payload.last);
        case constants.GET_ALLPOSTSEARCH_USER_FAILURE:
            return state.set('errorsPost', action.error);

            case constants.SET_ALL_POST_SEARCH:
            return state.set('listAllSearchPosts',List());
            case constants.SET_NOTIFICATION:
            return state.set('loadingPostUserNotification',null);



        case constants.DELETE_POST_USER_REQUEST:
            return state.set('loadingPostUser', true);
        case constants.DELETE_POST_USER_SUCCESS:
            let newlistPosts = state.get('listPostUser').filter( post => parseInt(post.get("postId")) !== action.payload);
            return state.set('listPostUser', newlistPosts).set('loadingPostUser', false);
        case constants.DELETE_POST_USER_FAILURE:
            return state.set('errorsPost', action.error);



        default:
            return state;
    }
}

export default PostReducer;