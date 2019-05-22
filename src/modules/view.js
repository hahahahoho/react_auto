import { createAction, handleActions} from 'redux-actions';
import axios from 'axios'

const GET_POST_PENDING = "list_view/GET_POST_PENDING";
const GET_POST_SUCCESS = "list_view/GET_POST_SUCCESS";
const GET_POST_FAILURE = "list_view/GET_POST_FAILURE";
const GET_DELETE_SUCCESS = 'list_view/GET_DELETE_SUCCESS';
const CHANGE = 'list_view/CHANGE';
const SET_INIT_DATA = 'list_view/SET_INIT_DATA';

export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getDeleteSuccess = createAction(GET_DELETE_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);
export const setInitData = createAction(SET_INIT_DATA);
export const change = createAction(CHANGE);

export const getView = (tbName, target) => (dispatch) => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.81:3000/'+tbName+'/'+target).then(res => {
        
        dispatch(getPostSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
};
export const deleteView = (tbName, target) => (dispatch) =>{
    dispatch(getPostPending());
    return axios.delete('http://192.168.0.81:3000/'+tbName+'/'+target).then(res => {
        dispatch(getDeleteSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
}
const initialData = {
    pending : true,
    error : true,
    data : {}
}
export default handleActions({  
    [GET_POST_PENDING] : (state, action) => {
        console.log('펜딩중')
        return {
            ...state,
            pending : true,
            error : false
        }
    },
    [GET_POST_SUCCESS] : (state, action) => {
        console.log('성공');
        return {
            ...state,
            pending : false,
            error : false,
            data : action.payload.data
        }
    },
    [GET_DELETE_SUCCESS] : (state, action) => {
        console.log('성공');        
        return {
            ...state,
            pending : false,
            error : false
        }
    },
    [GET_POST_FAILURE] : (state, action) => {
        console.log('실패')
        return {
            ...state,
            pending : false,
            error : true
        }
    }
}, initialData)