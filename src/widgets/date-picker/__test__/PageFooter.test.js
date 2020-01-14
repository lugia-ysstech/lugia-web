import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import PageFooter from '../panel/PageFooter';
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
  function handleClick(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = {};
      const onChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(<PageFooter themeProps={{ ...defaultTheme }} onChange={onChange} />);
      const newTarget = getTarget(target, 'PageFooter');
      const { value } = params;
      newTarget.handleClick(value)();
      for (const i in expValue) {
        expect(onChangeResult[i]).toEqual(expValue[i]);
      }
    });
  }
  handleClick('handleClick', { value: '2015-02-03' }, { newValue: '2015-02-03' });
  handleClick('handleClick', { value: '2015-02-04' }, { newValue: '2015-02-04' });
  handleClick('handleClick', { value: '2015-02-05' }, { newValue: '2015-02-05' });
  handleClick('handleClick', { value: '2015-03-05' }, { newValue: '2015-03-05' });
  handleClick('handleClick', { value: '2018-03-05' }, { newValue: '2018-03-05' });

  function publicOnChange(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, () => {
      let onChangeResult = '{}';
      const footerChange = (obj: Object) => {
        onChangeResult = obj;
      };
      const target = mount(
        <PageFooter themeProps={{ ...defaultTheme }} footerChange={footerChange} />
      );
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
      const target = mount(<PageFooter themeProps={{ ...defaultTheme }} {...props} />);
      const newTarget = getTarget(target, 'PageFooter');
      newTarget.statusClick(params.status)();
      const { showTimeMessage, status } = newTarget.state;
      newTarget.timeMessage = showTimeMessage;
      expect(showTimeMessage[status]).toEqual(expValue.showTimeMessage);
      expect(status).toEqual(expValue.status);
    });
  }
  statusClick(
    'statusClick 1',
    { showTime: { showTime: '选择时间', showDate: '选择日期' } },
    { status: 'showTime' },
    { showTimeMessage: '选择日期', status: 'showDate' }
  );
  statusClick(
    'statusClick 2',
    { showTime: { showTime: '选择时间', showDate: '选择日期' } },
    { status: 'showDate' },
    { showTimeMessage: '选择时间', status: 'showTime' }
  );
  statusClick(
    'statusClick 3',
    { showTime: { message: '' } },
    { status: 'showDate' },
    { showTimeMessage: '选择时间', status: 'showTime' }
  );
});
