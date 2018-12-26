/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  //utils
  // function TimeFunctionGetCoversTimes(title: string, params: Object, expValue: Object) {
  //   it(`${title}`, () => {
  //     const {data,number,item}=params;
  //     const result=getCoversTimes(data,number,item);
  //     expect(result).toEqual(expValue);
  //   });
  // }
  // TimeFunctionGetCoversTimes(
  //   'getCoversTimes 1',
  //   {data:[1,2,3,4],number:7,item:{}},
  //   [1,2,3,4,{},{},{},{},{},{}]
  // );
  // TimeFunctionGetCoversTimes(
  //   'getCoversTimes 2',
  //   {data:[1,2,3,4],number:6,item:'b'},
  //   [1,2,3,4,'b','b','b','b','b']
  // );
  // TimeFunctionGetCoversTimes(
  //   'getCoversTimes 3',
  //   {data:[1],number:6,item:'c'},
  //   [1,'c','c','c','c','c']
  // );
  // TimeFunctionGetCoversTimes(
  //   'getCoversTimes 4',
  //   {data:[1,2],number:5,item:'d'},
  //   [1,2,'d','d','d','d']
  // );
});
