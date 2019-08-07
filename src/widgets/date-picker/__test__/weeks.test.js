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
  function arrorChange(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Weeks {...props} />);
      const newTarget = getTarget(target, 'Weeks');
      newTarget.arrorChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  arrorChange(
    'arrorChange 1',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '2015' },
    { year: '2015' }
  );
  arrorChange(
    'arrorChange 2',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '2016' },
    { year: '2016' }
  );
  arrorChange(
    'arrorChange 3',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '' },
    { year: '' }
  );

  function headOnChange(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Weeks {...props} />);
      const newTarget = getTarget(target, 'Weeks');
      newTarget.headOnChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  headOnChange(
    'headOnChange 1',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '2015' },
    { year: '2015' }
  );
  headOnChange(
    'headOnChange 2',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '2016' },
    { year: '2016' }
  );
  headOnChange(
    'headOnChange 3',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '2018' },
    { year: '2018' }
  );
  headOnChange(
    'headOnChange 4',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { year: '' },
    { year: '' }
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
      if (isWeekInner) {
        expect(result).toEqual({});
        for (const i in expValue.state) {
          expect(newTarget.state[i]).toEqual(expValue.state[i]);
        }
      } else {
        for (const i in expValue.result) {
          expect(result[i]).toEqual(expValue.result[i]);
        }
      }
    });
  }
  panelChange(
    'panelChange isWeekInner true 1',
    { year: 2015, weeks: 3, from: 'date', mode: 'date' },
    { isWeekInner: true, start: 1, text: '1-12', weeks: 2 },
    {
      state: { secondTitle: '1-12周', isWeekInner: true, weeks: 2, year: 2015 },
      result: { year: 2015, weeks: 2, mode: 'date', from: 'week' },
    }
  );
  panelChange(
    'panelChange isWeekInner true 2',
    { year: 2019, weeks: 5, from: 'weeks', mode: 'weeks' },
    { isWeekInner: true, start: 13, text: '13-24', weeks: 15 },
    {
      state: { secondTitle: '13-24周', isWeekInner: true, weeks: 14, year: 2019 },
      result: { year: 2019, weeks: 15, mode: 'weeks', from: 'week' },
    }
  );
  panelChange(
    'panelChange isWeekInner false 3',
    { year: 2019, weeks: 5, from: 'weeks', mode: 'weeks' },
    { isWeekInner: false, start: 13, text: '13-24', weeks: 15 },
    {
      state: { secondTitle: '13-24周', isWeekInner: true, weeks: 14, year: 2019 },
      result: { year: 2019, weeks: 15, mode: 'weeks' },
    }
  );
  panelChange(
    'panelChange isWeekInner false 4',
    { year: 2020, weeks: 5, from: 'weeks', mode: 'weeks' },
    { isWeekInner: false, start: 25, text: '25-36', weeks: 30 },
    {
      state: { secondTitle: '25-36周', isWeekInner: true, weeks: 26, year: 2020 },
      result: { year: 2020, weeks: 30, mode: 'weeks' },
    }
  );
});
