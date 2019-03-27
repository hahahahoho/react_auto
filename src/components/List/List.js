import React, {Component} from 'react';
import ListItem from './ListItem'
import axios from 'axios';
import * as listActions from '../../modules/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class List extends Component {
    state = {
        items : []
    }
    readList = ()=>{
        const {ListActions} = this.props;
        const obj = {no : 1, title : "test", contents : "test", solution : 'test'};
        ListActions.read(obj);
        //ListActions.read();
    }
    componentDidMount(){
        console.log(this.props.test);
        axios.get('http://192.168.0.40:3000/boards/1/1').then(res=>{
            const items = [];
            res.data.map((target, index)=>{
                let item = {};
                item['contents'] = target['_source'].contents;
                item['title'] = target['_source'].title;
                item['no'] = target['_source'].id;
                item['solution'] = target['_source'].solution;
                items.push(item);
            })
            this.setState({items : items});
        })
    }
    render(){
        const items = this.state.items;
        return (
            <div>
                {items.map((target, index)=>(
                    <ListItem key={index} item={target} readList={this.readList}></ListItem>
                ))}
            </div>
        );
    }
};

export default connect(
    (state) => ({ //최초의 상태만 가져와서 props로 값을 담는다! 변화하고부터는 다른걸로 가져와야겠지요?
        test : state.title  
    }),
    (dispatch) => ({ //액션이 실행되면 연결된 하위컴포넌트들의 값도 모두 변경
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(List);