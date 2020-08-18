//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import type { InputSize } from '../css/input';
import { getInputHeight, getInputIconSize, getInputFixSize } from '../css/input';
import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { ObjectUtils } from '@lugia/type-utils';
import get from '../css/theme-common-dict';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import ValidateHoc from './validateHoc';
import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
  validateWidthTheme,
} from '../css/validateHoc';
import type { ValidateStatus, ValidateType } from '../css/validateHoc';

const { px2remcss } = units;
const { hShadow, vShadow, transitionTime } = colorsFunc();

const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const borderRadius = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const padding = '$lugia-dict.@lugia/lugia-web.padding';
const paddingToText = '$lugia-dict.@lugia/lugia-web.paddingToText';

const CommonInputStyle = CSSComponent({
  tag: 'input',
  className: 'InnerInput',
  normal: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['padding'], ['borderRadius']],
    defaultTheme: {
      cursor: 'text',
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const {
        size,
        placeHolderColor,
        placeHolderFont: { size: placeHolderSize, weight, color } = {},
        placeHolderFontSize,
      } = propsConfig;
      const theColor = color || placeHolderColor || get('lightGreyColor');
      const theSize = placeHolderFontSize || placeHolderSize || getInputFixSize(size);
      return css`
        &::placeholder {
          color: ${theColor};
          font-size: ${px2remcss(theSize)};
          font-weight: ${weight};
        }
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { prefix, suffix, size },
      } = themeProps;
      const { color, fontSize, font: { color: fontColor, size: innerFontSize } = {} } = themeMeta;

      const paddingLeft = prefix ? paddingToText : padding;
      const paddingRight = suffix ? paddingToText : padding;
      const theColor = fontColor || color || blackColor;
      const theFontSize = innerFontSize || fontSize || getInputFixSize(size);
      return {
        fontSize: theFontSize,
        color: theColor,
        padding: {
          left: paddingLeft,
          right: paddingRight,
        },
      };
    },
  },
  hover: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['background']],
  },
  focus: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['background']],
  },
  active: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['background']],
  },
  disabled: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['opacity'], ['background']],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    background-color: transparent;
    box-sizing: border-box;
    font-family: inherit;
    transition: all ${transitionTime};
    outline: none;
    height: 100%;
    width: 100%;
    border: none;
    flex: 1;
  `,
  option: { hover: true, active: true },
});

