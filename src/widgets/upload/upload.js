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

type uploadProps = {
  disabled?: boolean,
  limit?: number,
  data?: Object,
  listType?: string,
  getTheme: Function,
  multiple?: boolean,
  fileList?: Array<Object>,
  onProgress?: Function,
  onSuccess?: Function,
  onComplete?: Function,
  onChange?: Function,
  onFail?: Function,
};

export const getIndexInArray = (data: Array<string>, key: string): number => {
  if (!key) return -1;
  return data.indexOf(key);
};

export const isKeyInArray = (data: Array<string>, key: string): boolean => {
  return getIndexInArray(data, key) === -1 ? false : true;
};

export const getListIconType = (fileName: ?string): string => {
  if (!fileName) return 'file';
  const filetype = fileName.replace(/.+\./, '');
  const picArr = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'];
  if (isKeyInArray(picArr, filetype.toLowerCase())) return 'picture';

  const videoArr = ['mpeg', 'avi', 'mov', 'asf', 'wmv', '3gp', 'mkv', 'flv', 'rmvb', 'mp4'];
  if (isKeyInArray(videoArr, filetype.toLowerCase())) return 'video';
  return 'file';
};

export const getClassName = (status: ?string): string => {
  if (!status) return '';
  return status;
};

const loop = () => true;
class Upload extends React.Component<uploadProps, any> {
  input: Object;
  static defaultProps = {
    disabled: false,
    listType: 'default',
    multiple: false,
    limit: 5,
    fileList: [],
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

  static getDerivedStateFromProps(defProps: uploadProps, stateProps: Object) {
    if (!stateProps) {
      return {};
    }
    return {};
  }
  render() {
    return (
      <div>
        <GetElement {...this.props} {...this.state} setChoosedFile={this.setChoosedFile} />
      </div>
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
    const { choosedFile } = this.state;
    for (let i = 0; i < choosedFile.length; i++) {
      console.log('i', i);
      // request();
    }
  };
}

export default Upload;
