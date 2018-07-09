//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { fixControlledValue } from '.././utils';
import type { MarginType, ThemeType, WidthType } from '@lugia/lugia-web';

import {
  DefaultHeight,
  DefaultHelp,
  getFocusShadow,
  getInputBorderColor,
  getInputBorderHoverColor,
  LargeHeight,
  RadiusSize,
  SmallHeight,
} from '../css/input';
import { FontSize } from '../css';
import ErrorTip from '../tooltip/ErrorTip';
import { px2emcss } from '../css/units';
import Icon from '../icon';

type InputState = {|
  value: string,
|};
type ValidateStatus = 'success' | 'error';

type InputSize = 'small' | 'default' | 'large';

type CommonInputProps = {
  theme: ThemeType,
  size?: InputSize,
  disabled: boolean,
};

type InputProps = {|
  size?: InputSize,
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
  formatter?: (value: number | string) => string,
  parser?: (displayValue: number | string) => string,
|};
const getWidth = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `width:${width ? em(width) : em(200)};`;
};
const getPadding = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `${width && width < 200 ? em(width / 20) : em(10)};`;
};
const getMargin = (props: CommonInputProps) => {
  const { theme } = props;
  const { margin } = theme;
  if (typeof margin === 'number') {
    return `margin:${em(margin)} `;
  }
};
const getSize = (props: CommonInputProps) => {
  const { size } = props;
  return `height:${
    size === 'large'
      ? LargeHeight + 'px'
      : size === 'small'
        ? SmallHeight + 'px'
        : DefaultHeight + 'px'
  };`;
};

const getBackground = (props: CommonInputProps) => {
  const { disabled } = props;
  return `background:${disabled ? '#f2f2f2' : ''}`;
};
const getCursor = (props: CommonInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'text'}`;
};
const em = px2emcss(1.2);

const CommonInputStyle = styled.input`
  ${getBackground};
  ${getSize};
  ${getCursor};
  ${getMargin};
  ${getWidth};
  border-radius: ${RadiusSize};
  border: 1px solid ${getInputBorderColor};
  line-height: 1.5;
  font-size: ${FontSize};
  display: inline-block;
  padding: 0 ${getPadding};
  font-family: inherit;
  &:hover {
    border-color: ${getInputBorderHoverColor};
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  color: rgb(51, 51, 51);
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  &:focus {
    border-color: #684fff;
    ${getFocusShadow};
  }
`;

const InputContainer = styled.span`
  position: relative;
  ${getWidth};
  ${getMargin};
  display: inline-block;
  background-color: #fff;
`;

export const Input = CommonInputStyle.extend`
  outline: none;
  min-height: 100%;
  z-index: 1;
  position: relative;
  :not(:first-child) {
    padding-left: ${getPadding};
    padding-right: ${getPadding};
  }
`;

export const InputOnly = CommonInputStyle.extend`
  outline: none;
`;

const Fix = styled.span`
  position: absolute;
  transform: translateY(50%);
  z-index: 2;
  bottom: 45%;
  line-height: ${em(10)};
  font-size: 1.6em;
  color: rgba(0, 0, 0, 0.65);
`;

const Prefix = Fix.extend`
  left: ${getPadding};
`;

const Suffix = Fix.extend`
  right: ${getPadding};
`;
const Clear = 'lugia-icon-reminder_close_circle';
const ClearButton: Object = styled(Icon)`
  position: absolute;
  transform: translateY(50%);
  z-index: 2;
  bottom: 45%;
  line-height: ${em(10)};
  font-size: 1.2em;
  right: ${getPadding};
  color: rgba(0, 0, 0, 0.65);
`;

class TextBox extends Component<InputProps, InputState> {
  static defaultProps = {
    disabled: false,
    viewClass: Widget.Input,
    validateStatus: 'success',
    size: 'default',
    help: DefaultHelp,
    defaultValue: '',
    getTheme: () => {
      return {};
    },
    formatter: (value: string | number) => {
      return value;
    },
    parser: (value: string | number) => {
      return value;
    },
  };
  input: any;
  static displayName = Widget.Input;

  constructor(props: InputProps) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    let { value, defaultValue } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);
    if (!preState) {
      return {
        value: hasValueInprops ? value : defaultValue,
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }

  onChange = (event: Object) => {
    const { target } = event;
    const { value } = target;
    this.setValue(value);
  };

  setValue(value: string): void {
    const oldValue = this.state.value;
    const { disabled, onChange, parser, formatter } = this.props;
    if ('value' in this.props === false) {
      if (disabled) {
        return;
      }
      if (formatter && parser) {
        value = parser(value);
      }
      this.setState({ value }, () => {
        onChange && onChange(value, oldValue);
      });
    } else {
      onChange && onChange(value, oldValue);
    }
  }
  onFocus = (event: UIEvent) => {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  };
  onBlur = (event: UIEvent) => {
    const { onBlur } = this.props;
    onBlur && onBlur(event);
  };

  isEmpty(): boolean {
    const { value } = this.state;
    return value && value.length ? false : true;
  }

  getClearButton() {
    if (this.isEmpty()) {
      return null;
    }
    return (
      <ClearButton iconClass={Clear} viewClass={ClearButton.displayName} onClick={this.onClear} />
    );
  }

  onClear = (e: Object) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setValue('');
  };

  getInputContainer() {
    const { getTheme } = this.props;
    const suffix = this.generateSuffix();
    return (
      <InputContainer className="sv" theme={getTheme()}>
        {this.generatePrefix()}
        {this.generateInput(Input)}
        {suffix ? suffix : this.getClearButton()}
      </InputContainer>
    );
  }

  render() {
    const { props } = this;
    const { validateStatus } = props;
    const result = this.getInputContainer();

    if (validateStatus === 'success') {
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
    const { props } = this;
    let { value } = this.state;
    const { suffix, prefix, validateStatus, size, disabled, formatter, parser } = props;
    const { onKeyUp, onKeyPress, placeholder } = props;
    if (formatter && parser) {
      value = formatter(value);
    }
    return (
      <Input
        innerRef={node => (this.input = node)}
        validateStatus={validateStatus}
        suffix={suffix}
        prefix={prefix}
        theme={this.props.getTheme()}
        value={value}
        size={size}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        disabled={disabled}
        formatter={formatter}
        parser={parser}
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
