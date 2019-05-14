/**
 * Progress
 * create by guorg
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import { getWidth } from '../common/ThemeUtils';
import { px2emcss } from './units';
import Icon from '../icon';

type StatusType = 'success' | 'active' | 'error' | 'default';

export type ProgressProps = {
  type?: 'line' | 'circle' | 'dashboard',
  size?: 'default' | 'small',
  percent?: number,
  status?: StatusType,
  showInfo?: boolean,
  format?: Function,
  getTheme: Function,
  showType?: 'default' | 'inside',
};

export type ProgressState = {
  fixed: boolean,
};

type CSSProps = {
  type: 'line' | 'circle' | 'dashboard',
  percent: number,
  status: 'success' | 'active' | 'error',
  theme: Object,
  showInfo: boolean,
  inside: boolean,
  size: 'default' | 'small',
  showType: 'default' | 'inside',
};

const { themeColor, successColor, dangerColor, mediumGreyColor } = colorsFunc();
const FontSize = 1.4;
const isSmall = size => size === 'small';
export const getWrapFontSize = (props: Object) => {
  const { size } = props;
  if (isSmall(size)) {
    return 1.2;
  }
  return FontSize;
};
export const getEM = (props: Object) => {
  const { size } = props;
  if (isSmall(size)) {
    return px2emcss(1.2);
  }
  return px2emcss(FontSize);
};

export const handlePercent = (per: number) => {
  per = per - 0;
  per = per && !isNaN(per) ? per : 0;
  return Math.min(Math.max(per, 0), 100);
};

const bgColor = background => ({ background });
const BackgroundCSS = {
  success: {
    ...bgColor(successColor),
  },
  default: {
    ...bgColor(themeColor),
  },
  error: {
    ...bgColor(dangerColor),
  },
};

const getProgtrssWidth = (props: CSSProps) => {
  const { showInfo, showType } = props;
  const em = getEM(props);
  if (showInfo && showType === 'default') {
    return `width: calc(100% - ${em(30)});`;
  }

  return 'width: 100%;';
};

export const ProgressLine = styled.div`
  ${getProgtrssWidth};
  display: inline-block;
  background: #f5f5f5;
  border-radius: ${props => getEM(props)(50)};
`;

const getBackGroundWidth = (props: CSSProps) => {
  const { percent } = props;
  return `
    width: ${handlePercent(percent)}%;
  `;
};

const getStatusCSS = (props: CSSProps) => {
  const { status = 'default', theme, percent } = props;
  const { color } = theme;
  const defaultColor = color ? color : themeColor;
  const activeAnimate = keyframes`
    0% {
      opacity: 0.1;
      width: 0;
    }
    20% {
      opacity: 0.5;
      width: 0;
    }
    100% {
      opacity: 0;
      width: 100%;
    }
  `;

  if (status === 'active') {
    return css`
      &::before {
        content: '';
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 10px;
        animation: ${activeAnimate} 2.4s ease infinite;
      }

      background-color: ${handlePercent(percent) === 100 ? successColor : defaultColor};
    `;
  }

  if (handlePercent(percent) === 100) {
    if (status === 'error') {
      return `background-color: ${BackgroundCSS.error.background};`;
    }
    return `background-color: ${successColor};`;
  }

  const background = color ? color : BackgroundCSS[status].background;

  return `background-color: ${background};`;
};

const getBackgroundHeight = (props: CSSProps) => {
  const { size, theme, showType } = props;
  const { height } = theme;
  const em = getEM(props);
  if (height && typeof height === 'number') {
    return `height: ${em(height)};`;
  }
  if (showType === 'inside') {
    return `height: ${em(16)};`;
  }
  if (isSmall(size)) {
    return `height: ${em(6)};`;
  }
  return `height: ${em(8)};`;
};

export const ProgressBackground = styled.div`
  transition: all 0.3s;
  ${getBackGroundWidth};
  ${getStatusCSS};
  ${getBackgroundHeight};
  border-radius: ${props => getEM(props)(50)};
  position: relative;
  text-align: right;
`;

export const getTextColor = (props: CSSProps) => {
  const { status, percent = 0 } = props;
  if (status === 'error') {
    return `color: ${dangerColor};`;
  }
  if (status === 'success' || handlePercent(percent) === 100) {
    return `color: ${successColor};`;
  }

  return `color: ${mediumGreyColor};`;
};

export const CirleSvgTextFontSize = 2.4;

const getTextFont = (props: CSSProps) => {
  const { size, type } = props;
  const em = getEM(props);
  if (type === 'line' && isSmall(size)) {
    return `font-size: ${em(12)};`;
  }

  if (type === 'circle' || type === 'dashboard') {
    const em = px2emcss(CirleSvgTextFontSize);
    if (isSmall(size)) {
      return `font-size: ${em(26)};`;
    }
    return `font-size: ${em(40)};`;
  }
  return `font-size: ${em(14)};`;
};

export const ProgressText = styled.span`
  display: inline-block;
  ${getTextFont};
  width: ${props => getEM(props)(20)};
  ${getTextColor};
  text-align: left;
  margin-left: ${props => getEM(props)(10)};
  white-space: nowrap;
  word-break: normal;
  vertical-align: bottom;
`;

export const Icons: Object = styled(Icon)`
  cursor: default;
  vertical-align: text-bottom !important;
  ${getTextFont};
`;

const getMinWidth = (props: CSSProps) => {
  const { size, type } = props;
  const em = getEM(props);
  if (type === 'line') {
    const minWidth = isSmall(size) ? 56 : 60;

    return `min-width: ${em(minWidth)};`;
  }
};

export const Wrap = styled.div`
  font-size: ${getWrapFontSize}rem;
  ${getMinWidth};
  ${getWidth};
`;
export const InsideText = styled.span`
  display: inline-block;
  color: #fff;
  text-align: left;
  margin: 0 ${props => getEM(props)(6)};
  white-space: nowrap;
  word-break: normal;
  vertical-align: bottom;
`;
