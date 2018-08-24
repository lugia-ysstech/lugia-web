//@flow

//汉字的数字

const cnNums = Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
//基本单位
const cnIntRadice = Array('', '拾', '佰', '仟');
//对应整数部分扩展单位
const cnIntUnits = Array('', '万', '亿', '兆');
//对应小数部分单位
const cnDecUnits = Array('角', '分', '厘');
//整数金额时后面跟的字符
const cnInteger = '整';
//整型完以后的单位
const cnIntLast = '元';
const zero = '零元整';
//最大处理的数字
const maxNum = 9999999999999999.999;
//符号
const negative = '负';

export function convertCurrency(value: string | number) {
  //输出的中文金额字符串
  let chineseStr = '';
  //'-'
  let minus = '';
  if (value === '') {
    return '';
  }
  if (Number(value) < 0) {
    value = (value + '').substr(1);
    minus = negative;
  }
  value = parseFloat(value);
  if (value >= maxNum) {
    //超出最大处理数字
    return '超出输入范围';
  }
  if (value === 0) {
    return zero;
  }
  //转换为字符串
  value = value.toString();
  //分离金额后用的数组，预定义
  const parts = value.split('.');
  //金额整数部分
  const integerNum = value.split('.') ? parts[0] : value;
  //金额小数部分
  const decimalNum = value.split('.').length > 1 ? parts[1].substr(0, 3) : '';
  // }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    for (let i = 0; i < integerNum.length; i++) {
      const n = integerNum.substr(i, 1);
      const p = integerNum.length - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  chineseStr +=
    chineseStr === '' ? cnNums[0] + cnIntLast + cnInteger : decimalNum === '' ? cnInteger : '';
  return minus + chineseStr;
}

export function converAmount(val: string): number {
  let minus = '';
  if (!val) {
    return 0;
  }

  if (val.substr(0, 1) === negative) {
    minus = '-';
  }
  const splitByYuan = val.split(cnIntLast);
  const integerPart = splitByYuan[0];
  const integerVal = integerPart ? getIntegerValue(integerPart) : 0;

  const floatStr = splitByYuan[1];
  const floatPart = floatStr && floatStr !== cnInteger ? floatStr : null;
  const floatVal = floatPart ? getFloatValue(floatPart) : 0;
  return Number(minus + (integerVal + floatVal));
}

function getFloatValue(floatPart: string) {
  return parseFloatForNumber(parseNumberAndUnit(floatPart));
}

const cn2number = {
  零: 0,
  壹: 1,
  贰: 2,
  叁: 3,
  肆: 4,
  伍: 5,
  陆: 6,
  柒: 7,
  捌: 8,
  玖: 9,
};

const unit = {
  拾: 10,
  佰: 100,
  仟: 1000,
  万: 10000,
  亿: 100000000,
  兆: 1000000000000,
};

function parseNumberAndUnit(val: string) {
  const result = [];
  const valArray = val.split('');
  valArray.forEach(v => {
    const number = cn2number[v];
    const isNumber = number !== undefined;
    if (isNumber) {
      result.push(number);
    }
    const unitElement = unit[v];
    const isUnit = unitElement !== undefined;
    if (isUnit) {
      result.push(unitElement);
    }
  });
  return result;
}

function getIntegerValue(intPart: string) {
  const unitNumbers = parseNumberAndUnit(intPart);

  const numbers = [];

  unitNumbers.forEach((v, i) => {
    const isLess10000 = v > 9 && v < 10000;
    if (isLess10000 && i > 0) {
      numbers[numbers.length - 1] = unitNumbers[i - 1] * v;
    } else {
      numbers.push(v);
    }
  });

  const result = [];
  let sum = 0;
  let cnt = 0;
  numbers.forEach(v => {
    if (v >= 10000) {
      sum = sum * v;
      result.splice(result.length - cnt, cnt, sum);
      sum = 0;
      cnt = 0;
    } else {
      cnt++;
      sum += v;
      result.push(v);
    }
  });

  return parseIntForNumber(result);
}

function parseIntForNumber(result: number[]) {
  const totalBit = result.length - 1;
  let res = 0;
  result.forEach((v, i) => {
    if (v > 9) {
      res += v;
    } else {
      res += v * Math.pow(10, totalBit - i);
    }
  });
  return res;
}

function parseFloatForNumber(result: number[]) {
  let res = 0;
  result.forEach((v, i) => {
    res += v * Math.pow(10, -(i + 1));
  });
  return res;
}

export function tipTool(value: string, formatter: Function): string {
  if (value && formatter) {
    return formatter(value);
  }
  return '';
}

export function amountFormatter(value: string) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const parser = (value: string) => {
  return value.replace(/\$\s?|(,*)/g, '');
};

export function isAmount(value: string): boolean {
  if (value === undefined) {
    return false;
  }
  return (value + '').indexOf('元') === -1;
}

/**
 *  获取input框中的光标的位置兼容ie8
 * @param el
 * @returns {{start: number, end: number}}
 */
export function getInputSelection(el: HTMLInputElement) {
  let start = 0,
    end = 0,
    normalizedValue,
    range,
    textInputRange,
    len,
    endRange;

  if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();
    if (range && range.parentElement() == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, '\n');

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart('character', -len);
        start += normalizedValue.slice(0, start).split('\n').length - 1;

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd('character', -len);
          end += normalizedValue.slice(0, end).split('\n').length - 1;
        }
      }
    }
  }
  return {
    start,
    end,
  };
}

/**
 *  移动光标的位置
 *  inputDom 目标input框的dom对象
 *  newCursorPos 光标的目标位置
 */

export function moveInputCursorPos(inputDom: Object, newCursorPos: number) {
  if (inputDom.setSelectionRange) {
    inputDom.setSelectionRange(newCursorPos, newCursorPos);
  } else if (inputDom.createTextRange) {
    const txtRange = inputDom.createTextRange();
    txtRange.collapse(true);
    txtRange.move('character', newCursorPos);
    txtRange.select();
  }
}

/**
 *  获取操作过后光标的位置
 * @param nowDisplayValue   触发操作后文本框中显示的值
 * @param nextValue 触发操作后文本框中的值
 * @param curPos  触发操作后文本框中光标的位置
 * @returns {number}
 */

export function getNowPos(nowDisplayValue: string, nextValue: string, curPos: number): number {
  const subNowDisplayValue = nowDisplayValue.substr(0, curPos);
  const posValue = subNowDisplayValue.replace(/,/g, '').split('');
  const nextDispalyValue = amountFormatter(nextValue).split('');
  let posFind = 0;
  let i = 0;
  for (; i < nextDispalyValue.length && posFind < posValue.length; i++) {
    if (nextDispalyValue[i] === ',') {
      continue;
    }
    if (posValue[posFind] === nextDispalyValue[i]) {
      posFind++;
    }
  }
  return i;
}
