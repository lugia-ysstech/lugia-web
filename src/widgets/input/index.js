//@flow
import React, { Component, } from 'react';
import style from './input.css';

class TextBox extends Component {

  render () {
    return  <input className={style.svInput}/>;
  }
}

export default TextBox;
