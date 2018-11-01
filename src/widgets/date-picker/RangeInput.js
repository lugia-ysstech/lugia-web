/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Input from '../input';
import Icon from '../icon/index';
import { getDerivedForInput } from './getDerived';
import { RangeInputWrap, RangeInputInner } from './styled';
type TypeProps = {
  onChange?: Function,
  onClick?: Function,
  onFocus?: Function,
  onBlur?: Function,
  value?: Array<string>,
  disabled?: boolean,
  readOnly?: boolean,
  placeholder?: Array<string>,
};
type TypeState = {
  value: Array<string>,
  format: string,
};
class RangeInput extends Component<TypeProps, TypeState> {
  picker: any;
  oldValue: [];
  constructor() {
    super();
    this.picker = React.createRef();
    this.oldValue = [];
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value = ['', ''], format } = getDerivedForInput(nextProps, preState);
    return {
      value,
      format,
    };
  }
  onChangeFirst = (params: Object) => {
    this.onChange(0, params);
  };
  onChangeSecond = (params: Object) => {
    this.onChange(1, params);
  };
  onChange = (number: number, params: Object) => {
    const { newValue } = params;
    const { value } = this.state;
    value[number] = newValue;
    this.setState(value, () => {
      const { onChange } = this.props;
      onChange && onChange({ newValue: value, oldValue: this.oldValue });
    });
  };
  onHandleClick = () => {
    const { onClick } = this.props;
    onClick && onClick(true);
  };
  onFocus = () => {
    const { value } = this.state;
    this.oldValue = [...value];
    const { onFocus } = this.props;
    onFocus && onFocus();
  };
  onBlur = () => {
    const { onBlur } = this.props;
    onBlur && onBlur();
  };
  render() {
    const { value } = this.props;
    const { disabled, readOnly, placeholder } = this.props;
    const config = {
      onFocus: disabled || readOnly ? '' : this.onFocus,
      onBlur: disabled || readOnly ? '' : this.onBlur,
      disabled,
      readOnly,
    };
    return (
      <RangeInputWrap onClick={readOnly || disabled ? '' : this.onHandleClick}>
        <RangeInputInner disabled={disabled}>
          <Input
            prefix={<Icon className="lugia-icon-financial_date" />}
            value={value[0]}
            onChange={this.onChangeFirst}
            placeholder={placeholder[0]}
            {...config}
          />
          <span>~</span>
          <Input
            value={value[1]}
            onChange={this.onChangeSecond}
            placeholder={placeholder[1]}
            {...config}
          />
        </RangeInputInner>
      </RangeInputWrap>
    );
  }
}
export default RangeInput;
