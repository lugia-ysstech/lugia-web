/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { ObjectUtils } from '@lugia/type-utils';
const { blackColor, darkGreyColor, lightGreyColor, defaultColor, themeColor } = colorsFunc();
const FontSize = 1.2;
const em = px2emcss(FontSize);

export type shadowType = 'always' | 'hover' | 'never';
export type CardType = 'simple' | 'avatar' | 'image' | 'combo' | 'tip';
export type ImageOrientation = 'horizontal' | 'vertical';
export type CardProps = {
  viewClass: string,
  description: React.Node,
  title: React.Node,
  operation: React.Node,
  image: React.Node,
  avatar: React.Node,
  content: React.Node,
  children?: React.Node,
  getTheme: Function,
  getThemeByDisplayName: Function,
  type: CardType,
  imageOrientation: ImageOrientation,
  shadow: shadowType,
};
export type CardState = {};

export const getCardContainerSize = (props: Object) => {
  const { theme, imageOrientation, type } = props;
  const { width, height } = theme;
  let theWidth = 0;
  let theHeight = 0;
  if ((width && typeof width === 'number') || (height && typeof height === 'number')) {
    theWidth = em(width);
    theHeight = em(height);
    return `width:${theWidth};height:${theHeight};`;
  }

  switch (type) {
    case 'simple':
      theWidth = em(350);
      theHeight = em(130);
      break;
    case 'avatar':
      theWidth = imageOrientation === 'horizontal' ? em(320) : em(150);
      theHeight = imageOrientation === 'horizontal' ? em(116) : em(190);
      break;
    case 'image':
      theWidth = imageOrientation === 'horizontal' ? em(320) : em(200);
      theHeight = imageOrientation === 'horizontal' ? em(112) : em(230);
      break;
    case 'combo':
      theWidth = em(200);
      theHeight = em(220);
      break;
    default:
      break;
  }
  return `width: ${theWidth};height:${theHeight};`;
};

export const getCardContainerShadow = (props: Object) => {
  const { shadow } = props;
  const boxShadow = `box-shadow: 0 0 ${em(6)} rgba(0, 0, 50,0.1);`;
  return shadow === 'always' ? `${boxShadow}` : shadow === 'hover' ? `&:hover {${boxShadow}};` : '';
};
export const getImageContainerSize = (props: Object) => {
  const { imageOrientation, size } = props;
  const { width, height } = size;
  const theWidth = ObjectUtils.isNumber(width)
    ? em(width)
    : imageOrientation === 'horizontal'
    ? em(120)
    : 'inherit';
  const theHeight = ObjectUtils.isNumber(height)
    ? em(height)
    : imageOrientation === 'horizontal'
    ? 'inherit'
    : em(112);
  return `width :${theWidth};height:${theHeight};`;
};

export const getImageContainerDisplay = (props: Object) => {
  const { type, imageOrientation } = props;
  if (type === 'image' || type === 'avatar') {
    const display = imageOrientation === 'horizontal' ? 'inline-block' : 'block';
    return `display :${display};`;
  }
};
export const getOutContainerDirection = (props: Object) => {
  const { imageOrientation } = props;
  const direction = imageOrientation === 'horizontal' ? 'row' : 'column';
  return `flex-direction: ${direction};`;
};
export const getTitleColor = () => {
  return `color:${blackColor};`;
};
export const getFontWeight = props => {
  const { type } = props;
  return type === 'tip' ? 'font-weight: 700;' : '500';
};
export const getDescripitionColor = () => {
  return `color:${darkGreyColor};`;
};
export const getCardContainerBorder = () => {
  return `border:${em(1)} solid ${lightGreyColor};`;
};
export const getCardContainerBackground = () => {
  return `background: ${defaultColor};`;
};
export const getTipLineBackground = () => {
  return `background: ${themeColor};`;
};
export const getContentTextAlign = (props: Object) => {
  const { type, imageOrientation } = props;
  if (type === 'avatar' && imageOrientation === 'vertical') return 'text-align:center;';
  return `
  margin-bottom: ${em(14)};
  margin-top: ${em(18)};`;
};
export const getContentMargin = (props: Object) => {
  const { type, imageOrientation } = props;
  const left =
    type === 'tip'
      ? '30'
      : (type === 'avatar' && imageOrientation === 'vertical') || type === 'combo'
      ? ''
      : '16';
  return `margin-left: ${em(left)}`;
};
export const getAvatarMargin = (props: Object) => {
  const { imageOrientation } = props;
  const left = imageOrientation === 'horizontal' ? em(20) : 0;
  return `margin: ${em(20)}  ${left};`;
};
