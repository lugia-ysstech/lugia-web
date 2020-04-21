/**
 * Button Theme
 * create by guorg
 * @flow
 */
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';

const defaultColors = '$lugia-dict.@lugia/lugia-web.defaultColorReduceS';
const primaryColors = '$lugia-dict.@lugia/lugia-web.themeColorReduceS';
const successColors = '$lugia-dict.@lugia/lugia-web.successColorReduceS';
const warningColors = '$lugia-dict.@lugia/lugia-web.warningColorReduceS';
const dangerColors = '$lugia-dict.@lugia/lugia-web.dangerColorReduceS';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
export const defaultTheme = {
  border: getBorder({
    width: 1,
    style: 'solid',
    color: lightGreyColor,
  }),
  background: { color: defaultColor },
};
export const linkTheme = {
  border: 'none',
  background: 'none',
};
const hoverColor = '$lugia-dict.@lugia/lugia-web.hoverColor';
const spiritColor = '$lugia-dict.@lugia/lugia-web.spiritColor';
export const defaultHoverTheme = {
  border: getBorder({ width: 1, style: 'solid', color: hoverColor }),
  background: { color: spiritColor },
};
const mouseDownColor = '$lugia-dict.@lugia/lugia-web.mouseDownColor';
export const defaultActiveTheme = {
  border: getBorder({
    width: 1,
    style: 'solid',
    color: mouseDownColor,
  }),
  background: { color: spiritColor },
};

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const warningColor = '$lugia-dict.@lugia/lugia-web.warningColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
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
    background: { color: '$lugia-dict.@lugia/lugia-web.themeHoverColor' },
  },
  success: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.successHoverColor' },
  },
  warning: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.warningHoverColor' },
  },
  danger: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.dangerHoverColor' },
  },
};

export const defaultDisabledTheme = {
  background: { color: defaultColor },
  border: getBorder({ width: 1, style: 'solid', color: get('defaultBorderColor') }),
};
export const DisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.themeDisabledColor' },
  },
  success: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.successDisabledColor' },
  },
  warning: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.warningDisabledColor' },
  },
  danger: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.dangerDisabledColor' },
  },
};

export const ActiveTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.themeActiveColor' },
  },
  success: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.successActiveColor' },
  },
  warning: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.warningActiveColor' },
  },
  danger: {
    border: 'none',
    background: { color: '$lugia-dict.@lugia/lugia-web.dangerActiveColor' },
  },
};

const themeColorReduceA = '$lugia-dict.@lugia/lugia-web.themeColorReduceA';
const successColorReduceA = '$lugia-dict.@lugia/lugia-web.successColorReduceA';
const warningColorReduceA = '$lugia-dict.@lugia/lugia-web.warningColorReduceA';
const dangerColorReduceA = '$lugia-dict.@lugia/lugia-web.dangerColorReduceA';
export const PlainTypeTheme = {
  default: {
    background: { color: defaultColor },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: lightGreyColor,
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
export const PlainHoverTheme = {
  default: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: hoverColor,
    }),
    background: { color: defaultColor },
  },
  primary: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: themeColor,
    }),
    background: { color: themeColor },
  },
  success: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successColor,
    }),
    background: { color: successColor },
  },
  warning: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: warningColor,
    }),
    background: { color: warningColor },
  },
  danger: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: dangerColor,
    }),
    background: { color: dangerColor },
  },
};
export const PlainDisabledTypeTheme = {
  default: defaultDisabledTheme,
  primary: {
    background: { color: themeColorReduceA },
    border: getBorder({ width: 1, style: 'solid', color: primaryColors }),
  },
  success: {
    background: { color: successColorReduceA },
    border: getBorder({
      width: 1,
      style: 'solid',
      color: successColors,
    }),
  },
  warning: {
    background: { color: warningColorReduceA },
    border: getBorder({ width: 1, style: 'solid', color: warningColors }),
  },
  danger: {
    background: { color: dangerColorReduceA },
    border: getBorder({ width: 1, style: 'solid', color: dangerColors }),
  },
};
const mouseDownSuccessColor = '$lugia-dict.@lugia/lugia-web.mouseDownSuccessColor';
const mouseDownWarningColor = '$lugia-dict.@lugia/lugia-web.mouseDownWarningColor';
const mouseDownDangerColor = '$lugia-dict.@lugia/lugia-web.mouseDownDangerColor';
export const PlainActiveTypeTheme = {
  default: defaultActiveTheme,
  primary: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: mouseDownColor,
    }),
    background: { color: mouseDownColor },
  },
  success: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: mouseDownSuccessColor,
    }),
    background: { color: mouseDownSuccessColor },
  },
  warning: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: mouseDownWarningColor,
    }),
    background: { color: mouseDownWarningColor },
  },
  danger: {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: mouseDownDangerColor,
    }),
    background: { color: mouseDownDangerColor },
  },
};

