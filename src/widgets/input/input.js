//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import type { InputSize, ValidateType, ValidateStatus } from '../css/input';
import { DefaultHelp, checkValidateResultFromStatusAndType, isValidateSuccess } from '../css/input';
import ToolTip from '../tooltip/index';
import Icon from '../icon';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';

import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { ObjectUtils } from '@lugia/type-utils';
import changeColor from '../css/utilsColor';
const { px2remcss } = units;
const {
  themeColor,
  disableColor,
  borderColor,
  dangerColor,
  blackColor,
  mediumGreyColor,
  darkGreyColor,
  superLightColor,
  lightGreyColor,
  borderRadius,
  padding,
  borderSize,
  shadowSpread,
  hShadow,
  vShadow,
  warningColor,
  transitionTime,
  successColor,
} = colorsFunc();

const CommonInputStyle = CSSComponent({
  tag: 'input',
  className: 'InnerInput',
  normal: {
    selectNames: [
      ['fontSize'],
      ['font'],
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['padding'],
      ['opacity'],
      ['boxShadow'],
    ],
    defaultTheme: {
      cursor: 'text',
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
      borderRadius: getBorderRadius(borderRadius),
      fontSize: 12,
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const {
        placeHolderColor,
        placeHolderFont: { size, weight, color } = {},
        placeHolderFontSize,
      } = propsConfig;
      const theColor = color ? color : placeHolderColor;
      const theSize = size ? size : placeHolderFontSize ? placeHolderFontSize : 12;
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
        propsConfig: { prefix, validateStatus, validateType, suffix, isShowClearButton },
      } = themeProps;
      const { width, color } = themeMeta;
      const theColor = color
        ? color
        : checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')
        ? dangerColor
        : checkValidateResultFromStatusAndType(validateStatus, 'success', validateType, 'inner')
        ? successColor
        : blackColor;

      const paddingLeft = prefix ? 30 : width && width < 200 ? width / 20 : padding;
      const paddingRight =
        suffix || isShowClearButton ? 35 : width && width < 200 ? 15 + width / 10 : padding;
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
    selectNames: [
      ['padding'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
    ],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: borderSize, style: 'solid' }),
      borderRadius: getBorderRadius(borderRadius),
    },
  },
  active: {
    selectNames: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus },
        themeState: { disabled },
      } = themeProps;
      const theColor = disabled
        ? disableColor
        : isValidateSuccess(validateStatus)
        ? changeColor(themeColor, 0, 0, 20).rgba
        : changeColor(warningColor, 0, 0, 20).rgba;
      const shadow = `${hShadow} ${vShadow} ${shadowSpread} ${theColor}`;
      return { boxShadow: getBoxShadow(shadow) };
    },
  },
  disabled: {
    selectNames: [
      ['fontSize'],
      ['font'],
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['padding'],
      ['opacity'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      background: { color: disableColor },
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
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
  `,
});

const BaseInputContainer = StaticComponent({
  tag: 'span',
  className: 'InputBaseInputContainer',
  css: css`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  `,
});

const InputContainer = CSSComponent({
  tag: 'span',
  className: 'inputContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin']],
    defaultTheme: {
      width: '100%',
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { height } = themeMeta;

      const theHeight = height ? height : size === 'large' ? 40 : size === 'small' ? 24 : 32;
      return {
        height: theHeight,
      };
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: inline-block;
    outline: none;
    min-width: ${px2remcss(30)};
  `,
});

const TipBottom = CSSComponent({
  tag: 'div',
  className: 'inputTipBottom',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: dangerColor,
      fontSize: 12,
      height: 32,
      margin: {
        left: 10,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { validateStatus } = propsConfig;
      const theVisibility = !isValidateSuccess(validateStatus) ? 'visible' : 'hidden';
      return `visibility:${theVisibility}`;
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
    bottom: 50%;
    line-height: ${px2remcss(10)};
    font-size: 1.4em;
    color: ${mediumGreyColor};
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
  formatter?: (value: number | string) => string,
  parser?: (displayValue: number | string) => string,
  readOnly: boolean,
  autoFocus?: boolean,
  type: string,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  isShowClearButton?: boolean,
};

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
  actualValue = '';

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
    const { onFocus, validateStatus, validateType, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    if (checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')) {
      this.setState({ value: this.actualValue });
    }
    onFocus && onFocus(event);
  };

  onBlur = (event: UIEvent) => {
    const { onBlur, help, validateStatus, validateType, disabled } = this.props;
    if (disabled) {
      return;
    }
    if (checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')) {
      this.setState({ value: help });
      this.actualValue = this.state.value;
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

  getInputContainer(fetcher: Function) {
    const { size } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('Container', {
      props: { size },
    });
    return (
      <InputContainer themeProps={theThemeProps} {...addMouseEvent(this)}>
        {fetcher()}
      </InputContainer>
    );
  }

  getInputInner = () => {
    const { validateType, validateStatus, help, prefix, size } = this.props;
    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer>
          {this.generatePrefix()}
          {this.generateInput()}
          {this.generateSuffix()}
        </BaseInputContainer>,
      ];
      const tipBottomThemeProps = this.props.getPartOfThemeProps('ValidateErrorText', {
        props: { validateStatus, prefix, size },
      });
      result.push(
        <TipBottom themeProps={tipBottomThemeProps}>{this.isValidateError() ? help : ''}</TipBottom>
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
    const { validateType, size, help, validateStatus, prefix, getPartOfThemeHocProps } = props;
    const result = this.getInputContainer(this.getInputInner);
    const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
      'ValidateErrorText'
    );
    const toolTipColor = validateStatus === 'error' ? dangerColor : blackColor;
    const newTheme = {
      [viewClass]: {
        Container: deepMerge(
          {
            normal: {
              background: { color: superLightColor },
              color: toolTipColor,
              getCSS() {
                return 'display: inline-block;';
              },
            },
          },
          validateTopTipThemeProps
        ),
        TooltipTitle: deepMerge(
          { normal: { color: toolTipColor } },
          validateTopTipThemeProps[viewClass]
        ),
      },
    };
    if (validateType === 'top') {
      const visible = this.isValidateError();
      return (
        <ToolTip
          propsConfig={{ validateType, validateStatus, prefix, size }}
          theme={newTheme}
          viewClass={viewClass}
          title={help}
          action={'focus'}
          popArrowType={'round'}
          placement={'topLeft'}
          visible={visible}
        >
          {result}
        </ToolTip>
      );
    }
    return result;
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
    if (this.isEmpty()) {
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

    const { disabled } = this.props;
    return (
      <Icon
        disabled={disabled}
        singleTheme
        viewClass={clearViewClass}
        theme={newTheme}
        iconClass={Clear}
        onClick={this.onClear}
        {...addMouseEvent(this)}
      />
    );
  }

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
      isShowClearButton,
      getPartOfThemeProps,
      _maxLength,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }

    const {
      themeConfig: { normal: { color = lightGreyColor, font = {}, fontSize } = {} },
    } = this.props.getPartOfThemeProps('Placeholder');

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorInput');

    const theValidateThemeProps = checkValidateResultFromStatusAndType(
      validateStatus,
      'error',
      validateType,
      'bottom'
    )
      ? validateErrorInputThemeProps
      : {};

    const theThemeProps = deepMerge(
      this.props.getPartOfThemeProps('Input', {
        props: {
          validateType,
          validateStatus,
          prefix,
          suffix,
          placeHolderColor: color,
          placeHolderFontSize: fontSize,
          isShowClearButton,
        },
      }),
      theValidateThemeProps,
      this.props.getPartOfThemeProps('Container', {
        props: { size },
      })
    );
    const theType = type === 'password' ? 'password' : 'text';
    return (
      <CommonInputStyle
        maxLength={_maxLength}
        themeProps={theThemeProps}
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

const TargetTxtBox = ThemeHoc(KeyBoardEventAdaptor(TextBox), Widget.Input, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
