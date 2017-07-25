//@flow
import type { Props, State, } from 'vx-widget/input';

import React, { Component, } from 'react';
import style from './input.css';

const debug = require('debug')('Input');


class TextBox extends Component<void, Props, State> {

  state: State;
  onFocus = () => {
    this.setState({ focused: true, });
  };

  onBlur = () => {
    this.setState({ focused: false, });
  };

  constructor (ctx: Props) {
    super(ctx);
    this.state = { focused: false, };
  }


  render () {
    const { svInputInput, svInputContainer, focus, } = style;
    const { focused, } = this.state;

    const inputClass = focused ? `${svInputContainer} ${focus}` : svInputContainer;

    debug('状态 = %s, inputClass = %s', focused, inputClass);

    return <span className={inputClass}>
      <input className={svInputInput}
             onFocus={this.onFocus}
             onBlur={this.onBlur}/>
    </span>;
  }
}

export default TextBox;