const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
function paddingStyle(paddingType: string): Object {
  if (paddingType === 'small') {
    return {
      padding: get('smallPaddingCSS'),
    };
  }
  return {
    padding: get('OtherPaddingCSS'),
  };
}
const smallPaddingStyle = paddingStyle('small');
const otherPaddingStyle = paddingStyle('other');
export const SizeTheme = {
  small: {
    height: smallSize,
    ...smallPaddingStyle,
  },
  default: {
    height: normalSize,
    ...otherPaddingStyle,
  },
  large: {
    height: largeSize,
    ...otherPaddingStyle,
  },
};

export const CircleTheme = {
  large: {
    width: largeSize,
    height: largeSize,
    padding: 0,
    borderRadius: getBorderRadius(get('circleRadiusValue')),
  },
  default: {
    height: normalSize,
    width: normalSize,
    padding: 0,
    borderRadius: getBorderRadius(get('circleRadiusValue')),
  },
  small: {
    height: smallSize,
    width: smallSize,
    padding: 0,
    borderRadius: getBorderRadius(get('circleRadiusValue')),
  },
};
export const ShapeTheme = {
  default: {
    borderRadius: getBorderRadius(get('sizeDefaultBorderRadius')),
  },
  large: {
    borderRadius: getBorderRadius(get('sizeLargeBorderRadius')),
  },
  small: {
    borderRadius: getBorderRadius(get('sizeSmallBorderRadius')),
  },
};

export const textDefaultTheme = {
  color: '$lugia-dict.@lugia/lugia-web.darkGreyColor',
  font: get('textSizeOther'),
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
  link: { color: themeColor },
};
export const TextTypeHoverTheme = {
  default: textDefaultHoverTheme,
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: hoverColor },
};
export const TextTypeActiveTheme = {
  default: { color: mouseDownColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: mouseDownColor },
};
export const TextTypeDisabledTheme = {
  default: { color: lightGreyColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: primaryColors },
};

export const TextPlainTypeTheme = {
  default: { color: defaultColors },
  primary: { color: themeColor },
  success: { color: successColor },
  warning: { color: warningColor },
  danger: { color: dangerColor },
  link: { color: defaultColors },
};
export const TextPlainHoverTheme = {
  default: { color: hoverColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: hoverColor },
};
export const TextPlainDisabledTypeTheme = {
  default: { color: lightGreyColor },
  primary: { color: primaryColors },
  success: { color: successColors },
  warning: { color: warningColors },
  danger: { color: dangerColors },
  link: { color: lightGreyColor },
};
export const TextPlainActiveTypeTheme = {
  default: { color: mouseDownColor },
  primary: { color: defaultColor },
  success: { color: defaultColor },
  warning: { color: defaultColor },
  danger: { color: defaultColor },
  link: { color: mouseDownColor },
};
function textSizeStyle(textSizeType: string): object {
  if (textSizeType === 'small') {
    return { font: get('textSizeSmall') };
  }
  return { font: get('textSizeOther') };
}
const textCircleStyle = (TextCircleType: string): object => {
  if (TextCircleType === 'small') {
    return { font: get('textCircleSmall') };
  }
  return { font: get('textCircleOther') };
};

export const TextSizeTheme = {
  large: textSizeStyle('large'),
  default: textSizeStyle('default'),
  small: textSizeStyle('small'),
};
export const TextCircleTheme = {
  large: textCircleStyle('large'),
  default: textCircleStyle('default'),
  small: textCircleStyle('small'),
};
