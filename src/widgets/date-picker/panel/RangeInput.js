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
import {
  getIconTheme,
  getRangeInputMiddleSymbolTheme,
  getRangeInputPlaceholderTheme,
} from '../themeConfig/themeConfig';
import { addMouseEvent } from '@lugia/theme-hoc';
import getDateIcon from '../panel/InputIcon';
import { getLimitInputValue } from '../utils/utils';
type TypeProps = {
  onChange?: Function,
  onClick?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onClear?: Function,
  getPartOfThemeProps: Function,
  dispatchEvent: Function,
  value: Array<string>,
  disabled?: boolean,
  readOnly?: boolean,
  size: boolean,
  placeholder: Array<string>,
  mode?: string,
  errorTipTheme: Object,
  themeProps: Object,
  validateStatus: string,
  help: string,
  validateType: string,
  middleSymbol?: string,
  startDisabled?: boolean,
  endDisabled?: boolean,
  limitMinValue?: string,
  limitMaxValue?: string,
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
    onClick && onClick(e, true);
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
  onClear = (e: any) => {
    const { onClear } = this.props;
    onClear && onClear(e);
  };
  getInputStyle = (state: Object = {}) => {
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
    const {
      disabled,
      readOnly,
      placeholder,
      size,
      value,
      themeProps,
      middleSymbol = '~',
    } = this.props;
    const config = {
      onFocus: disabled || readOnly ? '' : this.onFocus,
      disabled,
      readOnly,
    };
    const { mode, getPartOfThemeProps, endDisabled, startDisabled } = this.props;

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
    const inputContainProps = themeProps;

    const { inputPrefixProps, inputSuffixProps, clearButtonProps } = getIconTheme(this.props);
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
        top: { width: borderWidthT = 0 } = {},
        bottom: { width: borderWidthB = 0 } = {},
      } = {},
    } = normal;

    const { themeConfig: inputPrefixThemeConfig } = inputPrefixProps;
    const { suffixIcon, prefixIcon } = getDateIcon({
      ...this.props,
      onClear: this.onClear,
      clearButtonTheme: clearButtonProps,
    });
    const middleSymbolTheme = getRangeInputMiddleSymbolTheme({ size, getPartOfThemeProps });
    const { themeConfig: placeholderTheme } = getRangeInputPlaceholderTheme({
      size,
      getPartOfThemeProps,
    });
    return (
      <Theme
        config={{
          [Widget.Input]: {
            Container: {
              normal: {
                width: '100%',
                border: getBorder({ style: '', width: 0, color: '' }),
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
            Placeholder: {
              ...placeholderTheme,
            },
          },
        }}
      >
        <RangeInputWrap
          mode={mode}
          disabled={disabled}
          onClick={readOnly || disabled || startDisabled || endDisabled ? '' : this.onHandleClick}
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
                disabled={startDisabled}
              />
            </RangeInputInnerInput>

            <RangeMiddleSpan
              themeProps={middleSymbolTheme}
              {...this.props.dispatchEvent([['hover']], 'f2c')}
            >
              {middleSymbol}
            </RangeMiddleSpan>
            <RangeInputInnerInput themeProps={inputContainProps} last>
              <Input
                {...suffixIcon}
                value={value[1]}
                onChange={this.onChangeSecond}
                onBlur={this.onBlur}
                placeholder={placeholder[1]}
                {...config}
                // onClear={this.onClear}
                {...this.props.dispatchEvent([['hover']], 'f2c')}
                disabled={endDisabled}
              />
            </RangeInputInnerInput>
          </RangeInputInner>
        </RangeInputWrap>
      </Theme>
    );
  }
}
export default RangeInput;
