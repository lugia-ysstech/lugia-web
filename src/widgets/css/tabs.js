import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
const { themeColor, blackColor, mediumGreyColor, darkGreyColor, superLightColor } = colorsFunc();
type TabType = 'line' | 'card';
type TabPositionType = 'left' | 'right' | 'top' | 'bottom';
type EditType = 'next' | 'pre';
const em = px2emcss(1.2);

export const matchTabPosition = (tabPosition: TabPositionType, expect: TabPositionType) => {
  return tabPosition === expect;
};
export const matchTabType = (tabtype: TabType, expect: TabType) => {
  return tabtype === expect;
};
export const getCursor = (props: CommonInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'text'}`;
};

export const getClearButtonColor = () => {
  return `color: ${mediumGreyColor}`;
};
export const getClearButtonHoverColor = () => {
  return `color: ${darkGreyColor}`;
};
export const getHoverColor = () => {
  return `color: ${themeColor};`;
};
export const getColor = (props: Object) => {
  const { isSelect } = props;
  return `color: ${isSelect ? themeColor : blackColor};`;
};
export const getLinePosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchTabPosition(tabPosition, 'left')) {
    return 'right :0';
  }
  if (matchTabPosition(tabPosition, 'right')) {
    return 'left :0';
  }
  if (matchTabPosition(tabPosition, 'top')) {
    return 'bottom :0';
  }
  if (matchTabPosition(tabPosition, 'bottom')) {
    return 'top :0';
  }
};
export const getContentPosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchTabPosition(tabPosition, 'right')) {
    return `left:${em(0)};`;
  }
  if (matchTabPosition(tabPosition, 'bottom')) {
    return `top :${em(-20)};`;
  }
  if (matchTabPosition(tabPosition, 'left')) {
    return `top :${em(0)};`;
  }
};
export const getContainerBorder = (props: Object) => {
  const { tabPosition } = props;
  if (matchTabPosition(tabPosition, 'top')) {
    return `border-bottom: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTabPosition(tabPosition, 'right')) {
    return `border-left: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTabPosition(tabPosition, 'left')) {
    return `border-right: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTabPosition(tabPosition, 'bottom')) {
    return `border-top: ${em(1)} solid ${superLightColor}`;
  }
};
export const getFocusShadow = (props: Object) => {
  const { tabType, isSelect } = props;
  const color = isSelect && tabType === 'card' ? 'rgba(104, 79, 255,0.2)' : 'none';
  return `box-shadow: 0 0 ${em(6)} ` + color;
};
export const getBackgroundShadow = (props: Object) => {
  const { tabType } = props;
  const color = tabType === 'card' ? 'rgba(104, 79, 255,0.2)' : 'none';
  return `box-shadow: 0 ${em(-1)} ${em(6)} ` + color;
};
export const backgroundColor = (props: Object) => {
  const { tabType } = props;
  const color = matchTabType(tabType, 'card') ? '#f8f8f8' : 'none';
  return color;
};
export const hContainerWidth = props => {
  const { theme } = props;
  const { width } = theme;
  return `${em(width)};`;
};
export const vContainerHeight = props => {
  const { theme } = props;
  const { height } = theme;
  return `${em(height)};`;
};
export const hContainerHeight = props => {
  const { tabType } = props;
  const height = matchTabType(tabType, 'card') ? em(38) : em(32);
  return height;
};
export const lineWidth = props => {
  const { lineWidth } = props;
  const width = lineWidth ? em(lineWidth - 40) : em(100);
  return width;
};
export const getContentTransform = props => {
  const { tabPosition, x, y } = props;
  if (matchTabPosition(tabPosition, 'right') || matchTabPosition(tabPosition, 'left')) {
    return `transform: translateY(${y}%);`;
  }
  return `transform: translate3d(${em(x)}, 0, 0); `;
};
