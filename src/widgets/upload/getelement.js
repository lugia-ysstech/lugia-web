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
const focusBorder = '$lugia-dict.@lugia/lugia-web.focusBorder';
const disabledBorder = '$lugia-dict.@lugia/lugia-web.disabledBorder';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const xxlFontSize = '$lugia-dict.@lugia/lugia-web.xxlFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeFocusColor = '$lugia-dict.@lugia/lugia-web.themeFocusColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const lFontSize = '$lugia-dict.@lugia/lugia-web.lFontSize';
const mFontSize = '$lugia-dict.@lugia/lugia-web.mFontSize';
const normalBorder = '$lugia-dict.@lugia/lugia-web.normalBorder';

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
const ContainerTheme = CSSComponent({
  tag: 'div',
  className: 'Container',
  css: css`
    display: flex;
    flex-direction: row;
    width: 346px;
    height: 30px;
  `,
});
const bothButtonTheme = {
  height: 30,
  borderRadius: getBorderRadius([4, 0], ['tr', 'br', 'tl', 'bl']),
};
const buttonTheme = {
  height: 30,
};
const buttonFailColor = {
  normal: {
    color: dangerColor,
  },
  hover: {
    color: dangerColor,
  },
  active: {
    color: dangerColor,
  },
  focus: {
    color: dangerColor,
  },
  disabled: {
    color: dangerColor,
  },
};
const buttonStyle = {
  fail: dangerColor,
  done: themeFocusColor,
};
const getButtonStyle = (normalButtonTheme, classNameStatus) => {
  return {
    normal: { ...normalButtonTheme, background: { color: buttonStyle[classNameStatus] } },
    hover: { background: { color: buttonStyle[classNameStatus] } },
    active: { background: { color: buttonStyle[classNameStatus] } },
    focus: { background: { color: buttonStyle[classNameStatus] } },
    disabled: { background: { color: buttonStyle[classNameStatus] } },
  };
};
const getDefaultStyle = {
  default: {
    border: getBorder(normalBorder),
  },
  fail: {
    border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
    color: dangerColor,
  },
  loading: {
    border: getBorder({ width: 1, style: 'solid', color: themeColor }),
    color: blackColor,
  },
  done: {
    border: getBorder(focusBorder),
    color: blackColor,
  },
};
const bottonTheme = {
  border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
  background: { color: 'transparent' },
};
const getButtonFailBorder = normalButtonTheme => {
  return {
    normal: {
      ...normalButtonTheme,
      ...bottonTheme,
    },
    hover: {
      ...bottonTheme,
    },
    active: {
      ...bottonTheme,
    },
    focus: {
      ...bottonTheme,
    },
    disabled: {
      ...bottonTheme,
    },
  };
};
const InputContent = CSSComponent({
  tag: 'div',
  className: 'UploadDefaultType',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow'], ['borderRadius'], ['border'], ['color']],
    getThemeMeta(themeMeta, themeProps) {
      const {
        propsConfig: { areaType },
      } = themeProps;
      if (areaType === 'both') {
        return {
          borderRadius: getBorderRadius(borderRadiusValue, ['tl', 'bl']),
        };
      }
    },
  },
  disabled: {
    selectNames: [['border'], ['borderRadius'], ['cursor']],
    defaultTheme: {
      border: getBorder(disabledBorder),
      cursor: 'not-allowed',
      background: { color: disableColor },
      color: disableTextColor,
    },
  },
  css: css`
    width: 100%;
    height: 30px;
    color: ${get('lightGreyColor')};
    padding: 0 0 0 ${get('padding')}px;
    line-height: 30px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
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
    selectNames: [['fontSize'], ['color'], ['borderRadius'], ['border']],
    defaultTheme: {
      color: darkGreyColor,
      cursor: 'pointer',
    },
  },
  css: css`
    height: 36px;
    border-bottom: 1px dashed #e8e8e8;
    position: relative;
    padding-left: 5px;
    font-size: 14px;
    & > span {
      line-height: 36px;
    }
    &:hover {
      background: ${get('disableColor')};
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
    selectNames: [['fontSize'], ['color']],
    defaultTheme: {
      fontSize: sFontSize,
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

const getPictureStyle = {
  fail: {
    border: getBorder({ width: 1, style: 'dashed', color: dangerColor }),
    color: dangerColor,
  },
  loading: {
    border: getBorder({ width: 1, style: 'dashed', color: themeColor }),
    color: themeColor,
  },
  done: {
    border: getBorder({ width: 1, style: 'dashed', color: mediumGreyColor }),
    color: darkGreyColor,
  },
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
    ],
    defaultTheme: {
      width: 80,
      height: 80,
      borderRadius: getBorderRadius(borderRadiusValue),
    },
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['borderRadius'], ['border']],
    defaultTheme: {
      border: getBorder({ width: 1, style: 'dashed', color: themeColor }),
    },
  },
  disabled: {
    selectNames: [['background'], ['color'], ['borderRadius'], ['border']],
    defaultTheme: {
      cursor: 'not-allowed',
      background: {
        color: disableColor,
      },
      color: darkGreyColor,
      border: getBorder({ width: 1, style: 'dashed', color: borderDisableColor }),
    },
  },
  css: css`
    border: 1px dashed ${get('mediumGreyColor')};
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
    ],
    defaultTheme: {
      color: darkGreyColor,
      width: 300,
      height: 150,
      fontSize: xxlFontSize,
      borderRadius: getBorderRadius(borderRadiusValue),
    },
  },
  disabled: {
    selectNames: [['color'], ['border'], ['background']],
    defaultTheme: {
      color: disableTextColor,
      cursor: 'not-allowed',
      border: getBorder({ width: 1, style: 'dashed', color: borderDisableColor }),
      background: {
        color: disableColor,
      },
    },
  },
  css: css`
    border: 1px dashed ${get('mediumGreyColor')};
    border-radius: ${get('borderRadiusValue')}px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    &:hover {
      border: 1px dashed ${get('themeColor')};
    }
  `,
});

const AreaText = CSSComponent({
  tag: 'div',
  className: 'upload_AreaText',
  normal: {
    selectNames: [['color']],
    defaultTheme: {
      color: darkGreyColor,
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
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeHoverColor,
      border: { bottom: { width: 1, style: 'solid', color: get('themeHoverColor ') } },
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeDisabledColor,
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
  option: {
    hover: true,
    disabled: true,
  },
  css: css`
    color: ${get('themeColor')};
    font-size: 14px;
    padding: 0 4px;
    border-bottom: 1px solid ${get('themeColor')};
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
                font-size: ${xxlFontSize}px;
              }
              &.icon-mark {
                margin: 0 ${get('paddingToText')}px 0 0;
              }
              &.loading {
                animation: ${load} 0.8s linear infinite;
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
      areaType === 'both' ? bothButtonTheme : areaType === 'button' ? buttonTheme : '';
    if (areaType === 'default') {
      const { handleClickToUpload } = this;
      const { defaultText, disabled } = props;
      const inputDefaultTheme = deepMerge(
        { themeConfig: { normal: { width: 346 } } },
        this.props.getPartOfThemeProps('Container', { props: { areaType } })
      );
      const inputTheme = {
        themeConfig: {
          normal: {
            borderRadius: getBorderRadius(borderRadiusValue),
            ...getDefaultStyle[classNameStatus],
          },
        },
      };
      const uploadTheme = deepMerge(inputTheme, inputDefaultTheme);
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
    if (areaType === 'both') {
      const { handleClickToSubmit, handleClickToUpload } = this;
      const { defaultText, showFileList, disabled } = this.props;
      const containerStyle = this.props.getPartOfThemeProps('Container');
      const { viewClass: buttonViewClass, theme: buttonTheme } = props.getPartOfThemeHocProps(
        'UploadButtonType',
        { props: { areaType } }
      );
      const inputBorderTheme = {
        themeConfig: {
          normal: {
            borderRadius: getBorderRadius(4, ['tl', 'bl']),
            ...getDefaultStyle[classNameStatus],
          },
        },
      };
      const inputStatusTheme = deepMerge(
        inputBorderTheme,
        this.props.getPartOfThemeProps('inputStyle', { props: { areaType } })
      );
      const buttonBothTheme = { ...getButtonStyle(normalButtonTheme, classNameStatus) };
      const buttonThemeStyle =
        classNameStatus === 'fail'
          ? buttonBothTheme
          : classNameStatus === 'done'
          ? buttonBothTheme
          : '';

      const resultButtonTheme = deepMerge(
        {
          [buttonViewClass]: {
            Container: {
              normal: {
                height: 30,
                borderRadius: getBorderRadius(0, ['tl', 'bl']),
              },
              ...buttonThemeStyle,
            },
          },
        },
        buttonTheme
      );
      const newTheme = { viewClass: buttonViewClass, theme: resultButtonTheme };
      children = (
        <React.Fragment>
          <ContainerTheme themeProps={containerStyle}>
            <InputContent
              themeProps={inputStatusTheme}
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
          </ContainerTheme>
        </React.Fragment>
      );
    }
    if (areaType === 'button') {
      const { disabled } = props;
      const { handleClickToUpload } = this;
      const { viewClass: buttonViewClass, theme: buttonTheme } = props.getPartOfThemeHocProps(
        'UploadButtonType'
      );
      const buttonColorStyle = classNameStatus === 'fail' ? buttonFailColor : {};
      const buttonStyleTheme =
        classNameStatus === 'fail' ? getButtonFailBorder(normalButtonTheme) : {};
      const resultButtonTheme = deepMerge(
        {
          [buttonViewClass]: {
            Container: {
              normal: {
                height: 30,
              },
              ...buttonStyleTheme,
            },
            ButtonText: {
              ...buttonColorStyle,
            },
          },
        },
        buttonTheme
      );
      const newTheme = { viewClass: buttonViewClass, theme: resultButtonTheme };
      children = (
        <Button {...newTheme} type={'primary'} disabled={disabled} onClick={handleClickToUpload}>
          {classNameStatus === 'fail' ? '上传失败' : uploadText}
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
    if (areaType === 'picture') {
      const { size, disabled, fileListDone, multiple, previewUrl } = props;
      const { handleClickToUpload, handleClickToDelete, dropArea } = this;
      const sizeFailTheme = classNameStatus === 'fail' ? { fontSize: 12, color: 'red' } : {};
      const pictureThemeProps = this.props.getPartOfThemeProps('Container');
      const resultTheme = deepMerge(
        {
          themeConfig: {
            normal: { ...getDefaultSize(size), ...sizeFailTheme },
          },
        },
        pictureThemeProps
      );
      const pictureTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              ...getPictureStyle[classNameStatus],
            },
            hover: {
              ...getPictureStyle[classNameStatus],
            },
          },
        },
        resultTheme
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
      const pictureTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              ...getPictureStyle[classNameStatus],
            },
            hover: {
              ...getPictureStyle[classNameStatus],
            },
          },
        },
        areaThemeProps
      );
      children = (
        <AreaView
          themeProps={pictureTheme}
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
            <AreaText themeProps={pictureTheme}>{loadingTips}</AreaText>
          ) : classNameStatus === 'fail' ? (
            <AreaText themeProps={pictureTheme} disabled={disabled}>
              {failTips}
            </AreaText>
          ) : (
            <AreaText themeProps={pictureTheme} disabled={disabled}>
              {uploadTips},或
              <AreaTextBlue themeProps={pictureTheme} disabled={disabled}>
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
