import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import { async } from 'rxjs/internal/scheduler/async';
import PageFooter from '../PageFooter';
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
  function handleClick(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = {};
      const onChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<PageFooter onChange={onChange} />);
      const newTarget = getTarget(target, 'PageFooter');
      const { value } = params;
      newTarget.handleClick(value)();
      for (const i in expValue) {
        expect(onChangeResult[i]).toEqual(expValue[i]);
      }
    });
  }
  handleClick(
    'handleClick',
    { value: '2015-02-03' },
    { newValue: '2015-02-03', footerOption: true }
  );
  handleClick(
    'handleClick',
    { value: '2015-02-04' },
    { newValue: '2015-02-04', footerOption: true }
  );
  handleClick(
    'handleClick',
    { value: '2015-02-05' },
    { newValue: '2015-02-05', footerOption: true }
  );
  handleClick(
    'handleClick',
    { value: '2015-03-05' },
    { newValue: '2015-03-05', footerOption: true }
  );
  handleClick(
    'handleClick',
    { value: '2018-03-05' },
    { newValue: '2018-03-05', footerOption: true }
  );

  function publicOnChange(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = '{}';
      const footerChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<PageFooter footerChange={footerChange} />);
      const newTarget = getTarget(target, 'PageFooter');
      const { status } = params;
      newTarget.publicOnChange(status);
      expect(onChangeResult).toEqual(expValue.status);
    });
  }
  publicOnChange('publicOnChange 1', { status: 'onOk' }, { status: 'onOk' });
  publicOnChange('publicOnChange 2', { status: 'showTime' }, { status: 'showTime' });
  publicOnChange('publicOnChange 2', { status: 'showDate' }, { status: 'showDate' });

  function statusClick(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      const target = mount(<PageFooter {...props} />);
      const newTarget = getTarget(target, 'PageFooter');
      const { status } = params;
      newTarget.statusClick(status)();
      const { showTimeMessage } = newTarget.state;
      newTarget.timeMessage = showTimeMessage;
      expect(newTarget.state.showTimeMessage).toEqual(expValue.showTimeMessage);
    });
  }
  statusClick(
    'statusClick 1',
    { showTime: { message: '选择时间' } },
    { status: 'showTime' },
    { showTimeMessage: '选择日期', status: 'showDate' }
  );
  statusClick(
    'statusClick 1',
    { showTime: { message: 'show Time' } },
    { status: 'showDate' },
    { showTimeMessage: 'show Time', status: 'showTime' }
  );
  statusClick(
    'statusClick 1',
    { showTime: { message: '' } },
    { status: 'showDate' },
    { showTimeMessage: '选择时间', status: 'showTime' }
  );
});
