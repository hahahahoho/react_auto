import React, { Component } from 'react';

import styled from 'styled-components';
const Button = styled.button`

`
const Input = styled.input`

`


class Login extends Component {
    render() {
        const {loginEvent} = this.props
        console.log(loginEvent)
        return (
            <div>
                <ul>
                    <li><label>아이디 :</label><Input name="id" id="login_id" type="text" onchange={loginEvent.input_changeVal}/></li>
                    <li><label>비밀번호 :</label><Input name="password" id="login_password" type="text" onchange={loginEvent.input_changeVal}/></li>
                </ul>
                <Button text="로그인" id="login_btn" onClick={loginEvent.button_click}>로그인</Button>
                <Button text="회원가입" id="join_btn" onClick={loginEvent.button_click}>회원가입</Button>
            </div>
        );
    }
}

export default Login;