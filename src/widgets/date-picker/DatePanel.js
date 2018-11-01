/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import { DateChild, DateChildInner, DatePanel } from './styled';
import { modeStyle } from './getDerived';
import { valueInRange, getMinAndMax } from '../common/Math';
import { getMaxAndMinInMonth, getValueInRange, getIsSame } from './utils';
const moment = require('moment');
type TypeProps = {
  choseDayIndex: number,
  onMouseOut: Function,
  onMouseOver?: Function,
  onDateChange: Function,
  panelChoseDate: number,
  rangeHoverChange?: Function,
  currentMonth: number,
  currentYear: number,
  mode: string,
  val: string,
  weekIndex: number,
  format: string,
  index: number,
  todayIndex: number,
  noToday: boolean,
  startInWeeks: number,
  endInWeeks: number,
  weekHoverStart: number,
  weekHoverEnd: number,
  showToday: boolean,
  lastDayIndexInMonth: number,
  days: Array<string>,
  panelIndex: number,
  firstDayIndex?: number,
  maxDay?: number,
};
type TypeState = {
  choseDayIndex: number,
  rangeChoseIndex: number,
  rangeStartIndex: number,
  rangeEndIndex: number,
  panelFistEndIndex: number,
  panelSecondStartIndex: number,
  islessThanMin: boolean,
  isGreaterThanMax: boolean,
};
class Dates extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { choseDayIndex } = nextProps;
    if (!preState) {
      return {
        choseDayIndex,
        rangeChoseIndex: '',
        rangeStartIndex: '',
        rangeEndIndex: '',
        panelFistEndIndex: '',
        panelSecondStartIndex: '',
        islessThanMin: undefined,
        isGreaterThanMax: undefined,
        dates: [],
      };
    }
  }
  onDateChange = (index: number, child: number) => () => {
    const { onDateChange, currentMonth, currentYear, format } = this.props;
    const { choseValue } = this.getYandM(index, child);
    const { maxValue, minValue } = getMaxAndMinInMonth(currentMonth, currentYear, format);
    const inRange = getValueInRange(maxValue, minValue, choseValue, format);
    onDateChange && onDateChange(index, child, inRange);
  };
  onMouseOver = (index: number, child: number) => () => {
    const { mode } = this.props;
    const { isRange } = modeStyle(mode);
    if (!isRange) {
      const { onMouseOver } = this.props;
      onMouseOver && onMouseOver(index, child);
    }
    if (isRange) {
      const { choseValue } = this.getYandM(index, child);
      const { panelChoseDate } = this.props;
      if (panelChoseDate) {
        this.getIndexInRange([panelChoseDate, choseValue]);
        this.rangeHoverChange(choseValue);
      }
    }
  };
  rangeHoverChange = (choseValue: string) => {
    const { currentMonth, currentYear } = this.props;
    const rangeIndex = this.props.index;
    const { rangeHoverChange } = this.props;
    rangeHoverChange && rangeHoverChange({ rangeIndex, choseValue, currentMonth, currentYear });
  };
  onMouseOut = () => {
    const { onMouseOut, mode } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    if (isWeeks) {
      onMouseOut && onMouseOut();
    }
    if (isRange) {
      const { panelChoseDate } = this.props;
      this.value = '';
    }
  };
  getIndexInValue = (value: string) => {
    const { weekIndex, format } = this.props;
    const date = moment(value, format).date();
    const dateIndex = date + weekIndex;
    return dateIndex;
  };
  getYandM = (index: number, child: number) => {
    const choseDate = child;
    const { weekIndex, format, mode } = this.props;
    const { val } = this.props;
    const { currentYear, currentMonth } = this.props;
    const { isRange } = modeStyle(mode);
    const value = isRange
      ? moment()
          .set({ month: currentMonth, year: currentYear })
          .format(format)
      : val;

    const { choseDayIndex, choseValue } = this.getChoseDayIndex(
      'getNode',
      choseDate,
      weekIndex,
      index,
      value
    );
    const moments = moment(choseValue, format);
    const year = moments.year();
    const month = moments.month();
    return {
      choseValue,
      currentYear: year,
      currentMonth: month,
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
    let { format } = this.props;
    const { mode } = this.props;
    if (mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    const { firstDayIndex, maxDay } = this.props;
    const first = firstDayIndex && firstDayIndex[0];
    const second = firstDayIndex && firstDayIndex[1];
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
    let { format } = this.props;
    const newMoments = moment(moments);
    newMoments[funName](number, 'month').set('date', choseDate);
    const { mode } = this.props;
    if (mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    return newMoments.format(format);
  };
  getIndexInRange = (rangeValue: Array<string>) => {
    const { currentMonth, currentYear, format } = this.props;
    const rangeChoseIndex = [];
    const { maxValue, minValue } = getMaxAndMinInMonth(currentMonth, currentYear, format);
    const { isSameYandM } = getIsSame(rangeValue, format);
    const choseValueIn = getValueInRange(maxValue, minValue, rangeValue[1], format);
    const { dates } = this.props;
    dates &&
      dates.forEach((item, index) => {
        const isRangeChose =
          rangeValue && getValueInRange(rangeValue[0], rangeValue[1], item, format);
        const isInMaxMin = getValueInRange(maxValue, minValue, item, format);
        if (isRangeChose && isInMaxMin) {
          const dateIndex = this.getIndexInValue(item);
          rangeChoseIndex.push(dateIndex);
        }
      });
    const start = this.getIndexInValue(rangeValue[0]);
    const end = this.getIndexInValue(rangeValue[1]);

    const { index, panelIndex, choseDayIndex } = this.props;

    let newChoseDayIndex;
    if (index === panelIndex) {
      const moments = moment(rangeValue[0], format);
      const choseMonth = moments.month();
      const choseYear = moments.year();
      const thisPanelOut = choseMonth !== currentMonth || choseYear !== currentYear;
      newChoseDayIndex = rangeValue[0]
        ? choseValueIn
          ? isSameYandM
            ? [start, end]
            : end
          : thisPanelOut
            ? ''
            : start
        : choseDayIndex;
    } else {
      newChoseDayIndex = choseValueIn ? (isSameYandM ? [start, end] : [end]) : '';
    }
    const { length } = rangeChoseIndex;
    const rangeStartIndex = rangeChoseIndex && rangeChoseIndex[0];
    const rangeEndIndex = rangeChoseIndex && rangeChoseIndex[length - 1];
    this.setState({
      choseDayIndex: newChoseDayIndex,
      rangeChoseIndex,
      rangeStartIndex,
      rangeEndIndex,
    });
  };
  render() {
    const {
      todayIndex,
      noToday,
      startInWeeks,
      endInWeeks,
      weekHoverStart,
      weekHoverEnd,
      mode,
      showToday,
      weekIndex,
      lastDayIndexInMonth,
      days,
      width = 300,
    } = this.props;
    const {
      rangeChoseIndex,
      rangeStartIndex,
      rangeEndIndex,
      panelFistEndIndex,
      panelSecondStartIndex,
    } = this.state;
    let { choseDayIndex } = this.state;
    const { isWeeks, isRange } = modeStyle(mode);
    const dateChildren = days.map((currentValue, index) => {
      let rangeChose = false;
      if (rangeChoseIndex && rangeChoseIndex.length !== 0) {
        const { max, min } = getMinAndMax(rangeChoseIndex);
        rangeChose = valueInRange(index + 1, [max, min]);
      }
      if (!isRange) {
        choseDayIndex = this.props.choseDayIndex;
      }

      return (
        <DateChild
          width={width}
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
            width={width}
            key={index}
            onClick={this.onDateChange(index, currentValue)}
            isToday={showToday && todayIndex === index + 1 ? true : false}
            showToday={showToday}
            todayIndex={todayIndex}
            outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
            choseDayIndex={choseDayIndex}
          >
            {' '}
            {currentValue}
          </DateChildInner>
        </DateChild>
      );
    });
    return <DatePanel>{dateChildren}</DatePanel>;
  }
}
export default Dates;
