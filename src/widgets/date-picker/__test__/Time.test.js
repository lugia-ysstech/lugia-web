/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Time from '../panel/Time';
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
  const defaultThmeFunction = {
    getPartOfThemeProps: () => {
      return { ...defaultTheme };
    },
    getPartOfThemeHocProps: () => {
      return { viewClass: {} };
    },
  };
  function onClick(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(
        <Time themeProps={{ ...defaultTheme }} {...defaultThmeFunction} {...props} />
      );
      const newTarget = getTarget(target, 'Time');
      const { value, index, propsValue } = params;
      newTarget.onClick('event', { value }, index);
      target.setProps({ value: propsValue });
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  onClick(
    'onClick 1',
    { value: '00:00:00', format: 'HH:mm:ss' },
    { value: 1, index: 0, propsValue: '01:00:00' },
    { keys: [1, 0, 0], starts: [1, 0, 0], isScroll: true }
  );
  onClick(
    'onClick 2',
    { format: 'HH:mm:ss' },
    { value: 1, index: 0, propsValue: '01:00:00' },
    { keys: [1, 0, 0], starts: [1, '', ''], isScroll: true }
  );
  onClick(
    'onClick 3',
    { format: 'HH:mm:ss' },
    { value: 2, index: 1, propsValue: '00:02:00' },
    { keys: [0, 2, 0], starts: ['', 2, ''], isScroll: true }
  );
  onClick(
    'onClick 4',
    { format: 'HH:mm:ss' },
    { value: 2, index: 2, propsValue: '00:00:02' },
    { keys: [0, 0, 2], starts: ['', '', 2], isScroll: true }
  );
  onClick(
    'onClick 5',
    { value: '02:03:04', format: 'HH:mm:ss' },
    { value: 0, index: 0, propsValue: '00:03:04' },
    { keys: [0, 3, 4], starts: [0, 3, 4], isScroll: true }
  );
  onClick(
    'onClick 6',
    { value: '02:03:04', format: 'HH:mm:ss' },
    { value: 0, index: 1, propsValue: '02:00:04' },
    { keys: [2, 0, 4], starts: [2, 0, 4], isScroll: true }
  );
  onClick(
    'onClick 7',
    { value: '02:03:04', format: 'HH:mm:ss' },
    { value: 0, index: 2, propsValue: '02:03:00' },
    { keys: [2, 3, 0], starts: [2, 3, 0], isScroll: true }
  );

  function getValue(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(
        <Time themeProps={{ ...defaultTheme }} {...defaultThmeFunction} {...props} />
      );
      const newTarget = getTarget(target, 'Time');
      const { keys } = params;
      const val = newTarget.getValue(keys);
      expect(val).toEqual(expValue.value);
    });
  }
  getValue('getValue 1', { format: 'HH:mm:ss' }, { keys: [0, 1, 2] }, { value: '00:01:02' });
  getValue('getValue 2', { format: 'HH:mm:ss' }, { keys: [3, 1, 2] }, { value: '03:01:02' });
  getValue('getValue 3', { format: 'HH:mm:ss' }, { keys: [4, 5, 2] }, { value: '04:05:02' });
  getValue('getValue 4', { format: 'HH:mm:ss' }, { keys: [23, 59, 59] }, { value: '23:59:59' });
  getValue('getValue 5', { format: 'HH:mm:ss' }, { keys: [23, 58, 65] }, { value: '23:58:59' });
  getValue(
    'getValue 6',
    { value: '2018年12月30日', format: 'YYYY年MM月DD日 HH:mm:ss' },
    { keys: [3, 1, 2] },
    { value: '2018年12月30日 03:01:02' }
  );
  getValue(
    'getValue 7',
    { value: '2018年12月30日 00:23:56', format: 'YYYY年MM月DD日 HH:mm:ss' },
    { keys: [3, 1, 2] },
    { value: '2018年12月30日 03:01:02' }
  );
  getValue(
    'getValue 8',
    { value: '2018年12月30日 00:23:56', format: 'HH:mm:ss' },
    { keys: [3, 1, 2] },
    { value: '03:01:02' }
  );
  getValue('getValue 9', { format: 'HH:mm:ss' }, { keys: [66, 66, 65] }, { value: '23:59:59' });
  getValue('getValue 9', { format: 'HH:mm:ss' }, { keys: [24, 66, 65] }, { value: '23:59:59' });
  getValue('getValue 10', { format: 'HH:mm:ss' }, { keys: [-1, -1, 65] }, { value: '00:00:59' });
  getValue('getValue 10', { format: 'HH:mm:ss' }, { keys: [0, -1, 65] }, { value: '00:00:59' });
  function onScroller(title: string, props: Object, params: Object, expValue: Object) {
    it(`${title}`, () => {
      const target = mount(
        <Time themeProps={{ ...defaultTheme }} {...defaultThmeFunction} {...props} />
      );
      const newTarget = getTarget(target, 'Time');
      newTarget.onScroller(params);
      for (const i in expValue) {
        expect(newTarget.state[i]).toEqual(expValue[i]);
      }
    });
  }
  onScroller(
    'onScroller 1',
    { value: '00:05:06', format: 'HH:mm:ss' },
    { start: 0, index: 0 },
    { starts: [0, 5, 6], isScroll: true }
  );
  onScroller(
    'onScroller 2',
    { value: '00:05:06', format: 'HH:mm:ss' },
    { start: 1, index: 0 },
    { starts: [1, 5, 6], isScroll: true }
  );
  onScroller(
    'onScroller 3',
    { value: '00:05:06', format: 'HH:mm:ss' },
    { start: 2, index: 0 },
    { starts: [2, 5, 6], isScroll: true }
  );
  onScroller(
    'onScroller 4',
    { value: '00:05:06', format: 'HH:mm:ss' },
    { start: 3, index: 0 },
    { starts: [3, 5, 6], isScroll: true }
  );
  onScroller(
    'onScroller 5',
    { format: 'HH:mm:ss' },
    { start: 4, index: 0 },
    { starts: [4, '', ''], isScroll: true }
  );
  onScroller(
    'onScroller 6',
    { format: 'HH:mm:ss' },
    { start: 5, index: 1 },
    { starts: ['', 5, ''], isScroll: true }
  );
  onScroller(
    'onScroller 7',
    { format: 'HH:mm:ss' },
    { start: 6, index: 2 },
    { starts: ['', '', 6], isScroll: true }
  );
  onScroller(
    'onScroller 8',
    { value: '00:05:06', format: 'HH:mm:ss' },
    { start: 6, index: 0 },
    { starts: [6, 5, 6], isScroll: true }
  );
});
