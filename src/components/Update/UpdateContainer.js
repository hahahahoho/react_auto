import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as updateActions from 'modules/update.js'
import Update from './Update'
class UpdateContainer extends Component {
    constructor(props){
        super(props);    
        if(this.props.history.location.state === undefined){
            throw {toString: function() { return "access denied : linkParams undefined error."; } };
        }
        this.state={}
    }
    componentDidMount(){
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
        let {UpdateActions} = this.props
        UpdateActions.getView(tbName, id);
        
    }
    shouldComponentUpdate(nextProps, nextState){
        if(!nextProps.state.view.pending && !nextProps.state.view.error){
            return true
        }
        return false
    }
    componentDidUpdate(prevProps, prevState){

    }
    
    updateEvent = {
        button_click : async (e)=>{
            let {UpdateActions} = this.props
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
                    pathname : '/view',
                    state : {
                        id : id, 
                        tbName : tbName, 
                        curPage : curPage,
                        searchVal : searchVal
                    }
                })  
            };
            if(e.target.id === 'submit_btn'){              
                if(Object.keys(this.state).length !== 0){
                    let result = await UpdateActions.updateView(tbName, id, this.state)
                    if(result.data === 'success'){
                        alert('수정 성공');
                        history.push({
                            pathname : '/view',
                            state : {
                                id : id, 
                                tbName : tbName, 
                                curPage : curPage,
                                searchVal : searchVal
                            }
                        }) 
                    }else{
                        alert('수정 실패');
                        history.push({
                            pathname : '/view',
                            state : {
                                id : id, 
                                tbName : tbName, 
                                curPage : curPage,
                                searchVal : searchVal
                            }
                        })
                    }
                }else{
                    alert('수정사항이 없습니다.')
                }
            }
        },
        change_val : async (e) => {
            let {UpdateActions} = this.props
            let chage_data = {...this.state, [e.target.name] : e.target.value}
            UpdateActions.change({name : e.target.name, value : e.target.value})
            this.setState(chage_data)
        }
    }
    render() {
        let option = this.props.option
        return (
            <div>
                {Object.keys(this.props.state.update.data).length === 0 ? 'data searching' : <Update option={option} update_data={this.props.state.update.data} updateEvent={this.updateEvent}></Update>}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        UpdateActions : bindActionCreators(updateActions, dispatch)
    })
)(UpdateContainer);