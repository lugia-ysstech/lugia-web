/*
 *@flow
 *
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Upload, { getClassName, getIndexInArray, isKeyInArray } from '../upload';
import { getRequestXHR, getStringFromObject, getParamsData } from '../request';
import { getIconByType, getListIconType } from '../getelement';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

Enzyme.configure({ adapter: new Adapter() });

describe('Rate Test', () => {
  const target = mount(<Upload url={'xxxx.test'} />);
  it('css', () => {
    const target = <Upload url={'xxxx.test'} />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function checkgetClassName(status: ?string, expectation: string) {
    it('Function getClassName ', () => {
      const res = getClassName(status);
      expect(res).toEqual(expectation);
    });
  }
  checkgetClassName(null, '');
  checkgetClassName('normal', 'normal');
  checkgetClassName('default', 'default');
  checkgetClassName('loading', 'loading');
  checkgetClassName('done', 'done');

  function checkFindIndex(data: Array<string>, key: string, expectation: number) {
    it('Function getIndexFromKey ', () => {
      const res = getIndexInArray(data, key.toLowerCase());
      expect(res).toEqual(expectation);
    });
  }
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpg', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jPg', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'JPG', 0);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpEg', 2);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'ABC', -1);
  checkFindIndex(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'BMP', 5);

  function checkKeyInArr(data: Array<string>, key: string, expectation: boolean) {
    it('Function isKeyInArr ', () => {
      const res = isKeyInArray(data, key.toLowerCase());
      expect(res).toEqual(expectation);
    });
  }
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpg', true);
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jPg', true);
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'JPG', true);
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'jpEg', true);
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'ABC', false);
  checkKeyInArr(['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'], 'BMP', true);

  function checkGetListIconType(fileName: ?string, expectation: string) {
    it('Function getListIconType ', () => {
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

  function checkGetStringFromObject(data: ?Object, expectation: string) {
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

  function checkGetIconByType(status: string, expectation: boolean | string, type?: number) {
    it('Function GetIconByType ', () => {
      const res = getIconByType(status, type);
      if (type === 1 && status === 'default') {
        expect(res).toEqual(expectation);
      } else {
        expect(res instanceof Object).toEqual(expectation);
      }
    });
  }
  checkGetIconByType('default', '上传', 1);
  checkGetIconByType('default', true);
  checkGetIconByType('loading', true);
  checkGetIconByType('done', true);

  function setStateValue(props: Object, expectation: Object) {
    it('Function setStateValue ', () => {
      target.instance().setStateValue(props);
      expect(target.state()).toEqual(expectation);
    });
  }
  setStateValue(
    { classNameStatus: 'done', defaultText: '文件已上传成功！' },
    { classNameStatus: 'done', defaultText: '文件已上传成功！', fileList: [], isAllowUpload: true }
  );
  setStateValue(
    { classNameStatus: 'loading', defaultText: '文件正在上传！' },
    { classNameStatus: 'loading', defaultText: '文件正在上传！', fileList: [], isAllowUpload: true }
  );
  setStateValue(
    { classNameStatus: 'default', defaultText: '文件已上传成功！', abc: 'abc' },
    {
      abc: 'abc',
      classNameStatus: 'default',
      defaultText: '文件已上传成功！',
      fileList: [],
      isAllowUpload: true,
    }
  );

  function getFileList(props: Object | number, expectation: Array<Object>, data?: Array<Object>) {
    it('Function getFileList ', () => {
      const res = target.instance().getFileList(props, data);
      expect(res).toEqual(expectation);
    });
  }
  getFileList({ id: 1, name: '文件11111.jpg', status: 'loading' }, [
    { id: 1, name: '文件11111.jpg', status: 'loading' },
  ]);
  getFileList({ id: 2, name: '文件22222222.jpg', status: 'loading' }, [
    { id: 1, name: '文件11111.jpg', status: 'loading' },
    { id: 2, name: '文件22222222.jpg', status: 'loading' },
  ]);
  getFileList(
    1,
    [
      { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { id: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    [{ target: 'percent', value: 20 }]
  );

  function uploadProgress(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadProgress ', () => {
      target
        .instance()
        .setStateValue({ fileList: [{ id: 1, name: '文件11111.jpg', status: 'default' }] });
      target.instance().uploadProgress(props, 1);
      expect(target.state().classNameStatus).toEqual(expectation);
      expect(target.state().fileList).toEqual(expectation2);
    });
  }
  uploadProgress({ currentTarget: {} }, 'loading', [
    { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
  ]);

  function uploadSuccess(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadSuccess ', () => {
      target
        .instance()
        .setStateValue({ fileList: [{ id: 1, name: '文件11111.jpg', status: 'default' }] });
      target.instance().uploadSuccess(props, 1);
      expect(target.state().classNameStatus).toEqual(expectation);
      expect(target.state().fileList).toEqual(expectation2);
    });
  }
  uploadSuccess({ currentTarget: {} }, 'done', [{ id: 1, name: '文件11111.jpg', status: 'done' }]);

  function isIdInArray(id: number, props: Array<Object>, expectation: boolean) {
    it('Function isIdInArray ', () => {
      const res = target.instance().isIdInArray(id, props);
      expect(res).toEqual(expectation);
    });
  }
  isIdInArray(1, [{ id: 1, name: '文件11111.jpg', status: 'default' }], true);
  isIdInArray(2, [{ id: 1, name: '文件11111.jpg', status: 'default' }], false);
  isIdInArray(1, [], false);

  function setAutoUploadState(
    props: boolean,
    choosedFileList: ?Array<Object>,
    expectation: boolean
  ) {
    it('Function setAutoUploadState ', () => {
      target.instance().setStateValue({ choosedFile: choosedFileList });
      target.instance().setAutoUploadState(props);
      expect(target.state().isAllowUpload).toEqual(expectation);
    });
  }
  setAutoUploadState(false, undefined, true);
  setAutoUploadState(true, [new FormData()], true);
  setAutoUploadState(false, [new FormData()], false);
});
