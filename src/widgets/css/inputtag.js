/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */

import { px2emcss } from './units';
import colorsFunc from './stateColor';
const em = px2emcss(1.2);

export const {
  themeColor,
  darkGreyColor,
  blackColor,
  mediumGreyColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
} = colorsFunc();

export const MarginTop = 4;
export const MarginRight = 4;
export const PaddingLeft = 10;
export const PadingRight = 20;
export const Height = 32;
export const SingleLineHeight = em(30);

export const ItemContainerBackgroundColor = '#f6f5ff';
