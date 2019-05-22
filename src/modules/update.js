import { createAction, handleActions} from 'redux-actions';
import axios from 'axios'

const GET_POST_PENDING = "update/GET_POST_PENDING";
const GET_POST_SUCCESS = "update/GET_POST_SUCCESS";
const GET_POST_FAILURE = "update/GET_POST_FAILURE";
const GET_PUT_SUCCESS = 'update/GET_PUT_SUCCESS';
const SET_INIT_DATA = 'update/SET_INIT_DATA';
const CHANGE = 'update/CHANGE';

export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getDeleteSuccess = createAction(GET_PUT_SUCCESS);
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
export const updateView = (tbName, target, data) => (dispatch) =>{
    dispatch(getPostPending());
    return axios.put('http://192.168.0.81:3000/'+tbName+'/'+target, {params : data}).then(res => {
        dispatch(getDeleteSuccess(res))
        console.log(res);
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
    [CHANGE] : (state, action) => {
        let data = {...state.data, [action.payload.name] : action.payload.value}
        return {
            ...state,
            data : data
        }
    },
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
        console.log('데이터가져오기');
        return {
            ...state,
            pending : false,
            error : false,
            data : action.payload.data
        }
    },
    [GET_PUT_SUCCESS] : (state, action) => {
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