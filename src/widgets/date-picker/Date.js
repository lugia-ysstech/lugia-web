/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import WeekDays from './week';
import { getDerived, modeStyle } from './getDerived';
import { getIsSame } from './utils';
import Dates from './DatePanel';
import { DateHeader, DateWrapper, HeaderTop, HeaderTopArrow, HeaderTopText } from './styled';
const moment = require('moment');
type TypeProps = {
  defaultValue?: Object,
  value?: Object,
  firstWeekDay?: number,
  format?: string,
  lang?: string,
  newValue: string,
  onChange: Function,
  mode?: string,
  showToday?: boolean,
  weeks?: number,
  getMode: Function,
  index?: number,
  panelChoseDate?: string,
  panelIndex?: number,
  prePanelIndex?: number,
  hasValue?: boolean,
  rangeValue?: Array<string>,
  isFollow?: boolean,
  differAmonth?: boolean,
  differAyear?: boolean,
  theme?: Object,
};
type TypeState = {
  days: Array<Object>,
  dates: Array<string>,
  weekDay: number,
  firstWeekDay: number,
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
  startInWeeks: number,
  endInWeeks: number,
  weekHoverStart?: number,
  weekHoverEnd?: number,
  currentNodeIndex: number,
  currentNodeValue: number,
  index: number,
};

class Date extends Component<TypeProps, TypeState> {
  datePanel: any;
  dateChildren: any;
  dateWeeks: any;
  firstDayIndex: Array<number>;
  maxDay: number;
  value: string;
  weeksRange: number;
  choseDate: number;
  changeValue: string;
  choseWeeks: number;
  choseYear: number;
  isChangeMonth: boolean;
  DatesPicker: any;
  constructor() {
    super();
    this.changeValue = moment().format('YYYY-MM-DD');
    this.DatesPicker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, today, todayDate, noToday, moments, format, weeks, firstWeekDay } = getDerived(
      nextProps,
      preState
    );
    if (!preState) {
      return {
        value,
        days: [],
        weekDay: 0,
        today,
        todayDate,
        noToday,
        choseDate: moments.date() || moment().date(),
        currentYear: moments.year() || moment().year(),
        currentMonth: moments.month() || moment().month(),
        weekIndex: 0,
        format,
        weeks,
        firstWeekDay,
        choseDayIndex: '',
        currentNodeIndex: 0,
        currentNodeValue: '',
      };
    }

