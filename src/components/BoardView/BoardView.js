import React from 'react';
import styled from 'styled-components';
const Ul = styled.ul`

`
const Li = styled.li`

`
const Sapn = styled.span`

`
const Div = styled.div`
    display : inline-block
`

const BoardView = ({eleStatus}) => {
    let target = ['id', 'title', 'contents', 'solution'];
    let data = target.map((obj, index)=>{
                    return Object.keys(eleStatus.data).map((key)=>{
                            if(key === obj){
                                return <Li key='index'><Sapn>{key} : </Sapn><Div key={key}>{eleStatus.data[key]}</Div></Li>
                            }
                    })
                })
    
    return (
        <div>
            <Ul>
                {data}
            </Ul>
        </div>
    );
};

export default BoardView;