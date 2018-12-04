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
import { getElement } from './getelement';

type uploadProps = {
  disabled?: boolean,
  limit?: number,
  data?: Object,
  listType: string,
  getTheme: Function,
};

export const findIndexfromkey = (data: Array<string>, key: string): number => {
  if (!key) return -1;
  return data.indexOf(key);
};

export const checkKeyInArr = (data: Array<string>, key: string): boolean => {
  return findIndexfromkey(data, key) === -1 ? false : true;
};

export const getListIconType = (fileName: ?string): string => {
  if (!fileName) return 'file';
  const filetype = fileName.replace(/.+\./, '');
  const picArr = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'];
  if (checkKeyInArr(picArr, filetype.toLowerCase())) return 'picture';

  const videoArr = ['mpeg', 'avi', 'mov', 'asf', 'wmv', '3gp', 'mkv', 'flv', 'rmvb', 'mp4'];
  if (checkKeyInArr(videoArr, filetype.toLowerCase())) return 'video';
  return 'file';
};

export const getClassName = (status: ?string): string => {
  if (!status) return '';
  if (status === 'loading') return 'loading';
  if (status === 'done') return 'done';
  return '';
};

class Upload extends React.Component<uploadProps, any> {
  static defaultProps = {
    disabled: false,
    listType: 'default',
    getTheme: () => {
      return {};
    },
  };

  componentDidMount() {}
  static getDerivedStateFromProps(defProps: uploadProps, current: Object) {
    if (!current) {
      return {
        count: 0,
        hasClick: false,
        status: 'default',
      };
    }
    return {
      status: 'status' in current ? current.status : 'default',
      starNum: 'starNum' in current ? current.starNum : 0,
      current: 'current' in current ? current.current : -1,
      hasClick: 'hasClick' in current ? current.hasClick : false,
    };
  }
  render() {
    const { getTheme } = this.props;
    return (
      <div>
        {getElement(this.props, this.state)}
        {/*<Container theme={getTheme()} >*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload">*/}
        {/*<InputContent>请将文件拖到此处</InputContent>*/}
        {/*</label>*/}
        {/*</Container>*/}
        {/*<Container theme={getTheme()}>*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload">*/}
        {/*<InputContent className="done">请将文件拖到此处<LoadIcon iconClass="lugia-icon-financial_upload" /></InputContent>*/}
        {/*</label>*/}
        {/*</Container>*/}
        {/*<Container theme={getTheme()}>*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload">*/}
        {/*<InputContent className="loading"><LoadIcon iconClass="lugia-icon-financial_loading_o loadIcon"/>请将文件拖到此处</InputContent>*/}
        {/*</label>*/}
        {/*</Container>*/}
        {/*<Container theme={getTheme()}>*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload" >*/}
        {/*<InputContent className="loading hasBtn">请将文件拖到此处</InputContent>*/}
        {/*</label>*/}
        {/*<Button>上传</Button>*/}
        {/*</Container>*/}
        {/*<Container theme={getTheme()}>*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload" >*/}
        {/*<InputContent className="hasBtn">请将文件拖到此处</InputContent>*/}
        {/*</label>*/}
        {/*<Button className="loading"><LoadIcon iconClass="lugia-icon-financial_loading_o loadIcon"/></Button>*/}
        {/*</Container>*/}
        {/*<Container theme={getTheme()}>*/}
        {/*<Input  type="file" id="upload"/>*/}
        {/*<label for="upload" >*/}
        {/*<Button className="button">点击上传</Button>*/}
        {/*</label>*/}
        {/*<ul style={{width:'100%'}}>*/}
        {/*<Li>文件111111111111</Li>*/}
        {/*<Li>文件2222222222</Li>*/}
        {/*<Li>文件3333333333333</Li>*/}
        {/*</ul>         */}
        {/*</Container>*/}
      </div>
    );
  }
}

export default Upload;
