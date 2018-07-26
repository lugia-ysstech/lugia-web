//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { fixControlledValue } from '.././utils';
import type { InputSize, InputValidateType, ValidateStatus } from '../css/input';
import {
  DefaultHelp,
  getBackground,
  getCursor,
  getFocusBorderColor,
  getFocusShadow,
  getFontColor,
  getInputBorderColor,
  getInputBorderHoverColor,
  getInputBorderSize,
  getMargin,
  getPadding,
  getRightPadding,
  getSize,
  getVisibility,
  getWidth,
  RadiusSize,
} from '../css/input';
import { FontSize } from '../css';
import ErrorTip from '../tooltip/ErrorTip';
import { px2emcss } from '../css/units';
import Icon from '../icon';

const em = px2emcss(1.2);

const CommonInputStyle = styled.input`
  ${getSize};
  ${getCursor};
  ${getWidth};
  border-radius: ${RadiusSize};
  border: ${getInputBorderSize} solid ${getInputBorderColor};
  line-height: 1.5;
  font-size: ${FontSize};
  display: inline-block;
  font-family: inherit;
  &:hover {
    border-color: ${getInputBorderHoverColor};
  }

  transition: all 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: none;
  ${getFontColor};
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  &:focus {
    ${getFocusBorderColor};
    ${getFocusShadow};
  }

  padding-left: ${getPadding};
  padding-right: ${getRightPadding};
`;
const BaseInputContainer = styled.span`
  position: relative;
  display: inline-block;
`;
const InputContainer = BaseInputContainer.extend`
  ${getBackground};
  ${getMargin};
`;

export const Input = CommonInputStyle.extend`
  outline: none;
  min-height: 100%;
  z-index: 1;
  position: relative;
`;

export const InputOnly = CommonInputStyle.extend`
  outline: none;
`;
const TipBottom = styled.span`
  display: block;
  ${getVisibility};
  transform: translateY(50%);
  z-index: 2;
  font-size: 1em;
  color: red;
`;

const Fix = styled.span`
  position: absolute;
  transform: translateY(50%);
  z-index: 2;
  bottom: 50%;
  line-height: ${em(10)};
  font-size: 1.4em;
  color: rgba(0, 0, 0, 0.65);
`;

const Prefix = Fix.extend`
  left: ${em(5)};
`;

const Suffix = Fix.extend`
  right: ${em(5)};
`;

const Clear = 'lugia-icon-reminder_close_circle';

const ClearButton: Object = styled(Icon)`
  position: absolute;
  transform: translateY(50%);
  z-index: 2;
  bottom: 50%;
  line-height: ${em(10)};
  font-size: 1.2em;
  right: ${em(10)};
  color: rgba(0, 0, 0, 0.65);
  display: inline-block;
`;

type InputState = {|
  value: string,
|};

type InputProps = {|
  size?: InputSize,
  viewClass: string,
  disabled: boolean,
  validateStatus: ValidateStatus,
  validateType: InputValidateType,
  help: string,
  placeholder?: string,
  prefix?: React$Element<any>,
  getTheme: Function,
  suffix?: React$Element<any>,
  onChange?: (newValue: any, oldValue: any) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent, value: string) => void,
  /*
   * 当键入回车时触发事件
   */
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  formatter?: (value: number | string) => string,
  parser?: (displayValue: number | string) => string,
|};

class TextBox extends Component<InputProps, InputState> {
  static defaultProps = {
    disabled: false,
    viewClass: Widget.Input,
    validateStatus: 'success',
    validateType: 'default',
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
  actualValue = '';
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
    const { onFocus, validateType, validateStatus } = this.props;
    if (validateStatus === 'error' && validateType === 'inner') {
      this.setState({ value: this.actualValue });
    }
    onFocus && onFocus(event);
  };

  onBlur = (event: UIEvent) => {
    const { onBlur, help, validateType, validateStatus } = this.props;
    if (validateStatus === 'error' && validateType === 'inner') {
      this.setState({ value: help });
      this.actualValue = this.state.value;
    }
    onBlur && onBlur(event, this.state.value);
  };

  isEmpty(): boolean {
    const { value } = this.state;
    return !(value && value.length);
  }

  onClear = (e: Object) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setValue('');
  };

  getInputContent() {
    return this.getInputContainer(this.getInputInner);
  }

  getInputContainer(fetcher: Function) {
    const { getTheme } = this.props;
    return (
      <InputContainer className="sv" theme={getTheme()}>
        {fetcher()}
      </InputContainer>
    );
  }

  getInputInner = () => {
    const { validateType, validateStatus, help } = this.props;

    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer >
          {this.generatePrefix()}
          {this.generateInput()}
          {this.generateSuffix()}
        </BaseInputContainer>,
      ];

      result.push(
        <TipBottom validateStatus={validateStatus} validateType={validateType}>
          {this.isValidateError() ? help : ''}
        </TipBottom>
      );
      return result;
    }
    return [this.generatePrefix(), this.generateInput(), this.generateSuffix()];
  };

  isValidateError(): boolean {
    return this.props.validateStatus === 'error';
  }

  render() {
    const { props } = this;
    const { validateType, size, getTheme } = props;
    const result = this.getInputContent();
    const { help } = props;
    if (validateType === 'top' && this.isValidateError()) {
      return (
        <ErrorTip theme={getTheme()} size={size} placement={'topLeft'} title={help}>
          {result}
        </ErrorTip>
      );
    }
    return result;
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
    return this.getClearButton();
  }

  getClearButton() {
    if (this.isEmpty()) {
      return null;
    }
    return (
      <ClearButton iconClass={Clear} viewClass={ClearButton.displayName} onClick={this.onClear} />
    );
  }

  focus() {
    if (this.input) {
      setTimeout(() => {
        this.input.focus();
      }, 0);
    }
  }

  generateInput(): React$Element<any> {
    const { props } = this;
    let { value } = this.state;
    const {
      suffix,
      prefix,
      size,
      disabled,
      formatter,
      parser,
      validateStatus,
      validateType,
      onKeyUp,
      onKeyPress,
      placeholder,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }

    return (
      <Input
        innerRef={node => (this.input = node)}
        validateStatus={validateStatus}
        validateType={validateType}
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
