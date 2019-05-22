import React, { Component } from 'react';
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
class List extends Component {
    constructor(props){
        super(props); 
        
    }

    setList(){
        const {listData, active_field, tbName, view_option, curPage, searchVal} = this.props
        let link_view_field = view_option !==false ?  view_option[0] : '' ;
        let data = listData.map(function(obj, index){
            return <Tr key={index}>
                {active_field.map((obj2)=>{
                    return Object.keys(obj).map((key)=>{
                        if(key === link_view_field && key ===obj2){
                            return <Td key={key}>
                                <Link to={{
                                    pathname :'/view', 
                                    state : {
                                        [view_option[1]] : obj[view_option[1]], 
                                        tbName : tbName, 
                                        curPage : curPage,
                                        searchVal : searchVal
                                        }
                                    }}>{obj[key]}
                                </Link>
                            </Td>
                        }else if(key === obj2){
                            return <Td key={key}>{obj[key]}</Td>
                        }
                    })
                })}
            </Tr>
        })
        return data
    }
    render() {
        return (
            <div>
                <Table>
                    <Thead>
                        <Tr>
                            
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.setList()}
                    </Tbody>
                </Table>
            </div>
        );
    }
}

export default List;