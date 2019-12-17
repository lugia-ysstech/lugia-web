/*
 *@flow
 *
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Upload from '../index';
import {
  getIndexInArray,
  getPercentValue,
  isKeyInArray,
  isEmptyObject,
  isIdInArray,
} from '../upload';

import { getFormData, getRequestXHR, getQueryString } from '../request';
import { getIconByType } from '../getelement';
import { getListIconType } from '../../css/upload';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });

describe('Upload Test', () => {
  const themeHocProps = () => true;
  const themeProps = { themeConfig: {}, themeState: {} };
  const getCmp = (target: any): Object => {
    return target.children().instance();
  };
  const target = mount(
    <Upload
      getPartOfThemeHocProps={themeHocProps}
      getPartOfThemeProps={themeHocProps}
      themeProps={themeProps}
      url={'xxxx.test'}
    />
  );
  it('css', () => {
    const target = (
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        url={'xxxx.test'}
      />
    );
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('props autoUpload true', () => {
    const target = mount(
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        autoUpload={true}
        url={'xxxx.test'}
      />
    );
    expect(getCmp(target).state.isAllowUpload).toEqual(true);
  });

  it('props autoUpload false', () => {
    const target = mount(
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        autoUpload={false}
        url={'xxxx.test'}
      />
    );
    expect(getCmp(target).state.isAllowUpload).toEqual(false);
  });

  it('props url', () => {
    const target = mount(
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        url={'xxxx.test'}
      />
    );
    expect(target.props().url).toEqual('xxxx.test');
  });

  it('props fileList', () => {
    const target = mount(
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        url={'xxxx.test'}
        fileList={[
          { id: 1, name: '文件11111.jpg', status: 'done' },
          { id: 2, name: '文件666.doc', status: 'fail' },
        ]}
      />
    );
    expect(getCmp(target).state.fileListDone).toEqual([
      { id: 1, name: '文件11111.jpg', status: 'done' },
      { id: 2, name: '文件666.doc', status: 'fail' },
    ]);
  });

  it('props fileList null', () => {
    const target = mount(
      <Upload
        getPartOfThemeHocProps={themeHocProps}
        getPartOfThemeProps={themeHocProps}
        themeProps={themeProps}
        url={'xxxx.test'}
      />
    );
    expect(getCmp(target).state.fileListDone).toEqual([]);
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
    it('Function getQueryString ', () => {
      const res = getQueryString(data);
      expect(res).toEqual(expectation);
    });
  }

  checkGetStringFromObject({ u: 23, name: 'lll', file: 'xsdss' }, 'u=23&name=lll&file=xsdss');
  checkGetStringFromObject({ cc: 66, df: 'lll', file: 'xsdss' }, 'cc=66&df=lll&file=xsdss');
  checkGetStringFromObject(null, '');
  checkGetStringFromObject(undefined, '');
  checkGetStringFromObject({}, '');
  checkGetStringFromObject({ hello: 'world' }, 'hello=world');

  function checkGetParamsData(data: Object) {
    it('Function getFormData ', () => {
      const res = getFormData(data, {});
      expect(res instanceof FormData).toEqual(true);
    });
  }

  checkGetParamsData({ data: { a: 123, b: 223 }, name: 'file', file: '666' });
  checkGetParamsData({ data: { a: 777, b: 888 }, name: 'abc', file: '567' });

  function checkGetIconByType(status: ?string, expectation: ?string, props?: Object = {}) {
    it('Function GetIconByType ', () => {
      const res = getIconByType(
        {
          defaultTips: {
            uploadText: '上传',
            uploadTips: '请将文件拖到此处',
            failTips: '文件上传失败请重试',
            loadingTips: '文件上传中...',
          },
        },
        status,
        props
      );
      const { type } = props;
      if (!status || !res) {
        expect(res).toBe(expectation);
      } else if (typeof res === 'string' || (type === 1 && status === 'default')) {
        expect(res).toEqual(expectation);
      } else {
        const { iconClass } = res.props;
        expect(iconClass).toBe(expectation);
      }
    });
  }

  checkGetIconByType('default', '上传', { type: 1 });
  checkGetIconByType('default', 'lugia-icon-financial_upload right');
  checkGetIconByType('loading', 'lugia-icon-financial_loading_o loading');
  checkGetIconByType(undefined, null);
  checkGetIconByType(undefined, null, { type: 1 });

  function setStateValue(props: Object, expectation: Object) {
    it('Function setStateValue ', () => {
      getCmp(target).setStateValue(props);
      expect(getCmp(target).state).toEqual(expectation);
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
    fileListDone: Array<Object>,
    props: number,
    expectation: Array<Object>,
    data: Array<Object>
  ) {
    it('Function updateFieldList ', () => {
      const res = getCmp(target).updateFieldList(fileListDone, props, data);
      expect(res).toEqual(expectation);
    });
  }

  checkGetFileList(
    [
      { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
      { hashMark: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    1,
    [
      { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { hashMark: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    [{ target: 'percent', value: 20 }]
  );
  checkGetFileList(
    [
      { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { id: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    3,
    [
      { id: 1, name: '文件11111.jpg', status: 'loading', percent: 20 },
      { id: 2, name: '文件22222222.jpg', status: 'loading' },
    ],
    [{ target: 'percent', value: 50 }]
  );

  function checkIsEmptyObject(data: Object, expectation: boolean) {
    it('Function isEmptyObject ', () => {
      const res = isEmptyObject(data);
      expect(res).toEqual(expectation);
    });
  }

  checkIsEmptyObject({}, true);
  checkIsEmptyObject({ aa: 1 }, false);

  function checkAppendFileList(
    fileListDone: Array<Object>,
    props: Object,
    expectation: Array<Object>
  ) {
    it('Function updateFieldList ', () => {
      const res = getCmp(target).appendFileList(fileListDone, props);
      expect(res).toEqual(expectation);
    });
  }

  checkAppendFileList(
    [{ hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 }],
    { hashMark: 2, name: '文件2222.jpg', status: 'loading' },
    [
      { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
      { hashMark: 2, name: '文件2222.jpg', status: 'loading' },
    ]
  );
  checkAppendFileList([{ hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 }], {}, [
    { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
  ]);

  function uploadProgress(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadProgress ', () => {
      getCmp(target).setStateValue({
        fileListDone: [{ hashMark: 1, name: '文件11111.jpg', status: 'default' }],
      });
      getCmp(target).uploadProgress(props, 1);
      expect(getCmp(target).state.classNameStatus).toEqual(expectation);
      expect(getCmp(target).state.fileListDone).toEqual(expectation2);
    });
  }

  uploadProgress({ loaded: 0, total: 2048 }, 'loading', [
    { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
  ]);
  uploadProgress({ loaded: 1024, total: 2048 }, 'loading', [
    { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 50 },
  ]);
  uploadProgress({ loaded: 2048, total: 2048 }, 'loading', [
    { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 100 },
  ]);
  uploadProgress({}, 'loading', [
    { hashMark: 1, name: '文件11111.jpg', status: 'loading', percent: 0 },
  ]);

  function uploadSuccess(props: Object, expectation: string, expectation2: Array<Object>) {
    it('Function uploadSuccess ', () => {
      getCmp(target).setStateValue({
        fileListDone: [{ hashMark: 1, name: '文件11111.jpg', status: 'default' }],
      });
      getCmp(target).uploadSuccess(props, files, 1);
      expect(getCmp(target).state.classNameStatus).toEqual(expectation);
      expect(getCmp(target).state.fileListDone).toEqual(expectation2);
    });
  }

  uploadSuccess({ data: { url: 'test.jpg' } }, 'done', [
    { hashMark: 1, name: '文件11111.jpg', status: 'done', url: 'test.jpg' },
  ]);

  function checkisIdInArray(id: string, array: Array<Object>, expectation: boolean) {
    it('Function isIdInArray ', () => {
      const res = isIdInArray(id, array);
      expect(res).toEqual(expectation);
    });
  }

  checkisIdInArray('1', [{ hashMark: '1', name: '文件11111.jpg', status: 'default' }], true);
  checkisIdInArray('2', [{ hashMark: '1', name: '文件11111.jpg', status: 'default' }], false);
  checkisIdInArray('1', [], false);

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

  function setAutoUploadState(
    props: boolean,
    choosedFileList: ?Array<Object>,
    expectation: boolean
  ) {
    it('Function setAutoUploadState ', () => {
      const target = mount(
        <Upload
          getPartOfThemeHocProps={themeHocProps}
          getPartOfThemeProps={themeHocProps}
          themeProps={themeProps}
          url={'xxxx.test'}
        />
      );
      choosedFileList && getCmp(target).setStateValue({ choosedFile: choosedFileList });
      getCmp(target).setAutoUploadState(props);
      expect(getCmp(target).state.isAllowUpload).toEqual(expectation);
    });
  }

  setAutoUploadState(false, undefined, true);
  setAutoUploadState(true, files, true);
  setAutoUploadState(false, files, false);

  function setDeleteList(index: number, expectation: Array<Object>) {
    it('Function setDeleteList ', () => {
      getCmp(target).setStateValue({
        fileListDone: [
          { hashMark: 1, name: '文件11111.jpg', status: 'done' },
          { hashMark: 2, name: '文件2222.jpg', status: 'default' },
        ],
      });
      getCmp(target).setDeleteList(index);
      expect(getCmp(target).state.fileListDone).toEqual(expectation);
    });
  }

  setDeleteList(1, [{ hashMark: 1, name: '文件11111.jpg', status: 'done' }]);
  setDeleteList(0, [{ hashMark: 2, name: '文件2222.jpg', status: 'default' }]);
  setDeleteList(2, [
    { hashMark: 1, name: '文件11111.jpg', status: 'done' },
    { hashMark: 2, name: '文件2222.jpg', status: 'default' },
  ]);

  function checkUploadFail(
    props: Object,
    id: number,
    expectation: string,
    expectation2: Array<Object>
  ) {
    it('Function checkUploadFail ', () => {
      getCmp(target).setStateValue({
        fileListDone: [{ hashMark: 1, name: '文件11111.jpg', status: 'loading' }],
      });
      getCmp(target).uploadFail(props, id);
      expect(getCmp(target).state.classNameStatus).toEqual(expectation);
      expect(getCmp(target).state.fileListDone).toEqual(expectation2);
    });
  }

  checkUploadFail({}, 1, 'fail', [{ hashMark: 1, name: '文件11111.jpg', status: 'fail' }]);
  checkUploadFail({}, 2, 'fail', [{ hashMark: 1, name: '文件11111.jpg', status: 'loading' }]);

  function checkSetChoosedFile(expectation: Array<Object>) {
    it('Function checkSetChoosedFile ', () => {
      getCmp(target).setChoosedFile(files);
      expect(getCmp(target).state.choosedFile).toEqual(expectation);
    });
  }

  checkSetChoosedFile(files);
});
