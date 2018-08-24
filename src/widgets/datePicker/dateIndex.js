import React, { Component } from 'react';
import Icon from '../icon/index';
import moment from 'moment';
import DatePickerInner from './datePicker';
import Trigger from '../trigger/index';
import {
  Date,
  DateInput,
  Icons,
  DateWrapper,
  DateWInner,
  DateHeader,
  HeaderTop,
  HeaderTopText,
  HeaderTopArrow,
  HeaderWeekBox,
  HeaderWeek,
  DatePanel,
  DateChild,
} from './styled';
class DatePicker extends Component {
  constructor() {
    super();
    this.action = 'click';
    this.state = {
      value: 0,
    };
  }
  getValue = (value: string) => {
    this.setState({ value });
  };
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
    return (
      <Trigger
        action={['focus']}
        popup={<DatePickerInner props={this.props} getValue={this.getValue} />}
      >
        <Date>
          <Icons>
            <Icon className="lugia-icon-financial_date" />
          </Icons>
          <DateInput
            readOnly
            value={this.state.value}
            placeholder={'请选择日期'}
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
          />
        </Date>
      </Trigger>
    );
  }
}
export default DatePicker;
