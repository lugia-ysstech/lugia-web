/**
 * Button Theme
 * create by guorg
 * @flow
 */
import { getBorder, getBorderRadius } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import changeColor from '../css/utilsColor';

const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  lightGreyColor,
  darkGreyColor,
  defaultColor,
  hoverColor,
  spiritColor,
  mouseDownColor,
} = colorsFunc();

const bgReduceA = 5;
const borderReduceS = 45;
const defaultColors = changeColor('#333', borderReduceS).color;
const primaryColors = changeColor(themeColor, borderReduceS).color;
const successColors = changeColor(successColor, borderReduceS).color;
const warningColors = changeColor(warningColor, borderReduceS).color;
const dangerColors = changeColor(dangerColor, borderReduceS).color;

export const defaultTheme = {
  color: darkGreyColor,
  border: getBorder({ width: 1, style: 'solid', color: lightGreyColor }),
  background: { color: defaultColor },
};
export const defaultHoverTheme = {
  color: hoverColor,
  border: getBorder({ width: 1, style: 'solid', color: hoverColor }),
  background: { color: spiritColor },
};
export const defaultActiveTheme = {
  color: mouseDownColor,
  border: getBorder({ width: 1, style: 'solid', color: mouseDownColor }),
  background: { color: spiritColor },
};

export const TypeTheme = {
  default: defaultTheme,
  primary: {
    color: defaultColor,
    border: 'none',
    background: { color: themeColor },
  },
  success: {
    color: defaultColor,
    border: 'none',
    background: { color: successColor },
  },
  warning: {
    color: defaultColor,
    border: 'none',
    background: { color: warningColor },
  },
  danger: {
    color: defaultColor,
    border: 'none',
    background: { color: dangerColor },
  },
};
export const TypeHoverTheme = {
  default: defaultHoverTheme,
  primary: {
    color: defaultColor,
    border: 'none',
    background: { color: colorsFunc(themeColor).hoverColor },
  },
  success: {
    color: defaultColor,
    border: 'none',
    background: { color: colorsFunc(successColor).hoverColor },
  },
  warning: {
    color: defaultColor,
    border: 'none',
    background: { color: colorsFunc(warningColor).hoverColor },
  },
  danger: {
    color: defaultColor,
    border: 'none',
    background: { color: colorsFunc(dangerColor).hoverColor },
  },
};

const defaultBorderColor = '#e8e8e8';
export const defaultDisabledTheme = {
  color: lightGreyColor,
  background: { color: defaultColor },
  border: getBorder({ width: 1, style: 'solid', color: defaultBorderColor }),
};
export const DisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    color: defaultColor,
    border: 'none',
    background: { color: changeColor(themeColor, 45).color },
  },
  success: {
    color: defaultColor,
    border: 'none',
    background: { color: changeColor(successColor, 45).color },
  },
  warning: {
    color: defaultColor,
    border: 'none',
    background: { color: changeColor(warningColor, 45).color },
  },
  danger: {
    color: defaultColor,
    border: 'none',
    background: { color: changeColor(dangerColor, 45).color },
  },
};
const mouseDownSuccessColor = colorsFunc(successColor).mouseDownColor;
const mouseDownWarningColor = colorsFunc(warningColor).mouseDownColor;
const mouseDownDangerColor = colorsFunc(dangerColor).mouseDownColor;
export const ActiveTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    color: defaultColor,
    border: 'none',
    background: { color: mouseDownColor },
  },
  success: {
    color: defaultColor,
    border: 'none',
    background: { color: mouseDownSuccessColor },
  },
  warning: {
    color: defaultColor,
    border: 'none',
    background: { color: mouseDownWarningColor },
  },
  danger: {
    color: defaultColor,
    border: 'none',
    background: { color: mouseDownDangerColor },
  },
};

export const PlainTypeTheme = {
  default: {
    color: defaultColors,
    background: { color: defaultColor },
    border: getBorder({ width: 1, style: 'solid', color: lightGreyColor }),
  },
  primary: {
    color: themeColor,
    background: { color: changeColor(themeColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: themeColor }),
  },
  success: {
    color: successColor,
    background: { color: changeColor(successColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: successColor }),
  },
  warning: {
    color: warningColor,
    background: { color: changeColor(warningColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: warningColor }),
  },
  danger: {
    color: dangerColor,
    background: { color: changeColor(dangerColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
  },
};
export const PlainHoverTheme = {
  default: {
    color: hoverColor,
    border: getBorder({ width: 1, style: 'solid', color: hoverColor }),
    background: { color: defaultColor },
  },
  primary: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: themeColor }),
    background: { color: themeColor },
  },
  success: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: successColor }),
    background: { color: successColor },
  },
  warning: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: warningColor }),
    background: { color: warningColor },
  },
  danger: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
    background: { color: dangerColor },
  },
};
export const PlainDisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    color: primaryColors,
    background: { color: changeColor(themeColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: primaryColors }),
  },
  success: {
    color: successColors,
    background: { color: changeColor(successColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: successColors }),
  },
  warning: {
    color: warningColors,
    background: { color: changeColor(warningColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: warningColors }),
  },
  danger: {
    color: dangerColors,
    background: { color: changeColor(dangerColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: dangerColors }),
  },
};
export const PlainActiveTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: mouseDownColor }),
    background: { color: mouseDownColor },
  },
  success: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: mouseDownSuccessColor }),
    background: { color: mouseDownSuccessColor },
  },
  warning: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: mouseDownWarningColor }),
    background: { color: mouseDownWarningColor },
  },
  danger: {
    color: defaultColor,
    border: getBorder({ width: 1, style: 'solid', color: mouseDownDangerColor }),
    background: { color: mouseDownDangerColor },
  },
};

export const SizeTheme = {
  large: {
    height: 40,
    padding: {
      top: 0,
      right: 18,
      bottom: 0,
      left: 18,
    },
    fontSize: 14,
    borderRadius: 20,
  },
  default: {
    height: 32,
    padding: {
      top: 0,
      right: 18,
      bottom: 0,
      left: 18,
    },
    fontSize: 14,
    borderRadius: 16,
  },
  small: {
    height: 24,
    padding: {
      top: 0,
      right: 14,
      bottom: 0,
      left: 14,
    },
    fontSize: 12,
    borderRadius: 12,
  },
};
