//@flow
import type { Props, State, } from 'vx-widget/input';

import React, { Component, } from 'react';
import style from 'styled-components';

const InputContainer = style.span`
  font-family: inherit;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  padding: 2px 3px;
  height: 28px;
  cursor: text;
  font-size: 12px;
  line-height: 1.5;

  &:hover {
    border-color: #49a9ee;
  }

  background-color: #fff;
  background-image: none;
  margin: 0;
  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.65);
  box-shadow: ${props => (props.focused ? '0 0 0 2px rgba(16, 142, 233, .2)' : '')};
`;

const Input = style.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin: 0;
  padding: 0;
`;

class TextBox extends Component<void, Props, State> {

  state: State;
  input: any;

  constructor (ctx: Props) {
    super(ctx);
    this.state = { focused: false, };
  }

  onFocus = () => {
    this.setState({ focused: true, });
  };

  onBlur = () => {
    this.setState({ focused: false, });
  };

  onChange = (event: Object) => {
    const { target, } = event;
    const { value, } = target;
    const { onChange, } = this.props;
    onChange && onChange(this.input.value, value);
  };

  render () {
    const { focused, } = this.state;
    const { value, defaultValue, } = this.props;

    return <InputContainer focused={focused}>
      <Input innerRef={node => this.input = node}
             onFocus={this.onFocus}
             defaultValue={defaultValue}
             value={value}
             onChange={this.onChange}
             onBlur={this.onBlur}/>
    </InputContainer>;
  }
}

export default TextBox;
