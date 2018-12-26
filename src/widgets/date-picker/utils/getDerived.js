/*
 * by wangcuixia
 * @flow
 * */

import moment from 'moment';
import { getformatSymbol } from './utils';
import { getIsSame, formatValueIsValid } from './booleanUtils';
import { getDays, getDatesfromWeeks, getValueFromWeekToDate } from './differUtils';
type typeProps = {
  value: string,
  format: string,
  mode: string,
  firstWeekDay: number,
  format: string,
  valueIsValid: boolean,
};
export const getNormalFormat = (mode: string): string => {
  const { isWeeks, isWeek, isMonth, isYear, isTime, isTimes } = modeStyle(mode);
  const normalFormat = isMonth
    ? 'YYYY-MM'
    : isYear
    ? 'YYYY'
    : isWeek || isWeeks
    ? 'YYYY-WW'
    : isTime || isTimes
    ? 'HH:mm:ss'
    : 'YYYY-MM-DD';
  return normalFormat;
};
export const getFirstWeekDay = (firstWeekDay: number = 0): number => {
  let newFirstWeekDay = firstWeekDay;
  if (newFirstWeekDay >= 7 || newFirstWeekDay <= 0) {
    newFirstWeekDay = 0;
  }
  return newFirstWeekDay;
};
export const getDerived = (nextProps: typeProps, preState: any) => {
  const { value, format, mode, firstWeekDay, valueIsValid } = nextProps;
  const { isWeeks } = modeStyle(mode);
  const newValue = preState ? preState.value : value;
  const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
  const momentsA = moment(newValue, newFormat);
  const momentsB = momentsA.clone();
  const { years, months, date } = momentsB.toObject();
  const weeks = momentsB.weeks();
  const weekDay = moment(newValue, newFormat)
    .date(1)
    .weekday();
  const weekIndex = weekDay;
  const choseDayIndex = valueIsValid ? date + weekIndex : '';
  const lastDayIndexInMonth = weekIndex + momentsB.daysInMonth() - 1;
  const days = getDays(momentsB);
  const max = momentsB.daysInMonth();
  let today = moment().date();
  let noToday = false;
  if (today > max) {
    today = max;
    noToday = true;
  }
  let startInWeek, endInWeek;
  if (isWeeks) {
    const { startInWeeks, endInWeeks } = getDatesfromWeeks(moment(newValue, newFormat), weekIndex);
    startInWeek = startInWeeks;
    endInWeek = endInWeeks;
  }
  return {
    value: newValue,
    days,
    noToday,
    today,
    todayDate: moment().format(format),
    format,
    mode: preState ? preState.mode : mode,
    currentYear: years,
    currentMonth: months,
    weekDay,
    year: years,
    weeks,
    month: months,
    weekIndex,
    lastDayIndexInMonth,
    choseDate: date,
    choseDayIndex,
    firstWeekDay,
    startInWeeks: startInWeek,
    endInWeeks: endInWeek,
    maxDay: max,
  };
};
type typePropsForgetDerivedForInput = {
  defaultValue?: Array<string> | string,
  value?: Array<string> | string,
  format?: string,
  mode: string,
  disabled?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  showTime?: any,
  onOk?: any,
  firstWeekDay?: number,
  theme: Object,
  mode: string,
};
type typeStateForgetDerivedForInput = {
  value: Array<string>,
};
type typeResultForgetDerivedForInput = {
  value: Array<string> | void,
  format: string,
  placeholder: Array<string> | string,
  firstWeekDay: number,
  valueIsValid: boolean,
  panelValue: Array<string> | void,
  normalValue: Array<string> | void,
};
export function getDerivedForInput(
  nextProps: typePropsForgetDerivedForInput,
  preState: typeStateForgetDerivedForInput
): typeResultForgetDerivedForInput {
  const { mode } = nextProps;
  const { isRange, isWeeks } = modeStyle(mode);
  const firstWeekDay = getFirstWeekDay(nextProps.firstWeekDay);
  const normalFormat = getNormalFormat(mode);
  const { format = normalFormat } = nextProps;
  const newPlaceholder = getPlaceholder(nextProps);
  const newValue = getValueFromValue(nextProps, preState);
  const valueIsValid = getValueWhetherValid(newValue, format);
  const { isSameYandM } = isRange && getIsSame(newValue, format);
  const modeWithValid = isRange ? valueIsValid && !isSameYandM : valueIsValid;
  let panelValue = modeWithValid ? newValue : getInValidValue(newValue, format);
  const normalValue = panelValue;
  if (isWeeks) {
    panelValue = [getValueFromWeekToDate(panelValue[0], format)];
  }
  return {
    value: newValue,
    format,
    placeholder: newPlaceholder,
    firstWeekDay,
    valueIsValid,
    panelValue,
    normalValue,
  };
}
type propsgetValueFromValue = {
  defaultValue?: Array<string> | string,
  value?: Array<string> | string,
  mode: string,
};
type stategetValueFromValue = {
  value: Array<string> | string,
};
function getValueFromValue(
  nextProps: propsgetValueFromValue,
  preState: stategetValueFromValue
): Array<string> | string | void {
  const { defaultValue, value, mode } = nextProps;
  const { isRange } = modeStyle(mode);
  const hasDefaultProps = 'defaultValue' in nextProps;
  const hasValueProps = 'value' in nextProps;
  let newValue = hasValueProps
    ? value
    : preState
    ? preState.value
    : hasDefaultProps
    ? defaultValue
    : isRange
    ? ['', '']
    : '';
  if (isRange && Array.isArray(newValue)) {
    const rangeValue = [...newValue];
    const { length } = rangeValue;
    if (length === 1) {
      rangeValue.push('');
    }
    if (length > 2) {
      rangeValue.slice(0, 2);
    }
    newValue = rangeValue;
  }
  if (typeof newValue === 'string') {
    newValue = [newValue];
  }
  return newValue;
}
function getPlaceholder(nextProps: Object): Array<string> | string {
  const { mode, placeholder } = nextProps;
  const hasPlaceholder = 'placeholder' in nextProps;
  const { isRange, isTime, isTimes } = modeStyle(mode);
  return hasPlaceholder
    ? placeholder
    : isRange
    ? ['开始日期', '结束日期']
    : isTime || isTimes
    ? '请选择时间'
    : '请选择日期';
}
export function getValueWhetherValid(value?: Array<string> | string, format: string): boolean {
  const normalFormatbyValue = moment().format(format);
  const normalvalueFormatObj = getformatSymbol(normalFormatbyValue);
  let valueIsValid = true;
  Array.isArray(value) &&
    value.forEach((item, index) => {
      const isValid = formatValueIsValid(normalvalueFormatObj, item, format);
      if (!isValid) {
        valueIsValid = false;
      }
    });
  // if (!Array.isArray(value)) {
  //   valueIsValid = formatValueIsValid(normalvalueFormatObj, value, format);
  // }
  return valueIsValid;
}

