/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import React from 'react';
import styled from 'styled-components';
import GetElement from './getelement';
import request from './request';

const Container = styled.div`
  width: ${props => (props.theme.width ? props.theme.width : '366px')};
  position: relative;
  padding: 10px;
`;

type uploadProps = {
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
  url: string,
  onProgress?: Function,
  onSuccess?: Function,
  onComplete?: Function,
  onChange?: Function,
  onFail?: Function,
};
type stateProps = {
  defaultText?: string,
  classNameStatus?: string,
  fileListDone: Array<Object>,
  isAllowUpload: boolean,
  choosedFile?: Array<Object>,
};

export const getIndexInArray = (data: Array<string>, key: string): number => {
  if (!key) return -1;
  return data.indexOf(key);
};

export const isKeyInArray = (data: Array<string>, key: string): boolean => {
  return getIndexInArray(data, key) !== -1;
};

export const getPercentValue = (current: ?number, total: ?number): number => {
  if (!current || !total) return 0;
  return current / total < 0 ? 0 : current / total > 1 ? 100 : Math.floor((current / total) * 100);
};

const loop = () => true;
class Upload extends React.Component<uploadProps, stateProps> {
  input: Object;
  static defaultProps = {
    disabled: false,
    listType: 'default',
    multiple: false,
    showFileList: false,
    limit: 5,
    withCredentials: false,
    autoUpload: true,
    onProgress: loop,
    onSuccess: loop,
    onComplete: loop,
    onFail: loop,
    onChange: loop,
    getTheme: () => {
      return {};
    },
  };

  componentDidMount() {}

  static getDerivedStateFromProps(defProps: uploadProps, stateProps: stateProps) {
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
    return (
      <Container>
        <GetElement
          {...this.props}
          {...this.state}
          setChoosedFile={this.setChoosedFile}
          setAutoUploadState={this.setAutoUploadState}
          setDeleteList={this.setDeleteList}
        />
      </Container>
    );
  }
  setChoosedFile = (res: Array<Object>): void => {
    this.setStateValue(
      {
        choosedFile: res,
      },
      () => {
        this.uploadFiles();
      }
    );
  };

  uploadFiles = () => {
    const { url, withCredentials, data } = this.props;
    const dataObject = { url, withCredentials, data };
    this.addRequest(dataObject);
  };

  getChangeUploadState = (typeState: string, i: number, id: number) => {
    const { choosedFile = [], fileListDone } = this.state;
    let list;
    if (this.isIdInArray(id, fileListDone)) {
      list = this.getFileList(id, [{ target: 'status', value: 'loading' }]);
    } else {
      const { listType } = this.props;
      list = this.getFileList({
        id,
        name: choosedFile[i].name,
        listType,
        status: typeState,
        percent: 0,
      });
    }
    return {
      classNameStatus: typeState,
      fileListDone: list,
      defaultText: choosedFile[i].name,
    };
  };

  isIdInArray = (id: number, array: Array<Object>) => {
    if (!array.length) return false;
    for (const i of array) {
      if (i.id === id) return true;
    }
    return false;
  };

  addRequest = (dataObject: Object): void => {
    const { fileListDone } = this.state;
    let { i = 0 } = dataObject;
    let id = fileListDone.length + 1 + i;

    const { isAllowUpload } = this.state;
    const { autoUpload } = this.props;
    let list;
    if (!autoUpload && isAllowUpload) {
      id = fileListDone[i].id;
      list = this.getChangeUploadState('loading', i, id);
      this.setStateValue({ ...list });
    } else {
      list = this.getChangeUploadState('default', i, id);
      this.setStateValue({ ...list });
      if (!isAllowUpload) return;
    }

    const { url, withCredentials, data } = dataObject;
    const { choosedFile = [] } = this.state;
    const that = this;
    request({
      url,
      withCredentials,
      method: 'post',
      datetype: 'json',
      data,
      file: choosedFile[i],
      onSuccess: res => {
        that.uploadSuccess(res, id);
      },
      onFail: res => {
        that.uploadFail(res, id);
      },
      onProgress: res => {
        that.uploadProgress(res, id);
      },
      onComplete: res => {
        i++;
        if (i >= choosedFile.length) {
          that.uploadComplete(res, id);
        } else {
          dataObject.i = i;
          that.addRequest(dataObject);
          that.uploadComplete(res, id);
        }
      },
    });
  };

  uploadSuccess = (res: Object, id: number): void => {
    const list = this.getFileList(id, [{ target: 'status', value: 'done' }]);
    this.setStateValue({ classNameStatus: 'done', fileListDone: list });
    const { listType } = this.props;
    const { choosedFile = [] } = this.state;
    if (listType === 'picture') {
      this.getPreviewInfo(choosedFile[0]);
    }
    const { onSuccess } = this.props;
    onSuccess && onSuccess(res);
  };

  uploadComplete = (res: Object, id: number): void => {
    const { onComplete } = this.props;
    onComplete && onComplete(res.currentTarget.response);
  };

  uploadProgress = (res: Object, id: number): void => {
    const { loaded, total } = res;
    const percent = getPercentValue(loaded, total);
    const list = this.getFileList(id, [
      { target: 'percent', value: percent },
      { target: 'status', value: 'loading' },
    ]);
    this.setStateValue({ classNameStatus: 'loading', fileListDone: list });
    const { onProgress } = this.props;
    onProgress && onProgress({ loaded, total });
  };

  uploadFail = (res: Object, id: number): void => {
    const list = this.getFileList(id, [{ target: 'status', value: 'fail' }]);
    this.setStateValue({ classNameStatus: 'fail', fileListDone: list });
    const { onFail } = this.props;
    onFail && onFail(res);
  };

  getFileList = (props: Object | number, data?: Array<Object> = []): Array<Object> => {
    const { fileListDone } = this.state;
    if (typeof props === 'number') {
      fileListDone.forEach(i => {
        if (i.id === props) {
          data.forEach(j => {
            i[j.target] = j.value;
          });
        }
      });
      return fileListDone;
    }

    fileListDone.push(props);
    return fileListDone;
  };

  getPreviewInfo = (file: any): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const that = this;
    reader.onloadend = function(e) {
      that.setStateValue({ previewUrl: reader.result });
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
    this.setStateValue({ isAllowUpload: value }, this.uploadFiles);
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
