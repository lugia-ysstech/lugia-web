/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import SwitchPanel from '../switchPanel/SwitchPanel';
import Date from '../panel/Date';
import Year from '../panel/Year';
import Month from '../panel/Month';
import Weeks from '../panel/Weeks';
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
      let result = {};
      const getMode = (obj: Object) => {
        result = obj;
      };
      const target = mount(<SwitchPanel {...props} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      const { mode } = newTarget.state;
      if (mode === 'date' || mode === 'weeks') {
        const Datetarget = mount(<Date {...props} getMode={getMode} />);
        const newDatetarget = getTarget(Datetarget, 'Date');
        const { mode, from } = params;
        newDatetarget.getMode(mode, from);
        newTarget.getMode(result);
        for (const i in expValue.result) {
          expect(result[i]).toBe(expValue.result[i]);
        }
        for (const i in expValue.state) {
          expect(newTarget.state[i]).toBe(expValue.state[i]);
        }
      }
    });
  }
  getMode(
    'getMode date 1',
    { mode: 'date', value: '2018-02-03', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-02-03', year: 2018, month: 1, weeks: 5 },
      state: { mode: 'year', from: 'date', date: '2018-02-03', year: 2018, month: 1, weeks: 5 },
    }
  );
  getMode(
    'getMode date 2',
    { mode: 'date', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'year', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode date 3',
    { mode: 'date', value: '2018-09-03', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-09-03', year: 2018, month: 8, weeks: 36 },
      state: { mode: 'year', from: 'date', date: '2018-09-03', year: 2018, month: 8, weeks: 36 },
    }
  );
  getMode(
    'getMode date 4',
    { mode: 'date', value: '2018-04-05', format: 'YYYY-MM-DD' },
    { mode: 'month', from: 'date' },
    {
      result: { mode: 'month', from: 'date', date: '2018-04-05', year: 2018, month: 3, weeks: 14 },
      state: { mode: 'month', from: 'date', date: '2018-04-05', year: 2018, month: 3, weeks: 14 },
    }
  );
  getMode(
    'getMode date 5',
    { mode: 'date', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'month', from: 'date' },
    {
      result: { mode: 'month', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'month', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode date 6',
    { mode: 'date', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'week', from: 'date' },
    {
      result: { mode: 'week', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'week', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode date 7',
    { mode: 'date', value: '2018-12-05', format: 'YYYY-MM-DD' },
    { mode: 'week', from: 'date' },
    {
      result: { mode: 'week', from: 'date', date: '2018-12-05', year: 2018, month: 11, weeks: 49 },
      state: { mode: 'week', from: 'date', date: '2018-12-05', year: 2018, month: 11, weeks: 49 },
    }
  );
  getMode(
    'getMode weeks 8',
    { mode: 'weeks', value: '2018-02-03', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-02-03', year: 2018, month: 1, weeks: 5 },
      state: { mode: 'year', from: 'date', date: '2018-02-03', year: 2018, month: 1, weeks: 5 },
    }
  );
  getMode(
    'getMode weeks 9',
    { mode: 'weeks', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'year', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode weeks 10',
    { mode: 'weeks', value: '2018-09-03', format: 'YYYY-MM-DD' },
    { mode: 'year', from: 'date' },
    {
      result: { mode: 'year', from: 'date', date: '2018-09-03', year: 2018, month: 8, weeks: 36 },
      state: { mode: 'year', from: 'date', date: '2018-09-03', year: 2018, month: 8, weeks: 36 },
    }
  );
  getMode(
    'getMode weeks 11',
    { mode: 'weeks', value: '2018-04-05', format: 'YYYY-MM-DD' },
    { mode: 'month', from: 'date' },
    {
      result: { mode: 'month', from: 'date', date: '2018-04-05', year: 2018, month: 3, weeks: 14 },
      state: { mode: 'month', from: 'date', date: '2018-04-05', year: 2018, month: 3, weeks: 14 },
    }
  );
  getMode(
    'getMode weeks 12',
    { mode: 'weeks', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'month', from: 'date' },
    {
      result: { mode: 'month', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'month', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode weeks 13',
    { mode: 'weeks', value: '2018-03-01', format: 'YYYY-MM-DD' },
    { mode: 'week', from: 'date' },
    {
      result: { mode: 'week', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
      state: { mode: 'week', from: 'date', date: '2018-03-01', year: 2018, month: 2, weeks: 9 },
    }
  );
  getMode(
    'getMode weeks 14',
    { mode: 'weeks', value: '2018-12-05', format: 'YYYY-MM-DD' },
    { mode: 'week', from: 'date' },
    {
      result: { mode: 'week', from: 'date', date: '2018-12-05', year: 2018, month: 11, weeks: 49 },
      state: { mode: 'week', from: 'date', date: '2018-12-05', year: 2018, month: 11, weeks: 49 },
    }
  );

  function changeYear(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeYear = (obj: Object) => {
        result = obj;
      };
      const Yeartarget = mount(<Year {...props} onChange={changeYear} />);
      Yeartarget.find('FacePanel')
        .at(0)
        .instance()
        .panelClick(params.year)();
      const target = mount(<SwitchPanel {...props} mode={params.mode} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeYear(result);
      for (const i in expValue.result) {
        expect(result[i]).toBe(expValue.result[i]);
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeYear(
    'changeYear date changeYear 1',
    { defaultValue: '2015-02-03', from: 'date' },
    { year: 2018, mode: 'date' },
    {
      result: { newValue: 2018, oldValue: 2015, from: 'date', mode: 'date' },
      state: { year: 2018, mode: 'date', value: '2015-02-03' },
    }
  );
  changeYear(
    'changeYear date changeYear 2',
    { defaultValue: '2018-02-03', from: 'date' },
    { year: 2020, mode: 'date' },
    {
      result: { newValue: 2020, oldValue: 2018, from: 'date', mode: 'date' },
      state: { year: 2020, mode: 'date', value: '2018-02-03' },
    }
  );
  changeYear(
    'changeYear week changeYear 3',
    { defaultValue: '2019-02-03', from: 'week' },
    { year: 2015, mode: 'week' },
    {
      result: { newValue: 2015, oldValue: 2019, from: 'week', mode: 'week' },
      state: { year: 2015, mode: 'week', value: '2019-02-03' },
    }
  );
  changeYear(
    'changeYear week changeYear 4',
    { defaultValue: '2019-02-03', from: 'week' },
    { year: 2015, mode: 'week' },
    {
      result: { newValue: 2015, oldValue: 2019, from: 'week', mode: 'week' },
      state: { year: 2015, mode: 'week', value: '2019-02-03' },
    }
  );
  changeYear(
    'changeYear weeks changeYear 5',
    { defaultValue: '2019-02-03', from: 'weeks' },
    { year: 2015, mode: 'weeks' },
    {
      result: { newValue: 2015, oldValue: 2019, from: 'weeks', mode: 'weeks' },
      state: { year: 2015, mode: 'weeks', value: '2019-02-03' },
    }
  );
  changeYear(
    'changeYear weeks changeYear 6',
    { defaultValue: '2015-02-03', from: 'weeks' },
    { year: 2023, mode: 'weeks' },
    {
      result: { newValue: 2023, oldValue: 2015, from: 'weeks', mode: 'weeks' },
      state: { year: 2023, mode: 'weeks', value: '2015-02-03' },
    }
  );
  changeYear(
    'changeYear month changeYear 7',
    { defaultValue: '2012-02-06', from: 'month' },
    { year: 2010, mode: 'month' },
    {
      result: { newValue: 2010, oldValue: 2012, from: 'month', mode: 'month' },
      state: { year: 2010, mode: 'month', value: '2012-02-06' },
    }
  );
  changeYear(
    'changeYear month changeYear 8',
    { defaultValue: '2025-02-06', from: 'month' },
    { year: 2009, mode: 'month' },
    {
      result: { newValue: 2009, oldValue: 2025, from: 'month', mode: 'month' },
      state: { year: 2009, mode: 'month', value: '2025-02-06' },
    }
  );
  changeYear(
    'changeYear year changeYear 9',
    { defaultValue: '2025-02-06', from: 'year' },
    { year: 2009, mode: 'year' },
    {
      result: { newValue: 2009, oldValue: 2025, from: 'year', mode: 'year' },
      state: { year: 2009, mode: 'year', value: 2009 },
    }
  );
  changeYear(
    'changeYear year changeYear 10',
    { defaultValue: '2019-02-06', from: 'year' },
    { year: 2013, mode: 'year' },
    {
      result: { newValue: 2013, oldValue: 2019, from: 'year', mode: 'year' },
      state: { year: 2013, mode: 'year', value: 2013 },
    }
  );

  function changeMonth(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeMonth = (obj: Object) => {
        result = obj;
      };
      const Monthtarget = mount(<Month {...props} onChange={changeMonth} />);
      Monthtarget.find('FacePanel')
        .at(0)
        .instance()
        .panelClick(params.monthIndex)();
      const target = mount(<SwitchPanel {...props} mode={params.mode} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeMonth(result);
      for (const i in expValue.result) {
        expect(result[i]).toBe(expValue.result[i]);
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeMonth(
    'changeMonth date changeMonth 1',
    { defaultValue: '2015-02-03', from: 'date' },
    { monthIndex: 2, mode: 'date' },
    {
      result: { newValue: '2015-03-03', oldValue: '2015-02-03', from: 'date', mode: 'date' },
      state: { month: 2, year: 2015, choseValue: '2015-03-03', mode: 'date', value: '2015-02-03' },
    }
  );
  changeMonth(
    'changeMonth date changeMonth 2',
    { defaultValue: '2026-03-03', from: 'date' },
    { monthIndex: 0, mode: 'date' },
    {
      result: { newValue: '2026-01-03', oldValue: '2026-03-03', from: 'date', mode: 'date' },
      state: { month: 0, year: 2026, choseValue: '2026-01-03', mode: 'date', value: '2026-03-03' },
    }
  );
  changeMonth(
    'changeMonth weeks changeMonth 3',
    { defaultValue: '2026-03-03', from: 'weeks' },
    { monthIndex: 0, mode: 'weeks' },
    {
      result: { newValue: '2026-01-03', oldValue: '2026-03-03', from: 'weeks', mode: 'weeks' },
      state: { month: 0, year: 2026, choseValue: '2026-01-03', mode: 'date', value: '2026-03-03' },
    }
  );
  changeMonth(
    'changeMonth weeks changeMonth 4',
    { defaultValue: '2015-01-12', from: 'weeks' },
    { monthIndex: 11, mode: 'weeks' },
    {
      result: { newValue: '2015-12-12', oldValue: '2015-01-12', from: 'weeks', mode: 'weeks' },
      state: { month: 11, year: 2015, choseValue: '2015-12-12', mode: 'date', value: '2015-01-12' },
    }
  );
  changeMonth(
    'changeMonth month changeMonth 4',
    { defaultValue: '2015-01-12', from: 'month' },
    { monthIndex: 10, mode: 'month' },
    {
      result: { newValue: '2015-11-12', oldValue: '2015-01-12', from: 'month', mode: 'month' },
      state: { month: 10, year: 2015, choseValue: '2015-11', value: '2015-11' },
    }
  );
  changeMonth(
    'changeMonth month changeMonth 4',
    { defaultValue: '2015-02-12', from: 'month' },
    { monthIndex: 0, mode: 'month' },
    {
      result: { newValue: '2015-01-12', oldValue: '2015-02-12', from: 'month', mode: 'month' },
      state: { month: 0, year: 2015, choseValue: '2015-01', value: '2015-01' },
    }
  );
  function changeWeek(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const changeWeek = (obj: Object) => {
        result = obj;
      };
      const Monthtarget = mount(<Weeks {...props} onChange={changeWeek} />);
      Monthtarget.find('FacePanel')
        .at(0)
        .instance()
        .panelClick(params.weeksP)();
      const target = mount(<SwitchPanel {...props} mode={params.mode} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.changeWeek(result);
      for (const i in expValue.result) {
        expect(result[i]).toBe(expValue.result[i]);
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toBe(expValue.state[i]);
      }
    });
  }
  changeWeek(
    'changeWeek date  changeWeek 1',
    { defaultValue: '2015-02-03', from: 'date' },
    { weeksP: { text: '第50周', weeks: 50 }, mode: 'date' },
    { result: { year: 2015, weeks: 50 }, state: { year: 2015, mode: 'date', from: 'date' } }
  );
  changeWeek(
    'changeWeek date  changeWeek 2',
    { defaultValue: '2018-02-03', from: 'date' },
    { weeksP: { text: '第01周', weeks: 1 }, mode: 'date' },
    { result: { year: 2018, weeks: 1 }, state: { year: 2018, mode: 'date', from: 'date' } }
  );
  changeWeek(
    'changeWeek week  changeWeek 3',
    { defaultValue: '2017-02-03', from: 'week' },
    { weeksP: { text: '第05周', weeks: 5 }, mode: 'week' },
    { result: { year: 2017, weeks: 5 }, state: { year: 2017, from: 'week', value: '2017-05' } }
  );
  changeWeek(
    'changeWeek week  changeWeek 4',
    { defaultValue: '2019-02-03', from: 'week' },
    { weeksP: { text: '第20周', weeks: 20 }, mode: 'week' },
    { result: { year: 2019, weeks: 20 }, state: { year: 2019, from: 'week', value: '2019-20' } }
  );
  changeWeek(
    'changeWeek week  changeWeek 5',
    { defaultValue: '2020-02-03', from: 'weeks' },
    { weeksP: { text: '第10周', weeks: 10 }, mode: 'weeks' },
    { result: { year: 2020, weeks: 10 }, state: { year: 2020, from: 'weeks', value: '2020-10' } }
  );
  changeWeek(
    'changeWeek week  changeWeek 6',
    { defaultValue: '2021-02-03', from: 'weeks' },
    { weeksP: { text: '第21周', weeks: 21 }, mode: 'weeks' },
    { result: { year: 2021, weeks: 21 }, state: { year: 2021, from: 'weeks', value: '2021-21' } }
  );

  function monthChangeYear(title: string, props: Object, expValue: Object) {
    it(`${title}`, () => {
      let result = {};
      const monthChangeYear = (obj: Object) => {
        result = obj;
      };
      const Monthtarget = mount(<Month {...props} onChangeYear={monthChangeYear} />);
      Monthtarget.find('Head')
        .at(0)
        .instance()
        .headClick();
      const target = mount(<SwitchPanel {...props} />);
      const newTarget = getTarget(target, 'SwitchPanel');
      newTarget.monthChangeYear(result);
      for (const i in expValue.result) {
        expect(result[i]).toBe(expValue.result[i]);
      }
      for (const i in expValue.state) {
        expect(newTarget.state).toBe(expValue.state[i]);
      }
    });
  }
  monthChangeYear(
    'monthChangeYear 1',
    { defaultValue: '2015-02-06' },
    {
      result: { newValue: '2015-02', from: 'month', mode: 'year' },
      state: { value: '2015-02-06', year: 2015, month: 1, from: 'month', mode: 'year' },
    }
  );
  monthChangeYear(
    'monthChangeYear 2',
    { defaultValue: '2018-03-06' },
    {
      result: { newValue: '2018-03', from: 'month', mode: 'year' },
      state: { value: '2018-03-06', year: 2018, month: 2, from: 'month', mode: 'year' },
    }
  );
  monthChangeYear(
    'monthChangeYear 3',
    { defaultValue: '2019-05-06' },
    {
      result: { newValue: '2019-05', from: 'month', mode: 'year' },
      state: { value: '2019-05-06', year: 2019, month: 4, from: 'month', mode: 'year' },
    }
  );
});
