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
import styled from 'styled-components';
import request from './request';
import Widget from '../consts';
import Theme from '../theme';

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
      accessKey: ['uploadToken'],
      beforeUpload: (file: Object) => {
        return new Promise((resolve, reject) => {
          request({
            url: 'http://localhost:7001/getToken',
            method: 'post',
            dataType: 'json',
            data: { name: file.name },
            onSuccess: res => {
              if (res.code === 200) {
                file.uploadToken = res.data;
                resolve({ status: true, file });
              } else {
                reject();
              }
            },
            onFail: res => {
              reject();
            },
          });
        });
      },
      data: {},
      onChange: res => {},
      onSuccess: (res, fileList) => {},
      onComplete: res => {},
      onProgress: res => {},
      onFail: res => {},
    };
    const defaultProps11 = {
      listType: 'default',
      inputId: 'upload',
      showFileList: true,
      url: 'http://localhost:7001/upload',
      multiple: true,
      accessKey: ['uploadToken'],
      disabled: true,
      beforeUpload: (file: Object) => {
        return new Promise((resolve, reject) => {
          request({
            url: 'http://localhost:7001/getToken',
            method: 'post',
            dataType: 'json',
            data: { name: file.name },
            onSuccess: res => {
              if (res.code === 200) {
                file.uploadToken = res.data;
                resolve({ status: true, file });
              } else {
                reject();
              }
            },
            onFail: res => {
              reject();
            },
          });
        });
      },
      data: {},
      onChange: res => {},
      onSuccess: (res, fileList) => {},
      onComplete: res => {},
      onProgress: res => {},
      onFail: res => {},
    };
    const defaultProps1 = {
      listType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      multiple: true,
      showFileList: true,
      fileList: [
        {
          id: 1,
          name: '文件11111.jpg',
          status: 'done',
          url: 'http://img05.tooopen.com/images/20150602/tooopen_sy_128223296629.jpg',
        },
      ],
    };
    const defaultProps2 = {
      listType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      multiple: true,
      onChange: res => {},
    };
    const defaultProps3 = {
      listType: 'picture',
      inputId: 'upload3',
      size: 'large',
      multiple: true,
      url: 'http://localhost:7001/upload',
      accept: 'image/*',
    };
    const defaultProps4 = {
      listType: 'picture',
      inputId: 'upload4',
      disabled: true,
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
      // multiple: true,
      // limit:3,
      url: 'http://localhost:7001/upload',
    };
    const defaultProps7 = {
      listType: 'default',
      inputId: 'upload',
      showFileList: true,
      url: 'http://localhost:7001/upload',
      disabled: true,
    };
    const defaultProps9 = {
      listType: 'area',
      inputId: 'upload6',
      showFileList: true,
      disabled: true,
      url: 'http://localhost:7001/upload',
    };
    const defaultProps8 = {
      listType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      disabled: true,
      showFileList: true,
      fileList: [
        { id: 1, name: '文件11111.jpg', status: 'done' },
        { id: 2, name: '文件666.doc', status: 'fail' },
      ],
    };
    const defaultProps10 = {
      listType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      multiple: true,
      showFileList: true,
      limit: 3,
    };

    const config = {
      [Widget.Upload]: {
        normal: {
          // color: 'yellow',
          // font:{fontWeight:'bold'},
        },
        children: {
          defaultIcon: {
            normal: {
              color: '#666',
            },
          },
          successIcon: {
            normal: {
              color: '#56c22d',
            },
          },
          errorIcon: {
            normal: {
              color: '#f22735',
            },
          },
        },
      },
    };

    return (
      <div>
        <Theme config={config}>
          {/*<Title>默认： </Title>*/}
          {/*<Upload {...defaultProps} />*/}
          {/*<Title>默认 disabled： </Title>*/}
          {/*<Upload {...defaultProps11} />*/}
          {/*<Title>Button： </Title>*/}
          {/*<Upload {...defaultProps1} />*/}
          <Title>Both： </Title>
          <Upload {...defaultProps2} />
          {/*<Title>picture large accept(image)： </Title>*/}
          {/*<Upload {...defaultProps3} />*/}
          <Title>picture middle disabled： </Title>
          <Upload {...defaultProps4} />
          <Title>picture small： </Title>
          <Upload {...defaultProps5} />
          <Title>area： </Title>
          <Upload {...defaultProps6} />
          <Title>default disabled： </Title>
          <Upload {...defaultProps7} />
          <Title>Button disabled： </Title>
          <Upload {...defaultProps8} />
          <Title>area disabled： </Title>
          <Upload {...defaultProps9} />
          <Title>button limit 3： </Title>
          <Upload {...defaultProps10} />
        </Theme>
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
