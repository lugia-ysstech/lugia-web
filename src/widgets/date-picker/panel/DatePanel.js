/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { DateChild, DateChildInner, DatePanel } from '../styled/styled';
import { modeStyle } from '../utils/booleanUtils';
import { valueInRange, getMinAndMax } from '../../common/Math';
import { getYandM } from '../utils/differUtils';
type TypeProps = {
  choseDayIndex: number,
  onMouseOver?: Function,
  onMouseOut?: Function,
  onDateChange: Function,
  panelChoseDate: string,
  rangeHoverChange?: Function,
  month: number,
  year: number,
  mode: string,
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
  selectToday: boolean,
  lastDayIndexInMonth: number,
  days: Array<number>,
  dates: Array<string>,
  firstDayIndex?: [],
  maxDay?: number,
  theme?: Object,
  todayDate: string,
  value: string,
  today: number,
  fromat: string,
  rangeRenderIndex: Array<number>,
  rangeChoseDayIndex: Array<number>,
};
class Dates extends Component<TypeProps, any> {
  static displayName = 'Dates';
  onDateChange = (index: number, child: number) => (e: any) => {
    const { onDateChange, month, year, format, firstDayIndex, maxDay, weekIndex } = this.props;
    const { value, mode } = this.props;
    const paramsGetYandMProps = {
      year,
      month,
      maxDay,
      weekIndex,
      format,
    };
    const getYandMParams = {
      index,
      child,
      value,
      mode,
      firstDayIndex,
      props: paramsGetYandMProps,
    };

    const { choseValue } = getYandM(getYandMParams);
    console.log(choseValue);
    const { isRange } = modeStyle(mode);
    const rangeParames = {};
    if (isRange) {
      rangeParames.month = month;
      rangeParames.year = year;
    }
    onDateChange && onDateChange({ choseValue, event: e });
  };
  mouseOver = (e: any) => {
    const target = e.target;
    const index = target.getAttribute('data-index');
    const child = target.getAttribute('data-child');
    if (index === null && child === null) {
      return;
    }
    const { mode } = this.props;
    const { isRange, isWeeks } = modeStyle(mode);
    if (isWeeks) {
      const { onMouseOver } = this.props;
      onMouseOver && onMouseOver(index, child);
    }
    if (isRange) {
      const { value, mode, firstDayIndex, year, month, maxDay, weekIndex, format } = this.props;
      const paramsGetYandMProps = {
        year,
        month,
        maxDay,
        weekIndex,
        format,
      };
      const getYandMParams = {
        index,
        child,
        value,
        mode,
        firstDayIndex,
        props: paramsGetYandMProps,
      };
      const { choseValue } = getYandM(getYandMParams);
      const { panelChoseDate } = this.props;
      if (panelChoseDate) {
        const { rangeHoverChange } = this.props;
        rangeHoverChange && rangeHoverChange({ choseValue });
      }
    }
  };
  mouseOut = () => {
    const { onMouseOut, mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    if (isWeeks) {
      onMouseOut && onMouseOut();
    }
  };
  render() {
    const {
      today,
      noToday,
      startInWeeks,
      endInWeeks,
      weekHoverStart,
      weekHoverEnd,
      mode,
      showToday,
      selectToday,
      weekIndex,
      lastDayIndexInMonth,
      days,
      theme,
      todayDate,
      value,
      fromat,
      rangeRenderIndex,
      choseDayIndex,
    } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    const dateChildren = days.map((currentValue, index) => {
      let rangeChose = false;
      if (rangeRenderIndex && rangeRenderIndex.length !== 0) {
        const { max, min } = getMinAndMax(rangeRenderIndex);
        rangeChose = valueInRange(index + 1, [max, min]);
      }
      const todayIndex = today + weekIndex;
      const compareIndex = index + 1;
      const rangeStartIndex = rangeRenderIndex && rangeRenderIndex[0];
      return (
        <DateChild
          {...theme}
          value={value}
          todayDate={todayDate}
          mode={mode}
          choseDayIndex={choseDayIndex}
          todayIndex={todayIndex}
          fromat={fromat}
          showToday={showToday}
          selectToday={selectToday}
          noToday={noToday}
          isChooseWeek={
            compareIndex >= startInWeeks && compareIndex <= endInWeeks && mode === 'weeks'
          }
          isHoverWeek={
            compareIndex >= weekHoverStart && compareIndex <= weekHoverEnd && mode === 'weeks'
          }
          startInWeeks={startInWeeks}
          endInWeeks={endInWeeks}
          weekHoverStart={weekHoverStart}
          weekHoverEnd={weekHoverEnd}
          rangeChose={rangeChose}
          rangeIndex={this.props.index}
          rangeStartIndex={rangeStartIndex}
          rangeEndIndex={rangeRenderIndex && rangeRenderIndex[rangeRenderIndex.length - 1]}
          index={index}
          data-index={index}
          data-child={currentValue}
          key={index}
        >
          <DateChildInner
            {...theme}
            mode={mode}
            key={index}
            onClick={this.onDateChange(index, currentValue)}
            isToday={showToday && todayIndex === index + 1 ? true : false}
            showToday={showToday}
            selectToday={selectToday}
            todayIndex={todayIndex}
            outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
            choseDayIndex={choseDayIndex}
            data-index={index}
            data-child={currentValue}
          >
            {' '}
            {currentValue}
          </DateChildInner>
        </DateChild>
      );
    });
    return (
      <DatePanel
        onMouseOver={isWeeks || isRange ? this.mouseOver : ''}
        onMouseOut={isWeeks || isRange ? this.mouseOut : ''}
      >
        {dateChildren}
      </DatePanel>
    );
  }
}
export default Dates;
