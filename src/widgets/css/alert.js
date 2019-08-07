/**
 * Layout
 * create by guorg
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { units } from '@lugia/css';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
import styled, { css, keyframes } from 'styled-components';
import Icon from '../icon';

const { px2remcss } = units;
export type Type = 'info' | 'success' | 'error' | 'warning';
export type AlertProps = {
  type?: Type,
  message: string,
  showIcon?: boolean,
  getTheme: Function,
  closeText?: string | React.ReactNode,
  closable?: boolean,
  description?: string | React.ReactNode,
  onClose?: Function,
  icon?: string,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};
export type AlertState = {
  visible: boolean,
  animateStart: boolean,
  height: number,
};
type CSSProps = {
  showIcon: boolean,
  type: Type,
  theme: Object,
  themeProps: Object,
  closable: boolean,
  textInProps: boolean,
  hasDect: boolean,
  visible: boolean,
  height: number,
  animateStart: boolean,
};

const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  mediumGreyColor,
  blackColor,
  darkGreyColor,
} = colorsFunc();
export const TypeCSS = {
  info: {
    color: themeColor,
    background: changeColor(themeColor, 0, 0, 20).rgba,
  },
  success: {
    color: successColor,
    background: changeColor(successColor, 0, 0, 20).rgba,
  },
  warning: {
    color: warningColor,
    background: changeColor(warningColor, 0, 0, 20).rgba,
  },
  error: {
    color: dangerColor,
    background: changeColor(dangerColor, 0, 0, 20).rgba,
  },
};

const getLineHeight = (props: CSSProps): number => {
  const { hasDect } = props;
  if (hasDect) {
    return 1.5;
  }
  return 1;
};
const getPadding = (props: CSSProps): string => {
  const { themeProps } = props;
  const { themeConfig } = themeProps;
  const { padding = { top: 12, bottom: 12, left: 10, right: 10 } } = themeConfig.normal;
  const { top, bottom, left, right } = padding;

  return `${top} ${right} ${bottom} ${left}`;
};
const getAlertAnimate = (props: CSSProps) => {
  const { height, animateStart } = props;
  const closeAnimate = keyframes`
    0% {
      padding: ${getPadding(props)};
      height: ${height}px;
    }

    50% {
      padding: 0;
      height: 0;
    }
    70% {
      padding: 0;
      height: 0;
    }
  `;
  if (animateStart) {
    return css`
      animation: ${closeAnimate} 0.5s;
    `;
  }
};

export const Alert = CSSComponent({
  tag: 'div',
  className: 'alert-wrap',
  css: css`
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    line-height: ${props => getLineHeight(props)};
    border-radius: ${px2remcss(4)};
    ${getAlertAnimate};
  `,
  normal: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [
      ['opacity'],
      ['margin'],
      ['padding'],
      ['width'],
      ['height'],
      ['background'],
      ['border', 'left'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { hasDect, showIcon } = propsConfig;
      let verticalPad = 12;
      let leftPad = 10;
      if (showIcon) {
        leftPad = hasDect ? 40 : 34;
      }
      if (hasDect) {
        verticalPad = 18;
      }

      return {
        padding: { top: verticalPad, bottom: verticalPad, left: leftPad, right: 10 },
      };
    },
  },
});

export const getPosition = (props: Object) => {
  const { hasDect } = props;

  return `top: ${hasDect ? px2remcss(20) : px2remcss(12)};left: ${px2remcss(10)}`;
};

export const CloseIcon: Object = styled(Icon)`
  color: ${mediumGreyColor};
`;

export const Message = CSSComponent({
  tag: 'span',
  className: 'alert-message',
  css: css`
    vertical-align: text-bottom;
  `,
  normal: {
    defaultTheme: { color: blackColor, font: { fontSize: 14 } },
    selectNames: [['color'], ['font']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { hasDect } = propsConfig;

      return {
        font: { size: hasDect ? 18 : 14 },
      };
    },
  },
});

const getCloseTop = (props: CSSProps): string => {
  const { hasDect } = props;
  if (hasDect) {
    return px2remcss(24);
  }
  return px2remcss(12);
};

export const CloseText = CSSComponent({
  tag: 'a',
  className: 'alert-close-text',
  css: css`
    overflow: hidden;
    position: absolute;
    top: ${props => getCloseTop(props)};
    right: ${px2remcss(14)};
  `,
  normal: {
    defaultTheme: { font: { size: 16 } },
    selectNames: [['color'], ['font']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { textInProps, type } = propsConfig;
      if (textInProps) {
        const typeCSSCplor = TypeCSS[type];
        const color = typeCSSCplor ? typeCSSCplor.color : TypeCSS.info.color;
        return {
          color,
        };
      }
    },
  },
});

export const Description = CSSComponent({
  tag: 'span',
  className: 'alert-description',
  css: css`
    display: block;
  `,
  normal: {
    defaultTheme: {
      color: darkGreyColor,
      font: { size: 14 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    selectNames: [['color'], ['font'], ['padding']],
  },
});
