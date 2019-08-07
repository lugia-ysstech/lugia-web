import moment from 'moment';
import { valueInRange } from '../../common/Math';
import { getformatSymbol } from './utils';
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
export const getIsSame = (rangeValue: Array<string>, format) => {
  const momentS = moment(rangeValue[0], format);
  const momentE = moment(rangeValue[1], format);
  const isSamePanelS = momentS.format('YYYY-MM');
  const isSamePanelE = momentE.format('YYYY-MM');
  return {
    isSameYandM:
      rangeValue.length === 2 &&
      rangeValue[0] !== '' &&
      rangeValue[1] !== '' &&
      isSamePanelS === isSamePanelE,
    dateS: momentS.date(),
    dateE: momentE.date(),
    year: momentS.year(),
    month: momentS.month(),
  };
};

export const formatValueIsValid = (normalStyleValueObj: Object, value: string, format: string) => {
  const isSame = getValueIsValid(normalStyleValueObj, value);
  const isValid = moment(value, format).isValid();
  return isSame && isValid;
};
function getValueIsValid(normalStyleValueObj: Object, value: string) {
  if (!value) {
    return false;
  }
  const { symbolCont, numberIndex } = getformatSymbol(value);
  const numberIsSame = getArrayIsSame(normalStyleValueObj.numberIndex, numberIndex);
  const symbolIsSame = getArrayIsSame(normalStyleValueObj.symbolCont, symbolCont);
  return numberIsSame && symbolIsSame;
}
function getArrayIsSame(normalArr: [], newArr: []) {
  let isSame = true;
  normalArr.forEach((item, index) => {
    if (newArr[index] !== item) {
      isSame = false;
    }
  });
  return isSame && normalArr.length === newArr.length;
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
