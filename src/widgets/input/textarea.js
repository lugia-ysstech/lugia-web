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

import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';
import { ObjectUtils } from '@lugia/type-utils';
const { px2remcss } = units;
const {
  themeColor,
  disableColor,
  borderColor,
  blackColor,
  mediumGreyColor,
  darkGreyColor,
  lightGreyColor,
} = colorsFunc();

const Textarea = CSSComponent({
  tag: 'textarea',
  className: 'textarea',
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
      const { weight, color } = placeHolderFont;
      const theColor = color ? color : placeHolderColor;
      const theSize = placeHolderFontSize ? placeHolderFontSize : 12;
      return css`
        &::placeholder {
          color: ${theColor};
          font-size: ${px2remcss(theSize)};
          font-weight: ${weight};
        }
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { width, height, color } = themeMeta;
      const theColor = color ? color : blackColor;

      const theHeight = height ? height : 32;
      const paddingLeft = width && width < 200 ? width / 20 : 10;
      const paddingRight = 35;
      return {
        color: theColor,
        height: theHeight,
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
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(4),
    },
  },
  active: {
    selectNames: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { themeState } = themeProps;
      const { disabled } = themeState;
      const theColor = disabled ? disableColor : 'rgba(248, 172, 48, 0.2)';
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
    line-height: 1;
    display: inline-block;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    min-width: ${px2remcss(30)};
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

const Clear = 'lugia-icon-reminder_close';

type TextareaState = {
  value: string,
  clearButtonShow: boolean,
};

type TextareaProps = {
  viewClass: string,
  themeProps: Object,
  disabled: boolean,
  placeholder?: string,
  getTheme: Function,
  onChange?: ({ newValue: any, oldValue: any, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onClear?: Function,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  autoFocus?: boolean,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

class TextAreaBox extends Component<TextareaProps, TextareaState> {
  static defaultProps = {
    disabled: false,
    autoFocus: false,
    viewClass: Widget.TextArea,
    defaultValue: '',
    getTheme: () => {
      return {};
    },
  };
  textarea: any;
  static displayName = Widget.Textarea;

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
    const { disabled, onChange } = this.props;

    if (oldValue === value) {
      return;
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

  getInputContainer(fetcher: Function) {
    const theThemeProps = this.props.getPartOfThemeProps('Container');
    return (
      <InputContainer themeProps={theThemeProps} {...addMouseEvent(this)}>
        {fetcher()}
      </InputContainer>
    );
  }

  getInputInner = () => {
    return [this.generateInput(), this.getClearButton()];
  };

  render() {
    return this.getInputContainer(this.getInputInner);
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
              return ` position: absolute;right: ${px2remcss(10)};top: ${px2remcss(8)};`;
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
    const { value } = this.state;
    const { onKeyUp, onKeyPress, placeholder, readOnly, autoFocus, disabled } = props;

    const { themeConfig = { normal: {} } } = this.props.getPartOfThemeProps('Placeholder');
    const { normal = {} } = themeConfig;
    const { color = lightGreyColor, font = {}, fontSize } = normal;
    const theThemeProps = deepMerge(
      this.props.getPartOfThemeProps('Textarea', {
        props: {
          placeHolderColor: color,
          placeHolderFont: font,
          placeHolderFontSize: fontSize,
        },
      }),
      this.props.getPartOfThemeProps('Container')
    );
    return (
      <Textarea
        themeProps={theThemeProps}
        autoFocus={autoFocus}
        ref={this.textarea}
        value={value}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
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

const TargetTxtBox = ThemeHoc(KeyBoardEventAdaptor(TextAreaBox), Widget.Textarea, {
  hover: true,
  active: true,
});
export default TargetTxtBox;
