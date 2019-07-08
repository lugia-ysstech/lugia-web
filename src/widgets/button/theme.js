/**
 * Button Theme
 * create by guorg
 * @flow
 */
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
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
  border: getBorder({ width: 1, style: 'solid', color: lightGreyColor }),
  background: { color: defaultColor },
};
export const defaultHoverTheme = {
  border: getBorder({ width: 1, style: 'solid', color: hoverColor }),
  background: { color: spiritColor },
};
export const defaultActiveTheme = {
  border: getBorder({ width: 1, style: 'solid', color: mouseDownColor }),
  background: { color: spiritColor },
};

export const TypeTheme = {
  default: defaultTheme,
  primary: {
    border: 'none',
    background: { color: themeColor },
  },
  success: {
    border: 'none',
    background: { color: successColor },
  },
  warning: {
    border: 'none',
    background: { color: warningColor },
  },
  danger: {
    border: 'none',
    background: { color: dangerColor },
  },
};
export const TypeHoverTheme = {
  default: defaultHoverTheme,
  primary: {
    border: 'none',
    background: { color: colorsFunc(themeColor).hoverColor },
  },
  success: {
    border: 'none',
    background: { color: colorsFunc(successColor).hoverColor },
  },
  warning: {
    border: 'none',
    background: { color: colorsFunc(warningColor).hoverColor },
  },
  danger: {
    border: 'none',
    background: { color: colorsFunc(dangerColor).hoverColor },
  },
};

const defaultBorderColor = '#e8e8e8';
export const defaultDisabledTheme = {
  background: { color: defaultColor },
  border: getBorder({ width: 1, style: 'solid', color: defaultBorderColor }),
};
export const DisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    border: 'none',
    background: { color: changeColor(themeColor, 45).color },
  },
  success: {
    border: 'none',
    background: { color: changeColor(successColor, 45).color },
  },
  warning: {
    border: 'none',
    background: { color: changeColor(warningColor, 45).color },
  },
  danger: {
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
    border: 'none',
    background: { color: mouseDownColor },
  },
  success: {
    border: 'none',
    background: { color: mouseDownSuccessColor },
  },
  warning: {
    border: 'none',
    background: { color: mouseDownWarningColor },
  },
  danger: {
    border: 'none',
    background: { color: mouseDownDangerColor },
  },
};

export const PlainTypeTheme = {
  default: {
    background: { color: defaultColor },
    border: getBorder({ width: 1, style: 'solid', color: lightGreyColor }),
  },
  primary: {
    background: { color: changeColor(themeColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: themeColor }),
  },
  success: {
    background: { color: changeColor(successColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: successColor }),
  },
  warning: {
    background: { color: changeColor(warningColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: warningColor }),
  },
  danger: {
    background: { color: changeColor(dangerColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
  },
};
export const PlainHoverTheme = {
  default: {
    border: getBorder({ width: 1, style: 'solid', color: hoverColor }),
    background: { color: defaultColor },
  },
  primary: {
    border: getBorder({ width: 1, style: 'solid', color: themeColor }),
    background: { color: themeColor },
  },
  success: {
    border: getBorder({ width: 1, style: 'solid', color: successColor }),
    background: { color: successColor },
  },
  warning: {
    border: getBorder({ width: 1, style: 'solid', color: warningColor }),
    background: { color: warningColor },
  },
  danger: {
    border: getBorder({ width: 1, style: 'solid', color: dangerColor }),
    background: { color: dangerColor },
  },
};
export const PlainDisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    background: { color: changeColor(themeColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: primaryColors }),
  },
  success: {
    background: { color: changeColor(successColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: successColors }),
  },
  warning: {
    background: { color: changeColor(warningColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: warningColors }),
  },
  danger: {
    background: { color: changeColor(dangerColor, 0, 0, bgReduceA).rgba },
    border: getBorder({ width: 1, style: 'solid', color: dangerColors }),
  },
};
export const PlainActiveTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    border: getBorder({ width: 1, style: 'solid', color: mouseDownColor }),
    background: { color: mouseDownColor },
  },
  success: {
    border: getBorder({ width: 1, style: 'solid', color: mouseDownSuccessColor }),
    background: { color: mouseDownSuccessColor },
  },
  warning: {
    border: getBorder({ width: 1, style: 'solid', color: mouseDownWarningColor }),
    background: { color: mouseDownWarningColor },
  },
  danger: {
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
  },
  default: {
    height: 32,
    padding: {
      top: 0,
      right: 18,
      bottom: 0,
      left: 18,
    },
  },
  small: {
    height: 24,
    padding: {
      top: 0,
      right: 14,
      bottom: 0,
      left: 14,
    },
  },
};
export const CircleTheme = {
  large: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
  default: {
    height: 32,
    width: 32,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
  small: {
    height: 24,
    width: 24,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
};
export const ShapeTheme = {
  default: {
    borderRadius: getBorderRadius(16),
  },
  large: {
    borderRadius: getBorderRadius(20),
  },
  small: {
    borderRadius: getBorderRadius(12),
  },
};

export const textDefaultTheme = {
  color: darkGreyColor,
  font: { size: 14 },
};
export const textDefaultHoverTheme = {
  color: hoverColor,
};
export const textDefaultActiveTheme = {
  color: mouseDownColor,
};
export const textDefaultDisabledTheme = {
  color: lightGreyColor,
};
export const TextTypeTheme = {
  default: textDefaultTheme,
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};
export const TextTypeHoverTheme = {
  default: textDefaultHoverTheme,
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};
export const TextTypeActiveTheme = {
  default: { color: mouseDownColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};
export const TextTypeDisabledTheme = {
  default: { color: lightGreyColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};
export const TextPlainTypeTheme = {
  default: { color: defaultColors },
  primary: { color: themeColor },
  success: { color: successColor },
  warning: { color: warningColor },
  danger: { color: dangerColor },
};
export const TextPlainHoverTheme = {
  default: { color: hoverColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};

export const TextPlainDisabledTypeTheme = {
  default: { color: defaultColor },
  primary: { color: primaryColors },
  success: { color: successColors },
  warning: { color: warningColors },
  danger: { color: dangerColors },
};
export const TextPlainActiveTypeTheme = {
  default: { color: mouseDownColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
};
export const TextSizeTheme = {
  large: { font: { size: 14 } },
  default: { font: { size: 14 } },
  small: { font: { size: 12 } },
};
export const TextCircleTheme = {
  large: { font: { size: 14 } },
  default: { font: { size: 14 } },
  small: { font: { size: 12 } },
};
