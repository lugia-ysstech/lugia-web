/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Input from '../../input';
import {
  RangeInputWrap,
  RangeInputInner,
  RangeInputInnerInput,
  RangeMiddleSpan,
} from '../styled/styledRangeInput';
import Theme from '../../theme';
import Widget from '../../consts/index';
import { getBorder } from '@lugia/theme-utils';
import getThemeProps, { getWrapThemeProps } from '../themeConfig/themeConfig';
import { addMouseEvent } from '@lugia/theme-hoc';
import { getDateIcon } from '../utils/utils';
import { themeColor } from '../styled/utils';
const { borderSize } = themeColor;
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
    const ableSelectNames = ['color', 'fontSize', 'font', 'background'];
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
    const inputContainProps = getWrapThemeProps({ mode, getPartOfThemeProps }, 'Container');
    const inputPrefixProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputPrefix');
    const inputSuffixProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputSuffix');
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
      height,
      border: {
        top: { width: borderWidthT = borderSize } = {},
        bottom: { width: borderWidthB = borderSize } = {},
      } = {},
    } = normal;

    const { themeConfig: inputPrefixThemeConfig } = inputPrefixProps;
    const { themeConfig: clearButtonThemeConfig } = clearButtonProps;
    const { suffixIcon, prefixIcon } = getDateIcon(this.props);
    return (
      <Theme
        config={{
          [Widget.Input]: {
            Container: {
              normal: {
                width: '100%',
                height: height - (borderWidthT * 1 + borderWidthB * 1),
              },
            },
            Input: {
              normal: {
                padding: { right: 2 },
                ...inputPublicConfig(normal),
                background: { color: 'transparent' },
              },
              hover: {
                ...inputPublicConfig(hover),
                background: { color: 'transparent' },
              },
              focus: {
                ...inputPublicConfig(focus),
                background: { color: 'transparent' },
              },
              active: {
                ...inputPublicConfig(active),
                background: { color: 'transparent' },
              },
              disabled: {
                border: getBorder({ style: '', width: 0, color: '' }),
                ...this.getInputStyle(styleDisabled),
              },
            },
            InputPrefix: {
              disabled: {
                color: '#ddd',
              },
              ...inputPrefixThemeConfig,
            },
            InputSuffix: {
              disabled: {
                color: '#ddd',
              },
              ...inputSuffixProps.themeConfig,
            },
            ClearButton: {
              disabled: {
                color: '#ddd',
              },
              ...clearButtonThemeConfig,
            },
          },
        }}
      >
        <RangeInputWrap
          mode={mode}
          disabled={disabled}
          onClick={readOnly || disabled ? '' : this.onHandleClick}
          themeProps={inputContainProps}
          {...addMouseEvent(this)}
        >
          <RangeInputInner themeProps={inputContainProps} disabled={disabled}>
            <RangeInputInnerInput themeProps={inputContainProps}>
              <Input
                {...prefixIcon}
                value={value[0]}
                onChange={this.onChangeFirst}
                placeholder={placeholder[0]}
                onBlur={this.onBlur}
                {...config}
                suffix={<i />}
                {...this.props.dispatchEvent([['hover']], 'f2c')}
              />
            </RangeInputInnerInput>

            <RangeMiddleSpan
              themeProps={inputContainProps}
              {...this.props.dispatchEvent([['hover']], 'f2c')}
            >
              ~
            </RangeMiddleSpan>
            <RangeInputInnerInput themeProps={inputContainProps}>
              <Input
                {...suffixIcon}
                value={value[1]}
                onChange={this.onChangeSecond}
                onBlur={this.onBlur}
                placeholder={placeholder[1]}
                {...config}
                onClear={this.onClear}
                {...this.props.dispatchEvent([['hover']], 'f2c')}
              />
            </RangeInputInnerInput>
          </RangeInputInner>
        </RangeInputWrap>
      </Theme>
    );
  }
}
export default RangeInput;