const InputContainer = CSSComponent({
  tag: 'div',
  className: 'inputContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
      ['opacity'],
    ],
    defaultTheme: {
      width: '100%',
      background: { color: 'white' },
      borderRadius: getBorderRadius(borderRadius),
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { height } = themeMeta;
      const theHeight = getInputHeight(height, size);
      return {
        height: theHeight,
      };
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  focus: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  disabled: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  css: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    outline: none;
    min-width: ${px2remcss(30)};
  `,
  option: { hover: true, focus: true, active: true },
});

const Fix = CSSComponent({
  tag: 'span',
  className: 'inputFix',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['padding'], ['margin']],
    defaultTheme: {
      color: blackColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
      const theSize = innerFontSize || fontSize || getInputFixSize(size);
      return { fontSize: theSize };
    },
  },
  disabled: {
    selectNames: [['font'], ['fontSize'], ['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  css: css`
    height: 100%;
    display: inline-flex;
    align-items: center;
  `,
});

const Prefix: Object = CSSComponent({
  extend: Fix,
  className: 'inputPrefix',
  normal: {
    defaultTheme: {
      padding: {
        left: padding,
      },
    },
  },
});

const Suffix: Object = CSSComponent({
  extend: Fix,
  className: 'inputSuffix',
  normal: {
    defaultTheme: {
      padding: {
        right: padding,
      },
    },
  },
});

const Clear = 'lugia-icon-reminder_close';

type InputState = {
  value: string,
};

type InsideProps = {
  _maxLength: string,
  getInputRef: Function,
  getInputWidgetRef: Function,
  _focus: boolean,
};

type InputProps = {
  size?: InputSize,
  viewClass: string,
  themeProps: Object,
  disabled: boolean,
  validateStatus: ValidateStatus,
  validateType: ValidateType,
  help: string,
  placeholder?: string,
  prefix?: React$Node,
  suffix?: React$Node,
  onChange?: ({ newValue: string, oldValue: string, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onClick?: (event: UIEvent) => void,
  onClear?: Function,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  clearIcon?: string,
  canClear?: boolean,
  formatter?: (value: number | string) => string,
  parser?: (displayValue: number | string) => string,
  readOnly: boolean,
  autoFocus?: boolean,
  type: string,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  isShowClearButton?: boolean,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  focus?: Function,
} & InsideProps;

class TextBox extends Component<InputProps, InputState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
    viewClass: Widget.Input,
    size: 'default',
    defaultValue: '',
    isShowClearButton: true,
    canClear: true,
    formatter: (value: string | number) => {
      return value;
    },
    parser: (value: string | number) => {
      return value;
    },
  };
  input: any;
  inputContainer: any;
  static displayName = Widget.Input;

  constructor(props: InputProps) {
    super(props);
    this.input = React.createRef();
    this.inputContainer = React.createRef();
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
  getRef() {
    return this.input;
  }

  getContainerRef() {
    return this.inputContainer;
  }

  onChange = (event: Object) => {
    const { target } = event;
    const { value } = target;
    this.setValue(value, event);
  };

  setValue(value: string, event: Event): void {
    const oldValue = this.state.value;
    const { disabled, onChange, parser, formatter, readOnly } = this.props;
    if (oldValue === value || disabled || readOnly) {
      return;
    }
    if (formatter && parser) {
      value = parser(value);
    }
    const param = { newValue: value, oldValue, event };
    if ('value' in this.props === false) {
      this.setState({ value }, () => {
        onChange && onChange(param);
      });
    } else {
      onChange && onChange(param);
    }
  }
  onFocus = (event: UIEvent) => {
    const { onFocus, disabled, readOnly, _focus } = this.props;
    if (disabled || readOnly || _focus) {
      return;
    }
    onFocus && onFocus(event);
  };
  onBlur = (event: UIEvent) => {
    const { onBlur, disabled, readOnly, _focus } = this.props;
    if (disabled || readOnly || _focus) {
      return;
    }
    onBlur && onBlur(event);
  };

  isEmpty(): boolean {
    const { value } = this.state;
    return !(value && value.length);
  }

  onClear = (e: Object) => {
    const { disabled, onClear, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onClear && onClear(e);
    this.setValue('', e);
  };

  getInputContainer() {
    const mouseConfig = {
      enter: this.onMouseEnter,
      leave: this.onMouseLeave,
    };
    return (
      <InputContainer
        ref={this.inputContainer}
        themeProps={this.getFinalThemeProps()}
        {...addMouseEvent(this, mouseConfig)}
      >
        {this.generatePrefix()}
        {this.generateInput()}
        {this.generateSuffix()}
      </InputContainer>
    );
  }
  render() {
    return this.getInputContainer();
  }

  componentDidMount() {
    const { getInputRef, getInputWidgetRef, focus } = this.props;
    getInputRef && getInputRef({ ref: this.getRef() });
    getInputWidgetRef && getInputWidgetRef({ ref: this.getContainerRef() });
    if (focus && this.getRef()) {
      this.getRef().current.focus();
      focus();
    }
  }
  getFixIcon(fix: React$Node, WidgetName: string): React$Node {
    if (ObjectUtils.isString(fix)) {
      return (
        <Icon singleTheme {...this.props.getPartOfThemeHocProps(WidgetName)} iconClass={fix} />
      );
    }
    return fix;
  }

  generatePrefix(): React$Node | null {
    const { prefix, getPartOfThemeProps, size } = this.props;
    const PrefixThemeProps = getPartOfThemeProps('InputPrefix', { props: { size } });
    if (prefix) {
      return (
        <Prefix themeProps={PrefixThemeProps}>{this.getFixIcon(prefix, 'InputPrefix')}</Prefix>
      );
    }
    return null;
  }

  generateSuffix(): React$Node | null {
    const { suffix, getPartOfThemeProps, size } = this.props;
    if (suffix) {
      return (
        <Suffix themeProps={getPartOfThemeProps('InputSuffix', { props: { size } })}>
          {this.getFixIcon(suffix, 'InputSuffix')}
        </Suffix>
      );
    }
    const { isShowClearButton, canClear } = this.props;
    if (isShowClearButton && canClear) {
      return this.getClearButton();
    }
    return null;
  }

  getClearButton() {
    const {
      theme: ClearButtonThemeProps,
      viewClass: clearViewClass,
    } = this.props.getPartOfThemeHocProps('ClearButton');

    const newTheme = deepMerge(
      {
        [clearViewClass]: {
          normal: {
            color: mediumGreyColor,
            getCSS(themeMeta, themeProps) {
              const {
                propsConfig: { hideClearButton },
              } = themeProps;
              const theVisible = hideClearButton ? 'hidden' : 'visible';
              return `visibility: ${theVisible};padding-right: ${px2remcss(get('padding'))};`;
            },
            getThemeMeta(themeMeta, themeProps) {
              const {
                propsConfig: { size },
              } = themeProps;
              const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
              const theSize = innerFontSize || fontSize || getInputIconSize(size);
              return { fontSize: theSize };
            },
          },
          hover: { color: darkGreyColor },
          disabled: { cursor: 'not-allowed', color: disableTextColor },
        },
      },
      ClearButtonThemeProps
    );

    const { disabled, clearIcon, size } = this.props;
    return (
      <Icon
        propsConfig={{ size, hideClearButton: this.isEmpty() }}
        disabled={disabled}
        singleTheme
        viewClass={clearViewClass}
        theme={newTheme}
        iconClass={clearIcon || Clear}
        onClick={this.onClear}
      />
    );
  }

  onMouseLeave = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    const { disabled, onMouseLeave } = this.props;
    if (disabled) {
      return;
    }
    onMouseLeave && onMouseLeave(event);
  };

  onMouseEnter = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    const { disabled, onMouseEnter } = this.props;
    if (disabled) {
      return;
    }
    onMouseEnter && onMouseEnter(event);
  };

  generateInput(): React$Node {
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
      placeholder,
      readOnly,
      autoFocus,
      type,
      disabled,
      _maxLength,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }
    const theType = type === 'password' ? 'password' : 'text';

    return (
      <CommonInputStyle
        maxLength={_maxLength}
        themeProps={this.getFinalThemeProps()}
        autoFocus={autoFocus}
        ref={this.input}
        validateStatus={validateStatus}
        validateType={validateType}
        suffix={suffix}
        prefix={prefix}
        value={value}
        size={size}
        onKeyUp={this.onKeyUp}
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onChange={this.onChange}
        formatter={formatter}
        parser={parser}
        readOnly={readOnly}
        type={theType}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  getFinalThemeProps() {
    const {
      getPartOfThemeProps,
      validateStatus,
      validateType,
      prefix,
      suffix,
      isShowClearButton,
      size,
      _focus,
    } = this.props;
    const {
      themeConfig: { normal: { color, font = {}, fontSize } = {} },
    } = getPartOfThemeProps('Placeholder');

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorInput');
    const defaultTheme = {
      themeConfig: {
        normal: {
          border: getBorder(get('normalBorder')),
        },
        hover: {
          border: getBorder(get('hoverBorder')),
        },
        active: {
          border: getBorder(get('activeBorder')),
        },
        focus: {
          border: getBorder(get('focusBorder')),
          boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px 4px ${get('inputFocusShadowColor')}`),
        },
        disabled: {
          background: { color: disableColor },
          color: disableTextColor,
          border: getBorder(get('disabledBorder')),
        },
      },
    };
    const theValidateThemeProps = isValidateError(validateStatus)
      ? deepMerge(
          validateValueDefaultTheme,
          validateBorderDefaultTheme(),
          validateErrorInputThemeProps
        )
      : {};
    const theValidateWidthThemeProps = validateType && validateStatus ? validateWidthTheme : {};

    const theThemeProps = deepMerge(
      defaultTheme,
      getPartOfThemeProps('Input', {
        props: {
          prefix,
          suffix,
          placeHolderColor: color,
          placeHolderFontSize: fontSize,
          isShowClearButton,
          placeHolderFont: font,
        },
      }),
      getPartOfThemeProps('Container', {
        props: { size },
      }),
      theValidateWidthThemeProps,
      theValidateThemeProps
    );
    if (_focus) {
      theThemeProps.themeState.active = false;
      theThemeProps.themeState.focus = true;
    }
    return theThemeProps;
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown, onEnter, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onKeyDown && onKeyDown(event);
    const { keyCode } = event;
    onEnter && keyCode === 13 && onEnter(event);
  };
  onClick = (event: UIEvent) => {
    const { onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    onClick && onClick(event);
  };
  onKeyPress = (event: KeyboardEvent) => {
    const { onKeyPress, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onKeyPress && onKeyPress(event);
  };
  onKeyUp = (event: KeyboardEvent) => {
    const { onKeyUp, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onKeyUp && onKeyUp(event);
  };
}

const TargetTxtBox = ThemeHoc(
  ValidateHoc(MouseEventAdaptor(KeyBoardEventAdaptor(TextBox))),
  Widget.Input,
  {
    hover: true,
    active: true,
  }
);

export default TargetTxtBox;
