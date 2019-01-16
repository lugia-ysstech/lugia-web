/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Input from '../../input';
import Icon from '../../icon/index';
import { RangeInputWrap, RangeInputInner, RangeMiddleSpan } from '../styled/styled';
import Theme from '../../theme';
import Widget from '../../consts/index';
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
  render() {
    const { value } = this.props;
    const { disabled, readOnly, placeholder } = this.props;
    const config = {
      onFocus: disabled || readOnly ? '' : this.onFocus,
      disabled,
      readOnly,
    };
    const { theme, mode } = this.props;
    const { width = 420 } = theme;
    const newWidth = width - 15 - 2;
    const InputWidth = newWidth / 2;
    return (
      <Theme config={{ [Widget.Input]: { ...theme, width: InputWidth } }}>
        <RangeInputWrap
          {...theme}
          mode={mode}
          onClick={readOnly || disabled ? '' : this.onHandleClick}
        >
          <RangeInputInner disabled={disabled}>
            <Input
              prefix={<Icon className="lugia-icon-financial_date" />}
              value={value[0]}
              onChange={this.onChangeFirst}
              placeholder={placeholder[0]}
              onBlur={this.onBlur}
              {...config}
              suffix={<i />}
            />
            <RangeMiddleSpan width={15}>~</RangeMiddleSpan>
            <Input
              value={value[1]}
              onChange={this.onChangeSecond}
              onBlur={this.onBlur}
              placeholder={placeholder[1]}
              {...config}
              onClear={this.onClear}
            />
          </RangeInputInner>
        </RangeInputWrap>
      </Theme>
    );
  }
}
export default RangeInput;
