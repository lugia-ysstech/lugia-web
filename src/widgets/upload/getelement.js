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
import Progress from '../progress';
import FileInput from './fileInput';
import { px2emcss } from '../css/units';
import Widget from '../consts';
import { isKeyInArray } from './upload';
const em = px2emcss(1.2);

const Container = styled.div`
  width: ${props => (props.theme.width ? props.theme.width : '366px')};
  position: relative;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
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
      color: #684fff;
      animation: ${rotate} 0.8s linear infinite;
    }
  }
  &.hasBtn {
    border-radius: 4px 0 0 4px;
    border: 1px solid #9482ff;
    width: 286px;
  }
  & i.right {
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20px;
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

const Ul = styled.ul`
  width: 100%;
`;
const Li = styled.li`
  height: 36px;
  border-bottom: 1px dashed #e8e8e8;
  position: relative;
  &:hover {
    background: #f2f2f2;
  }
  &.loading {
    border-bottom: none;
  }

  & > span {
    line-height: 36px;
  }
  & .progress {
    margin-top: -10px;
  }
  & i.right {
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20px;
  }
  & i.success {
    color: #56c22d;
  }
  & i.error {
    color: #f22735;
  }
  & i.ccc {
    color: #ccc;
    vertical-align: middle;
    margin-right: 5px;
    font-size: 14px;
  }
  & i.close {
    color: #ccc;
    display: none;
  }
  &.loading:hover {
    i.close {
      display: inline-block;
      font-size: 14px;
    }
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

const getPictureViewIconSizeCSS = (props: Object) => {
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
  overflow: hidden;
  ${getPictureViewSizeCSS}
  & i {
    font-size: 30px;
    color: #999;
    ${getPictureViewIconSizeCSS}
  }
  & img {
    width: 100%;
  }
`;

const AreaView = styled.div`
  border: 1px dashed #999;
  border-radius: 4px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: space-around;
  ${getPictureViewSizeCSS}
  & i {
    font-size: 30px;
    color: #999;
    ${getPictureViewIconSizeCSS}
  }
`;
const AreaText = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 24px;
`;
const AreaTextBlue = styled.span`
  font-size: 14px;
  color: #684fff;
  padding: 0 4px;
  border-bottom: 1px solid #684fff;
`;

export const getListIconType = (fileName: ?string): string => {
  if (!fileName) return 'file';
  const filetype = fileName.replace(/.+\./, '');
  const picArr = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'];
  if (isKeyInArray(picArr, filetype.toLowerCase())) return 'picture';

  const videoArr = ['mpeg', 'avi', 'mov', 'asf', 'wmv', '3gp', 'mkv', 'flv', 'rmvb', 'mp4'];
  if (isKeyInArray(videoArr, filetype.toLowerCase())) return 'video';
  return 'file';
};

export const getIconByType = (status: string, type?: number): ?Object | string => {
  if (!status) return;
  if (type === 1 && status === 'default') return '上传';
  if (status === 'default') {
    return <LoadIcon iconClass="lugia-icon-financial_upload right" />;
  }
  if (status === 'loading') {
    return <LoadIcon iconClass="lugia-icon-financial_loading_o loadIcon" />;
  }
  if (status === 'done') {
    return <LoadIcon iconClass="lugia-icon-financial_upload" />;
  }
  if (status === 'picture') {
    return <LoadIcon iconClass="lugia-icon-financial_pic ccc" />;
  }
  if (status === 'video') {
    return <LoadIcon iconClass="lugia-icon-financial_video_camera ccc" />;
  }
  if (status === 'file') {
    return <LoadIcon iconClass="lugia-icon-financial_folder ccc" />;
  }
  if (status === 'add') {
    return <LoadIcon iconClass="lugia-icon-reminder_plus" />;
  }
  if (status === 'uploadcloud') {
    return <LoadIcon iconClass="lugia-icon-financial_upload_cloud" />;
  }
  if (status === 'li-done') {
    return <LoadIcon iconClass="lugia-icon-reminder_check_circle right success" />;
  }
  if (status === 'li-fail') {
    return <LoadIcon iconClass="lugia-icon-reminder_close_circle right error" />;
  }
  if (status === 'li-loading') {
    return <LoadIcon iconClass="lugia-icon-reminder_close right close" />;
  }
};

const getProgress = (item: Object) => {
  const { status } = item;

  if (status === 'done') return;
  if (status === 'loading') {
    const { percent } = item;
    return (
      <div className="progress">
        <Progress size="small" percent={percent} />
      </div>
    );
  }
};

const getFileList = (data: Array<Object>) => {
  if (!data) return;
  return (
    <Ul>
      {data.map(item => {
        return (
          <Li className={item.status}>
            {getIconByType(getListIconType(item.name))} <span>{item.name}</span>
            {getIconByType('li-' + item.status)} {getProgress(item)}{' '}
          </Li>
        );
      })}
    </Ul>
  );
};

const getElement = (that: Object): ?Object => {
  const { props, state } = that;
  const { listType } = props;
  if (!listType) return;
  const { classNameStatus } = state;
  const { size, inputId, defaultText } = props;
  const { getRegisterInput, getChangeInfo, handleClickToUpload } = that;
  if (listType === 'default') {
    const { dropArea } = that;
    return (
      <React.Fragment>
        <FileInput
          id={inputId}
          {...props}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        <InputContent className={classNameStatus} onClick={handleClickToUpload} innerRef={dropArea}>
          {getIconByType(classNameStatus)} {defaultText}
        </InputContent>
      </React.Fragment>
    );
  }
  if (listType === 'both') {
    const { handleClickToSubmit, dropArea } = that;
    return (
      <React.Fragment>
        <FileInput
          id={inputId}
          {...props}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />

        <InputContent
          className={`${classNameStatus} hasBtn`}
          onClick={handleClickToUpload}
          innerRef={dropArea}
        >
          {defaultText}
        </InputContent>

        <Button onClick={handleClickToSubmit}>{getIconByType(classNameStatus, 1)}</Button>
      </React.Fragment>
    );
  }
  if (listType === 'button') {
    return (
      <React.Fragment>
        <FileInput
          id={inputId}
          {...props}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        <Button className="button" onClick={handleClickToUpload}>
          点击上传
        </Button>
      </React.Fragment>
    );
  }
  if (listType === 'picture') {
    const { previewUrl } = props;
    return (
      <React.Fragment>
        <FileInput
          // id={inputId}
          {...props}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        <PictureView id={inputId} size={size} onClick={handleClickToUpload}>
          {/*{' '}*/}
          {!previewUrl ? getIconByType('add') : <img src={previewUrl} alt="" />}
        </PictureView>
      </React.Fragment>
    );
  }
  if (listType === 'area') {
    const { dropArea } = that;
    return (
      <React.Fragment>
        <FileInput
          id={inputId}
          {...props}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        <AreaView size={'bigger'} innerRef={dropArea} onClick={handleClickToUpload}>
          {getIconByType('uploadcloud')}
          <AreaText>
            请将文件拖到此处,或<AreaTextBlue>点击上传</AreaTextBlue>
          </AreaText>
        </AreaView>
      </React.Fragment>
    );
  }
};

type defProps = {
  classNameStatus?: string,
  defaultText: string,
  fileName?: string,
};
type stateProps = {
  status: string,
  inputElement: Object,
  classNameStatus?: string,
  defaultText: string,
};
class GetElement extends React.Component<any, stateProps> {
  static defaultProps = {};
  dropArea: any;
  constructor(props: Object) {
    super(props);
    this.dropArea = React.createRef();
  }

  componentDidMount() {
    const { dropArea, getChangeInfo } = this;
    if (!dropArea.current) return;
    const dragDrop = dropArea.current;
    dragDrop.addEventListener(
      'dragover',
      function(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      false
    );
    dragDrop.addEventListener(
      'dragleave',
      function(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      false
    );
    dragDrop.addEventListener(
      'drop',
      function(e) {
        e.stopPropagation();
        e.preventDefault();

        const files = e.target.files || e.dataTransfer.files;
        getChangeInfo('drag', files);
      },
      false
    );
  }

  static getDerivedStateFromProps(defProps: defProps, stateProps: stateProps) {
    const { classNameStatus, defaultText } = defProps;
    console.log(defaultText);
    if (!stateProps) {
      return {
        classNameStatus,
        defaultText,
      };
    }
    return {
      classNameStatus: 'classNameStatus' in defProps ? classNameStatus : stateProps.classNameStatus,
      defaultText: 'defaultText' in defProps ? defaultText : stateProps.defaultText,
    };
  }
  getRegisterInput = (input: Object) => {
    this.setState({
      inputElement: input.current,
    });
  };
  getChangeInfo = (types: string, e: Object) => {
    const { setChoosedFile } = this.props;
    setChoosedFile && setChoosedFile(types, e);
  };
  render() {
    const { showFileList, fileList, getTheme } = this.props;
    return (
      <React.Fragment>
        {/*<Container theme={getTheme()} onClick={this.handleClick}>*/}
        <Container theme={getTheme()}>{getElement(this)}</Container>
        <React.Fragment> {showFileList ? getFileList(fileList) : null}</React.Fragment>
      </React.Fragment>
    );
  }

  handleClickToUpload = () => {
    const { inputElement } = this.state;
    inputElement.click();
  };
  handleClickToSubmit = () => {
    const { setAutoUploadState } = this.props;
    setAutoUploadState && setAutoUploadState(true);
  };
}

export default GetElement;
