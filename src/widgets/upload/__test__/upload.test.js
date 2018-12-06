/*
 *@flow
 *
 */

import React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Upload, { getClassName, findIndexfromkey, checkKeyInArr, getListIconType } from '../upload';
import { getRequestXHR, getStringFromObject, getParamsData } from '../request';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

Enzyme.configure({ adapter: new Adapter() });

describe('Rate Test', () => {
  const target = mount(<Upload />);
  it('css', () => {
    const target = <Upload />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function checkgetClassName(status: ?string, expectation: string) {
    it('Function getClassName ', () => {
      const res = getClassName(status);
      expect(res).toEqual(expectation);
    });
  }
  checkgetClassName(null, '');
  checkgetClassName('normal', '');
  checkgetClassName('default', '');
  checkgetClassName('loading', 'loading');
  checkgetClassName('done', 'done');

  function checkFindIndex(data: Array<string>, key: string, expectation: number) {
    it('Function findIndexfromkey ', () => {
      const res = findIndexfromkey(data, key.toLowerCase());
      expect(res).toEqual(expectation);
    });
  }
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpg', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jPg', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'JPG', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpEg', 2);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'ABC', -1);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'BMP', 5);

  function funcheckKeyInArr(data: Array<string>, key: string, expectation: boolean) {
    it('Function findIndexfromkey ', () => {
      const res = checkKeyInArr(data, key.toLowerCase());
      expect(res).toEqual(expectation);
    });
  }
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpg', true);
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jPg', true);
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'JPG', true);
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpEg', true);
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'ABC', false);
  funcheckKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'BMP', true);

  function checkGetListIconType(fileName: ?string, expectation: string) {
    it('Function findIndexfromkey ', () => {
      const res = getListIconType(fileName);
      expect(res).toEqual(expectation);
    });
  }
  checkGetListIconType('http://jshdfj.jpg', 'picture');
  checkGetListIconType('http://jshdfj.png', 'picture');
  checkGetListIconType('http://jshdfj.JPEG', 'picture');
  checkGetListIconType('http://jshdfj.avi', 'video');
  checkGetListIconType('http://jshdfj.MP4', 'video');
  checkGetListIconType('http://jshdfj.cccc', 'file');
  checkGetListIconType('http://jshdfj.text', 'file');
  checkGetListIconType('http://jshdfj.doc', 'file');
  checkGetListIconType('', 'file');
  checkGetListIconType(null, 'file');
  checkGetListIconType(undefined, 'file');

  it('Function getRequestXHR ', () => {
    const res = getRequestXHR();
    expect(res instanceof window.XMLHttpRequest).toEqual(true);
  });

  function checkGetStringFromObject(data: Object, expectation: string) {
    it('Function getStringFromObject ', () => {
      const res = getStringFromObject(data);
      expect(res).toEqual(expectation);
    });
  }
  checkGetStringFromObject({ u: 23, name: 'lll', file: 'xsdss' }, 'u=23&name=lll&file=xsdss');
  checkGetStringFromObject({ cc: 66, df: 'lll', file: 'xsdss' }, 'cc=66&df=lll&file=xsdss');
  checkGetStringFromObject(null, '');
  checkGetStringFromObject(undefined, '');

  function checkGetParamsData(data: Object) {
    it('Function getParamsData ', () => {
      const res = getParamsData(data);
      expect(res instanceof FormData).toEqual(true);
    });
  }
  checkGetParamsData({ data: { a: 123, b: 223 }, name: 'file', file: '666' });
  checkGetParamsData({ data: { a: 777, b: 888 }, name: 'abc', file: '567' });
});
