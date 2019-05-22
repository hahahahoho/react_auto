import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// import List from './List';
// import Login from './Login';
import {
  Header, 
  MainPage, 
  SolutionListPage, 
  SolutionViewPage,
  SolutionUpdatePage,
  Login, 
  Join} 
from 'pages';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Route exact path='*' component={Header}/>
        <Route exact path='/' component={MainPage}/>
        <Route exact path='/list' component={SolutionListPage}/>
        <Route exact path='/view' component={SolutionViewPage}/>
        <Route exact path='/update' component={SolutionUpdatePage}/>
        <Route exact path='/Login' component={Login}/>
        <Route exact path='/Join' component={Join}/>
      </React.Fragment>
    );
  }
}

export default App;
