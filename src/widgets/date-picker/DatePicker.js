/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import moment from 'moment';
import WeekDays from './week';
// import { getElementPosition } from '../utils';
import {
  DateChild,
  DateHeader,
  DatePanel,
  DateWInner,
  DateWrapper,
  HeaderTop,
  HeaderTopArrow,
  HeaderTopText,
} from './styled';

type TypeProps = {
  defaultValue?: Object,
  value?: Object,
  firstWeekday?: number,
  format?: string,
  lang: string,
  newValue: string,
  onChange: Function,
};
type TypeState = {
  days: Array<Object>,
  weekDay: number,
  today: number,
  currentYear: number,
  currentMonth: number,
  lastDayIndexInMonth: number,
  value: string,
  weekIndex: number,
  choseDate: number,
  format: string,
  choseDayIndex: number,
};

class DatePickerInner extends Component<TypeProps, TypeState> {
  datePanel: any;
  dateChildren: any;
  dateWeeks: any;
  firstDayIndex: Array<number>;
  maxDay: number;
  value: string;
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { defaultValue } = nextProps;
    let { value, format = 'YYYY-MM-DD' } = nextProps;
    const hasDefaultProps = 'defaultValue' in nextProps && moment(defaultValue, format)._isValid;
    const hasValueProps = 'value' in nextProps && moment(value, format)._isValid;
    value = hasValueProps
      ? value
      : preState
        ? preState.value
        : hasDefaultProps
          ? defaultValue
          : moment().format('YYYY-MM-DD');
    const moments = moment(value, format);
    if (!preState) {
      return {
        value,
        days: [],
        weekDay: 0,
        today: moment().date(),
        choseDate: moments.date() || moment().date(),
        currentYear: moments.year() || moment().year(),
        currentMonth: moments.month() || moment().month(),
        weekIndex: 0,
        format,
      };
    }
    return {
      choseDate: moments.date(),
      value,
    };
  }

  getDaysInMonth = (type: string, funName: string) => () => {
    const { currentYear, currentMonth, value, choseDate, format } = this.state;
    let year = moment(value, format).set('year', currentYear);
    if (type === 'year') {
      year = year[funName](1, 'year');
    }
    let moments = year.set('month', currentMonth);
    if (type === 'month') {
      moments = moments[funName](1, 'month');
    }
    this.value = moments.format(format);
    this.setStateFunc(moments, choseDate, value);
  };

  getDates = (moments: Object) => {
    const newMonth = moments.month();
    const newYear = moments.year();
    const weekDay = moments.date(1).weekday();
    const { firstWeekday = 0 } = this.props;
    let weekIndex = weekDay - firstWeekday;
    if (weekIndex < 0) {
      weekIndex = weekIndex + 7;
    }
    const days = [];
    const newMoments = moment(moments);
    const newMoment = newMoments.subtract(weekIndex, 'day');

    days.push(newMoment.date());
    for (let i = 1; i < 42; i++) {
      const nowMoment = moment(newMoment);
      days.push(nowMoment.add(i, 'day').date());
    }

    this.firstDayIndex = [];
    days.forEach((currentVal, index) => {
      currentVal === 1 && this.firstDayIndex.push(index);
    });
    this.maxDay = moments.daysInMonth();
    const lastDayIndexInMonth = weekIndex + moments.daysInMonth() - 1;
    return {
      newMonth,
      newYear,
      days,
      weekDay,
      weekIndex,
      lastDayIndexInMonth,
    };
  };
  onDateChange = (index: number, child: number) => () => {
    const choseDate = child;
    const { weekIndex, format } = this.state;
    const { value } = this;
    const { choseDayIndex, choseValue } = this.getChoseDayIndex(choseDate, weekIndex, index, value);
    const moments = moment(choseValue, format);
    const currentYear = moments.year();
    const currentMonth = moments.month();
    this.setState(
      { value: choseValue, currentYear, currentMonth, choseDate, choseDayIndex },
      () => {
        const { onChange } = this.props;
        onChange && onChange({ newValue: this.state.value });
        this.getDaysInMonth()();
      }
    );
  };
  getChoseDayIndex = (choseDate: number, weekIndex: number, index: number, value: string) => {
    const { format } = this.state;
    const { firstDayIndex, maxDay } = this;
    const first = firstDayIndex[0];
    const second = firstDayIndex[1];
    const moments = moment(value, format);

    if (choseDate > maxDay) {
      choseDate = maxDay;
    }
    let choseDayIndex = choseDate + weekIndex;
    let choseValue = this.getChoseValue(moments, 'add', 0, choseDate);

    if (index < first) {
      choseDayIndex = index + 1;
      choseValue = this.getChoseValue(moments, 'subtract', 1, choseDate);
    }

    if (index >= second) {
      choseDayIndex = weekIndex + choseDate;
      choseValue = this.getChoseValue(moments, 'add', 1, choseDate);
    }
    return {
      choseDayIndex,
      choseValue,
    };
  };
  getChoseValue = (moments: Object, funName: string, number: number, choseDate: number) => {
    const { format } = this.state;
    const newMoments = moment(moments);
    newMoments[funName](number, 'month').set('date', choseDate);
    return newMoments.format(format);
  };
  getDatePosition = (value: string) => {
    const { format } = this.state;
    const moments = moment(value, format);
    const choseDate = moments.date();
    this.setStateFunc(moments, choseDate, value);
  };
  setStateFunc = (moments: Object, choseDate: number, value: string) => {
    const { newMonth, newYear, days, weekDay, weekIndex, lastDayIndexInMonth } = this.getDates(
      moments
    );
    const dateIndex = choseDate + weekIndex;
    const { choseDayIndex } = this.getChoseDayIndex(choseDate, weekIndex, dateIndex, value);
    this.setState({
      days,
      weekDay,
      currentYear: newYear,
      currentMonth: newMonth,
      weekIndex,
      lastDayIndexInMonth,
      value,
      choseDayIndex,
    });
  };
  componentDidMount() {
    this.getDaysInMonth()();
  }

  render() {
    const {
      days,
      currentYear,
      currentMonth,
      today,
      weekIndex,
      lastDayIndexInMonth,
      choseDayIndex,
    } = this.state;
    const todayIndex = today + weekIndex;
    const dateChildren = days.map((currentValue, index) => {
      return (
        <DateChild
          width={300}
          key={index}
          onClick={this.onDateChange(index, currentValue)}
          isToday={todayIndex === index + 1 ? true : false}
          outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
          choseDayIndex={choseDayIndex}
        >
          {currentValue}
        </DateChild>
      );
    });
    const { firstWeekday, lang } = this.props;
    return (
      <DateWrapper width={300}>
        <DateWInner width={300}>
          <DateHeader>
            <HeaderTop>
              <HeaderTopArrow
                position={'left'}
                onClick={this.getDaysInMonth('year', 'subtract')}
                onMouseDown={this.onmousedown}
              >
                <Icon iconClass={'lugia-icon-direction_double_right'} />
              </HeaderTopArrow>
              <HeaderTopArrow
                position={'left'}
                margin={20}
                onClick={this.getDaysInMonth('month', 'subtract')}
              >
                <Icon iconClass={'lugia-icon-direction_Left'} />
              </HeaderTopArrow>
              <HeaderTopText>{currentYear}年</HeaderTopText>
              <HeaderTopText>{currentMonth + 1}月</HeaderTopText>
              <HeaderTopArrow position={'right'} onClick={this.getDaysInMonth('year', 'add')}>
                <Icon iconClass={'lugia-icon-direction_double_left'} />
              </HeaderTopArrow>
              <HeaderTopArrow
                position={'right'}
                margin={20}
                onClick={this.getDaysInMonth('month', 'add')}
              >
                <Icon iconClass={'lugia-icon-direction_right'} />
              </HeaderTopArrow>
            </HeaderTop>
            <WeekDays firstWeekday={firstWeekday} lang={lang} />
          </DateHeader>
          <DatePanel>{dateChildren}</DatePanel>
        </DateWInner>
      </DateWrapper>
    );
  }
}

export default DatePickerInner;
