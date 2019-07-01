/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2remcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import { css, keyframes } from 'styled-components';
import type { ThemeType } from '@lugia/lugia-web';
import Icon from '../icon';
import CSSComponent, { getBorder, getBoxShadow, StaticComponent } from '@lugia/theme-css-hoc';

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
  footer?: string | React.ReactNode,
  maskClosable?: boolean,
  getTheme: Function,
  getPartOfThemeProps: Function,
  mask?: boolean,
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
  theme?: ThemeType,
};

const FontSize = 1.4;

const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  darkGreyColor,
} = colorsFunc();
export const IconInfo = {
  info: { class: 'lugia-icon-reminder_info_circle', color: themeColor },
  confirm: { class: 'lugia-icon-reminder_question_circle', color: warningColor },
  success: { class: 'lugia-icon-reminder_check_circle', color: successColor },
  error: { class: 'lugia-icon-reminder_close_circle', color: dangerColor },
  warning: { class: 'lugia-icon-reminder_exclamation_circle', color: warningColor },
};

export const Wrap = StaticComponent({
  tag: 'div',
  className: 'Wrap',
  css: css`
    display: ${props => (props.visible ? 'block' : 'none')};
    font-size: ${FontSize}rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
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

export const ModalMask = StaticComponent({
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
    z-index: 99999;
    ${getAnimate};
  `,
});

export const ModalWrap = StaticComponent({
  tag: 'div',
  className: 'ModalWrap',
  css: css`
    position: fixed;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 99999;
  `,
});

export const Modal = CSSComponent({
  tag: 'div',
  className: 'Modal',
  css: css`
    box-sizing: border-box;
    font-size: ${FontSize}rem;
    position: relative;
    top: ${px2remcss(100)};
    margin: 0 auto;
    z-index: 99999;
    ${getAnimate};
  `,
  normal: {
    selectNames: [['width']],
    defaultTheme: {
      width: 520,
    },
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
  `,
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['opacity'],
      ['boxShadow'],
      ['border'],
      ['background'],
      ['padding'],
    ],
    defaultTheme: {
      width: 520,
      background: { color: '#fff' },
      boxShadow: getBoxShadow(`0 ${px2remcss(4)} ${px2remcss(12)} rgba(0, 0, 0, 0.15)`),
      border: getBorder({ width: 0, style: 'solid', color: '#ccc' }, { radius: 4 }),
    },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { showIcon } = propsConfig;
      const defaultLeft = showIcon ? 50 : 30;

      return {
        padding: {
          top: 30,
          right: 30,
          bottom: 30,
          left: defaultLeft,
        },
      };
    },
  },
});

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
  `,
});

export const ModalTitle = CSSComponent({
  tag: 'div',
  className: 'ModalTitle',
  css: css`
    border-radius: ${px2remcss(4)} ${px2remcss(4)} 0 0;
  `,
  normal: {
    selectNames: [['font'], ['color'], ['padding']],
    defaultTheme: {
      font: { size: 18, weight: 500 },
      color: blackColor,
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
      color: darkGreyColor,
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
    border-radius: 0 0 4px 4px;
    & > button {
      margin-left: ${px2remcss(14)};
    }
    & > button:first-child {
      margin-left: 0;
    }
  `,
});

export const Icons = CSSComponent({
  className: 'ModalCloseIcon',
  extend: Icon,
  normal: {
    selectNames: [['color'], ['fontSize']],
    defaultTheme: {
      fontSize: 16,
    },
  },
});
const getIconColor = (props: CSSProps) => {
  const { iconType } = props;
  return `color: ${IconInfo[iconType].color};`;
};

export const BigIcons: Object = CSSComponent({
  className: 'ModalIcon',
  extend: Icon,
  normal: {
    selectNames: [['color'], ['fontSize']],
    defaultTheme: {
      fontSize: 20,
    },
  },
  css: css`
    position: absolute;
    left: ${px2remcss(22)};
    top: ${px2remcss(28)};
    ${getIconColor};
  `,
});
