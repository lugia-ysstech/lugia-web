//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { fixControlledValue } from '.././utils';
import type { InputSize, InputValidateType, ValidateStatus } from '../css/input';
import {
  DefaultHelp,
  getBackground,
  getClearButtonColor,
  getClearButtonHoverColor,
  getCursor,
  getDisplay,
  getFocusBorderColor,
  getFocusShadow,
  getFontColor,
  getInputBorderColor,
  getInputBorderHoverColor,
  getInputBorderSize,
  getPadding,
  getRightPadding,
  getSize,
  getVisibility,
  getWidth,
  isValidateSuccess,
} from '../css/input';
import { FontSizeNumber } from '../css';
import ErrorTip from '../tooltip/ErrorTip';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import CSSProvider from '../theme/CSSProvider';
import colorsFunc from '../css/stateColor';
const {
  themeColor,
  disableColor,
  dangerColor,
  blackColor,
  mediumGreyColor,
  darkGreyColor,
  lightGreyColor,
} = colorsFunc();

const em = px2emcss(FontSizeNumber);

// const CommonInputStyle = styled.input`
//   ${getSize};
//   ${getCursor};
//   ${getWidth};
//   ${getInputBorderRadius};
//   ${getInputBorderSize};
//   border-style: solid;
//   border-color: ${getInputBorderColor};
//   line-height: 1.5;
//   font-size: 1.4rem;
//   display: inline-block;
//   font-family: inherit;
//   &:hover {
//     border-color: ${getInputBorderHoverColor};
//   }
//
//   transition: all 0.3s;
//   background-image: none;
//   ${getFontColor};
//   &::placeholder {
//     color: #ccc;
//   }
//   &:focus {
//     ${getFocusBorderColor};
//     ${getFocusShadow};
//   }
//
//   padding-left: ${getPadding};
//   padding-right: ${getRightPadding};
//   ${getBackground};
// `;

const CommonInputStyle = CSSProvider({
  tag: 'input',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['padding'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    defaultTheme: {
      width: 220,
      height: 32,
      fontSize: '12px',
      padding: { left: 15, right: 25 },
      borderRadius: 4,
      border: {
        borderColor: lightGreyColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
    },
  },
  hover: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      width: 220,
      height: 32,
      padding: { left: 15, right: 25 },
      border: {
        borderColor: themeColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      borderRadius: 4,
    },
  },
  clicked: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      width: 220,
      height: 32,
      padding: { left: 15, right: 25 },
      background: {
        backgroundImage: 'none',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: themeColor,
      },
      borderRadius: 4,
    },
  },
  disabled: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius'], ['padding']],
    defaultTheme: {
      width: 220,
      height: 32,
      border: {
        borderColor: lightGreyColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      padding: { left: 15, right: 25 },
      background: {
        backgroundColor: disableColor,
        backgroundImage: 'none',
      },
      borderRadius: 4,
    },
  },
  css: css`
    width: ${em(220)};
    height: ${em(32)};
    outline: none;
    line-height: 1.5;
    display: inline-block;
    font-family: inherit;
    transition: all 0.3s;
    background-image: none;
    &::placeholder {
      color: #ccc;
    }
  `,
});

const BaseInputContainer = styled.span`
  position: relative;
  display: inline-block;
`;
const InputContainer = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [['width'], ['height'], ['opacity'], ['boxShadow'], ['padding'], ['margin']],
    defaultTheme: {
      // border: {
      //   borderColor: lightGreyColor,
      //   borderStyle: 'solid',
      //   borderWidth: '1px',
      // },
      opacity: 1,
      width: 220,
      height: 32,
    },
  },
  hover: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['boxShadow'], ['opacity']],
    defaultTheme: {
      border: {
        borderColor: themeColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      opacity: 1,
      width: 220,
      height: 32,
    },
  },
  clicked: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['boxShadow'], ['opacity']],
    defaultTheme: {
      width: 220,
      height: 32,
      boxShadow: `0px 0px 6px ${themeColor};`,
      border: {
        borderColor: themeColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
    },
  },
  disabled: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['boxShadow']],
    defaultTheme: {
      backgroundColor: disableColor,
      border: {
        borderColor: disableColor,
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      width: 220,
      height: 32,
    },
  },
  css: css`
    width: ${em(220)};
    height: ${em(32)};
    z-index: 0;
    position: relative;
    display: inline-block;
    outline: none;
  `,
});

export const Input = styled(CommonInputStyle)`
  position: relative;
  font-size: 1.2rem;

  &:hover {
    border-color: ${themeColor};
  }
`;

export const InputOnly = styled(CommonInputStyle)`
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

const Prefix = styled(Fix)`
  left: ${em(5)};
`;

const Suffix = styled(Fix)`
  right: ${em(5)};
`;

const Clear = 'lugia-icon-reminder_close';

const ClearButton: Object = styled(Icon)`
  position: absolute;
  transform: translateY(50%);
  z-index: 2;
  bottom: 50%;
  line-height: ${em(10)};
  right: ${em(10)};
  display: ${getDisplay};
  ${getClearButtonColor};
  &:hover {
    ${getClearButtonHoverColor};
  }
