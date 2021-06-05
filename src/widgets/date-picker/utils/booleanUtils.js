// @flow
import moment from 'moment';
import { valueInRange } from '../../common/Math';
function getunixValue(value, format) {
  const time = { hour: 0, minute: 0, second: 0 };
  const nuix = moment(value, format)
    .set(time)
    .valueOf();
  return nuix;
}
export const getValueIsInRange = (
  maxValue: string,
  minValue: string,
  choseValue: string,
  format: string
) => {
  const maxUnix = getunixValue(maxValue, format);
  const minUnix = getunixValue(minValue, format);
  const choseValueUnix = getunixValue(choseValue, format);
  const choseValueIn = valueInRange(choseValueUnix, [minUnix, maxUnix]);
  return choseValueIn;
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
