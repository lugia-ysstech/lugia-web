/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import SwitchPanel from '../switchPanel/SwitchPanel';
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
  function getMode(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<SwitchPanel {...props} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      const { mode } = newTarget.state;
      if (mode === 'date' || mode === 'weeks') {
        newTarget.getMode(params);
        for (const i in expValue) {
          expect(newTarget.state[i]).toBe(expValue[i]);
        }
      }
    });
  }
  getMode(
    'getMode date mode year 1',
    { value: '2019-01-02', format: 'YYYY-MM-DD', mode: 'date' },
    { mode: 'year', from: 'date' },
    { mode: 'year', from: 'date' }
  );
  getMode(
    'getMode date mode month 2',
    { value: '2019-01-02', format: 'YYYY-MM-DD', mode: 'date' },
    { mode: 'month', from: 'date' },
    { mode: 'month', from: 'date' }
  );
  getMode(
    'getMode date mode week 3',
    { value: '2019-01-02', format: 'YYYY-MM-DD', mode: 'date' },
    { mode: 'week', from: 'date' },
    { mode: 'week', from: 'date' }
  );

  function changeYear(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeYear = (obj: Object) => {
        result = obj;
      };
      const target = mount(<SwitchPanel {...props} onChange={changeYear} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeYear(params);
      if (props.mode === 'year') {
        for (const i in expValue.result) {
          expect(result[i]).toBe(expValue.result[i]);
        }
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeYear(
    'changeYear date changeYear mode:date 1',
    { value: '2015-02-03', format: 'YYYY-MM-DD', mode: 'date' },
    { year: 2018, mode: 'date' },
    {
      result: { newValue: 2018, oldValue: 2015, from: 'date', mode: 'date' },
      state: { year: 2018, mode: 'date', value: '2018-02-03' },
    }
  );
  changeYear(
    'changeYear date changeYear mode:date 2',
    { value: '2015-02-03', format: 'YYYY-MM-DD', mode: 'date' },
    { year: 2019, mode: 'date' },
    {
      state: { year: 2019, mode: 'date', value: '2019-02-03' },
    }
  );
  changeYear(
    'changeYear date changeYear mode:month 3',
    { value: '2015-02-03', format: 'YYYY-MM-DD', mode: 'month' },
    { year: 2019, mode: 'month' },
    {
      state: { year: 2019, mode: 'month', value: '2019-02-03' },
    }
  );
  changeYear(
    'changeYear date changeYear mode:year 4',
    { value: '2015-02-03', format: 'YYYY-MM-DD', mode: 'year' },
    { year: 2018, mode: 'year' },
    {
      result: { newValue: '2018-02-03' },
      state: { year: 2018, mode: 'year', value: '2018-02-03' },
    }
  );
  changeYear(
    'changeYear date changeYear mode:year 5',
    { value: '2015-02-03', format: 'YYYY', mode: 'year' },
    { year: 2018, mode: 'year' },
    {
      result: { newValue: '2018' },
      state: { year: 2018, mode: 'year', value: '2018' },
    }
  );

  function changeMonth(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeMonth = (obj: Object) => {
        result = obj;
      };
      const target = mount(<SwitchPanel {...props} onChange={changeMonth} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeMonth(params);
      if (props.mode === 'month') {
        for (const i in expValue.result) {
          expect(result[i]).toBe(expValue.result[i]);
        }
      }

      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeMonth(
    'changeMonth date changeMonth 1',
    { value: '2015-02-03', format: 'YYYY-MM-DD', mode: 'date' },
    { month: 2, mode: 'date' },
    {
      result: { newValue: '2015-03-03', oldValue: '2015-02-03', from: 'date', mode: 'date' },
      state: { month: 2, year: 2015, mode: 'date', value: '2015-03-03' },
    }
  );
  changeMonth(
    'changeMonth date changeMonth 2',
    { value: '2026-03-03', format: 'YYYY-MM-DD', mode: 'date' },
    { month: 0, mode: 'date' },
    {
      result: { newValue: '2026-01-03', oldValue: '2026-03-03', from: 'date', mode: 'date' },
      state: { month: 0, year: 2026, mode: 'date', value: '2026-01-03' },
    }
  );
  changeMonth(
    'changeMonth weeks changeMonth 3',
    { value: '2026-03-03', format: 'YYYY-MM-DD', mode: 'weeks' },
    { month: 0, mode: 'weeks' },
    {
      result: { newValue: '2026-01-03', oldValue: '2026-03-03', from: 'weeks', mode: 'weeks' },
      state: { month: 0, year: 2026, mode: 'weeks', value: '2026-01-09' },
    }
  );
  changeMonth(
    'changeMonth weeks changeMonth 4',
    { value: '2015-01-12', format: 'YYYY-MM-DD', from: 'weeks' },
    { month: 11, mode: 'weeks' },
    {
      result: { newValue: '2015-12-12', oldValue: '2015-01-12', from: 'weeks', mode: 'weeks' },
      state: { month: 11, year: 2015, mode: 'weeks', value: '2015-12-12' },
    }
  );
  changeMonth(
    'changeMonth month changeMonth 5',
    { value: '2015-01-12', format: 'YYYY-MM', from: 'month' },
    { month: 10, mode: 'month' },
    {
      result: { newValue: '2015-11', oldValue: '2015-01', from: 'month', mode: 'month' },
      state: { month: 10, year: 2015, mode: 'month', value: '2015-11' },
    }
  );
  changeMonth(
    'changeMonth month changeMonth 6',
    { value: '2015-02-12', format: 'YYYY-MM', from: 'month' },
    { month: 0, mode: 'month' },
    {
      result: { newValue: '2015-01', oldValue: '2015-02', from: 'month', mode: 'month' },
      state: { month: 0, year: 2015, value: '2015-01' },
    }
  );
  function changeWeek(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeWeek = (obj: Object) => {
        result = obj;
      };
      const target = mount(<SwitchPanel {...props} onChange={changeWeek} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeWeek(params);
      console.log(params);
      if (props.mode === 'week' || props.mode === 'weeks') {
        for (const i in expValue.result) {
          expect(result[i]).toBe(expValue.result[i]);
        }
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeWeek(
    'changeWeek date  changeWeek 1',
    { value: '2015-02-03', format: 'YYYY-WW', from: 'date' },
    { year: 2018, weeks: 5, mode: 'date' },
    {
      result: { year: 2018, weeks: 5, newValue: '2018-05' },
      state: { year: 2018, mode: 'date', from: 'week' },
    }
  );
  changeWeek(
    'changeWeek date  changeWeek 2',
    { value: '2015-02-03', format: 'YYYY-WW', from: 'date' },
    { year: 2018, weeks: 6, mode: 'date' },
    {
      result: { year: 2018, weeks: 6, newValue: '2018-06' },
      state: { year: 2018, mode: 'date', from: 'week' },
    }
  );
  changeWeek(
    'changeWeek date  changeWeek 3',
    { value: '2015-02-03', format: 'YYYY-WW', from: 'week' },
    { year: 2019, weeks: 6, mode: 'week' },
    {
      result: { year: 2019, weeks: 6, newValue: '2019-06' },
      state: { year: 2019, mode: 'week', from: 'week' },
    }
  );
  changeWeek(
    'changeWeek date  changeWeek 4',
    { value: '2015-02-03', format: 'YYYY-WW', from: 'weeks' },
    { year: 2019, weeks: 6, mode: 'weeks' },
    {
      result: { year: 2019, weeks: 6, newValue: '2019-06' },
      state: { year: 2019, mode: 'weeks', from: 'week' },
    }
  );

  function monthChangeYear(title: string, props: Object, parmas: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const monthChangeYear = (obj: Object) => {
        result = obj;
      };
      const target = mount(<SwitchPanel {...props} onChangeYear={monthChangeYear} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.monthChangeYear(parmas);
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  monthChangeYear(
    'monthChangeYear 1',
    { value: '2015-02-03' },
    { mode: 'month', from: 'year' },
    { mode: 'month', from: 'year' }
  );
  monthChangeYear(
    'monthChangeYear 2',
    { value: '2015-02-03' },
    { mode: 'month', from: 'date' },
    { mode: 'month', from: 'date' }
  );
  monthChangeYear(
    'monthChangeYear 3',
    { value: '2015-02-03' },
    { mode: 'date', from: 'date' },
    { mode: 'date', from: 'date' }
  );
  monthChangeYear(
    'monthChangeYear 4',
    { value: '2015-02-03' },
    { mode: 'week', from: 'week' },
    { mode: 'week', from: 'week' }
  );
  monthChangeYear(
    'monthChangeYear 5',
    { value: '2015-02-03' },
    { mode: 'weeks', from: 'week' },
    { mode: 'weeks', from: 'week' }
  );
  monthChangeYear(
    'monthChangeYear 6',
    { value: '2015-02-03' },
    { mode: 'year', from: 'month' },
    { mode: 'year', from: 'month' }
  );
});
