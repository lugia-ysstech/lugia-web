import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import FacePanel from '../panel/FacePanel';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function getTarget(target, component) {
    const newTarget = target
      .find(component)
      .at(0)
      .instance();
    return newTarget;
  }
  const defaultTheme = {
    themeConfig: {},
    themeState: {},
    propsConfig: {},
  };
  function getYears(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const { start, step } = props;
      const years = newTarget.getYears(start, step);
      expect(years).toEqual(expValue);
    });
  }
  getYears('getYears 1', { showYears: false, mode: 'year', start: 2018, step: 12 }, [
    { text: 2017, value: 2017 },
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
    { text: 2028, value: 2028 },
  ]);
  getYears('getYears 2', { showYears: false, mode: 'year', start: 2018, step: 11 }, [
    { text: 2017, value: 2017 },
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
  ]);
  getYears('getYears 3', { showYears: false, mode: 'year', start: 2018, step: 14 }, [
    { text: 2017, value: 2017 },
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
    { text: 2028, value: 2028 },
    { text: 2029, value: 2029 },
    { text: 2030, value: 2030 },
  ]);
  getYears('getYears 4', { showYears: false, mode: 'year', start: 2017, step: 15 }, [
    { text: 2016, value: 2016 },
    { text: 2017, value: 2017 },
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
    { text: 2028, value: 2028 },
    { text: 2029, value: 2029 },
    { text: 2030, value: 2030 },
  ]);
  getYears('getYears 5', { showYears: false, mode: 'year', start: 2016, step: 16 }, [
    { text: 2015, value: 2015 },
    { text: 2016, value: 2016 },
    { text: 2017, value: 2017 },
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
    { text: 2028, value: 2028 },
    { text: 2029, value: 2029 },
    { text: 2030, value: 2030 },
  ]);
  function getRangeYears(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const { start, step } = props;
      const doubleYear = newTarget.getRangeYears(start, step);
      expect(doubleYear).toEqual(expValue);
    });
  }
  getRangeYears('getRangeYears 2', { showYears: true, mode: 'year', start: 2018, step: 12 }, [
    { end: 2017, start: 2006, text: '2006-2017', value: 2006 },
    { end: 2029, start: 2018, text: '2018-2029', value: 2018 },
    { end: 2041, start: 2030, text: '2030-2041', value: 2030 },
    { end: 2053, start: 2042, text: '2042-2053', value: 2042 },
    { end: 2065, start: 2054, text: '2054-2065', value: 2054 },
    { end: 2077, start: 2066, text: '2066-2077', value: 2066 },
    { end: 2089, start: 2078, text: '2078-2089', value: 2078 },
    { end: 2101, start: 2090, text: '2090-2101', value: 2090 },
    { end: 2113, start: 2102, text: '2102-2113', value: 2102 },
    { end: 2125, start: 2114, text: '2114-2125', value: 2114 },
    { end: 2137, start: 2126, text: '2126-2137', value: 2126 },
    { end: 2149, start: 2138, text: '2138-2149', value: 2138 },
  ]);
  getRangeYears('getRangeYears 3', { showYears: true, mode: 'year', start: 2016, step: 11 }, [
    { end: 2015, start: 2005, text: '2005-2015', value: 2005 },
    { end: 2026, start: 2016, text: '2016-2026', value: 2016 },
    { end: 2037, start: 2027, text: '2027-2037', value: 2027 },
    { end: 2048, start: 2038, text: '2038-2048', value: 2038 },
    { end: 2059, start: 2049, text: '2049-2059', value: 2049 },
    { end: 2070, start: 2060, text: '2060-2070', value: 2060 },
    { end: 2081, start: 2071, text: '2071-2081', value: 2071 },
    { end: 2092, start: 2082, text: '2082-2092', value: 2082 },
    { end: 2103, start: 2093, text: '2093-2103', value: 2093 },
    { end: 2114, start: 2104, text: '2104-2114', value: 2104 },
    { end: 2125, start: 2115, text: '2115-2125', value: 2115 },
  ]);
  getRangeYears('getRangeYears 4', { showYears: true, mode: 'year', start: 2016, step: 10 }, [
    { end: 2015, start: 2006, text: '2006-2015', value: 2006 },
    { end: 2025, start: 2016, text: '2016-2025', value: 2016 },
    { end: 2035, start: 2026, text: '2026-2035', value: 2026 },
    { end: 2045, start: 2036, text: '2036-2045', value: 2036 },
    { end: 2055, start: 2046, text: '2046-2055', value: 2046 },
    { end: 2065, start: 2056, text: '2056-2065', value: 2056 },
    { end: 2075, start: 2066, text: '2066-2075', value: 2066 },
    { end: 2085, start: 2076, text: '2076-2085', value: 2076 },
    { end: 2095, start: 2086, text: '2086-2095', value: 2086 },
    { end: 2105, start: 2096, text: '2096-2105', value: 2096 },
  ]);
  getRangeYears('getRangeYears 5', { showYears: true, mode: 'year', start: 2016, step: 9 }, [
    { end: 2015, start: 2007, text: '2007-2015', value: 2007 },
    { end: 2024, start: 2016, text: '2016-2024', value: 2016 },
    { end: 2033, start: 2025, text: '2025-2033', value: 2025 },
    { end: 2042, start: 2034, text: '2034-2042', value: 2034 },
    { end: 2051, start: 2043, text: '2043-2051', value: 2043 },
    { end: 2060, start: 2052, text: '2052-2060', value: 2052 },
    { end: 2069, start: 2061, text: '2061-2069', value: 2061 },
    { end: 2078, start: 2070, text: '2070-2078', value: 2070 },
    { end: 2087, start: 2079, text: '2079-2087', value: 2079 },
  ]);
  getRangeYears('getRangeYears 6', { showYears: true, mode: 'year', start: 2018, step: 12 }, [
    { end: 2017, start: 2006, text: '2006-2017', value: 2006 },
    { end: 2029, start: 2018, text: '2018-2029', value: 2018 },
    { end: 2041, start: 2030, text: '2030-2041', value: 2030 },
    { end: 2053, start: 2042, text: '2042-2053', value: 2042 },
    { end: 2065, start: 2054, text: '2054-2065', value: 2054 },
    { end: 2077, start: 2066, text: '2066-2077', value: 2066 },
    { end: 2089, start: 2078, text: '2078-2089', value: 2078 },
    { end: 2101, start: 2090, text: '2090-2101', value: 2090 },
    { end: 2113, start: 2102, text: '2102-2113', value: 2102 },
    { end: 2125, start: 2114, text: '2114-2125', value: 2114 },
    { end: 2137, start: 2126, text: '2126-2137', value: 2126 },
    { end: 2149, start: 2138, text: '2138-2149', value: 2138 },
  ]);
  getRangeYears('getRangeYears 7', { showYears: true, mode: 'year', start: 2019, step: 12 }, [
    { end: 2018, start: 2007, text: '2007-2018', value: 2007 },
    { end: 2030, start: 2019, text: '2019-2030', value: 2019 },
    { end: 2042, start: 2031, text: '2031-2042', value: 2031 },
    { end: 2054, start: 2043, text: '2043-2054', value: 2043 },
    { end: 2066, start: 2055, text: '2055-2066', value: 2055 },
    { end: 2078, start: 2067, text: '2067-2078', value: 2067 },
    { end: 2090, start: 2079, text: '2079-2090', value: 2079 },
    { end: 2102, start: 2091, text: '2091-2102', value: 2091 },
    { end: 2114, start: 2103, text: '2103-2114', value: 2103 },
    { end: 2126, start: 2115, text: '2115-2126', value: 2115 },
    { end: 2138, start: 2127, text: '2127-2138', value: 2127 },
    { end: 2150, start: 2139, text: '2139-2150', value: 2139 },
  ]);

  function getMonthDate(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const { lang, date } = props;
      const months = newTarget.getMonthDate(lang, date);
      expect(months).toEqual(expValue);
    });
  }
  getMonthDate('getMonthDate 1', { mode: 'month', lang: '', date: '' }, [
    { text: '一月', value: 0 },
    { text: '二月', value: 1 },
    { text: '三月', value: 2 },
    { text: '四月', value: 3 },
    { text: '五月', value: 4 },
    { text: '六月', value: 5 },
    { text: '七月', value: 6 },
    { text: '八月', value: 7 },
    { text: '九月', value: 8 },
    { text: '十月', value: 9 },
    { text: '十一月', value: 10 },
    { text: '十二月', value: 11 },
  ]);
  getMonthDate('getMonthDate 2', { mode: 'month', lang: 'en', date: '' }, [
    { text: 'Jan', value: 0 },
    { text: 'Feb', value: 1 },
    { text: 'Mar', value: 2 },
    { text: 'Apr', value: 3 },
    { text: 'May', value: 4 },
    { text: 'Jun', value: 5 },
    { text: 'Jul', value: 6 },
    { text: 'Aug', value: 7 },
    { text: 'Sep', value: 8 },
    { text: 'Oct', value: 9 },
    { text: 'Nov', value: 10 },
    { text: 'Dec', value: 11 },
  ]);
  getMonthDate(
    'getMonthDate 3',
    { mode: 'month', lang: '', date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    [
      { text: 1, value: 0 },
      { text: 2, value: 1 },
      { text: 3, value: 2 },
      { text: 4, value: 3 },
      { text: 5, value: 4 },
      { text: 6, value: 5 },
      { text: 7, value: 6 },
      { text: 8, value: 7 },
      { text: 9, value: 8 },
      { text: 10, value: 9 },
      { text: 11, value: 10 },
      { text: 12, value: 11 },
    ]
  );
  getMonthDate('getMonthDate 4', { mode: 'month', lang: '', date: [1, 2, 3] }, [
    { text: 1, value: 0 },
    { text: 2, value: 1 },
    { text: 3, value: 2 },
  ]);
  getMonthDate('getMonthDate 5', { mode: 'month', lang: 'en', date: [1, 2, 3] }, [
    { text: 1, value: 0 },
    { text: 2, value: 1 },
    { text: 3, value: 2 },
  ]);
  getMonthDate('getMonthDate 6', { mode: 'month', lang: 'en', date: '1,2,3' }, [
    { text: 'Jan', value: 0 },
    { text: 'Feb', value: 1 },
    { text: 'Mar', value: 2 },
    { text: 'Apr', value: 3 },
    { text: 'May', value: 4 },
    { text: 'Jun', value: 5 },
    { text: 'Jul', value: 6 },
    { text: 'Aug', value: 7 },
    { text: 'Sep', value: 8 },
    { text: 'Oct', value: 9 },
    { text: 'Nov', value: 10 },
    { text: 'Dec', value: 11 },
  ]);
  getMonthDate('getMonthDate 7', { mode: 'month', lang: '', date: '1,2,3' }, [
    { text: '一月', value: 0 },
    { text: '二月', value: 1 },
    { text: '三月', value: 2 },
    { text: '四月', value: 3 },
    { text: '五月', value: 4 },
    { text: '六月', value: 5 },
    { text: '七月', value: 6 },
    { text: '八月', value: 7 },
    { text: '九月', value: 8 },
    { text: '十月', value: 9 },
    { text: '十一月', value: 10 },
    { text: '十二月', value: 11 },
  ]);

  function getWeeks(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const { weeksDate, rangeIndex, weeksInYear } = params;
      const { weeks, step } = props;
      const { weeksInner, weekIndex } = newTarget.getWeeks(
        weeks,
        weeksDate,
        rangeIndex,
        weeksInYear,
        step
      );
      expect(weeksInner).toEqual(expValue.weeksInner);
      expect(weekIndex).toEqual(expValue.weekIndex);
    });
  }
  getWeeks(
    'getWeeks 1',
    { mode: 'week', weeks: 10, step: 12 },
    {
      weeksDate: [
        { end: 12, index: 0, start: 1, text: '1-12周' },
        { end: 24, index: 1, start: 13, text: '13-24周' },
        { end: 36, index: 2, start: 25, text: '25-36周' },
        { end: 48, index: 3, start: 37, text: '37-48周' },
        { end: 52, index: 4, start: 49, text: '49-52周' },
      ],
      rangeIndex: 0,
      weeksInYear: 52,
    },
    {
      weeksInner: [
        { text: '第1周', weeks: 1, value: 1 },
        { text: '第2周', weeks: 2, value: 2 },
        { text: '第3周', weeks: 3, value: 3 },
        { text: '第4周', weeks: 4, value: 4 },
        { text: '第5周', weeks: 5, value: 5 },
        { text: '第6周', weeks: 6, value: 6 },
        { text: '第7周', weeks: 7, value: 7 },
        { text: '第8周', weeks: 8, value: 8 },
        { text: '第9周', weeks: 9, value: 9 },
        { text: '第10周', weeks: 10, value: 10 },
        { text: '第11周', weeks: 11, value: 11 },
        { text: '第12周', weeks: 12, value: 12 },
      ],
      weekIndex: 0,
    }
  );
  getWeeks(
    'getWeeks 2',
    { mode: 'week', weeks: 13, step: 10 },
    {
      weeksDate: [
        { end: 10, index: 0, start: 1, text: '1-10周' },
        { end: 20, index: 1, start: 11, text: '11-20周' },
        { end: 30, index: 2, start: 21, text: '21-30周' },
        { end: 40, index: 3, start: 31, text: '31-40周' },
        { end: 53, index: 4, start: 41, text: '41-53周' },
      ],
      rangeIndex: 1,
      weeksInYear: 53,
    },
    {
      weeksInner: [
        { text: '第11周', weeks: 11, value: 11 },
        { text: '第12周', weeks: 12, value: 12 },
        { text: '第13周', weeks: 13, value: 13 },
        { text: '第14周', weeks: 14, value: 14 },
        { text: '第15周', weeks: 15, value: 15 },
        { text: '第16周', weeks: 16, value: 16 },
        { text: '第17周', weeks: 17, value: 17 },
        { text: '第18周', weeks: 18, value: 18 },
        { text: '第19周', weeks: 19, value: 19 },
        { text: '第20周', weeks: 20, value: 20 },
      ],
      weekIndex: 1,
    }
  );
  getWeeks(
    'getWeeks 3',
    { mode: 'week', weeks: 30, step: 10 },
    {
      weeksDate: [
        { end: 10, index: 0, start: 1, text: '1-10周' },
        { end: 20, index: 1, start: 11, text: '11-20周' },
        { end: 30, index: 2, start: 21, text: '21-30周' },
        { end: 40, index: 3, start: 31, text: '31-40周' },
        { end: 53, index: 4, start: 41, text: '41-53周' },
      ],
      rangeIndex: 2,
      weeksInYear: 53,
    },
    {
      weeksInner: [
        { text: '第21周', weeks: 21, value: 21 },
        { text: '第22周', weeks: 22, value: 22 },
        { text: '第23周', weeks: 23, value: 23 },
        { text: '第24周', weeks: 24, value: 24 },
        { text: '第25周', weeks: 25, value: 25 },
        { text: '第26周', weeks: 26, value: 26 },
        { text: '第27周', weeks: 27, value: 27 },
        { text: '第28周', weeks: 28, value: 28 },
        { text: '第29周', weeks: 29, value: 29 },
        { text: '第30周', weeks: 30, value: 30 },
      ],
      weekIndex: 2,
    }
  );

  function getEqualValue(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const equalValue = newTarget.getEqualValue(props, params.weekIndex);
      expect(equalValue).toEqual(expValue.value);
    });
  }
  getEqualValue(
    'getEqualValue year 1',
    { start: 2015, mode: 'year' },
    { weekIndex: '' },
    { value: 2015 }
  );
  getEqualValue(
    'getEqualValue year 2',
    { start: 2018, mode: 'year' },
    { weekIndex: '' },
    { value: 2018 }
  );
  getEqualValue(
    'getEqualValue year 3',
    { start: 2019, mode: 'year', isWeekInner: false, weeks: '', monthIndex: '' },
    { weekIndex: '' },
    { value: 2019 }
  );
  getEqualValue(
    'getEqualValue month 4',
    {
      mode: 'month',
      month: 1,
    },
    { weekIndex: '' },
    { value: 1 }
  );
  getEqualValue(
    'getEqualValue month 5',
    {
      mode: 'month',
      month: 2,
    },
    { weekIndex: '' },
    { value: 2 }
  );
  getEqualValue(
    'getEqualValue month 6',
    {
      mode: 'month',
      month: 3,
    },
    { weekIndex: '' },
    { value: 3 }
  );
  getEqualValue(
    'getEqualValue week 7',
    {
      mode: 'week',
      isWeekInner: false,
      weeks: '10',
      step: 12,
    },
    { weekIndex: 2 },
    { value: 2 }
  );
  getEqualValue(
    'getEqualValue week 8',
    {
      mode: 'week',
      isWeekInner: false,
      weeks: '20',
      step: 12,
    },
    { weekIndex: 1 },
    { value: 1 }
  );
  getEqualValue(
    'getEqualValue week 9',
    {
      mode: 'week',
      isWeekInner: false,
      weeks: '22',
      step: 12,
    },
    { weekIndex: 3 },
    { value: 3 }
  );

  function getChildrenData(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<FacePanel themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'FacePanel');
      const { data } = params;
      const childrenData = newTarget.getChildrenData(props, data);
      expect(childrenData).toEqual(expValue);
    });
  }
  const data = {
    months: [0, 1, 2],
    weeksDate: ['1周', '2周', '3周', '4周', '5周'],
    weeksInner: ['1-10周', '2-20周', '3-30周', '4-40周', '5-50周'],
    doubleYear: ['2015-2020', '2016-2023', '2015-2019', '2014-2020'],
    years: [2015, 2016, 2018, 2019, 2020, 2021],
  };
  getChildrenData(
    'getChildrenData 1 year',
    { mode: 'year', showYears: false, start: 2015, step: 12 },
    { data },
    [2015, 2016, 2018, 2019, 2020, 2021]
  );
  getChildrenData(
    'getChildrenData 2 years',
    { mode: 'year', showYears: true, start: 2015, step: 12 },
    { data },
    ['2015-2020', '2016-2023', '2015-2019', '2014-2020']
  );
  getChildrenData('getChildrenData 3 month', { mode: 'month', lange: '', data: '' }, { data }, [
    0,
    1,
    2,
  ]);
  getChildrenData(
    'getChildrenData 4 week',
    { mode: 'week', isWeekInner: false, weeks: 10, year: 2015, step: 12 },
    { data },
    ['1周', '2周', '3周', '4周', '5周']
  );
  getChildrenData(
    'getChildrenData 5 week',
    { mode: 'week', isWeekInner: true, weeks: 10, year: 2015, step: 12 },
    { data },
    ['1-10周', '2-20周', '3-30周', '4-40周', '5-50周']
  );
});
