/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Year from '../panel/Year';
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
  function arrorChange(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Year themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'Year');
      newTarget.arrorChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  arrorChange(
    'arrorChange 1',
    { year: 2019, mode: 'date', from: 'date' },
    { start: 2015, end: 2027, showYears: true, title: '2015-2027' },
    { start: 2015, end: 2027, showYears: true, title: '2015-2027' }
  );
  arrorChange(
    'arrorChange 2',
    { year: 2019, mode: 'date', from: 'date' },
    { start: 2016, end: 2028, showYears: true, title: '2016-2028' },
    { start: 2016, end: 2028, showYears: true, title: '2016-2028' }
  );
  arrorChange(
    'arrorChange 3',
    { year: 2019, mode: 'date', from: 'date' },
    { start: 2017, end: 2029, showYears: false, title: '2017-2029' },
    { start: 2017, end: 2029, showYears: false, title: '2017-2029' }
  );

  function headOnChange(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(<Year {...props} />);
      const newTarget = getTarget(target, 'Year');
      newTarget.headOnChange(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  headOnChange(
    'headOnChange 1',
    { year: 2019, mode: 'date', from: 'date' },
    { start: 2015, end: 2016, showYears: true, title: '2015-2016' },
    { start: 2015, end: 2016, showYears: true, title: '2015-2016' }
  );
  headOnChange(
    'headOnChange 2',
    { year: 2019, mode: 'date', from: 'date' },
    { start: 2018, end: 2026, showYears: false, title: '2018-2026' },
    { start: 2018, end: 2026, showYears: false, title: '2018-2026' }
  );

  function panelChange(title: string, props: Object, params: Object, expValue: Object) {
    let result = {};
    const onChange = obj => {
      result = obj;
    };
    it(`${title}`, () => {
      const target = mount(<Year {...props} onChange={onChange} />);
      const newTarget = getTarget(target, 'Year');
      const { showYears } = params;
      newTarget.panelChange(params);
      if (showYears) {
        for (const i in expValue.result) {
          expect(result[i]).toEqual(expValue.result[i]);
        }
      } else {
        expect(result).toEqual({});
      }
      for (const i in expValue.state) {
        expect(newTarget.state[i]).toEqual(expValue.state[i]);
      }
    });
  }
  panelChange(
    'panelChange  showYears false 1',
    { year: 2019, mode: 'date', from: 'date' },
    { showYears: false, start: 2010, text: '2010-2011' },
    {
      state: { start: 2011, title: '2010-2011' },
      result: { year: 2010, from: 'date', mode: 'date' },
    }
  );
  panelChange(
    'panelChange showYears false 2',
    { year: 2018, mode: 'date', from: 'date' },
    { showYears: false, start: 2012, text: '2011-2022' },
    {
      state: { start: 2013, title: '2011-2022' },
      result: { year: 2012, from: 'date', mode: 'date' },
    }
  );
  panelChange(
    'panelChange  showYears true 3',
    { year: 2018, mode: 'date', from: 'date' },
    { showYears: true, start: 2019, text: '2011-2022' },
    {
      state: { start: 2019, title: '2011-2022' },
      result: { year: 2019, from: 'date', mode: 'date' },
    }
  );
  panelChange(
    'panelChange  showYears true 4',
    { year: 2018, mode: 'date', from: 'date' },
    { showYears: true, start: 2013, text: '2011-2022' },
    {
      state: { start: 2013, title: '2011-2022' },
      result: { year: 2013, from: 'date', mode: 'date' },
    }
  );
});
