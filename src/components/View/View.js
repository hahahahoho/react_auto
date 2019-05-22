import React, { Component } from 'react';
import styled from 'styled-components';
const Li = styled.li`

`
const Span = styled.span`

`
const Div = styled.div`
    display : inline-block;
`
const Button = styled.button`
    
`
class View extends Component {
    constructor(props){
        super(props);        
    }
    setView(){
        let {view_data, option} = this.props;
        return option.active_field.map(function(key2, index2){
            return  Object.keys(view_data).map(function(key, index){
                if(key === key2){
                    return <Li key='index'><Span>{key} : </Span><Div key={key}>{view_data[key]}</Div></Li>
                }
            })
        })
    }
    setButton(){
        if(this.props.option.active_btn){
            let buttons = this.props.option.btn;
            let viewEvent = this.props.viewEvent;
            if(Object.keys(buttons).length === 0){
                throw {toString: function() { return "option.btn : undefined error."; } };
            }
            return Object.keys(buttons).map(function(obj, index){
                return buttons[obj].active ? <Button id={obj} key={index} onClick={viewEvent.button_click}>{buttons[obj].text}</Button> : '';
            })
        }
    }
    render() {
        return (
            <div>
                {this.setView()}
                {this.setButton()}
            </div>
        );
    }
}

export default View;