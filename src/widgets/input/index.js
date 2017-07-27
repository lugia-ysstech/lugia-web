//@flow
import type { InputProps, InputState, } from 'sv-widget';

import Support from '../common/FormFieldWidgetSupport';
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

export const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin: 0;
  padding: 0;
`;

export const InputOnly = CommonInputStyle.withComponent('input').extend`
  outline: none;
`;

class TextBox extends Component<void, InputProps, InputState> {

  state: InputState;
  input: any;

  constructor (props: InputProps) {
    super(props);
    const { value, defaultValue, } = props;
    this.state = {
      focused: false, value: Support.getValue({
        value,
        defaultValue,
      }),
    };
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
    this.setValue(value);
  };

  setValue (value: string): void {
    if ('value' in this.props === false) {
      const { onChange, } = this.props;
      this.setState({ value, });
      onChange && onChange(value, this.input.value);
    }
  }

  render () {
    const { focused, } = this.state;
    const { prefix, suffix, } = this.props;

    if (!suffix && !prefix) {
      return this.generateInput(InputOnly);
    }

    return <InputContainer focused={focused}>
      {prefix}
      {this.generateInput(Input)}
      {suffix}
    </InputContainer>;
  }

  generateInput (Input: Function): React$Element<any> {

    const { defaultValue, } = this.props;
    const { focused, value, } = this.state;
    return <Input innerRef={node => this.input = node}
                  onFocus={this.onFocus}
                  focused={focused}
                  defaultValue={defaultValue}
                  value={value}
                  onChange={this.onChange}
                  onBlur={this.onBlur}/>;
  }
}

export default TextBox;
