import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import { async } from 'rxjs/internal/scheduler/async';
import Theme from '../../theme/index';
import Widget from '../../consts/index';
import DatePicker from '../index';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { delay } from '@lugia/react-test-utils';
import Head from '../Head';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;
const { expect: exp } = chai;
const moment = require('moment');
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function getTarget(target, component) {
    const newTarget = target
      .find(component)
      .at(0)
      .instance();
    return newTarget;
  }
  function getSandE(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<Head />);
      const newTarget = getTarget(target, 'Head');
      const { start, step, number } = params;
      const { startY, endY, title } = newTarget.getSandE(start, step, number);
      expect(startY).toEqual(expValue.startY);
      expect(endY).toEqual(expValue.endY);
      expect(title).toEqual(expValue.title);
    });
  }
  getSandE(
    'getSandE 1',
    { start: 2015, step: 12, number: 1 },
    { startY: 2159, endY: 2170, title: '2147-2290' }
  );
  getSandE(
    'getSandE 2',
    { start: 2159, step: 12, number: 1 },
    { startY: 2303, endY: 2314, title: '2291-2434' }
  );
  getSandE(
    'getSandE 3',
    { start: 2303, step: 12, number: 1 },
    { startY: 2447, endY: 2458, title: '2435-2578' }
  );
  getSandE(
    'getSandE 4',
    { start: 2303, step: 12, number: -1 },
    { startY: 2159, endY: 2170, title: '2147-2290' }
  );
  getSandE(
    'getSandE 5',
    { start: 2159, step: 12, number: -1 },
    { startY: 2015, endY: 2026, title: '2003-2146' }
  );
  getSandE(
    'getSandE 6',
    { start: 2000, step: 10, number: 1 },
    { startY: 2100, endY: 2109, title: '2090-2189' }
  );
  getSandE(
    'getSandE 7',
    { start: 2000, step: 10, number: -1 },
    { startY: 1900, endY: 1909, title: '1890-1989' }
  );
  getSandE(
    'getSandE 8',
    { start: 1000, step: 10, number: 0 },
    { startY: 900, endY: 909, title: '890-989' }
  );
  getSandE(
    'getSandE 9',
    { start: 1000, step: 10, number: 2 },
    { startY: 1100, endY: 1109, title: '1090-1189' }
  );

  function changeYear(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      let onChangeResult = {};
      const onChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<Head {...props} onChange={onChange} />);
      const newTarget = getTarget(target, 'Head');
      const { number } = params;
      newTarget.changeYear(number)();
      for (const i in expValue) {
        expect(onChangeResult[i]).toEqual(expValue[i]);
      }
    });
  }
  changeYear(
    'changeYear 1',
    { mode: 'month', step: 12, start: 2015 },
    { number: 1 },
    { year: 2016 }
  );
  changeYear(
    'changeYear 2',
    { mode: 'month', step: 12, start: 2016 },
    { number: -1 },
    { year: 2015 }
  );
  changeYear(
    'changeYear 3',
    { mode: 'month', step: 12, start: 2017 },
    { number: -1 },
    { year: 2016 }
  );
  changeYear(
    'changeYear 4',
    { mode: 'month', step: 12, start: 2015 },
    { number: 1 },
    { year: 2016 }
  );
  changeYear(
    'changeYear 5',
    { mode: 'year', showYears: true, step: 12, start: 2015 },
    { number: 1 },
    { start: 2159, end: 2170, showYears: true, title: '2147-2290' }
  );
  changeYear(
    'changeYear 6',
    { mode: 'year', showYears: true, step: 12, start: 2015 },
    { number: -1 },
    { start: 1871, end: 1882, showYears: true, title: '1859-2002' }
  );
  changeYear(
    'changeYear 7',
    { mode: 'date', step: 12, start: 2015 },
    { number: -1 },
    { year: 2014 }
  );
  changeYear(
    'changeYear 8',
    { mode: 'date', step: 12, start: 2015 },
    { number: 1 },
    { year: 2016 }
  );
  changeYear(
    'changeYear 9',
    { mode: 'week', step: 12, start: 2015 },
    { number: 1 },
    { year: 2016 }
  );
  changeYear(
    'changeYear 10',
    { mode: 'weeks', step: 12, start: 2015 },
    { number: 1 },
    { year: 2016 }
  );

  function headClick(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      let onChangeResult = {};
      const headOnChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<Head {...props} headOnChange={headOnChange} />);
      const newTarget = getTarget(target, 'Head');
      newTarget.headClick();
      for (const i in expValue) {
        expect(onChangeResult[i]).toEqual(expValue[i]);
      }
    });
  }
  headClick(
    'headClick 1',
    { value: 2015, step: 12, start: 2015 },
    { end: 2025, showYears: true, start: 2014, title: '2002-2145', year: 2015 }
  );
  headClick(
    'headClick 2',
    { value: 2016, step: 12, start: 2016 },
    { end: 2026, showYears: true, start: 2015, title: '2003-2146', year: 2016 }
  );
  headClick(
    'headClick 3',
    { value: 2017, step: 10, start: 2017 },
    { end: 2025, showYears: true, start: 2016, title: '2006-2105', year: 2017 }
  );
  headClick(
    'headClick 4',
    { value: 2018, step: 10, start: 2018 },
    { end: 2026, showYears: true, start: 2017, title: '2007-2106', year: 2018 }
  );
});
