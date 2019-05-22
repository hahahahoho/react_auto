import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from  'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from 'modules/list'

const Input = styled.input`

`
const Button = styled.button`

`
function changeVal (state, props){
    return state
}
class SearchBar extends Component {
    constructor(props){
        super(props)
        
        this.state = {searchVal : ''}; //state 초기화
        if(this.props.tbName === undefined){
            throw {toString: function() { return "tbName not difined : undefined error."; } };
        }
    }
    
    changeVal = async (e)=>{ //화살표 함수의 경우 this를 자동으로 class객체로 지정. 일반 function일 경우 undefined가 뜰 수 있으니 조심
        e.preventDefault()
        let {ListActions} = this.props
        await this.setState({searchVal : e.target.value})
        // let data = {tbName : this.props.tbName, searchVal : this.state.searchVal}
        // await ListActions.change_search(data);
    }
 
    button_click = async (e) => {
        let {ListActions} = this.props
        let data = {tbName : this.props.tbName, searchVal : this.state.searchVal}
        await ListActions.change_search(data);
    }
    render() {
        return (
            <div>
                <Input type="text" value={this.state.search_value} onChange={this.changeVal}></Input>
                <Button onClick={this.button_click}>검색</Button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(SearchBar);