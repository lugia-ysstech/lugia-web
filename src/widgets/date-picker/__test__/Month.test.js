import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Month from '../panel/Month';
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
      newTarget.panelChange(params);
      for (const i in expValue) {
        expect(onChangeResult[i]).toBe(expValue[i]);
      }
    });
  }
  panelChange(
    'onChange 1',
    { year: 2015, month: 4, mode: 'date' },
    { month: 5 },
    { mode: 'date', from: 'date', year: 2015, month: 5 }
  );
  panelChange(
    'onChange 2',
    { year: 2015, month: 4, mode: 'year' },
    { month: 6 },
    { mode: 'year', from: 'year', year: 2015, month: 6 }
  );
  panelChange(
    'onChange 3',
    { year: 2015, month: 4, mode: 'month' },
    { month: 6 },
    { mode: 'month', from: 'month', year: 2015, month: 6 }
  );
  panelChange(
    'onChange 4',
    { year: 2019, month: 5, mode: 'month' },
    { month: 3 },
    { mode: 'month', from: 'month', year: 2019, month: 3 }
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
    { year: 2015, month: 5 },
    { newValue: '2015-06', mode: 'year', from: 'month' }
  );
  headOnChange(
    'headOnChange 2',
    { year: 2017, month: 5 },
    { newValue: '2017-06', mode: 'year', from: 'month' }
  );
  headOnChange(
    'headOnChange 3',
    { year: 2019, month: 4 },
    { newValue: '2019-05', mode: 'year', from: 'month' }
  );
});
