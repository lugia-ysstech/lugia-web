//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import type { InputSize } from '../css/input';
import { getInputHeight } from '../css/input';
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
  ValidateType,
  ValidateStatus,
} from '../css/validateHoc';

const { px2remcss } = units;

const { padding, shadowSpread, hShadow, vShadow, transitionTime, borderSize } = colorsFunc();

const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const borderRadius = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';

const CommonInputStyle = CSSComponent({
  tag: 'input',
  className: 'InnerInput',
  normal: {
    selectNames: [
      ['fontSize'],
      ['font'],
      ['color'],
      ['cursor'],
      ['padding'],
      ['borderRadius'],
      ['background'],
    ],
    defaultTheme: {
      cursor: 'text',
      fontSize: 12,
      borderRadius: getBorderRadius(borderRadius),
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const {
        placeHolderColor,
        placeHolderFont: { size, weight, color } = {},
        placeHolderFontSize,
      } = propsConfig;
      const theColor = color ? color : placeHolderColor;
      const theSize = placeHolderFontSize ? placeHolderFontSize : size ? size : 12;
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
        propsConfig: { prefix, suffix, isShowClearButton },
      } = themeProps;
      const { width, color, font: { color: fontColor } = {} } = themeMeta;

      const paddingLeft = prefix ? 30 : width && width < 200 ? width / 20 : padding;
      const paddingRight =
        suffix || isShowClearButton ? 35 : width && width < 200 ? 15 + width / 10 : padding;
      const theColor = fontColor || color || blackColor;
      return {
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
  active: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['background']],
  },
  disabled: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['opacity'], ['background']],
    defaultTheme: {
      cursor: 'not-allowed',
      background: { color: disableColor },
    },
  },
  css: css`
    box-sizing: border-box;
    line-height: 1.5;
    display: inline-block;
    font-family: inherit;
    transition: all ${transitionTime};
    outline: none;
    height: 100%;
    width: 100%;
    border: none;
  `,
  option: { hover: true, active: true },
});

const InputContainer = CSSComponent({
  tag: 'span',
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
      borderRadius: getBorderRadius(borderRadius),
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
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
    defaultTheme: {
      border: getBorder({ color: themeHoverColor, width: borderSize, style: 'solid' }),
    },
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
    defaultTheme: {
      border: getBorder({ color: themeActiveColor, width: borderSize, style: 'solid' }),
      boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px ${themeActiveColor}`),
    },
  },
  disabled: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
    defaultTheme: {
      background: { color: disableColor },
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    outline: none;
    min-width: ${px2remcss(30)};
  `,
  option: { hover: true, active: true },
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
    bottom: 50%;
    line-height: ${px2remcss(10)};
    font-size: 1.4em;
    color: ${get('mediumGreyColor')};
  `,
});

const Prefix: Object = CSSComponent({
  extend: Fix,
  className: 'inputPrefix',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
  },
  css: css`
    left: ${px2remcss(padding)};
  `,
});

const Suffix: Object = CSSComponent({
  extend: Fix,
  className: 'inputSuffix',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
  },
  css: css`
    right: ${px2remcss(padding)};
  `,
});

const Clear = 'lugia-icon-reminder_close';

type InputState = {
  value: string,
};

type InsideProps = {
  _maxLength: string,
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
} & InsideProps;

class TextBox extends Component<InputProps, InputState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
    viewClass: Widget.Input,
    size: 'default',
    defaultValue: '',
    isShowClearButton: true,
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
    this.input = React.createRef();
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
    const { onFocus, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onFocus && onFocus(event);
  };

  onBlur = (event: UIEvent) => {
    const { onBlur, disabled } = this.props;
    if (disabled) {
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
    return (
      <InputContainer themeProps={this.getFinalThemeProps()}>
        {this.generatePrefix()}
        {this.generateInput()}
        {this.generateSuffix()}
      </InputContainer>
    );
  }
  render() {
    return this.getInputContainer();
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
    const { prefix, getPartOfThemeProps } = this.props;
    const PrefixThemeProps = getPartOfThemeProps('InputPrefix');
    if (prefix) {
      return (
        <Prefix themeProps={PrefixThemeProps}>{this.getFixIcon(prefix, 'InputPrefix')}</Prefix>
      );
    }
    return null;
  }

  generateSuffix(): React$Node | null {
    const { suffix, getPartOfThemeProps } = this.props;
    if (suffix) {
      return (
        <Suffix themeProps={getPartOfThemeProps('InputSuffix')}>
          {this.getFixIcon(suffix, 'InputSuffix')}
        </Suffix>
      );
    }
    const { isShowClearButton } = this.props;
    if (isShowClearButton) {
      return this.getClearButton();
    }
    return null;
  }

  getClearButton() {
    const { canClear = true } = this.props;
    if (this.isEmpty() || !canClear) {
      return null;
    }
    const {
      theme: ClearButtonThemeProps,
      viewClass: clearViewClass,
    } = this.props.getPartOfThemeHocProps('ClearButton');

    const newTheme = deepMerge(
      {
        [clearViewClass]: {
          normal: {
            color: mediumGreyColor,
            getCSS() {
              return ` position: absolute;
                   transform: translateY(50%);
                   bottom: 50%;
                   right: ${px2remcss(padding)};`;
            },
          },
          hover: {
            color: darkGreyColor,
          },
          disabled: {
            cursor: 'not-allowed',
          },
        },
      },
      ClearButtonThemeProps
    );

    const { disabled, clearIcon } = this.props;
    return (
      <Icon
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

    const mouseConfig = {
      enter: this.onMouseEnter,
      leave: this.onMouseLeave,
    };
    return (
      <CommonInputStyle
        {...addMouseEvent(this, mouseConfig)}
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
    } = this.props;

    const {
      themeConfig: { normal: { color = lightGreyColor, font = {}, fontSize } = {} },
    } = getPartOfThemeProps('Placeholder');

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorText');

    const theValidateThemeProps = isValidateError(validateStatus)
      ? deepMerge(
          validateValueDefaultTheme,
          validateBorderDefaultTheme,
          validateErrorInputThemeProps
        )
      : {};

    const theThemeProps = deepMerge(
      getPartOfThemeProps('Input', {
        props: {
          validateType,
          validateStatus,
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
      theValidateThemeProps
    );
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
    const { onClick, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
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
