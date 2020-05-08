/**
 * Button Theme
 * create by guorg
 * @flow
 */
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';
import changeColor from '../css/utilsColor';

const successColors = '$lugia-dict.@lugia/lugia-web.successColorReduceS';
const warningColors = '$lugia-dict.@lugia/lugia-web.warningColorReduceS';
const dangerColors = '$lugia-dict.@lugia/lugia-web.dangerColorReduceS';

const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';

const themeColorReduceA = '$lugia-dict.@lugia/lugia-web.themeColorReduceA';
const successColorReduceA = '$lugia-dict.@lugia/lugia-web.successColorReduceA';
const warningColorReduceA = '$lugia-dict.@lugia/lugia-web.warningColorReduceA';
const dangerColorReduceA = '$lugia-dict.@lugia/lugia-web.dangerColorReduceA';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const warningColor = '$lugia-dict.@lugia/lugia-web.warningColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';

const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const successHoverColor = '$lugia-dict.@lugia/lugia-web.successHoverColor';
const warningHoverColor = '$lugia-dict.@lugia/lugia-web.warningHoverColor';
const dangerHoverColor = '$lugia-dict.@lugia/lugia-web.dangerHoverColor';

const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const successActiveColor = '$lugia-dict.@lugia/lugia-web.successActiveColor';
const warningActiveColor = '$lugia-dict.@lugia/lugia-web.warningActiveColor';
const dangerActiveColor = '$lugia-dict.@lugia/lugia-web.dangerActiveColor';

const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const successDisabledColor = '$lugia-dict.@lugia/lugia-web.successDisabledColor';
const warningDisabledColor = '$lugia-dict.@lugia/lugia-web.warningDisabledColor';
const dangerDisabledColor = '$lugia-dict.@lugia/lugia-web.dangerDisabledColor';

const themeFocusColor = '$lugia-dict.@lugia/lugia-web.themeFocusColor';
const successFocusColor = '$lugia-dict.@lugia/lugia-web.successFocusColor';
const warningFocusColor = '$lugia-dict.@lugia/lugia-web.warningFocusColor';
const dangerFocusColor = '$lugia-dict.@lugia/lugia-web.dangerFocusColor';

const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';

const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';

const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';

const themeColorReduce0 = 'transparent';
const successColorReduce0 = 'transparent';
const warningColorReduce0 = 'transparent';
const dangerColorReduce0 = 'transparent';

export const linkTheme = {
  border: 'none',
  background: 'none',
};

export const defaultTheme = {
  background: { color: defaultColor },
  border: getBorder({
    width: 1,
    style: 'solid',
    color: borderColor,
  }),
};
export const typeTheme = {
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

export const defaultHoverTheme = {
  border: getBorder({
    width: 1,
    style: 'solid',
    color: themeColor,
  }),
  background: { color: themeColorReduceA },
};

export const typeHoverTheme = {
  default: defaultHoverTheme,
  primary: {
    border: 'none',
    background: { color: themeHoverColor },
  },
  success: {
    border: 'none',
    background: { color: successHoverColor },
  },
  warning: {
    border: 'none',
    background: { color: warningHoverColor },
  },
  danger: {
    border: 'none',
    background: { color: dangerHoverColor },
  },
};

export const defaultActiveTheme = {
  border: getBorder({
    width: 1,
    style: 'solid',
    color: themeActiveColor,
  }),
  background: { color: themeColorReduceA },
};
export const activeTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    border: 'none',
    background: { color: themeActiveColor },
  },
  success: {
    border: 'none',
    background: { color: successActiveColor },
  },
  warning: {
    border: 'none',
    background: { color: warningActiveColor },
  },
  danger: {
    border: 'none',
    background: { color: dangerActiveColor },
  },
};
export const defaultFocusTheme = {
  border: getBorder({
    width: 1,
    style: 'solid',
    color: themeFocusColor,
  }),
  background: { color: themeColorReduceA },
};
export const typeFocusTheme = {
  default: defaultFocusTheme,
  primary: {
    border: 'none',
    background: { color: themeFocusColor },
  },
  success: {
    border: 'none',
    background: { color: successFocusColor },
  },
  warning: {
    border: 'none',
    background: { color: warningFocusColor },
  },
  danger: {
    border: 'none',
    background: { color: dangerFocusColor },
  },
};
export const defaultDisabledTheme = {
  background: { color: defaultColor },
  border: getBorder({ width: 1, style: 'solid', color: borderDisableColor }),
};
export const disabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    border: 'none',
    background: { color: themeDisabledColor },
  },
  success: {
    border: 'none',
    background: { color: successDisabledColor },
  },
  warning: {
    border: 'none',
    background: { color: warningDisabledColor },
  },
  danger: {
    border: 'none',
    background: { color: dangerDisabledColor },
  },
};

