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
      isShowProgress: false,
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
      name: 'lugiaRR',
      showFileList: true,
      autoUpload: false,
      getInputRef: input => {
        this.input = input;
      },
      onChange: res => {
        console.log('res', res, 'this.input', this.input);
        setTimeout(() => {
          this.input.value = '';
          this.setState({ aa: 123 });
        }, 2000);
      },
      defaultTips: {
        uploadText: '点击上传',
        failTips: '上传失败',
        loadingTips: '文件上传中...',
      },
    };

    const defaultLongProps1 = {
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
      defaultTips: {
        uploadText: '很长很长很长的撑开的点击上传',
        failTips: '文件上传失败请重试',
        loadingTips: '文件上传中...',
      },
    };

    const defaultProps2 = {
      areaType: 'both',
      inputId: 'upload2',
      url: 'http://localhost:7001/upload',
      showFileList: true,
      multiple: true,
      autoUpload: false,
      onChange: res => {},
      defaultTips: { uploadText: '上传', uploadTips: '请将文件拖到此处或者点击选择' },
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
      disabled: true,
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
    const customUploadProps = {
      areaType: 'custom',
      inputId: 'upload1',
      url: 'http://localhost:7001/upload',
      userDefine: <div>点这里进行上传</div>,
      showFileList: true,
      customUpload: (file, func) => {
        console.log('file,func', file, func);
        func.start();
      },
    };
    const configButton = {
      [Widget.Upload]: {
        Container: {
          Container: {
            normal: {
              width: 300,
              height: 80,
            },
          },
          ButtonText: {
            normal: {
              color: 'orange',
            },
          },
        },
        UploadLiType: {
          normal: {
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            background: { color: 'orange' },
          },
        },
        UploadButtonFail: {
          Container: {
            normal: {
              border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            },
            hover: {
              border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            },
            active: {
              border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            },
            focus: {
              border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            },
            disabled: {
              border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            },
          },
          ButtonText: {
            normal: {
              color: 'orange',
            },
          },
        },
      },
    };
    const config = {
      [Widget.Upload]: {
        Container: {
          normal: {
            width: 900,
            height: 80,
            color: 'red',
            borderRadius: getBorderRadius(4),
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
          hover: {},
          disabled: {
            borderRadius: getBorderRadius(4),
          },
        },
        UploadIcon: {
          normal: {
            fontSize: 20,
            padding: {
              top: 0,
              bottom: 0,
              left: 20,
              right: 20,
            },
            color: 'grey',
          },
        },
        uploadLoading: {
          normal: {
            border: getBorder({ color: 'blue', width: 1, style: 'solid' }),
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
    const configPicture = {
      [Widget.Upload]: {
        Container: {
          normal: {
            width: 346,
            height: 150,
            color: 'orange',
            borderRadius: getBorderRadius(4),
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
          hover: {},
          disabled: {
            borderRadius: getBorderRadius(4),
          },
        },
        UploadFail: {
          normal: {
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
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
      },
    };

    const configBoth = {
      [Widget.Upload]: {
        Container: {
          normal: {
            width: 800,
            height: 40,
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
          hover: {},
          disabled: {
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
        },
        UploadFail: {
          normal: {
            border: getBorder({ color: 'red', width: 1, style: 'solid' }),
          },
        },
        UploadButtonType: {
          Container: {
            normal: {
              width: 100,
              background: { color: 'orange' },
            },
          },
        },
        UploadButtonFail: {
          Container: {
            normal: {
              width: 200,
              background: { color: 'orange' },
            },
            hover: {
              background: { color: 'orange' },
            },
            active: {
              background: { color: 'orange' },
            },
            focus: {
              background: { color: 'orange' },
            },
            disabled: {
              background: { color: 'orange' },
            },
          },
          ButtonText: {
            normal: {
              color: 'black',
            },
          },
        },
        UploadButtonLoading: {
          Container: {
            normal: {
              width: 200,
              background: { color: 'orange' },
            },
            hover: {
              background: { color: 'orange' },
            },
            active: {
              background: { color: 'orange' },
            },
            focus: {
              background: { color: 'orange' },
            },
            disabled: {
              background: { color: 'orange' },
            },
          },
          UploadIcon: {
            normal: {
              color: 'black',
            },
          },
        },

        UploadInputTheme: {
          normal: {
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
          hover: {},
          disabled: {
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
        },
      },
    };
    const configBoth100 = {
      [Widget.Upload]: {
        UploadButtonType: {
          normal: {
            width: 200,
          },
          hover: {
            boxShadow: ' 0 0 2px #ccc',
            opacity: 0.5,
          },
          disabled: {
            background: {
              color: '#ccc',
            },
          },
        },
        Container: {
          normal: {
            width: 900,
            height: '100%',
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
          hover: {},
          disabled: {
            background: {
              color: '#ccc',
            },
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
          },
        },
      },
    };

    const areaConfig = {
      [Widget.Upload]: {
        Container: {
          normal: {
            width: 400,
            height: 180,
            fontSize: 15,
            color: 'red',
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
        },
        UploadFail: {
          normal: {
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
        },
        UploadAreaText: {
          normal: {
            color: 'blue',
          },
        },
      },
    };
    const Iconconfig = {
      [Widget.Upload]: {
        Container: {
          normal: {
            color: 'orange',
          },
        },
        UploadIcon: {
          normal: {
            color: 'orange',
          },
        },
        LiFileIcon: {
          normal: {
            color: 'orange',
          },
        },
        LiVideoIcon: {
          normal: {
            color: 'orange',
          },
        },
        LiPictureIcon: {
          normal: {
            color: 'green',
          },
        },
        LiDeleteIcon: {
          normal: {
            color: 'orange',
          },
        },
        UploadListFailedIcon: {
          normal: {
            color: 'red',
          },
        },
      },
    };
    const defaultIconProps = {
      url: 'http://localhost:7001/upload',
      icon: 'lugia-icon-financial_service',
      successIcon: 'lugia-icon-financial_notification',
      failIcon: 'lugia-icon-financial_meh',
      liDeleteIcon: 'lugia-icon-reminder_close_circle_o',
      showFileList: true,
    };

    const typeMap = ['default', 'button', 'both', 'picture', 'area'];
    return (
      <div>
        <Title>-------------customUploadProps</Title>
        <Upload {...customUploadProps} />
        <Title>-------------</Title>
        <Title>---------------配置Icon 的上传</Title>
        {typeMap.map(item => {
          return (
            <Theme config={Iconconfig}>
              <div>
                <Title>{item}： </Title>
                <Upload areaType={item} {...defaultIconProps} />
              </div>
            </Theme>
          );
        })}
        <Title>--------------- END ---------------</Title>
        <Title>Both： </Title>
        <Upload {...defaultProps2} />
        <Title>Both disabled： </Title>
        <Upload {...defaultProps13} />
        <Theme config={configBoth}>
          <Title>配置主题的Both： </Title>
          <Upload {...defaultProps2} />
          <Title>配置主题Both disabled： </Title>
          <Upload {...defaultProps12} />
        </Theme>
        <div style={{ height: '30px', margin: '10px 0' }}>
          <Theme config={configBoth100}>
            <Upload {...defaultProps2} />
          </Theme>
        </div>
        <Title>默认类型： </Title>
        <Upload {...defaultProps} />
        <Theme config={config}>
          <Title>配置主题的默认类型： </Title>
          <Upload {...defaultProps} />
          <Title>配置主题的默认类型 disabled： </Title>
          <Upload {...defaultProps11} />
        </Theme>
        <Title>picture large accept(image)： </Title>
        <Upload {...defaultProps3} />
        <Title>picture middle disabled： </Title>
        <Upload {...defaultProps4} />
        <Title>picture small： </Title>
        <Upload {...defaultProps5} />
        <Theme config={configPicture}>
          <Title>配置主题的picture large accept(image)： </Title>
          <Upload {...defaultProps3} />
          <Title>配置主题的picture middle disabled： </Title>
          <Upload {...defaultProps4} />
          <Title>配置主题的picture small： </Title>
          <Upload {...defaultProps5} />
          <Title>default disabled： </Title>
          <Upload {...defaultProps7} />
        </Theme>
        <Title>Button： </Title>
        <Upload {...defaultProps1} />
        <Upload {...defaultLongProps1} />
        <Title>默认的Button disabled： </Title>
        <Upload {...defaultProps8} />
        <Title>默认default button limit 3： </Title>
        <Upload {...defaultProps10} />
        <Theme config={configButton}>
          <Title>配置宽度的Button disabled ： </Title>
          <Upload {...defaultProps8} />
          <Title>配置宽度的button limit 3： </Title>
          <Upload {...defaultProps10} />
        </Theme>
        <Title>area： </Title>
        <Upload {...defaultProps6} />
        <Title>area disabled： </Title>
        <Upload {...defaultProps9} />
        <Theme config={areaConfig}>
          <Title>配置主题的area： </Title>
          <Upload {...defaultProps6} />
          <Title>配置主题的area disabled： </Title>
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
