//@flow
import type { InputProps, InputState, } from 'sv-widget';

import React, { Component, } from 'react';
import styled from 'styled-components';

const debug = require('debug')('Input');


const CommonInputStyle = styled.span`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  cursor: text;
  line-height: 1.5;
  font-size: 12px;
  height: 28px;
  padding: 2px 3px;
  font-family: inherit;
  margin: 0;

  &:hover {
    border-color: #49a9ee;
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgba(0, 0, 0, 0.65);
  box-shadow: ${props => (props.focused ? '0 0 0 2px rgba(16, 142, 233, .2)' : '')};
`;

const InputContainer = CommonInputStyle.extend`
  position: relative;
  display: inline-block;
  background-color: #fff;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin: 0;
  padding: 0;
`;

const InputOnly = CommonInputStyle.withComponent('input').extend`
  outline: none;
`;

class TextBox extends Component<void, InputProps, InputState> {

  state: InputState;
  input: any;

  constructor (props: InputProps) {
    super(props);
    this.state = { focused: false, value: this.getValue(props) };
  }

  getValue (props: InputProps): string {
    return '';
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
    onChange && onChange(value, this.input.value);
  };

  render () {
    const { focused, } = this.state;
    debug('dafas');
    const { value, defaultValue, prefix, suffix, } = this.props;
    // debug('%o', prefix);

    if (!suffix && !prefix) {
      return <InputOnly innerRef={node => this.input = node}
                        focused={focused}
                        onFocus={this.onFocus}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={this.onChange}
                        onBlur={this.onBlur}/>;
    }

    return <InputContainer focused={focused}>
      {prefix}
      <Input innerRef={node => this.input = node}
             onFocus={this.onFocus}
             defaultValue={defaultValue}
             value={value}
             onChange={this.onChange}
             onBlur={this.onBlur}/>
      {suffix}
    </InputContainer>;
  }
}

export default TextBox;
