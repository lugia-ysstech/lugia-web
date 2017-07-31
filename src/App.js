import React, { Component, } from 'react';
import Input from './widgets/input';

const debug = require('debug');

// debug.enable('*');
class App extends Component {
  onKeyUp = e => {
    console.info(e);
  };


  render () {
    return (
      <div style={{ width: 100, }}>
        <Input ref={node => this.input = node} prefix={<i>11</i>} suffix={<i>12</i>} onKeyUp={this.onKeyUp}/>
      </div>
    );
  }
}

export default App;
