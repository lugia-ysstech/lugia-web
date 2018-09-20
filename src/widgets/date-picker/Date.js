/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import moment from 'moment';
import WeekDays from './week';
import { getDerived, modeStyle } from './getDerived';
// import { getElementPosition } from '../utils';
import {
  DateChild,
  DateChildWrap,
  DateChildInner,
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
  firstWeekDay?: number,
  format?: string,
  lang: string,
  newValue: string,
  onChange: Function,
  mode?: string,
  showToday?: boolean,
  weeks?: number,
  getMode: Function,
};
type TypeState = {
  days: Array<Object>,
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
  weekHoverStart: number,
  weekHoverEnd: number,
};

class Date extends Component<TypeProps, TypeState> {
  datePanel: any;
  dateChildren: any;
  dateWeeks: any;
  firstDayIndex: Array<number>;
  maxDay: number;
  value: string;
  weeksRange: number;
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, today, noToday, moments, format, weeks, firstWeekDay } = getDerived(
      nextProps,
      preState
    );

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
        weeks,
        firstWeekDay,
      };
    }

    return {
      choseDate: moments.date(),
      value,
    };
  }

  getDaysInMonth = (type: string, funName: string) => () => {
    const { currentYear, currentMonth, value, choseDate } = this.state;
    let { format } = this.state;
    const { mode } = this.props;
    const { isWeeks } = modeStyle(mode);
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
  onDateChange = (index: number, child: number) => () => {
    const { choseValue, currentYear, currentMonth, choseDate, choseDayIndex } = this.getYandM(
      index,
      child
    );

    this.setState(
      { value: choseValue, currentYear, currentMonth, choseDate, choseDayIndex },
      () => {
        const { onChange, mode } = this.props; // 2018-08-28
        this.getDaysInMonth()();
        if (mode === 'weeks') {
          this.value = choseValue;
          this.getWeeksRangeInDates(choseValue);
        } else {
          onChange && onChange({ newValue: choseValue, choseValue });
        }
      }
    );
  };
  getYandM = (index: number, child: number) => {
    const choseDate = child;
    const { weekIndex, format } = this.state;
    const { value } = this;

    const { choseDayIndex, choseValue } = this.getChoseDayIndex(
      'getNode',
      choseDate,
      weekIndex,
      index,
      value
    );
    const moments = moment(choseValue, format);
    const currentYear = moments.year();
    const currentMonth = moments.month();
    return {
      choseValue,
      currentYear,
      currentMonth,
      choseDate,
      choseDayIndex,
    };
  };
  getChoseDayIndex = (
    funGoal,
    choseDate: number,
    weekIndex: number,
    index: number,
    value: string
  ) => {
    let { format } = this.state;
    const { mode } = this.props;
    if (mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    const { firstDayIndex, maxDay } = this;
    const first = firstDayIndex[0];
    const second = firstDayIndex[1];
    const moments = moment(value, format);
    if (funGoal === 'changeHead' && choseDate > maxDay) {
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
    let { format } = this.state;
    const newMoments = moment(moments);
    newMoments[funName](number, 'month').set('date', choseDate);
    const { mode } = this.props;
    if (mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    return newMoments.format(format);
  };
  getFreshPicker = (obj: Object) => {
    this.isCanChange = true;

    const { moments, choseValue } = obj;
    let { format } = this.state;

    const { mode } = this.props;
    if (mode === 'weeks' || mode === 'date') {
      format = 'YYYY-MM-DD';
    }
    const { firstWeekDay } = this.state;
    let newVal = moments.format(format);
    const value = choseValue || newVal;

    let newMoments = moment(value, format);

    this.value = value;

    const choseDate = newMoments.format('DD');
    this.choseDate = Number(choseDate);

    if (mode === 'weeks') {
      const { choseYear, choseWeeks } = this;

      let { year, month, weeks } = this.getWeeksFromValue(value);
      if (choseValue && month === 11 && weeks === 1) {
        weeks =
          moment()
            .set({ year })
            .weeksInYear() + 1;
      }
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
          year = year + 1;
          this.choseDate = 1;
          this.value = moment()
            .set({ year, month: 0, date: 1 })
            .format(format);
          newMoments = moment(this.value);
        }
      }
      // year = choseYear ||  year;
      // weeks = choseWeeks ||  weeks;

      const { weekIndex } = this.getWeekIndex(newMoments, firstWeekDay);

      this.setState({ weekIndex }, () => {
        this.freshWeekState(year, weeks);
      });
    }
    this.changeValue = this.value;

    this.setStateFunc('fresh', newMoments, this.choseDate, this.value);
  };
  setStateFunc = (funGoal: string, moments: Object, choseDate: number, value: string) => {
    const { newMonth, newYear, days, weekDay, weekIndex, lastDayIndexInMonth } = this.getDates(
      moments
    );
    const dateIndex = choseDate + weekIndex;
    const { choseDayIndex } = this.getChoseDayIndex(
      funGoal,
      choseDate,
      weekIndex,
      dateIndex,
      value
    );

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
    const { currentYear, currentMonth, value } = this.state;
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
    const moments = moment(value);
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

    console.log('范围值', newStartValue, newEndValue, currentValue, weeks);

    const currentDate = moment(currentValue).date();
    const currentIndex = currentDate + weekIndex;

    const { choseDayIndex } = this.getYandM(currentIndex, currentDate);
    const currentDateIndex = index + 1 || choseDayIndex;

    const mS = moment(newStartValue);
    const mE = moment(newEndValue);
    const mC = moment(currentValue);
    let cfS = mC.from(mS, true);
    let cfE = mE.from(mC, true);
    if (cfS === 'a few seconds') {
      cfS = 0;
    }
    if (cfE === 'a few seconds') {
      cfE = 0;
    }
    if (cfS === 'a day') {
      cfS = 1;
    }
    if (cfE === 'a day') {
      cfE = 1;
    }
    cfS = parseInt(cfS);
    cfE = parseInt(cfE);

    const startInWeeks = currentDateIndex - cfS - 1;
    const endInWeeks = currentDateIndex + cfE;

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
    this.value = newVal;

    const moments = moment(newVal);
    const month = moments.month();

    let weeks = moments.weeks();

    let year = moments.year();
    const mo = moment(value).month();
    const ye = moment(value).year();
    if (mo === 11 && weeks === 1) {
      weeks =
        moment()
          .set({ ye })
          .weeksInYear() + 1;
      if (firstWeekDay === 6) {
        year = ye;
      }
    }
    if (mo === 0 && month === 11 && weeks === 1) {
      year = year + 1;
    }

    this.choseWeeks = weeks;
    this.choseYear = year;

    const newValue = year + '-' + weeks + '周';
    const { onChange } = this.props;
    onChange && onChange({ newValue, choseValue: value, weeks });
  };
  onMouseOver = (index: number, child: number) => () => {
    const { format } = this.state;
    const { choseValue } = this.getYandM(index, child);
    const { firstWeekDay } = this.state;
    const moments = moment(moment(choseValue));

    let year = moments.year();
    const weeks = moments.weeks();
    const month = moments.month();

    if (month === 11 && weeks === 1) {
      year = year + 1;
    }

    const start = moments.startOf('week').format('YYYY-MM-DD');
    const end = moments.endOf('week').format('YYYY-MM-DD');

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
  };
  onMouseOut = () => {
    this.setState({
      weekHoverStart: '',
      weekHoverEnd: '',
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
      noToday,
      weekIndex,
      lastDayIndexInMonth,
      choseDayIndex,
      startInWeeks,
      endInWeeks,
      weekHoverStart,
      weekHoverEnd,
    } = this.state;
    const { showToday, mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    const todayIndex = today + weekIndex;

    const dateChildren = days.map((currentValue, index) => {
      return (
        <DateChild
          width={300}
          choseDayIndex={choseDayIndex}
          isChooseWeek={index >= startInWeeks && index < endInWeeks && mode === 'weeks'}
          isHoverWeek={index >= weekHoverStart && index < weekHoverEnd && mode === 'weeks'}
          startInWeeks={startInWeeks}
          endInWeeks={endInWeeks}
          weekHoverStart={weekHoverStart}
          weekHoverEnd={weekHoverEnd}
          onMouseOver={isWeeks ? this.onMouseOver(index, currentValue) : ''}
          onMouseOut={isWeeks ? this.onMouseOut : ''}
        >
          <DateChildInner
            width={300}
            key={index}
            onClick={this.onDateChange(index, currentValue)}
            isToday={showToday && todayIndex === index + 1 ? true : false}
            noToday={noToday}
            outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
            choseDayIndex={choseDayIndex}
          >
            {' '}
            {currentValue}
          </DateChildInner>
        </DateChild>
      );
    });
    const { firstWeekDay, lang } = this.state;
    return (
      <DateWrapper width={300}>
        <DateWInner width={300}>
          <DateHeader>
            <HeaderTop>
              <HeaderTopArrow position={'left'} onClick={this.getDaysInMonth('year', 'subtract')}>
                <Icon iconClass={'lugia-icon-direction_double_right'} />
              </HeaderTopArrow>
              <HeaderTopArrow
                position={'left'}
                margin={20}
                onClick={this.getDaysInMonth('month', 'subtract')}
              >
                <Icon iconClass={'lugia-icon-direction_Left'} />
              </HeaderTopArrow>
              <HeaderTopText onClick={this.onChangeYear}>{currentYear}年</HeaderTopText>
              <HeaderTopText onClick={this.onChangeMonth}>{currentMonth + 1}月</HeaderTopText>

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
            <WeekDays firstWeekDay={firstWeekDay} lang={lang} onChangeWeek={this.onChangeWeek} />
          </DateHeader>
          <DatePanel>{dateChildren}</DatePanel>
        </DateWInner>
      </DateWrapper>
    );
  }
}

export default Date;
