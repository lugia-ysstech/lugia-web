/*
 *@flow
 *
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Upload, { getIndexInArray, isKeyInArray, getPercentValue } from '../upload';
import { getRequestXHR, getStringFromObject, getParamsData } from '../request';
import { getIconByType, getListIconType } from '../getelement';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Widget from '../../consts/index';
import 'jest-styled-components';
import Icon from '../../icon';
import styled from 'styled-components';
const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

Enzyme.configure({ adapter: new Adapter() });

describe('Rate Test', () => {
  const target = mount(<Upload url={'xxxx.test'} />);
  it('css', () => {
    const target = <Upload url={'xxxx.test'} />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('props autoUpload true', () => {
    const target = mount(<Upload autoUpload={true} url={'xxxx.test'} />);
    expect(target.state().isAllowUpload).toEqual(true);
  });

  it('props autoUpload false', () => {
    const target = mount(<Upload autoUpload={false} url={'xxxx.test'} />);
    expect(target.state().isAllowUpload).toEqual(false);
  });

  it('props url', () => {
    const target = mount(<Upload url={'xxxx.test'} />);
    expect(target.props().url).toEqual('xxxx.test');
  });

  it('props fileList', () => {
    const target = mount(
      <Upload
        url={'xxxx.test'}
        fileList={[
          { id: 1, name: '文件11111.jpg', status: 'done' },
          { id: 2, name: '文件666.doc', status: 'fail' },
        ]}
      />
    );
    expect(target.state().fileListDone).toEqual([
      { id: 1, name: '文件11111.jpg', status: 'done' },
      { id: 2, name: '文件666.doc', status: 'fail' },
    ]);
  });

  it('props fileList null', () => {
    const target = mount(<Upload url={'xxxx.test'} />);
    expect(target.state().fileListDone).toEqual([]);
  });

  function checkFindIndex(data: Array<string>, key: string, expectation: number) {
    it('Function getIndexInArray ', () => {
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

  function checkGetPercentValue(current: ?number, total: ?number, expectation: number) {
    it('Function getPercentValue ', () => {
      const res = getPercentValue(current, total);
      expect(res).toEqual(expectation);
    });
  }
  checkGetPercentValue(2345, 3455, 67);
  checkGetPercentValue(null, 3455, 0);
  checkGetPercentValue(2345, undefined, 0);
  checkGetPercentValue(3488, 3455, 100);

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
      const res = getParamsData(data, {});
      expect(res instanceof FormData).toEqual(true);
    });
  }
  checkGetParamsData({ data: { a: 123, b: 223 }, name: 'file', file: '666' });
  checkGetParamsData({ data: { a: 777, b: 888 }, name: 'abc', file: '567' });

  function checkGetIconByType(status: ?string, expectation: ?string, props?: Object = {}) {
    it('Function GetIconByType ', () => {
      const res = getIconByType(status, props);
      const { type } = props;
      if (!status) {
        expect(res).toBe(expectation);
      } else if (type === 1 && status === 'default') {
        expect(res).toEqual(expectation);
      } else {
        const { iconClass } = res.props;
        expect(iconClass).toBe(expectation);
      }
    });
  }
  checkGetIconByType('default', '上传', { type: 1 });
  checkGetIconByType('default', 'lugia-icon-financial_upload right');
  checkGetIconByType('loading', 'lugia-icon-financial_loading_o loadIcon');
  checkGetIconByType(undefined, null);
  checkGetIconByType(undefined, null, { type: 1 });

  function setStateValue(props: Object, expectation: Object) {
    it('Function setStateValue ', () => {
      target.instance().setStateValue(props);
      expect(target.state()).toEqual(expectation);
    });
  }
  setStateValue(
    { classNameStatus: 'done', defaultText: '文件已上传成功！' },
    {
      classNameStatus: 'done',
      defaultText: '文件已上传成功！',
      fileListDone: [],
      isAllowUpload: true,
    }
  );
  setStateValue(
    { classNameStatus: 'loading', defaultText: '文件正在上传！' },
    {
      classNameStatus: 'loading',
      defaultText: '文件正在上传！',
      fileListDone: [],
      isAllowUpload: true,
    }
  );
  setStateValue(
    { classNameStatus: 'default', defaultText: '文件已上传成功！', abc: 'abc' },
    {
      abc: 'abc',
      classNameStatus: 'default',
      defaultText: '文件已上传成功！',
      fileListDone: [],
      isAllowUpload: true,
    }
  );

  function checkGetFileList(
    props: Object | number,
    expectation: Array<Object>,
    data?: Array<Object>
  ) {
    it('Function getFileList ', () => {
      const res = target.instance().getFileList(props, data);
      expect(res).toEqual(expectation);
    });
  }
  checkGetFileList({ id: 1, name: '文件11111.jpg', status: 'loading' }, [
    { id: 1, name: '文件11111.jpg', status: 'loading' },
  ]);
  checkGetFileList({ id: 2, name: '文件22222222.jpg', status: 'loading' }, [
    { id: 1, name: '文件11111.jpg', status: 'loading' },
    { id: 2, name: '文件22222222.jpg', status: 'loading' },
  ]);
  checkGetFileList(
    1,
    [
      { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { id: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    [{ target: 'percent', value: 20 }]
  );
  checkGetFileList(
    3,
    [
      { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { id: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    [{ target: 'percent', value: 50 }]
  );

  function uploadProgress(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadProgress ', () => {
      target
        .instance()
        .setStateValue({ fileListDone: [{ id: 1, name: '文件11111.jpg', status: 'default' }] });
      target.instance().uploadProgress(props, 1);
      expect(target.state().classNameStatus).toEqual(expectation);
      expect(target.state().fileListDone).toEqual(expectation2);
    });
  }
  uploadProgress({ loaded: 0, total: 2048 }, 'loading', [
    { id: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
  ]);
  uploadProgress({ loaded: 1024, total: 2048 }, 'loading', [
    { id: 1, name: '文件11111.jpg', status: 'loading', percent: 50 },
  ]);
  uploadProgress({ loaded: 2048, total: 2048 }, 'loading', [
    { id: 1, name: '文件11111.jpg', status: 'loading', percent: 100 },
  ]);
  uploadProgress({}, 'loading', [{ id: 1, name: '文件11111.jpg', status: 'loading', percent: 0 }]);
  function uploadSuccess(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadSuccess ', () => {
      target
        .instance()
        .setStateValue({ fileListDone: [{ id: 1, name: '文件11111.jpg', status: 'default' }] });
      target.instance().uploadSuccess(props, 1);
      expect(target.state().classNameStatus).toEqual(expectation);
      expect(target.state().fileListDone).toEqual(expectation2);
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

  function setDeleteList(index: number, expectation: Array<Object>) {
    it('Function setDeleteList ', () => {
      target
        .instance()
        .setStateValue({
          fileListDone: [
            { id: 1, name: '文件11111.jpg', status: 'done' },
            { id: 2, name: '文件2222.jpg', status: 'default' },
          ],
        });
      target.instance().setDeleteList(index);
      expect(target.state().fileListDone).toEqual(expectation);
    });
  }
  setDeleteList(1, [{ id: 1, name: '文件11111.jpg', status: 'done' }]);
  setDeleteList(0, [{ id: 2, name: '文件2222.jpg', status: 'default' }]);
  setDeleteList(2, [
    { id: 1, name: '文件11111.jpg', status: 'done' },
    { id: 2, name: '文件2222.jpg', status: 'default' },
  ]);

  function checkUploadFail(
    props: Object,
    id: number,
    expectation: string,
    expectation2: Array<Object>
  ) {
    it('Function checkUploadFail ', () => {
      target
        .instance()
        .setStateValue({ fileListDone: [{ id: 1, name: '文件11111.jpg', status: 'loading' }] });
      target.instance().uploadFail(props, id);
      expect(target.state().classNameStatus).toEqual(expectation);
      expect(target.state().fileListDone).toEqual(expectation2);
    });
  }
  checkUploadFail({}, 1, 'fail', [{ id: 1, name: '文件11111.jpg', status: 'fail' }]);
  checkUploadFail({}, 2, 'fail', [{ id: 1, name: '文件11111.jpg', status: 'loading' }]);

  const files = [
    {
      lastModified: 1541066150245,
      lastModifiedDate: new Date(1541066150245),
      name: 'headPic.jpg',
      size: 53021,
      type: 'image/jpeg',
      webkitRelativePath: '',
    },
  ];
  function checkSetChoosedFile(expectation: string) {
    it('Function checkSetChoosedFile ', () => {
      target.instance().setChoosedFile(files);
      expect(target.state().choosedFile).toEqual(expectation);
      target.instance().getPreviewInfo(new Blob(files));
      expect(target.state().previewUrl).toEqual(expectation);
    });
  }
  checkSetChoosedFile(files);

  function checkGetPreviewInfo(expectation: string) {
    it('Function getPreviewInfo ', () => {
      target.instance().setChoosedFile(files);
      expect(target.state().choosedFile).toEqual(expectation);
    });
  }
});
