import update from 'react-addons-update';
import styled from 'styled-components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as listActions from 'modules/list';

const Button = styled.button`
    font-size:15px;
        ${props =>{
            if(parseInt(props['data-page']) === props.id){
                return 'color : blue; font-weight : bold'
            }
        }}
`

class Paginator extends Component {
    constructor(props){
        super(props);   
        this.state = {
            // curPage : 1,
            curBlock : 0,
            pageBlock : [],
            totalBlock : 0,
            totalPage : 0
        }
        if(this.props.tbName === undefined){
            throw {toString: function() { return "tbName not difined : undefined error."; } };
        }
    }
    componentDidMount(){
        //55부분을 최초 list의 토탈카운터로 가져오자. 그리고 추후 변경되는 부분은 didupdate에서 처리하자
        if(this.props.state.list.data[this.props.tbName] !== undefined){
            this.makePage(this.props.state.list.data[this.props.tbName].totalCount);
        }else{
            this.makePage(0);
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        let tbName = this.props.tbName !== undefined ? this.props.tbName : '';        
        let curPage_check =this.props.state.list.data[tbName] !== undefined &&  this.props.state.list.data[tbName].curPage !== nextProps.state.list.data[tbName].curPage;
        let totalPage_check = this.state.totalPage !== nextState.totalPage;
        if(this.props.state.list.data[tbName] !== undefined && 
            nextProps.state.list.data[tbName].totalCount !== undefined && 
            this.props.state.list.data[tbName].totalCount !== nextProps.state.list.data[tbName].totalCount){
                return true
        }else if(curPage_check || totalPage_check){
            return true
        }else if(this.props.state.list.data[tbName] !== undefined && nextProps.state.list.data[tbName].searchVal !== this.props.state.list.data[tbName].searchVal){
            let {ListActions} = this.props
            ListActions.change_page({curPage : 1, tbName : tbName});
            return true
        }
        return false
    }
    componentDidUpdate(prevProps, prevState){
        let tbName = this.props.tbName !== undefined ? this.props.tbName : '';
        let totalCount = this.props.state.list.data[tbName].totalCount;
        if(tbName !== ''){
            this.makePage(totalCount);
        }else{
            this.makePage(0);
        }
    }
    makePage = async (totalCount)=>{
        let perPage = 10;
        let totalPage = totalCount%perPage === 0 ? totalCount/perPage : parseInt(totalCount/perPage+1)
        let perBlock = 10;
        let totalBlock = totalPage%perBlock === 0 ? totalPage/perBlock : parseInt(totalPage/perBlock+1);
        let block = [];
        for(let i = 0 ; i < totalBlock; i++){
            let arr = [];
            for(let j = i*perBlock+1 ; j<(i+1)*perBlock+1; j++){
                if(j > totalPage)break;
                arr.push(j);
            }
            block.push(arr);
        }
        await this.setState({
            pageBlock : block,
            totalPage : totalPage,
            totalBlock : totalBlock
        });
    }
    button_click = async (e)=>{
        let val = e.target.id;
        let tbName = this.props.tbName !== undefined ? this.props.tbName : '';
        let curPage = isNaN(parseInt(val)) ? '' : parseInt(val);
        let {ListActions} = this.props
        if(this.state.pageBlock.length !== 0){
            if(val === 'prev'){
                if(this.props.state.list.data[tbName].curPage === 1){
                    alert('처음 페이지 입니다.');
                }else if(this.props.state.list.data[tbName].curPage === this.state.pageBlock[this.state.curBlock][0]){
                    await this.setState({  
                        curBlock : this.state.curBlock-1,
                    })
                    ListActions.change_page({curPage : this.props.state.list.data[tbName].curPage-1, tbName : tbName});
                }else{
                    ListActions.change_page({curPage : this.props.state.list.data[tbName].curPage-1, tbName : tbName});
                }
            }else if(val === 'next'){
                let lastPageIndex = this.state.pageBlock[this.state.totalBlock-1].length-1;
                let lastPage = this.state.pageBlock[this.state.totalBlock-1][lastPageIndex];
                let curBlockLastIndex = this.state.pageBlock[this.state.curBlock].length-1;
                let curBlockLastPage = this.state.pageBlock[this.state.curBlock][curBlockLastIndex];
                if(this.props.state.list.data[tbName].curPage >= lastPage){
                    alert('마지막 페이지 입니다.');
                }else if(this.props.state.list.data[tbName].curPage === curBlockLastPage){
                    this.setState({
                        curBlock : this.state.curBlock+1,
                    })
                    ListActions.change_page({curPage : this.props.state.list.data[tbName].curPage+1, tbName : tbName});
                }else{
                    ListActions.change_page({curPage : this.props.state.list.data[tbName].curPage+1, tbName : tbName});
                }
            }else{
                ListActions.change_page({curPage : curPage, tbName : tbName});
            }
        }else{
            if(val === 'prev'){
                alert('이전 페이지가 없습니다.');
            }else if(val === 'next'){
                alert('다음 페이지가 없습니다.');
            }else{
                alert('없는 페이지 입니다.');
            }
        }
    }
    render() {
        const tbName = this.props.tbName
        const arr = this.state.pageBlock;
        const curBlock = this.state.curBlock;
        const length = this.state.totalBlock
        
        return (
            <div>
                {length !== 0 ? <Button id="prev" onClick={this.button_click}>이전</Button> : ''}
                {arr.length !== 0 ? this.state.pageBlock[curBlock].
                    map(
                        (val, index)=>{return <Button key={val} data-page={this.props.state.list.data[tbName].curPage} id={val} onClick={this.button_click}>{val}</Button>}
                    ) : <Button  id={1}>1</Button>
                }
                {length !== 0 ? <Button id="next" onClick={this.button_click}>다음</Button> : ''}
                
            </div>
        )
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(Paginator);