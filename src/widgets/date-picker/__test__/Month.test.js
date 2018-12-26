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
import Month from '../Month';
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
  function arrorChange(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<Month />);
      const newTarget = getTarget(target, 'Month');
      newTarget.arrorChange(params);
      const { year } = newTarget.state;
      expect(year).toEqual(expValue.year);
    });
  }
  arrorChange('arrorChange 1', { year: 2015 }, { year: 2015 });
  arrorChange('arrorChange 2', { year: 2016 }, { year: 2016 });
  arrorChange('arrorChange 3', { year: 2019 }, { year: 2019 });
  arrorChange('arrorChange 4', { year: 2018 }, { year: 2018 });

  function panelChange(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = {};
      const onChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<Month {...props} onChange={onChange} />);
      const newTarget = getTarget(target, 'Month');
      const { monthIndex } = params;
      newTarget.panelChange({ monthIndex });
      for (const i in expValue) {
        expect(onChangeResult[i]).toBe(expValue[i]);
      }
    });
  }
  panelChange(
    'onChange 1',
    { defaultValue: '2015-03', from: 'date' },
    { monthIndex: 1 },
    { newValue: '2015-02-01', oldValue: '2015-03-01', mode: 'date', from: 'date' }
  );
  panelChange(
    'onChange 2',
    { defaultValue: '2015-05', from: 'year' },
    { monthIndex: 2 },
    { newValue: '2015-03-01', oldValue: '2015-05-01', mode: 'year', from: 'year' }
  );
  panelChange(
    'onChange 3',
    { defaultValue: '2015-07', from: 'week' },
    { monthIndex: 5 },
    { newValue: '2015-06-01', oldValue: '2015-07-01', mode: 'week', from: 'week' }
  );
  panelChange(
    'onChange 4',
    { value: '2015-07', from: 'week' },
    { monthIndex: 5 },
    { newValue: '2015-06-01', oldValue: '2015-07-01', mode: 'week', from: 'week' }
  );

  function headOnChange(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = {};
      const onChangeYear = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<Month {...props} onChangeYear={onChangeYear} />);
      const newTarget = getTarget(target, 'Month');
      newTarget.headOnChange();
      for (const i in expValue) {
        expect(onChangeResult[i]).toBe(expValue[i]);
      }
    });
  }
  headOnChange(
    'headOnChange 1',
    { defaultValue: '2015-02' },
    { newValue: '2015-02', mode: 'year', from: 'month' }
  );
  headOnChange(
    'headOnChange 2',
    { defaultValue: '2015-03' },
    { newValue: '2015-03', mode: 'year', from: 'month' }
  );
  headOnChange(
    'headOnChange 3',
    { defaultValue: '2015-04' },
    { newValue: '2015-04', mode: 'year', from: 'month' }
  );

  function getFreshPicker(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      const target = mount(<Month />);
      const newTarget = getTarget(target, 'Month');
      const { format } = newTarget.state;
      const { value } = params;
      const moments = moment(value, format);
      newTarget.getFreshPicker({ moments });
      for (const i in expValue) {
        expect(newTarget.state[i]).toBe(expValue[i]);
      }
    });
  }
  getFreshPicker('getFreshPicker 1', { value: '2018-02' }, { year: 2018, monthIndex: 1 });
  getFreshPicker('getFreshPicker 2', { value: '2018-03' }, { year: 2018, monthIndex: 2 });
  getFreshPicker('getFreshPicker 2', { value: '2017-03' }, { year: 2017, monthIndex: 2 });
  getFreshPicker('getFreshPicker 2', { value: '2016-12' }, { year: 2016, monthIndex: 11 });
  getFreshPicker('getFreshPicker 2', { value: '2016-01' }, { year: 2016, monthIndex: 0 });
});
