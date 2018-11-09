import * as React from 'react';

import Wrapper from '../demo';
import DateInput from '../DateInput';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import { async } from 'rxjs/internal/scheduler/async';
import Theme from '../../theme/index';
import Widgets from '../../consts/index';

import DatePicker from '../index';
import Year from '../Year';
import Weeks from '../Weeks';
import Month from '../Month';
import Date from '../Date';
import moment from 'moment';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker } = DatePicker;
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  it('Year', () => {
    const target = <Year />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Weeks', () => {
    const target = <Weeks />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Month', () => {
    const target = <Month />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Date', () => {
    const target = <Date />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function getTarget(target) {
    const newTarget = target
      .children()
      .at(0)
      .children()
      .at(0)
      .instance();
    const targetCurrent = newTarget.picker.current;
    return {
      newTarget,
      targetCurrent,
    };
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
      const { newTarget, targetCurrent } = getTarget(target);
      targetCurrent.getDaysInMonth(type, funName)();
      console.log(targetCurrent.state.value);
      for (const i in expVal) {
        expect(targetCurrent.state[i]).toBe(expVal[i]);
      }
    });
  }
  getDaysInMonth('click changeMonth', <DatePicker />, 'month', 'add', {
    currentYear: 2018,
    currentMonth: 9,
    choseDate: 17,
    weekIndex: 1,
    lastDayIndexInMonth: 31,
    value: '2018-09-17',
    choseDayIndex: 18,
    today: 17,
    weekDay: 1,
  });
  getDaysInMonth(
    'click changeMonth',
    <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />,
    'month',
    'add',
    {
      currentYear: 2015,
      currentMonth: 2,
      choseDate: 3,
      weekIndex: 0,
      lastDayIndexInMonth: 30,
      value: '2015年2月3日',
      choseDayIndex: 3,
      today: 17,
      weekDay: 0,
    }
  );
  // getDaysInMonth(
  //   'click changeMonth',
  //   <WeeksPicker defaultValue={'2015-02'} firstWeekDay={2} isFollow/>,
  //   'month',
  //   'add',
  //   {
  //    currentYear:2015,
  //    currentMonth:0,
  //   // choseDate:3,
  //   // weekIndex:0,
  //   // lastDayIndexInMonth:30,
  //    value:'2015-02',
  //   // choseDayIndex:3,
  //   // today:17,
  //   // weekDay:0,
  //   weeks:2
  // });

  it('onFocus ', () => {
    const target = mount(<WeeksPicker defaultValue={'2015-02'} firstWeekDay={2} isFollow />);
    const { newTarget, targetCurrent } = getTarget(target);
    newTarget.onFocus();
    console.log(targetCurrent.state.value);
    // for (const i in expVal){
    //   expect(targetCurrent.state[i]).toBe(expVal[i]);
    // }
  });

  function testGetDatesfromWeeks(
    title: string,
    year: number,
    weeks: number,
    weekIndex: number,
    value: string,
    expValue: Array<number>,
    index?: number,
    child?: number,
    choseValue?: string
  ) {
    it(`DatePicker ${title}`, () => {
      const target = mount(<WeeksPicker />);
      const { newTarget, targetCurrent } = getTarget(target);
      targetCurrent.setState({ weekIndex });
      targetCurrent.value = value;
      const { endInWeeks, startInWeeks } = targetCurrent.getDatesfromWeeks(
        year,
        weeks,
        index,
        child,
        choseValue
      );
      expect(startInWeeks).toBe(expValue[0]);
      expect(endInWeeks).toBe(expValue[1]);
    });
  }
  testGetDatesfromWeeks('getDatesfromWeeks-1', 2018, 37, 6, '2018-09-14', [14, 21]);
  testGetDatesfromWeeks(
    'getDatesfromWeeks-2 hover',
    2018,
    35,
    6,
    '2018-09-14',
    [0, 7],
    2,
    28,
    '2018-08-28'
  );
  testGetDatesfromWeeks(
    'getDatesfromWeeks-3 hover',
    2018,
    35,
    6,
    '2018-09-14',
    [0, 7],
    0,
    26,
    '2018-08-26'
  );

  function getNormalWeekValues(
    title: string,
    props: Object,
    year: number,
    weeks: number,
    expValue?: string
  ) {
    it(`WeeksPicker ${title}`, () => {
      const target = mount(<WeeksPicker {...props} />);
      const { targetCurrent } = getTarget(target);
      const { startValue, endValue } = targetCurrent.getNormalWeekValues(year, weeks);
      expect(startValue).toBe(expValue[0]);
      expect(endValue).toBe(expValue[1]);
    });
  }
  getNormalWeekValues('getNormalWeekValues one', {}, 2015, 6, ['2015-02-01', '2015-02-07']);
  getNormalWeekValues('getNormalWeekValues two', {}, 2015, 1, ['2014-12-28', '2015-01-03']);
  getNormalWeekValues('getNormalWeekValues three', {}, 2015, 5, ['2015-01-25', '2015-01-31']);

  function getWeeksForFirstWeekDay(
    title: string,
    props: Object,
    startValue: number,
    endValue: number,
    expValue?: string
  ) {
    it(`WeeksPicker ${title}`, () => {
      const target = mount(<WeeksPicker {...props} />);
      const { targetCurrent } = getTarget(target);
      const { firstWeekDay } = targetCurrent.state;
      const { newStartValue, newEndValue } = targetCurrent.getWeeksForFirstWeekDay(
        startValue,
        endValue,
        firstWeekDay
      );
      expect(newStartValue).toBe(expValue[0]);
      expect(newEndValue).toBe(expValue[1]);
    });
  }
  getWeeksForFirstWeekDay(
    'firstWeekDay 1',
    { firstWeekDay: 1, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-02', '2015-02-08']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 2',
    { firstWeekDay: 2, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-03', '2015-02-09']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 3',
    { firstWeekDay: 3, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-04', '2015-02-10']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 4',
    { firstWeekDay: 4, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-05', '2015-02-11']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 5',
    { firstWeekDay: 5, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-06', '2015-02-12']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 6',
    { firstWeekDay: 6, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-07', '2015-02-13']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 7',
    { firstWeekDay: 7, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-01', '2015-02-07']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay 8',
    { firstWeekDay: 8, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-01', '2015-02-07']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay -1',
    { firstWeekDay: -1, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-01', '2015-02-07']
  );
  getWeeksForFirstWeekDay(
    'firstWeekDay -2',
    { firstWeekDay: -2, isFollow: true },
    '2015-02-01',
    '2015-02-07',
    ['2015-02-01', '2015-02-07']
  );

  function getWeeksFromValue(title: string, props: Object, value: string, expValue?: Object) {
    it(`WeeksPicker ${title}`, () => {
      const target = mount(<WeeksPicker {...props} />);
      const { targetCurrent } = getTarget(target);
      const { year, weeks } = targetCurrent.getWeeksFromValue(value);
      expect(year).toBe(expValue.year);
      expect(weeks).toBe(expValue.weeks);
    });
  }
  getWeeksFromValue('getWeeksFromValue 1', {}, '2015-01-01', { year: 2015, weeks: 1 });
  getWeeksFromValue('getWeeksFromValue 1', {}, '2015-03-08', { year: 2015, weeks: 11 });

  // it('Function getDatesfromWeeks', async () => {
  //   const target = mount(<Wrapper />);
  //   // getTarget(target).setState({ offsetLeft: 70 });
  //   // getTarget(target).mouseleave();
  //   // expect(getTarget(target).state.isInBall).toBe(false);
  //   // expect(getTarget(target).state.changeBackground).toBe(false);
  //   expect(renderer.create(target).toJSON()).toMatchSnapshot();
  // });
});
