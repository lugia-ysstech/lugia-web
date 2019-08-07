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

export type CardType = 'simple' | 'avatar' | 'image' | 'combo' | 'tip';
export type ImageOrientation = 'horizontal' | 'vertical';
export type CardProps = {
  viewClass: string,
  description: React.Node,
  title: React.Node,
  image: React.Node,
  avatar: React.Node,
  content: React.Node,
  children?: React.Node,
  getTheme: Function,
  getThemeByDisplayName: Function,
  type: CardType,
  imageOrientation: ImageOrientation,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeConfig: Function,
};
export type CardState = {};

const paddingBottom = 12;
const paddingTop = 26;

export const getCardContainerSizeNumber = (props: Object) => {
  const { theme, imageOrientation, type } = props;
  const { width, height } = theme;

  let theWidth = 0;
  let theHeight = 0;
  if ((width && typeof width === 'number') || (height && typeof height === 'number')) {
    theWidth = width;
    theHeight = height;
    return { width: theWidth, height: theHeight };
  }

  switch (type) {
    case 'simple':
      theWidth = 350;
      theHeight = 130;
      break;
    case 'avatar':
      theWidth = imageOrientation === 'horizontal' ? 320 : 150;
      theHeight = imageOrientation === 'horizontal' ? 116 : 190;
      break;
    case 'image':
      theWidth = imageOrientation === 'horizontal' ? 320 : 200;
      theHeight = imageOrientation === 'horizontal' ? 112 : 230;
      break;
    case 'combo':
      theWidth = 200;
      theHeight = 220;
      break;
    default:
      break;
  }
  return { width: em(theWidth), height: em(theHeight) };
};

export const getCardContainerSize = (props: Object) => {
  const { imageOrientation, type, width, height } = props;

  let theWidth = 0;
  let theHeight = 0;
  if ((width && typeof width === 'number') || (height && typeof height === 'number')) {
    theWidth = width;
    theHeight = height;
  }
  switch (type) {
    case 'simple':
      theWidth = 350;
      theHeight = 130;
      break;
    case 'avatar':
      theWidth = imageOrientation === 'horizontal' ? 320 : 150;
      theHeight = imageOrientation === 'horizontal' ? 116 : 190;
      break;
    case 'image':
      theWidth = imageOrientation === 'horizontal' ? 320 : 200;
      theHeight = imageOrientation === 'horizontal' ? 112 : 230;
      break;
    case 'combo':
      theWidth = 200;
      theHeight = 220;
      break;
    default:
      break;
  }
  return `width: ${em(theWidth)}; height: ${em(theHeight)}`;
};

export const getCardContainerShadow = () => {
  const boxShadow = `box-shadow: 0 0 ${em(6)} rgba(0, 0, 50,0.1);`;
  return boxShadow;
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
export const getFontWeight = (props: Object) => {
  const { type } = props;
  const weight = type === 'tip' ? 700 : 500;
  return `font-weight:${weight}`;
};
export const getDescriptionColor = () => {
  return `color:${darkGreyColor};`;
};
export const getCardContainerBorder = () => {
  return `border:${em(1)} solid ${lightGreyColor};`;
};
export const getCardContainerBackground = (props: Object) => {
  const { theme } = props;
  const { backgroundColor } = theme;
  const theBackgroundColor = backgroundColor ? backgroundColor : defaultColor;
  return `background: ${theBackgroundColor};`;
};
export const getTipLineBackground = () => {
  return `background: ${themeColor};`;
};
export const getContentTextAlign = (props: Object) => {
  const { type, imageOrientation } = props;
  if (type === 'avatar' && imageOrientation === 'vertical') return 'text-align:center;';
  return `
  padding-bottom: ${em(paddingBottom)};
  padding-top: ${em(paddingTop)};`;
};

export const getContentPadding = (props: Object) => {
  return `padding-left: ${em(getContentPaddingLeft(props))};
  padding-right: ${em(getContentPaddingLeft(props))};`;
};

function getContentPaddingLeft(props: Object) {
  const { type, imageOrientation } = props;
  return type === 'tip'
    ? 30
    : (type === 'avatar' && imageOrientation === 'vertical') || type === 'combo'
    ? 0
    : 10;
}

export const getAvatarPadding = (props: Object) => {
  const { imageOrientation } = props;
  const left = imageOrientation === 'horizontal' ? em(20) : 0;
  return `padding: ${em(20)}  ${left};`;
};
