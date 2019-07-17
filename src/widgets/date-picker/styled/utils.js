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
const { hoverColor, normalColor, disableColor, spiritColor, lightGreyColor } = colorsFunc();
export const themeColor = {
  hoverColor,
  normalColor,
  disableColor,
  spiritColor,
  lightGreyColor,
};
export function getThemeProperty(props: Object) {
  const { hasTimeWrapBorder, hasItemNumber = 3 } = props;
  const { isRange, isTime } = modeStyle(props.mode);
  const normalWidth = isRange ? 420 : 200;
  const { width = normalWidth, color, backgroundColor } = props;
  const rangeWrapWidth = width >= 600 ? width : 600;
  const newWidth = isRange ? rangeWrapWidth / 2 : isTime ? width : width * 1;
  const TimeWrapWidth = isRange && hasTimeWrapBorder ? newWidth - 1 : newWidth;
  const TimeColWidth = TimeWrapWidth / hasItemNumber;
  const weekTitleWidth = (newWidth - DateWrapperPadding.left * 2 - 2) / 7;
  console.log(props);
  return {
    width: newWidth,
    TimeWrapWidth,
    color,
    backgroundColor,
    weekTitleWidth,
    rangeWrapWidth,
    TimeColWidth,
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
