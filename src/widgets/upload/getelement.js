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
import { isKeyInArray } from './upload';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Widget from '../consts/index';
import Theme from '../theme';
import colorsFunc from '../css/stateColor';

const { disableColor, themeColor } = colorsFunc();

const em = px2emcss(1.2);

const Container = styled.div`
  position: relative;
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
const getDisabled = props => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    border: 1px solid #e8e8e8;
    width: 286px;
    cursor: not-allowed;
    `;
};
const getclassNameStatus = props => {
  const { status } = props;
  let defaultStye = 'border: 1px solid #684fff';
  if (!status) {
    return defaultStye;
  }
  const { hasBtn } = props;
  if (hasBtn) {
    defaultStye += `
      border-radius: 4px 0 0 4px;
      border: 1px solid #9482ff;
      width: 286px;
    `;
  }
  if (status === 'done') {
    return `
      ${defaultStye};
      color: #333;
      position: relative;
    `;
  }
  return defaultStye;
};
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
  position: relative;
  ${getclassNameStatus}
  ${getDisabled}
`;

const Ul = styled.ul`
  min-width: 366px;
  padding: 6px 0 0;
`;

const getLiStyle = props => {
  const { status } = props;
  if (!status) return '';
  if (status === 'fail') {
    return `
    color: #f22735;
    `;
  }
  if (status === 'loading') {
    return `
      border-bottom: none;
    `;
  }
};

const ProgressCon = styled.div`
  margin-top: -10px;
`;

const Li = styled.li`
  height: 36px;
  border-bottom: 1px dashed #e8e8e8;
  position: relative;
  padding-left: 5px;
  & > span {
    line-height: 36px;
  }
  &:hover {
    background: #f2f2f2;
    cursor: pointer;
  }

  ${getLiStyle}
`;

const getButtonStatus = props => {
  const { listType } = props;
  let onlyButton = '';

  if (listType && listType === 'button') {
    onlyButton = 'width: 100px;border-radius: 4px';
  }
  const { disabled } = props;
  if (!disabled) return `${onlyButton}`;

  return `
    ${onlyButton}
    background: ${disableColor};
    color: #ccc;
    cursor: not-allowed;
  `;
};
const Button = styled.span`
  width: 60px;
  height: 30px;
  background: ${themeColor};
  display: inline-block;
  border-radius: 0 4px 4px 0;
  float: right;
  text-align: center;
  color: #fff;
  line-height: 30px;
  cursor: pointer;
  ${getButtonStatus}
`;

const PrevCon = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;
const PrevImg = styled.div`
  display: none;
  position: absolute;
  left: -5px;
  top: 23px;
  width: 120px;
  height: 90px;
  border-radius: 4px;
  padding: 4px;
  background: #fff;
  box-shadow: 0 0 6px rgba(51, 51, 51, 0.2);
  z-index: 10;
  & img {
    width: 100%;
    height: 80%;
  }
  & div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${PrevCon}:hover & {
    display: block;
  }
`;

const Triangle = styled.span`
  display: block;
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #ccc;
  position: absolute;
  top: -16px;
  left: 5px;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #fff;
    position: absolute;
    top: -7px;
    left: -8px;
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

const getPictureOrAreaViewDisabled = props => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    background: ${disableColor};
    color: #ccc;
    cursor: not-allowed;
    & i {
      cursor: not-allowed;
      color:#ccc;
    }
    &:hover{
    border: 1px dashed #999;
  }
    `;
};

const getPictureViewStatus = props => {
  const { status } = props;
  if (!status) {
    return '';
  }
  let defaultStyle = '';
  if (status === 'done') {
    defaultStyle = `
      border: 1px dashed #684fff;
    `;
  }
  if (status === 'fail') {
    defaultStyle = `
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #666;
    `;
  }
  return defaultStyle;
};

const PictureView = styled.div`
  border: 1px dashed #999;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  position: relative;
  cursor: pointer;
  ${getPictureOrAreaViewDisabled}
  ${getPictureViewStatus}
  ${getPictureViewSizeCSS}
 
  & img {
    width: 100%;
    max-height: 100%;
  }
