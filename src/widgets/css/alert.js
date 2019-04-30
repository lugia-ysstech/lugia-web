/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
import type { ThemeType } from '@lugia/lugia-web';
import { createGetWidthOrHeight } from '../common/ThemeUtils';
import styled, { css } from 'styled-components';
import Icon from '../icon';

type Type = 'info' | 'success' | 'error' | 'warning';
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
  closable: boolean,
  textInProps: boolean,
  hasDect: boolean,
  visible: boolean,
  height: number,
  animateStart: boolean,
};

const FontSize = 1.4;
const em = px2emcss(FontSize);
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
  const { showIcon, type, theme } = props;
  const { color } = theme;
  if (!showIcon) {
    return `
      border-left: ${em(4)} solid ${color || TypeCSS[type].color};
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
  const { hasDect, showIcon } = props;
  let verticalPad = em(12);
  let leftPad = em(10);

  if (showIcon) {
    if (hasDect) {
      leftPad = em(40);
    } else {
      leftPad = em(34);
    }
  }
  if (hasDect) {
    verticalPad = em(18);
  }

  return `${verticalPad} ${em(10)} ${verticalPad} ${leftPad}`;
};
const getAlertAnimate = (props: CSSProps) => {
  const { height, animateStart } = props;
  const closeAnimate = css`
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
    return `
      animation: ${closeAnimate} .5s;
    `;
  }
};
export const Alert = styled.div`
  position: relative;
  box-sizing: border-box;
  font-size: ${FontSize}rem;
  overflow: hidden;
  padding: ${props => getPadding(props)};
  line-height: ${props => getLineHeight(props)};
  border-radius: ${em(4)};
  ${getAlertBorderCSS};
  ${getBackgroundCSS};
  ${getAlertAnimate};
  ${getWidth};
`;
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
  const Em = hasDect ? px2emcss(2) : em;

  return `top: ${hasDect ? Em(18) : Em(12)};left: ${Em(10)}`;
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
export const Message = styled.span`
  color: ${blackColor};
  vertical-align: text-bottom;
  ${getMessageCSS};
`;
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
export const Description = styled.span`
  display: block;
  color: ${darkGreyColor};
  font-size: ${em(14)};
`;
