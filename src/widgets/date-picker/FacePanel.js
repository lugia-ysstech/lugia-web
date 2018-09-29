/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import DatePicker from './DateInput';
import { getDerived, modeStyle } from './getDerived';
import { OtherChild, OtherChildText, DatePanel } from './styled';
type TypeProps = {
  onChange?: Function,
  showYears?: boolean,
  start: number,
  step: number,
  mode: string,
  isWeekInner: boolean,
  year?: number,
  weeks: number,
  monthIndex: number,
  lang?: string,
  data?: Array<any>,
  getHeadInfo?: Function,
  column: ?number,
};
type TypeState = {
  value: string,
  format: string,
  currentYear: number,
};
class FacePanel extends Component<TypeProps, TypeState> {
  getChildIndex = (choseValue: number | Object) => () => {
    const { showYears, onChange, mode, isWeekInner } = this.props;
    const { isWeek, isMonth, isYear } = modeStyle(mode);
    let data;
    if (isMonth) {
      data = { monthIndex: choseValue };
    }
    if (isYear && showYears) {
      data = { ...choseValue, showYears: false };
    }
    if (isYear && !showYears) {
      data = { start: choseValue, showYears: true };
    }
    if (isWeek) {
      const status = isWeekInner ? false : true;
      data = { ...choseValue, isWeekInner: status };
    }

    onChange && onChange(data);
  };
  getYears = (start: number, step: number, isYear: boolean) => {
    const years = [];
    if (isYear) {
      const nextYear = moment()
        .set('year', start)
        .add(-1, 'year');

      for (let i = 0; i < step; i++) {
        const moments = moment(nextYear);
        const year = moments.add(i, 'year');
        years.push(year.year());
      }
    }
    return { years };
  };
  getRangeYears = (start: number, step: number, isYear: boolean) => {
    const doubleYear = [];
    if (isYear) {
      const times = step;
      const yStart = start - times;
      for (let i = 0; i < step; i++) {
        const star = yStart + times * i;
        const en = star + times - 1;
        const text = star + '-' + en;
        doubleYear.push({ text, start: star, end: en });
      }
    }
    return { doubleYear };
  };
  getMonthDate = (lang?: string, data?: Array<any>) => {
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
    if (data) {
      months = [...data];
    }
    return { months };
  };
  getWeeksRange = (weeks: number, isWeek: boolean, weeksInYear: number, step: number) => {
    const weeksDate = [];
    let rangeIndex;
    if (isWeek) {
      for (let i = 0; i < 5; i++) {
        const start = step * i + 1;
        const end = i === 4 ? weeksInYear : step * i + step;
        const text = `${start}-${end}周`;
        if (weeks >= start && weeks <= end) {
          rangeIndex = i;
        }
        weeksDate.push({ text, start, end, index: i });
      }
    }
    return {
      weeksDate,
      rangeIndex,
    };
  };
  getWeeks = (
    weeks: number,
    isWeek: boolean,
    weeksDate: Array<Object>,
    rangeIndex: number,
    weeksInYear: number,
    step: number
  ) => {
    const weeksInner = [];
    let weekIndex;
    if (isWeek) {
      const { start, end, index } = weeksDate[rangeIndex];
      if (weeks >= start && weeks <= end) {
        weekIndex = index;
      }
      for (let i = 0; i < step; i++) {
        const weekNumber = start + i;
        const text = weekNumber > weeksInYear ? '' : `第${weekNumber}周`;
        const weeks = weekNumber > weeksInYear ? -1 : weekNumber;
        weeksInner.push({ text, weeks });
      }
    }
    return { weeksInner, weekIndex };
  };
  getHeadInfo = () => {
    const { step, mode, year, isWeekInner, weeks } = this.props;
    const { isWeek } = modeStyle(mode);
    const weeksInYear = moment({ year }).weeksInYear();
    const { weeksDate, rangeIndex } = this.getWeeksRange(weeks, isWeek, weeksInYear, step);
    const data = weeksDate[rangeIndex];
    return {
      ...data,
      isWeekInner,
    };
  };
  render() {
    const {
      start,
      step,
      showYears,
      mode,
      year,
      isWeekInner,
      weeks,
      lang,
      data,
      monthIndex,
      column = 3,
    } = this.props;
    const { isWeek, isMonth, isYear } = modeStyle(mode);
    const weeksInYear = moment({ year }).weeksInYear();
    const { years } = this.getYears(start, step, isYear);
    const { doubleYear } = this.getRangeYears(start, step, isYear);
    const { months } = this.getMonthDate(lang, data);
    const { weeksDate, rangeIndex } = this.getWeeksRange(weeks, isWeek, weeksInYear, step);
    const { weeksInner, weekIndex } = this.getWeeks(
      weeks,
      isWeek,
      weeksDate,
      rangeIndex,
      weeksInYear,
      step
    );
    const ChildrenData =
      mode === 'month'
        ? months
        : mode === 'week' && !isWeekInner
          ? weeksDate
          : mode === 'week' && isWeekInner
            ? weeksInner
            : showYears
              ? doubleYear
              : years;

    return (
      <DatePanel>
        {ChildrenData.map((current, index) => {
          const text = isWeek ? current.text : showYears ? current.text : current;
          const currentStart =
            isWeek && isWeekInner
              ? current.weeks
              : isWeek && !isWeekInner
                ? current.index
                : isMonth
                  ? index
                  : showYears
                    ? current.start
                    : current;
          const param = isMonth ? index : current;
          const equalValue =
            isWeek && isWeekInner
              ? weeks
              : isWeek && !isWeekInner
                ? weekIndex
                : isMonth
                  ? monthIndex
                  : Number(start);
          return (
            <OtherChild onClick={this.getChildIndex(param)} key={index} column={column}>
              <OtherChildText isChose={currentStart === equalValue}>{text}</OtherChildText>
            </OtherChild>
          );
        })}
      </DatePanel>
    );
  }
}

export default FacePanel;
