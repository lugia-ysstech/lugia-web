// @flow
import moment from 'moment';

export const getValueIsInRange = (values: string[], choseValue: string, format: string) => {
  const first = values[0] || '';
  const second = values[1] || '';
  return moment(moment(choseValue, format)).isBetween(
    moment(first, format),
    moment(second, format),
    'day',
    '[]'
  );
};
export const rangeValueMonthIsSame = (rangeValue: Array<string>, format: string) => {
  const startTime = moment(rangeValue[0], format);
  const endTime = moment(rangeValue[1], format);
  return moment(startTime).isSame(endTime, 'month');
};

export const formatValueIsValid = (value: string, format: string) => {
  return moment(value, format, true).isValid();
};

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
export function getOpenProps(props: Object) {
  const { alwaysOpen, open } = props;
  return { alwaysOpen: alwaysOpen || open };
}

export function hasLimitValue(limitValue: string, format: string): boolean {
  return limitValue && formatValueIsValid(limitValue, format);
}

export function isBeforeTime(param: { everyTime: string, compareTime: string, format: string }) {
  return compareTime({ ...param, type: 'isBefore' });
}

export function isAfterTime(param: { everyTime: string, compareTime: string, format: string }) {
  return compareTime({ ...param, type: 'isAfter' });
}

export function compareTime(param: {
  everyTime: string,
  compareTime: string,
  format: string,
  type: 'isBefore' | 'isAfter',
}) {
  const { everyTime, compareTime, format, type } = param;
  const time = moment(everyTime, format);
  const compare = moment(compareTime, format);
  let result = false;
  switch (type) {
    case 'isBefore':
      result = moment(time).isBefore(compare);
      break;
    case 'isAfter':
      result = moment(time).isAfter(compare);
      break;
    default:
      break;
  }
  return result;
}

export function getValueIsInLimit(param: {
  dateValue: string,
  limitMinValue: string,
  limitMaxValue: string,
  format: string,
}): boolean {
  const { limitMinValue, limitMaxValue = '', format, dateValue } = param;
  const hasLimitMinValue = hasLimitValue(limitMinValue, format);
  const hasLimitMaxValue = hasLimitValue(limitMaxValue, format);
  if (hasLimitMaxValue && hasLimitMinValue) {
    return getValueIsInRange([limitMinValue, limitMaxValue], dateValue, format);
  }
  if (hasLimitMinValue) {
    return !isBeforeTime({ everyTime: dateValue, compareTime: limitMinValue, format });
  }
  if (hasLimitMaxValue) {
    return !isAfterTime({ everyTime: dateValue, compareTime: limitMaxValue, format });
  }
  return true;
}

export function isDoubleDate(type: string) {
  return type === 'double';
}
