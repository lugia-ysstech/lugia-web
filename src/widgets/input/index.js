//@flow

import Support from '../common/FormFieldWidgetSupport';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component, } from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import * as Widget from '../consts/Widget';
import ThemeProvider from '../common/ThemeProvider';
import { InputBorderColor, InputBorderHoverColor, RadiusSize, } from '../css/input';
import PlaceContainer from '../common/PlaceContainer';

type InputState = {|
  value: string,
|};

type InputProps = {|
  viewClass: string,
  readOnly: boolean,
  placeholder?: string;
  prefix?: React$Element<any>,
  getTheme: Function,
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
const getWidth = props => {
  const { theme = {}, } = props;
  const { width, } = theme;
  return `width:${width ? width + 'px' : '100%'};`;
};
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
  ${getWidth}
  &:hover {
    border-color: ${InputBorderHoverColor};
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgba(0, 0, 0, 0.65);
  &::placeholder{
    color: rgba(0,0,0,0.25);
  }
  &:focus {
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
  }
`;

const InputContainer = styled.span`
  position: relative;
  ${getWidth}
  display: inline-block;
  background-color: #fff;
`;
const LeftPadding = 5;

const getLeft = (props: Object) => {
  const { prefix, } = props;
  let padding = LeftPadding;
  if (prefix) {
    padding = LeftPadding + 24;
  }
  if (prefix && prefix.length) {
    padding = LeftPadding + prefix.length * 24;
  }
  return `${padding}px;`;
};
const getRight = (props: Object) => {
  const { suffix, } = props;
  let padding = 0;
  if (suffix) {
    padding = 24;
  }
  if (suffix && suffix.length) {
    padding = suffix.length * 24;
  }
  return `${padding}px;`;
};
export const Input = CommonInputStyle.extend`
  outline: none;
  margin: 0;
  min-height: 100%;
  z-index: 1;
  position: relative;
  :not(:first-child) {
    padding-left: ${getLeft};
    padding-right: ${getRight};
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
  static defaultProps = {
    readOnly: false,
    viewClass: Widget.Input,
    getTheme: () => {
      return {};
    },
  };
  input: any;
  static displayName = Widget.Input;

  constructor (props: InputProps) {
    super(props);
    const { defaultValue = '', } = props;
    this.state = { value: defaultValue, };
  }

  onChange = (event: Object) => {
    const { target, } = event;
    const { value, } = target;
    this.setValue(value);
  };

  setValue (value: string): void {
    const oldValue = this.state.value;
    const { readOnly, onChange, } = this.props;
    if ('value' in this.props === false) {
      if (readOnly) {
        return;
      }
      this.setState({ value, }, () => {
        onChange && onChange(value, oldValue);
      });
    } else {
      onChange && onChange(value, oldValue);
    }
  }

  render () {
    const { props, } = this;
    const { prefix, suffix, } = props;
    if (!suffix && !prefix) {
      return this.generateInput(InputOnly);
    }
    const { getTheme, } = props;
    return <InputContainer className="sv" theme={getTheme()}>
      <PlaceContainer>adsfas</PlaceContainer>
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
    const { props, state, } = this;
    const { suffix, prefix, } = props;
    const { onKeyUp, onKeyPress, onFocus, onBlur, placeholder, } = props;
    return <Input innerRef={node => this.input = node}
                  suffix={suffix}
                  prefix={prefix}
                  theme={this.props.getTheme()}
                  value={Support.getValue(props, state)}
                  onKeyUp={onKeyUp}
                  onKeyPress={onKeyPress}
                  placeholder={placeholder}
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

const TargetTxtBox = ThemeProvider(KeyBoardEventAdaptor(TextBox), Widget.Input);
export default TargetTxtBox;
