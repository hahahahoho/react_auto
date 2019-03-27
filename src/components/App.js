import React, { Component } from 'react';
import List from './List';
import Input from './Input';
class App extends Component {
  render() {
    return (
      <div>
        <List></List>
        <li><Input></Input></li>
        <li><Input></Input></li>
        <li><Input></Input></li>
      </div>
    );
  }
}

export default App;
