import React, { Component, } from 'react';
import Input from './widgets/inputtag';
import Item from './widgets/inputtag/Item';

class App extends Component {
  onKeyUp = e => {
    console.info('keyUp', e);
  };

  onKeyDown = e => {
    console.info('onKeyDown', e);
  };
  onKeyPress = e => {
    console.info('onKeyPress', e);
  };
  onFocus = e => {
    console.info('onFocus', e);
  };

  onBlur = e => {
    console.info('onBlur', e);
  };

  onEnter = e => {
    console.info('onEnter', e);
  };

  onChange = (n, o) => {
    console.info('onChange', n, o);
  };


  render () {
    return (
      <div style={{ width: 100, margin: '0 auto', }}>
        <Input ref={node => this.input = node} prefix={<i>11</i>} suffix={<i>12</i>}
               onKeyUp={this.onKeyUp}
               onKeyDown={this.onKeyDown}
               onKeyPress={this.onKeyPress}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               onChange={this.onChange}
               onEnter={this.onEnter}
               value={['a','b','c',]}
        >
        </Input>
      </div>
    );
  }
}

export default App;
