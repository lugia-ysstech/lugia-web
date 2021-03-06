/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import React from 'react';
import GetElement from './getelement';
import request from './request';
import CSSComponent, { css } from '../theme/CSSProvider';
import { deepMerge } from '@lugia/object-utils';

const Container = CSSComponent({
  tag: 'div',
  className: 'upload_Container',
  normal: {
    selectNames: [['width']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { areaType },
      } = themeProps;
      if (areaType === 'picture' || areaType === 'button') {
        return `
            display: inline-block;
        `;
      }
    },
  },
  css: css`
    position: relative;
    box-sizing: border-box;
    height: 100%;
  `,
});

type UploadProps = {
  disabled?: boolean,
  limit?: number,
  data?: Object,
  areaType?: string,
  multiple?: boolean,
  fileList?: Array<Object>,
  showFileList?: boolean,
  withCredentials?: boolean,
  autoUpload?: boolean,
  accept?: string,
  name?: string,
  url: string,
  headers?: Object,
  inputId?: string,
  size?: string,
  accessKey?: Array<string>,
  method?: string,
  dataType?: string,
  beforeUpload?: Function,
  onProgress?: Function,
  onSuccess?: Function,
  onComplete?: Function,
  onChange?: Function,
  onFail?: Function,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  defaultTips?: Object,
  userDefine?: any,
  isShowProgress?: boolean,
  getInputRef?: Function,
  customUpload?: Function,
};
type StateProps = {
  defaultText?: string,
  classNameStatus?: string,
  fileListDone: Array<Object>,
  isAllowUpload: boolean,
  choosedFile?: Array<Object>,
  previewUrl?: string,
};

export const getIndexInArray = (data: Array<string>, key: string): number => {
  if (!key) return -1;
  return data.indexOf(key);
};

export const isKeyInArray = (data: Array<string>, key: string): boolean => {
  return getIndexInArray(data, key) !== -1;
};

export const isEmptyObject = (obj: Object): boolean => {
  if (!obj) return false;
  return Object.keys(obj).length === 0;
};

export const isIdInArray = (hashMark: string, array: Array<Object>) => {
  if (!array.length) return false;
  return array.some(function(item) {
    return item.hashMark === hashMark;
  });
};

export const getPercentValue = (current: ?number, total: ?number): number => {
  if (!current || !total) return 0;
  return current / total < 0 ? 0 : current / total > 1 ? 100 : Math.floor((current / total) * 100);
};

export const getHashMark = (): string => {
  return 'lugia' + new Date().getTime() + Math.round(Math.random() * 100000 + 1000);
};

const loop = () => true;

class Upload extends React.Component<UploadProps, StateProps> {
  input: Object;
  static defaultProps = {
    disabled: false,
    areaType: 'default',
    multiple: false,
    showFileList: false,
    limit: Infinity,
    withCredentials: false,
    autoUpload: true,
    method: 'post',
    onProgress: loop,
    onSuccess: loop,
    onComplete: loop,
    onFail: loop,
    onChange: loop,
    defaultTips: {
      uploadText: '上传',
      uploadTips: '请将文件拖到此处',
      failTips: '文件上传失败请重试',
      loadingTips: '文件上传中...',
    },
  };

  static getDerivedStateFromProps(defProps: UploadProps, stateProps: StateProps) {
    const defaultUploadTips = defProps.defaultTips
      ? defProps.defaultTips.uploadTips
      : '请将文件拖到此处';

    if (!stateProps) {
      return {
        classNameStatus: 'default',
        defaultText: defaultUploadTips,
        fileListDone: defProps.fileList || [],
        isAllowUpload: defProps.autoUpload,
      };
    }
    const { classNameStatus, defaultText, fileListDone, isAllowUpload } = stateProps;
    return {
      classNameStatus: 'classNameStatus' in stateProps ? classNameStatus : 'default',
      defaultText: 'defaultText' in stateProps ? defaultText : defaultUploadTips,
      fileListDone: 'fileList' in defProps ? defProps.fileList : fileListDone,
      isAllowUpload: 'isAllowUpload' in stateProps ? isAllowUpload : defProps.autoUpload,
    };
  }

