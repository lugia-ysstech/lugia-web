//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import type { InputSize, InputValidateType, ValidateStatus } from '../css/input';
import { DefaultHelp, isValidateSuccess, isSuccess } from '../css/input';
import ToolTip from '../tooltip/index';
import Icon from '../icon';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';

import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { ObjectUtils } from '@lugia/type-utils';
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
} = colorsFunc();

const CommonInputStyle = CSSComponent({
  tag: 'input',
  className: 'InnerInput',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
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
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(4),
      width: '100%',
      fontSize: 12,
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { placeHolderColor, placeHolderFont, placeHolderFontSize } = propsConfig;
      const { size, weight, color } = placeHolderFont;
      const theColor = color ? color : placeHolderColor;
      const theSize = size ? size : placeHolderFontSize;
      return css`
        &::placeholder {
          color: ${theColor};
          font-size: ${theSize}px;
          font-weight: ${weight};
        }
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { size, prefix, validateStatus, validateType, suffix, isShowClearButton } = propsConfig;
      const { width, height, color } = themeMeta;
      const theColor = color
        ? color
        : isValidateSuccess(validateStatus, validateType, 'inner')
        ? dangerColor
        : blackColor;

      const theHeight = height ? height : size === 'large' ? 40 : size === 'small' ? 24 : 32;
      const paddingLeft = prefix ? 30 : width && width < 200 ? width / 20 : 10;
      const paddingRight =
        suffix || isShowClearButton ? 35 : width && width < 200 ? 15 + width / 10 : 10;
      return {
        color: theColor,
        height: theHeight,
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
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(4),
    },
  },
  active: {
    selectNames: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig, themeState } = themeProps;
      const { validateStatus } = propsConfig;
      const { disabled } = themeState;
      const theColor = disabled
        ? disableColor
        : isSuccess(validateStatus)
        ? 'rgba(104, 79, 255, 0.2)'
        : 'rgba(248, 172, 48, 0.2)';
      const shadow = `0 0 6 ${theColor}`;
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
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
    },
  },
  css: css`
    box-sizing: border-box;
    line-height: 1.5;
    display: inline-block;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    min-width: ${px2remcss(30)};
  `,
});

const BaseInputContainer = StaticComponent({
  tag: 'span',
  className: 'InputBaseInputContainer',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: inline-block;
  `,
});

const InputContainer = CSSComponent({
  tag: 'div',
  className: 'inputContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin']],
    defaultTheme: {
      width: '100%',
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
  tag: 'span',
  className: 'inputTipBottom',
  css: css`
    display: block;
    transform: translateY(50%);
  `,
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: dangerColor,
      fontSize: 10,
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { validateType, validateStatus } = propsConfig;
      const theVisibility = isValidateSuccess(validateStatus, validateType, 'bottom')
        ? 'visible'
        : 'hidden';
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
    color: rgba(0, 0, 0, 0.65);
  `,
});

const Prefix: Object = CSSComponent({
  extend: Fix,
  className: 'inputPrefix',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
  },
  css: css`
    left: ${px2remcss(10)};
  `,
});

const Suffix: Object = CSSComponent({
  extend: Fix,
  className: 'inputSuffix',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
  },
  css: css`
    right: ${px2remcss(10)};
  `,
});

const Clear = 'lugia-icon-reminder_close';

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
    isShowClearButton: true,
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
    this.input = React.createRef();
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
    const theThemeProps = this.props.getPartOfThemeProps('Container');
    return (
      <InputContainer themeProps={theThemeProps} {...addMouseEvent(this)}>
        {fetcher()}
      </InputContainer>
    );
  }

  getInputInner = () => {
    const { validateType, validateStatus, help, themeProps, prefix, size } = this.props;
    themeProps.props = { validateType, validateStatus, prefix, size };
    if (validateType === 'bottom') {
      const result = [
        <BaseInputContainer themeProps={themeProps}>
          {this.generatePrefix()}
          {this.generateInput()}
          {this.generateSuffix()}
        </BaseInputContainer>,
      ];
      const tipBottomThemeProps = this.props.getPartOfThemeProps('validateBottom', {
        props: { validateType, validateStatus, prefix, size },
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
    const { validateType, size, help, validateStatus, prefix } = props;
    const result = this.getInputContent();
    const { theme: topTipThemeProps, viewClass } = this.props.getPartOfThemeHocProps(
      'ValidateTopTip'
    );

    const newTheme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              background: { color: superLightColor },
              getCSS() {
                return 'display: inline-block;';
              },
            },
          },
          TooltipTitle: {
            normal: { color: dangerColor },
          },
        },
      },
      topTipThemeProps
    );

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

  getFixIcon(fix: ReactDOM, WidgetName: string): React$Element<any> {
    if (ObjectUtils.isString(fix)) {
      return (
        <Icon singleTheme {...this.props.getPartOfThemeHocProps(WidgetName)} iconClass={fix} />
      );
    }
    return fix;
  }

  generatePrefix(): React$Element<any> | null {
    const { prefix } = this.props;
    const PrefixThemeProps = this.props.getPartOfThemeProps('InputPrefix');
    if (prefix) {
      return (
        <Prefix themeProps={PrefixThemeProps}>{this.getFixIcon(prefix, 'InputPrefix')}</Prefix>
      );
    }
    return null;
  }

  generateSuffix(): React$Element<any> | null {
    const { suffix } = this.props;
    const SuffixThemeProps = this.props.getPartOfThemeProps('InputSuffix');
    if (suffix) {
      return (
        <Suffix themeProps={SuffixThemeProps}>{this.getFixIcon(suffix, 'InputSuffix')}</Suffix>
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
    const show = this.state.clearButtonShow;
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
                   right: ${px2remcss(10)};`;
            },
          },
          hover: {
            color: darkGreyColor,
          },
        },
      },
      ClearButtonThemeProps
    );

    return (
      <Icon
        singleTheme
        viewClass={clearViewClass}
        theme={newTheme}
        iconClass={Clear}
        onClick={this.onClear}
        show={show}
        {...addMouseEvent(this)}
      />
    );
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
      disabled,
      isShowClearButton,
    } = props;
    if (formatter && parser) {
      value = formatter(value);
    }

    const { themeConfig = { normal: {} } } = this.props.getPartOfThemeProps('Placeholder');
    const { normal = {} } = themeConfig;
    const { color = lightGreyColor, font = {}, fontSize } = normal;
    const theThemeProps = deepMerge(
      this.props.getPartOfThemeProps('Input', {
        props: {
          validateType,
          validateStatus,
          prefix,
          suffix,
          size,
          placeHolderColor: color,
          placeHolderFont: font,
          placeHolderFontSize: fontSize,
          isShowClearButton,
        },
      }),
      this.props.getPartOfThemeProps('Container')
    );
    return (
      <CommonInputStyle
        themeProps={theThemeProps}
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

const TargetTxtBox = ThemeHoc(KeyBoardEventAdaptor(TextBox), Widget.Input, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
