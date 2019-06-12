//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import { fixControlledValue } from '.././utils';
import type { InputSize, InputValidateType, ValidateStatus } from '../css/input';
import {
  DefaultHelp,
  isValidateSuccess,
  isSuccess,
  LargeHeight,
  SmallHeight,
  DefaultHeight,
} from '../css/input';
import ErrorTip from '../tooltip/ErrorTip';
import Icon from '../icon';
import StaticComponent from '../theme/CSSProvider';
import CSSComponent, { css } from '../theme/CSSProvider';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
const { px2remcss } = units;
const {
  themeColor,
  disableColor,
  lightGreyColor,
  dangerColor,
  blackColor,
  mediumGreyColor,
  darkGreyColor,
} = colorsFunc();

const CommonInputStyle = CSSComponent({
  tag: 'input',
  className: 'innerInput',
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
      ['cursor'],
    ],
    defaultTheme: {
      width: px2remcss(200),
      height: DefaultHeight,
      border: {
        top: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        left: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        bottom: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        right: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    getStyle(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { size, prefix, validateStatus, validateType } = propsConfig;
      const { width, height } = themeMeta;
      console.log(themeMeta, 33333, themeProps);
      const style = {};
      const color = isValidateSuccess(validateStatus, validateType, 'inner')
        ? dangerColor
        : blackColor;
      const theHeight = height
        ? height
        : size === 'large'
        ? LargeHeight
        : size === 'small'
        ? SmallHeight
        : DefaultHeight;
      const paddingLeft = prefix
        ? px2remcss(30)
        : width && width < 200
        ? px2remcss(width / 20)
        : px2remcss(10);
      const paddingRight = width && width < 200 ? px2remcss(15 + width / 10) : px2remcss(35);
      style.color = color;
      style.height = theHeight;
      style.paddingLeft = paddingLeft;
      style.paddingRight = paddingRight;
      return style;
    },
  },
  hover: {
    selectNames: [['width'], ['height'], ['padding'], ['border'], ['cursor'], ['background']],
    defaultTheme: {
      border: {
        top: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        left: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        bottom: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        right: {
          borderColor: themeColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
  },
  active: {
    selectNames: [['boxShadow'], ['border'], ['cursor']],
    defaultTheme: {
      boxShadow: `0px 0px 6px ${themeColor};`,
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig, themeState } = themeProps;
      const { validateStatus } = propsConfig;
      const { disabled } = themeState;
      const theColor = disabled
        ? disableColor
        : isSuccess(validateStatus)
        ? 'rgba(104, 79, 255, 0.2)'
        : 'rgba(248, 172, 48, 0.2)';
      return `box-shadow: 0 0 6px ${theColor}; `;
    },
  },
  disabled: {
    selectNames: [['cursor'], ['border'], ['background']],
    defaultTheme: {
      cursor: 'not-allowed',
      background: { backgroundColor: disableColor },
      border: {
        top: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        left: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        bottom: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
        right: {
          borderColor: lightGreyColor,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
  },
  css: css`
    cursor: text;
    line-height: 1.5;
    display: inline-block;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    border-radius: ${px2remcss(4)};
    &::placeholder {
      color: #ccc;
    }
  `,
});

const BaseInputContainer = StaticComponent({
  tag: 'span',
  className: 'inputBaseInputContainer',
  css: css`
    position: relative;
    display: inline-block;
  `,
});
const InputErrorTip = StaticComponent({
  extend: ErrorTip,
  className: 'errorTip',
  css: css`
    position: relative;
    display: inline-block;
  `,
});
const InputContainer = CSSComponent({
  tag: 'div',
  className: 'inputContainer',
  normal: {
    selectNames: [['width'], ['height'], ['opacity'], ['padding'], ['margin'], ['border']],
  },
  hover: {
    selectNames: [['border']],
  },
  disabled: {
    selectNames: [['boxShadow']],
  },
  css: css`
    z-index: 0;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: ${px2remcss(4)};
  `,
});

export const Input: Object = CSSComponent({
  extend: CommonInputStyle,
  className: 'inputInner',
  css: css`
    position: relative;
    outline: none;
  `,
});

export const InputOnly: Object = StaticComponent({
  extend: CommonInputStyle,
  className: 'InputOnly',
  css: css`
    outline: none;
  `,
});
const TipBottom = StaticComponent({
  tag: 'span',
  className: 'inputTipBottom',
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
    getStyle(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { validateType, validateStatus } = propsConfig;
      const style = {};
      style.visibility = isValidateSuccess(validateStatus, validateType, 'bottom')
        ? 'visible'
        : 'hidden';
      return style;
    },
  },
});

const Fix = CSSComponent({
  tag: 'span',
  className: 'inputFix',
  normal: {
    selectNames: [['font'], ['color']],
  },
  css: css`
    position: absolute;
    transform: translateY(50%);
    z-index: 2;
    bottom: 50%;
    line-height: ${px2remcss(10)};
    font-size: 1.4em;
    color: rgba(0, 0, 0, 0.65);
  `,
});

const Prefix: Object = CSSComponent({
  extend: Fix,
  className: 'inputPrefix',
  normal: {
    selectNames: [['font'], ['color']],
  },
  css: css`
    left: ${px2remcss(5)};
  `,
});

const Suffix: Object = CSSComponent({
  extend: Fix,
  className: 'inputSuffix',
  normal: {
    selectNames: [['font'], ['color']],
  },
  css: css`
    right: ${px2remcss(5)};
  `,
});

const Clear = 'lugia-icon-reminder_close';

const ClearButton: Object = ThemeHoc(
  CSSComponent({
    extend: Icon,
    className: 'inputClearButton',
    normal: {
      selectNames: [['font'], ['color']],
      defaultTheme: {
        color: mediumGreyColor,
      },
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: darkGreyColor,
      },
    },
    active: {
      selectNames: [],
    },
    disabled: {
      selectNames: [],
    },
    css: css`
      position: absolute;
      transform: translateY(50%);
      z-index: 2;
      bottom: 50%;
      line-height: ${px2remcss(10)};
      right: ${px2remcss(10)};
    `,
  }),
  'ClearButton'
);
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
  getChildTheme?: (childWidgetName: string) => { viewClass: string, theme: Object },
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
    const { validateType, validateStatus, help, themeProps, prefix, size } = this.props;
    themeProps.propsConfig = { validateType, validateStatus, prefix, size };
    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer themeProps={this.props.themeProps}>
          {this.generatePrefix()}
          {this.generateInput()}
          {this.generateSuffix()}
        </BaseInputContainer>,
      ];
      result.push(
        <TipBottom themeProps={this.props.themeProps}>
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
    const { validateType, size, help, validateStatus, prefix, themeProps } = props;
    const result = this.getInputContent();
    themeProps.propsConfig = { validateType, validateStatus, prefix, size };
    if (isValidateSuccess(validateStatus, validateType, 'top')) {
      return (
        <InputErrorTip themeProps={themeProps} size={size} placement={'topLeft'} title={help}>
          {result}
        </InputErrorTip>
      );
    }
    return result;
  }

  generatePrefix(): React$Element<any> | null {
    const { prefix } = this.props;
    const PrefixThemeProps = this.props.getPartOfThemeProps('InputPrefix');
    if (prefix) {
      return <Prefix themeProps={PrefixThemeProps}>{prefix}</Prefix>;
    }
    return null;
  }

  generateSuffix(): React$Element<any> | null {
    const { suffix } = this.props;
    const SuffixThemeProps = this.props.getPartOfThemeProps('InputSuffix');
    if (suffix) {
      return <Suffix themeProps={SuffixThemeProps}>{suffix}</Suffix>;
    }
    return this.getClearButton();
  }

  getClearButton() {
    if (this.isEmpty()) {
      return null;
    }
    const { validateStatus, validateType, prefix, size } = this.props;
    const show = this.state.clearButtonShow;
    const ClearButtonThemeProps = this.props.getPartOfThemeProps('InputClearButton');
    ClearButtonThemeProps.propsConfig = { validateType, validateStatus, prefix, size };
    return (
      <ClearButton
        themeProps={ClearButtonThemeProps}
        iconClass={Clear}
        onClick={this.onClear}
        show={show}
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
      themeProps,
      disabled,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }
    themeProps.propsConfig = { validateType, validateStatus, prefix, size };
    return (
      <Input
        themeProps={themeProps}
        autoFocus={autoFocus}
        ref={this.input}
        validateStatus={validateStatus}
        validateType={validateType}
        suffix={suffix}
        prefix={prefix}
        value={value}
        size={size}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={onClick}
        onChange={this.onChange}
        formatter={formatter}
        parser={parser}
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
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

const TargetTxtBox = ThemeHoc(KeyBoardEventAdaptor(TextBox), Widget.Input, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
