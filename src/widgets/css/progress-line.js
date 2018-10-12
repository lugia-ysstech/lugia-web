/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import { getThemeColor, getWidth } from '../common/ThemeUtils';
import { px2emcss } from './units';
import Icon from '../icon';

const { themeColor, successColor, dangerColor, mediumGreyColor } = colorsFunc();
const FontSize = 1.4;
const em = px2emcss(FontSize);

export const handlePercent = (per: number) => {
  let percent = per;
  if (per > 100) {
    percent = 100;
  } else if (per < 0) {
    percent = 0;
  }
  return percent;
};

type StatusType = 'success' | 'active' | 'error' | 'default';
const BackgroundCSS = {
  success: {
    background: successColor,
  },
  default: {
    background: themeColor,
  },
  error: {
    background: dangerColor,
  },
};
const getEM = (size: 'default' | 'small') => {
  if (size === 'small') {
    return px2emcss(1.2);
  }
  return px2emcss(1.4);
};

export type ProgressProps = {
  type?: 'line' | 'circle' | 'dashboard',
  size?: 'default' | 'small',
  percent?: number,
  status?: StatusType,
  showInfo?: boolean,
  format?: Function,
  successPercent?: number,
  getTheme: Function,
  showType?: 'default' | 'inside',
};
export type ProgressState = {
  fixed: boolean,
};
type CSSProps = {
  percent: number,
  status: 'success' | 'active' | 'error',
  theme: Object,
  showInfo: boolean,
  inside: boolean,
  size: 'default' | 'small',
  showType: 'default' | 'inside',
};
const getProgtrssWidth = (props: CSSProps) => {
  const { showInfo, showType } = props;
  if (showInfo && showType === 'default') {
    return `width: calc(100% - ${em(30)});`;
  }

  return 'width: 100%;';
};
export const ProgressLine = styled.div`
  ${getProgtrssWidth};
  display: inline-block;
  background: #f5f5f5;
  border-radius: ${em(50)};
  font-size: ${FontSize}rem;
`;
const getBackGroundWidth = (props: CSSProps) => {
  let { percent } = props;
  percent = handlePercent(percent);
  return `
    width: ${percent}%;
  `;
};
const getStatusCSS = (props: CSSProps) => {
  const { status, theme, percent } = props;
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
    return `&::before{
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
            background-color: ${defaultColor};
            `;
  }
  const background = color
    ? color
    : percent >= 100
      ? successColor
      : BackgroundCSS[status].background;

  return `background-color: ${background};`;
};
const getBackgroundHeight = (props: CSSProps) => {
  const { size, theme, showType } = props;
  const { height } = theme;
  if (height && typeof height === 'number') {
    return `height: ${em(height)};`;
  }
  if (showType === 'inside') {
    return `height: ${em(16)};`;
  }
  if (size === 'small') {
    return `height: ${em(6)};`;
  }
  return `height: ${em(8)};`;
};
export const ProgressBackground = styled.div`
  transition: all 0.3s;
  ${getBackGroundWidth};
  ${getStatusCSS};
  ${getBackgroundHeight};
  border-radius: ${em(50)};
  position: relative;
  text-align: right;
`;
const getTextColor = (props: CSSProps) => {
  const { status } = props;
  if (status === 'success') {
    return `color: ${successColor};`;
  } else if (status === 'error') {
    return `color: ${dangerColor};`;
  }

  return `color: ${mediumGreyColor};`;
};
const getTextFont = (props: CSSProps) => {
  const { size } = props;
  if (size === 'small') {
    return 'font-size: 1.2rem;';
  }

  return `font-size: ${FontSize}rem;`;
};
export const ProgressText = styled.span`
  display: inline-block;
  ${getTextFont};
  width: ${props => getEM(props.size)(20)};
  ${getTextColor};
  text-align: left;
  margin-left: ${props => getEM(props.size)(10)};
  white-space: nowrap;
  word-break: normal;
  vertical-align: bottom;
`;

export const Icons = styled(Icon)`
  cursor: default;
  vertical-align: text-bottom !important;
  ${getTextFont};
`;

export const Wrap = styled.div`
  font-size: 1.2rem;
  ${getWidth};
`;
export const InsideText = styled.span`
  display: inline-block;
  color: #fff;
  text-align: left;
  font-size: 1.4rem;
  margin: 0 ${em(6)};
  white-space: nowrap;
  word-break: normal;
  vertical-align: bottom;
`;
