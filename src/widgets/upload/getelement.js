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
import Progress from '../progress';
import FileInput from './fileInput';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import CSSComponent, { css, getBorder } from '../theme/CSSProvider';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';

import { findDOMNode } from 'react-dom';

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

const InputContent = ThemeHoc(
  CSSComponent({
    tag: 'div',
    className: 'upload_InputContent',
    normal: {
      selectNames: [['width'], ['height'], ['boxShadow'], ['border']],
    },
    disabled: {
      selectNames: [['border'], ['cursor']],
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
  }),
  'InputContent',
  { hover: true, actived: false }
);

const Ul = ThemeHoc(
  CSSComponent({
    tag: 'ul',
    className: 'upload_Ul',
    css: css`
      min-width: 366px;
      padding: 6px 0 0;
      display: inline-block;
    `,
  }),
  'Ul',
  { hover: true, actived: false }
);

const ProgressCon = CSSComponent({
  tag: 'div',
  className: 'upload_ProgressContainer',
  css: css`
    margin-top: -10px;
  `,
});

const Li = CSSComponent({
  tag: 'li',
  className: 'upload_List',
  hover: {
    selectNames: [['backgroundColor'], ['cursor']],
    defaultTheme: {
      backgroundColor: '#f2f2f2',
      cursor: 'pointer',
    },
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
});

const Button = ThemeHoc(
  CSSComponent({
    tag: 'span',
    className: 'uploadButtonType',
    normal: {
      selectNames: [['background'], ['width'], ['height'], ['boxShadow'], ['border'], ['opacity']],
    },
    hover: {
      selectNames: [['background'], ['boxShadow'], ['border'], ['opacity']],
    },
    disabled: {
      selectNames: [['background'], ['border']],
      defaultTheme: {
        cursor: 'not-allowed',
      },
    },
    css: css`
      width: 60px;
      height: 30px;
      background-color: ${themeColor};
      display: inline-block;
      border-radius: 0 4px 4px 0;
      float: right;
      text-align: center;
      color: #fff;
      line-height: 30px;
      cursor: pointer;
    `,
  }),
  'Button',
  { hover: true, actived: false }
);

const PrevCon = CSSComponent({
  tag: 'div',
  className: 'upload_PrevBox',
  normal: {
    selectNames: [],
  },
  css: css`
    width: 15px;
    height: 15px;
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

const PictureView = ThemeHoc(
  CSSComponent({
    tag: 'div',
    className: 'upload_PictureView',
    normal: {
      selectNames: [['width'], ['height'], ['opacity'], ['border']],
      defaultTheme: {
        width: 80,
        height: 80,
      },
    },
    hover: {
      selectNames: [['background'], ['opacity'], ['border']],
    },
    disabled: {
      selectNames: [['background'], ['color'], ['cursor'], ['border']],
      defaultTheme: {
        cursor: 'not-allowed',
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
  }),
  'PictureView',
  { hover: false, actived: false }
);

const AreaView = CSSComponent({
  tag: 'div',
  className: 'upload_AreaView',
  normal: {
    selectNames: [['width'], ['height'], ['fontSize']],
  },
  disabled: {
    selectNames: [['cursor']],
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
    selectNames: [],
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

const LoadIcon = CSSComponent({
  extend: Icon,
  className: 'upload_LoadIcon',
  normal: {
    selectNames: [['fontSize']],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: 'red',
    },
  },
  css: css`
    color: #666;
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
    &.success {
      color: #56c22d;
    }
    &.error {
      color: #f22735;
    }
    &.icon-mark {
      margin: 0 4px 0 0;
    }
  `,
});

const iconClassMap = {
  default: 'lugia-icon-financial_upload right',
  loading: 'lugia-icon-financial_loading_o loadIcon',
  done: 'lugia-icon-financial_upload right',
  video: 'lugia-icon-financial_video_camera icon-mark ccc',
  file: 'lugia-icon-financial_folder icon-mark ccc',
  uploadcloud: 'lugia-icon-financial_upload_cloud areaIcon',
  'p-default': 'lugia-icon-reminder_plus',
  'p-fail': 'lugia-icon-financial_monitoring',
  'li-done': 'lugia-icon-reminder_check_circle right success',
  'li-fail': 'lugia-icon-reminder_close_circle right error',
  'li-delete': 'lugia-icon-reminder_close right delete',
  'li-loading': 'lugia-icon-financial_loading_o right loadIcon',
};

export const getIconByType = (
  props: Object,
  themeProps: Object,
  status: ?string,
  info?: Object = {}
): ?Object | string => {
  if (!status) return null;
  const { type } = info;
  const { disabled } = props;
  if (type === 1 && status !== 'loading') {
    return '上传';
  }
  if (info && (status === 'li-fail' || status === 'li-delete')) {
    const { doFunction, index } = info;
    return (
      <LoadIcon
        themeProps={themeProps}
        iconClass={`${iconClassMap[status]} `}
        disabled={disabled}
        onClick={() => {
          doFunction(index);
        }}
      />
    );
  }
  if (status === 'picture') {
    return (
      <PrevCon themeProps={themeProps}>
        <LoadIcon
          disabled={disabled}
          themeProps={themeProps}
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
        disabled={disabled}
        themeProps={themeProps}
        iconClass={iconClassMap.loading}
        active={true}
      />
    );
  }
  return <LoadIcon disabled={disabled} themeProps={themeProps} iconClass={iconClassMap[status]} />;
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

const getFileList = (data: Array<Object>, close: Function, themeProps: Object, props: Object) => {
  if (!data || data.length === 0) return;
  return (
    <Ul themeProps={themeProps}>
      {data.map((item, index) => {
        return (
          <Li status={item.status} themeProps={themeProps}>
            {getIconByType(props, themeProps, getListIconType(item.name), item)}
            <span>{item.name}</span>
            {getIconByType(props, themeProps, 'li-' + item.status)}
            {getIconByType(props, themeProps, 'li-delete', { doFunction: close, index })}
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
  getTheme: Function,
  setAutoUploadState: Function,
  setDeleteList: Function,
  listType: string,
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

    const dragDrop = findDOMNode(dropArea.current);
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
    const element = findDOMNode(input.current).querySelector('input');
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
    const { showFileList, fileListDone, themeProps } = this.props;
    return (
      <React.Fragment>
        <Container themeProps={themeProps}>{this.getElement()}</Container>
        {showFileList
          ? getFileList(fileListDone, this.handleClickToDelete, themeProps, this.props)
          : null}
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
    const themeProps = this.props.getPartOfThemeProps('uploadDefaultType');
    return (
      <React.Fragment>
        <FileInput
          themeProps={themeProps}
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
      const { handleClickToUpload } = this;
      const { defaultText, disabled } = props;
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('uploadDefaultType');
      const themeProps = this.props.getPartOfThemeProps('uploadDefaultType');

      children = (
        <InputContent
          theme={theme}
          viewClass={viewClass}
          disabled={disabled}
          status={classNameStatus}
          onClick={handleClickToUpload}
          ref={this.dropArea}
        >
          {getIconByType(props, themeProps, classNameStatus)} {defaultText}
        </InputContent>
      );
    }
    if (listType === 'both') {
      const { handleClickToSubmit, handleClickToUpload } = this;
      const { defaultText, showFileList, disabled } = this.props;
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('uploadButtonType');
      const themeProps = this.props.getPartOfThemeProps('uploadButtonType');
      const {
        viewClass: InputContentViewClass,
        theme: InputContentTheme,
      } = this.props.getPartOfThemeHocProps('uploadDefaultType');
      children = (
        <React.Fragment>
          <InputContent
            theme={InputContentTheme}
            viewClass={InputContentViewClass}
            status={classNameStatus}
            hasBtn="hasBtn"
            onClick={handleClickToUpload}
            ref={this.dropArea}
          >
            {defaultText}
            {showFileList ? null : getIconByType(props, themeProps, 'li-' + classNameStatus)}
          </InputContent>
          <Button
            theme={theme}
            viewClass={viewClass}
            disabled={disabled}
            onClick={handleClickToSubmit}
          >
            {getIconByType(props, themeProps, classNameStatus, { type: 1 })}
          </Button>
        </React.Fragment>
      );
    }
    if (listType === 'button') {
      const { disabled } = props;
      const { handleClickToUpload } = this;
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('uploadButtonType');
      children = (
        <Button
          theme={theme}
          viewClass={viewClass}
          disabled={disabled}
          listType={listType}
          onClick={handleClickToUpload}
        >
          点击上传
        </Button>
      );
    }
    if (listType === 'picture') {
      const { size, disabled, fileListDone, multiple, previewUrl } = props;
      const { handleClickToUpload, handleClickToDelete, dropArea } = this;
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('uploadPictureType');
      const themeProps = this.props.getPartOfThemeProps('uploadPictureType');
      const resultTheme = deepMerge({ [viewClass]: { normal: getDefaultSize(size) } }, theme);
      children = (
        <React.Fragment>
          {classNameStatus === 'done' &&
            multiple &&
            fileListDone.map((item, index) => (
              <PictureView
                theme={resultTheme}
                viewClass={viewClass}
                size={size}
                disabled={disabled}
                status={classNameStatus}
              >
                {getIconByType(props, themeProps, 'li-fail', {
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
            theme={resultTheme}
            viewClass={viewClass}
            size={size}
            disabled={disabled}
            ref={dropArea}
            status={multiple && classNameStatus === 'done' ? 'default' : classNameStatus}
            onClick={handleClickToUpload}
          >
            {!multiple && previewUrl ? (
              <img src={previewUrl} alt="" />
            ) : (
              getIconByType(
                props,
                themeProps,
                `p-${classNameStatus === 'done' ? 'default' : classNameStatus}`
              )
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
      const themeProps = this.props.getPartOfThemeProps('uploadAreaType');
      children = (
        <AreaView
          themeProps={themeProps}
          disabled={disabled}
          size={'bigger'}
          ref={dropArea}
          onClick={handleClickToUpload}
          dragIn={dragIn}
          classNameStatus={classNameStatus}
        >
          {classNameStatus === 'loading'
            ? getIconByType(props, themeProps, 'area-' + classNameStatus)
            : getIconByType(props, themeProps, 'uploadcloud')}
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
