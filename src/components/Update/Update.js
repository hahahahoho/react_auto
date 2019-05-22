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
const Input = styled.input`
    
`
class Update extends Component {
    constructor(props){
        super(props);        
    }
    setView(){
        let {update_data, option, updateEvent} = this.props;
        return option.active_field.map(function(key, index){
            return  Object.keys(update_data).map(function(key2, index2){
                if(key === key2){
                    if(!option.update_field.includes(key2)){
                        return <Li key={key2}><Span>{key2} : </Span><Div key={key2}>{update_data[key2]}</Div></Li>
                    }else{
                        return <Li key={key2}><Span>{key2} : </Span><Input name={key2} onChange={updateEvent.change_val} value={update_data[key2]} /></Li>
                    }
                }
            })
        })
    }
    setButton(){
        if(this.props.option.active_btn){
            let buttons = this.props.option.btn;
            let updateEvent = this.props.updateEvent;
            if(Object.keys(buttons).length === 0){
                throw {toString: function() { return "option.btn : undefined error."; } };
            }
            return Object.keys(buttons).map(function(obj, index){
                return buttons[obj].active ? <Button id={obj} key={index} onClick={updateEvent.button_click}>{buttons[obj].text}</Button> : '';
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

export default Update;