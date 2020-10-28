/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Date from '../panel/Date';
import Month from '../panel/Month';
import Year from '../panel/Year';
import Weeks from '../panel/Weeks';
import Time from '../panel/Time';
import { getDerived } from '../utils/getDerived';
import { modeStyle } from '../utils/booleanUtils';
import {
  getWeeksRangeInDates,
  getweekFormatValue,
  getValueFromWeekToDate,
} from '../utils/differUtils';
import moment from 'moment';
type TypeProps = {
  format?: string,
  value: string,
  onChange?: Function,
  onFocus?: Function,
  mode: string,
  model: Object,
  setTriggerVisible?: Function,
  getCurrentYandM?: Function,
  status: string,
  timeValue: string,
  timeChange?: Function,
  index?: number,
  hasTimeWrapBorder?: boolean,
  choseDayIndex?: Array<number>,
  timeIndex?: number,
  valueIsValid?: boolean,
  hasOldValue?: boolean,
  themeProps?: Object,
};
type TypeState = {
  value: string,
  format: string,
  mode: string,
  from: string,
  changeYear: boolean,
  month: number,
  year: number,
  weeks: number,
  date: string,
  newDate: string,
  moments: Object,
  weeksYear: number | string,
  panelValue: string,
  choseDayIndex: Array<number> | number | string,
  timeValue: string,
  panelStates: Object,
};
class SwitchPanel extends Component<TypeProps, TypeState> {
  static displayName = 'SwitchPanel';
  trigger: any;
  picker: any;
  oldValue: string;
  constructor(props: TypeProps) {
    super(props);
    const { model } = props;
    model &&
      model.on('inputOnChange', (data: Object) => {
        const { value } = data;
        this.setState({ value });
      });
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const panelStates = getDerived(nextProps, preState);
    const { format, value, year, month, weeks, choseDayIndex } = panelStates;
    const { timeValue } = nextProps;
    const mode = preState ? preState.mode : nextProps.mode;
    const from = preState ? preState.from : mode;
    const newTimeValue = preState ? preState.value : timeValue;
    return {
      value,
      timeValue: newTimeValue,
      year,
      weeks,
      month,
      format,
      panelStates,
      mode,
      from,
      choseDayIndex,
    };
  }
  getMode = (obj: Object) => {
    const { mode, from } = obj;
    this.setState({ mode, from });
  };
  setTriggerVisible = (open: boolean) => {
    const { setTriggerVisible } = this.props;
    setTriggerVisible && setTriggerVisible(open);
  };
  componentDidMount() {
    const { getCurrentYandM, index } = this.props;
    const { year, month } = this.state;
    getCurrentYandM && getCurrentYandM({ year, month, index });
  }
  render() {
    let { mode, from, format, panelStates, choseDayIndex } = this.state;
    const { status, themeProps } = this.props;
    if (status === 'showTime') {
      mode = 'time';
    }
    const { isWeek, isMonth, isYear, isTime, isTimes } = modeStyle(mode);
    const { value, month, timeValue } = this.state;
    let { year, weeks } = this.state;
    const config = {
      ...this.props,
      format,
      from,
      panelStates,
      value,
      themeProps,
    };
    if (isWeek) {
      const weekObj = getWeeksRangeInDates(moment(value, 'YYYY-MM-DD'));
      year = weekObj.year;
      weeks = weekObj.weeks;
    }
    return isYear ? (
      <Year {...config} year={year} onChange={this.changeYear} />
    ) : isMonth ? (
      <Month
        {...config}
        year={year}
        month={month}
        onChange={this.changeMonth}
        onChangeYear={this.monthChangeYear}
      />
    ) : isWeek ? (
      <Weeks
        {...config}
        year={year}
        weeks={weeks}
        onChange={this.changeWeek}
        onChangeYear={this.weekChangeYear}
      />
    ) : isTime || isTimes ? (
      <Time
        {...config}
        onChange={this.changeTime}
        // theme={theme}
        value={timeValue}
      />
    ) : (
      <Date
        {...config}
        onChange={this.onChange}
        changeHead={this.changeHead}
        getMode={this.getMode}
        setTriggerVisible={this.setTriggerVisible}
        value={value}
        choseDayIndex={this.props.mode === 'range' ? this.props.choseDayIndex : choseDayIndex}
      />
    );
  }
  changeHead = (value: string) => {
    this.setStateFunc({ value });
  };
  changeYear = (obj: Object) => {
    const { year, mode, event } = obj;
    const { format, value } = this.state;
    const { isYear, isWeeks } = modeStyle(this.props.mode);
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    const moments = moment(value, newFormat).set({ year });
    let newValue = moments.format(newFormat);
    if (isYear) {
      this.publicOnchange({ newValue, event, openTriger: false, action: 'click' });
    }
    if (isWeeks) {
      newValue = moment(newValue, newFormat)
        .set({ date: 9 })
        .format(newFormat);
    }
    this.setStateFunc({ value: newValue, year, mode });
  };
  changeMonth = (obj: Object) => {
    const { year, month, mode, event } = obj;
    const { format, value } = this.state;
    const { isMonth, isWeeks } = modeStyle(this.props.mode);
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    const newDate = moment(value).date();
    const maxDate = moment()
      .set({ month })
      .daysInMonth();
    const currentDate = newDate > maxDate ? maxDate : newDate;
    const moments = moment(value, newFormat).set({ date: currentDate, year, month });
    let newValue = moments.format(newFormat);
    if (isMonth) {
      this.publicOnchange({ newValue, openTriger: false, event });
    }
    if (isWeeks) {
      newValue = moment(newValue, newFormat)
        .set({ date: 9 })
        .format(newFormat);
    }
    this.setStateFunc({ month, year, mode, value: newValue });
  };
  monthChangeYear = (obj: Object) => {
    const { mode, from } = obj;
    this.setStateFunc({ mode, from });
  };
  changeWeek = (obj: Object) => {
    const { year, weeks, mode, event } = obj;
    const { format } = this.state;
    const { isWeek, isWeeks } = modeStyle(this.props.mode);
    const newFormat = !(isWeeks || isWeek) ? 'YYYY-WW' : format;
    const newValue = getweekFormatValue(year, weeks, newFormat);
    const value = getValueFromWeekToDate(newValue, newFormat);
    if (isWeek || isWeeks) {
      this.publicOnchange({ newValue, openTriger: false, event, action: 'click' });
    }
    this.setStateFunc({ year, mode, from: 'week', value });
  };
  weekChangeYear = (obj: Object) => {
    const { mode, from } = obj;
    this.setStateFunc({ mode, from });
  };
  onChange = (param: Object) => {
    const { newValue } = param;
    const { isRange, isWeeks } = modeStyle(this.props.mode);
    let newVal = newValue;
    if (isWeeks) {
      const { format } = this.state;
      const { year, weeks } = getWeeksRangeInDates(moment(newValue, 'YYYY-MM-DD'));
      newVal = getweekFormatValue(year, weeks, format);
    }
    !isRange && this.setStateFunc({ value: newValue });
    this.publicOnchange({ ...param, newValue: newVal, openTriger: false });
  };
  publicOnchange = (obj: Object) => {
    const { onChange } = this.props;
    onChange && onChange(obj);
  };
  changeTime = (obj: Object) => {
    const { value } = obj;
    const { timeChange, onChange, timeIndex } = this.props;
    const { mode } = this.state;
    const { isRange } = modeStyle(mode);
    timeChange && timeChange({ ...obj, timeIndex });
    !isRange && onChange && onChange(obj);
    this.setStateFunc({ value });
  };
  setStateFunc = (state: Object) => {
    const { status } = this.props;
    this.setState({ ...state }, () => {
      const { getCurrentYandM, index } = this.props;
      const { year, month } = this.state;
      status !== 'showTime' && getCurrentYandM && getCurrentYandM({ year, month, index });
    });
  };
}
export default SwitchPanel;
