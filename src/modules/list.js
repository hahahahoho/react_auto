import {Map, List} from 'immutable';
import {handleActions, createAction} from 'redux-actions'


const CREATE = 'list/CREATE';
const REMOVE = 'list/REMOVE';
const UPDATE = 'list/UPDATE';
const READ = 'list/READ';

//액션 생성
export const create = createAction(CREATE); //export function create(){return {type : CREATE}} //type이 담긴 객체를 반환한다. 액션생성;
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const read = createAction(READ);

const initialState = {no : 100, title : "qwe", contents : "qwe", solution : "qwe" };

//const initialState = [];
//액션 핸들
export default handleActions({
    [CREATE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [REMOVE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [UPDATE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [READ] : (state, action) => {
        console.log(state);
        console.log(action.payload)
        // const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        // return state.push(Map({ //처리 후 상태를 변경해준다.
        //     id,text,done
        // }))
    }
}, initialState)



