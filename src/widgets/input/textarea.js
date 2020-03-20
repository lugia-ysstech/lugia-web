//@flow
import '../common/shirm';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import { fixControlledValue } from '../utils';
import Icon from '../icon';
import ToolTip from '../tooltip/index';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import type { ResizeType, ValidateStatus, ValidateType } from '../css/input';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { ObjectUtils } from '@lugia/type-utils';
import changeColor from '../css/utilsColor';
import { TipBottom, BaseInputContainer } from './input';
import { checkValidateResultFromStatusAndType, DefaultHelp, isValidateError } from '../css/input';
import get from '../css/theme-common-dict';

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
const borderRadius = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';

const checkIsPercent = width => {
  return width && typeof width === 'string' && width.indexOf('%') !== -1;
};

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
      const {
        propsConfig: { validateStatus, validateType },
      } = themeProps;
      const { width, color, border, boxShadow } = themeMeta;

      const paddingLeft = width && width < 200 ? width / 20 : padding;
      const paddingRight = 35;

      const theColor = color
        ? color
        : checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')
        ? dangerColor
        : blackColor;
      const shadowCSS = boxShadow
        ? boxShadow
        : isValidateError(validateStatus)
        ? getBoxShadow(
            `${hShadow}px ${vShadow}px ${shadowSpread}px ${changeColor(dangerColor, 0, 0, 10).rgba}`
          )
        : {};
      const theBorderColor = isValidateError(validateStatus) ? dangerColor : borderColor;
      const borderOBJ = border
        ? border
        : { color: theBorderColor, width: borderSize, style: 'solid' };
      return {
        boxShadow: shadowCSS,
        border: getBorder(borderOBJ),
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
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus },
      } = themeProps;
      const { border } = themeMeta;
      const borderColor = isValidateError(validateStatus) ? dangerHoverColor : themeHoverColor;
      const borderOBJ = border ? border : { color: borderColor, width: borderSize, style: 'solid' };
      return {
        border: getBorder(borderOBJ),
      };
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
        : isValidateError(validateStatus)
        ? dangerActiveColor
        : themeActiveColor;
      const shadow = `${hShadow}px ${vShadow}px ${shadowSpread}px ${theColor}`;
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
      return checkIsPercent(width) ? `width:${width};` : '';
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { validateStatus, validateType },
      } = themeProps;
      const { color } = themeMeta;
      const theColor = color
        ? color
        : checkValidateResultFromStatusAndType(validateStatus, 'error', validateType, 'inner')
        ? dangerColor
        : blackColor;
      return {
        color: theColor,
      };
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
};

class TextAreaBox extends Component<TextareaProps, TextareaState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
    defaultValue: '',
    resizeType: 'both',
    validateStatus: 'default',
    validateType: 'inner',
    help: DefaultHelp,
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
      this.actualValue = help;
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
    const { props } = this;
    const { validateType, help, validateStatus, getPartOfThemeHocProps } = props;
    const result = this.getTextareaContainer();

    const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
      'ValidateErrorText'
    );
    const newTheme = {
      [viewClass]: {
        Container: deepMerge(
          {
            normal: {
              background: { color: darkGreyColor },
              getCSS() {
                return 'display: inline-block;';
              },
            },
          },
          validateTopTipThemeProps[viewClass]
        ),
        TooltipTitle: deepMerge(
          { normal: { color: defaultColor } },
          validateTopTipThemeProps[viewClass]
        ),
      },
    };
    if (validateType === 'top') {
      const visible = isValidateError(validateStatus);
      return (
        <ToolTip
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
  getInnerTextarea() {
    return [this.generateInput(), this.getClearButton()];
  }

  getTextareaContainer() {
    const { props } = this;
    const { validateType, help, validateStatus } = props;
    if (validateType === 'bottom') {
      const result = [
        <TextareaContainer
          {...addMouseEvent(this)}
          themeProps={this.props.getPartOfThemeProps('Container')}
        >
          <BaseInputContainer>{this.getInnerTextarea()}</BaseInputContainer>
        </TextareaContainer>,
      ];
      const tipBottomThemeProps = this.props.getPartOfThemeProps('ValidateErrorText', {
        props: { validateStatus },
      });
      result.push(<TipBottom themeProps={tipBottomThemeProps}>{help}</TipBottom>);
      return result;
    }

    return (
      <TextareaContainer
        {...addMouseEvent(this)}
        themeProps={this.props.getPartOfThemeProps('Container')}
      >
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
      themeConfig: { normal: { color = get('lightGreyColor'), font = {}, fontSize } = {} },
    } = getPartOfThemeProps('Placeholder');

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorInput');

    const theValidateThemeProps = checkValidateResultFromStatusAndType(
      validateStatus,
      'error',
      validateType,
      'inner'
    )
      ? validateErrorInputThemeProps
      : {};
    const propsConfig = {
      validateType,
      validateStatus,
      placeHolderColor: color,
      placeHolderFontSize: fontSize,
      placeHolderFont: font,
      resizeType,
    };
    const theThemeProps = deepMerge(
      this.props.getPartOfThemeProps('Input', {
        props: { ...propsConfig },
      }),
      theValidateThemeProps,
      this.props.getPartOfThemeProps('Container', {
        props: { ...propsConfig },
      })
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

const TargetTxtBox = ThemeHoc(KeyBoardEventAdaptor(TextAreaBox), Widget.Textarea, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