  componentDidMount() {
    const { getInputRef } = this.props;
    const { input } = this;
    getInputRef && getInputRef(input);
  }

  render() {
    const { areaType } = this.props;
    const themeProps = this.props.getPartOfThemeProps('Container');
    const theme = deepMerge(themeProps, { propsConfig: { areaType } });
    return (
      <Container themeProps={theme}>
        <GetElement
          {...this.props}
          {...this.state}
          setChoosedFile={this.setChoosedFile}
          setAutoUploadState={this.setAutoUploadState}
          setDeleteList={this.setDeleteList}
          getInputRef={this.getInputRef}
        />
      </Container>
    );
  }

  getInputRef = (element: any) => {
    this.input = element;
  };

  setChoosedFile = (res: Array<Object>): void => {
    const { multiple } = this.props;
    let choosedFiles = res;
    if (!multiple) {
      choosedFiles = [res[0]];
    }
    this.setStateValue(
      {
        choosedFile: choosedFiles,
      },
      () => {
        this.startUpload();
      }
    );
    const { onChange } = this.props;
    onChange && onChange(choosedFiles);
  };

  getChangeUploadState = (typeState: string, name: string, hashMark: string) => {
    let list;
    const { fileListDone } = this.state;
    const newFileList = [...fileListDone];
    if (isIdInArray(hashMark, newFileList)) {
      list = this.updateFieldList(newFileList, hashMark, [{ target: 'status', value: 'loading' }]);
    } else {
      const { areaType } = this.props;
      list = this.appendFileList(newFileList, {
        hashMark,
        name,
        areaType,
        status: typeState,
        percent: 0,
      });
    }
    return {
      classNameStatus: typeState,
      fileListDone: list,
      defaultText: name,
    };
  };

  startUpload = (): void => {
    const { choosedFile = [] } = this.state;
    const len = choosedFile.length;
    if (len <= 0) return;

    const { isAllowUpload } = this.state;
    const { autoUpload, limit = Infinity } = this.props;

    for (let i = 0; i < len; i++) {
      if (i >= limit) break;
      let list;
      const name = choosedFile[i].name;
      const hashMark = choosedFile[i].hashMark || getHashMark();
      choosedFile[i].hashMark = hashMark;
      if (autoUpload || (!autoUpload && isAllowUpload)) {
        list = this.getChangeUploadState('loading', name, hashMark);
        this.setStateValue({ ...list, choosedFile });
      } else {
        list = this.getChangeUploadState('default', name, hashMark);
        this.setStateValue({ ...list, choosedFile });
      }
    }
    if (!autoUpload && !isAllowUpload) return;

    const {
      url,
      withCredentials,
      data,
      headers,
      method = 'post',
      dataType = 'json',
      name = 'file',
    } = this.props;
    const dataObject = {
      url,
      withCredentials,
      data,
      headers,
      method,
      dataType,
      uploadFileName: name,
    };

    for (let i = 0; i < len; i++) {
      if (i >= limit) break;
      this.beforeUpload(dataObject, choosedFile[i], choosedFile[i].hashMark);
      delete choosedFile[i].hashMark;
    }
  };

  beforeUpload = (dataObject: Object, file: Object, hashMark: string) => {
    const { beforeUpload, customUpload } = this.props;
    if (customUpload) {
      customUpload(file, {
        success: () => this.customUploadStatus('success', hashMark),
        fail: () => this.customUploadStatus('fail', hashMark),
        start: () => this.startRequest(dataObject, file, hashMark),
      });
      return;
    }
    if (!beforeUpload) {
      this.startRequest(dataObject, file, hashMark);
    } else {
      beforeUpload(file).then(message => {
        if (message.status) {
          const { accessKey } = this.props;
          const { file } = message;
          if (accessKey) {
            accessKey.forEach(item => {
              dataObject.data[item] = file[item];
              delete file[item];
            });
          }
          this.startRequest(dataObject, file, hashMark);
        }
      });
    }
  };

  startRequest = (dataObject: Object, file: Object, hashMark: string): void => {
    request({
      ...dataObject,
      file,
      onSuccess: res => {
        this.uploadSuccess(res, file, hashMark);
      },
      onFail: res => {
        this.uploadFail(res, hashMark);
      },
      onProgress: res => {
        this.uploadProgress(res, hashMark);
      },
      onComplete: res => {
        this.uploadComplete(res);
      },
    });
  };

