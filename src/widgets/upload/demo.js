/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import React from 'react';
import Upload from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 16px;
  padding: 10px 0 0 10px;
  border-top: 1px solid #ccc;
`;

class UploadDemo extends React.Component<any, any> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  render() {
    const defaultProps = {
      listType: 'default',
      inputId: 'upload',
      showFileList: true,
      url: 'http://localhost:7001/upload',
      multiple: true,
      onChange: res => {
        console.log('cbk', res);
      },
      onSuccess: res => {
        console.log('onSuccess', res);
      },
      onComplete: res => {
        console.log('onComplete', res);
      },
      onProgress: res => {
        console.log('onProgress', res);
      },
      onFail: res => {
        console.log('onFail', res);
      },
    };
    const defaultProps1 = {
      listType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      multiple: true,
      showFileList: true,
      fileList: [
        { id: 1, name: '文件11111.jpg', status: 'done' },
        { id: 4, name: '文件666.doc', status: 'fail', percent: 30 },
        { id: 2, name: '文件22222222.mp4', status: 'loading' },
        { id: 3, name: '文件333.jpg', status: 'loading', percent: 30 },
      ],
    };
    const defaultProps2 = {
      listType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      autoUpload: false,
    };
    const defaultProps3 = {
      listType: 'picture',
      inputId: 'upload3',
      size: 'large',
      url: 'http://localhost:7001/upload',
      accept: 'image/*',
    };
    const defaultProps4 = {
      listType: 'picture',
      inputId: 'upload4',
      url: 'http://localhost:7001/upload',
    };
    const defaultProps5 = {
      listType: 'picture',
      inputId: 'upload5',
      size: 'small',
      url: 'http://localhost:7001/upload',
    };
    const defaultProps6 = {
      listType: 'area',
      inputId: 'upload6',
      showFileList: true,
      url: 'http://localhost:7001/upload',
    };

    return (
      <div>
        <Title>默认： </Title>
        <Upload {...defaultProps} />
        <Title>Button： </Title>
        <Upload {...defaultProps1} />
        <Title>Both： </Title>
        <Upload {...defaultProps2} />
        <Title>picture large accept(image)： </Title>
        <Upload {...defaultProps3} />
        <Title>picture middle： </Title>
        <Upload {...defaultProps4} />
        <Title>picture small： </Title>
        <Upload {...defaultProps5} />
        <Title>area： </Title>
        <Upload {...defaultProps6} />
      </div>
    );
  }
  setStateValue = (target: string, val: number) => {
    this.setState({
      [target]: val,
    });
  };
}
export default UploadDemo;
