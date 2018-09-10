import colorsFunc from '../css/stateColor';
import { px2emcss } from './units';
export const { themeColor, mediumGreyColor, darkGreyColor, blackColor } = colorsFunc();
const em = px2emcss(1.2);

export const DefaultColor = mediumGreyColor;
export const HoverDefaultColor = blackColor;
export const FontWeight = 500;
export const FontSize = em(14);
export const separatorMarginLeft = em(10);
export const separatorMarginRight = em(10);