export const sizeTheme = {
  large: {
    height: largeSize,
    padding: {
      top: 0,
      right: 18,
      bottom: 0,
      left: 18,
    },
  },
  default: {
    height: normalSize,
    padding: {
      top: 0,
      right: 18,
      bottom: 0,
      left: 18,
    },
  },
  small: {
    height: smallSize,
    padding: {
      top: 0,
      right: 14,
      bottom: 0,
      left: 14,
    },
  },
};
export const circleTheme = {
  large: {
    width: largeSize,
    height: largeSize,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
  default: {
    height: normalSize,
    width: normalSize,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
  small: {
    height: smallSize,
    width: smallSize,
    padding: 0,
    borderRadius: getBorderRadius('50%'),
  },
};
export const shapeTheme = {
  default: {
    borderRadius: getBorderRadius(get('normalSize') / 2),
  },
  large: {
    borderRadius: getBorderRadius(get('largeSize') / 2),
  },
  small: {
    borderRadius: getBorderRadius(get('smallSize') / 2),
  },
};

export const textDefaultTheme = {
  font: { size: 14 },
};
export const textDefaultHoverTheme = {
  color: themeColor,
};
export const textDefaultActiveTheme = {
  color: themeActiveColor,
};
export const textDefaultFocusTheme = {
  color: themeFocusColor,
};
export const textDefaultDisabledTheme = {
  color: themeDisabledColor,
};
export const textTypeTheme = {
  default: { color: blackColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: themeColor },
};
export const textTypeHoverTheme = {
  default: { color: themeColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: themeHoverColor },
};
export const textTypeActiveTheme = {
  default: { color: themeActiveColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: themeActiveColor },
};
export const textTypeFocusTheme = {
  default: { color: themeFocusColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: themeFocusColor },
};
export const textTypeDisabledTheme = {
  default: { color: themeDisabledColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: themeDisabledColor },
};

export const plainTypeTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: borderColor,
    }),
  },
  primary: {
    background: { color: themeColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeColor,
    }),
  },
  success: {
    background: { color: successColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successColor,
    }),
  },
  warning: {
    background: { color: warningColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningColor,
    }),
  },
  danger: {
    background: { color: dangerColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerColor,
    }),
  },
};

export const plainHoverTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeColor,
    }),
  },
  primary: {
    background: { color: themeColorReduce0 },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeHoverColor,
    }),
  },
  success: {
    background: { color: successColorReduce0 },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successHoverColor,
    }),
  },
  warning: {
    background: { color: warningColorReduce0 },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningHoverColor,
    }),
  },
  danger: {
    background: { color: dangerColorReduce0 },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerHoverColor,
    }),
  },
};
export const plainActiveTypeTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeActiveColor,
    }),
  },
  primary: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeActiveColor,
    }),
    background: { color: themeColorReduce0 },
  },
  success: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successActiveColor,
    }),
    background: { color: successColorReduce0 },
  },
  warning: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningActiveColor,
    }),
    background: { color: warningColorReduce0 },
  },
  danger: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerActiveColor,
    }),
    background: { color: dangerColorReduce0 },
  },
};
export const plainFocusTypeTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeFocusColor,
    }),
  },
  primary: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeFocusColor,
    }),
    background: { color: themeColorReduceA },
  },
  success: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successFocusColor,
    }),
    background: { color: successColorReduceA },
  },
  warning: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningFocusColor,
    }),
    background: { color: warningColorReduceA },
  },
  danger: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerFocusColor,
    }),
    background: { color: dangerColorReduceA },
  },
};

export const plainDisabledTypeTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: borderDisableColor,
    }),
  },
  primary: {
    background: { color: themeColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeDisabledColor,
    }),
  },
  success: {
    background: { color: successColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successDisabledColor,
    }),
  },
  warning: {
    background: { color: warningColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningDisabledColor,
    }),
  },
  danger: {
    background: { color: dangerColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerDisabledColor,
    }),
  },
};

export const textPlainTypeTheme = {
  default: { color: blackColor },
  primary: { color: themeColor },
  success: { color: successColor },
  warning: { color: warningColor },
  danger: { color: dangerColor },
  link: { color: themeColor },
};
export const textPlainHoverTheme = {
  default: { color: themeColor },
  primary: { color: themeHoverColor },
  success: { color: successHoverColor },
  warning: { color: warningHoverColor },
  danger: { color: dangerHoverColor },
  link: { color: themeHoverColor },
};
export const textPlainActiveTypeTheme = {
  default: { color: themeActiveColor },
  primary: { color: themeActiveColor },
  success: { color: successActiveColor },
  warning: { color: warningActiveColor },
  danger: { color: dangerActiveColor },
  link: { color: themeActiveColor },
};
export const textPlainFocusTheme = {
  default: { color: themeFocusColor },
  primary: { color: themeFocusColor },
  success: { color: successFocusColor },
  warning: { color: warningFocusColor },
  danger: { color: dangerFocusColor },
  link: { color: themeFocusColor },
};
export const textPlainDisabledTypeTheme = {
  default: { color: disableTextColor },
  primary: { color: themeDisabledColor },
  success: { color: successColors },
  warning: { color: warningColors },
  danger: { color: dangerColors },
  link: { color: themeDisabledColor },
};

export const textSizeTheme = {
  large: { font: { size: 14 } },
  default: { font: { size: 14 } },
  small: { font: { size: 12 } },
};
export const textCircleTheme = {
  large: { font: { size: 14 } },
  default: { font: { size: 14 } },
  small: { font: { size: 12 } },
};

export const iconSizeTheme = {
  large: { font: { size: sFontSize } },
  default: { font: { size: sFontSize } },
  small: { font: { size: xsFontSize } },
};
