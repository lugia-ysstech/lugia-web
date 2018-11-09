import moment from 'moment';
import { valueInRange } from '../common/Math';
export const getMaxAndMinInMonth = (currentMonth: number, currentYear: number, format) => {
  const moments = moment().set({ month: currentMonth, year: currentYear });
  const maxValue = moments.endOf('month').format(format);
  const minValue = moments.startOf('month').format(format);
  return {
    maxValue,
    minValue,
  };
};
export const getCompareRange = (arr: [], status: string, format) => {
  const maxUnix = moment(arr[0], format).valueOf();
  const minUnix = moment(arr[1], format).valueOf();
  if (status === 'min') {
    return maxUnix < minUnix;
  }
  return maxUnix > minUnix;
};
export const getValueInRange = (maxValue: string, minValue: string, choseValue: string, format) => {
  const maxUnix = moment(maxValue, format).valueOf();
  const minUnix = moment(minValue, format).valueOf();
  const choseValueUnix = moment(choseValue, format).valueOf();
  const choseValueIn = valueInRange(choseValueUnix, [minUnix, maxUnix]);

  return choseValueIn;
};
export const getIsSame = (rangeValue: Array<string>, format) => {
  const momentS = moment(rangeValue[0], format);
  const momentE = moment(rangeValue[1], format);
  const isSamePanelS = momentS.format('YYYY-MM');
  const isSamePanelE = momentE.format('YYYY-MM');
  return {
    isSameYandM: isSamePanelS === isSamePanelE,
    dateS: momentS.date(),
    dateE: momentE.date(),
    year: momentS.year(),
    month: momentS.month(),
  };
};
export const getTimes = (number: number) => {
  const Times = [];
  for (let i = 0; i < number; i++) {
    let text = i;
    if (i < 10) {
      text = '0' + i;
    }
    Times.push({ text, value: i });
  }
  return Times;
};
export const getTheme = (props: Object, componentName) => {
  const { getTheme } = props;
  const component = `sv_widget_${componentName}`;
  const theme = getTheme().svThemeConfigTree[component];
  return { theme };
};
export const getValueIndex = (value: string) => {
  const { length } = value;
  const symbolCont = [];
  const numberIndex = [];
  for (let i = 0; i < length; i++) {
    const numberValue = parseInt(value[i]);
    if (isNaN(numberValue)) {
      symbolCont.push(value[i]);
    } else {
      numberIndex.push(i);
    }
  }
  return {
    symbolCont,
    numberIndex,
  };
};
export const getValueIsValid = (normalStyleValueObj: Object, value: string) => {
  const { symbolCont, numberIndex } = getValueIndex(value);
  const numberIsSame = getArrayIsSame(normalStyleValueObj.numberIndex, numberIndex);
  const symbolIsSame = getArrayIsSame(normalStyleValueObj.symbolCont, symbolCont);
  return numberIsSame && symbolIsSame;
};
export const getArrayIsSame = (normalArr: [], newArr: []) => {
  let isSame = true;
  normalArr.forEach((item, index) => {
    if (newArr[index] !== item) {
      isSame = false;
    }
  });
  return isSame && normalArr.length === newArr.length;
};
export const getValueTrim = (str: string) => {
  return str.replace(/\s/g, '');
};
export const getweeksFormatValue = (year: number, weeks: number, format: string) => {
  let yearmark = '';
  let weekmark = '';
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'Y' || format[i] === 'y') {
      yearmark += format[i];
    }
    if (format[i] === 'W' || format[i] === 'w') {
      weekmark += format[i];
    }
  }
  const newYear = moment()
    .set({ year })
    .format(yearmark);
  const getCover = (digit: number) => {
    let covers = '';
    for (let i = digit; i < weekmark.length; i++) {
      covers += '0';
    }
    return covers;
  };
  const SingleNumberCover = getCover(1);
  const doubleNumberCover = getCover(2);
  const WeeksStr = weeks.toString();
  const { length } = WeeksStr;
  const newWeeks = length === 1 ? SingleNumberCover + weeks : doubleNumberCover + weeks;
  const repalceYear = format.replace(yearmark, newYear);
  const newValue = repalceYear.replace(weekmark, newWeeks);
  return newValue;
};
