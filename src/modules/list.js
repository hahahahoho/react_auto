import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

const CHANGE_PAGE = 'list_test/CHANGE_PAGE';
const CHANGE_SEARCH = 'list_test/CHANGE_SEARCH';
const GET_POST_PENDING = "list_test/GET_POST_PENDING";
const GET_POST_SUCCESS = "list_test/GET_POST_SUCCESS";
const GET_COUNT_SUCCESS = "list_test/GET_COUNT_SUCCESS";
const GET_POST_FAILURE = "list_test/GET_POST_FAILURE";
const CREATE_COMPONENT = 'list_test/CREATE_COMPONENT';
const LIST_CHANGE = 'list_test/LIST_CHANGE';
export const change_page = createAction(CHANGE_PAGE);
export const change_search = createAction(CHANGE_SEARCH);
export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getCountSuccess = createAction(GET_COUNT_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);
export const createComponent = createAction(CREATE_COMPONENT);
export const listChange = createAction(LIST_CHANGE);
//전체리스트
export const getCount = (tbName, searchVal) => async (dispatch) => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.81:3000/'+tbName+'/'+searchVal).then(res=>{     
        res.tbName = tbName;
        dispatch(getCountSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
}
export const getList = (tbName, pageNo, pageSize) => dispatch => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.81:3000/'+tbName+'/'+pageNo+'/'+pageSize).then(res=>{     
        res.tbName = tbName;
        dispatch(getPostSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
}
//검색리스트
export const searchList = (tbName, pageNo, pageSize, searchVal) => dispatch => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.81:3000/'+tbName+'/'+pageNo+'/'+pageSize+'/'+searchVal).then(res=>{     
        res.tbName = tbName;
        dispatch(getPostSuccess(res))
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
    [LIST_CHANGE] : (state, action) => {
        let tbName = action.payload.tbName
        let targetData = {...state.data[tbName], listChange : action.payload.yn}
        let data = {...state.data, [tbName] : targetData}
        return {
            ...state,
            data : data
        }
    },
    [CREATE_COMPONENT] : (state, action) => {
        let tbName = action.payload.tbName;
        let curPage = action.payload.curPage;
        let searchVal = action.payload.searchVal;
        
        //let data = {...state.data, [tbName] : {searchVal : searchVal, curPage : curPage, listChange : 'n'}}
        let data = {...state.data, [tbName] : {...state.data[tbName], searchVal : searchVal, curPage : curPage, listChange : 'n'}}
        console.log(state);
        console.log(data)
        return {
            ...state,
            data : data
        }
    },
    [CHANGE_PAGE] : (state, action)=>{
        let tbName = action.payload.tbName
        let curPage = action.payload.curPage
        let targetData = {...state.data[tbName], curPage :curPage}
        let data = {...state.data, [tbName] : targetData};
        return {
            ...state,
            data : data
        }
    },
    [CHANGE_SEARCH] : (state, action)=>{
        let tbName = action.payload.tbName
        let searchVal = action.payload.searchVal
        let targetData = {...state.data[tbName], searchVal :searchVal, curPage : 1}
        let data = {...state.data, [tbName] : targetData};
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
        let tbName = action.payload.tbName;
        let data;
        if(action.payload.data.length !== 0 && Object.keys(action.payload.data[0]).includes('totalCount')){
            data = {...state.data[tbName], totalCount : action.payload.data[0].totalCount, data : action.payload.data}
        }else if(action.payload.data.length === 0 ){
            data = {...state.data[tbName], totalCount : 1, data : action.payload.data}
        }else{
            data = {...state.data[tbName], data : action.payload.data}
        }
        console.log(data);
        return {
            ...state,
            pending : false,
            data : {...state.data, [tbName] : data}
        }
    },
    [GET_COUNT_SUCCESS] : (state, action) => {
        console.log('성공');
        let tbName = action.payload.tbName;
        let data;
        if(action.payload.data.length === 1 && Object.keys(action.payload.data[0])[0] === 'totalCount'){
            data = {...state.data[tbName], 'totalCount' : action.payload.data[0].totalCount}
        }
        console.log(data);
        return {
            ...state,
            pending : false,
            data : {...state.data, [tbName] : data}
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