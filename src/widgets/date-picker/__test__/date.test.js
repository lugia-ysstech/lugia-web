import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import DatePicker from '../index';
import { delay } from '@lugia/react-test-utils';
import moment from 'moment';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;
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
  function getDaysInMonth(
    title: string,
    elem: Object,
    type: string,
    funName: string,
    expVal: Object
  ) {
    it(`getDaysInMonth ${title}`, () => {
      const target = mount(elem);
      const newTarget = getTarget(target, 'Date');
      newTarget.getDaysInMonth(type, funName)();
      for (const i in expVal) {
        expect(newTarget.state[i]).toBe(expVal[i]);
      }
    });
  }
  getDaysInMonth(
    'click changeMonth',
    <DatePicker defaultValue={'2018-10-19'} firstWeekDay={0} />,
    'month',
    'add',
    {
      currentYear: 2018,
      currentMonth: 10,
      weekIndex: 4,
      value: '2018-10-19',
    }
  );
  getDaysInMonth(
    'click changeMonth',
    <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />,
    'month',
    'add',
    {
      currentYear: 2015,
      currentMonth: 2,
      weekIndex: 0,
      lastDayIndexInMonth: 30,
      value: '2015年2月3日',
    }
  );
  getDaysInMonth(
    'click addmonth',
    <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />,
    'month',
    'subtract',
    {
      currentYear: 2015,
      currentMonth: 0,
      weekIndex: 4,
      lastDayIndexInMonth: 34,
      value: '2015年2月3日',
    }
  );
  getDaysInMonth(
    'click changeMonth-addyear',
    <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />,
    'year',
    'add',
    {
      currentYear: 2016,
      currentMonth: 1,
      weekIndex: 1,
      lastDayIndexInMonth: 29,
      value: '2015年2月3日',
    }
  );
  getDaysInMonth(
    'click changeMonth subract-year',
    <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />,
    'year',
    'subtract',
    {
      currentYear: 2014,
      currentMonth: 1,
      weekIndex: 6,
      lastDayIndexInMonth: 33,
      value: '2015年2月3日',
    }
  );
  function getDates(title: string, props: Object, value: string, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<DatePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      const { format } = newTarget.state;
      const moments = moment(value, format);
      const obj = newTarget.getDates(moments);
      for (const i in expValue) {
        expect(obj[i]).toBe(expValue[i]);
      }
    });
  }

  getDates('getDates Function 1', {}, '2018-11-20', {
    newMonth: 10,
    newYear: 2018,
    weekIndex: 4,
    lastDayIndexInMonth: 33,
  });
  getDates('getDates Function 2', { firstWeekDay: 1 }, '2018-02-01', {
    newMonth: 1,
    newYear: 2018,
    weekIndex: 3,
    lastDayIndexInMonth: 30,
  });
  getDates('getDates Function 3', { firstWeekDay: 2 }, '2017-02-08', {
    newMonth: 1,
    newYear: 2017,
    weekIndex: 1,
    lastDayIndexInMonth: 28,
  });
  getDates('getDates Function 4', { firstWeekDay: 3 }, '2018-08-08', {
    newMonth: 7,
    newYear: 2018,
    weekIndex: 0,
    lastDayIndexInMonth: 30,
  });
  getDates('getDates Function 5', { firstWeekDay: 4 }, '2019-11-03', {
    newMonth: 10,
    newYear: 2019,
    weekIndex: 1,
    lastDayIndexInMonth: 30,
  });
  getDates('getDates Function 6', { firstWeekDay: 5 }, '2019-11-03', {
    newMonth: 10,
    newYear: 2019,
    weekIndex: 0,
    lastDayIndexInMonth: 29,
  });
  getDates('getDates Function 7', { firstWeekDay: 6 }, '2007-10-04', {
    newMonth: 9,
    newYear: 2007,
    weekIndex: 2,
    lastDayIndexInMonth: 32,
  });
  getDates('getDates Function 8', { firstWeekDay: 7 }, '2024-05-08', {
    newMonth: 4,
    newYear: 2024,
    weekDay: 3,
    weekIndex: 3,
    lastDayIndexInMonth: 33,
  });
  getDates('getDates Function 9', { firstWeekDay: 8 }, '2024-05-08', {
    newMonth: 4,
    newYear: 2024,
    weekIndex: 3,
    lastDayIndexInMonth: 33,
  });
  getDates('getDates Function 10', { firstWeekDay: 0 }, '2024-05-08', {
    newMonth: 4,
    newYear: 2024,
    weekIndex: 3,
    lastDayIndexInMonth: 33,
  });
  function onDateChange(title: string, props: Object, params: string, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<DatePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      newTarget.onDateChange(params.index, params.child);
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  for (let i = 0; i < 4; i++) {
    const target = mount(<DatePicker defaultValue={'2018-11-20'} />);
    const newTarget = getTarget(target, 'Date');
    const { days } = newTarget.state;
    onDateChange(
      `onDateChange Function ${i}`,
      { defaultValue: '2018-11-20' },
      { index: i, child: days[i] },
      {
        value: `2018-10-${days[i]}`,
        currentYear: 2018,
        currentMonth: 9,
        choseDate: days[i],
        choseDayIndex: days[i] + 1,
      }
    );
  }
  for (let i = 4; i < 34; i++) {
    const target = mount(<DatePicker defaultValue={'2018-11-20'} />);
    const newTarget = getTarget(target, 'Date');
    const { days } = newTarget.state;
    let item = days[i];
    if (days[i].toString().length === 1) {
      item = '0' + days[i];
    }
    onDateChange(
      `onDateChange Function ${i}`,
      { defaultValue: '2018-11-20' },
      { index: i, child: days[i] },
      {
        value: `2018-11-${item}`,
        currentYear: 2018,
        currentMonth: 10,
        choseDate: days[i],
        choseDayIndex: days[i] + 4,
      }
    );
  }
  for (let i = 34; i < 42; i++) {
    const target = mount(<DatePicker defaultValue={'2018-11-20'} />);
    const newTarget = getTarget(target, 'Date');
    const { days } = newTarget.state;
    let item = days[i];
    if (days[i].toString().length === 1) {
      item = '0' + days[i];
    }
    onDateChange(
      `onDateChange Function ${i}`,
      { defaultValue: '2018-11-20' },
      { index: i, child: days[i] },
      {
        value: `2018-12-${item}`,
        currentYear: 2018,
        currentMonth: 11,
        choseDate: days[i],
        choseDayIndex: days[i] + 6,
      }
    );
  }

  function getFreshPicker(title: string, props: Object, value: string, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<DatePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      const { format } = newTarget.state;
      let newValue = value;
      if (!value) {
        newValue = moment().format(format);
      }
      const moments = moment(newValue, format);
      newTarget.getFreshPicker({ moments, value });
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  getFreshPicker('getFreshPicker Function 1', {}, '2018-11-20', {
    currentYear: 2018,
    currentMonth: 10,
  });
  getFreshPicker('getFreshPicker Function 1', {}, '2019-09-20', {
    currentYear: 2019,
    currentMonth: 8,
  });
  getFreshPicker('getFreshPicker Function 1', {}, '2017-02-20', {
    currentYear: 2017,
    currentMonth: 1,
  });

  function setStateFunc(title: string, props: Object, value: string, choseDate, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<DatePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      const { format } = newTarget.state;
      let newValue = value;
      if (!value) {
        newValue = moment().format(format);
      }
      const moments = moment(newValue, format);
      newTarget.setStateFunc('fresh', moments, choseDate, value);
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  setStateFunc('setStateFunc Function', {}, '2018-11-20', '20', {
    weekDay: 4,
    currentYear: 2018,
    currentMonth: 10,
    weekIndex: 4,
    lastDayIndexInMonth: 33,
    value: '2018-11-20',
  });
  setStateFunc('setStateFunc Function', {}, '2017-02-10', '10', {
    weekDay: 3,
    currentYear: 2017,
    currentMonth: 1,
    weekIndex: 3,
    lastDayIndexInMonth: 30,
    value: '2017-02-10',
  });
  function getNewDates(title: string, props: Object, params: Object, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<RangePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      const { format } = newTarget.state;
      const { value } = params;
      const { mode } = newTarget.props;
      const moments = moment(value, format);
      newTarget.getFreshPicker({ moments });
      const { days } = newTarget.state;
      const { dates } = newTarget.getNewDates(days, mode);
      expect(dates).toEqual(expValue);
    });
  }
  getNewDates('getNewDates 1', { firstWeekDay: 0 }, { value: '2018-11-01' }, [
    '2018-10-28',
    '2018-10-29',
    '2018-10-30',
    '2018-10-31',
    '2018-11-01',
    '2018-11-02',
    '2018-11-03',
    '2018-11-04',
    '2018-11-05',
    '2018-11-06',
    '2018-11-07',
    '2018-11-08',
    '2018-11-09',
    '2018-11-10',
    '2018-11-11',
    '2018-11-12',
    '2018-11-13',
    '2018-11-14',
    '2018-11-15',
    '2018-11-16',
    '2018-11-17',
    '2018-11-18',
    '2018-11-19',
    '2018-11-20',
    '2018-11-21',
    '2018-11-22',
    '2018-11-23',
    '2018-11-24',
    '2018-11-25',
    '2018-11-26',
    '2018-11-27',
    '2018-11-28',
    '2018-11-29',
    '2018-11-30',
    '2018-12-01',
    '2018-12-02',
    '2018-12-03',
    '2018-12-04',
    '2018-12-05',
    '2018-12-06',
    '2018-12-07',
    '2018-12-08',
  ]);
  getNewDates('getNewDates 2', { firstWeekDay: 1 }, { value: '2015-01-01' }, [
    '2014-12-29',
    '2014-12-30',
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
    '2015-02-07',
    '2015-02-08',
  ]);
  getNewDates('getNewDates 3', { firstWeekDay: 2 }, { value: '2015-01-01' }, [
    '2014-12-30',
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
    '2015-02-07',
    '2015-02-08',
    '2015-02-09',
  ]);
  getNewDates('getNewDates 4', { firstWeekDay: 3 }, { value: '2015-01-01' }, [
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
    '2015-02-07',
    '2015-02-08',
    '2015-02-09',
    '2015-02-10',
  ]);
  getNewDates('getNewDates 5', { firstWeekDay: 4 }, { value: '2015-01-01' }, [
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
    '2015-02-07',
    '2015-02-08',
    '2015-02-09',
    '2015-02-10',
    '2015-02-11',
  ]);
  getNewDates('getNewDates 6', { firstWeekDay: 5 }, { value: '2015-01-01' }, [
    '2014-12-26',
    '2014-12-27',
    '2014-12-28',
    '2014-12-29',
    '2014-12-30',
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
  ]);
  getNewDates('getNewDates 7', { firstWeekDay: 6 }, { value: '2015-01-01' }, [
    '2014-12-27',
    '2014-12-28',
    '2014-12-29',
    '2014-12-30',
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
  ]);
  getNewDates('getNewDates 8', { firstWeekDay: 7 }, { value: '2015-01-01' }, [
    '2014-12-28',
    '2014-12-29',
    '2014-12-30',
    '2014-12-31',
    '2015-01-01',
    '2015-01-02',
    '2015-01-03',
    '2015-01-04',
    '2015-01-05',
    '2015-01-06',
    '2015-01-07',
    '2015-01-08',
    '2015-01-09',
    '2015-01-10',
    '2015-01-11',
    '2015-01-12',
    '2015-01-13',
    '2015-01-14',
    '2015-01-15',
    '2015-01-16',
    '2015-01-17',
    '2015-01-18',
    '2015-01-19',
    '2015-01-20',
    '2015-01-21',
    '2015-01-22',
    '2015-01-23',
    '2015-01-24',
    '2015-01-25',
    '2015-01-26',
    '2015-01-27',
    '2015-01-28',
    '2015-01-29',
    '2015-01-30',
    '2015-01-31',
    '2015-02-01',
    '2015-02-02',
    '2015-02-03',
    '2015-02-04',
    '2015-02-05',
    '2015-02-06',
    '2015-02-07',
  ]);
  function changeGetMode(title: string, props: Object, params, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<DatePicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      newTarget.getMode(params.mode, params.from);
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  changeGetMode(
    'getMode changeYear',
    { defaultValue: '2018-11-20' },
    { mode: 'year', from: 'date' },
    { currentYear: 2018, currentMonth: 10 }
  );
  changeGetMode(
    'getMode changeMonth',
    { defaultValue: '2017-11-12' },
    { mode: 'month', from: 'date' },
    { currentYear: 2017, currentMonth: 10 }
  );
  changeGetMode(
    'getMode changeMonth',
    { defaultValue: '2017-11-12' },
    { mode: 'month', from: 'date' },
    { currentYear: 2017, currentMonth: 10 }
  );
  changeGetMode(
    'getMode chengeWeek',
    { defaultValue: '2017-11-12' },
    { mode: 'week', from: 'date' },
    { currentYear: 2017, currentMonth: 10 }
  );
  //onMouseOver
  function onMouseWeeks(
    title: string,
    props: Object,
    params: Object,
    expValue?: Object,
    funcName?: string
  ) {
    it(`WeeksPicker ${title}`, () => {
      const target = mount(<WeeksPicker {...props} />);
      const newTarget = getTarget(target, 'Date');
      const { value, format } = newTarget.state;
      const moments = moment(value, format);
      newTarget.getFreshPicker({ moments });
      newTarget.onMouseOver(params.index, params.child);
      if (funcName === 'onMouseOut') {
        newTarget.onMouseOut();
      }
      const { weekHoverStart, weekHoverEnd } = newTarget.state;
      expect(weekHoverStart).toBe(expValue.weekHoverStart);
      expect(weekHoverEnd).toBe(expValue.weekHoverEnd);
    });
  }
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-02' },
    { index: 14, child: 14 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-02' },
    { index: 10, child: 10 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-10' },
    { index: 0, child: 25 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05' },
    { index: 35, child: 4 },
    { weekHoverStart: 36, weekHoverEnd: 42 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 1 },
    { index: 7, child: 5 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 2 },
    { index: 7, child: 6 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 2 },
    { index: 14, child: 13 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 3 },
    { index: 14, child: 14 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 4 },
    { index: 0, child: 1 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 5 },
    { index: 14, child: 9 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { defaultValue: '2018-05', firstWeekDay: 6 },
    { index: 0, child: 30 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOut Function',
    { defaultValue: '2018-05', firstWeekDay: 6 },
    { index: 0, child: 30 },
    { weekHoverStart: '', weekHoverEnd: '' },
    'onMouseOut'
  );

  //footerChange

  //function in utils
  // function getWeeksRangeInDates(title: string, props: Object, val: string, expValue?: Object) {
  //   it(`WeeksPicker ${title}`, () => {
  //     const target = mount(<WeeksPicker {...props} />);
  //     const { targetDateCurrent } = getTarget(target);
  //     targetDateCurrent.getWeeksRangeInDates(val);
  //     const { value, choseWeeks, choseYear } = targetDateCurrent;

  //     expect(value).toBe(expValue.value);
  //     expect(choseWeeks).toBe(expValue.choseWeeks);
  //     expect(choseYear).toBe(expValue.choseYear);
  //   });
  // }
  // getWeeksRangeInDates('getWeeksRangeInDates Function 1', {}, '2018-11-20', {
  //   value: '2018-11-20',
  //   choseWeeks: 47,
  //   choseYear: 2018,
  // });
  // getWeeksRangeInDates('getWeeksRangeInDates Function 2', {}, '2018-11-20', {
  //   value: '2021-11-20',
  //   choseWeeks: 47,
  //   choseYear: 2018,
  // });
  // function getweeksFormatValue(title: string,props: Object,params:Object, expValue?: Object) {
  //   it(`DatePicker ${title}`, () => {
  //     const target = mount(<WeeksPicker {...props} />);
  //     const newTarget = getTarget(target,'Date');
  //     const newValue=newTarget.getweeksFormatValue(params.year,params.weeks);
  //     expect(newValue).toBe(expValue);
  //   });
  // }
  // getweeksFormatValue('freshWeekState Function 1',{},{year:2018,weeks:47},'2018-47');
  // getweeksFormatValue('freshWeekState Function 2',{format:'YYYY年第WW周'},{year:2017,weeks:32},'2017年第32周');
  // getweeksFormatValue('freshWeekState Function 2',{format:'YYYY/WW周'},{year:2017,weeks:32},'2017/32周');
  // it('onFocus ', () => {
  //   const target = mount(<WeeksPicker defaultValue={'2015-02'} firstWeekDay={2} isFollow />);
  //   const { newTarget, targetCurrent } = getTarget(target);
  //   newTarget.onFocus();
  //   console.log(targetCurrent.state.value);
  //   // for (const i in expVal){
  //   //   expect(targetCurrent.state[i]).toBe(expVal[i]);
  //   // }
  // });
  // function getWeekIndex(title: string, props: Object, value: string, expValue?: Object) {
  //   it(`DatePicker ${title}`, () => {
  //     const target = mount(<DatePicker {...props} />);
  //     const { targetDateCurrent } = getTarget(target);
  //     const {format,firstWeekDay} =targetDateCurrent.state;
  //     let newValue=value;
  //     if(!value){
  //       newValue=moment().format(format);
  //     }
  //     const moments=moment(newValue,format);
  //     const { weekIndex } = targetDateCurrent.getWeekIndex(moments,firstWeekDay);
  //     expect(weekIndex).toBe(expValue);
  //   });
  // }
  // getWeekIndex('Function date getWeekIndex',{},'2018-11-20',4);
  // getWeekIndex('Function date getWeekIndex 1',{firstWeekDay:1,format:'YYYY/MM/DD'},'2018/11/20',3);
  // getWeekIndex('Function date getWeekIndex 2',{firstWeekDay:2,format:'YYYY/MM/DD'},'2018/11/20',2);
  // getWeekIndex('Function date getWeekIndex 3',{firstWeekDay:3,format:'YYYY/MM/DD'},'2018/11/20',1);
  // getWeekIndex('Function date getWeekIndex 4',{firstWeekDay:4,format:'YYYY/MM/DD'},'2018/11/20',0);
  // getWeekIndex('Function date getWeekIndex 5',{firstWeekDay:5,format:'YYYY/MM/DD'},'2018/11/20',6);
  // getWeekIndex('Function date getWeekIndex 6',{firstWeekDay:6,format:'YYYY/MM/DD'},'2018/11/20',5);
  // getWeekIndex('Function date getWeekIndex 7',{firstWeekDay:7,format:'YYYY/MM/DD'},'2018/11/20',4);
  // getWeekIndex('Function date getWeekIndex 8',{firstWeekDay:8,format:'YYYY/MM/DD'},'2018/11/20',4);
  // getWeekIndex('Function date getWeekIndex 9',{firstWeekDay:9,format:'YYYY/MM/DD'},'2018/11/20',4);
  // getWeekIndex('Function date getWeekIndex 0',{firstWeekDay:0,format:'YYYY/MM/DD'},'2018/11/20',4);
  // getWeekIndex('Function weeks getWeekIndex 1',{firstWeekDay:1,format:'YYYY/WW'},'2018/06',3);
  // getWeekIndex('Function weeks getWeekIndex 2',{firstWeekDay:2,format:'YYYY/WW'},'2018/06',2);
  // getWeekIndex('Function weeks getWeekIndex 3',{firstWeekDay:3,format:'YYYY/WW'},'2018/06',1);
  // getWeekIndex('Function weeks getWeekIndex 4',{firstWeekDay:4,format:'YYYY/WW'},'2018/06',0);
  // getWeekIndex('Function weeks getWeekIndex 5',{firstWeekDay:5,format:'YYYY/WW'},'2018/06',6);
  // getWeekIndex('Function weeks getWeekIndex 6',{firstWeekDay:6,format:'YYYY/WW'},'2018/06',5);
  // getWeekIndex('Function weeks getWeekIndex 7',{firstWeekDay:7,format:'YYYY/WW'},'2018/06',4);
  // getWeekIndex('Function weeks getWeekIndex 8',{firstWeekDay:8,format:'YYYY/WW'},'2018/06',4);
  // function testGetDatesfromWeeks(
  //   title: string,
  //   year: number,
  //   weeks: number,
  //   weekIndex: number,
  //   value: string,
  //   expValue: Array<number>,
  //   index?: number,
  //   child?: number,
  //   choseValue?: string
  // ) {
  //   it(`DatePicker ${title}`, () => {
  //     const target = mount(<WeeksPicker />);
  //     const {targetDateCurrent } = getTarget(target);
  //     targetDateCurrent.setState({ weekIndex });
  //     targetDateCurrent.value = value;
  //     const { endInWeeks, startInWeeks } = targetDateCurrent.getDatesfromWeeks(
  //       year,
  //       weeks,
  //       index,
  //       child,
  //       choseValue
  //     );
  //     expect(startInWeeks).toBe(expValue[0]);
  //     expect(endInWeeks).toBe(expValue[1]);
  //   });
  // }
  // testGetDatesfromWeeks('getDatesfromWeeks-1', 2018, 37, 6, '2018-09-14', [14, 21]);
  // testGetDatesfromWeeks(
  //   'getDatesfromWeeks-2 hover',
  //   2018,
  //   35,
  //   6,
  //   '2018-09-14',
  //   [0, 7],
  //   2,
  //   28,
  //   '2018-08-28'
  // );
  // testGetDatesfromWeeks(
  //   'getDatesfromWeeks-3 hover',
  //   2018,
  //   35,
  //   6,
  //   '2018-09-14',
  //   [0, 7],
  //   0,
  //   26,
  //   '2018-08-26'
  // );

  // function getNormalWeekValues(
  //   title: string,
  //   props: Object,
  //   year: number,
  //   weeks: number,
  //   expValue?: string
  // ) {
  //   it(`WeeksPicker ${title}`, () => {
  //     const target = mount(<WeeksPicker {...props} />);
  //     const { targetDateCurrent } = getTarget(target);
  //     const { startValue, endValue } = targetDateCurrent.getNormalWeekValues(year, weeks);
  //     expect(startValue).toBe(expValue[0]);
  //     expect(endValue).toBe(expValue[1]);
  //   });
  // }
  // getNormalWeekValues('getNormalWeekValues one', {}, 2015, 6, ['2015-02-01', '2015-02-07']);
  // getNormalWeekValues('getNormalWeekValues two', {}, 2015, 1, ['2014-12-28', '2015-01-03']);
  // getNormalWeekValues('getNormalWeekValues three', {}, 2015, 5, ['2015-01-25', '2015-01-31']);

  // function getWeeksForFirstWeekDay(
  //   title: string,
  //   props: Object,
  //   startValue: number,
  //   endValue: number,
  //   expValue?: string
  // ) {
  //   it(`WeeksPicker ${title}`, () => {
  //     const target = mount(<WeeksPicker {...props} />);
  //     const { targetDateCurrent } = getTarget(target);
  //     const { firstWeekDay } = targetDateCurrent.state;
  //     const { newStartValue, newEndValue } = targetDateCurrent.getWeeksForFirstWeekDay(
  //       startValue,
  //       endValue,
  //       firstWeekDay
  //     );
  //     expect(newStartValue).toBe(expValue[0]);
  //     expect(newEndValue).toBe(expValue[1]);
  //   });
  // }
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 1',
  //   { firstWeekDay: 1, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-02', '2015-02-08']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 2',
  //   { firstWeekDay: 2, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-03', '2015-02-09']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 3',
  //   { firstWeekDay: 3, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-04', '2015-02-10']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 4',
  //   { firstWeekDay: 4, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-05', '2015-02-11']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 5',
  //   { firstWeekDay: 5, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-06', '2015-02-12']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 6',
  //   { firstWeekDay: 6, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-07', '2015-02-13']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 7',
  //   { firstWeekDay: 7, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-01', '2015-02-07']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 8',
  //   { firstWeekDay: 8, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-01', '2015-02-07']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay 0',
  //   { firstWeekDay: 0, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-01', '2015-02-07']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay -1',
  //   { firstWeekDay: -1, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-01', '2015-02-07']
  // );
  // getWeeksForFirstWeekDay(
  //   'firstWeekDay -2',
  //   { firstWeekDay: -2, isFollow: true },
  //   '2015-02-01',
  //   '2015-02-07',
  //   ['2015-02-01', '2015-02-07']
  // );
  // function getWeeksFromValue(title: string, props: Object, value: string, expValue?: Object) {
  //   it(`WeeksPicker ${title}`, () => {
  //     const target = mount(<WeeksPicker {...props} />);
  //     const { targetDateCurrent } = getTarget(target);
  //     const { year, weeks } = targetDateCurrent.getWeeksFromValue(value);
  //     expect(year).toBe(expValue.year);
  //     expect(weeks).toBe(expValue.weeks);
  //   });
  // }
  // getWeeksFromValue('getWeeksFromValue no-firstWeekDay', {}, '2015-01-01', { year: 2015, weeks: 1 });
  // getWeeksFromValue('getWeeksFromValue no-firstWeekDay', {}, '2015-03-08', { year: 2015, weeks: 11 });

  // it('Function getDatesfromWeeks', async () => {
  //   const target = mount(<Wrapper />);
  //   // getTarget(target).setState({ offsetLeft: 70 });
  //   // getTarget(target).mouseleave();
  //   // expect(getTarget(target).state.isInBall).toBe(false);
  //   // expect(getTarget(target).state.changeBackground).toBe(false);
  //   expect(renderer.create(target).toJSON()).toMatchSnapshot();
  // });
});
