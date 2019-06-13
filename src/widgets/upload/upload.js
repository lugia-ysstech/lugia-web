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

const Container = CSSComponent({
  tag: 'div',
  className: 'upload_Container',
  css: css`
    position: relative;
    display: inline-block;
  `,
});

type UploadProps = {
  disabled?: boolean,
  limit?: number,
  data?: Object,
  listType?: string,
  getTheme: Function,
  multiple?: boolean,
  fileList?: Array<Object>,
  showFileList?: boolean,
  withCredentials?: boolean,
  autoUpload?: boolean,
  accept?: string,
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
  getChildThemeHocProps: Function,
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
    listType: 'default',
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
    getTheme: () => {
      return {};
    },
  };

  static getDerivedStateFromProps(defProps: UploadProps, stateProps: StateProps) {
    if (!stateProps) {
      return {
        classNameStatus: 'default',
        defaultText: '请将文件拖到此处',
        fileListDone: defProps.fileList || [],
        isAllowUpload: defProps.autoUpload,
      };
    }
    const { classNameStatus, defaultText, fileListDone, isAllowUpload } = stateProps;
    return {
      classNameStatus: 'classNameStatus' in stateProps ? classNameStatus : 'default',
      defaultText: 'defaultText' in stateProps ? defaultText : '请将文件拖到此处',
      fileListDone: 'fileListDone' in stateProps ? fileListDone : defProps.fileList,
      isAllowUpload: 'isAllowUpload' in stateProps ? isAllowUpload : defProps.autoUpload,
    };
  }

  render() {
    const { themeProps, mergeThemePropsAndPropsConfig } = this.props;
    return (
      <Container themeProps={themeProps}>
        <GetElement
          {...this.props}
          {...this.state}
          setChoosedFile={this.setChoosedFile}
          setAutoUploadState={this.setAutoUploadState}
          setDeleteList={this.setDeleteList}
          mergeThemePropsAndPropsConfig={mergeThemePropsAndPropsConfig}
        />
      </Container>
    );
  }

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
    if (isIdInArray(hashMark, fileListDone)) {
      list = this.updateFieldList(fileListDone, hashMark, [{ target: 'status', value: 'loading' }]);
    } else {
      const { listType } = this.props;
      list = this.appendFileList(fileListDone, {
        hashMark,
        name,
        listType,
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

    const { url, withCredentials, data, headers, method = 'post', dataType = 'json' } = this.props;
    const dataObject = { url, withCredentials, data, headers, method, dataType };

    for (let i = 0; i < len; i++) {
      if (i >= limit) break;
      this.beforeUpload(dataObject, choosedFile[i], choosedFile[i].hashMark);
      delete choosedFile[i].hashMark;
    }
  };

  beforeUpload = (dataObject: Object, file: Object, hashMark: string) => {
    const { beforeUpload } = this.props;
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
        this.uploadComplete(res, hashMark);
      },
    });
  };

  getResponse = (res: Array<Object>): ?Array<Object> => {
    if (!res) return;
    const arr = [];
    res.forEach(item => {
      const { listType, name, percent, status, url } = item;
      arr.push({ listType, name, percent, status, url });
    });

    return arr;
  };

  uploadSuccess = (res: Object, file: Object, hashMark: string): void => {
    const { fileListDone } = this.state;

    const list = this.updateFieldList(fileListDone, hashMark, [
      { target: 'status', value: 'done' },
      { target: 'url', value: res.data.url },
    ]);
    this.setStateValue({ classNameStatus: 'done', fileListDone: list });
    const { listType } = this.props;
    if (listType === 'picture') {
      this.loadPreviewInfo(file);
    }
    this.setStateValue({ isAllowUpload: false });

    const { onSuccess } = this.props;
    onSuccess && onSuccess(res, this.getResponse(fileListDone));
  };

  uploadComplete = (res: Object, hashMark: string): void => {
    const { onComplete } = this.props;
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
    this.setStateValue({ classNameStatus: 'fail', fileListDone: list });

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

  setDeleteList = (index: number) => {
    const { fileListDone } = this.state;
    fileListDone.splice(index, 1);
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
