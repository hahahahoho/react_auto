import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import SearchBar from 'components/SearchBar'
const HeaderTag = styled.header`
    height : 50px;
    background : #9e3e065e;
    margin-bottom : 5px;
`
const Li = styled.li`
    float : left;
    margin-right : 30px;
    margin-left : 10px;
    list-style : none;
`
const Header = ({history}) => {
    return (
        <React.Fragment>
            <HeaderTag>
                <Li><SearchBar tbName='notices_ela'/></Li>
                <Li><Link to='/list'>홈</Link></Li>
                <Li>
                    <Link to={{
                        pathname :'/list', 
                        state : {
                            curPage : 1,
                            searchVal : ''
                            }
                        }}>
                    리스트</Link>
                </Li>
                <Li><Link to='/Login'>로그인</Link></Li>
                <Li><Link to='/join'>회원가입</Link></Li>
            </HeaderTag>
        </React.Fragment>
    );
};

export default Header;