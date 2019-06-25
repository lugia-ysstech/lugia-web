/**
 * Layout
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent, getBorder } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
import type { ThemeType } from '@lugia/lugia-web';
import { createGetWidthOrHeight } from '../common/ThemeUtils';
import styled, { css, keyframes } from 'styled-components';
import Icon from '../icon';

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

const FontSize = 1.4;
const em = px2remcss;
const getWidth = createGetWidthOrHeight('width', { fontSize: FontSize });
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  mediumGreyColor,
  blackColor,
  darkGreyColor,
} = colorsFunc();
const TypeCSS = {
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

const getAlertBorderCSS = (props: CSSProps) => {
  const { showIcon, type } = props;
  if (!showIcon) {
    return `
      border-left: ${em(4)} solid ${TypeCSS[type].color};
    `;
  }
};
const getColor = (type: Type, target: 'color' | 'background') => {
  return `
    ${target}: ${TypeCSS[type][target]};
  `;
};
const getBackgroundCSS = (props: CSSProps) => {
  const { type, theme } = props;
  const { color } = theme;
  if (color) {
    return `
      background: ${changeColor(color, 0, 0, 20).rgba};
    `;
  }

  return getColor(type, 'background');
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
    font-size: ${FontSize}rem;
    overflow: hidden;
    line-height: ${props => getLineHeight(props)};
    border-radius: ${em(4)};
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
      ['border'],
      ['boxShadow'],
    ],
  },
});
const getIconColor = (props: CSSProps) => {
  const { type, theme } = props;
  const { color } = theme;
  if (color) {
    return `
      color: ${color};
    `;
  }

  return getColor(type, 'color');
};
const getIconFont = (props: CSSProps) => {
  const { hasDect } = props;
  if (hasDect) {
    return `font-size: ${em(20)};`;
  }
};
const getPosition = (props: CSSProps) => {
  const { hasDect } = props;

  return `top: ${hasDect ? em(18) : em(12)};left: ${em(10)}`;
};
export const Icons: Object = styled(Icon)`
  ${getIconColor};
  ${getIconFont};
  ${getPosition}
  position: absolute;
`;
export const CloseIcon: Object = styled(Icon)`
  font-size: ${em(16)};
  color: ${mediumGreyColor};
`;
const getMessageCSS = (props: CSSProps) => {
  const { hasDect } = props;

  if (hasDect) {
    return `
    font-size: ${em(18)};
  `;
  }

  return `
    font-size: ${em(14)};
  `;
};

export const Message = CSSComponent({
  tag: 'span',
  className: 'alert-wrap',
  css: css`
    vertical-align: text-bottom;
  `,
  normal: {
    defaultTheme: { color: blackColor, font: { fontSize: 14 } },
    selectNames: [['color'], ['font']],
  },
});
const getCloseTextColor = (props: CSSProps) => {
  const { textInProps, type, theme } = props;
  const { color } = theme;
  if (textInProps) {
    if (color) {
      return `
      color: ${color};
    `;
    }
    return `
      color: ${TypeCSS[type].color};
    `;
  }
};
const getCloseTop = (props: CSSProps): string => {
  const { hasDect } = props;
  if (hasDect) {
    return em(24);
  }
  return em(14);
};
export const CloseText = styled.a`
  overflow: hidden;
  position: absolute;
  top: ${props => getCloseTop(props)};
  right: ${em(14)};
  ${getCloseTextColor};
`;

export const Description = CSSComponent({
  tag: 'span',
  className: 'alert-wrap',
  css: css`
    display: block;
  `,
  normal: {
    defaultTheme: {
      color: darkGreyColor,
      font: { fontSize: 14 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    selectNames: [['color'], ['font'], ['padding']],
  },
});
