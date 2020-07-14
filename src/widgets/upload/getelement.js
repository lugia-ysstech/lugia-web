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
import get from '../css/theme-common-dict';
import { getListIconType } from '../css/upload';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const padding = '$lugia-dict.@lugia/lugia-web.padding';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const xxlFontSize = '$lugia-dict.@lugia/lugia-web.xxlFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeFocusColor = '$lugia-dict.@lugia/lugia-web.themeFocusColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const lFontSize = '$lugia-dict.@lugia/lugia-web.lFontSize';
const mFontSize = '$lugia-dict.@lugia/lugia-web.mFontSize';
const descriptionFontSize = '$lugia-dict.@lugia/lugia-web.descriptionFontSize';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const Container = CSSComponent({
  tag: 'div',
  className: 'upload_Container',
  normal: {
    selectNames: [],
  },
  css: css`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  `,
});
const BothContainer = CSSComponent({
  tag: 'div',
  className: 'BothContainer',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow'], ['borderRadius'], ['color']],
  },
  disabled: {
    selectNames: [['border'], ['borderRadius'], ['cursor']],
  },
  css: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30px;
  `,
});
const bothButtonTheme = {
  borderRadius: getBorderRadius(0, ['tl', 'bl']),
};
const buttonHeightTheme = {
  height: 30,
};
const buttonFailColor = classNameStatus => {
  return {
    normal: {
      color: buttonStyle[classNameStatus],
    },
    hover: {
      color: buttonStyle[classNameStatus],
    },
    active: {
      color: buttonStyle[classNameStatus],
    },
    focus: {
      color: buttonStyle[classNameStatus],
    },
    disabled: {
      color: buttonStyle[classNameStatus],
    },
  };
};
const buttonStyle = {
  fail: dangerColor,
  done: themeFocusColor,
};
const getButtonStyle = (normalButtonTheme, classNameStatus) => {
  return {
    Container: {
      normal: { ...normalButtonTheme, background: { color: buttonStyle[classNameStatus] } },
      hover: { background: { color: buttonStyle[classNameStatus] } },
      active: { background: { color: buttonStyle[classNameStatus] } },
      focus: { background: { color: buttonStyle[classNameStatus] } },
      disabled: { background: { color: buttonStyle[classNameStatus] } },
    },
  };
};

const getDefaultStyle = status => {
  if (status === 'fail') {
    return {
      border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
      color: dangerColor,
      fontSize: descriptionFontSize,
    };
  } else if (status === 'loading') {
    return {
      border: getBorder({ width: 1, style: 'solid', color: themeColor }),
      color: blackColor,
    };
  } else if (status === 'done') {
    return {
      border: getBorder(get('focusBorder')),
      color: blackColor,
    };
  }
  return {};
};

const bottonThemeStyle = classNameStatus => ({
  border: getBorder({ width: 1, style: 'solid', color: buttonStyle[classNameStatus] }),
  background: { color: 'transparent' },
});
const getButtonFailBorder = (normalButtonTheme, classNameStatus) => {
  return {
    normal: {
      ...normalButtonTheme,
      ...bottonThemeStyle(classNameStatus),
    },
    hover: {
      ...bottonThemeStyle(classNameStatus),
    },
    active: {
      ...bottonThemeStyle(classNameStatus),
    },
    focus: {
      ...bottonThemeStyle(classNameStatus),
    },
    disabled: {
      ...bottonThemeStyle(classNameStatus),
    },
  };
};
const InputContent = CSSComponent({
  tag: 'div',
  className: 'UploadDefaultType',
  normal: {
    selectNames: [
      ['height'],
      ['width'],
      ['boxShadow'],
      ['borderRadius'],
      ['border'],
      ['color'],
      ['padding'],
      ['fontSize'],
      ['font'],
      ['opacity'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      return {
        color: lightGreyColor,
        border: getBorder(get('normalBorder')),
        padding: { top: 0, right: 0, bottom: 0, left: padding },
        fontSize: descriptionFontSize,
      };
    },
  },
  hover: {
    selectNames: [
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
      ['color'],
      ['padding'],
      ['fontSize'],
      ['font'],
      ['opacity'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      return {
        border: getBorder(get('hoverBorder')),
      };
    },
  },
  disabled: {
    selectNames: [
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['color'],
      ['padding'],
      ['fontSize'],
      ['font'],
      ['opacity'],
      ['cursor'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      background: { color: disableColor },
      color: disableTextColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      return {
        border: getBorder(get('disabledBorder')),
      };
    },
  },
  css: css`
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
  `,
  option: { hover: true, disabled: true },
});

const Ul = CSSComponent({
  tag: 'ul',
  className: 'upload_Ul',
  disabled: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    min-width: 100px;
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
    selectNames: [
      ['fontSize'],
      ['color'],
      ['borderRadius'],
      ['border'],
      ['font'],
      ['background'],
      ['font'],
    ],
    defaultTheme: {
      color: darkGreyColor,
      cursor: 'pointer',
    },
    getThemeMeta(themeMeta, themeProps) {
      return {
        fontSize: sFontSize,
        border: { bottom: { width: 1, style: 'dashed', color: get('borderColor') } },
      };
    },
  },
  hover: {
    selectNames: [['background']],
    getThemeMeta(themeMeta, themeProps) {
      return {
        background: { color: get('superLightColor') },
      };
    },
  },
  css: css`
    height: 36px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
    & > span {
      line-height: 36px;
    }
    &:hover {
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
    selectNames: [['fontSize'], ['color'], ['font']],
    defaultTheme: {
      color: darkGreyColor,
    },
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

const pictureStyle = {
  default: { color: darkGreyColor, borderColorStyle: borderColor },
  fail: { color: dangerColor, borderColorStyle: dangerColor },
  loading: { color: themeColor, borderColorStyle: themeColor },
  done: { color: darkGreyColor, borderColorStyle: mediumGreyColor },
};
const getFailStyle = status => {
  return {
    border: getBorder({ width: 1, style: 'dashed', color: pictureStyle[status].borderColorStyle }),
    color: pictureStyle[status].color,
  };
};
const PictureView = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [
      ['background'],
      ['width'],
      ['height'],
      ['opacity'],
      ['borderRadius'],
      ['border'],
      ['fontSize'],
      ['color'],
      ['font'],
      ['boxShadow'],
    ],
    getThemeMeta() {
      return {
        width: 80,
        height: 80,
        borderRadius: getBorderRadius(borderRadiusValue),
      };
    },
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['borderRadius'], ['border']],
    getThemeMeta() {
      return {
        border: getBorder({ width: 1, style: 'dashed', color: themeColor }),
      };
    },
  },
  disabled: {
    selectNames: [['background'], ['color'], ['borderRadius'], ['border']],
    defaultTheme: {
      cursor: 'not-allowed',
      background: {
        color: disableColor,
      },
      color: disableTextColor,
      border: getBorder({ width: 1, style: 'dashed', color: borderDisableColor }),
    },
  },
  css: css`
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
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['color'],
      ['border'],
      ['borderRadius'],
      ['font'],
      ['background'],
      ['boxShadow'],
      ['opacity'],
    ],
    defaultTheme: {
      width: '100%',
      height: 150,
      fontSize: xxlFontSize,
      color: dangerColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      return {
        borderRadius: getBorderRadius(borderRadiusValue),
      };
    },
  },
  hover: {
    selectNames: [['border']],
    getThemeMeta(themeMeta, themeProps) {
      return {
        border: getBorder({ width: 1, style: 'dashed', color: themeColor }),
      };
    },
  },
  disabled: {
    selectNames: [['color'], ['border'], ['background']],
    getThemeMeta(themeMeta, themeProps) {
      return {
        border: getBorder({ width: 1, style: 'dashed', color: borderDisableColor }),
        color: disableTextColor,
        cursor: 'not-allowed',
        background: {
          color: disableColor,
        },
      };
    },
  },
  option: { hover: true },
  css: css`
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
  `,
});

const AreaText = CSSComponent({
  tag: 'div',
  className: 'upload_AreaText',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: {
      color: darkGreyColor,
      fontSize: sectionFontSize,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  css: css`
    width: 100%;
    text-align: center;
    margin-top: 6px;
  `,
});

const AreaTextBlue = CSSComponent({
  tag: 'span',
  className: 'upload_AreaRemindText',
  normal: {
    selectNames: [['color'], ['border'], ['fontSize'], ['font']],
    getThemeMeta() {
      return {
        color: themeColor,
        border: { bottom: { width: 1, style: 'solid', color: themeColor } },
        fontSize: sectionFontSize,
      };
    },
  },
  hover: {
    selectNames: [['color'], ['border']],
    getThemeMeta() {
      return {
        color: themeHoverColor,
        border: { bottom: { width: 1, style: 'solid', color: themeHoverColor } },
      };
    },
  },
  disabled: {
    selectNames: [['color'], ['border'], ['cursor']],
    defaultTheme: {
      color: themeDisabledColor,
      border: { bottom: { width: 1, style: 'solid', color: themeDisabledColor } },
      cursor: 'not-allowed',
    },
  },
  option: {
    hover: true,
    disabled: true,
  },
  css: css`
    padding: 0 4px;
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
  'li-default': 'lugia-icon-financial_upload right',
  'li-fail': 'lugia-icon-reminder_close_circle right error',
  'li-delete': 'lugia-icon-reminder_close right delete',
  'li-loading': 'lugia-icon-financial_loading_o right loading',
};

