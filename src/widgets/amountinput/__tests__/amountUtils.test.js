//@flow
import { amountFormatter, converAmount, convertCurrency, getNowPos } from '../amountUtils';

describe('utils', () => {
  it(' convertAmount ', () => {
    expect(converAmount(convertCurrency(1.23))).toBe(1.23);
    expect(converAmount(convertCurrency(222.999))).toBe(222.999);

    for (let i = 0; i < 10000; i += 1) {
      const rmb = convertCurrency(i);
      expect(i).toBe(converAmount(rmb));
    }
    for (let i = 0; i < 9999 * 10000; i += 10000) {
      const rmb = convertCurrency(i);
      expect(i).toBe(converAmount(rmb));
    }
    for (let i = 0; i < 9999 * 10000 * 10000; i += 10000 * 10000) {
      const rmb = convertCurrency(i);
      expect(i).toBe(converAmount(rmb));
    }

    for (let i = 0; i < 9999 * 10000 * 10000 * 10000; i += 10000 * 10000 * 10000) {
      const rmb = convertCurrency(i);
      expect(i).toBe(converAmount(rmb));
    }

    const value = 1111111111111111;
    expect(converAmount(convertCurrency(value))).toBe(value);
  });

  function testConvertCurrencyCall(value: string | number, expectValue: string) {
    it(` convertCurrencyCall ${value} `, () => {
      expect(convertCurrency(value)).toBe(expectValue);
    });
  }

  testConvertCurrencyCall('', '');
  testConvertCurrencyCall('0.000', '零元整');
  testConvertCurrencyCall('1.000', '壹元整');
  testConvertCurrencyCall('1.100', '壹元壹角');
  testConvertCurrencyCall('1.234', '壹元贰角叁分肆厘');
  testConvertCurrencyCall('1', '壹元整');
  testConvertCurrencyCall('12', '壹拾贰元整');
  testConvertCurrencyCall('123', '壹佰贰拾叁元整');
  testConvertCurrencyCall('1234', '壹仟贰佰叁拾肆元整');
  testConvertCurrencyCall('1234.1', '壹仟贰佰叁拾肆元壹角');
  testConvertCurrencyCall('1234.12', '壹仟贰佰叁拾肆元壹角贰分');
  testConvertCurrencyCall('1234.123', '壹仟贰佰叁拾肆元壹角贰分叁厘');
  testConvertCurrencyCall('12345', '壹万贰仟叁佰肆拾伍元整');
  testConvertCurrencyCall('123456', '壹拾贰万叁仟肆佰伍拾陆元整');
  testConvertCurrencyCall('1234567', '壹佰贰拾叁万肆仟伍佰陆拾柒元整');
  testConvertCurrencyCall('12345678', '壹仟贰佰叁拾肆万伍仟陆佰柒拾捌元整');
  testConvertCurrencyCall('123456789', '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整');
  testConvertCurrencyCall('1234567890', '壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元整');
  testConvertCurrencyCall('12345678901', '壹佰贰拾叁亿肆仟伍佰陆拾柒万捌仟玖佰零壹元整');
  testConvertCurrencyCall('123456789012', '壹仟贰佰叁拾肆亿伍仟陆佰柒拾捌万玖仟零壹拾贰元整');
  testConvertCurrencyCall('1234567890123', '壹兆贰仟叁佰肆拾伍亿陆仟柒佰捌拾玖万零壹佰贰拾叁元整');
  testConvertCurrencyCall(
    '12345678901234',
    '壹拾贰兆叁仟肆佰伍拾陆亿柒仟捌佰玖拾万零壹仟贰佰叁拾肆元整'
  );
  testConvertCurrencyCall(
    '123456789012345',
    '壹佰贰拾叁兆肆仟伍佰陆拾柒亿捌仟玖佰零壹万贰仟叁佰肆拾伍元整'
  );
  testConvertCurrencyCall(
    '1234567890123456',
    '壹仟贰佰叁拾肆兆伍仟陆佰柒拾捌亿玖仟零壹拾贰万叁仟肆佰伍拾陆元整'
  );
  testConvertCurrencyCall('1234567890123456789', '超出输入范围');
  testConvertCurrencyCall(0, '零元整');
  testConvertCurrencyCall(111, '壹佰壹拾壹元整');
  testConvertCurrencyCall(1234, '壹仟贰佰叁拾肆元整');
  testConvertCurrencyCall(123456789, '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整');
  testConvertCurrencyCall(
    1234567890123456,
    '壹仟贰佰叁拾肆兆伍仟陆佰柒拾捌亿玖仟零壹拾贰万叁仟肆佰伍拾陆元整'
  );
  testConvertCurrencyCall(
    9999999999999998,
    '玖仟玖佰玖拾玖兆玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾捌元整'
  );
  testConvertCurrencyCall(9999999999999999, '超出输入范围');
  testConvertCurrencyCall('.9.9.9.9.9.9.9.9.9.9999', '玖角');
  testConvertCurrencyCall('9.99.9.9.9.9.9.9.9.9.9.9999', '玖元玖角玖分');
  testConvertCurrencyCall('.999.9.9.9.9.9.9.9999', '玖角玖分玖厘');
  testConvertCurrencyCall('9.999.9.9.9.9.9.9.9999', '玖元玖角玖分玖厘');

  function testAmountFormatter(value: string, expectValue: string) {
    it(` amountFormatter ${value} `, () => {
      expect(amountFormatter(value)).toBe(expectValue);
    });
  }

  testAmountFormatter('', '');
  testAmountFormatter('0000', '0,000');
  testAmountFormatter('11111', '11,111');
  testAmountFormatter('123456', '123,456');
  testAmountFormatter('123456.00', '123,456.00');

  function testTipTool(value: string, formatter: Function, expectValue: string) {
    it(` amountFormatter ${value} `, () => {
      expect(formatter(value)).toBe(expectValue);
    });
  }

  testTipTool('123456', amountFormatter, '123,456');
  testTipTool('123456', convertCurrency, '壹拾贰万叁仟肆佰伍拾陆元整');

  function testGetNowPos(
    nextValue: string,
    nowDisplayValue: string,
    curPos: number,
    expCurPos: number
  ) {
    it(` GetNowPos ${nowDisplayValue} -->${nextValue} `, () => {
      expect(getNowPos(nowDisplayValue, nextValue, curPos)).toBe(expCurPos);
    });
  }

  //正序增加
  testGetNowPos('1', '1', 1, 1);
  testGetNowPos('12', '12', 2, 2);
  testGetNowPos('123', '123', 3, 3);
  testGetNowPos('1234', '1234', 4, 5);
  testGetNowPos('12345', '1,2345', 6, 6);
  testGetNowPos('123456', '12,3456', 7, 7);
  testGetNowPos('1234567', '123,4567', 8, 9);
  testGetNowPos('12345678', '1,234,5678', 10, 10);
  testGetNowPos('12345678.', '12,345,678.', 11, 11);
  testGetNowPos('12345678.1', '12,345,678.1', 12, 12);
  testGetNowPos('12345678.12', '12,345,678.12', 13, 13);

  //删除操作
  //全部选中，用输入的新增替换
  testGetNowPos('1', '12,345,678.1', 1, 1);
  testGetNowPos('1', '12,345,678', 1, 1);

  //选中后面单个值，用输入值进行替换
  //原始值：12,345,678.12
  testGetNowPos('12345671', '12,345,671', 10, 10);
  testGetNowPos('12345678.18', '12,345,678.18', 13, 13);

  //选中后面多个值，用输入值进行替换
  //原始值：12,345,678.12
  testGetNowPos('12345678.3', '12,345,678.3', 12, 12);
  testGetNowPos('123456783', '12,345,6783', 11, 11);
  testGetNowPos('12345673', '12,345,673', 10, 10);
  testGetNowPos('1234563', '12,345,63', 9, 9);
  testGetNowPos('123453', '12,345,3', 8, 7);
  testGetNowPos('123453', '12,3453', 7, 7);
  testGetNowPos('12343', '12,343', 6, 6);
  testGetNowPos('1233', '12,33', 5, 5);
  testGetNowPos('123', '12,3', 4, 3);
  testGetNowPos('123', '123', 3, 3);
  testGetNowPos('13', '13', 2, 2);

  //选中前面单个值，用输入值进行替换
  testGetNowPos('22345678', '22,345,678', 1, 1);
  testGetNowPos('22345678.12', '22,345,678.12', 1, 1);
  testGetNowPos('212345678.12', '212,345,678.12', 1, 1);

  //选中前面多个值，用输入值进行替换
  //原始值：12,345,678.12
  testGetNowPos('2345678.12', '2,345,678.12', 1, 1);
  testGetNowPos('2345678.12', '2345,678.12', 1, 1);
  testGetNowPos('245678.12', '245,678.12', 1, 1);
  testGetNowPos('2678.12', '2,678.12', 1, 1);
  testGetNowPos('2678.12', '2678.12', 1, 1);

  //选中中间单个值，用输入值进行替换
  //原始值：12,345,678.12
  testGetNowPos('12345678.22', '12,345,678.22', 12, 12);
  testGetNowPos('12345678212', '12,345,678212', 11, 12);
  testGetNowPos('12345672.12', '12,345,672.12', 10, 10);
  testGetNowPos('12345628.12', '12,345,628.12', 9, 9);
  testGetNowPos('122345678.12', '122345,678.12', 3, 3);
  testGetNowPos('13345678.12', '13,345,678.12', 2, 2);

  //选中中间多个值，用输入值进行替换
  // 从左往右选中两位进行替换
  //原始数据为123,456.12
  testGetNowPos('19456.12', '19,456.12', 2, 2);
  testGetNowPos('129456.12', '129456.12', 3, 3);
  testGetNowPos('123956.12', '123956.12', 4, 5);
  testGetNowPos('12396.12', '123,96.12', 5, 5);
  testGetNowPos('12345912', '123,45912', 7, 8);

  // 从左往右选中三位进行替换
  //原始数据为123,456.12
  testGetNowPos('19456.12', '19456.12', 2, 2);
  testGetNowPos('12956.12', '12956.12', 3, 4);
  testGetNowPos('12396.12', '12396.12', 4, 5);
  testGetNowPos('1239.12', '123,9.12', 5, 5);
  testGetNowPos('1234912', '123,4912', 6, 7);
  testGetNowPos('1234592', '123,4592', 7, 8);

  // 从左往右选中四位进行替换
  //原始数据为123,456.12
  testGetNowPos('1956.12', '1956.12', 2, 3);
  testGetNowPos('1296.12', '1296.12', 3, 4);
  testGetNowPos('1239.12', '1239.12', 4, 5);
  testGetNowPos('123912', '123,912', 5, 5);
  testGetNowPos('123492', '123,492', 6, 6);

  // 从左往右选中五位进行替换
  //原始数据为123,456.12
  testGetNowPos('196.12', '1956.12', 2, 2);
  testGetNowPos('129.12', '129.12', 3, 3);
  testGetNowPos('123912', '123912', 4, 5);
  testGetNowPos('12392', '123,92', 5, 5);

  // 从左往右选中六位进行替换
  //原始数据为123,456.12
  testGetNowPos('19.12', '19.12', 2, 2);
  testGetNowPos('12912', '12912', 3, 4);
  testGetNowPos('12392', '12392', 4, 5);

  // 从左往右选中七位进行替换
  //原始数据为123,456.12
  testGetNowPos('1912', '1912', 2, 3);
  testGetNowPos('1292', '1292', 3, 4);
  // 从左往右选中八位进行替换
  //原始数据为123,456.12
  testGetNowPos('192', '192', 2, 2);

  //从后往前，逐个删除
  //原始值：12,345,678.12
  testGetNowPos('12345678.1', '12,345,678.1', 12, 12);
  testGetNowPos('12345678.', '12,345,678.', 11, 11);
  testGetNowPos('12345678', '12,345,678', 10, 10);
  testGetNowPos('1234567', '12,345,67', 9, 9);
  testGetNowPos('123456', '1,234,56', 8, 7);
  testGetNowPos('12345', '123,45', 6, 6);
  testGetNowPos('1234', '12,34', 5, 5);
  testGetNowPos('123', '1,23', 4, 3);
  testGetNowPos('12', '12', 2, 2);
  testGetNowPos('1', '1', 1, 1);
  testGetNowPos('', '', 0, 0);

  //从后往前，多个删除
  //原始值：12,345,678.12
  testGetNowPos('12345678.', '12,345,678.', 11, 11);
  testGetNowPos('12345678', '12,345,678', 10, 10);
  testGetNowPos('1234567', '12,345,67', 9, 9);
  testGetNowPos('123456', '12,345,6', 8, 7);
  testGetNowPos('12345', '12,345,', 7, 6);
  testGetNowPos('12345', '12,345', 6, 6);
  testGetNowPos('1234', '12,34', 5, 5);
  testGetNowPos('123', '12,3', 4, 3);
  testGetNowPos('12', '12,', 3, 2);
  testGetNowPos('12', '12', 2, 2);
  testGetNowPos('1', '1', 1, 1);

  //从前往后，逐个删除
  //原始值：12,345,678.12
  testGetNowPos('2345678.12', '2,345,678.12', 0, 0);
  testGetNowPos('345678.12', ',345,678.12', 0, 0);
  testGetNowPos('45678.12', '45,678.12', 0, 0);
  testGetNowPos('5678.12', '5,678.12', 0, 0);
  testGetNowPos('678.12', ',678.12', 0, 0);
  testGetNowPos('8.12', '8.12', 0, 0);

  //从前往后，多个删除
  //原始值：12,345,678.12
  testGetNowPos('345678.12', ',345,678.12', 0, 0);
  testGetNowPos('345678.12', '345,678.12', 0, 0);
  testGetNowPos('45678.12', '45,678.12', 0, 0);
  testGetNowPos('5678.12', '5,678.12', 0, 0);
  testGetNowPos('678.12', ',678.12', 0, 0);
  testGetNowPos('678.12', '678.12', 0, 0);
  testGetNowPos('78.12', '78.12', 0, 0);

  //从中间位置，单个删除
  //原始值：12,345,678.12
  //两种场景 ：从后向前 （backSpace）
  testGetNowPos('12345678.2', '12,345,678.2', 11, 11);
  testGetNowPos('1234567812', '12,345,67812', 10, 11);
  testGetNowPos('1234567.12', '12,345,67.12', 9, 9);
  testGetNowPos('1234568.12', '12,345,68.12', 8, 8);
  testGetNowPos('1234578.12', '12,345,78.12', 7, 7);
  testGetNowPos('12345678.12', '12,345678.12', 6, 6);
  testGetNowPos('1234678.12', '12,34,678.12', 5, 5);
  testGetNowPos('1235678.12', '12,35,678.12', 4, 4);
  testGetNowPos('1245678.12', '12,45,678.12', 3, 3);
  testGetNowPos('12345678.12', '12345,678.12', 2, 2);
  testGetNowPos('1345678.12', '1,345,678.12', 1, 1);

  //从前向后(delete)
  //原始值：12,345,678.12
  testGetNowPos('1345678.12', '1,345,678.12', 1, 1);
  testGetNowPos('12345678.12', '12345,678.12', 2, 2);
  testGetNowPos('1245678.12', '12,45,678.12', 3, 3);
  testGetNowPos('1235678.12', '12,35,678.12', 4, 4);
  testGetNowPos('1234678.12', '12,34,678.12', 5, 5);
  testGetNowPos('12345678.12', '12,345678.12', 6, 6);
  testGetNowPos('1234578.12', '12,345,78.12', 7, 7);
  testGetNowPos('1234568.12', '12,345,68.12', 8, 8);
  testGetNowPos('1234567.12', '12,345,67.12', 9, 9);
  testGetNowPos('1234567812', '12,345,67812', 10, 11);
  testGetNowPos('12345678.2', '12,345,678.2', 11, 11);

  //从中间位置，多个删除
  //原始值为123,456.12
  // 从左往右选中两位进行替换
  testGetNowPos('1456.12', '1,456.12', 1, 1);
  testGetNowPos('12456.12', '12456.12', 2, 2);
  testGetNowPos('12356.12', '12356.12', 3, 4);
  testGetNowPos('1236.12', '123,6.12', 4, 4);
  testGetNowPos('1234.12', '123,4.12', 5, 5);
  testGetNowPos('1234512', '123,4512', 6, 7);
  testGetNowPos('1234562', '123,4562', 7, 8);

  // 从左往右选中三位进行替换
  //原始值为123,456.12
  testGetNowPos('1456.12', '1456.12', 1, 1);
  testGetNowPos('1256.12', '1256.12', 2, 3);
  testGetNowPos('1236.12', '1236.12', 3, 4);
  testGetNowPos('123.12', '123,.12', 4, 3);
  testGetNowPos('123412', '123,412', 5, 5);
  testGetNowPos('123452', '123,452', 6, 6);

  // 从左往右选中四位进行替换
  //原始值为：123,456.12
  testGetNowPos('156.12', '156.12', 1, 1);
  testGetNowPos('126.12', '126.12', 2, 2);
  testGetNowPos('123.12', '123.12', 3, 3);
  testGetNowPos('12312', '123,12', 4, 4);
  testGetNowPos('12342', '123,42', 5, 5);

  // 从左往右选中五位进行替换
  //原始值为123,456.12
  testGetNowPos('16.12', '16.12', 1, 1);
  testGetNowPos('12.12', '12.12', 2, 2);
  testGetNowPos('12312', '12312', 3, 4);
  testGetNowPos('1232', '123,2', 4, 4);

  // 从左往右选中六位进行替换
  //原始值为123,456.12
  testGetNowPos('1.12', '1.12', 1, 1);
  testGetNowPos('1212', '1212', 2, 3);
  testGetNowPos('1232', '1232', 3, 4);

  // 从左往右选中七位进行替换
  //原始值为123,456.12
  testGetNowPos('112', '112', 1, 1);
  testGetNowPos('122', '122', 2, 2);

  // 从左往右选中八位进行替换
  //原始值为123,456.12
  testGetNowPos('12', '12', 1, 1);
});