`;

const isDragIn = props => {
  const { dragIn } = props;
  if (!dragIn) {
    return '';
  }
  return `
    border: 1px dashed ${themeColor};
    transition: border 0.2s;
  }
    `;
};

const AreaView = styled.div`
  border: 1px dashed #999;
  border-radius: 4px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: space-around;
  color: #999;
  &:hover {
    border: 1px dashed ${themeColor};
  }

  ${getPictureViewSizeCSS}
  ${isDragIn}
  ${getPictureOrAreaViewDisabled}
`;
const AreaText = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 24px;
`;

const getAreaTextBlueDisabled = props => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    color: #ccc;
    border-bottom:none;
     cursor:not-allowed;
    `;
};

const AreaTextBlue = styled.span`
  color: #684fff;
  padding: 0 4px;
  border-bottom: 1px solid #684fff;
  cursor: pointer;
  ${getAreaTextBlueDisabled}
`;

const isClassInString = (target, key) => {
  return target.indexOf(key) !== -1;
};

const getIconClass = props => {
  const { iconClass } = props;
  if (!iconClass) {
    return '';
  }
  let loadIconStyle = '';
  if (isClassInString(iconClass, 'loadIcon')) {
    loadIconStyle = `margin-right: 10px;color: #684fff;animation: ${rotate} 0.8s linear infinite;`;
  }
  let rightStyle = '';
  if (isClassInString(iconClass, 'right')) {
    rightStyle = `
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 10px;
    `;
  }
  let successStyle = '';
  if (isClassInString(iconClass, 'success')) {
    successStyle = `
       color: #56c22d;
    `;
  }
  let errorStyle = '';
  if (isClassInString(iconClass, 'error')) {
    errorStyle = `
       color: #f22735;
    `;
  }
  let cccStyle = '';
  if (isClassInString(iconClass, 'ccc')) {
    cccStyle = `
      color: #ccc;
      vertical-align: middle;
      margin-right: 5px;
      font-size: 14px;
    `;
  }

  let deleteStyle = '';
  if (isClassInString(iconClass, 'delete')) {
    deleteStyle = `
      color: #ccc;
      display: none !important;
    `;
  }

  return `
     ${loadIconStyle}
     ${rightStyle}
     ${successStyle}
     ${errorStyle}
     ${cccStyle}
     ${deleteStyle}
     
    `;
};

const gethoverStyle = props => {
  const { iconClass } = props;
  if (!iconClass) {
    return '';
  }
  let deleteStyle = '';
  if (iconClass.indexOf('delete') !== -1) {
    deleteStyle = `
      display: block !important;
      font-size: 14px;
    `;
  }
  let statusIconStye = '';
  if (iconClass.indexOf('success') !== -1 || iconClass.indexOf('error') !== -1) {
    statusIconStye = `
      display: none;
    `;
  }
  return `
     ${statusIconStye}
     ${deleteStyle}
     
    `;
};

