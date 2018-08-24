import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Icon from '../icon/index';
import DatePickerInner from './DatePicker';
import Trigger from '../trigger/index';
import Input from '../input';

// value
// 20140707 value
// formate: yyyyMMdd
// state.value === moment('datestr', formate);
// change value moment -> datestr

// displayFormate ： YYYY
// displayValue
// 2014年7月7日
// 2yyy年MM月dd日
// formatter  实际值 -》显示值
// parse  显示值 -> 实际值
class DatePicker extends Component {
  constructor() {
    super();
    this.trigger = React.createRef();

    this.action = 'click';
    this.state = {};
  }

  // getClickWhere=(flag?:boolean) => {
  //  console.log(flag);
  //   if(flag){
  //     this.action='focus';
  //   }else{
  //     this.action='click';
  //   }
  //   console.log(this.action);
  // }
  render() {
    console.log(this.action);
    const { disabled } = this.props;

    const { value } = this.state;
    return (
      <Trigger
        popup={<DatePickerInner props={this.props} value={value} onChange={this.onChange} />}
        align="bottomLeft"
        key="trigger"
        ref={this.trigger}
        action={disabled ? [] : ['click']}
        hideAction={['click']}
      >
        <Input
          prefix={<Icon className="lugia-icon-financial_date" />}
          value={value}
          onChange={this.onChange}
          placeholder={'请选择日期'}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
        />
      </Trigger>
    );
  }

  onChange = (param: ChangeEventParam) => {
    const { newValue } = param;
    this.setState({ value: newValue });
    this.setTreePopupVisible(false);
  };

  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DatePicker;
