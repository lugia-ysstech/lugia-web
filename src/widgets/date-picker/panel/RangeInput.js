/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Input from '../../input';
import Icon from '../../icon/index';
import {
  RangeInputWrap,
  RangeInputInner,
  NewInput,
  RangeMiddleSpan,
} from '../styled/styledRangeInput';
import Theme from '../../theme';
import Widget from '../../consts/index';
import { getBorder } from '@lugia/theme-utils';
import getThemeProps from '../themeConfig/themeConfig';
import { addMouseEvent } from '@lugia/theme-hoc';
type TypeProps = {
  onChange?: Function,
  onClick?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onClear?: Function,
  value: Array<string>,
  disabled?: boolean,
  readOnly?: boolean,
  placeholder: Array<string>,
  theme: Object,
  mode?: string,
};
type TypeState = {
  value: Array<string>,
  format: string,
};
class RangeInput extends Component<TypeProps, TypeState> {
  static dispalyName = 'RangeInput';
  oldValue: Array<string>;
  constructor() {
    super();
    this.oldValue = [];
  }
  onChangeFirst = (params: Object) => {
    this.onChange(0, params);
  };
  onChangeSecond = (params: Object) => {
    this.onChange(1, params);
  };
  onChange = (number: number, params: Object) => {
    const { newValue, event } = params;
    const { value } = this.props;
    value[number] = newValue;
    const { onChange } = this.props;
    onChange && onChange({ event, newValue: value, oldValue: this.oldValue, number });
  };
  onHandleClick = (e: any) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };
  onFocus = (e: any) => {
    const { value } = this.props;
    this.oldValue = [...value];
    const { onFocus } = this.props;
    onFocus && onFocus();
  };
  onBlur = () => {
    const { onBlur } = this.props;
    onBlur && onBlur();
  };
  onClear = () => {
    const { onClear } = this.props;
    onClear && onClear();
  };
  getInputStyle = (state = {}) => {
    const ableSelectNames = ['color', 'fontSize', 'font'];
    const obj = {};
    ableSelectNames.forEach(list => {
      const hasName = list in state;
      if (hasName) {
        obj[list] = state[list];
      }
    });
    return obj;
  };
  render() {
    const { value } = this.props;
    const { disabled, readOnly, placeholder } = this.props;
    const config = {
      onFocus: disabled || readOnly ? '' : this.onFocus,
      disabled,
      readOnly,
    };
    const { mode, getPartOfThemeProps } = this.props;

    const inputPublicConfig = state => {
      return {
        border: getBorder({ style: '', width: 0, color: '' }),
        outline: 'none',
        boxShadow: {
          x: '',
          y: '',
          blur: '',
          spread: '',
          color: '',
          type: '',
        },
        ...this.getInputStyle(state),
      };
    };
    const inputContainProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputContain');
    const inputPrefixProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputPrefix');
    const clearButtonProps = getThemeProps({ mode, getPartOfThemeProps }, 'ClearButton');
    const {
      themeConfig: {
        normal = {},
        hover = {},
        focus = {},
        active = {},
        disabled: styleDisabled = {},
      },
    } = inputContainProps;
    const {
      width,
      height,
      border: {
        left: { width: borderWidthL = 1 } = {},
        right: { width: borderWidthR = 1 } = {},
        top: { width: borderWidthT = 1 } = {},
        bottom: { width: borderWidthB = 1 } = {},
      } = {},
    } = normal;
    const {
      border: {
        left: { width: hoverBorderWidthL = 1 } = {},
        right: { width: hoverBorderWidthR = 1 } = {},
        top: { width: hoverBorderWidthT = 1 } = {},
        bottom: { width: hoverBorderWidthB = 1 } = {},
      } = {},
    } = hover;

    const { themeConfig: inputPrefixThemeConfig } = inputPrefixProps;
    const { themeConfig: clearButtonThemeConfig } = clearButtonProps;
    inputContainProps.propsConfig.width = width;

    return (
      <Theme
        config={{
          [Widget.Input]: {
            Input: {
              normal: {
                width: ((width - (borderWidthL + borderWidthR)) * 0.9) / 2,
                height: height - (borderWidthT + borderWidthB),
                ...inputPublicConfig(normal),
              },
              hover: {
                width: ((width - (hoverBorderWidthL + hoverBorderWidthR)) * 0.9) / 2,
                height: height - (hoverBorderWidthT + hoverBorderWidthB),
                ...inputPublicConfig(hover),
              },
              focus: {
                ...inputPublicConfig(focus),
              },
              active: {
                ...inputPublicConfig(active),
              },
              disabled: {
                border: {
                  top: { width: 0, style: '', color: '' },
                  right: { width: 0, style: '', color: '' },
                  bottom: { width: 0, style: '', color: '' },
                  left: { width: 0, style: '', color: '' },
                },
                ...this.getInputStyle(styleDisabled),
              },
            },
            InputPrefix: {
              ...inputPrefixThemeConfig,
            },
            ClearButton: {
              ...clearButtonThemeConfig,
            },
          },
        }}
      >
        <RangeInputWrap
          mode={mode}
          disabled={disabled}
          width={width}
          onClick={readOnly || disabled ? '' : this.onHandleClick}
          themeProps={inputContainProps}
          {...addMouseEvent(this)}
        >
          <RangeInputInner themeProps={inputContainProps} disabled={disabled}>
            <Input
              prefix={<Icon iconClass="lugia-icon-financial_date" />}
              value={value[0]}
              onChange={this.onChangeFirst}
              placeholder={placeholder[0]}
              onBlur={this.onBlur}
              {...config}
              suffix={<i />}
              {...this.props.dispatchEvent([['hover']], 'f2c')}
            />
            <RangeMiddleSpan
              themeProps={inputContainProps}
              {...this.props.dispatchEvent([['hover']], 'f2c')}
            >
              ~
            </RangeMiddleSpan>
            <Input
              value={value[1]}
              onChange={this.onChangeSecond}
              onBlur={this.onBlur}
              placeholder={placeholder[1]}
              {...config}
              onClear={this.onClear}
              {...this.props.dispatchEvent([['hover']], 'f2c')}
            />
          </RangeInputInner>
        </RangeInputWrap>
      </Theme>
    );
  }
}
export default RangeInput;