  getResponse = (res: Array<Object>): ?Array<Object> => {
    if (!res) return;
    const arr = [];
    res.forEach(item => {
      const { areaType, name, percent, status, url } = item;
      arr.push({ areaType, name, percent, status, url });
    });

    return arr;
  };

  uploadSuccess = (res: Object, file: Object, hashMark: string): void => {
    const { fileListDone } = this.state;

    const list = this.updateFieldList(fileListDone, hashMark, [
      { target: 'status', value: 'done' },
      { target: 'url', value: res && res.data && res.data.url },
    ]);
    this.setStateValue({ classNameStatus: 'done', fileListDone: list });
    const { areaType } = this.props;
    if (areaType === 'picture') {
      this.loadPreviewInfo(file);
    }
    this.setStateValue({ isAllowUpload: false });

    const { onSuccess } = this.props;
    onSuccess && onSuccess(res, this.getResponse(fileListDone));
  };

  uploadComplete = (res: Object): void => {
    const { onComplete } = this.props;
    this.input.value = '';
    onComplete && onComplete(res.currentTarget.response);
  };

  uploadProgress = (res: Object, hashMark: string): void => {
    const { loaded, total } = res;
    const percent = getPercentValue(loaded, total);

    const { fileListDone } = this.state;
    const list = this.updateFieldList(fileListDone, hashMark, [
      { target: 'percent', value: percent },
      { target: 'status', value: 'loading' },
    ]);
    this.setStateValue({ classNameStatus: 'loading', fileListDone: list });

    const { onProgress } = this.props;
    onProgress && onProgress({ loaded, total });
  };

  uploadFail = (res: Object, hashMark: string): void => {
    const { fileListDone } = this.state;
    const list = this.updateFieldList(fileListDone, hashMark, [
      { target: 'status', value: 'fail' },
    ]);
    this.setStateValue({ classNameStatus: 'fail', fileListDone: list, isAllowUpload: false });
    this.input.value = '';
    const { onFail } = this.props;
    onFail && onFail(res);
  };

  updateFieldList = (
    fileListDone: Array<Object>,
    props: string,
    data: Array<Object> = []
  ): Array<Object> => {
    fileListDone.forEach(file => {
      if (file.hashMark === props) {
        data.forEach(item => {
          file[item.target] = item.value;
        });
      }
    });
    return fileListDone;
  };

  customUploadStatus = (type: string, hashMark: string) => {
    const { fileListDone } = this.state;
    const doUpdateFieldList = (status: Array<Object>, classNameStatus: string) => {
      const list = this.updateFieldList(fileListDone, hashMark, status);
      this.setStateValue({ classNameStatus, fileListDone: list });
    };
    switch (type) {
      case 'success':
        doUpdateFieldList([{ target: 'status', value: 'done' }], 'done');
        break;
      case 'fail':
        doUpdateFieldList([{ target: 'status', value: 'fail' }], 'fail');
        break;
      default:
        return;
    }
  };

  appendFileList = (fileListDone: Array<Object>, props: Object): Array<Object> => {
    if (!isEmptyObject(props)) {
      fileListDone.push(props);
    }
    return fileListDone;
  };

  loadPreviewInfo = (file: any): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setStateValue({ previewUrl: reader.result });
      delete reader.onloadend;
    };
  };

  setDeleteList = (index: number, item: Object) => {
    const { fileListDone } = this.state;
    fileListDone.splice(index, 1);
    if (item && this.input.value.indexOf(item.name) !== -1) {
      this.setState({ defaultText: '' });
      this.input.value = '';
    }
    this.setStateValue({ fileListDone });
  };

  setAutoUploadState = (value: boolean) => {
    const { choosedFile } = this.state;
    if (!choosedFile) return;
    this.setStateValue({ isAllowUpload: value }, this.startUpload);
  };

  setStateValue = (props: Object, cbk?: Function) => {
    this.setState(
      {
        ...props,
      },
      () => {
        cbk && cbk();
      }
    );
  };
}

export default Upload;
