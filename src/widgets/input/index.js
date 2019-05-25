//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import { css } from 'styled-components';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { fixControlledValue } from '.././utils';
import type { InputSize, InputValidateType, ValidateStatus } from '../css/input';
import { DefaultHelp, getDisplay, isValidateSuccess, getPadding } from '../css/input';
import { FontSizeNumber } from '../css';
import ErrorTip from '../tooltip/ErrorTip';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import CSSProvider from '../theme/CSSProvider';
import colorsFunc from '../css/stateColor';

const { themeColor, disableColor, lightGreyColor } = colorsFunc();

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
      ['cursor'],
    ],
    defaultTheme: {
      border: {
        top: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        left: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        bottom: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        right: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
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
      ['cursor'],
    ],
    defaultTheme: {
      border: {
        top: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        left: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        bottom: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        right: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
      },
    },
  },
  clicked: {
    selectNames: [
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
      ['padding'],
      ['cursor'],
    ],
    defaultTheme: {
      boxShadow: `0px 0px 6px ${themeColor};`,
      border: {
        top: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        left: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        bottom: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
        right: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: '1px',
        },
      },
    },
  },
  disabled: {
    selectNames: [
      ['background'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['cursor'],
      ['border'],
    ],
    defaultTheme: {
      background: {
        backgroundColor: disableColor,
      },
      cursor: 'not-allowed',
    },
  },
  css: css`
    width: ${em(200)};
    height: ${em(32)};
    cursor: text;
    line-height: 1.5;
    display: inline-block;
    font-family: inherit;
    transition: all 0.3s;
    background-image: none;
    border-radius: ${em(4)};
    &::placeholder {
      color: #ccc;
    }

    padding-left: ${getPadding};
    padding-right: ${em(35)};
    outline: none;
  `,
});

const BaseInputContainer = CSSProvider({
  tag: 'span',
  css: css`
    position: relative;
    display: inline-block;
  `,
});
const InputContainer = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [['width'], ['height'], ['opacity'], ['boxShadow'], ['padding'], ['margin']],
    defaultTheme: {
      margin: { top: 22, left: 20 },
      opacity: 1,
    },
  },
  disabled: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['boxShadow']],
    defaultTheme: {
      backgroundColor: disableColor,
    },
  },
  css: css`
    width: ${em(200)};
    height: ${em(32)};
    z-index: 0;
    position: relative;
    display: inline-block;
    outline: none;
  `,
});

export const Input: Object = CSSProvider({
  extend: CommonInputStyle,
  css: css`
    position: relative;
    font-size: 1.2rem;
    outline: none;
  `,
});

export const InputOnly: Object = CSSProvider({
  extend: CommonInputStyle,
  css: css`
    outline: none;
  `,
});
const TipBottom = CSSProvider({
  tag: 'span',
  css: css`
    display: block;
    transform: translateY(50%);
    z-index: 2;
    font-size: 1em;
    color: red;
  `,
  normal: {
    defaultTheme: {
      visibility: 'hidden',
    },
  },
});

const Fix = CSSProvider({
  tag: 'span',
  css: css`
    position: absolute;
    transform: translateY(50%);
    z-index: 2;
    bottom: 50%;
    line-height: ${em(10)};
    font-size: 1.4em;
    color: rgba(0, 0, 0, 0.65);
  `,
});

const Prefix: Object = CSSProvider({
  extend: Fix,
  css: css`
    left: ${em(5)};
  `,
});

const Suffix: Object = CSSProvider({
  extend: Fix,
  css: css`
    right: ${em(5)};
  `,
});

const Clear = 'lugia-icon-reminder_close';

const ClearButton: Object = CSSProvider({
  extend: Icon,
  normal: {
    getCSS(theme: Object) {
      return theme.color === 'red' ? 'color: blue;' : 'color: green;';
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  css: css`
    position: absolute;
    transform: translateY(50%);
    z-index: 2;
    bottom: 50%;
    line-height: ${em(10)};
    right: ${em(10)};
    display: ${getDisplay};
  `,
});
ClearButton.displayName = 'ClearButton';

type InputState = {|
  value: string,
  clearButtonShow: boolean,
|};

type InputProps = {|
  size?: InputSize,
  viewClass: string,
  themeProps: Object,
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
    let { value, defaultValue } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);

    if (!preState) {
      return {
        value: hasValueInprops ? value : defaultValue,
        clearButtonShow: false,
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
    const { themeProps } = this.props;

    return <InputContainer themeProps={themeProps}>{fetcher()}</InputContainer>;
  }

  getInputInner = () => {
    const { validateType, validateStatus, help } = this.props;

    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer themeProps={this.props.themeProps}>
          {this.generatePrefix()}
          {this.generateInput()}
          {this.generateSuffix()}
        </BaseInputContainer>,
      ];

      result.push(
        <TipBottom
          themeProps={this.props.themeProps}
          validateStatus={validateStatus}
          validateType={validateType}
        >
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
    const { validateType, size, help, validateStatus } = props;
    const result = this.getInputContent();
    if (isValidateSuccess(validateStatus, validateType, 'top')) {
      return (
        <ErrorTip themeProps={this.props.themeProps} size={size} placement={'topLeft'} title={help}>
          {result}
        </ErrorTip>
      );
    }
    return result;
  }

  generatePrefix(): React$Element<any> | null {
    const { prefix } = this.props;
    if (prefix) {
      return <Prefix themeProps={this.props.themeProps}>{prefix}</Prefix>;
    }
    return null;
  }

  generateSuffix(): React$Element<any> | null {
    const { suffix } = this.props;
    if (suffix) {
      return <Suffix themeProps={this.props.themeProps}>{suffix}</Suffix>;
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
        themeProps={this.props.themeProps}
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
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }
    return (
      <Input
        themeProps={this.props.themeProps}
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
        formatter={formatter}
        parser={parser}
        readOnly={readOnly}
        type={type}
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
