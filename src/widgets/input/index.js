//@flow

import Support from '../common/FormFieldWidgetSupport';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component, } from 'react';
import styled from 'styled-components';
import '../../sv.css';
import { InputBorderColor, InputBorderHoverColor, RadiusSize, } from '../css/input';

type InputState = {|
  value: string,
|};

type GetValueArgType = {|
  defaultValue?: string,
  value?: string
|};

type InputProps = {|
  prefix?: React$Element<any>,
  suffix?: React$Element<any>,
  onChange?: (newValue: any, oldValue: any) => void,
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onFocus?: (event: UIEvent) => void;
  onBlur?: (event: UIEvent) => void;
  /*
   * 当键入回车时触发事件
   */
  onEnter?: (event: UIEvent) => void;
  defaultValue?: string,
  value?: string
|};

const CommonInputStyle = styled.input`
  border-radius: ${RadiusSize};
  border: 1px solid ${InputBorderColor};
  cursor: text;
  line-height: 1.5;
  font-size: 12px;
  height: 28px;
  display: inline-block;
  padding: 2px 3px;
  font-family: inherit;
  margin: 0;
  width: 100%;

  &:hover {
    border-color: ${InputBorderHoverColor};
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgba(0, 0, 0, 0.65);

  &:focus {
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
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
    padding-right: 24px;
  }
`;

export const InputOnly = CommonInputStyle.extend`
  outline: none;
`;

const Fix = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(50%);
  z-index: 2;
  line-height: 0;
  color: rgba(0, 0, 0, 0.65);
`;

const Prefix = Fix.extend`
  left: 7px;
`;

const Suffix = Fix.extend`
  right: 7px;
`;

class TextBox extends Component<InputProps, InputState> {

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
      const oldValue = this.state.value;
      this.setState({ value, }, () => {
        onChange && onChange(value, oldValue);
      });
    }
  }

  render () {
    const { prefix, suffix, } = this.props;

    if (!suffix && !prefix) {
      return this.generateInput(InputOnly);
    }

    return <InputContainer className="sv">
      {this.generatePrefix()}
      {this.generateInput(Input)}
      {this.generateSuffix()}
    </InputContainer>;
  }

  generatePrefix (): React$Element<any> | null {
    const { prefix, } = this.props;
    if (prefix) {
      return <Prefix>{prefix}</Prefix>;
    }
    return null;
  }

  generateSuffix (): React$Element<any> | null {
    const { suffix, } = this.props;
    if (suffix) {
      return <Suffix>{suffix}</Suffix>;
    }
    return null;
  }

  generateInput (Input: Function): React$Element<any> {

    const { defaultValue, onKeyUp, onKeyPress, onKeyDown, onFocus, onBlur, } = this.props;
    const { value, } = this.state;
    return <Input innerRef={node => this.input = node}
                  defaultValue={defaultValue}
                  value={value}
                  onKeyUp={onKeyUp}
                  onKeyPress={onKeyPress}
                  onKeyDown={this.onKeyDown}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={this.onChange}/>;
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown, onEnter, } = this.props;
    onKeyDown && onKeyDown(event);
    const { keyCode, } = event;
    onEnter && keyCode === 13 && onEnter(event);
  };
}

export const TextBoxInner = TextBox;

export default KeyBoardEventAdaptor(TextBox);
