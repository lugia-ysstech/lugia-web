import colorsFunc from '../../css/stateColor';
import { px2emcss } from '../../css/units';
import { modeStyle } from '../utils/booleanUtils';
export const fontSize = 1.4;
export const em = px2emcss(fontSize);

export const distance = {
  iconLeft: 10,
};
export const DateWrapperPadding = {
  top: 30,
  left: 20,
  bottom: 44,
};
export const borderRadius = 3;
const { hoverColor, normalColor, disableColor, spiritColor } = colorsFunc();
export const themeColor = {
  hoverColor,
  normalColor,
  disableColor,
  spiritColor,
};
export function getThemeProperty(props: Object) {
  const { hasTimeWrapBorder } = props;
  const { isRange, isTime } = modeStyle(props.mode);
  const normalWidth = isRange ? 400 : 200;
  const { width = normalWidth, color, backgroundColor } = props;
  const newWidth = isRange ? width / 2 + 100 : isTime ? width : width * 1 + 100;
  const rangeWrapWidth = newWidth * 2;
  const TimeWrapWidth = isRange && hasTimeWrapBorder ? newWidth - 1 : newWidth;
  const TimeColWidth = TimeWrapWidth / 3;
  const weekTitleWIdth = em((newWidth - DateWrapperPadding.left * 2 - 2) / 7);
  return {
    width: newWidth,
    TimeWrapWidth,
    color,
    backgroundColor,
    weekTitleWIdth,
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
