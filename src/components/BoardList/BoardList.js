import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Table = styled.table`

`
const Tbody = styled.tbody`

`
const Thead = styled.thead`

`
const Tr = styled.tr`

`
const Th = styled.th`
    border : 1px solid black;
`
const Td = styled.td`
    border : 1px solid black;
`
const BoardList = ({eleStatus, tName}) => {
    let target = ['id','type','subtype', 'keyword', 'title'];
    let head = target.map((obj, index) => {
        return <Th key={index}>{obj}</Th>
    })
    let data ;
    if(eleStatus.data[tName] !== undefined){
        data = eleStatus.data[tName].map(function(obj, index){
            return <Tr key={index}>
                {target.map((obj2, index)=>{
                   return Object.keys(obj).map((key)=>{
                        if(key === 'title' && key === obj2){
                            return <Td key={key}><Link to={{pathname :'/BoardView', state : {id : obj['id']}}}>{obj[key]}</Link></Td>
                        }else if(key === obj2){
                            return <Td key={key}>{obj[key]}</Td>
                        }
                   })
                })}
            </Tr>
        })
    }
    return (
        <div>
            <Table>
                <Thead>
                    <Tr>
                        {head}
                    </Tr>
                </Thead>
                <Tbody>
                    { data}
                </Tbody>
            </Table>
        </div>
    );
};

export default BoardList;