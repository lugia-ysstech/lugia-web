/*
 * by wangcuixia
 * @flow
 * */
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'jest-styled-components';
import {
  getDates,
  getWeeksRangeInDates,
  getRangeIndexfromWeeks,
  getWeeksRange,
  getCoversTimes,
} from '../utils/differUtils';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function utilsGetDates(title: string, param: Object, expValue: Array<string>) {
    it(`getDates ${title}`, () => {
      const { days, mode, value, params } = param;
      const { dates } = getDates(days, mode, value, params);
      expect(dates).toEqual(expValue);
    });
  }
  utilsGetDates(
    'getDates Function 1',
    {
      days: [
        28,
        29,
        30,
        31,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ],
      mode: 'date',
      value: '2018-02-03',
      params: {
        weekIndex: 4,
        format: 'YYYY-MM-DD',
        year: 2018,
        month: 1,
        maxDay: 28,
      },
    },
    [
      '2018-01-28',
      '2018-01-29',
      '2018-01-30',
      '2018-01-31',
      '2018-02-01',
      '2018-02-02',
      '2018-02-03',
      '2018-02-04',
      '2018-02-05',
      '2018-02-06',
      '2018-02-07',
      '2018-02-08',
      '2018-02-09',
      '2018-02-10',
      '2018-02-11',
      '2018-02-12',
      '2018-02-13',
      '2018-02-14',
      '2018-02-15',
      '2018-02-16',
      '2018-02-17',
      '2018-02-18',
      '2018-02-19',
      '2018-02-20',
      '2018-02-21',
      '2018-02-22',
      '2018-02-23',
      '2018-02-24',
      '2018-02-25',
      '2018-02-26',
      '2018-02-27',
      '2018-02-28',
      '2018-03-01',
      '2018-03-02',
      '2018-03-03',
      '2018-03-04',
      '2018-03-05',
      '2018-03-06',
      '2018-03-07',
      '2018-03-08',
      '2018-03-09',
      '2018-03-10',
    ]
  );
  utilsGetDates(
    'getDates Function 2',
    {
      days: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ],
      mode: 'date',
      value: '2018-04-07',
      params: {
        weekIndex: 0,
        format: 'YYYY-MM-DD',
        year: 2018,
        month: 3,
        maxDay: 30,
      },
    },
    [
      '2018-04-01',
      '2018-04-02',
      '2018-04-03',
      '2018-04-04',
      '2018-04-05',
      '2018-04-06',
      '2018-04-07',
      '2018-04-08',
      '2018-04-09',
      '2018-04-10',
      '2018-04-11',
      '2018-04-12',
      '2018-04-13',
      '2018-04-14',
      '2018-04-15',
      '2018-04-16',
      '2018-04-17',
      '2018-04-18',
      '2018-04-19',
      '2018-04-20',
      '2018-04-21',
      '2018-04-22',
      '2018-04-23',
      '2018-04-24',
      '2018-04-25',
      '2018-04-26',
      '2018-04-27',
      '2018-04-28',
      '2018-04-29',
      '2018-04-30',
      '2018-05-01',
      '2018-05-02',
      '2018-05-03',
      '2018-05-04',
      '2018-05-05',
      '2018-05-06',
      '2018-05-07',
      '2018-05-08',
      '2018-05-09',
      '2018-05-10',
      '2018-05-11',
      '2018-05-12',
    ]
  );
  utilsGetDates(
    'getDates Function 3',
    {
      days: [
        31,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
      ],
      mode: 'date',
      value: '2019-04-07',
      params: {
        weekIndex: 1,
        format: 'YYYY-MM-DD',
        year: 2019,
        month: 3,
        maxDay: 30,
      },
    },
    [
      '2019-03-31',
      '2019-04-01',
      '2019-04-02',
      '2019-04-03',
      '2019-04-04',
      '2019-04-05',
      '2019-04-06',
      '2019-04-07',
      '2019-04-08',
      '2019-04-09',
      '2019-04-10',
      '2019-04-11',
      '2019-04-12',
      '2019-04-13',
      '2019-04-14',
      '2019-04-15',
      '2019-04-16',
      '2019-04-17',
      '2019-04-18',
      '2019-04-19',
      '2019-04-20',
      '2019-04-21',
      '2019-04-22',
      '2019-04-23',
      '2019-04-24',
      '2019-04-25',
      '2019-04-26',
      '2019-04-27',
      '2019-04-28',
      '2019-04-29',
      '2019-04-30',
      '2019-05-01',
      '2019-05-02',
      '2019-05-03',
      '2019-05-04',
      '2019-05-05',
      '2019-05-06',
      '2019-05-07',
      '2019-05-08',
      '2019-05-09',
      '2019-05-10',
      '2019-05-11',
    ]
  );
  utilsGetDates(
    'getDates Function 4',
    {
      days: [
        28,
        29,
        30,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ],
      mode: 'date',
      value: '2019-05-07',
      params: {
        weekIndex: 3,
        format: 'YYYY-MM-DD',
        year: 2019,
        month: 4,
        maxDay: 31,
      },
    },
    [
      '2019-04-28',
      '2019-04-29',
      '2019-04-30',
      '2019-05-01',
      '2019-05-02',
      '2019-05-03',
      '2019-05-04',
      '2019-05-05',
      '2019-05-06',
      '2019-05-07',
      '2019-05-08',
      '2019-05-09',
      '2019-05-10',
      '2019-05-11',
      '2019-05-12',
      '2019-05-13',
      '2019-05-14',
      '2019-05-15',
      '2019-05-16',
      '2019-05-17',
      '2019-05-18',
      '2019-05-19',
      '2019-05-20',
      '2019-05-21',
      '2019-05-22',
      '2019-05-23',
      '2019-05-24',
      '2019-05-25',
      '2019-05-26',
      '2019-05-27',
      '2019-05-28',
      '2019-05-29',
      '2019-05-30',
      '2019-05-31',
      '2019-06-01',
      '2019-06-02',
      '2019-06-03',
      '2019-06-04',
      '2019-06-05',
      '2019-06-06',
      '2019-06-07',
      '2019-06-08',
    ]
  );
  utilsGetDates(
    'getDates Function 5',
    {
      days: [
        28,
        29,
        30,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ],
      mode: 'weeks',
      value: '2019-05-07',
      params: {
        weekIndex: 3,
        format: 'YYYY-MM-DD',
        year: 2019,
        month: 4,
        maxDay: 31,
      },
    },
    [
      '2019-04-28',
      '2019-04-29',
      '2019-04-30',
      '2019-05-01',
      '2019-05-02',
      '2019-05-03',
      '2019-05-04',
      '2019-05-05',
      '2019-05-06',
      '2019-05-07',
      '2019-05-08',
      '2019-05-09',
      '2019-05-10',
      '2019-05-11',
      '2019-05-12',
      '2019-05-13',
      '2019-05-14',
      '2019-05-15',
      '2019-05-16',
      '2019-05-17',
      '2019-05-18',
      '2019-05-19',
      '2019-05-20',
      '2019-05-21',
      '2019-05-22',
      '2019-05-23',
      '2019-05-24',
      '2019-05-25',
      '2019-05-26',
      '2019-05-27',
      '2019-05-28',
      '2019-05-29',
      '2019-05-30',
      '2019-05-31',
      '2019-06-01',
      '2019-06-02',
      '2019-06-03',
      '2019-06-04',
      '2019-06-05',
      '2019-06-06',
      '2019-06-07',
      '2019-06-08',
    ]
  );
  function utilsGetWeeksRangeInDates(title: string, moments: Object, expValue: Object) {
    it(`WeeksPicker ${title}`, () => {
      const obj = getWeeksRangeInDates(moments);
      for (const i in obj) {
        expect(obj[i]).toBe(expValue[i]);
      }
    });
  }
  const momentsFunc = (number: number) => () => {
    return number;
  };
  utilsGetWeeksRangeInDates(
    'getWeeksRangeInDates Function 1',
    {
      month: momentsFunc(10),
      year: momentsFunc(2018),
      weeks: momentsFunc(47),
    },
    { month: 10, year: 2018, weeks: 47 }
  );
  utilsGetWeeksRangeInDates(
    'getWeeksRangeInDates Function 2',
    {
      month: momentsFunc(0),
      year: momentsFunc(2018),
      weeks: momentsFunc(1),
    },
    { month: 0, year: 2018, weeks: 1 }
  );
  utilsGetWeeksRangeInDates(
    'getWeeksRangeInDates Function 3',
    {
      month: momentsFunc(11),
      year: momentsFunc(2018),
      weeks: momentsFunc(1),
    },
    { month: 11, year: 2019, weeks: 1 }
  );
  //utils
  const mockMoments = (number: number, isStartOfWeek: boolean) => {
    let funcName = 'startOf';
    if (!isStartOfWeek) {
      funcName = 'endOf';
    }
    const startOf = () => {
      const date = () => {
        return number;
      };
      return { date };
    };
    return { [funcName]: startOf };
  };

  function testGetRangeIndexfromWeeks(title: string, params: Object, expValue: Array<number>) {
    it(`DatePicker ${title}`, () => {
      const { weekStartDate, weekIndex, isStartOfWeek } = params;
      const moments = mockMoments(weekStartDate, isStartOfWeek);
      const { endInWeeks, startInWeeks } = getRangeIndexfromWeeks(
        moments,
        weekIndex,
        isStartOfWeek
      );
      expect(startInWeeks).toBe(expValue[0]);
      expect(endInWeeks).toBe(expValue[1]);
    });
  }
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-1 true',
    { weekStartDate: 9, weekIndex: 6, isStartOfWeek: true },
    [15, 21]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-2 true',
    { weekStartDate: 2, weekIndex: 6, isStartOfWeek: true },
    [8, 14]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-3 true',
    { weekStartDate: 2, weekIndex: 6, isStartOfWeek: true },
    [8, 14]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-4 true',
    { weekStartDate: 30, weekIndex: 6, isStartOfWeek: true },
    [36, 42]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-5 false',
    { weekStartDate: 5, weekIndex: 2, isStartOfWeek: false },
    [1, 7]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-6 false',
    { weekStartDate: 1, weekIndex: 6, isStartOfWeek: false },
    [1, 7]
  );
  testGetRangeIndexfromWeeks(
    'getRangeIndexfromWeeks-6 false',
    { weekStartDate: 4, weekIndex: 3, isStartOfWeek: false },
    [1, 7]
  );
  function utilsGetWeeksRange(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const { weeks, step } = props;
      const { weeksInYear } = params;
      const { weeksDate, rangeIndex } = getWeeksRange(weeks, weeksInYear, step);
      expect(weeksDate).toEqual(expValue.weeksDate);
      expect(rangeIndex).toEqual(expValue.rangeIndex);
    });
  }
  utilsGetWeeksRange(
    'getWeeksRange 1',
    { mode: 'week', weeks: 2, step: 12 },
    { weeksInYear: 52 },
    {
      weeksDate: [
        { end: 12, index: 0, start: 1, text: '1-12周', value: 0 },
        { end: 24, index: 1, start: 13, text: '13-24周', value: 1 },
        { end: 36, index: 2, start: 25, text: '25-36周', value: 2 },
        { end: 48, index: 3, start: 37, text: '37-48周', value: 3 },
        { end: 52, index: 4, start: 49, text: '49-52周', value: 4 },
      ],
      rangeIndex: 0,
    }
  );
  utilsGetWeeksRange(
    'getWeeksRange 2',
    { mode: 'week', weeks: 10, step: 12 },
    { weeksInYear: 53 },
    {
      weeksDate: [
        { end: 12, index: 0, start: 1, text: '1-12周', value: 0 },
        { end: 24, index: 1, start: 13, text: '13-24周', value: 1 },
        { end: 36, index: 2, start: 25, text: '25-36周', value: 2 },
        { end: 48, index: 3, start: 37, text: '37-48周', value: 3 },
        { end: 53, index: 4, start: 49, text: '49-53周', value: 4 },
      ],
      rangeIndex: 0,
    }
  );
  utilsGetWeeksRange(
    'getWeeksRange 3',
    { mode: 'week', weeks: 11, step: 10 },
    { weeksInYear: 53 },
    {
      weeksDate: [
        { end: 10, index: 0, start: 1, text: '1-10周', value: 0 },
        { end: 20, index: 1, start: 11, text: '11-20周', value: 1 },
        { end: 30, index: 2, start: 21, text: '21-30周', value: 2 },
        { end: 40, index: 3, start: 31, text: '31-40周', value: 3 },
        { end: 50, index: 4, start: 41, text: '41-50周', value: 4 },
        { end: 53, index: 5, start: 51, text: '51-53周', value: 5 },
      ],
      rangeIndex: 1,
    }
  );
  utilsGetWeeksRange(
    'getWeeksRange 4',
    { mode: 'month', weeks: 53, step: 10 },
    { weeksInYear: 53 },
    {
      weeksDate: [
        { end: 10, index: 0, start: 1, text: '1-10周', value: 0 },
        { end: 20, index: 1, start: 11, text: '11-20周', value: 1 },
        { end: 30, index: 2, start: 21, text: '21-30周', value: 2 },
        { end: 40, index: 3, start: 31, text: '31-40周', value: 3 },
        { end: 50, index: 4, start: 41, text: '41-50周', value: 4 },
        { end: 53, index: 5, start: 51, text: '51-53周', value: 5 },
      ],
      rangeIndex: 5,
    }
  );

  function TimeFunctionGetCoversTimes(title: string, params: Object, expValue: Array<any>) {
    it(`${title}`, () => {
      const { data, number, item } = params;
      const result = getCoversTimes(data, number, item);
      expect(result).toEqual(expValue);
    });
  }
  TimeFunctionGetCoversTimes('getCoversTimes 1', { data: [1, 2, 3, 4], number: 7, item: {} }, [
    1,
    2,
    3,
    4,
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  TimeFunctionGetCoversTimes('getCoversTimes 2', { data: [1, 2, 3, 4], number: 6, item: 'b' }, [
    1,
    2,
    3,
    4,
    'b',
    'b',
    'b',
    'b',
    'b',
  ]);
  TimeFunctionGetCoversTimes('getCoversTimes 3', { data: [1], number: 6, item: 'c' }, [
    1,
    'c',
    'c',
    'c',
    'c',
    'c',
  ]);
  TimeFunctionGetCoversTimes('getCoversTimes 4', { data: [1, 2], number: 5, item: 'd' }, [
    1,
    2,
    'd',
    'd',
    'd',
    'd',
  ]);
});
