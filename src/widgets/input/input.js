//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import type { InputSize, ValidateType, ValidateStatus } from '../css/input';
import {
  DefaultHelp,
  checkValidateResultFromStatusAndType,
  isValidateError,
  getInputHeight,
} from '../css/input';
import ToolTip from '../tooltip/index';
import Icon from '../icon';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { ObjectUtils } from '@lugia/type-utils';
import get from '../css/theme-common-dict';
import MouseEventAdaptor from '../common/MouseEventAdaptor';

const { px2remcss } = units;

const { padding, shadowSpread, hShadow, vShadow, transitionTime, borderSize } = colorsFunc();

const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const dangerHoverColor = '$lugia-dict.@lugia/lugia-web.dangerHoverColor';
const dangerActiveColor = '$lugia-dict.@lugia/lugia-web.dangerActiveColor';
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
        propsConfig: { prefix, validateStatus, validateType, suffix, isShowClearButton },
      } = themeProps;
      const { width, color, font: { color: fontColor } = {} } = themeMeta;

      const paddingLeft = prefix ? 30 : width && width < 200 ? width / 20 : padding;
      const paddingRight =
        suffix || isShowClearButton ? 35 : width && width < 200 ? 15 + width / 10 : padding;
      const theColor = fontColor
        ? fontColor
        : color
        ? color
        : checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')
        ? dangerColor
        : blackColor;
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

export const BaseInputContainer = StaticComponent({
  tag: 'span',
  className: 'InputBaseInputContainer',
  css: css`
    position: relative;
    display: inline-flex;
    width: 100%;
    height: 100%;
  `,
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
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus, size },
      } = themeProps;
      const { border, boxShadow, height } = themeMeta;
      const shadowCSS = boxShadow
        ? boxShadow
        : isValidateError(validateStatus)
        ? getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px ${get('inputDangerColor')}`)
        : {};
      const theBorderColor = isValidateError(validateStatus) ? dangerColor : borderColor;
      const borderOBJ = border
        ? border
        : getBorder({ color: theBorderColor, width: borderSize, style: 'solid' });
      const theHeight = getInputHeight(height, size);
      return {
        boxShadow: shadowCSS,
        border: borderOBJ,
        height: theHeight,
      };
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus },
      } = themeProps;
      const { border } = themeMeta;
      const theBorderColor = isValidateError(validateStatus) ? dangerHoverColor : themeHoverColor;
      const borderOBJ = border
        ? border
        : getBorder({ color: theBorderColor, width: borderSize, style: 'solid' });
      return {
        border: borderOBJ,
      };
    },
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus },
      } = themeProps;
      const { boxShadow, border } = themeMeta;
      const theColor = isValidateError(validateStatus) ? dangerActiveColor : themeActiveColor;
      const shadowCSS = `${hShadow}px ${vShadow}px ${shadowSpread}px ${theColor}`;
      const shadowOBJ = boxShadow ? boxShadow : getBoxShadow(shadowCSS);
      const theBorderColor = isValidateError(validateStatus) ? dangerHoverColor : themeHoverColor;
      const borderOBJ = border
        ? border
        : getBorder({ color: theBorderColor, width: borderSize, style: 'solid' });
      return {
        border: borderOBJ,
        boxShadow: shadowOBJ,
      };
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

export const TipBottom = CSSComponent({
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
        top: 4,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { validateStatus } = propsConfig;
      const theVisibility = isValidateError(validateStatus) ? 'visible' : 'hidden';
      return `visibility:${theVisibility}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
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
    validateStatus: 'default',
    validateType: 'top',
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
    let { value, defaultValue, validateStatus } = nextProps;
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
    this.setState({ isToolTipVisible: true });
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
    this.setState({ isToolTipVisible: false });
    if (checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')) {
      const { value } = this.state;
      this.actualValue = value;
      this.setState({ value: help });
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
    return <InputContainer themeProps={this.getFinalThemeProps()}>{fetcher()}</InputContainer>;
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
      result.push(<TipBottom themeProps={tipBottomThemeProps}>{help}</TipBottom>);
      return result;
    }
    return [this.generatePrefix(), this.generateInput(), this.generateSuffix()];
  };

  render() {
    const { props } = this;
    const { validateType, size, help, validateStatus, prefix, getPartOfThemeHocProps } = props;
    const result = this.getInputContainer(this.getInputInner);

    const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
      'ValidateErrorText'
    );
    const newTheme = {
      [viewClass]: {
        Container: deepMerge(
          {
            normal: {
              background: { color: get('darkGreyColor') },
              getCSS() {
                return 'display: inline-block;';
              },
            },
          },
          validateTopTipThemeProps[viewClass]
        ),
        TooltipTitle: deepMerge(
          { normal: { color: get('defaultColor') } },
          validateTopTipThemeProps[viewClass]
        ),
      },
    };
    const { isToolTipVisible } = this.state;
    if (validateType === 'top') {
      return (
        <ToolTip
          propsConfig={{ validateType, validateStatus, prefix, size }}
          theme={newTheme}
          viewClass={viewClass}
          title={help}
          action={'focus'}
          popArrowType={'round'}
          placement={'topLeft'}
          visible={isValidateError(validateStatus) && isToolTipVisible}
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

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorInput');

    const theValidateThemeProps = isValidateError(validateStatus)
      ? validateErrorInputThemeProps
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
      theValidateThemeProps,
      getPartOfThemeProps('Container', {
        props: { size },
      })
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

const TargetTxtBox = ThemeHoc(MouseEventAdaptor(KeyBoardEventAdaptor(TextBox)), Widget.Input, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
