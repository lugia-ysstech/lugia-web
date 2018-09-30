/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import moment from 'moment';
import WeekDays from './week';
import { getDerived, modeStyle } from './getDerived';
import { valueInRange, sortable } from '../common/Math';
// import { getElementPosition } from '../utils';
import {
  DateChild,
  DateChildInner,
  DateHeader,
  DatePanel,
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
  weekHoverStart: number,
  weekHoverEnd: number,
  currentNodeIndex: number,
  currentNodeValue: number,
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
  isCanChange: boolean;
  choseWeeks: number;
  choseYear: number;
  isChangeMonth: boolean;
  constructor(props: TypeProps) {
    super(props);
    this.changeValue = moment().format('YYYY-MM-DD');
  }
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
    const { mode } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    this.value = choseValue;
    let currentNodeIndex;
    let currentNodeValue;
    if (isRange) {
      currentNodeIndex = index;
      currentNodeValue = child;
    }
    this.setState(
      {
        value: choseValue,
        currentYear,
        currentMonth,
        choseDate,
        choseDayIndex,
        currentNodeIndex,
        currentNodeValue,
      },
      () => {
        const { onChange } = this.props;
        this.getDaysInMonth()();
        if (isWeeks) {
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
    funGoal: string,
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
    if (isRange) {
      const { index, hasValue } = this.props;
      const { rangeValue } = this.props;
      console.log(this.value);
      const { isSameYandM, year, month } = this.getIsSame(rangeValue);
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
        newMoments = moment(this.value, format).add('1', 'month');
      }
      this.value = newMoments.format(format);
      // console.log(this.state.days);
      // const {currentNodeIndex,currentNodeValue}=this.state;
      // this.getIndexInRange(currentNodeIndex,currentNodeValue,rangeValue);
    }
    this.setStateFunc('fresh', newMoments, this.choseDate, this.value);
  };
  setStateFunc = (funGoal: string, moments: Object, choseDate: number, value: string) => {
    const { newMonth, newYear, days, weekDay, weekIndex, lastDayIndexInMonth } = this.getDates(
      moments
    );
    const { mode } = this.props;
    const { isRange } = modeStyle(mode);
    const dates = [];
    if (isRange) {
      days.forEach((item, index) => {
        const { choseValue } = this.getYandM(index, item);
        dates.push(choseValue);
      });
    }

    const dateIndex = choseDate + weekIndex;
    const { choseDayIndex } = this.getChoseDayIndex(
      funGoal,
      choseDate,
      weekIndex,
      dateIndex,
      value
    );
    this.setState(
      {
        days,
        dates,
        weekDay,
        currentYear: newYear,
        currentMonth: newMonth,
        weekIndex,
        lastDayIndexInMonth,
        value,
        choseDayIndex,
      },
      () => {
        const { mode } = this.props;
        const { isRange } = modeStyle(mode);

        if (isRange) {
          const { rangeValue } = this.props;
          this.getIndexInRange(rangeValue);
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
    //const { format } = this.state;
    const { mode } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    const { choseValue } = this.getYandM(index, child);
    // const { firstWeekDay } = this.state;
    if (isWeeks) {
      const moments = moment(moment(choseValue));

      let year = moments.year();
      const weeks = moments.weeks();
      const month = moments.month();

      if (month === 11 && weeks === 1) {
        year = year + 1;
      }

      // const start = moments.startOf('week').format('YYYY-MM-DD');
      // const end = moments.endOf('week').format('YYYY-MM-DD');

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
    if (isRange) {
      const { panelChoseDate } = this.props;
      //const rangeChange = rangeValue[0] !== '' || rangeValue[0] !== '';
      //const { weekIndex, currentMonth, currentYear } = this.state;

      const rangeIndex = this.props.index;

      if (panelChoseDate) {
        this.isHover = true;
        const { rangeHoverChange } = this.props;
        rangeHoverChange && rangeHoverChange({ rangeIndex, choseValue });

        // const rangeChoseIndex = choseValueIn && sameIndex ? [choseDayIndex, index + 1] : choseDayIndex;
        console.log(panelChoseDate, choseValue);
        const hoverRangeValue = this.getDateSort([panelChoseDate, choseValue]);
        console.log(hoverRangeValue);
        this.setState({ hoverRangeValue });
      }
    }
  };
  onMouseOut = () => {
    this.setState({
      weekHoverStart: '',
      weekHoverEnd: '',
    });
  };
  getDateSort = (arr: Array<any>) => {
    const { format } = this.state;
    const unixArr = [];
    arr.forEach((item, index) => {
      const unix = moment(item, format).valueOf();
      unixArr.push(unix);
    });
    const sortUnixArr = unixArr.sort(sortable);
    const valueArr = [];
    sortUnixArr.forEach((item, index) => {
      const value = moment(item).format(format);
      valueArr.push(value);
    });

    return valueArr;
  };
  getMaxAndMinInMonth = (currentMonth: number, currentYear: number) => {
    const { format } = this.state;
    const moments = moment().set({ month: currentMonth, year: currentYear });
    const maxValue = moments.endOf('month').format(format);
    const minValue = moments.startOf('month').format(format);
    return {
      maxValue,
      minValue,
    };
  };
  getValueInRange = (maxValue: string, minValue: string, choseValue: string) => {
    const { format } = this.state;
    const maxUnix = moment(maxValue, format).valueOf();
    const minUnix = moment(minValue, format).valueOf();
    const choseValueUnix = moment(choseValue, format).valueOf();
    const choseValueIn = valueInRange(choseValueUnix, [minUnix, maxUnix]);
    return choseValueIn;
  };
  getIsSame = (rangeValue: Array<string>) => {
    const { format } = this.state;
    const momentS = moment(rangeValue[0], format);
    const momentE = moment(rangeValue[1], format);
    const isSamePanelS = momentS.format('YYYY-MM');
    const isSamePanelE = momentE.format('YYYY-MM');
    return {
      isSameYandM: isSamePanelS === isSamePanelE,
      dateS: momentS.date(),
      dateE: momentE.date(),
      year: momentS.year(),
      month: momentS.month(),
    };
  };
  getIndexInRange = rangeValue => {
    const { dates } = this.state;
    console.log(dates);
    console.log(rangeValue);
  };
  getChoseDayIndexInRange = (index: number, currentValue: string, rangeValue: Array<string>) => {
    const { weekIndex, currentMonth, currentYear, format } = this.state;
    let { choseDayIndex } = this.state;
    const { mode, hasValue } = this.props;
    const { isRange } = modeStyle(mode);
    let rangeChose = false;
    let rangeStartIndex;
    let rangeEndIndex;
    let panelFistEndIndex;
    let panelSecondStartIndex;
    if (isRange) {
      if (rangeValue) {
        const { choseValue } = this.getYandM(index, currentValue);
        const { maxValue, minValue } = this.getMaxAndMinInMonth(currentMonth, currentYear);

        const choseValueIn = this.getValueInRange(maxValue, minValue, choseValue);
        if (choseValueIn) {
          rangeChose = this.getValueInRange(rangeValue[0], rangeValue[1], choseValue);
          const { isSameYandM, dateS, dateE } = this.getIsSame(rangeValue);
          if (isSameYandM) {
            rangeStartIndex = dateS + weekIndex;
            rangeEndIndex = dateE + weekIndex;
            choseDayIndex = [rangeStartIndex, rangeEndIndex];
          } else {
            panelFistEndIndex = '';
            panelSecondStartIndex = '';
            const { index } = this.props;
            if (index === 0) {
              panelFistEndIndex = moment(maxValue, format).date() + weekIndex;
            }
            if (index === 1) {
              panelSecondStartIndex = moment(minValue, format).date() + weekIndex;
            }
          }
        }
      }

      const rangeIndex = this.props.index;
      let { panelIndex } = this.props;
      const { isSameYandM } = this.getIsSame(rangeValue);
      panelIndex = isSameYandM && hasValue && panelIndex === 1 ? 0 : panelIndex;
      const sameIndex = panelIndex !== rangeIndex;
      // if(!this.isHover){
      choseDayIndex =
        (isSameYandM && sameIndex) || (!isSameYandM && sameIndex && !hasValue) ? '' : choseDayIndex;
      // }

      console.log(choseDayIndex);
    }
    return {
      choseDayIndex,
      rangeChose,
      rangeStartIndex,
      rangeEndIndex,
      panelFistEndIndex,
      panelSecondStartIndex,
    };
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
    const {
      days,
      currentYear,
      currentMonth,
      today,
      noToday,
      weekIndex,
      lastDayIndexInMonth,
      startInWeeks,
      endInWeeks,
      weekHoverStart,
      weekHoverEnd,
      hoverRangeValue,
    } = this.state;
    let {
      choseDayIndex,
      rangeChose,
      rangeStartIndex,
      rangeEndIndex,
      panelFistEndIndex,
      panelSecondStartIndex,
    } = this.state;

    const { showToday = true, mode, hasValue } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    const todayIndex = today + weekIndex;

    const dateChildren = days.map((currentValue, index) => {
      // let rangeChose = false;
      // let rangeStartIndex;
      // let rangeEndIndex;
      // let panelFistEndIndex;
      // let panelSecondStartIndex;

      if (isRange) {
        let { rangeValue } = this.props;
        console.log(hasValue, this.isHover);
        if (hasValue) {
          if (this.isHover) {
            rangeValue = hoverRangeValue;
          }
          const obj = this.getChoseDayIndexInRange(index, currentValue, rangeValue);
          choseDayIndex = obj.choseDayIndex;
          rangeChose = obj.rangeChose;
          rangeStartIndex = obj.rangeStartIndex;
          rangeEndIndex = obj.rangeEndIndex;
          panelFistEndIndex = obj.panelFistEndIndex;
          panelSecondStartIndex = obj.panelSecondStartIndex;
        }
        // else{
        //   const {index,panelIndex,preIndex}=this.props;
        //   const sameIndex=index===panelIndex;
        //   if(this.isHover){

        //     choseDayIndex=this.state.choseDayIndex;
        //     // if(preIndex ===panelIndex && !sameIndex  ){
        //     //   choseDayIndex='';
        //     // }
        //   }else{
        //     choseDayIndex='';
        //   }
        // }

        //console.log(isSameYandM);
        // if(this.isHover))){
        //   choseDayIndex=this.state.choseDayIndex;
        // }

        console.log(this.isHover);
      }

      return (
        <DateChild
          width={300}
          choseDayIndex={choseDayIndex}
          todayIndex={todayIndex}
          noToday={noToday}
          isChooseWeek={index >= startInWeeks && index < endInWeeks && mode === 'weeks'}
          isHoverWeek={index >= weekHoverStart && index < weekHoverEnd && mode === 'weeks'}
          startInWeeks={startInWeeks}
          endInWeeks={endInWeeks}
          weekHoverStart={weekHoverStart}
          weekHoverEnd={weekHoverEnd}
          onMouseOver={isWeeks || isRange ? this.onMouseOver(index, currentValue) : ''}
          onMouseOut={isWeeks || isRange ? this.onMouseOut : ''}
          rangeChose={rangeChose}
          rangeIndex={this.props.index}
          rangeStartIndex={rangeStartIndex}
          rangeEndIndex={rangeEndIndex}
          panelFistEndIndex={panelFistEndIndex}
          panelSecondStartIndex={panelSecondStartIndex}
          index={index + 1}
        >
          <DateChildInner
            width={300}
            key={index}
            onClick={this.onDateChange(index, currentValue)}
            isToday={showToday && todayIndex === index + 1 ? true : false}
            showToday={showToday}
            todayIndex={todayIndex}
            // todayIndex={todayIndex}
            // noToday={noToday}
            outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
            choseDayIndex={choseDayIndex}
          >
            {' '}
            {currentValue}
          </DateChildInner>
        </DateChild>
      );
    });
    const { firstWeekDay } = this.state;
    const { lang } = this.props;
    return (
      <DateWrapper width={300}>
        <div>
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
        </div>
      </DateWrapper>
    );
  }
}

export default Date;
