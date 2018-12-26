/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import Weeks from '../panel/Weeks';
import moment from 'moment';
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
  //arrorChange
  function arrorChange(title: string, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Weeks />);
      const newTarget = getTarget(target, 'Weeks');
      newTarget.arrorChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  arrorChange('arrorChange 1', { year: '2015' }, { year: '2015' });
  arrorChange('arrorChange 2', { year: '2016' }, { year: '2016' });
  arrorChange('arrorChange 3', { year: '' }, { year: '' });

  function headOnChange(title: string, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Weeks />);
      const newTarget = getTarget(target, 'Weeks');
      newTarget.headOnChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  headOnChange('headOnChange 1', { year: '2015' }, { year: '2015' });
  headOnChange('headOnChange 2', { year: '2016' }, { year: '2016' });
  headOnChange('headOnChange 3', { year: '2018' }, { year: '2018' });
  headOnChange('headOnChange 4', { year: '' }, { year: '' });

  function getFreshPicker(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Weeks {...props} />);
      const newTarget = getTarget(target, 'Weeks');
      const { value, format, mode, from, year, weeks } = params;
      const moments = moment(value, format).set({ year, weeks });
      newTarget.getFreshPicker({ moments, mode, from });
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  getFreshPicker(
    'getFreshPicker 1',
    { step: 12 },
    { value: '2015-02', format: 'YYYY-WW', mode: 'date', from: 'date', year: '2015', weeks: 2 },
    { secondTitle: '1-12周', year: 2015, weeks: 2, mode: 'date', from: 'date', isWeekInner: true }
  );
  getFreshPicker(
    'getFreshPicker 2',
    { step: 12 },
    { value: '2015-02', format: 'YYYY-WW', mode: 'date', from: 'date', year: '2015', weeks: 13 },
    { secondTitle: '13-24周', year: 2015, weeks: 13, mode: 'date', from: 'date', isWeekInner: true }
  );
  getFreshPicker(
    'getFreshPicker 3',
    { step: 12 },
    { value: '2015-03', format: 'YYYY-WW', mode: 'week', from: 'week', year: '2015', weeks: 3 },
    { secondTitle: '1-12周', year: 2015, weeks: 3, mode: 'week', from: 'week', isWeekInner: true }
  );
  getFreshPicker(
    'getFreshPicker 4',
    { step: 12 },
    { value: '2015-03', format: 'YYYY-WW', mode: 'week', from: 'week', year: '2015', weeks: 20 },
    { secondTitle: '13-24周', year: 2015, weeks: 20, mode: 'week', from: 'week', isWeekInner: true }
  );
  getFreshPicker(
    'getFreshPicker 5',
    { step: 10 },
    { value: '2015-03', format: 'YYYY-WW', mode: 'date', from: 'date', year: '2015', weeks: 11 },
    { secondTitle: '11-20周', year: 2015, weeks: 11, mode: 'date', from: 'date', isWeekInner: true }
  );
  getFreshPicker(
    'getFreshPicker 6',
    { step: 9 },
    { value: '2015-03', format: 'YYYY-WW', mode: 'date', from: 'date', year: '2015', weeks: 11 },
    { secondTitle: '10-18周', year: 2015, weeks: 11, mode: 'date', from: 'date', isWeekInner: true }
  );

  function panelChange(title: string, props: Object, params: Object, expValue: Object) {
    let result = {};
    const onChange = obj => {
      result = obj;
    };
    it(`${title}`, () => {
      const target = mount(<Weeks {...props} onChange={onChange} />);
      const newTarget = getTarget(target, 'Weeks');
      const { isWeekInner } = params;
      newTarget.panelChange(params);
      let results;
      if (isWeekInner) {
        expect(result).toEqual({});
        results = newTarget.state;
      } else {
        results = result;
      }

      for (const i in expValue) {
        expect(results[i]).toEqual(expValue[i]);
      }
    });
  }
  panelChange(
    'panelChange 1',
    { defaultValue: '2015-02', mode: 'date', from: 'date', format: 'YYYY-WW' },
    { isWeekInner: true, start: 1, text: '1-12', weeks: 2 },
    { secondTitle: '1-12', isWeekInner: true, weeks: 2, year: 2015 }
  );
  panelChange(
    'panelChange 2',
    { defaultValue: '2018-03', mode: 'date', from: 'date', format: 'YYYY-WW' },
    { isWeekInner: true, start: 1, text: '1-12', weeks: 3 },
    { secondTitle: '1-12', isWeekInner: true, weeks: 2, year: 2018 }
  );
  panelChange(
    'panelChange 3',
    { defaultValue: '2018-03', mode: 'date', from: 'date', format: 'YYYY-WW' },
    { isWeekInner: true, start: 3, text: '1-12', weeks: 3 },
    { secondTitle: '1-12', isWeekInner: true, weeks: 4, year: 2018 }
  );
  panelChange(
    'panelChange 4',
    { defaultValue: '2018-03', mode: 'week', from: 'week', format: 'YYYY-WW' },
    { isWeekInner: false, start: 1, text: '1-12', weeks: 4 },
    { year: 2018, weeks: 4, mode: 'week', from: 'week', newValue: '2018-04' }
  );
  panelChange(
    'panelChange 5',
    { defaultValue: '2017-03', mode: 'week', from: 'week', format: 'YYYY-WW' },
    { isWeekInner: false, start: 1, text: '1-12', weeks: 10 },
    { year: 2017, weeks: 10, mode: 'week', from: 'week', newValue: '2017-10' }
  );
  panelChange(
    'panelChange 6',
    { defaultValue: '2016-03', mode: 'week', from: 'week', format: 'YYYY-WW' },
    { isWeekInner: false, start: 1, text: '1-12', weeks: 11 },
    { year: 2016, weeks: 11, mode: 'week', from: 'week', newValue: '2016-11' }
  );
});
