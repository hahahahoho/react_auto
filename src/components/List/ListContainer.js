import React, { Component } from 'react';
import List from './List';
import {connect} from 'react-redux'
import * as listActions from 'modules/list'
import {bindActionCreators} from 'redux'
class ListContainer extends Component {
    constructor(props){
        super(props)
        
    }
    async componentDidMount(){
        const tbName = this.props.option.tbName;
        const pageSize = this.props.option.pageSize !== undefined ? this.props.option.pageSize : 10;
        const {ListActions} = this.props;
        let curPage = this.props.history.location.state !== undefined && this.props.history.location.state.curPage !== undefined ? this.props.history.location.state.curPage : 1
        let searchVal = this.props.history.location.state !== undefined && this.props.history.location.state.searchVal !== undefined ? this.props.history.location.state.searchVal : ''
        
        await ListActions.createComponent({tbName, curPage, searchVal});
        
        await ListActions.getCount(tbName, searchVal)
        await ListActions.searchList(tbName, curPage, pageSize, searchVal);
    }
     shouldComponentUpdate(nextProps, nextState){
        const tbName = this.props.option.tbName;
        const init_check = this.props.state.list.data[tbName] !== undefined && this.props.state.list.data[tbName].data === undefined
        const change_check = this.props.state.list.data[tbName] !== undefined && this.props.state.list.data[tbName].data !== undefined
        if(init_check && nextProps.state.list.data[tbName].data !== undefined){
            return true
        }else if(change_check && this.props.state.list.data[tbName].searchVal !== nextProps.state.list.data[tbName].searchVal
            || change_check && this.props.state.list.data[tbName].curPage !== nextProps.state.list.data[tbName].curPage){
            console.log(this.props)
            console.log(nextProps)
            this.callList(tbName, nextProps.state.list.data[tbName].curPage, nextProps.state.list.data[tbName].searchVal);
            return true
        }else if(nextProps.state.list.data[tbName].listChange === 'y'){
            return true
        }
        return false;
    }
    callList = async (tbName, curPage, searchVal)=>{
        const {ListActions} = this.props
        let pageSize = this.props.option.pageSize !== undefined ? this.props.option.pageSize : 10;
        if(searchVal !== ''){
            await ListActions.searchList(tbName, curPage, pageSize, searchVal);
        }else{
            await ListActions.getList(tbName, curPage, pageSize);
        }
        let params = {tbName : tbName, yn : 'y'}
        await ListActions.listChange(params)
    }
    async componentDidUpdate(prevProps, prevState){
        // 
        const tbName = this.props.option.tbName;
        if(prevProps.state.list.data[tbName].curPage !== this.props.state.list.data[tbName].curPage 
            || prevProps.state.list.data[tbName].searchVal !== this.props.state.list.data[tbName].searchVal){
                const {ListActions} = this.props;
                let curPage = this.props.state.list.data[tbName].curPage;
                let searchVal = this.props.state.list.data[tbName].searchVal;
                await this.callList(tbName, curPage, searchVal);
                let params = {tbName : tbName, yn : 'n'}
                ListActions.listChange(params)
            }
    }
    render() {
        let tbName = this.props.option.tbName
        let active_field = this.props.option.active_field;
        let active_btn = this.props.option.active_btn === false ? false : this.props.option.btn;
        let view_option = this.props.option.active_view === false ? false : [this.props.option.active_view_field, this.props.option.search_view_field];
        let listData = this.props.state.list.data[this.props.option.tbName] !== undefined ? this.props.state.list.data[this.props.option.tbName].data : []
        console.log(listData);
        return (
            <div>
                test입니다
                {listData.length !== 0 ? 
                    <List
                        tbName={tbName} 
                        active_field={active_field} 
                        listData={listData} 
                        active_btn={active_btn} 
                        view_option={view_option}
                        curPage={this.props.state.list.data[this.props.option.tbName].curPage}
                        searchVal={this.props.state.list.data[this.props.option.tbName].searchVal}
                        >
                    </List> : '데이터가 없습니다' 
                }
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
)(ListContainer);