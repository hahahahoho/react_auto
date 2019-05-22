import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as viewActions from 'modules/view.js'
import View from './View'
class ViewContainer extends Component {
    constructor(props){
        super(props);    
        if(this.props.history.location.state === undefined){
            throw {toString: function() { return "access denied : link undefined error."; } };
        }
    }
    componentDidMount(){
        console.log('didmount');
        //새로 바뀐 정보.
        let view_target = this.props.history.location.state
        let tbName = '';
        let id = 0;
        Object.keys(view_target).map(function(obj){
            if(obj === 'tbName'){
                tbName = view_target[obj]
            }else if(obj !== 'curPage' && obj !== 'searchVal'){
                id = parseInt(view_target[obj])
            }
        })
        let {ViewActions} = this.props
        ViewActions.getView(tbName, id);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(!nextProps.state.view.pending && !nextProps.state.view.error){
            return true
        }
        return false
    }
    componentDidUpdate(){
        
    }
    
    viewEvent = {
        button_click : async (e)=>{
            const {history} = this.props;
            let view_target = history.location.state
            let tbName = '';
            let id = 0;
            Object.keys(view_target).map(function(obj){
                if(obj === 'tbName'){
                    tbName = view_target[obj]
                }else if(obj !== 'curPage' && obj !== 'searchVal'){
                    id = parseInt(view_target[obj])
                }
            })
            let curPage = view_target.curPage;
            let searchVal = view_target.searchVal;

            if(e.target.id === 'exit_btn'){
                history.push({
                    pathname : '/list',
                    state : {
                        curPage : curPage,
                        searchVal : searchVal
                    }
                })  
            };
            if(e.target.id === 'update_btn'){              
                history.push({
                    pathname :'/update', 
                    state : {
                        id : id, 
                        tbName : tbName, 
                        curPage : curPage,
                        searchVal : searchVal
                    }
                })
            }
            if(e.target.id === 'delete_btn'){
                if(window.confirm('정말로 삭제 하시겠습니까?')){
                    let {ViewActions} = this.props
                    let result = await ViewActions.deleteView(tbName, id)
                    if(result.data === 'success'){
                        alert('삭제 완료');
                        history.push({
                            pathname : '/list',
                            state : {
                                curPage : curPage,
                                searchVal : searchVal
                            }
                        })  
                    }else{
                        alert('삭제 실패');
                    }
                }
            }
        }
    }
    render() {
        let option = this.props.option
        return (
            <div>
                {Object.keys(this.props.state.view.data).length === 0 ? 'data searching' : <View option={option} view_data={this.props.state.view.data} viewEvent={this.viewEvent}></View>}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        ViewActions : bindActionCreators(viewActions, dispatch)
    })
)(ViewContainer);