const LoadIcon = styled(Icon)`
  ${getIconClass}
  ${Button} & {
    color: #fff;
    margin: 0;
  }

  ${Li}:hover & {
    background: #f2f2f2;
    cursor: pointer;
    ${gethoverStyle}
  }
  & i {
    font-size: 30px;
    color: #999;
    ${getPictureViewIconSizeCSS}
  }

  ${AreaView} & {
    font-size: 55px;
  }

  ${PictureView} & {
    font-size: 30px;
    color: #999;
    ${getPictureViewIconSizeCSS}
    &.error {
      position: absolute;
      right: -8px;
      top: 0;
      font-size: 18px;
      color: #f22735;
      z-index: 10;
      display: none;
      background: #fff;
      border: 2px solid #fff;
    }
  }

  ${PictureView}:hover & {
    display: inline-block;
  }
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

const iconClassMap = {
  default: 'lugia-icon-financial_upload right',
  loading: 'lugia-icon-financial_loading_o loadIcon',
  done: 'lugia-icon-financial_upload right',
  video: 'lugia-icon-financial_video_camera ccc',
  file: 'lugia-icon-financial_folder ccc',
  uploadcloud: 'lugia-icon-financial_upload_cloud',
  'p-default': 'lugia-icon-reminder_plus',
  'p-fail': 'lugia-icon-financial_monitoring',
  'li-done': 'lugia-icon-reminder_check_circle right success',
  'li-fail': 'lugia-icon-reminder_close_circle right error',
  'li-delete': 'lugia-icon-reminder_close right delete',
};

export const getIconByType = (status: ?string, props?: Object = {}): ?Object | string => {
  if (!status) return null;
  const { type } = props;
  if (type === 1 && status !== 'loading') return '上传';
  if (props && (status === 'li-fail' || status === 'li-delete')) {
    const { doFunction, index } = props;
    return (
      <LoadIcon
        iconClass={iconClassMap[status]}
        onClick={() => {
          doFunction(index);
        }}
      />
    );
  }
  if (status === 'picture') {
    return (
      <PrevCon>
        <LoadIcon iconClass="lugia-icon-financial_pic ccc" />
        {getListIconType(props.name) === 'picture' && props.url ? (
          <PrevImg>
            <img src={props.url} alt="" /> <Triangle />
            <div>{props.url}</div>
          </PrevImg>
        ) : null}
      </PrevCon>
    );
  }
  if (status === 'area-loading') {
    return <LoadIcon iconClass={iconClassMap.loading} active={true} />;
  }
  return <LoadIcon iconClass={iconClassMap[status]} />;
};

const getProgress = (item: Object) => {
  const { status } = item;
  if (status === 'done') return;
  if (status === 'loading') {
    const { percent } = item;
    return (
      <ProgressCon>
        <Progress percent={percent} />
      </ProgressCon>
    );
  }
};

const getFileList = (data: Array<Object>, close: Function) => {
  if (!data || data.length === 0) return;
  return (
    <Ul>
      {data.map((item, index) => {
        return (
          <Li status={item.status}>
            {getIconByType(getListIconType(item.name), item)} <span>{item.name}</span>
            {getIconByType('li-' + item.status)}
            {getIconByType('li-delete', { doFunction: close, index })}
            {getProgress(item)}
          </Li>
        );
      })}
    </Ul>
  );
};

type DefProps = {
  classNameStatus?: string,
  defaultText: string,
  fileName?: string,
  setChoosedFile: Function,
  showFileList: boolean,
  disabled?: boolean,
  fileListDone: Array<Object>,
  getTheme: Function,
  setAutoUploadState: Function,
  setDeleteList: Function,
  listType: string,
  previewUrl: string,
  size: string,
  inputId: string,
  accept: string,
  multiple: boolean,
};
type StateProps = {
  status: string,
  inputElement: Object,
  classNameStatus: string,
  defaultText: string,
  dragIn: boolean,
};

class GetElement extends React.Component<DefProps, StateProps> {
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
    const stopPropagation = (e: Object) => {
      e.stopPropagation();
      e.preventDefault();
    };
    addEventListener(dragDrop, 'dragover', e => {
      stopPropagation(e);
      this.setState({
        dragIn: true,
      });
    });
    addEventListener(dragDrop, 'dragleave', e => {
      stopPropagation(e);
      this.setState({
        dragIn: false,
      });
    });

    dragDrop.addEventListener('drop', function(e) {
      stopPropagation(e);
      const files = e.target.files || e.dataTransfer.files;
      getChangeInfo('drag', files);
    });
  }

  static getDerivedStateFromProps(defProps: DefProps, stateProps: StateProps) {
    const { classNameStatus, defaultText } = defProps;
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
    if (!setChoosedFile) {
      return;
    }
    if (types === 'drag') {
      setChoosedFile(e);
    } else {
      setChoosedFile(e.target.files);
    }
  };

  render() {
    const { showFileList, fileListDone, getTheme } = this.props;
    const config = {
      [Widget.Progress]: {
        height: 2,
      },
    };
    return (
      <React.Fragment>
        <Theme config={config}>
          <Container theme={getTheme()}>{this.getElement()}</Container>
          <React.Fragment>
            {' '}
            {showFileList ? getFileList(fileListDone, this.handleClickToDelete) : null}
          </React.Fragment>
        </Theme>
      </React.Fragment>
    );
  }

  getElement = (): ?Object => {
    const { props } = this;
    const { listType } = props;
    if (!listType) return;
    const { state } = this;
    const { classNameStatus, dragIn } = state;
    const children = this.getChildren(listType, props, classNameStatus, dragIn);
    const { inputId, disabled, accept, multiple } = props;
    const { getRegisterInput, getChangeInfo } = this;
    return (
      <React.Fragment>
        <FileInput
          id={inputId}
          multiple={multiple}
          disabled={disabled}
          accept={accept}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        {children}
      </React.Fragment>
    );
  };

  getChildren(listType: string, props: DefProps, classNameStatus: string, dragIn: boolean) {
    let children;
    if (listType === 'default') {
      const { dropArea, handleClickToUpload } = this;
      const { defaultText, disabled } = props;
      children = (
        <InputContent
          disabled={disabled}
          status={classNameStatus}
          onClick={handleClickToUpload}
          innerRef={dropArea}
        >
          {getIconByType(classNameStatus)} {defaultText}
        </InputContent>
      );
    }
    if (listType === 'both') {
      const { handleClickToSubmit, dropArea, handleClickToUpload } = this;
      const { defaultText, showFileList, disabled } = props;
      children = (
        <React.Fragment>
          <InputContent
            status={classNameStatus}
            hasBtn="hasBtn"
            onClick={handleClickToUpload}
            innerRef={dropArea}
          >
            {defaultText}
            {showFileList ? null : getIconByType('li-' + classNameStatus)}
          </InputContent>

          <Button disabled={disabled} onClick={handleClickToSubmit}>
            {getIconByType(classNameStatus, { type: 1 })}
          </Button>
        </React.Fragment>
      );
    }
    if (listType === 'button') {
      const { disabled } = props;
      const { handleClickToUpload } = this;
      children = (
        <Button disabled={disabled} listType={listType} onClick={handleClickToUpload}>
          点击上传
        </Button>
      );
    }
    if (listType === 'picture') {
      const { size, disabled, fileListDone, multiple, previewUrl } = props;
      const { handleClickToUpload, handleClickToDelete, dropArea } = this;
      children = (
        <React.Fragment>
          {classNameStatus === 'done' &&
            multiple &&
            fileListDone.map((item, index) => (
              <PictureView size={size} disabled={disabled} status={classNameStatus}>
                {getIconByType('li-fail', { doFunction: handleClickToDelete, index })}
                {classNameStatus === 'fail' && size !== 'small' ? (
                  <span>图片上传失败请重试</span>
                ) : (
                  <img src={item.url} alt="" />
                )}
              </PictureView>
            ))}
          <PictureView
            size={size}
            disabled={disabled}
            innerRef={dropArea}
            status={multiple && classNameStatus === 'done' ? 'default' : classNameStatus}
            onClick={handleClickToUpload}
          >
            {!multiple && previewUrl ? (
              <img src={previewUrl} alt="" />
            ) : (
              getIconByType(`p-${classNameStatus === 'done' ? 'default' : classNameStatus}`)
            )}
            {classNameStatus === 'fail' && size !== 'small' ? (
              <span>图片上传失败请重试</span>
            ) : null}
          </PictureView>
        </React.Fragment>
      );
    }
    if (listType === 'area') {
      const { dropArea, handleClickToUpload } = this;
      const { disabled } = props;
      children = (
        <AreaView
          disabled={disabled}
          size={'bigger'}
          innerRef={dropArea}
          onClick={handleClickToUpload}
          dragIn={dragIn}
          classNameStatus={classNameStatus}
        >
          {classNameStatus === 'loading'
            ? getIconByType('area-' + classNameStatus)
            : getIconByType('uploadcloud')}
          {classNameStatus === 'loading' ? (
            <AreaText>文件上传中...</AreaText>
          ) : (
            <AreaText>
              请将文件拖到此处,或<AreaTextBlue disabled={disabled}>点击上传</AreaTextBlue>
            </AreaText>
          )}
        </AreaView>
      );
    }
    return children;
  }

  handleClickToUpload = () => {
    const { inputElement } = this.state;
    const { disabled } = this.props;
    if (disabled) return;
    inputElement.click();
  };
  handleClickToSubmit = () => {
    const { setAutoUploadState } = this.props;
    setAutoUploadState && setAutoUploadState(true);
  };
  handleClickToDelete = (index: number) => {
    const { setDeleteList } = this.props;
    setDeleteList && setDeleteList(index);
  };
}

export default GetElement;
