/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import Year from '../panel/Year';
const { expect: exp } = chai;
const moment = require('moment');
Enzyme.configure({ adapter: new Adapter() });
// describe('default', () => {
//   function getTarget(target, component) {
//     const newTarget = target
//       .find(component)
//       .at(0)
//       .instance();
//     return newTarget;
//   }
//   //arrorChange
//   function arrorChange(title: string, params: Object, expValue: Object) {
//     it(`${title}`, () => {
//       const target = mount(<Year />);
//       const newTarget = getTarget(target, 'Year');
//       newTarget.arrorChange(params);
//       for (const i in expValue) {
//         expect(newTarget.state[i]).toEqual(expValue[i]);
//       }
//     });
//   }
//   arrorChange(
//     'arrorChange 1',
//     { start: 2015, end: 2027, showYears: true, title: '2015-2027' },
//     { start: 2015, end: 2027, showYears: true, title: '2015-2027' }
//   );
//   arrorChange(
//     'arrorChange 2',
//     { start: 2016, end: 2028, showYears: true, title: '2016-2028' },
//     { start: 2016, end: 2028, showYears: true, title: '2016-2028' }
//   );
//   arrorChange(
//     'arrorChange 3',
//     { start: 2017, end: 2029, showYears: false, title: '2017-2029' },
//     { start: 2017, end: 2029, showYears: false, title: '2017-2029' }
//   );

//   function headOnChange(title: string, params: Object, expValue: Object) {
//     it(`${title}`, () => {
//       const target = mount(<Year />);
//       const newTarget = getTarget(target, 'Year');
//       newTarget.headOnChange(params);
//       for (const i in expValue) {
//         expect(newTarget.state[i]).toEqual(expValue[i]);
//       }
//     });
//   }
//   headOnChange(
//     'headOnChange 1',
//     { start: 2015, end: 2016, showYears: true, title: '2015-2016' },
//     { start: 2015, end: 2016, showYears: true, title: '2015-2016' }
//   );
//   headOnChange(
//     'headOnChange 1',
//     { start: 2018, end: 2026, showYears: false, title: '2018-2026' },
//     { start: 2018, end: 2026, showYears: false, title: '2018-2026' }
//   );

//   function getFreshPicker(title: string, params: Object, expValue: Object) {
//     it(`${title}`, () => {
//       const target = mount(<Year />);
//       const newTarget = getTarget(target, 'Year');
//       newTarget.getFreshPicker(params);
//       for (const i in expValue) {
//         expect(newTarget.state[i]).toEqual(expValue[i]);
//       }
//     });
//   }
//   getFreshPicker(
//     'getFreshPicker 1',
//     { moments: moment('2015-01-02', 'YYYY-MM') },
//     { start: 2015, month: 0 }
//   );
//   getFreshPicker(
//     'getFreshPicker 2',
//     { moments: moment('2018-02-02', 'YYYY-MM') },
//     { start: 2018, month: 1 }
//   );
//   getFreshPicker(
//     'getFreshPicker 3',
//     { moments: moment('2019-03-02', 'YYYY-MM') },
//     { start: 2019, month: 2 }
//   );
//   getFreshPicker(
//     'getFreshPicker 3',
//     { moments: moment('2020-06-02', 'YYYY-MM') },
//     { start: 2020, month: 5 }
//   );

//   function panelChange(title: string, props: Object, params: Object, expValue: Object) {
//     let result = {};
//     const onChange = obj => {
//       result = obj;
//     };
//     it(`${title}`, () => {
//       const target = mount(<Year {...props} onChange={onChange} />);
//       const newTarget = getTarget(target, 'Year');
//       const { showYears } = params;
//       newTarget.panelChange(params);
//       let results;
//       if (showYears) {
//         results = result;
//       } else {
//         expect(result).toEqual({});
//         results = newTarget.state;
//       }

//       for (const i in expValue) {
//         expect(results[i]).toEqual(expValue[i]);
//       }
//     });
//   }
//   panelChange(
//     'panelChange 1',
//     {},
//     { showYears: false, start: 2010, text: '2010-2011' },
//     { start: 2011, title: '2010-2011' }
//   );
//   panelChange(
//     'panelChange 2',
//     {},
//     { showYears: false, start: 2011, text: '2011-2022' },
//     { start: 2012, title: '2011-2022' }
//   );
//   panelChange(
//     'panelChange 3',
//     {},
//     { showYears: false, start: 2015, text: '2015-2026' },
//     { start: 2016, title: '2015-2026' }
//   );
//   panelChange(
//     'panelChange 4',
//     { from: 'date', defaultValue: '2015-02-03' },
//     { showYears: true, start: 2016, text: '2016-2027' },
//     { newValue: 2016, oldValue: 2015, from: 'date', mode: 'date' }
//   );
//   panelChange(
//     'panelChange 4',
//     { from: 'date', defaultValue: '2025-02-03' },
//     { showYears: true, start: 2016, text: '2016-2027' },
//     { newValue: 2016, oldValue: 2025, from: 'date', mode: 'date' }
//   );
// });
