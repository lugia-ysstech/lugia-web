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
  OtherChild,
  OtherChildText,
} from './styled';

type TypeProps = {
  defaultValue?: Object,
  value?: Object,
  firstWeekday?: number,
  format?: string,
  lang: string,
  newValue: string,
  onChange: Function,
  mode?: string,
  showToday?: boolean,
  weeks?: number,
};
type TypeState = {
  days: Array<Object>,
  weekDay: number,
  today: number,
  noToday: boolean,
  currentYear: number,
  currentMonth: number,
  lastDayIndexInMonth: number,
  value: string,
  weekIndex: number,
  choseDate: number,
  format: string,
  choseDayIndex: number,
  mode: string,
};

class DatePickerInner extends Component<TypeProps, TypeState> {
  datePanel: any;
  dateChildren: any;
  dateWeeks: any;
  firstDayIndex: Array<number>;
  maxDay: number;
  value: string;
  weeksRange: number;
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { defaultValue, mode, showToday } = nextProps;
    const normalFormat = mode === 'month' ? 'YYYY-DD' : mode === 'year' ? 'YYYY' : 'YYYY-MM-DD';
    let { value, format = normalFormat, weeks = 1 } = nextProps;

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
    let today = moment().date();
    const max = moments.daysInMonth();
    let noToday = false;
    if (today > max) {
      today = max;
      noToday = true;
    }
    if (!preState) {
      return {
        value,
        days: [],
        weekDay: 0,
        today,
        noToday,
        choseDate: moments.date() || moment().date(),
        currentYear: moments.year() || moment().year(),
        currentMonth: moments.month() || moment().month(),
        weekIndex: 0,
        format,
        mode,
        weeks,
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
        onChange && onChange({ newValue: choseValue });
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
  getChildIndex = (choseValue: number) => () => {
    const { onChange, mode } = this.props;
    const { currentYear, currentMonth, value, format, choseDate } = this.state;

    const { isMonth, isYear, isWeek, isWeeks, yOrM } = this.getMode(this.state.mode);
    const date = isMonth
      ? { year: currentYear, month: choseValue }
      : { year: choseValue, month: currentMonth };

    let newValue = moment()
      .set(date)
      .format(format);
    const modeType = isYear ? 'month' : isWeek ? 'weeks' : '';
    if (!mode) {
      const setType = isMonth ? 'month' : 'year';
      const moments = moment(value, format).set(setType, choseValue);
      newValue = moments.format(format);
      this.value = newValue;
      this.setState({ mode: modeType });
      this.getDatePosition(newValue);
    }
    if (mode) {
      if (isYear && mode !== 'year') {
        this.setState({ mode: 'month', currentYear: choseValue });
        if (mode === 'week') {
          this.setState({ mode: 'week', currentYear: choseValue });
        }
      } else if (isWeek) {
        this.setState({ mode: 'weeks' });
        this.weeksDate = choseValue;
      } else {
        const data = { newValue };
        if (isWeeks) {
          data.weeks = choseValue.weeks;
        }
        onChange && onChange(data);
        this.setState({ value: newValue });
      }
    }
  };
  onChangeMonth = () => {
    this.changeMode('month');
  };
  onChangeYear = () => {
    this.changeMode('year');
  };
  changeMode = (type: string) => {
    const { mode } = this.state;
    this.setState({ mode: type });
  };
  getMode = (mode: string) => {
    const isMonth = mode === 'month';
    const isYear = mode === 'year';
    const isWeek = mode === 'week';
    const isWeeks = mode === 'weeks';
    const yOrM = isMonth || isYear || isWeek || isWeeks;
    return {
      isMonth,
      isYear,
      isWeek,
      isWeeks,
      yOrM,
    };
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
      noToday,
      weekIndex,
      lastDayIndexInMonth,
      choseDayIndex,
      mode,
      value,
      format,
      weeks,
    } = this.state;
    const { showToday } = this.props;
    const todayIndex = today + weekIndex;
    const dateChildren = days.map((currentValue, index) => {
      return (
        <DateChild
          width={300}
          key={index}
          onClick={this.onDateChange(index, currentValue)}
          isToday={showToday && todayIndex === index + 1 ? true : false}
          noToday={noToday}
          outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
          choseDayIndex={choseDayIndex}
        >
          {currentValue}
        </DateChild>
      );
    });
    const { firstWeekday, lang } = this.props;
    const { isMonth, isYear, isWeek, isWeeks, yOrM } = this.getMode(mode);
    let months = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ];
    if (lang === 'en') {
      months = moment.monthsShort();
    }

    const nextYear = moment()
      .set('year', currentYear)
      .add(-1, 'year');
    const years = [];
    for (let i = 0; i < 12; i++) {
      const moments = moment(nextYear);
      const year = moments.add(i, 'year');
      years.push(year.year());
    }

    const weeksDate = [];
    const currentWeeks = moment(currentYear, format).weeksInYear();
    for (let i = 0; i < 5; i++) {
      const start = 12 * i + 1;
      const end = i === 4 ? currentWeeks : 12 * i + 12;
      const value = `${start}-${end}周`;

      if (weeks >= start && weeks <= end) {
        this.weeksRange = i;
      }
      weeksDate.push({ value, start, end, index: i });
    }

    const weeksInner = [];
    if (isWeeks) {
      const { start, end, index } = this.weeksDate;
      if (weeks >= start && weeks <= end) {
        this.weeksRange = index;
      }

      for (let i = 0; i < 12; i++) {
        weeksInner.push({ text: `第${start + i}周`, weeks: start + i });
      }
    }

    const yOrMchildren = isYear ? years : isMonth ? months : isWeek ? weeksDate : weeksInner;

    const monthChildren = yOrMchildren.map((current, i) => {
      const year = moment(value, format).year();
      const currentValue = isMonth
        ? currentMonth
        : isWeek
          ? this.weeksRange
          : isWeeks
            ? weeks
            : year;
      const compareValue = isMonth || isWeek ? i : isWeeks ? current.weeks : current;
      const showValue = isMonth ? i : current;
      const text = isWeek ? current.value : isWeeks ? current.text : current;

      return (
        <OtherChild onClick={this.getChildIndex(showValue)} key={i}>
          <OtherChildText isChose={currentValue === compareValue}>{text}</OtherChildText>
        </OtherChild>
      );
    });

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
                <Icon
                  iconClass={
                    yOrM ? 'lugia-icon-direction_Left' : 'lugia-icon-direction_double_right'
                  }
                />
              </HeaderTopArrow>
              {yOrM ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'left'}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_Left'} />
                </HeaderTopArrow>
              )}

              <HeaderTopText onClick={this.onChangeYear}>{currentYear}年</HeaderTopText>
              {yOrM ? (
                ''
              ) : (
                <HeaderTopText onClick={this.onChangeMonth}>{currentMonth + 1}月</HeaderTopText>
              )}
              <HeaderTopArrow position={'right'} onClick={this.getDaysInMonth('year', 'add')}>
                <Icon
                  iconClass={
                    yOrM ? 'lugia-icon-direction_right' : 'lugia-icon-direction_double_left'
                  }
                />
              </HeaderTopArrow>
              {yOrM ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'right'}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_right'} />
                </HeaderTopArrow>
              )}
            </HeaderTop>
            {yOrM ? '' : <WeekDays firstWeekday={firstWeekday} lang={lang} />}
          </DateHeader>
          <DatePanel>{yOrM ? monthChildren : dateChildren}</DatePanel>
        </DateWInner>
      </DateWrapper>
    );
  }
}

export default DatePickerInner;
