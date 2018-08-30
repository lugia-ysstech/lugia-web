import type { ChangeEventParam } from '@lugia/lugia-web';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import DatePickerInner from './DatePicker';
import Month from './MonthPicker';
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
export default ThemeProvider(
  class DatePicker extends Component {
    constructor(props) {
      super(props);
      this.trigger = React.createRef();
      this.picker = React.createRef();
    }
    static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
      const { mode } = nextProps;
      const normalFormat = mode === 'month' ? 'YYYY-DD' : mode === 'year' ? 'YYYY' : 'YYYY-MM-DD';
      let { defaultValue, format = normalFormat, value } = nextProps;
      const defaultProps = 'defaultValue' in nextProps && moment(defaultValue, format)._isValid;
      const hasValueProps = 'value' in nextProps && moment(value, format)._isValid;

      value = hasValueProps
        ? nextProps.value
        : preState
          ? preState.value
          : defaultProps
            ? defaultValue
            : '';

      value = (value && moment(value, format).format(format)) || '';
      const weeksIndate = value;
      let weeks = '';
      if (mode === 'week') {
        const moments = moment(weeksIndate, format);
        weeks = moments.format('WW');
        value = moments.format('YYYY年') + '-第' + weeks + '周';
      }
      console.log(weeks);
      if (!preState) {
        return {
          value,
          format,
          weeksIndate,
          weeks,
        };
      }
      if (hasValueProps) {
        return { value };
      }
    }
    render() {
      const { disabled, readOnly, mode } = this.props;
      const { value, weeksIndate } = this.state;
      const isWeek = mode === 'week';
      console.log(value);
      return (
        <Trigger
          popup={
            <DatePickerInner
              {...this.props}
              ref={this.picker}
              newValue={isWeek ? weeksIndate : value}
              onChange={this.onChange}
            />
          }
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
            onFocus={this.onFocus}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Trigger>
      );
    }

    onChange = (param: ChangeEventParam) => {
      const { newValue, weeks } = param;
      console.log(weeks);
      this.setState({ value: newValue, weeks }, () => {
        this.getFreshPicker();
      });
      this.setTreePopupVisible(false);
    };
    onFocus = () => {
      this.getFreshPicker();
    };
    getFreshPicker = () => {
      const { format, weeks, weeksIndate } = this.state;
      let { value } = this.state;
      if (weeks) {
        value = weeksIndate;
      }
      if (moment(value, format)._isValid) {
        this.picker.current.getDatePosition(value || moment().format(this.props.format));
      }
    };
    setTreePopupVisible(visible: boolean) {
      if (this.trigger.current && this.trigger.current.getThemeTarget()) {
        this.trigger.current.getThemeTarget().setPopupVisible(visible);
      }
    }
  },
  Widget.DatePicker
);