function getInValidValue(value?: Array<string>, format: string): Array<string> {
  const normalFormatbyValue = moment().format(format);
  const normalvalueFormatObj = getformatSymbol(normalFormatbyValue);
  const normalValue = [];
  const normal = moment().format(format);
  const isArr = value && Array.isArray(value);
  isArr &&
    value.forEach((item, index) => {
      let newVal = item;
      const isValid = formatValueIsValid(normalvalueFormatObj, newVal, format);
      if (!isValid || newVal === '') {
        newVal = normal;
      }
      normalValue.push(newVal);
    });
  if (normalValue.length === 2) {
    const { isSameYandM } = getIsSame(normalValue, format);
    if (isSameYandM) {
      normalValue[1] = moment(normalValue[0], format)
        .add(1, 'month')
        .format(format);
    }
  }

  //const newValue = isArr ? normalValue : normal;
  return normalValue;
}

export function modeStyle(mode: string): Object {
  const isWeek = mode === 'week';
  const isWeeks = mode === 'weeks';
  const isMonth = mode === 'month';
  const isYear = mode === 'year';
  const isDate = mode === 'date';
  const isRange = mode === 'range';
  const isTime = mode === 'time';
  const isTimes = mode === 'times';
  return {
    isWeek,
    isMonth,
    isYear,
    isDate,
    isWeeks,
    isRange,
    isTime,
    isTimes,
  };
}
