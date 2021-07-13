/*
 * by wangcuixia
 * @flow
 * */

import moment from 'moment';
import { rangeValueMonthIsSame, formatValueIsValid, modeStyle } from './booleanUtils';
import { getDays, getRangeIndexfromWeeks, getValueFromWeekToDate } from './differUtils';
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

export const getDerived = (nextProps: Object, preState: Object) => {
  const { value, format, mode, valueIsValid, hasOldValue, isStartOfWeek } = nextProps;
  const { isWeeks } = modeStyle(mode);
  const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
  const newValue = preState ? preState.value : value || moment().format(newFormat);
  const momentsA = moment(newValue, newFormat);
  const momentsB = momentsA.clone();
  const { years, months, date } = momentsB.toObject();
  const weeks = momentsB.weeks();
  const weekDay = moment(newValue, newFormat)
    .date(1)
    .weekday();
  const weekIndex = weekDay;
  const choseDayIndex = valueIsValid || hasOldValue ? date + weekIndex : '';
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
    const { startInWeeks, endInWeeks } = getRangeIndexfromWeeks(
      moment(newValue, newFormat),
      weekIndex,
      isStartOfWeek
    );
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
    weekDay,
    year: years,
    weeks,
    month: months,
    weekIndex,
    lastDayIndexInMonth,
    choseDate: date,
    choseDayIndex,
    startInWeeks: startInWeek,
    endInWeeks: endInWeek,
    maxDay: max,
  };
};
export function getDerivedForInput(nextProps: Object, preState: Object): Object {
  const { mode } = nextProps;
  const { isRange, isWeeks, isWeek } = modeStyle(mode);
  const normalFormat = getNormalFormat(mode);
  const { format = normalFormat } = nextProps;
  const newPlaceholder = getPlaceholder(nextProps);
  const newValue = getValueFromValue(nextProps, preState);
  const valueIsValid = getValueWhetherValid(newValue, format);
  const monthIsSame = isRange && rangeValueMonthIsSame(newValue, format);
  const modeWithValid = isRange ? valueIsValid && !monthIsSame : valueIsValid;
  let panelValue = modeWithValid ? newValue : getInValidValue(newValue, format);
  const normalValue = panelValue;
  if ((isWeeks || isWeek) && panelValue) {
    panelValue = [getValueFromWeekToDate(panelValue[0], format)];
  }
  return {
    value: newValue,
    format,
    placeholder: newPlaceholder,
    valueIsValid,
    panelValue,
    normalValue,
  };
}
function getValueFromValue(nextProps: Object, preState: Object): Array<string> | void {
  const { defaultValue, value, mode } = nextProps;
  const { isRange } = modeStyle(mode);
  const hasDefaultProps =
    'defaultValue' in nextProps && defaultValue !== null && defaultValue !== undefined;
  const hasValueProps = 'value' in nextProps && value !== null && value !== undefined;
  let newValue = hasValueProps
    ? value
    : preState
    ? preState.value
    : hasDefaultProps
    ? defaultValue
    : isRange
    ? ['', '']
    : '';

  if (typeof newValue === 'string') {
    newValue = [newValue];
  }

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

  return newValue;
}
function getPlaceholder(nextProps: Object): Array<string> {
  const { mode, placeholder } = nextProps;
  const hasPlaceholder = placeholder && 'placeholder' in nextProps;
  const { isRange, isTime, isTimes } = modeStyle(mode);
  let newPlaceholder = hasPlaceholder
    ? placeholder
    : isRange
    ? ['开始日期', '结束日期']
    : isTime || isTimes
    ? '请选择时间'
    : '请选择日期';
  if (typeof newPlaceholder === 'string') {
    newPlaceholder = [newPlaceholder];
  }
  return newPlaceholder;
}
export function getValueWhetherValid(value: Array<string>, format: string): boolean {
  let valueIsValid = true;
  if (!value || !Array.isArray(value)) {
    return false;
  }
  value.forEach((item, index) => {
    const isValid = formatValueIsValid(item, format);
    if (!isValid) {
      valueIsValid = false;
    }
  });
  return valueIsValid;
}

function getInValidValue(value?: Array<string>, format: string): Array<string> {
  const normalValue = [];
  value &&
    value.forEach(dateValue => {
      const newVal = formatValueIsValid(dateValue, format) ? dateValue : moment().format(format);
      normalValue.push(newVal);
    });
  if (normalValue.length === 2) {
    const monthIsSame = rangeValueMonthIsSame(normalValue, format);
    if (monthIsSame) {
      normalValue[1] = moment(normalValue[0], format)
        .add(1, 'month')
        .format(format);
    }
  }
  return normalValue;
}
