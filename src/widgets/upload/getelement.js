/*
 *create by LYQ
 *
 *2018-12-04
 *
 *@flow
 *
 */
import React from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';
import Widget from '../consts/index';
import Theme from '../theme';
import { ButtonOutProps } from '../css/button';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const Container = styled.div`
  width: ${props => (props.theme.width ? props.theme.width : '366px')};
  position: relative;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  display: none;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const InputContent = styled.div`
  width: ${props => (props.theme.width ? props.theme.width : '346px')};
  height: 30px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  color: #ccc;
  padding: 0 0 0 10px;
  line-height: 30px;
  overflow: hidden;
  box-sizing: border-box;
  &.done {
    border: 1px solid #684fff;
    color: #333;
    position: relative;
    & i {
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 10px;
    }
  }
  &.loading {
    border: 1px solid #684fff;
    & .loadIcon {
      margin-right: 10px;
      animation: ${rotate} 0.8s linear infinite;
    }
  }
  &.hasBtn {
    border-radius: 4px 0 0 4px;
    border: 1px solid #9482ff;
    width: 286px;
  }
`;

const LoadIcon = styled(Icon)`
  &.loadIcon {
    margin-right: 10px;
  }
`;

const Button = styled.span`
  width: 60px;
  height: 30px;
  background: #684fff;
  display: inline-block;
  float: right;
  text-align: center;
  color: #fff;
  line-height: 30px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  &.loading {
    background: #9482ff;
  }
  & .loadIcon {
    animation: ${rotate} 0.8s linear infinite;
  }
  &.button {
    width: 100px;
    border-radius: 4px;
  }
`;

const Li = styled.li`
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #e8e8e8;
  &:hover {
    background: #f2f2f2;
  }
`;

const Size = {
  bigger: {
    width: 300,
    height: 150,
    fontSize: 50,
  },
  large: {
    width: 100,
    height: 100,
    fontSize: 30,
  },
  default: {
    width: 80,
    height: 80,
    fontSize: 20,
  },
  small: {
    width: 60,
    height: 60,
    fontSize: 16,
  },
};

function fetchSize(sizeType: string) {
  const size = Size[sizeType];
  return {
    height: `${em(size.height)}`,
    width: `${em(size.width)}`,
    fontSize: `${em(size.fontSize)}`,
  };
}

const getPictureViewSizeCSS = (props: Object) => {
  const { size = 'default' } = props;
  const { height, width } = fetchSize(size);
  return `
    height: ${height};
    width: ${width};
  `;
};

const getPVIconSizeCSS = (props: Object) => {
  const { size = 'default' } = props;
  const { fontSize } = fetchSize(size);
  return `
    font-size: ${fontSize};
  `;
};

const PictureView = styled.div`
  border: 1px dashed #999;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${getPictureViewSizeCSS}
  & i {
    font-size: 30px;
    color: #999;
    ${getPVIconSizeCSS}
  }
`;

const AreaView = styled.div`
  border: 1px dashed #999;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: space-around;
  ${getPictureViewSizeCSS}
  & i {
    font-size: 30px;
    color: #999;
    ${getPVIconSizeCSS}
  }
`;
const Text = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 24px;
`;
const TextBlue = styled.span`
  font-size: 14px;
  color: #684fff;
  padding: 0 4px;
  border-bottom: 1px solid #684fff;
`;

const getIcon = (status: string, type?: number): Object => {
  if (!status) return;
  if (type === 1 && status === 'default') return '上传';
  if (status === 'loading') {
    return <LoadIcon iconClass="lugia-icon-financial_loading_o loadIcon" />;
  }
  if (status === 'done') {
    return <LoadIcon iconClass="lugia-icon-financial_upload" />;
  }
  if (status === 'picture') {
    return <LoadIcon iconClass="lugia-icon-financial_pic" />;
  }
  if (status === 'video') {
    return <LoadIcon iconClass="lugia-icon-financial_video_camera" />;
  }
  if (status === 'file') {
    return <LoadIcon iconClass="lugia-icon-financial_folder" />;
  }
  if (status === 'add') {
    return <LoadIcon iconClass="lugia-icon-reminder_plus" />;
  }
  if (status === 'uploadcloud') {
    return <LoadIcon iconClass="lugia-icon-financial_upload_cloud" />;
  }
};

export const getElement = (props: Object, state: Object): Object => {
  const { listType, getTheme, size } = props;
  const { status } = state;
  const className = '';
  if (!listType) return;
  if (listType === 'default') {
    return (
      <Container theme={getTheme()}>
        <Input type="file" id="upload" />
        <label for="upload">
          <InputContent className={className}>{getIcon(status)}请将文件拖到此处</InputContent>
        </label>
      </Container>
    );
  }
  if (listType === 'both') {
    return (
      <Container theme={getTheme()}>
        <Input type="file" id="upload" />
        <label for="upload">
          <InputContent className={`${className} hasBtn`}>请将文件拖到此处</InputContent>
        </label>
        <Button>{getIcon(status, 1)}</Button>
      </Container>
    );
  }
  if (listType === 'button') {
    return (
      <Container theme={getTheme()}>
        <Input type="file" id="upload" />
        <label for="upload">
          <Button className="button">点击上传</Button>
        </label>
        <ul style={{ width: '100%' }}>
          <Li>文件111111111111</Li>
          <Li>文件2222222222</Li>
          <Li>文件3333333333333</Li>
        </ul>
      </Container>
    );
  }
  if (listType === 'picture') {
    return (
      <Container theme={getTheme()}>
        <Input type="file" id="upload" />
        <label for="upload">
          <PictureView size={size}>{getIcon('add')} </PictureView>
        </label>
      </Container>
    );
  }
  if (listType === 'area') {
    return (
      <Container theme={getTheme()}>
        <Input type="file" id="upload" />
        <label for="upload">
          <AreaView size={'bigger'}>
            {getIcon('uploadcloud')}
            <Text>
              请将文件拖到此处,或<TextBlue>点击上传</TextBlue>
            </Text>
          </AreaView>
        </label>
      </Container>
    );
  }
};
