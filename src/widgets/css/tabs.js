import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { matchTab } from '../tabs/utils';
const { themeColor, mediumGreyColor, superLightColor } = colorsFunc();
type TabType = 'line' | 'card' | 'window';
type TabPositionType = 'left' | 'right' | 'top' | 'bottom';
type PagingType = 'single' | 'page';
type EditType = 'next' | 'pre';
const em = px2emcss(1.2);
export const addButtonSize = 18;
export const getCursor = (props: Object) => {
  const { currentPage, totalPage, type } = props;
  const cursor =
    (type === 'next' && currentPage === totalPage) || (type === 'pre' && currentPage === 1);
  console.log(type);
  return `cursor:${cursor ? 'not-allowed' : 'pointer'}`;
};
export const getClearButtonColor = () => {
  return `color: ${mediumGreyColor}`;
};
export const getTabpaneIconHoverColor = (props: Object) => {
  const { tabType } = props;
  const color = matchTab(tabType, 'line') ? themeColor : 'none';
  return `color: ${color};`;
};
export const getTabpaneHoverColor = () => {
  return `color: ${themeColor};`;
};
export const getSelectColor = (props: Object) => {
  const { isSelect } = props;
  return `color: ${isSelect ? themeColor : 'none'};`;
};
export const getLinePosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchTab(tabPosition, 'left')) {
    return 'right :0';
  }
  if (matchTab(tabPosition, 'right')) {
    return 'left :0';
  }
  if (matchTab(tabPosition, 'top')) {
    return 'bottom :0';
  }
  if (matchTab(tabPosition, 'bottom')) {
    return 'top :0';
  }
};
export const getContentPosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchTab(tabPosition, 'right')) {
    return `left:${em(0)};text-align: left;`;
  }
  if (matchTab(tabPosition, 'bottom')) {
    return `top :${em(-20)};`;
  }
  if (matchTab(tabPosition, 'left')) {
    return `top :${em(0)};`;
  }
};
export const getContainerBorder = (props: Object) => {
  const { tabPosition, tabType } = props;
  if ((matchTab(tabPosition, 'top') && matchTab(tabType, 'line')) || matchTab(tabType, 'card')) {
    return `border-bottom: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTab(tabPosition, 'right')) {
    return `border-left: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTab(tabPosition, 'left')) {
    return `border-right: ${em(1)} solid ${superLightColor}`;
  }
  if (matchTab(tabPosition, 'bottom')) {
    return `border-top: ${em(1)} solid ${superLightColor}`;
  }
};
export const getTabpaneFocusShadow = (props: Object) => {
  const { tabType, isSelect } = props;
  const color = isSelect && tabType === 'window' ? 'rgba(104, 79, 255,0.2)' : 'none';
  return `box-shadow: 0 0 ${em(6)} ` + color;
};
export const getBackgroundShadow = (props: Object) => {
  const { tabType } = props;
  const color = tabType === 'window' ? 'rgba(104, 79, 255,0.2)' : 'none';
  return `box-shadow: 0 ${em(-2)} ${em(6)} ` + color;
};
export const backgroundColor = (props: Object) => {
  const { tabType } = props;
  const color = matchTab(tabType, 'window') ? '#f8f8f8' : 'none';
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
  const height = matchTab(tabType, 'window') ? em(38) : em(34);
  return height;
};
export const lineWidth = props => {
  const { lineWidth } = props;
  const width = lineWidth ? em(lineWidth - 40) : em(100);
  return width;
};
export const getTitlePadding = props => {
  const { isHasIcon, tabType } = props;
  const leftPadding = isHasIcon && !matchTab(tabType, 'window') ? em(10) : em(0);
  const rightPadding = matchTab(tabType, 'window') ? em(10) : em(0);
  return `padding: 0 ${rightPadding}  0 ${leftPadding}`;
};
export const getTabpanePadding = props => {
  const { tabType, isSelect } = props;
  const rightPadding = !matchTab(tabType, 'line') ? em(10) : em(20);
  const bottomPadding = matchTab(tabType, 'card') && isSelect ? em(2) : 0;
  return `padding: 0 ${rightPadding} ${bottomPadding} ${em(20)}`;
};
export const getAddBackground = () => {
  return 'background: #eeeeee;';
};
export const getAddHoverBackground = () => {
  return 'background: #dddddd;';
};
export const getTabpaneBackground = props => {
  const { tabType, isSelect } = props;
  const background =
    (matchTab(tabType, 'window') && isSelect) || (matchTab(tabType, 'card') && isSelect)
      ? 'white'
      : matchTab(tabType, 'card') && !isSelect
        ? '#f8f8f8'
        : 'none';
  return `background: ${background}`;
};
export const getTabpaneBorder = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'card')) return `border: ${em(1)} solid ${superLightColor}`;
};
export const getTabpaneMarginRight = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'card')) return `  margin-right:${em(4)};`;
};
export const getAddRadius = props => {
  const { tabType } = props;
  const radius = matchTab(tabType, 'window') ? '50%' : em(4);
  return ` border-radius: ${radius};`;
};
export const getAddTop = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'window')) return `top: ${em(7)};`;
};
export const getAddRight = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'window')) return `right: ${em(-10)};`;
};
export const getAddButtonBottom = props => {
  const { tabType } = props;
  const bottom = matchTab(tabType, 'window') ? em(10) : '-25%';
  return ` bottom: ${bottom};`;
};
export const getTabpaneBorderTopRadius = props => {
  const { tabType, isSelect } = props;
  const radius = (matchTab(tabType, 'window') && isSelect) || matchTab(tabType, 'card') ? em(4) : 0;
  return ` border-top-left-radius: ${radius}; border-top-right-radius:${radius};`;
};
export const getTabpaneHoverTransform = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'card')) return `transform: translateX(${em(-10)}); transition: all 0.5s;`;
};
export const getTabpaneBottom = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'window')) return `bottom: ${em(-6)};`;
};
export const getTabpaneLeft = props => {
  const { tabType } = props;
  if (matchTab(tabType, 'window')) return `left: ${em(6)};`;
};
export const getClearButtonShow = props => {
  const { show, tabType } = props;
  return `opacity:${!show && matchTab(tabType, 'card') ? '0' : '1'}`;
};
export const getAddButtonShow = props => {
  const { show, tabType } = props;
  return `opacity:${!show && matchTab(tabType, 'card') ? '0' : '1'}`;
};
export const getArrowTop = props => {
  const { tabType } = props;
  const top = matchTab(tabType, 'window') ? em(24) : '50%';
  return `top: ${top};`;
};
export const getAddButtonDisplay = props => {
  const { tabType } = props;
  const display = matchTab(tabType, 'card') ? 'block !important' : 'inline-blick';
  return `display:  ${display};`;
};
