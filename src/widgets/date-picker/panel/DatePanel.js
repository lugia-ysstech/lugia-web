/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { DateChild, DateChildInner, DatePanel } from '../styled/styled';
import { modeStyle, isBeforeTime, isAfterTime, hasLimitValue } from '../utils/booleanUtils';
import { valueInRange, getMinAndMax } from '../../common/Math';
import { getYandM } from '../utils/differUtils';
import { getDateTheme } from '../themeConfig/themeConfig';
type TypeProps = {
  choseDayIndex: Array<number> | number | string,
  againChoseDayIndex: Array<number>,
  onMouseOver?: Function,
  onMouseOut?: Function,
  onDateChange: Function,
  panelChoseDate: string,
  rangeHoverChange?: Function,
  againRangeHoverChange?: Function,
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
  rangeRenderIndex: Array<number>,
  rangeChoseDayIndex: Array<number>,
  themeProps?: Object,
  startDisabled?: boolean,
  endDisabled?: boolean,
};
class Dates extends Component<TypeProps, any> {
  static displayName = 'Dates';

  onDateChange = (index: number, child: number) => (e: any) => {
    const { onDateChange } = this.props;
    onDateChange && onDateChange({ choseValue: this.getTransChoseDate(index, child), event: e });
  };

  getTransChoseDate = (choseIndex: number, dateValue: number) => {
    const { month, year, format, firstDayIndex, maxDay, weekIndex, value, mode } = this.props;
    const { choseValue } = getYandM({
      index: choseIndex,
      child: dateValue,
      value,
      mode,
      firstDayIndex,
      props: { year, month, maxDay, weekIndex, format },
    });
    return choseValue;
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
      const {
        value,
        mode,
        firstDayIndex,
        year,
        month,
        maxDay,
        weekIndex,
        format,
        againRangeHoverChange,
      } = this.props;
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

      if (againRangeHoverChange) {
        againRangeHoverChange({ hoverValue: this.getTransChoseDate(index, child) });
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

  getDisabled = (index: number, currentValue: number) => {
    const {
      mode,
      rangeValue = [],
      startDisabled,
      endDisabled,
      limitMinValue,
      limitMaxValue,
      format,
    } = this.props;
    const { isRange, isDate } = modeStyle(mode);
    const hasLimitMinValue = hasLimitValue(limitMinValue, format);
    const hasLimitMaxValue = hasLimitValue(limitMaxValue, format);
    let isBeforeDisabled = false;
    let isAfterDisabled = false;
    const getCompareParam = (compareTime: string) => {
      return {
        everyTime: this.getTransChoseDate(index, currentValue),
        compareTime,
        format,
      };
    };
    if (isRange) {
      const compareParam = getCompareParam(
        startDisabled ? rangeValue[0] || '' : endDisabled ? rangeValue[1] || '' : ''
      );
      if (startDisabled) {
        isBeforeDisabled = isBeforeTime(compareParam);
      }
      if (endDisabled) {
        isAfterDisabled = isAfterTime(compareParam);
      }
    }
    if (isDate || isRange) {
      if (hasLimitMinValue) {
        isBeforeDisabled = isBeforeTime(getCompareParam(limitMinValue));
      }
      if (hasLimitMaxValue) {
        isAfterDisabled = isAfterTime(getCompareParam(limitMaxValue));
      }
    }
    return (isBeforeDisabled || isAfterDisabled) && (isDate || isRange);
  };

  getRangeIndex = () => {
    const { rangeRenderIndex = [] } = this.props;
    return {
      rangeStartIndex: rangeRenderIndex[0] || 0,
      rangeEndIndex: rangeRenderIndex[rangeRenderIndex.length - 1] || 0,
    };
  };
  getAgainRangeIndex = () => {
    const { againRangeRenderIndex = [] } = this.props;
    return {
      againRangeStartIndex: againRangeRenderIndex[0] || 0,
      againRangeEndIndex: againRangeRenderIndex[againRangeRenderIndex.length - 1] || 0,
    };
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
      todayDate,
      value,
      format,
      rangeRenderIndex,
      againRangeRenderIndex,
      choseDayIndex,
      againChoseDayIndex,
    } = this.props;
    const { isWeeks, isRange } = modeStyle(mode);
    const { themeProps } = this.props;
    const {
      hoverTheme,
      normalTheme,
      activeTheme,
      outMonthNormalTheme,
      rangeNormalTheme,
      rangeWeekDate,
      todayTheme,
      dateTheme,
      alignRangeHoverBgColor,
    } = getDateTheme(this.props);
    const { rangeStartIndex, rangeEndIndex } = this.getRangeIndex();
    const { againRangeStartIndex, againRangeEndIndex } = this.getAgainRangeIndex();
    const dateChildren = days.map((currentValue, index) => {
      let rangeChose = false;
      if (rangeRenderIndex && rangeRenderIndex.length !== 0) {
        const { max, min } = getMinAndMax(rangeRenderIndex);
        rangeChose = valueInRange(index + 1, [max, min]);
      }

      let againRangeChose = false;
      if (againRangeRenderIndex && againRangeRenderIndex.length !== 0) {
        const { max, min } = getMinAndMax(againRangeRenderIndex);
        againRangeChose = valueInRange(index + 1, [max, min]);
      }
      const todayIndex = today + weekIndex;
      const compareIndex = index + 1;
      const disabled = this.getDisabled(index, currentValue);

      return (
        <DateChild
          themeProps={themeProps}
          activeTheme={activeTheme}
          hoverTheme={hoverTheme}
          rangeNormalTheme={rangeNormalTheme}
          rangeWeekDate={rangeWeekDate}
          todayTheme={todayTheme}
          alignRangeHoverBgColor={alignRangeHoverBgColor}
          value={value}
          todayDate={todayDate}
          mode={mode}
          choseDayIndex={choseDayIndex}
          againChoseDayIndex={againChoseDayIndex}
          todayIndex={todayIndex}
          fromat={format}
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
          againRangeChose={againRangeChose}
          rangeIndex={this.props.index}
          rangeStartIndex={rangeStartIndex}
          rangeEndIndex={rangeEndIndex}
          againRangeStartIndex={againRangeStartIndex}
          againRangeEndIndex={againRangeEndIndex}
          index={index}
          data-index={index}
          data-child={currentValue}
          key={index}
          onClick={disabled ? '' : this.onDateChange(index, currentValue)}
          disabled={disabled}
          isRange={isRange}
        >
          <DateChildInner
            themeProps={dateTheme}
            hoverTheme={hoverTheme}
            activeTheme={activeTheme}
            normalTheme={normalTheme}
            outMonthNormalTheme={outMonthNormalTheme}
            todayTheme={todayTheme}
            rangeWeekDate={rangeWeekDate}
            noSingleHoverState={isWeeks || rangeChose}
            mode={mode}
            key={index}
            isToday={showToday && todayIndex === index + 1}
            showToday={showToday}
            selectToday={selectToday}
            todayIndex={todayIndex}
            outMonth={index < weekIndex || index > lastDayIndexInMonth}
            choseDayIndex={choseDayIndex}
            againChoseDayIndex={againChoseDayIndex}
            data-index={index}
            data-child={currentValue}
            disabled={disabled}
            isRange={isRange}
          >
            {currentValue}
          </DateChildInner>
        </DateChild>
      );
    });
    return (
      <DatePanel
        themeProps={themeProps}
        onMouseOver={isWeeks || isRange ? this.mouseOver : ''}
        onMouseOut={isWeeks || isRange ? this.mouseOut : ''}
      >
        {dateChildren}
      </DatePanel>
    );
  }
}
export default Dates;
