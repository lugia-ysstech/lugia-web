/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Input from '../input';
import Icon from '../icon/index';
import { getDerivedForInput } from './getDerived';
import { RangeInputWrap, RangeInputInner, RangeMiddleSpan } from './styled';
import Theme from '../theme';
import Widget from '../consts/index';
import { getTheme } from './utils';
type TypeProps = {
  onChange?: Function,
  onClick?: Function,
  onFocus?: Function,
  onBlur?: Function,
  value?: Array<string>,
  disabled?: boolean,
  readOnly?: boolean,
  placeholder?: Array<string>,
  theme?: Object,
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
    const { value, format } = getDerivedForInput(nextProps, preState);
    if (!preState) {
      return {
        value: ['', ''],
      };
    }
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
      onChange && onChange({ newValue: value, oldValue: this.oldValue, number });
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
    console.log('444');
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
    const { theme } = this.props;
    const width = theme && theme.width && theme.width - 15 - 2;
    const InputWidth = width && width / 2;
    return (
      <Theme config={{ [Widget.Input]: { ...theme, width: InputWidth } }}>
        <RangeInputWrap onClick={readOnly || disabled ? '' : this.onHandleClick}>
          <RangeInputInner disabled={disabled}>
            <Input
              prefix={<Icon className="lugia-icon-financial_date" />}
              value={value[0]}
              onChange={this.onChangeFirst}
              placeholder={placeholder[0]}
              {...config}
            />
            <RangeMiddleSpan width={15}>~</RangeMiddleSpan>
            <Input
              value={value[1]}
              onChange={this.onChangeSecond}
              placeholder={placeholder[1]}
              {...config}
            />
          </RangeInputInner>
        </RangeInputWrap>
      </Theme>
    );
  }
}
export default RangeInput;
