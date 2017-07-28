//@flow
import type { InputProps, InputState, } from 'sv-widget';

import Support from '../common/FormFieldWidgetSupport';
import React, { Component, } from 'react';
import styled from 'styled-components';

const debug = require('debug')('Input');


const CommonInputStyle = styled.input`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  cursor: text;
  line-height: 1.5;
  font-size: 12px;
  height: 28px;
  padding: 2px 3px;
  font-family: inherit;
  margin: 0;
  width: 100%;
  &:hover {
    border-color: #49a9ee;
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgba(0, 0, 0, 0.65);

  &:focus {
    box-shadow: 0 0 0 2px rgba(16, 142, 233, .2);
  }
`;

const InputContainer = styled.span`
  position: relative;
  width: 100%;
  display: inline-block;
  background-color: #fff;
`;

export const Input = CommonInputStyle.extend`
  outline: none;
  margin: 0;
  min-height: 100%;
  z-index: 1;
  position: relative;
  :not(:first-child) {
    padding-left: 24px;
  }
`;

export const InputOnly = CommonInputStyle.extend`
  outline: none;
`;
const Fix = styled.span`
  left: 7px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  line-height: 0;
  color: rgba(0, 0, 0, 0.65);
`;

class TextBox extends Component<void, InputProps, InputState> {

  state: InputState;
  input: any;

  constructor (props: InputProps) {
    super(props);
    const { value, defaultValue, } = props;
    this.state = {
      value: Support.getValue({
        value,
        defaultValue,
      }),
    };
  }

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
    const { prefix, suffix, } = this.props;

    if (!suffix && !prefix) {
      return this.generateInput(InputOnly);
    }

    return <InputContainer >
      {this.generatePrefix()}
      {this.generateInput(Input)}
      {this.generateSuffix()}
    </InputContainer>;
  }

  generatePrefix (): React$Element<any> | null {
    const { prefix, } = this.props;
    if (prefix) {
      return <Fix>{prefix}</Fix>;
    }
    return null;
  }

  generateSuffix (): React$Element<any> | null {
    const { suffix, } = this.props;
    if (suffix) {
      return <Fix>{suffix}</Fix>;
    }
    return null;
  }

  generateInput (Input: Function): React$Element<any> {

    const { defaultValue, } = this.props;
    const { value, } = this.state;
    return <Input innerRef={node => this.input = node}
                  defaultValue={defaultValue}
                  value={value}
                  onChange={this.onChange}/>;
  }
}

export default TextBox;
