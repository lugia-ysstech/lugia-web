/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2remcss } from '../css/units';
import { css, keyframes } from 'styled-components';
import type { ThemeType } from '@lugia/lugia-web';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';

import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';
import get from './theme-common-dict';

type IconType = 'confirm' | 'info' | 'success' | 'warning' | 'error';
type FunctionPropsType = {
  showIcon?: boolean,
  iconType?: IconType,
};
export type ModalProps = {
  title?: string | React.ReactNode,
  children: string | React.ReactNode,
  visible: boolean,
  cancelText?: string,
  okText?: string,
  onOk: Function,
  onCancel: Function,
  confirmLoading?: boolean,
  footer?: boolean | string | React.ReactNode,
  maskClosable?: boolean,
  getTheme: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  mask?: boolean,
  okButtonProps?: Object,
  cancelButtonProps?: Object,
  iconClass?: string,
  mountBody?: boolean,
} & FunctionPropsType;
export type ModalState = {
  visible: boolean,
  closing: boolean,
  opening: boolean,
};
type CSSProps = {
  showIcon: boolean,
  iconType: IconType,
  closing: boolean,
  opening: boolean,
  __lugiad__header__absolute__: boolean,
  type: string,
  theme?: ThemeType,
};

const FontSize = 1.4;

export const IconInfo = {
  info: {
    class: 'lugia-icon-reminder_info_circle',
    color: 'themeColor',
  },
  confirm: {
    class: 'lugia-icon-reminder_question_circle',
    color: 'warningColor',
  },
  success: {
    class: 'lugia-icon-reminder_check_circle',
    color: 'successColor',
  },
  error: {
    class: 'lugia-icon-reminder_close_circle',
    color: 'dangerColor',
  },
  warning: {
    class: 'lugia-icon-reminder_exclamation_circle',
    color: 'warningColor',
  },
};

export const Wrap = StaticComponent({
  tag: 'div',
  className: 'WrapModal',
  css: css`
    display: ${props => (props.visible ? 'block' : 'none')};
    font-size: ${FontSize}rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${props => (props.zIndex ? props.zIndex : '99999')};
  `,
});
const getAnimate = (props: CSSProps) => {
  const { closing, opening } = props;
  const OpenKeyframe = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
  const CloseKeyframe = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `;
  if (closing) {
    return css`
      animation: ${CloseKeyframe} 0.4s;
    `;
  }
  if (opening) {
    return css`
      animation: ${OpenKeyframe} 0.4s;
    `;
  }
};

export const ModalMask = CSSComponent({
  tag: 'div',
  className: 'ModalMask',
  css: css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: ${props => (props.zIndex ? props.zIndex : '99999')};
    ${getAnimate};
  `,
  normal: {
    selectNames: [['background']],
  },
});

export const ModalWrap = StaticComponent({
  tag: 'div',
  className: 'ModalWrap',
  css: css`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 150px;
    overflow: auto;
    z-index: ${props => (props.zIndex ? props.zIndex : '99999')};
  `,
});
export const Modal = CSSComponent({
  tag: 'div',
  className: 'Modal',
  css: css`
    display: inline-block;
    position: relative;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    font-size: ${FontSize}rem;
    outline: none;
    ${getAnimate};
  `,
  normal: {
    selectNames: [['width'], ['height'], ['minWidth'], ['maxWidth'], ['maxHeight'], ['minHeight']],
  },
});
export const ModalContent = CSSComponent({
  tag: 'div',
  className: 'ModalContent',
  css: css`
    position: relative;
    border: 0;
    border-radius: ${px2remcss(4)};
    box-shadow: 0 ${px2remcss(4)} ${px2remcss(12)} rgba(0, 0, 0, 0.15);
    min-width: ${px2remcss(520)};
  `,
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
      ['border'],
      ['background'],
      ['padding'],
      ['minWidth'],
      ['maxWidth'],
      ['maxHeight'],
      ['minHeight'],
    ],
    defaultTheme: {
      background: { color: '#fff' },
      boxShadow: getBoxShadow(`0 ${px2remcss(4)} ${px2remcss(12)} rgba(0, 0, 0, 0.15)`),
      border: getBorder({ width: 1, style: 'solid', color: '#ccc' }),
      borderRadius: getBorderRadius('$lugia-dict.@lugia/lugia-web.largeBorderRadiusValue'),
    },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { showIcon, __lugiad__header__absolute__ } = propsConfig;
      const defaultLeft = __lugiad__header__absolute__ ? 0 : showIcon ? 50 : 30;
      const megaPadding = __lugiad__header__absolute__ ? 0 : 30;
      return {
        padding: {
          top: megaPadding,
          right: megaPadding,
          bottom: megaPadding,
          left: defaultLeft,
        },
      };
    },
  },
});

const getLugiaMegaCloseCSS = (props: CSSProps): string => {
  const { __lugiad__header__absolute__ = false, type } = props;
  if (__lugiad__header__absolute__ || type === 'Modal') {
    return 'z-index:4001;';
  }
  return '';
};
export const ModalClose = StaticComponent({
  tag: 'div',
  className: 'ModalClose',
  css: css`
    position: absolute;
    right: 0;
    top: 0;
    width: ${px2remcss(64)};
    height: ${px2remcss(64)};
    cursor: pointer;
    text-align: center;
    line-height: ${px2remcss(64)};
    ${getLugiaMegaCloseCSS}
  `,
});

const getLugiaMegaCSS = (props: CSSProps): string => {
  const { __lugiad__header__absolute__ = false, type, title = false } = props;

  if (__lugiad__header__absolute__ || type === 'Modal') {
    const theCSS = title ? 'top: 30px;' : 'bottom: 30px;';

    return css`
      position: absolute;
      left: 30px;
      ${theCSS}
      z-index: 4000;
      padding-top: 0;
    `;
  }
  return '';
};

export const ModalTitle = CSSComponent({
  tag: 'div',
  className: 'ModalTitle',
  css: css`
    border-radius: ${px2remcss(4)} ${px2remcss(4)} 0 0;
    ${getLugiaMegaCSS}
  `,
  normal: {
    selectNames: [['font'], ['color'], ['padding'], ['margin']],
    defaultTheme: {
      font: { size: 16, weight: 500 },
      color: '$lugia-dict.@lugia/lugia-web.blackColor',
      padding: {
        top: 0,
        right: 0,
        bottom: 16,
        left: 0,
      },
    },
  },
});

export const ModalBody = CSSComponent({
  tag: 'div',
  className: 'ModalBody',
  css: css`
    word-wrap: break-word;
  `,
  normal: {
    selectNames: [['font'], ['color'], ['padding']],
    defaultTheme: {
      font: { size: 14 },
      color: '$lugia-dict.@lugia/lugia-web.darkGreyColor',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  },
});

export const ModalFooter = StaticComponent({
  tag: 'div',
  className: 'ModalFooter',
  css: css`
    padding-top: ${px2remcss(22)};
    ${getLugiaMegaCSS};
    border-radius: 0 0 4px 4px;
    & > button {
      margin-left: ${px2remcss(14)};
    }
    & > button:first-child {
      margin-left: 0;
    }
  `,
});

export const getIconColor = (props: Object) => {
  const { iconType } = props;
  const typeTheme = IconInfo[iconType] || IconInfo.info;

  return get(typeTheme.color);
};
