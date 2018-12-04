import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
const {
  themeColor,
  lightGreyColor,
  defaultColor,
  darkGreyColor,
  blackColor,
  successColor,
  dangerColor,
  superLightColor,
} = colorsFunc();
export type TimeLineType = 'icon' | 'explain';
export type TimeLineMode = 'simple' | 'alternate';
export type TimeLineStatus = 'success' | 'failed' | 'normal';
const em = px2emcss(1.2);

export const getLineDisplay = props => {
  const { isLast } = props;
  const display = isLast ? 'none' : '';
  return `display:${display};`;
};
export const getContainerHeight = props => {
  const { theme, description, type } = props;
  const { height } = theme;
  const theHeight =
    height && height > 0 ? em(height) : type === 'explain' ? '' : description ? em(54) : em(42);
  return `height:${theHeight};`;
};
export const getLineHeight = props => {
  const { description, type, theme } = props;
  const { height } = theme;
  const theHeight =
    height && height > 0
      ? em(height)
      : type === 'explain'
        ? em(24)
        : description
          ? 'inherit'
          : '100%';
  return `height:${theHeight};`;
};

export const getDirection = props => {
  const { direction } = props;
  const theDirection = direction === 'left' ? 'right' : 'left';
  return `text-align: ${theDirection};${theDirection}:0; margin-${theDirection}: ${em(25)};`;
};
export const getDotBackground = props => {
  const { theme, type, status } = props;
  const { backgroundColor } = theme;
  const background = backgroundColor
    ? backgroundColor
    : type === 'explain'
      ? lightGreyColor
      : status === 'success'
        ? successColor
        : status === 'failed'
          ? dangerColor
          : themeColor;
  return `background: ${background};`;
};
export const getDotSize = props => {
  const { type } = props;
  const size = type === 'explain' ? em(6) : em(10);
  return `width: ${size};height: ${size};`;
};
export const getIconIndex = props => {
  const { pending } = props;
  const index = pending === true ? 1 : 3;
  return `z-index: ${index};`;
};
export const getDotLeft = props => {
  const { type } = props;
  const Left = type === 'explain' ? em(7.5) : em(5.5);
  return ` left: ${Left};`;
};
export const getIconBackground = () => {
  return `background: ${defaultColor};`;
};
export const getTimeColor = () => {
  return `color: ${blackColor};`;
};
export const getBorderColor = () => {
  return `${superLightColor};`;
};
export const getDescriptionColor = () => {
  return `color: ${darkGreyColor};`;
};
export const getHoverBackground = props => {
  const { theme, type } = props;
  const { backgroundColor } = theme;
  const background = backgroundColor ? backgroundColor : type === 'explain' ? themeColor : '';
  return `background:${background};`;
};
export const getKeyframes = props => {
  const { pending } = props;
  if (pending === true)
    return `animation: rotate 1s linear infinite;
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}`;
};
