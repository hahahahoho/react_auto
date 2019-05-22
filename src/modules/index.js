import {combineReducers} from 'redux';
import list from './list';
import view from './view';
import update from './update';

import login from './login';
import join from './join';
import auth_phone from './auth_phone';
import auth_email from './auth_email';


//import {penderReducer} from 'redux-pender';

export default combineReducers({
    list,
    view,
    update,
    login,
    join,
    auth_phone,
    auth_email,
    // pender : penderReducer
})

