import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import DatePicker from '../index';
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
  function DateInputOnChange(title: string, props: Object, params: string, expValue?: Object) {
    it(`onChange ${title}`, async () => {
      const { disabled, readOnly } = props;
      let onChangeParams = {};
      const onChange = (obj: Object) => {
        onChangeParams = obj;
      };
      const target = mount(<DatePicker {...props} onChange={onChange} />);
      const newTarget = getTarget(target, 'DateInput');
      const { oldValue } = newTarget;

      if (disabled || readOnly) {
        expect(oldValue).toBe(undefined);
      } else {
        newTarget.onFocus();
        newTarget.onChange(params);
        for (const i in expValue) {
          expect(onChangeParams[i]).toBe(expValue[i]);
        }
      }
    });
  }
  DateInputOnChange(
    'onChange datePicker click Panel defaultValue 1',
    { defaultValue: '2015-02-03' },
    { newValue: '2015-02-01', action: 'click' },
    { newValue: '2015-02-01', oldValue: '2015-02-03' }
  );
  DateInputOnChange(
    'onChange datePicker click Panel defaultValue 2',
    { defaultValue: '2015-02-03' },
    { newValue: '2015-03-01', action: 'click' },
    { newValue: '2015-03-01', oldValue: '2015-02-03' }
  );
  DateInputOnChange(
    'onChange datePicker click Panel defaultValue 3',
    { defaultValue: '2018-11-20' },
    { newValue: '2018-10-28', action: 'click' },
    { newValue: '2018-10-28', oldValue: '2018-11-20' }
  );
  DateInputOnChange(
    'onChange datePicker click Panel value 3',
    { value: '2018-11-20' },
    { newValue: '2018-09-20', action: 'click' },
    { newValue: '2018-09-20', oldValue: '2018-11-20' }
  );
  DateInputOnChange('onChange datePicker click Panel value 3 disabled', {
    value: '2018-11-20',
    disabled: true,
  });
  DateInputOnChange('onChange datePicker click Panel value 3 readOnly', {
    value: '2018-11-20',
    readOnly: true,
  });
  DateInputOnChange('onChange datePicker click Panel value 3 readOnly', {
    defaultValue: '2018-10-20',
    readOnly: true,
  });

  function dateInputOnFocus(title: string, props: Object, expValue?: Object) {
    it(`onChange ${title}`, async () => {
      const { disabled, readOnly } = props;
      let number = 0;
      const onFocus = () => {
        number = 1;
      };
      const target = mount(<DatePicker {...props} onFocus={onFocus} />);
      const newTarget = getTarget(target, 'DateInput');
      if (disabled || readOnly) {
        const { oldValue } = newTarget;
        expect(oldValue).toBe(undefined);
        expect(number).toBe(0);
      } else {
        newTarget.onFocus();
        const { oldValue } = newTarget;
        expect(oldValue).toBe(expValue.oldValue);
        expect(number).toBe(1);
      }
    });
  }
  dateInputOnFocus(
    'dateInputOnFocus defaultValue',
    { defaultValue: '2018-11-20' },
    { oldValue: '2018-11-20' }
  );
  dateInputOnFocus('dateInputOnFocus disabled', { defaultValue: '2018-11-20', disabled: true });
  dateInputOnFocus('dateInputOnFocus readOnly', { defaultValue: '2018-11-20', readOnly: true });

  function dateInputOnBlur(title: string, props: Object, params: Object, expValue?: Object) {
    it(`onChange ${title}`, async () => {
      const { disabled, readOnly } = props;
      let number = 0;
      const onBlur = () => {
        number = 1;
      };
      const target = mount(<DatePicker {...props} onBlur={onBlur} />);
      const newTarget = getTarget(target, 'DateInput');
      if (!disabled || !readOnly) {
        newTarget.onFocus();
        newTarget.setState({ value: params.stateValue });
        newTarget.onBlur();
        expect(number).toBe(1);
        expect(newTarget.state.value).toBe(expValue.value);
      } else {
        expect(number).toBe(0);
      }
    });
  }
  dateInputOnBlur(
    'dateInputOnBlur defaultValue',
    { defaultValue: '2015-02-03' },
    { stateValue: '2015-02-0' },
    { value: '2015-02-03' }
  );
  dateInputOnBlur('dateInputOnBlur ', {}, { stateValue: '2015-02-02' }, { value: '' });
  dateInputOnBlur(
    'dateInputOnBlur value',
    { value: '2018-01-02' },
    { stateValue: '2015-02-0' },
    { value: '2018-01-02' }
  );
  dateInputOnBlur(
    'dateInputOnBlur disabled',
    { value: '2018-01-02', disabled: true },
    {},
    { value: '2018-01-02' }
  );
  dateInputOnBlur(
    'dateInputOnBlur readOnly',
    { value: '2018-01-02', readOnly: true },
    {},
    { value: '2018-01-02' }
  );
});
