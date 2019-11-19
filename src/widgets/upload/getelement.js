/*
 *create by LYQ
 *
 *2018-12-04
 *
 *@flow
 *
 */
import React from 'react';
import LoadIcon from '../icon';
import Progress from '../progress';
import Button from '../button';
import FileInput from './fileInput';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import CSSComponent, { css, keyframes } from '../theme/CSSProvider';
import { getBorderRadius, getBorder } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';

import { getListIconType } from '../css/upload';
import colorsFunc from '../css/stateColor';

const { themeColor } = colorsFunc();

const Container = CSSComponent({
  tag: 'div',
  className: 'upload_Container',
  normal: {
    selectNames: [],
  },
  css: css`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  `,
});

const InputContent = CSSComponent({
  tag: 'div',
  className: 'UploadDefaultType',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow'], ['borderRadius'], ['border']],
    defaultTheme: {
      borderRadius: getBorderRadius(4),
    },
    getThemeMeta(themeMeta, themeProps) {
      const {
        propsConfig: { areaType },
      } = themeProps;
      if (areaType === 'both') {
        return {
          borderRadius: {
            topLeft: 4,
            topRight: 0,
            bottomLeft: 4,
            bottomRight: 0,
          },
        };
      }
    },
  },
  disabled: {
    selectNames: [['border'], ['borderRadius'], ['cursor']],
    defaultTheme: {
      border: getBorder({ color: '#e8e8e8', width: 1, style: 'solid' }),
      cursor: 'not-allowed',
    },
  },
  css: css`
    width: 346px;
    height: 30px;
    border: 1px solid #9482ff;
    color: #ccc;
    padding: 0 0 0 10px;
    line-height: 30px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
  `,
});

const Ul = CSSComponent({
  tag: 'ul',
  className: 'upload_Ul',
  disabled: {
    selectNames: [],
  },
  css: css`
    min-width: 366px;
    padding: 6px 0 0;
    display: inline-block;
  `,
});

const ProgressCon = CSSComponent({
  tag: 'div',
  className: 'upload_ProgressContainer',
  css: css`
    margin-top: -10px;
  `,
});

const Li = CSSComponent({
  tag: 'li',
  className: 'UploadLiType',
  normal: {
    selectNames: [['fontSize'], ['color'], ['borderRadius'], ['border']],
  },
  hover: {
    selectNames: [['background'], ['color']],
    defaultTheme: {
      background: { color: '#f2f2f2' },
      cursor: 'pointer',
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
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
      & .right {
        display: none;
      }
      & .delete {
        display: block;
      }
    }
  `,
  option: { hover: true },
});

const PrevCon = CSSComponent({
  tag: 'div',
  className: 'upload_PrevBox',
  normal: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    position: relative;
    vertical-align: middle;
    &:hover {
      & > div {
        display: block;
      }
    }
  `,
});

const PrevImg = CSSComponent({
  tag: 'div',
  className: 'upload_PrevImgBox',
  normal: {
    selectNames: [],
  },
  css: css`
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
  `,
});

const Img = CSSComponent({
  tag: 'img',
  className: 'upload_PrevImg',
  normal: {
    selectNames: [],
  },
  css: css`
    width: 100%;
  `,
});

const Triangle = CSSComponent({
  tag: 'span',
  className: 'upload_Triangle',
  normal: {
    selectNames: [],
  },
  css: css`
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
  `,
});

const PictureView = CSSComponent({
  tag: 'div',
  className: 'UploadPictureType',
  normal: {
    selectNames: [['background'], ['width'], ['height'], ['opacity'], ['borderRadius'], ['border']],
    defaultTheme: {
      width: 80,
      height: 80,
    },
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['borderRadius'], ['border']],
  },
  disabled: {
    selectNames: [['background'], ['color'], ['borderRadius'], ['border']],
    defaultTheme: {
      cursor: 'not-allowed',
      background: {
        color: '#f2f2f2',
      },
    },
  },
  css: css`
    border: 1px dashed #999;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    position: relative;
    cursor: pointer;
    & img {
      width: 100%;
      max-height: 100%;
    }
  `,
  option: { hover: true },
});

