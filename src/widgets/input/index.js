//@flow
import '../common/shirm';
import Support from '../common/FormFieldWidgetSupport';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import {
  DefaultHelp,
  getFocusShadow,
  getInputBorderColor,
  getInputBorderHoverColor,
  Height,
  Padding,
  RadiusSize,
} from '../css/input';
import { FontSize } from '../css';
import ErrorTip from '../tooltip/ErrorTip';
import { px2emcss } from '../css/units';

type InputState = {|
  value: string,
|};
type ValidateStatus = 'sucess' | 'error';

type InputProps = {|
  viewClass: string,
  disabled: boolean,
  validateStatus: ValidateStatus,
  help: ?string,
  placeholder?: string,
  prefix?: React$Element<any>,
  getTheme: Function,
  suffix?: React$Element<any>,
  onChange?: (newValue: any, oldValue: any) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  /*
   * 当键入回车时触发事件
   */
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
|};
const getWidth = props => {
  const { theme = {} } = props;
  const { width } = theme;
  return `width:${width ? width + 'px' : '100%'};`;
};
const em = px2emcss(1.2);
const CommonInputStyle = styled.input`
  border-radius: ${RadiusSize};
  border: 1px solid ${getInputBorderColor};
  cursor: text;
  line-height: 1.5;
  font-size: ${FontSize};
  height: ${em(Height)};
  display: inline-block;
  padding: ${em(Padding)} ${em(Padding + 1)};
  font-family: inherit;
  margin: 0;
  ${getWidth} &:hover {
    border-color: ${getInputBorderHoverColor};
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgba(0, 0, 0, 0.65);

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }

  &:focus {
    ${getFocusShadow};
  }
`;

const InputContainer = styled.span`
  position: relative;
  ${getWidth} display: inline-block;
  background-color: #fff;
`;
const LeftPadding = 5;

const getLeft = (props: Object) => {
  const { prefix } = props;
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
  const { suffix } = props;
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
    disabled: false,
    viewClass: Widget.Input,
    validateStatus: 'sucess',
    help: DefaultHelp,
    getTheme: () => {
      return {};
    },
  };
  input: any;
  static displayName = Widget.Input;

  constructor(props: InputProps) {
    super(props);
    const { defaultValue = '' } = props;
    this.state = { value: defaultValue };
  }

  onChange = (event: Object) => {
    const { target } = event;
    const { value } = target;
    this.setValue(value);
  };

  setValue(value: string): void {
    const oldValue = this.state.value;
    const { disabled, onChange } = this.props;
    if ('value' in this.props === false) {
      if (disabled) {
        return;
      }
      this.setState({ value }, () => {
        onChange && onChange(value, oldValue);
      });
    } else {
      onChange && onChange(value, oldValue);
    }
  }

  render() {
    const { props } = this;
    const { prefix, suffix } = props;
    if (!suffix && !prefix) {
      return this.generateInput(InputOnly);
    }
    const { getTheme } = props;

    const result = (
      <InputContainer className="sv" theme={getTheme()}>
        {this.generatePrefix()}
        {this.generateInput(Input)}
        {this.generateSuffix()}
      </InputContainer>
    );
    const { validateStatus } = props;

    if (validateStatus === 'sucess') {
      return result;
    }
    const { help } = props;

    return <ErrorTip title={help}>{result}</ErrorTip>;
  }

  generatePrefix(): React$Element<any> | null {
    const { prefix } = this.props;
    if (prefix) {
      return <Prefix>{prefix}</Prefix>;
    }
    return null;
  }

  generateSuffix(): React$Element<any> | null {
    const { suffix } = this.props;
    if (suffix) {
      return <Suffix>{suffix}</Suffix>;
    }
    return null;
  }

  focus() {
    if (this.input) {
      setTimeout(() => {
        this.input.focus();
      }, 0);
    }
  }

  generateInput(Input: Function): React$Element<any> {
    const { props, state } = this;
    const { suffix, prefix, validateStatus } = props;
    const { onKeyUp, onKeyPress, onFocus, onBlur, placeholder } = props;
    return (
      <Input
        innerRef={node => (this.input = node)}
        validateStatus={validateStatus}
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
        onChange={this.onChange}
      />
    );
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown, onEnter } = this.props;
    onKeyDown && onKeyDown(event);
    const { keyCode } = event;
    onEnter && keyCode === 13 && onEnter(event);
  };
}

export const TextBoxInner = TextBox;

const TargetTxtBox = ThemeProvider(KeyBoardEventAdaptor(TextBox), Widget.Input);
export default TargetTxtBox;
