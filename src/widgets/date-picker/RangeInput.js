import React, { Component } from 'react';
import moment from 'moment';
import SwitchPanel from './SwitchPanel';
import Input from '../input';
import Icon from '../icon/index';
import { getDerived, modeStyle } from './getDerived';
import { RangeWrap, RangeInnerTop, RangeInputWrap, RangeInputInner, RangeInputTop } from './styled';

class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    //const {value,hasDefaultProps,hasValueProps}=getDerived(nextProps,preState);
    const { value } = nextProps;
    return {
      value: preState ? preState.value : value,
    };
  }
  onChangeFirst = (params: Object) => {
    this.onChange(0, params);
  };
  onChangeSecond = (params: Object) => {
    this.onChange(1, params);
  };
  onChange = (number: number, params) => {
    const { newValue } = params;
    const { value } = this.state;
    value[number] = newValue;
    this.setState(value, () => {
      const { onChange } = this.props;
      onChange && onChange({ newValue: value });
    });
  };
  onHandleClick = () => {
    this.props.onClick(true);
  };
  onFocus = () => {
    //this.props.onClick(true);
  };
  onBlur = () => {
    // this.props.onClick(false);
  };
  render() {
    const { value } = this.props;
    const { disabled, readOnly, placeholder } = this.props;
    return (
      <RangeInputWrap onClick={this.onHandleClick}>
        <RangeInputInner>
          <Input
            prefix={<Icon className="lugia-icon-financial_date" />}
            value={value[0]}
            onChange={this.onChangeFirst}
            placeholder={placeholder[0]}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
            readOnly={readOnly}
          />
          <span>~</span>
          <Input
            // prefix={<Icon className="lugia-icon-financial_date" />}
            value={value[1]}
            onChange={this.onChangeSecond}
            placeholder={placeholder[1]}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
            readOnly={readOnly}
          />
        </RangeInputInner>
      </RangeInputWrap>
    );
  }
}
export default RangeInput;