export const getIconByType = (
  props: Object,
  status: ?string,
  info: ?Object = {}
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
              color: successColor,
              fontSize: sFontSize,
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
              color: dangerColor,
              fontSize: sFontSize,
            },
          },
        },
        failTheme
      );
      resultViewClass = failViewClass;
      break;
    default:
      const { viewClass: uploadViewClass, theme: uploadIcon } = props.getPartOfThemeHocProps(
        'UploadIcon'
      );
      resultTheme = uploadIcon;
      resultViewClass = uploadViewClass;
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
                right: ${get('padding')}px;
                top: 50%;
                transform: translate(0, -50%);
              }
              &.delete {
                display: none;
              }
              &.areaIcon {
                font-size: ${get('xxlFontSize')}px;
              }
              &.icon-mark {
                margin: 0 ${get('paddingToText')}px 0 0;
              }
              &.loading {
                animation: ${load} 0.8s linear infinite;
                margin: 0 ${get('padding')}px 0 0;
              }
            `;
          },
        },
        disabled: {
          cursor: 'not-allowed',
        },
      },
    },
    resultTheme
  );
  if (type === 1 && status !== 'loading') {
    const {
      defaultTips: { uploadText },
    } = props;
    return uploadText;
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
        fontSize: lFontSize,
      };
    case 'small':
      return {
        width: 60,
        height: 60,
        fontSize: mFontSize,
      };
    default:
      return {
        width: 80,
        height: 80,
        fontSize: lFontSize,
      };
  }
};

const getFileList = (
  data: Array<Object>,
  close: Function,
  themeProps: Object,
  props: Object,
  disabled?: boolean
) => {
  if (!data || data.length === 0) return;
  const liThemeProps = props.getPartOfThemeProps('UploadLiType');
  const { isShowProgress = true } = props;
  return (
    <Ul themeProps={themeProps} disabled={disabled}>
      {data.map((item, index) => {
        return (
          <Li status={item.status} themeProps={liThemeProps}>
            {getIconByType(props, getListIconType(item.name), item)}
            <span>{item.name}</span>
            {item.status !== 'loading' && getIconByType(props, 'li-' + item.status)}
            {getIconByType(props, 'li-delete', { doFunction: close, index })}
            {isShowProgress && getProgress(item, themeProps)}
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
  userDefine?: any,
  defaultTips: Object,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  getInputRef: Function,
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
      const { getInputRef } = this.props;
      getInputRef && getInputRef(element);
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
    const normalButtonTheme =
      areaType === 'both' ? bothButtonTheme : areaType === 'button' ? buttonHeightTheme : '';
    const uploadInputFail = props.getPartOfThemeProps('UploadInputFail');
    const uploadInputDone = props.getPartOfThemeProps('UploadInputDone');
    const uploadInputLoading = props.getPartOfThemeProps('UploadInputLoading');
    const uploadAfter =
      classNameStatus === 'fail'
        ? uploadInputFail
        : classNameStatus === 'done'
        ? uploadInputDone
        : classNameStatus === 'loading'
        ? uploadInputLoading
        : {};

    if (areaType === 'default') {
      const { handleClickToUpload } = this;
      const { defaultText, disabled } = props;
      const inputTheme = {
        themeConfig: {
          normal: {
            height: 30,
            borderRadius: getBorderRadius(borderRadiusValue),
            ...getDefaultStyle(classNameStatus),
          },
          hover: {
            ...getDefaultStyle(classNameStatus),
          },
        },
      };
      const uploadTheme = deepMerge(
        inputTheme,
        this.props.getPartOfThemeProps('Container', { props: { areaType } }),
        uploadAfter
      );
      children = (
        <InputContent
          themeProps={uploadTheme}
          disabled={disabled}
          status={classNameStatus}
          onClick={handleClickToUpload}
          ref={this.dropArea}
        >
          {getIconByType(props, classNameStatus)}
          {defaultText}
        </InputContent>
      );
    }
    const {
      defaultTips: { uploadText, uploadTips, failTips, loadingTips },
    } = props;
    const uploadIconTheme = props.getPartOfThemeHocProps('UploadIcon');
    if (areaType === 'both') {
      const { handleClickToSubmit, handleClickToUpload } = this;
      const { defaultText, showFileList, disabled } = this.props;
      const containerStyle = this.props.getPartOfThemeProps('Container');
      const uploadInputTheme = this.props.getPartOfThemeProps('UploadInputTheme');
      const uploadAfterTheme = deepMerge(uploadInputTheme, uploadAfter);
      const { viewClass: buttonViewClass, theme: buttonTheme } = props.getPartOfThemeHocProps(
        'UploadButtonType',
        { props: { areaType } }
      );
      const inputContentTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              height: '100%',
              borderRadius: getBorderRadius(borderRadiusValue, ['tl', 'bl']),
              ...getDefaultStyle(classNameStatus),
            },
            hover: {
              ...getDefaultStyle(classNameStatus),
            },
          },
        },
        uploadAfterTheme
      );
      const buttonThemeStyle =
        classNameStatus === 'fail' || classNameStatus === 'done'
          ? { ...getButtonStyle(normalButtonTheme, classNameStatus) }
          : {};

      const bothButtonWidth = deepMerge({ normal: { width: 100 } }, buttonTheme[buttonViewClass]);
      const themeType =
        classNameStatus === 'fail'
          ? 'UploadButtonFail'
          : classNameStatus === 'loading'
          ? 'UploadButtonLoading'
          : classNameStatus === 'done'
          ? 'UploadButtonDone'
          : classNameStatus === 'default'
          ? 'UploadButtonType'
          : {};
      const {
        viewClass: buttonViewClassType,
        theme: buttonThemeType,
      } = this.props.getPartOfThemeHocProps(themeType);
      const buttonMergeStyle = deepMerge(
        {
          Container: {
            normal: {
              width: bothButtonWidth.normal.width,
              height: '100%',
              borderRadius: getBorderRadius(0, ['tl', 'bl']),
            },
          },
        },
        buttonThemeStyle
      );
      const resultButtonTheme = deepMerge({
        [buttonViewClassType]: {
          ...buttonMergeStyle,
        },
      });
      const themeTypeMerge = deepMerge(resultButtonTheme, buttonThemeType);
      const newTheme = { viewClass: buttonViewClassType, theme: themeTypeMerge };
      children = (
        <React.Fragment>
          <BothContainer themeProps={containerStyle}>
            <InputContent
              themeProps={inputContentTheme}
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
            <Button
              {...newTheme}
              type={'primary'}
              disabled={disabled}
              onClick={handleClickToSubmit}
            >
              {getIconByType(props, classNameStatus, { type: 1 })}
            </Button>
          </BothContainer>
        </React.Fragment>
      );
    }
    if (areaType === 'button') {
      const { disabled } = props;
      const { handleClickToUpload } = this;
      const themeType =
        classNameStatus === 'fail'
          ? 'UploadButtonFail'
          : classNameStatus === 'loading'
          ? 'UploadButtonLoading'
          : classNameStatus === 'done'
          ? 'UploadButtonDone'
          : classNameStatus === 'default'
          ? 'Container'
          : {};
      const {
        viewClass: buttonViewClassType,
        theme: buttonThemeType,
      } = this.props.getPartOfThemeHocProps(themeType);
      const buttonBorderStatus =
        classNameStatus === 'fail' || classNameStatus === 'done'
          ? { ...getButtonFailBorder(normalButtonTheme, classNameStatus) }
          : {};
      const buttonTextStatus =
        classNameStatus === 'fail' || classNameStatus === 'done'
          ? { ...buttonFailColor(classNameStatus) }
          : {};
      const resultButtonTheme = deepMerge({
        [buttonViewClassType]: {
          Container: {
            normal: {
              height: 30,
            },
            ...buttonBorderStatus,
          },
          ButtonText: {
            ...buttonTextStatus,
          },
        },
      });
      const buttonMerge = deepMerge(resultButtonTheme, buttonThemeType);
      const newTheme = { viewClass: buttonViewClassType, theme: buttonMerge };

      children = (
        <Button
          {...newTheme}
          block
          type={'primary'}
          disabled={disabled}
          onClick={handleClickToUpload}
        >
          {classNameStatus === 'fail' ? failTips : uploadText}
        </Button>
      );
    }
    if (areaType === 'custom') {
      const { disabled, userDefine } = props;
      const { handleClickToUpload } = this;
      if (userDefine) {
        children = React.cloneElement(userDefine, { disabled, onClick: handleClickToUpload });
      }
    }
    const borderFailTheme =
      classNameStatus === 'fail'
        ? { border: getBorder({ width: 1, style: 'dashed', color: dangerColor }) }
        : {};
    const pictureAreaFail = this.props.getPartOfThemeProps('PictureAreaFail');
    const pictureAreaDone = this.props.getPartOfThemeProps('PictureAreaDone');
    const pictureAreaLoading = this.props.getPartOfThemeProps('PictureAreaLoading');
    const uploadAfterTheme =
      classNameStatus === 'fail'
        ? pictureAreaFail
        : classNameStatus === 'done'
        ? pictureAreaDone
        : classNameStatus === 'loading'
        ? pictureAreaLoading
        : {};
    if (areaType === 'picture') {
      const { size, disabled, fileListDone, multiple, previewUrl } = props;
      const { handleClickToUpload, handleClickToDelete, dropArea } = this;
      const pictureSizeFail = classNameStatus === 'fail' ? { fontSize: descriptionFontSize } : {};
      const pictureThemeProps = this.props.getPartOfThemeProps('Container');
      const pictureTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              ...getFailStyle(classNameStatus),
              ...getDefaultSize(size),
              ...pictureSizeFail,
            },
            hover: {
              ...borderFailTheme,
            },
          },
        },
        pictureThemeProps,
        uploadAfterTheme
      );

      children = (
        <React.Fragment>
          {classNameStatus === 'done' &&
            multiple &&
            fileListDone.map((item, index) => (
              <PictureView
                themeProps={pictureTheme}
                size={size}
                disabled={disabled}
                status={classNameStatus}
              >
                {getIconByType(props, 'li-fail', {
                  doFunction: handleClickToDelete,
                  index,
                })}
                {classNameStatus === 'fail' && size !== 'small' ? (
                  <span>{failTips}</span>
                ) : (
                  <img src={item.url} alt="" />
                )}
              </PictureView>
            ))}
          <PictureView
            themeProps={pictureTheme}
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
            {classNameStatus === 'fail' && size !== 'small' ? <span>{failTips}</span> : null}
          </PictureView>
        </React.Fragment>
      );
    }

    if (areaType === 'area') {
      const { dropArea, handleClickToUpload } = this;
      const { disabled } = props;
      const areaThemeProps = this.props.getPartOfThemeProps('Container');
      const uploadAreaText = this.props.getPartOfThemeProps('UploadAreaText');
      const { themeConfig: { normal: { color: textColor } = {} } = {} } = uploadAreaText;
      const areaTextBlue = deepMerge(
        {
          normal: {
            border: {
              bottom: { width: 1, style: 'solid', color: textColor },
            },
          },
        },
        uploadAreaText
      );
      const areaCloudFail = classNameStatus === 'fail' ? { color: darkGreyColor } : {};
      const areaTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              ...getFailStyle(classNameStatus),
              ...areaCloudFail,
            },
            hover: {
              ...borderFailTheme,
            },
          },
        },
        areaThemeProps,
        uploadAfterTheme
      );
      const areaTextFail =
        classNameStatus === 'fail' ? { fontSize: sectionFontSize, color: dangerColor } : {};
      const areaTextFailStyle = deepMerge(
        {
          themeConfig: {
            normal: {
              ...areaTextFail,
            },
          },
        },
        areaThemeProps
      );

      children = (
        <AreaView
          themeProps={areaTheme}
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
            <AreaText themeProps={uploadIconTheme}>{loadingTips}</AreaText>
          ) : classNameStatus === 'fail' ? (
            <AreaText themeProps={areaTextFailStyle} disabled={disabled}>
              {failTips}
            </AreaText>
          ) : (
            <AreaText themeProps={areaTextFailStyle} disabled={disabled}>
              {uploadTips},或
              <AreaTextBlue themeProps={areaTextBlue} disabled={disabled}>
                {uploadText}
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
