import type { ChangeEventParam } from '@lugia/lugia-web';

import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import Date from './Date';
import Month from './Month';
import Year from './Year';
import Weeks from './Weeks';
import Trigger from '../trigger/index';
import Input from '../input';
import { modeStyle, getDerivedForInput } from './getDerived';
import { RangeInput, RangeSpan } from './styled';
import SwitchPanel from './SwitchPanel';
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { mode } = nextProps;
    const { isWeek, isMonth, isYear, isWeeks } = modeStyle(mode);
    // const normalFormat = isMonth
    //   ? 'YYYY-MM'
    //   : isYear
    //     ? 'YYYY'
    //     : isWeek || isWeeks
    //       ? 'YYYY-WW周'
    //       : 'YYYY-MM-DD';
    // let { defaultValue, format = normalFormat } = nextProps;
    // const defaultProps = 'defaultValue' in nextProps && moment(defaultValue, format)._isValid;
    // const hasValueProps = 'value' in nextProps && moment(value, format)._isValid;
    const { value, format, hasValueProps } = getDerivedForInput(nextProps, preState);
    // value = hasValueProps
    //   ? nextProps.value
    //   : preState
    //     ? preState.value
    //     : defaultProps
    //       ? defaultValue
    //       : '';

    const newValue =
      (value && isWeeks) || isWeek ? value : value ? moment(value, format).format(format) : '';
    if (!preState) {
      return {
        value: newValue,
      };
    }
    if (hasValueProps) {
      return {
        value,
      };
    }
  }
  render() {
    const { disabled, readOnly } = this.props;
    const { value } = this.state;
    return (
      <Trigger
        popup={<SwitchPanel {...this.props} ref={this.picker} onChange={this.onChange} />}
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
          onBlur={this.onBlur}
          disabled={disabled}
          readOnly={readOnly}
        />
      </Trigger>
    );
  }

  onChange = (param: ChangeEventParam) => {
    const { newValue, openTriger } = param;
    this.setState({ value: newValue });
    this.picker.current.getChangeValue(newValue);
    this.picker.current.getFreshPicker({ moments: moment(newValue) });
    this.setTreePopupVisible(openTriger);
  };
  onFocus = () => {
    this.picker.current.onFocus();
  };

  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DateInput;
