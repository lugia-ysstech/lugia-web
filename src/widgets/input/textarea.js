//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import type { ResizeType } from '../css/input';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { checkIsPercent } from './utils';
import { ObjectUtils } from '@lugia/type-utils';
import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
  validateWidthTheme,
} from '../css/validateHoc';
import ValidateHoc from './validateHoc';
import type { ValidateStatus, ValidateType } from '../css/validateHoc';

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

const Textarea = CSSComponent({
  tag: 'textarea',
  className: 'Textarea',
  normal: {
    selectNames: [
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
      borderRadius: getBorderRadius(borderRadius),
      fontSize: 12,
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: {
          placeHolderColor,
          placeHolderFont: { size, weight, color },
          placeHolderFontSize,
          resizeType,
        },
      } = themeProps;
      const { width } = themeMeta;
      const theColor = color ? color : placeHolderColor;
      const theSize = size ? size : placeHolderFontSize ? placeHolderFontSize : 12;
      let theWidth = ObjectUtils.isNumber(width) ? px2remcss(width) : width;
      let theResizeType = resizeType;
      if (checkIsPercent(width)) {
        theWidth = '100%';
        theResizeType = 'none';
      }
      return css`
        width: ${theWidth};
        resize: ${theResizeType};
        &::placeholder {
          color: ${theColor};
          font-size: ${px2remcss(theSize)};
          font-weight: ${weight};
        }
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { width, color, font: { color: fontColor } = {} } = themeMeta;
      const paddingLeft = width && width < 200 ? width / 20 : padding;
      const paddingRight = 35;
      const theColor = fontColor || color || blackColor;
      return {
        color: theColor,
        padding: {
          left: paddingLeft,
          right: paddingRight,
          top: 6,
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
      borderRadius: getBorderRadius(borderRadius),
      border: getBorder({ color: themeHoverColor, width: borderSize, style: 'solid' }),
    },
  },
  active: {
    selectNames: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
    defaultTheme: {
      boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px ${themeActiveColor}`),
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
    line-height: 1;
    font-family: inherit;
    transition: all ${transitionTime};
    outline: none;
  `,
});

const TextareaContainer = CSSComponent({
  tag: 'span',
  className: 'TextareaContainer',
  normal: {
    selectNames: [['margin']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { width } = themeMeta;
      const theWidth = checkIsPercent(width) ? width : '100%';
      return `width:${theWidth};`;
    },
  },
  hover: {
    selectNames: [],
  },
  click: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    outline: none;
    display: inline-block;
    font-size: 0;
  `,
});

const Clear = 'lugia-icon-reminder_close';

type TextareaState = {
  value: string,
};

type TextareaProps = {
  themeProps: Object,
  disabled: boolean,
  placeholder?: string,
  onChange?: ({ newValue: string, oldValue: string, event: Event }) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onClear?: Function,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  clearIcon?: string,
  canClear?: boolean,
  autoFocus?: boolean,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  resizeType: ResizeType,
  validateStatus: ValidateStatus,
  validateType: ValidateType,
  help: string,
  readOnly: boolean,
};

class TextAreaBox extends Component<TextareaProps, TextareaState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
    defaultValue: '',
    resizeType: 'both',
  };
  textarea: any;
  static displayName = Widget.Textarea;
  actualValue = '';

  constructor(props: TextareaProps) {
    super(props);
    this.textarea = React.createRef();
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

  onFocus = (event: UIEvent) => {
    const { onFocus, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onFocus && onFocus(event);
  };

  onBlur = (event: UIEvent) => {
    const { onBlur, disabled, readOnly } = this.props;
    if (disabled || readOnly) {
      return;
    }
    onBlur && onBlur(event);
  };

  onChange = (event: Object) => {
    const { target } = event;
    const { value } = target;
    this.setValue(value, event);
  };

  setValue(value: string, event: Event): void {
    const oldValue = this.state.value;
    const { disabled, onChange } = this.props;
    if (oldValue === value || disabled) {
      return;
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

  render() {
    return this.getTextareaContainer();
  }
  getInnerTextarea() {
    return [this.generateInput(), this.getClearButton()];
  }

  getTextareaContainer() {
    const { getPartOfThemeProps } = this.props;
    return (
      <TextareaContainer {...addMouseEvent(this)} themeProps={getPartOfThemeProps('Container')}>
        {this.getInnerTextarea()}
      </TextareaContainer>
    );
  }

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
            fontSize: 10,
            getCSS() {
              return `position: absolute;right:${px2remcss(padding)};top:${px2remcss(8)};`;
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
        {...addMouseEvent(this)}
      />
    );
  }
  generateInput(): React$Node {
    const { value } = this.state;
    const {
      placeholder,
      autoFocus,
      disabled,
      resizeType,
      validateStatus,
      validateType,
      getPartOfThemeProps,
    } = this.props;
    const {
      themeConfig: { normal: { color = lightGreyColor, font = {}, fontSize } = {} },
    } = getPartOfThemeProps('Placeholder');

    const propsConfig = {
      validateType,
      validateStatus,
      placeHolderColor: color,
      placeHolderFontSize: fontSize,
      placeHolderFont: font,
      resizeType,
    };
    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorInput');
    const theValidateWidthThemeProps = validateType ? validateWidthTheme : {};
    const theValidateThemeProps = isValidateError(validateStatus)
      ? deepMerge(
          validateValueDefaultTheme,
          validateBorderDefaultTheme,
          validateErrorInputThemeProps
        )
      : {};
    const theThemeProps = deepMerge(
      getPartOfThemeProps('Container', { props: { ...propsConfig } }),
      theValidateWidthThemeProps,
      theValidateThemeProps
    );

    return (
      <Textarea
        themeProps={theThemeProps}
        autoFocus={autoFocus}
        ref={this.textarea}
        value={value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyUp={this.onKeyUp}
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown, onEnter, disabled } = this.props;
    if (disabled) {
      return;
    }
    onKeyDown && onKeyDown(event);
    const { keyCode } = event;
    onEnter && keyCode === 13 && onEnter(event);
  };
  onKeyPress = (event: KeyboardEvent) => {
    const { onKeyPress, disabled } = this.props;
    if (disabled) {
      return;
    }
    onKeyPress && onKeyPress(event);
  };
  onKeyUp = (event: KeyboardEvent) => {
    const { onKeyUp, disabled } = this.props;
    if (disabled) {
      return;
    }
    onKeyUp && onKeyUp(event);
  };
}

const TargetTxtBox = ThemeHoc(ValidateHoc(KeyBoardEventAdaptor(TextAreaBox)), Widget.Textarea, {
  hover: true,
  active: true,
});

export default TargetTxtBox;
