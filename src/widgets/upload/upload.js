/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import React from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';
import Widget from '../consts/index';
import Theme from '../theme';
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
  fileList: Array<Object>,
};

export const getIndexInArray = (data: Array<string>, key: string): number => {
  if (!key) return -1;
  return data.indexOf(key);
};

export const isKeyInArray = (data: Array<string>, key: string): boolean => {
  return getIndexInArray(data, key) === -1 ? false : true;
};

export const getClassName = (status: ?string): string => {
  if (!status) return '';
  return status;
};

const getPercentValue = (current: number, total: number) => {
  return (current / total).toFixed(2);
};

const loop = () => true;
class Upload extends React.Component<uploadProps, any> {
  input: Object;
  static defaultProps = {
    disabled: false,
    listType: 'default',
    multiple: false,
    showFileList: true,
    limit: 5,
    fileList: [],
    withCredentials: false,
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
        fileList: defProps.fileList,
      };
    }
    const { classNameStatus, defaultText, fileList } = stateProps;
    return {
      classNameStatus: 'classNameStatus' in stateProps ? classNameStatus : 'default',
      defaultText: 'defaultText' in stateProps ? defaultText : '请将文件拖到此处',
      fileList: 'fileList' in stateProps ? fileList : defProps.fileList,
    };
  }
  render() {
    return (
      <Container>
        <GetElement {...this.props} {...this.state} setChoosedFile={this.setChoosedFile} />
      </Container>
    );
  }
  setChoosedFile = (res: Object) => {
    this.setState(
      {
        choosedFile: res.target.files,
      },
      () => {
        this.uploadFiles();
      }
    );
  };
  uploadFiles = () => {
    const { url, withCredentials, onFail } = this.props;
    const dataObject = { url, withCredentials, upSuccessed: 0, upFailed: 0 };
    this.addRequest(dataObject);
  };

  addRequest = (dataObject: Object) => {
    const { choosedFile, fileList } = this.state;
    let { i = 0 } = dataObject;
    const id = fileList.length + 1 + i;
    const list = this.getFileList({ id, name: choosedFile[i].name, status: 'loading', percent: 0 });
    this.setStateValue({
      classNameStatus: 'loading',
      fileName: choosedFile[i].name,
      fileList: list,
    });

    const { url, withCredentials } = dataObject;
    const that = this;

    request({
      url,
      withCredentials,
      method: 'post',
      data: choosedFile[i],
      onSuccess: res => {
        that.uploadSuccess(res, id);
      },
      onFail: res => {},
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

  uploadSuccess = (res: Object, id: number) => {
    const { onSuccess } = this.props;
    const list = this.getFileList(id, [{ target: 'status', value: 'done' }]);
    this.setStateValue({ classNameStatus: 'done', fileList: list });
    onSuccess && onSuccess(res.currentTarget);
  };

  uploadComplete = (res: Object, id: number) => {
    const { onComplete } = this.props;
    const that = this;
    setTimeout(function() {
      // const {fileName} = that.state;
      const list = that.getFileList(id, [{ target: 'status', value: 'done' }]);
      // this.setStateValue({classNameStatus:'done',fileList:list});
      that.setStateValue({ classNameStatus: 'done', fileList: list });
    }, 3000);

    onComplete && onComplete(res.currentTarget);
  };

  uploadProgress = (res: Object, id: number) => {
    const { onProgress } = this.props;
    const list = this.getFileList(id, [
      { target: 'percent', value: 20 },
      { target: 'status', value: 'loading' },
    ]);
    this.setStateValue({ classNameStatus: 'loading', fileList: list });
    onProgress && onProgress(res.currentTarget);
  };
  uploadFail = (res: Object) => {
    const { onFail } = this.props;
    onFail && onFail(res.currentTarget);
  };

  getFileList = (props: Object | number, data?: Object) => {
    const { fileList } = this.state;
    if (typeof props === 'number' && data) {
      fileList.forEach(i => {
        if (i.id === props) {
          data.forEach(j => {
            i[j.target] = j.value;
          });
        }
      });
      return fileList;
    }

    fileList.push(props);
    return fileList;
  };

  setStateValue = (props: Object) => {
    this.setState({
      ...props,
    });
  };
}

export default Upload;