const AreaView = CSSComponent({
  tag: 'div',
  className: 'UploadAreaType',
  normal: {
    selectNames: [['width'], ['height'], ['fontSize'], ['color']],
    defaultTheme: {
      width: 300,
      height: 150,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    border: 1px dashed #999;
    border-radius: 4px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    color: #999;
    text-align: center;
    &:hover {
      border: 1px dashed ${themeColor};
    }
  `,
});

const AreaText = CSSComponent({
  tag: 'div',
  className: 'upload_AreaText',
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: '#ccc',
    },
  },
  css: css`
    width: 100%;
    font-size: 14px;
    text-align: center;
    margin-top: 6px;
  `,
});

const AreaTextBlue = CSSComponent({
  tag: 'span',
  className: 'upload_AreaRemindText',
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: '#ccc',
      border: {
        bottom: {
          width: 0,
          style: 'solid',
          color: 'transparent',
        },
      },
      cursor: 'not-allowed',
    },
  },
  css: css`
    color: #684fff;
    padding: 0 4px;
    border-bottom: 1px solid #684fff;
    cursor: pointer;
  `,
});

const load = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const iconClassMap = {
  default: 'lugia-icon-financial_upload right',
  loading: 'lugia-icon-financial_loading_o loading',
  done: 'lugia-icon-financial_upload right',
  video: 'lugia-icon-financial_video_camera icon-mark ccc',
  file: 'lugia-icon-financial_folder icon-mark ccc',
  uploadcloud: 'lugia-icon-financial_upload_cloud areaIcon',
  'p-default': 'lugia-icon-reminder_plus',
  'p-fail': 'lugia-icon-financial_monitoring',
  'li-done': 'lugia-icon-reminder_check_circle right success',
  'li-fail': 'lugia-icon-reminder_close_circle right error',
  'li-delete': 'lugia-icon-reminder_close right delete',
  'li-loading': 'lugia-icon-financial_loading_o right loading',
};

export const getIconByType = (
  props: Object,
  status: ?string,
  info?: Object = {}
): ?Object | string => {
  if (!status) return null;
  const { type } = info;
  const { disabled } = props;
  let resultTheme;
  let resultViewClass;
  switch (status) {
    case 'li-done':
      const { viewClass: successViewClass, theme: successTheme } = props.getPartOfThemeHocProps(
        'UploadListSuccessIcon'
      );
      resultTheme = deepMerge(
        {
          [successViewClass]: {
            normal: {
              color: '#56c22d',
            },
          },
        },
        successTheme
      );
      resultViewClass = successViewClass;
      break;
    case 'li-fail':
      const { viewClass: failViewClass, theme: failTheme } = props.getPartOfThemeHocProps(
        'UploadListFailedIcon'
      );
      resultTheme = deepMerge(
        {
          [failViewClass]: {
            normal: {
              color: '#f22735',
            },
          },
        },
        failTheme
      );
      resultViewClass = failViewClass;
      break;
    default:
      resultTheme = {};
      resultViewClass = 'UploadDefaultIcon';
      break;
  }
  resultTheme = deepMerge(
    {
      [resultViewClass]: {
        normal: {
          getCSS: (themeMeta, themeProps) => {
            return css`
              display: inline-block;
              &.right {
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translate(0, -50%);
              }
              &.delete {
                display: none;
              }
              &.areaIcon {
                font-size: 30px;
              }
              &.icon-mark {
                margin: 0 4px 0 0;
              }
              &.loading {
                animation: ${load} 0.8s linear infinite;
              }
            `;
          },
        },
      },
    },
    resultTheme
  );
  console.log('resultTheme', resultTheme);
  if (type === 1 && status !== 'loading') {
    return '上传';
  }
  if (info && (status === 'li-fail' || status === 'li-delete')) {
    const { doFunction, index } = info;
    return (
      <LoadIcon
        singleTheme
        theme={resultTheme}
        viewClass={resultViewClass}
        iconClass={`${iconClassMap[status]} `}
        disabled={disabled}
        onClick={() => {
          doFunction(index);
        }}
      />
    );
  }
  if (status === 'picture') {
    const { themeProps } = props;
    return (
      <PrevCon themeProps={themeProps}>
        <LoadIcon
          singleTheme
          disabled={disabled}
          theme={resultTheme}
          viewClass={resultViewClass}
          iconClass="lugia-icon-financial_pic icon-mark ccc"
        />
        {getListIconType(info.name) === 'picture' && info.url ? (
          <PrevImg themeProps={themeProps}>
            <Img themeProps={themeProps} src={info.url} alt="lost" />{' '}
            <Triangle themeProps={themeProps} />
            <div>{info.url}</div>
          </PrevImg>
        ) : null}
      </PrevCon>
    );
  }
  if (status === 'area-loading') {
    return (
      <LoadIcon
        singleTheme
        disabled={disabled}
        theme={resultTheme}
        viewClass={resultViewClass}
        iconClass={iconClassMap.loading}
        active={true}
      />
    );
  }
  return (
    <LoadIcon
      singleTheme
      theme={resultTheme}
      viewClass={resultViewClass}
      disabled={disabled}
      iconClass={iconClassMap[status]}
    />
  );
};

const getProgress = (item: Object, themeProps: Object) => {
  const { status } = item;
  if (status === 'done') return;
  if (status === 'loading') {
    const { percent } = item;
    return (
      <ProgressCon themeProps={themeProps}>
        <Progress themeProps={themeProps} percent={percent} />
      </ProgressCon>
    );
  }
};

const getDefaultSize = (size: string) => {
  switch (size) {
    case 'large':
      return {
        width: 100,
        height: 100,
      };
    case 'small':
      return {
        width: 60,
        height: 60,
      };
    default:
      return {
        width: 80,
        height: 80,
      };
  }
};

const getFileList = (
  data: Array<Object>,
  close: Function,
  themeProps: Object,
  props: Object,
  disabled: boolean
) => {
  if (!data || data.length === 0) return;
  const liThemeProps = props.getPartOfThemeProps('UploadLiType');
  return (
    <Ul themeProps={themeProps} disabled={disabled}>
      {data.map((item, index) => {
        return (
          <Li status={item.status} themeProps={liThemeProps}>
            {getIconByType(props, getListIconType(item.name), item)}
            <span>{item.name}</span>
            {item.status !== 'loading' && getIconByType(props, 'li-' + item.status)}
            {getIconByType(props, 'li-delete', { doFunction: close, index })}
            {getProgress(item, themeProps)}
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
  setAutoUploadState: Function,
  setDeleteList: Function,
  areaType: string,
  previewUrl: string,
  size: string,
  inputId: string,
  accept: string,
  multiple: boolean,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
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
    if (!dragDrop) return;
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
    const { disabled } = this.props;
    dragDrop.addEventListener('drop', function(e: Object) {
      stopPropagation(e);
      if (disabled) {
        return;
      }
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
    if (!input) {
      return;
    }
    const element = input;
    if (element) {
      this.setState({
        inputElement: element,
      });
    }
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
    const { showFileList, fileListDone, themeProps, disabled } = this.props;
    const liThemeProps = this.props.getPartOfThemeProps('UploadLiType');
    return (
      <React.Fragment>
        <Container themeProps={themeProps}>{this.getElement()}</Container>
        {showFileList
          ? getFileList(fileListDone, this.handleClickToDelete, liThemeProps, this.props, disabled)
          : null}
      </React.Fragment>
    );
  }

  getElement = (): ?Object => {
    const { props } = this;
    const { areaType } = props;
    if (!areaType) return;
    const { state } = this;
    const { classNameStatus, dragIn } = state;
    const children = this.getChildren(areaType, props, classNameStatus, dragIn);
    const { inputId, disabled, accept, multiple } = props;
    let acceptType = accept;
    if (areaType === 'picture' && !accept) {
      acceptType = 'image/*';
    }
    const { getRegisterInput, getChangeInfo } = this;
    const themeProps = this.props.getPartOfThemeProps('UploadDefaultType', { props: { areaType } });
    return (
      <React.Fragment>
        <FileInput
          themeProps={themeProps}
          id={inputId}
          multiple={multiple}
          disabled={disabled}
          accept={acceptType}
          getChangeInfo={getChangeInfo}
          getRegisterInput={getRegisterInput}
        />
        {children}
      </React.Fragment>
    );
  };

  getChildren(areaType: string, props: DefProps, classNameStatus: string, dragIn: boolean) {
    let children;
    if (areaType === 'default') {
      const { handleClickToUpload } = this;
      const { defaultText, disabled } = props;
      const defaultThemeProps = this.props.getPartOfThemeProps('UploadDefaultType', {
        props: { areaType },
      });

      children = (
        <InputContent
          themeProps={defaultThemeProps}
          disabled={disabled}
          status={classNameStatus}
          onClick={handleClickToUpload}
          ref={this.dropArea}
        >
          {getIconByType(props, classNameStatus)} {defaultText}
        </InputContent>
      );
    }
    if (areaType === 'both') {
      const { handleClickToSubmit, handleClickToUpload } = this;
      const { defaultText, showFileList, disabled } = this.props;
      const defaultThemeProps = this.props.getPartOfThemeProps('UploadDefaultType', {
        props: { areaType },
      });
      const { viewClass: buttonViewClass, theme: buttonTheme } = props.getPartOfThemeHocProps(
        'UploadButtonType'
      );
      const resultButtonTheme = deepMerge(
        {
          [buttonViewClass]: {
            Container: {
              normal: {
                width: 60,
                height: 30,
                borderRadius: {
                  topLeft: 0,
                  topRight: 4,
                  bottomLeft: 0,
                  bottomRight: 4,
                },
              },
            },
          },
        },
        buttonTheme
      );

      const newTheme = { viewClass: buttonViewClass, theme: resultButtonTheme };

      children = (
        <React.Fragment>
          <InputContent
            themeProps={defaultThemeProps}
            status={classNameStatus}
            hasBtn="hasBtn"
            disabled={disabled}
            onClick={handleClickToUpload}
            ref={this.dropArea}
          >
            {defaultText}
            {showFileList
              ? null
              : classNameStatus === 'success' || classNameStatus === 'fail'
              ? getIconByType(props, 'li-' + classNameStatus)
              : null}
          </InputContent>
          <Button {...newTheme} type={'primary'} disabled={disabled} onClick={handleClickToSubmit}>
            {getIconByType(props, classNameStatus, { type: 1 })}
          </Button>
        </React.Fragment>
      );
    }
    if (areaType === 'button') {
      const { disabled } = props;
      const { handleClickToUpload } = this;
      const { viewClass: buttonViewClass, theme: buttonTheme } = props.getPartOfThemeHocProps(
        'UploadButtonType'
      );
      const resultButtonTheme = deepMerge(
        {
          [buttonViewClass]: {
            Container: {
              normal: {
                width: 100,
                height: 30,
                borderRadius: getBorderRadius(4),
              },
            },
          },
        },
        buttonTheme
      );

      const newTheme = { viewClass: buttonViewClass, theme: resultButtonTheme };
      children = (
        <Button {...newTheme} type={'primary'} disabled={disabled} onClick={handleClickToUpload}>
          点击上传
        </Button>
      );
    }
    if (areaType === 'custom') {
      const { disabled, userDefine } = props;
      const { handleClickToUpload } = this;
      children = React.cloneElement(userDefine, { disabled, onClick: handleClickToUpload });
    }
    if (areaType === 'picture') {
      const { size, disabled, fileListDone, multiple, previewUrl } = props;
      const { handleClickToUpload, handleClickToDelete, dropArea } = this;
      const pictureThemeProps = this.props.getPartOfThemeProps('UploadPictureType');
      const resultTheme = deepMerge(
        { themeConfig: { normal: getDefaultSize(size) } },
        pictureThemeProps
      );
      children = (
        <React.Fragment>
          {classNameStatus === 'done' &&
            multiple &&
            fileListDone.map((item, index) => (
              <PictureView
                themeProps={resultTheme}
                size={size}
                disabled={disabled}
                status={classNameStatus}
              >
                {getIconByType(props, 'li-fail', {
                  doFunction: handleClickToDelete,
                  index,
                })}
                {classNameStatus === 'fail' && size !== 'small' ? (
                  <span>图片上传失败请重试</span>
                ) : (
                  <img src={item.url} alt="" />
                )}
              </PictureView>
            ))}
          <PictureView
            themeProps={resultTheme}
            size={size}
            disabled={disabled}
            ref={dropArea}
            status={multiple && classNameStatus === 'done' ? 'default' : classNameStatus}
            onClick={handleClickToUpload}
          >
            {!multiple && previewUrl ? (
              <img src={previewUrl} alt="" />
            ) : (
              getIconByType(props, `p-${classNameStatus === 'done' ? 'default' : classNameStatus}`)
            )}
            {classNameStatus === 'fail' && size !== 'small' ? (
              <span>图片上传失败请重试</span>
            ) : null}
          </PictureView>
        </React.Fragment>
      );
    }
    if (areaType === 'area') {
      const { dropArea, handleClickToUpload } = this;
      const { disabled } = props;
      const themeProps = this.props.getPartOfThemeProps('UploadAreaType');

      children = (
        <AreaView
          themeProps={themeProps}
          disabled={disabled}
          onClick={handleClickToUpload}
          dragIn={dragIn}
          classNameStatus={classNameStatus}
          ref={dropArea}
        >
          {classNameStatus === 'loading'
            ? getIconByType(props, 'area-' + classNameStatus)
            : getIconByType(props, 'uploadcloud')}
          {classNameStatus === 'loading' ? (
            <AreaText themeProps={themeProps}>文件上传中...</AreaText>
          ) : (
            <AreaText themeProps={themeProps} disabled={disabled}>
              请将文件拖到此处,或
              <AreaTextBlue themeProps={themeProps} disabled={disabled}>
                点击上传
              </AreaTextBlue>
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
    if (disabled || !inputElement) return;

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
