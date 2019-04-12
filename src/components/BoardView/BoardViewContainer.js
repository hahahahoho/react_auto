import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as viewActions from 'modules/boardView'
import BoardView from './BoardView';
class BoardViewContainer extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {ViewActions} = this.props
        ViewActions.boardViewAsync(this.props.history.location.state.id);   
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.state.boardView.data.id !== nextProps.state.boardView.data.id){  
            return true
        }else{
            return false
        }
    }
    render() {        
        return (
            <div>
                <BoardView eleStatus={this.props.state.boardView}></BoardView>
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
)(BoardViewContainer);