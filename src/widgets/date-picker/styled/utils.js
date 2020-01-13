import colorsFunc from '../../css/stateColor';
import { px2remcss } from '../../css/units';
import { modeStyle } from '../utils/booleanUtils';
export const fontSize = 1.4;
export const em = px2remcss;

export const distance = {
  iconLeft: 10,
};
export const DateWrapperPadding = {
  top: 30,
  left: 20,
  bottom: 44,
};
export const borderRadius = 3;
const {
  hoverColor,
  normalColor,
  disableColor,
  spiritColor,
  lightGreyColor,
  borderDisableColor,
  borderSize,
  circleBorderRadius,
  defaultColor,
  darkGreyColor,
} = colorsFunc();
export const themeColor = {
  hoverColor,
  normalColor,
  disableColor,
  spiritColor,
  lightGreyColor,
  borderDisableColor,
  borderSize,
  circleBorderRadius,
  defaultColor,
  darkGreyColor,
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