`;
ClearButton.displayName = 'ClearButton';

type InputState = {|
  value: string,
  clearButtonShow: boolean,
  themeState: {
    normal?: boolean,
    clicked: boolean,
    hover: boolean,
    disabled: boolean,
  },
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
  onChange?: ({ newValue: any, oldValue: any, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onClick?: (event: UIEvent) => void,
  onClear?: Function,
  /*
   * 当键入回车时触发事件
   */
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  formatter?: (value: number | string) => string,
  parser?: (displayValue: number | string) => string,
  readOnly: boolean,
  autoFocus?: boolean,
  type: string,
|};

class TextBox extends Component<InputProps, InputState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
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
    let { value, defaultValue, disabled } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);

    if (!preState) {
      return {
        value: hasValueInprops ? value : defaultValue,
        clearButtonShow: false,
        themeState: {
          clicked: false,
          disabled,
          hover: false,
        },
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }

  onChange = (event: Object) => {
    const { target } = event;
    const { value } = target;
    this.setValue(value, event);
  };

  setValue(value: string, event: Event): void {
    const oldValue = this.state.value;
    const { disabled, onChange, parser, formatter } = this.props;

    if (oldValue === value) {
      return;
    }
    if (formatter && parser) {
      value = parser(value);
    }
    const param = { newValue: value, oldValue, event };
    if ('value' in this.props === false) {
      if (disabled) {
        return;
      }
      this.setState({ value }, () => {
        onChange && onChange(param);
      });
    } else {
      onChange && onChange(param);
    }
  }

  onFocus = (event: UIEvent) => {
    const { onFocus, validateStatus, validateType } = this.props;
    if (isValidateSuccess(validateStatus, validateType, 'inner')) {
      this.setState({ value: this.actualValue });
    }
    this.setState({ clearButtonShow: true });
    onFocus && onFocus(event);
  };

  onBlur = (event: UIEvent) => {
    const { onBlur, help, validateStatus, validateType } = this.props;
    if (isValidateSuccess(validateStatus, validateType, 'inner')) {
      this.setState({ value: help });
      this.actualValue = this.state.value;
    }
    this.setState({ clearButtonShow: false });
    onBlur && onBlur(event);
  };

  isEmpty(): boolean {
    const { value } = this.state;
    return !(value && value.length);
  }

  onClear = (e: Object) => {
    const { disabled, onClear } = this.props;
    if (disabled) {
      return;
    }
    onClear && onClear(e);
    this.setValue('', e);
  };

  getInputContent() {
    return this.getInputContainer(this.getInputInner);
  }

  getInputContainer(fetcher: Function) {
    const { getTheme, disabled } = this.props;

    const { themeConfig = {} } = getTheme();
    console.log(themeConfig, 'themeConfig');
    const {
      themeState = {
        normal: true,
        hover: false,
        clicked: false,
        disabled,
      },
    } = getTheme();
    return (
      <InputContainer themeConfig={themeConfig} disabled={disabled}>
        {fetcher()}
      </InputContainer>
    );
  }

  getInputInner = () => {
    const { validateType, validateStatus, help, disabled } = this.props;

    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer disabled={disabled}>
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
    const { validateType, size, getTheme, help, validateStatus } = props;
    const result = this.getInputContent();
    if (isValidateSuccess(validateStatus, validateType, 'top')) {
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
      <ClearButton
        iconClass={Clear}
        viewClass={ClearButton.displayName}
        onClick={this.onClear}
        show={this.state.clearButtonShow}
      />
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
      readOnly,
      onClick,
      autoFocus,
      type,
      getTheme,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }
    const {
      themeState = {
        normal: true,
        hover: false,
        clicked: false,
        disabled,
      },
      themeConfig,
    } = getTheme();
    const theThemeState = getTheme() === true ? themeState : this.state.themeState;
    console.log(this.state.themeState, 'this.state.themeState', getTheme === true);
    console.log(theThemeState, themeConfig, 'theThemeState');
    console.log(themeConfig, 'theThemeconfig');
    return (
      <Input
        themeState={theThemeState}
        themeConfig={themeConfig}
        autoFocus={autoFocus}
        ref={node => (this.input = node)}
        validateStatus={validateStatus}
        validateType={validateType}
        suffix={suffix}
        prefix={prefix}
        value={value}
        size={size}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={onClick}
        onChange={this.onChange}
        disabled={disabled}
        formatter={formatter}
        parser={parser}
        readOnly={readOnly}
        type={type}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }
  onMouseEnter = () => {
    const { getTheme } = this.props;
    const {
      themeState = {
        normal: true,
        hover: false,
        clicked: false,
        disabled: false,
      },
    } = getTheme();
    if (themeState.hover === true || themeState.disabled === true) {
      return;
    }

    this.setState({
      themeState: { ...this.state.themeState, hover: true },
    });
  };

  onMouseLeave = () => {
    const { getTheme } = this.props;
    const {
      themeState = {
        normal: true,
        hover: false,
        clicked: false,
        disabled: false,
      },
    } = getTheme();

    this.setState({
      themeState: { ...this.state.themeState, hover: false },
    });
  };

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