    return {
      choseDate: moments.date(),
      value,
    };
  }
  getDaysInMonth = (type?: string, funName?: string) => () => {
    const { currentYear, currentMonth, value } = this.state;
    let { format } = this.state;
    const { mode } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    if (isWeeks) {
      format = 'YYYY-MM-DD';
    }
    let year = moment(value, format).set('year', currentYear);
    if (type === 'year') {
      year = year[funName](1, 'year');
    }

    let moments = year.set('month', currentMonth);
    if (type === 'month') {
      moments = moments[funName](1, 'month');
    }
    this.value = moments.format(format);

    this.setStateFunc('changeHead', moments, this.choseDate, value);
    if (isWeeks) {
      const { firstWeekDay } = this.state;
      const momen = moment(this.value);
      this.changeValue = this.value;
      const { weekIndex } = this.getWeekIndex(momen, firstWeekDay);
      this.setState({ weekIndex }, () => {
        this.getWeeksSandEFromValue(this.value);
      });
    }
    if (isRange) {
      const { setTriggerVisible } = this.props;
      setTriggerVisible && setTriggerVisible(true);
    }
  };
  getWeekIndex = (moments: Object, firstWeekDay: number) => {
    const weekDay = moments.date(1).weekday();
    let weekIndex = weekDay - firstWeekDay;
    if (weekIndex < 0) {
      weekIndex = weekIndex + 7;
    }
    return { weekIndex };
  };
  getDates = (moments: Object) => {
    const newMonth = moments.month();
    const newYear = moments.year();
    const weekDay = moments.date(1).weekday();
    const { firstWeekDay } = this.state;
    const { weekIndex } = this.getWeekIndex(moments, firstWeekDay);
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
  onDateChange = (index: number, child: number, inRange: boolean) => {
    const {
      choseValue,
      currentYear,
      currentMonth,
      choseDate,
      choseDayIndex,
    } = this.DatesPicker.current.getYandM(index, child);
    const { mode } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    this.value = choseValue;
    const { onChange } = this.props;
    if (isRange && !inRange) {
      onChange && onChange({ newValue: choseValue, choseValue, inRange });
      return;
    }
    this.setState(
      {
        value: choseValue,
        currentYear,
        currentMonth,
        choseDate,
        choseDayIndex,
      },
      () => {
        const { onChange } = this.props;
        if (isRange) {
          const rangeValue = [choseValue, ''];
          this.DatesPicker.current.getIndexInRange(rangeValue);
        }
        if (isWeeks) {
          this.value = choseValue;
          this.getWeeksRangeInDates(choseValue);
        } else {
          onChange && onChange({ newValue: choseValue, choseValue, inRange });
        }
      }
    );
  };
  getFreshPicker = (obj: Object) => {
    const { moments, choseValue } = obj;
    let { format } = this.state;
    const { mode } = this.props;
    const { isWeeks, isDate, isRange } = modeStyle(mode);
    if (isWeeks || isDate) {
      format = 'YYYY-MM-DD';
    }
    const { firstWeekDay } = this.state;
    let newVal = moments.format(format);
    const value = choseValue || newVal;

    let newMoments = moment(value, format);

    this.value = value;

    const choseDate = newMoments.format('DD');
    this.choseDate = Number(choseDate);

    if (isWeeks) {
      const { month, weeks } = this.getWeeksFromValue(value);
      const { year } = obj;
      if (!choseValue) {
        const momen = moment(moments);
        const val = momen.endOf('week').format(format);

        newVal = moment(val)
          .subtract(firstWeekDay, 'day')
          .format(format);
        this.value = newVal;

        if (firstWeekDay < 6) {
          this.value = moment(value)
            .add(firstWeekDay, 'day')
            .format(format);
        }
        this.choseDate = moment(this.value).date();
        const currentMonth = moment(this.value).month();
        if ((month === 11 && weeks === 1) || (currentMonth === 11 && month === 0 && weeks === 1)) {
          this.choseDate = 1;
          this.value = moment()
            .set({ year, month: 0, date: 1 })
            .format(format);
          newMoments = moment(this.value);
        }
      }
      const { weekIndex } = this.getWeekIndex(newMoments, firstWeekDay);
      this.setState({ weekIndex }, () => {
        this.freshWeekState(year, weeks);
      });
    }
    this.changeValue = this.value;
    if (isRange) {
      this.value = newVal;
      newMoments = moments;
      const { rangeValue, hasValue } = this.props;
      const { index } = this.state;
      const { isSameYandM, year, month } = getIsSame(rangeValue, format);
      const hasRangeValue = rangeValue[0] !== '' && rangeValue[1] !== '';
      if (hasValue && isSameYandM) {
        if (index === 1) {
          newMoments = moment()
            .set({ year, month })
            .add('1', 'month');
        }
      }
      if (index === 1 && !hasRangeValue && this.isChangeMonth) {
        this.isChangeMonth = false;
      }
    }
    this.setStateFunc('fresh', newMoments, this.choseDate, this.value);
  };
  setStateFunc = (funGoal: string, moments: Object, choseDate: number, value: string) => {
    const { newMonth, newYear, days, weekDay, weekIndex, lastDayIndexInMonth } = this.getDates(
      moments
    );

    const dateIndex = choseDate + weekIndex;
    const { choseDayIndex } = this.DatesPicker.current.getChoseDayIndex(
      funGoal,
      choseDate,
      weekIndex,
      dateIndex,
      value
    );
    //  this.DatesPicker.current.getYandM(index, child);
    console.log(funGoal, choseDate, weekIndex, dateIndex, value);
    this.setState(
      {
        days,
        weekDay,
        currentYear: newYear,
        currentMonth: newMonth,
        weekIndex,
        lastDayIndexInMonth,
        value,
        choseDayIndex: dateIndex,
      },
      () => {
        const { mode } = this.props;
        const { isRange } = modeStyle(mode);
        if (isRange) {
          const { getCurrentYandM, index } = this.props;
          getCurrentYandM &&
            getCurrentYandM({ currentYear: newYear, currentMonth: newMonth, index });

          const dates = [];
          days.forEach((item, index) => {
            const { choseValue } = this.DatesPicker.current.getYandM(index, item, value);
            dates.push(choseValue);
          });
          this.setState({ dates }, () => {
            const { rangeValue } = this.props;
            this.DatesPicker.current.getIndexInRange(rangeValue);
          });
        }
      }
    );
  };
  onChangeYear = () => {
    this.getMode('year', 'date');
  };
  onChangeMonth = () => {
    this.getMode('month', 'date');
  };
  onChangeWeek = () => {
    this.getMode('week', 'date');
  };
  getMode = (mode: string, from: string) => {
    const { currentYear, currentMonth } = this.state;
    let { format } = this.state;

    if (this.props.mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    const { changeValue } = this;
    const moments = moment(changeValue, format);
    const year = currentYear || moments.year();
    const month = currentMonth || moments.month();
    const weeks = moments.weeks();
    const { getMode } = this.props;
    getMode && getMode({ mode, from, year, month, weeks, date: changeValue, moments });
  };
  getWeeksFromValue = (value: string) => {
    const { mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    let { format } = this.state;
    if (isWeeks) {
      format = 'YYYY-MM-DD';
    }
    const moments = moment(value, format);
    const year = moments.year();
    const month = moments.month();
    const weeks = moments.weeks();
    return {
      year,
      month,
      weeks,
    };
  };
  getNormalWeekValues = (year: number, weeks: number) => {
    const moments = moment().set({ year, weeks });
    const format = 'YYYY-MM-DD';
    const endValue = moments.endOf('week').format(format);
    const startValue = moments.startOf('week').format(format);
    return {
      startValue,
      endValue,
    };
  };
  getWeeksForFirstWeekDay = (startValue: string, endValue: string, firstWeekDay: number) => {
    const format = 'YYYY-MM-DD';
    const { isFollow = true } = this.props;
    const newStartValue = !isFollow
      ? startValue
      : moment(startValue)
          .add(firstWeekDay, 'day')
          .format(format);
    const newEndValue = !isFollow
      ? endValue
      : moment(endValue)
          .add(firstWeekDay, 'day')
          .format(format);

    return {
      newStartValue,
      newEndValue,
    };
  };
  getWeeksSandEFromValue = (value: string) => {
    const { year, weeks } = this.getWeeksFromValue(value);
    this.freshWeekState(year, weeks);
  };

  getDatesfromWeeks = (
    year: number,
    weeks: number,
    index?: number,
    child?: number,
    choseValue?: string
  ) => {
    const { weekIndex } = this.state;
    const { firstWeekDay } = this.state;
    let { startValue, endValue } = this.getNormalWeekValues(year, weeks);
    let { newStartValue, newEndValue } = this.getWeeksForFirstWeekDay(
      startValue,
      endValue,
      firstWeekDay
    );

    const currentValue = choseValue || this.value;

    const startUnix = moment(newStartValue).valueOf();
    const endUnix = moment(newEndValue).valueOf();
    const currentUnix = moment(currentValue).valueOf();

    let newWeeks = weeks;
    if (currentUnix < startUnix) {
      newWeeks = weeks - 1;
    }
    if (currentUnix > endUnix) {
      newWeeks = weeks + 1;
    }

    startValue = this.getNormalWeekValues(year, newWeeks).startValue;
    endValue = this.getNormalWeekValues(year, newWeeks).endValue;
    newStartValue = this.getWeeksForFirstWeekDay(startValue, endValue, firstWeekDay).newStartValue;
    newEndValue = this.getWeeksForFirstWeekDay(startValue, endValue, firstWeekDay).newEndValue;

    const currentDate = moment(currentValue).date();
    const currentIndex = currentDate + weekIndex;

    const { choseDayIndex } = this.DatesPicker.current.getYandM(currentIndex, currentDate);
    const currentDateIndex = index + 1 || choseDayIndex;

    const mS = moment(newStartValue);
    const mE = moment(newEndValue);
    const mC = moment(currentValue);
    const currentToWeekStart = mC.diff(mS, 'days');
    const currentToWeekEnd = mE.diff(mC, 'days');
    const startInWeeks = currentDateIndex - currentToWeekStart - 1;
    const endInWeeks = currentDateIndex + currentToWeekEnd;
    return {
      endInWeeks,
      startInWeeks,
      currentDateIndex,
    };
  };
  freshWeekState = (year: number, weeks: number) => {
    const { startInWeeks, endInWeeks } = this.getDatesfromWeeks(year, weeks);
    this.setState({ startInWeeks, endInWeeks });
  };
  getWeeksRangeInDates = (value: string) => {
    const { firstWeekDay } = this.state;
    let newVal = value;
    if (firstWeekDay < 6) {
      newVal = moment(value)
        .subtract(firstWeekDay, 'day')
        .format('YYYY-MM-DD');
    } else {
      newVal = moment(value)
        .add(1, 'day')
        .format('YYYY-MM-DD');
    }
    const { format } = this.state;
    this.value = newVal;
    const moments = moment(newVal);
    const month = moments.month();
    const weeks = moments.weeks();
    let year = moments.year();
    if (month === 11 && weeks === 1) {
      year = year + 1;
    }
    this.choseWeeks = weeks;
    this.choseYear = year;
    const newValue = moment()
      .set({ year, week: weeks })
      .format(format);
    const { onChange } = this.props;
    onChange && onChange({ newValue, choseValue: value, weeks, year, action: 'click' });
  };
  getweeksFormatValue = (year: number, weeks: number) => {
    const { format } = this.state;
    let yearmark = '';
    let weekmark = '';
    for (let i = 0; i < format.length; i++) {
      if (format[i] === 'Y' || format[i] === 'y') {
        yearmark += format[i];
      }
      if (format[i] === 'W' || format[i] === 'w') {
        weekmark += format[i];
      }
    }
    const newYear = moment()
      .set({ year })
      .format(yearmark);
    const getCover = (digit: number) => {
      let covers = '';
      for (let i = digit; i < weekmark.length; i++) {
        covers += '0';
      }
      return covers;
    };
    const SingleNumberCover = getCover(1);
    const doubleNumberCover = getCover(2);
    const WeeksStr = weeks.toString();
    const { length } = WeeksStr;
    const newWeeks = length === 1 ? SingleNumberCover + weeks : doubleNumberCover + weeks;
    const repalceYear = format.replace(yearmark, newYear);
    const newValue = repalceYear.replace(weekmark, newWeeks);
    return newValue;
  };
  onMouseOver = (index: number, child: number) => {
    const { mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    const { choseValue } = this.DatesPicker.current.getYandM(index, child);
    if (isWeeks) {
      const moments = moment(moment(choseValue));

      let year = moments.year();
      const weeks = moments.weeks();
      const month = moments.month();

      if (month === 11 && weeks === 1) {
        year = year + 1;
      }
      const { endInWeeks, startInWeeks } = this.getDatesfromWeeks(
        year,
        weeks,
        index,
        child,
        choseValue
      );
      this.setState({
        weekHoverStart: startInWeeks,
        weekHoverEnd: endInWeeks,
      });
    }
  };
  onMouseOut = () => {
    this.setState({
      weekHoverStart: '',
      weekHoverEnd: '',
    });
  };

  componentDidMount() {
    this.getDaysInMonth()();
    const { mode } = this.props;
    const { isRange } = modeStyle(mode);
    if (isRange) {
      this.isChangeMonth = true;
    }
  }

  render() {
    const { currentYear, currentMonth } = this.state;
    const { firstWeekDay } = this.state;
    const { lang, mode } = this.props;
    const { index, differAmonth, differAyear, theme } = this.props;
    console.log(this.state.value);
    return (
      <DateWrapper {...theme} mode={mode}>
        <div>
          <DateHeader>
            <HeaderTop {...theme}>
              {differAyear && index === 1 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'left'}
                  {...theme}
                  onClick={this.getDaysInMonth('year', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_double_right'} />
                </HeaderTopArrow>
              )}
              {differAmonth && index === 1 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'left'}
                  {...theme}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_Left'} />
                </HeaderTopArrow>
              )}

              <HeaderTopText {...theme} onClick={this.onChangeYear}>
                {currentYear}年
              </HeaderTopText>
              <HeaderTopText {...theme} onClick={this.onChangeMonth}>
                {currentMonth + 1}月
              </HeaderTopText>
              {differAyear && index === 0 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'right'}
                  {...theme}
                  onClick={this.getDaysInMonth('year', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_double_left'} />
                </HeaderTopArrow>
              )}
              {differAmonth && index === 0 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'right'}
                  {...theme}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_right'} />
                </HeaderTopArrow>
              )}
            </HeaderTop>
            <WeekDays
              firstWeekDay={firstWeekDay}
              lang={lang}
              onChangeWeek={this.onChangeWeek}
              {...theme}
              mode={this.props.mode}
            />
          </DateHeader>
          <Dates
            {...this.props}
            {...this.state}
            {...theme}
            firstDayIndex={this.firstDayIndex}
            maxDay={this.maxDay}
            val={this.value}
            onDateChange={this.onDateChange}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            ref={this.DatesPicker}
          />
        </div>
      </DateWrapper>
    );
  }
}

export default Date;
