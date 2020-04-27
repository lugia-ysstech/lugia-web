import getTheme from '../../css/theme-common-dict';
import { px2remcss } from '../../css/units';
import { modeStyle } from '../utils/booleanUtils';
export const fontSize = 1.4;
export const em = px2remcss;

export const distance = {
  iconLeft: 10,
};
export const DateWrapperPadding = {
  top: 20,
  left: 20,
  bottom: 44,
};
export const borderRadius = 3;
export const themeColor = {
  normalColor: getTheme('themeColor'),
  hoverColor: getTheme('themeHoverColor'),
  activeColor: getTheme('themeActiveColor'),
  disableColor: getTheme('themeDisabledColor'),
  lightGreyColor: getTheme('lightGreyColor'),
  blackColor: getTheme('blackColor'),
  borderDisableColor: getTheme('borderDisableColor'),
  defaultColor: getTheme('defaultColor'),
  darkGreyColor: getTheme('darkGreyColor'),
  dangerColor: getTheme('dangerColor'),
  normalBorder: getTheme('normalBorder'),
  hoverBorder: getTheme('hoverBorder'),
  activeBorder: getTheme('activeBorder'),
  disabledBorder: getTheme('disabledBorder'),
  focusBorder: getTheme('focusBorder'),
  smallSize: getTheme('smallSize'),
  normalSize: getTheme('normalSize'),
  largeSize: getTheme('largeSize'),
  disabledBoxShadow: getTheme('disabledBoxShadow'),
  borderRadiusValue: getTheme('borderRadiusValue'),
  largeBorderRadiusValue: getTheme('largeBorderRadiusValue'),
  disableTextColor: getTheme('disableTextColor'),
  mediumGreyColor: getTheme('mediumGreyColor'),
  xxsFontSize: getTheme('xxsFontSize'),
  xsFontSize: getTheme('xsFontSize'),
  sFontSize: getTheme('sFontSize'),
  normalBoxShadow: getTheme('normalBoxShadow'),
  paddingToText: getTheme('paddingToText'),
  borderColor: getTheme('borderColor'),
  publicPadding: getTheme('padding'),
  marginToSameElement: getTheme('marginToSameElement'),
  superLightColor: getTheme('superLightColor'),
};
export function getThemeProperty(props: Object) {
  const { isRange, isTime } = modeStyle(props.mode);
  const { width } = props;
  const newWidth = isRange ? width / 2 : isTime ? width : width * 1;
  const weekTitleWidth = (newWidth - DateWrapperPadding.left * 2 - 2) / 7;
  return {
    weekTitleWidth,
  };
}
export const getDateWrrap = () => {
  const { top, left } = DateWrapperPadding;
  const paddingStyle = ` ${em(top)}  ${em(left)} 0`;
  return {
    paddingStyle,
    left: em(left),
    top: em(top),
  };
};
