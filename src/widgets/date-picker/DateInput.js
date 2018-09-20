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
import { modeStyle } from './getDerived';
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { mode } = nextProps;
    const { isWeek, isMonth, isYear, isWeeks } = modeStyle(mode);
    const normalFormat = isMonth
      ? 'YYYY-MM'
      : isYear
        ? 'YYYY'
        : isWeek || isWeeks
          ? 'YYYY-WW周'
          : 'YYYY-MM-DD';
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

    const newValue =
      (value && isWeeks) || isWeek ? value : value ? moment(value, format).format(format) : '';

    const mod = 'mode' in nextProps ? mode || (preState && preState.mode) : 'date';
    if (!preState) {
      return {
        value: newValue,
        format,
        mode: mod,
        from: 'date',
        changeYear: false,
        choseValue: '',
        isChose: false,
      };
    }
    if (hasValueProps) {
      return {
        value,
        choseValue: (preState && preState.choseValue) || '',
        isChose: (preState && preState.isChose) || false,
      };
    }
  }
  getMode = (obj: string) => {
    const { mode, from, year, month, weeks, date, moments } = obj;

    const { format } = this.state;
    const newDate = moment(date, format)
      .set({ year, month, weeks })
      .format('YYYY-MM-DD');
    this.setState({ mode, from, year, month, newDate, weeks, date }, () => {
      this.picker.current.getFreshPicker({ moments });
    });
  };
  render() {
    const { disabled, readOnly } = this.props;
    const { value, mode, from } = this.state;

    const { isWeeks, isWeek, isMonth, isYear, isDate } = modeStyle(mode);
    const config = {
      ...this.props,
      ref: this.picker,
      newValue: value,
      onChange: this.onChange,
      from,
    };
    return (
      <Trigger
        popup={
          isYear ? (
            <Year {...config} onChange={this.changeYear} />
          ) : isMonth ? (
            <Month {...config} onChange={this.changeMonth} onChangeYear={this.monthChangeYear} />
          ) : isWeek ? (
            <Weeks {...config} onChange={this.changeWeek} onChangeYear={this.weekChangeYear} />
          ) : (
            <Date {...config} getMode={this.getMode} getYearAndMonth={this.getYearAndMonth} />
          )
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
  changeYear = (obj: Object) => {
    const { newValue, mode, from } = obj;
    const { weeks, date } = this.state;
    let { format, value, month } = this.state;
    if (!value) {
      value = moment().format('YYYY-MM-DD');
    }
    if (mode === 'week' || this.props.mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }

    const newDate = moment(date).date();
    const moments = moment().set({ year: newValue, month, weeks, date: newDate });

    const choseValue = moment(date, format).set({ year: newValue });
    this.setState({ year: newValue, mode, moments, choseValue }, () => {
      this.getFreshPicker({ moments, mode, from });
    });

    const { isYear } = modeStyle(this.props.mode);

    if (isYear) {
      this.setState({ value: newValue });
      this.setTreePopupVisible(false);
    }
  };
  changeMonth = (obj: Object) => {
    const { newValue, mode, from } = obj;
    let { format } = this.state;
    let { value, date } = this.state;
    if (!value) {
      value = moment().format('YYYY-MM-DD');
    }
    const { isMonth, isWeeks } = modeStyle(this.props.mode);
    if (mode === 'week' || isWeeks) {
      format = 'YYYY-MM-DD';
    }

    const newDate = moment(date).date();
    const year = moment(newValue, format).year();
    const month = moment(newValue, format).month();
    const moments = moment().set({ date: newDate, year, month });
    const choseValue = moments.format(format);
    this.setState({ month, year, mode: 'date', moments, choseValue }, () => {
      this.getFreshPicker({ moments });
    });
    if (isMonth) {
      this.setState({ value: moment(newValue, format).format(format) });
      this.setTreePopupVisible(false);
    }
  };
  monthChangeYear = (obj: Object) => {
    const { newValue, mode, from } = obj;
    const { format } = this.state;
    const moments = moment(newValue, 'YYYY-MM');
    const year = moments.year();
    const month = moments.month();
    this.setState({ year, month, mode, from, moments }, () => {
      this.getFreshPicker({ moments });
    });
  };
  changeWeek = (obj: Object) => {
    const { newValue, mode, from, year, weeks } = obj;
    const { isWeek, isWeeks, isDate } = modeStyle(this.props.mode);
    const moments = moment(newValue).set({ year, weeks });
    this.setState({ year, mode: 'date', moments, choseValue: '', from: 'week' }, () => {
      if (isWeeks || isDate) {
        this.getChangeValue(newValue);
        this.getFreshPicker({ moments });
      }
      if (isWeek) {
        this.setState({ value: newValue });
        this.setTreePopupVisible(false);
      }
    });
  };
  weekChangeYear = (obj: Object) => {
    const { newValue, mode, from, weeks, year } = obj;
    const moments = moment().set({ year, weeks });
    this.setState({ year, weeks, mode, from, moments }, () => {
      this.getFreshPicker({ moments, mode, from });
    });
  };
  onChange = (param: ChangeEventParam) => {
    const { newValue, choseValue, weeks } = param;
    console.log(choseValue, newValue);
    const moments = moment(moment(choseValue || newValue));
    const year = moments.year();
    const month = moments.month();
    const week = moments.weeks();
    console.log(year, month, week);
    this.setState(
      {
        value: newValue,
        year,
        weeks,
        month,
        changeYear: false,
        moments,
        choseValue,
        isChose: true,
      },
      () => {
        this.getChangeValue(newValue);
        this.getFreshPicker({ moments });
      }
    );

    this.setTreePopupVisible(false);
  };
  onFocus = () => {
    const { value, choseValue } = this.state;
    this.getChangeValue(choseValue || value);
  };
  getChangeValue = (value: string) => {
    let { format, from } = this.state;
    const { mode } = this.props;
    const { isDate } = modeStyle(mode);
    if (isDate && from === 'week') {
      format = 'YYYY-WW';
    }
    const moments = value ? moment(value, format) : moment();
    this.setState({ mode, from: mode }, () => {
      this.getFreshPicker({ moments, mode, from: mode });
    });
  };
  getFreshPicker = (obj: Object) => {
    const { moments } = obj;
    const { choseValue } = this.state;
    const isValid = moments.isValid();
    isValid && this.picker.current.getFreshPicker({ moments, choseValue });
  };
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DateInput;
