import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import DatePickerInner from './DatePicker';
import Trigger from '../trigger/index';
import Input from '../input';
import { isMoment } from 'moment';

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
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    let { defaultValue, format = 'YYYY-MM-DD', value } = nextProps;
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

    if (!preState) {
      return {
        value,
        format,
      };
    }
    if (hasValueProps) {
      return { value };
    }
  }
  render() {
    const { disabled, readOnly } = this.props;
    const { value } = this.state;
    return (
      <Trigger
        popup={
          <DatePickerInner
            {...this.props}
            ref={this.picker}
            newValue={value}
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
    const { newValue } = param;
    const { format } = this.state;
    this.setState({ value: newValue }, () => {
      const { value } = this.state;
      if (moment(value, format)._isValid) {
        this.picker.current.getDatePosition(value || moment().format(format));
      }
    });
    this.setTreePopupVisible(false);
  };
  onFocus = () => {
    const { value, format } = this.state;
    if (moment(value, format)._isValid) {
      this.picker.current.getDatePosition(value || moment().format(this.props.format));
    }
  };
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DatePicker;
