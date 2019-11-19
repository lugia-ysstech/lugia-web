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
import { getBorder } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';
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
      areaType: 'default',
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
      areaType: 'default',
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
      areaType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      multiple: true,
      showFileList: true,
      fileList: [
        {
          id: 1,
          name: '文件11111.jpg',
          status: 'done',
          url: 'http://pic18.nipic.com/20120204/8339340_144203764154_2.jpg',
        },
        {
          id: 2,
          name: '文件2222.mp4',
          status: 'fail',
          url: 'http://pic18.nipic.com/20120204/8339340_14420376454_2.mp4',
        },
        {
          id: 3,
          name: '文件33333.doc',
          status: 'done',
          url: 'http://pic18.nipic.com/20120204/8339340_144203764154_2.doc',
        },
      ],
    };

    const defaultProps2 = {
      areaType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      multiple: true,
      autoUpload: false,
      onChange: res => {},
    };
    const defaultProps12 = {
      areaType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      multiple: true,
      autoUpload: false,
      disabled: true,
      onChange: res => {},
    };
    const defaultProps13 = {
      areaType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      fileList: [
        {
          id: 1,
          name: '文件11111.jpg',
          status: 'done',
          url: 'http://pic18.nipic.com/20120204/8339340_144203764154_2.jpg',
        },
        {
          id: 2,
          name: '文件2222.mp4',
          status: 'fail',
          url: 'http://pic18.nipic.com/20120204/8339340_14420376454_2.mp4',
        },
        {
          id: 3,
          name: '文件33333.doc',
          status: 'done',
          url: 'http://pic18.nipic.com/20120204/8339340_144203764154_2.doc',
        },
      ],
      multiple: true,
      autoUpload: false,
      onChange: res => {},
    };
    const defaultProps3 = {
      areaType: 'picture',
      inputId: 'upload3',
      size: 'large',
      multiple: true,
      url: 'http://localhost:7001/upload',
      accept: 'image/*',
    };
    const defaultProps4 = {
      areaType: 'picture',
      inputId: 'upload4',
      disabled: true,
      url: 'http://localhost:7001/upload',
    };
    const defaultProps5 = {
      areaType: 'picture',
      inputId: 'upload5',
      size: 'small',

      url: 'http://localhost:7001/upload',
    };
    const defaultProps6 = {
      areaType: 'area',
      inputId: 'upload6',
      showFileList: true,
      url: 'http://localhost:7001/upload',
    };
    const defaultProps7 = {
      areaType: 'default',
      inputId: 'upload',
      showFileList: true,
      url: 'http://localhost:7001/upload',
      disabled: true,
    };
    const defaultProps9 = {
      areaType: 'area',
      inputId: 'upload6',
      showFileList: true,
      disabled: true,
      url: 'http://localhost:7001/upload',
    };
    const defaultProps8 = {
      areaType: 'button',
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
      areaType: 'button',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      multiple: true,
      showFileList: true,
      limit: 3,
    };

    const config = {
      [Widget.Upload]: {
        UploadButtonType: {
          Container: {
            normal: {
              width: 100,
              height: 30,
            },
          },
        },
        UploadDefaultType: {
          normal: {
            width: 346,
            height: 30,
            border: getBorder({ color: '#9482ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(4),
          },
          hover: {},
          disabled: {
            background: {
              color: '#ccc',
            },
            border: getBorder({ color: '#e8e8e8', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(4),
          },
        },
        UploadPictureType: {
          normal: {
            width: 80,
            height: 80,
            border: getBorder({ color: '#9482ff', width: 1, style: 'dashed' }),
            borderRadius: getBorderRadius(4),
          },
          hover: {},
          disabled: {
            background: {
              color: '#f7f9f9',
            },
            border: getBorder({ color: '#e8e8e8', width: 1, style: 'dashed' }),
            borderRadius: getBorderRadius(4),
          },
        },
        UploadLiType: {
          normal: {
            fontSize: 14,
            border: getBorder(
              { color: '#e8e8e8', width: 1, style: 'dashed' },
              { directions: ['b'] }
            ),
          },
          hover: {},
        },
        UploadListSuccessIcon: {
          normal: {
            color: '#087d07',
          },
        },
        UploadListFailedIcon: {
          normal: {
            color: '#f22735',
          },
        },
      },
    };

    const configBoth = {
      [Widget.Upload]: {
        UploadButtonType: {
          normal: {
            width: 100,
            height: 30,
          },
          hover: {
            boxShadow: ' 0 0 2px #ccc',
            opacity: 0.5,
          },
          disabled: {
            background: {
              color: '#ccc',
            },
            boxShadow: ' 0 0 2px #ccc',
          },
        },
        UploadDefaultType: {
          normal: {
            width: 346,
            height: 30,
            border: getBorder({ color: '#9482ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
          hover: {},
          disabled: {
            background: {
              color: '#ccc',
            },
            border: getBorder({ color: '#e8e8e8', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
        },
      },
    };

    const areaConfig = {
      [Widget.Upload]: {
        UploadAreaType: {
          normal: {
            fontSize: 30,
            width: 400,
            height: 180,
          },
        },
      },
    };

    return (
      <div>
        <Title>Both： </Title>
        <Upload {...defaultProps2} />
        <Title>Both disabled： </Title>
        <Upload {...defaultProps13} />

        <Theme config={config}>
          <Title>默认： </Title>
          <Upload {...defaultProps} />
          <Title>默认 disabled： </Title>
          <Upload {...defaultProps11} />
          <Title>Button： </Title>
          <Upload {...defaultProps1} />
        </Theme>
        <Theme config={configBoth}>
          <Title>Both： </Title>
          <Upload {...defaultProps2} />
          <Title>Both disabled： </Title>
          <Upload {...defaultProps12} />
        </Theme>
        <Theme config={config}>
          <Title>picture large accept(image)： </Title>
          <Upload {...defaultProps3} />
          <Title>picture middle disabled： </Title>
          <Upload {...defaultProps4} />
          <Title>picture small： </Title>
          <Upload {...defaultProps5} />
          <Title>default disabled： </Title>
          <Upload {...defaultProps7} />
          <Title>Button disabled： </Title>
          <Upload {...defaultProps8} />
          <Title>button limit 3： </Title>
          <Upload {...defaultProps10} />
        </Theme>
        <Theme config={areaConfig}>
          <Title>area： </Title>
          <Upload {...defaultProps6} />
          <Title>area disabled： </Title>
          <Upload {...defaultProps9} />
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
