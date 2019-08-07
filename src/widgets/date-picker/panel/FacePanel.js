/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { modeStyle } from '../utils/booleanUtils';
import { OtherChild, OtherChildText, DatePanel } from '../styled/styled';
import { getWeeksRange } from '../utils/differUtils';
import moment from 'moment';
type TypeProps = {
  onChange?: Function,
  showYears?: boolean,
  start: number,
  step: number,
  mode: string,
  isWeekInner?: boolean,
  year: number,
  weeks?: number,
  month?: number,
  lang?: string,
  data?: Array<any>,
  getHeadInfo?: Function,
  column?: number,
  theme?: Object,
};

OtherChild.displayName = 'OtherChild';
class FacePanel extends Component<TypeProps, any> {
  static displayName = 'FacePanel';
  render() {
    const { start, step, mode, year, weeks = 1, lang, data, column = 3, showYears } = this.props;
    const { isWeek, isYear, isMonth } = modeStyle(mode);
    const weeksInYear = moment()
      .set({ year })
      .weeksInYear();
    const years = !showYears && isYear && this.getYears(start, step);
    const doubleYear = showYears && isYear && this.getRangeYears(start, step);
    const months = isMonth && this.getMonthDate(lang, data);
    const { weeksDate, rangeIndex } = isWeek && getWeeksRange(weeks, weeksInYear, step);
    const { weeksInner, weekIndex } =
      isWeek && this.getWeeks(weeks, weeksDate, rangeIndex, weeksInYear, step);
    const { theme } = this.props;
    const equalValue = this.getEqualValue(this.props, weekIndex);
    const childDatas = {
      months,
      weeksDate,
      weeksInner,
      doubleYear,
      years,
    };
    const ChildrenData = this.getChildrenData(this.props, childDatas);
    const { themeProps } = this.props;
    return (
      <DatePanel themeProps={themeProps}>
        {ChildrenData.map((current: any, index: number) => {
          return (
            <OtherChild
              themeProps={themeProps}
              {...theme}
              onClick={this.panelClick(current)}
              key={index}
              column={column}
            >
              <OtherChildText
                themeProps={themeProps}
                {...theme}
                isChose={current.value === equalValue}
              >
                {current.text}
              </OtherChildText>
            </OtherChild>
          );
        })}
      </DatePanel>
    );
  }
  panelClick = (choseValue: Object) => (e: any) => {
    const { showYears, onChange, mode, isWeekInner } = this.props;
    const { isWeek, isMonth, isYear } = modeStyle(mode);
    let data;
    if (isMonth) {
      data = { month: choseValue.value };
    }
    if (isYear && showYears) {
      data = { ...choseValue, showYears: false };
    }
    if (isYear && !showYears) {
      data = { start: choseValue.value, showYears: true };
    }
    if (isWeek) {
      const status = isWeekInner ? false : true;
      data = { ...choseValue, isWeekInner: status };
    }
    onChange && onChange({ ...data, event: e });
  };
  getYears = (start: number, step: number): Array<Object> => {
    const years = [];
    const nextYear = moment()
      .set({ year: start })
      .add(-1, 'year');
    for (let i = 0; i < step; i++) {
      const moments = moment(nextYear);
      const year = moments.add(i, 'year');
      const yearChild = year.year();
      years.push({ text: yearChild, value: yearChild });
    }
    return years;
  };
  getRangeYears = (start: number, step: number): Array<Object> => {
    const doubleYear = [];
    const yStart = start - step;
    for (let i = 0; i < step; i++) {
      const star = yStart + step * i;
      const en = star + step - 1;
      const text = star + '-' + en;
      doubleYear.push({ text, start: star, end: en, value: star });
    }
    return doubleYear;
  };
  getMonthDate = (lang?: string, data?: Array<any>): Array<Object> => {
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
    if (data && Array.isArray(data)) {
      months = data.slice(0, 12);
    } else {
      if (lang === 'en') {
        months = moment.monthsShort();
      }
    }
    const newMonth = [];
    months.forEach((item, index) => {
      newMonth.push({ text: item, value: index });
    });
    return newMonth;
  };
  getWeeks = (
    weeks: number,
    weeksDate: Array<Object>,
    rangeIndex: number,
    weeksInYear: number,
    step: number
  ) => {
    const weeksInner = [];
    let weekIndex = 0;
    const { start, end, index } = weeksDate[rangeIndex];
    if (weeks >= start && weeks <= end) {
      weekIndex = index;
    }
    for (let i = 0; i < step; i++) {
      const weekNumber = start + i;
      const text = weekNumber > weeksInYear ? '' : `第${weekNumber}周`;
      const weeks = weekNumber > weeksInYear ? -1 : weekNumber;
      weeksInner.push({ text, weeks, value: weeks });
    }
    return { weeksInner, weekIndex };
  };
  getEqualValue = (props: Object, weekIndex: number): number => {
    const { start, mode, isWeekInner, weeks = 1, month } = props;
    const { isWeek, isMonth } = modeStyle(mode);
    return isWeek && isWeekInner
      ? weeks
      : isWeek && !isWeekInner
      ? weekIndex
      : isMonth
      ? month
      : Number(start);
  };
  getChildrenData = (props: Object, datas: Object): Array<Object> => {
    const { months, weeksDate, weeksInner, doubleYear, years } = datas;
    const { showYears, mode, isWeekInner } = props;
    const { isWeek, isMonth } = modeStyle(mode);
    return isMonth
      ? months
      : isWeek && !isWeekInner
      ? weeksDate
      : isWeek && isWeekInner
      ? weeksInner
      : showYears
      ? doubleYear
      : years;
  };
}

export default FacePanel;
