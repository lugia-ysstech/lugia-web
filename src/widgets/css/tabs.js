import { px2remcss } from './units';
import colorsFunc from '../css/stateColor';
import { matchType, isVertical } from '../tabs/utils';
import { getBorder, getBorderRadius } from '@lugia/theme-css-hoc';

const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();
export type TabType = 'line' | 'card' | 'window';
export type TabPositionType = 'left' | 'right' | 'top' | 'bottom';
export type PagedType = 'single' | 'page';
export type EditEventType = 'next' | 'pre';
export const AddButtonSize = 18;
export const CardBorderAndMarginWidth = 6;
export const WindowMarginLeft = 6;
export const ArrowContainerWidth = 48;
export const YtabsHeight = 32;
export const CardMarginRight = 4;
export const LineMarginLeft = 20;
export const getCursor = (props: Object) => {
  const { currentPage, totalPage, type, pagedType, pagedCount, childrenSize } = props;
  const cursor =
    pagedType === 'page'
      ? (matchType(type, 'next') && currentPage + 1 > totalPage - 1) ||
        (matchType(type, 'pre') && currentPage <= 0)
      : (matchType(type, 'next') && pagedCount >= childrenSize.length - 1) ||
        (matchType(type, 'pre') && pagedCount <= 0);
  return `cursor:${cursor ? 'not-allowed' : 'pointer'}`;
};
export const getClearButtonColor = () => {
  return `color: ${mediumGreyColor}`;
};
export const getTabpaneIconHoverColor = (props: Object) => {
  const { tabType, disabled } = props;
  const color = matchType(tabType, 'line') && !disabled ? themeColor : '';
  return `color: ${color};`;
};

export const getTabpaneHoverColor = (props: Object) => {
  const { disabled } = props;
  return `color: ${disabled ? disableColor : themeColor};`;
};

export const getSelectColor = (props: Object) => {
  const { isSelect, disabled } = props;
  return `color: ${disabled ? disableColor : isSelect ? themeColor : ''};`;
};
export const getLinePosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchType(tabPosition, 'left')) {
    return 'right :0';
  }
  if (matchType(tabPosition, 'right')) {
    return 'left :0';
  }
  if (matchType(tabPosition, 'top')) {
    return 'bottom :0';
  }
  if (matchType(tabPosition, 'bottom')) {
    return 'top :0';
  }
};
export const getContentPosition = (props: Object) => {
  const { tabPosition } = props;
  if (matchType(tabPosition, 'right')) {
    return `left:${px2remcss(0)};text-align: left;`;
  }
  if (matchType(tabPosition, 'bottom')) {
    return `top :${px2remcss(-20)};`;
  }
  if (matchType(tabPosition, 'left')) {
    return `top :${px2remcss(0)};`;
  }
};
export const getContainerBorder = (props: Object) => {
  const { tabPosition, tabType } = props;
  const border = `${px2remcss(1)} solid ${superLightColor}`;
  if ((matchType(tabPosition, 'top') && matchType(tabType, 'line')) || matchType(tabType, 'card')) {
    return `border-bottom: ${border}`;
  }
  if (matchType(tabPosition, 'right')) {
    return `border-left: ${border}`;
  }
  if (matchType(tabPosition, 'left')) {
    return `border-right: ${border}`;
  }
  if (matchType(tabPosition, 'bottom')) {
    return `border-top: ${border}`;
  }
};
export const getTabpaneFocusShadow = (props: Object) => {
  const { tabType, isSelect } = props;
  const color = isSelect && tabType === 'window' ? 'rgba(104, 79, 255,0.2)' : 'none';
  return { boxShadow: `0 0 ${px2remcss(6)} ` + color };
};
export const getBackgroundShadow = (props: Object) => {
  const { tabType, disabled } = props;
  const color = tabType === 'window' && !disabled ? 'rgba(104, 79, 255,0.2)' : 'none';
  return `box-shadow: 0 ${px2remcss(-2)} ${px2remcss(6)} ` + color;
};
export const backgroundColor = (props: Object) => {
  const { tabType } = props;
  const color = matchType(tabType, 'window') ? '#f8f8f8' : 'none';
  return color;
};
export const hContainerWidth = props => {
  const { theme } = props;
  const { width } = theme;
  return `${px2remcss(width)};`;
};
export const vContainerHeight = props => {
  const { theme } = props;
  const { height } = theme;
  const theHeight = height && height !== 0 ? px2remcss(height) : '';
  return `${theHeight};`;
};
export const hContainerHeight = props => {
  const { tabType } = props;
  const theHeight = matchType(tabType, 'window') ? px2remcss(38) : px2remcss(34);
  return theHeight;
};
export const lineWidth = props => {
  const { lineWidth } = props;
  const width = lineWidth ? px2remcss(lineWidth - 40) : px2remcss(100);
  return width;
};
export const getTitlePadding = props => {
  const { hasPreIcon, tabType, hasSuffixIcon } = props;
  const leftPadding = hasPreIcon && !matchType(tabType, 'window') ? 10 : 0;
  const rightPadding = matchType(tabType, 'window') || hasSuffixIcon ? 10 : 0;
  return { padding: { right: rightPadding, left: leftPadding } };
};
export const getTabpanePadding = props => {
  const { tabType, isSelect } = props;
  const rightPadding = !matchType(tabType, 'line') ? 10 : 20;
  const bottomPadding = matchType(tabType, 'card') && isSelect ? 2 : 0;
  // return `padding: 0 ${rightPadding} ${bottomPadding} ${px2remcss(20)}`;
  return { padding: { right: rightPadding, bottom: bottomPadding, left: 20 } };
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
    (matchType(tabType, 'window') && isSelect) || (matchType(tabType, 'card') && isSelect)
      ? 'white'
      : matchType(tabType, 'card') && !isSelect
      ? '#f8f8f8'
      : 'none';
  return `background: ${background}`;
};
export const getTabpaneBorder = props => {
  const { tabType } = props;
  if (matchType(tabType, 'card')) return `border: ${px2remcss(1)} solid ${superLightColor}`;
};
export const getTabpaneMarginRight = props => {
  const { tabType } = props;
  if (matchType(tabType, 'card')) {
    return CardMarginRight;
  }
  return {};
};
export const getAddRadius = props => {
  const { tabType } = props;
  const radius = matchType(tabType, 'window') ? '50%' : px2remcss(4);
  return ` border-radius: ${radius};`;
};
export const getAddTop = props => {
  const { tabType } = props;
  if (matchType(tabType, 'window')) return `top: ${px2remcss(7)};`;
};
export const getAddRight = props => {
  const { tabType } = props;
  if (matchType(tabType, 'window')) return `right: ${px2remcss(-10)};`;
};
export const getAddButtonBottom = props => {
  const { tabType } = props;
  const bottom = matchType(tabType, 'window') ? px2remcss(10) : '-25%';
  return ` bottom: ${bottom};`;
};
export const getTabpaneBorderTopRadius = props => {
  const { tabType, isSelect } = props;
  const radius =
    (matchType(tabType, 'window') && isSelect) || matchType(tabType, 'card') ? px2remcss(4) : 0;
  return ` border-top-left-radius: ${radius}; border-top-right-radius:${radius};`;
};
export const getTabpaneHoverTransform = props => {
  const { tabType } = props;
  if (matchType(tabType, 'card')) {
    return `transform: translateX(${px2remcss(-10)}); transition: all 0.5s;`;
  }
  return '';
};
export const getTabpaneBottom = props => {
  const { tabType } = props;
  if (matchType(tabType, 'window')) return `bottom: ${px2remcss(-6)};`;
};
export const getTabpaneLeft = props => {
  const { tabType } = props;
  if (matchType(tabType, 'window')) return `left: ${px2remcss(6)};`;
};
export const getButtonShow = props => {
  const { tabType } = props;
  if (matchType(tabType, 'card')) {
    return 'opacity: 1;';
  }
  return '';
};
export const getClearButtonOpacity = props => {
  const { tabType } = props;
  const opacity = matchType(tabType, 'card') ? 0 : 1;
  return `opacity: ${opacity};`;
};
export const getArrowTop = props => {
  const { tabType } = props;
  const top = matchType(tabType, 'window') ? px2remcss(24) : '50%';
  return `top: ${top};`;
};
export const getAddButtonDisplay = props => {
  const { tabType } = props;
  const display = matchType(tabType, 'card') ? 'block !important' : 'inline-blick';
  return `display:  ${display};`;
};
export const getContainerPadding = props => {
  const { showPadding, tabPosition } = props;
  if (showPadding) {
    let hPadding = 0;
    let vPadding = 0;
    if (isVertical(tabPosition)) {
      vPadding = px2remcss(24);
    } else {
      hPadding = px2remcss(24);
    }
    return `padding: ${vPadding} ${hPadding};`;
  }
};
export const getTabpaneCursor = props => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'pointer'}`;
};
export const getTabpaneHeight = props => {
  const { theme } = props;
  const { height } = theme;
  const theHeight = height && height !== 0 ? px2remcss(height) : px2remcss(34);
  return theHeight;
};

export const getSelectedStyleByTabType = props => {
  const { tabType, isSelect } = props;
  const rightPadding = !matchType(tabType, 'line') ? 10 : 20;
  const bottomPadding = matchType(tabType, 'card') && isSelect ? 2 : 0;
  const bsColor = isSelect && matchType(tabType, 'window') ? 'rgba(104, 79, 255,0.2)' : 'none';
  const radius =
    (matchType(tabType, 'window') && isSelect) || matchType(tabType, 'card') ? px2remcss(4) : 0;
  const borderInfo = matchType(tabType, 'card')
    ? { color: superLightColor, width: 1, style: 'solid' }
    : 'none';
  const border = getBorder({ ...borderInfo }, { radius, radiusDirections: ['tl', 'tr'] });

  const background = {
    color:
      (matchType(tabType, 'window') && isSelect) || (matchType(tabType, 'card') && isSelect)
        ? 'white'
        : matchType(tabType, 'card') && !isSelect
        ? '#f8f8f8'
        : 'none',
  };
  const margin = getTabpaneMarginRight(props);
  const position = matchType(tabType, 'window') ? { type: 'relative', bottom: -6 } : {};
  return {
    padding: { right: rightPadding, bottom: bottomPadding, left: 20 },
    boxShadow: `0 0 ${px2remcss(6)} ` + bsColor,
    border,
    background,
    margin,
    position,
  };
};

export const getStyleByTabType = props => {
  const { tabType, isSelect } = props;
  const rightPadding = !matchType(tabType, 'line') ? 10 : 20;
  const bottomPadding = matchType(tabType, 'card') && isSelect ? 2 : 0;
  const bsColor = isSelect && matchType(tabType, 'window') ? 'rgba(104, 79, 255,0.2)' : 'none';
  const borderRadius =
    (matchType(tabType, 'window') && isSelect) || matchType(tabType, 'card')
      ? `${px2remcss(4)} ${px2remcss(4)} 0 0`
      : 0;
  const border = matchType(tabType, 'card') ? ` 1px solid ${superLightColor}` : 'none';
  // const border = getBorder({...borderInfo},{radius,radiusDirections:['tl','tr']});

  const background =
    (matchType(tabType, 'window') && isSelect) || (matchType(tabType, 'card') && isSelect)
      ? 'white'
      : matchType(tabType, 'card') && !isSelect
      ? '#f8f8f8'
      : 'none';
  const margin = getTabpaneMarginRight(props);
  const bottom = matchType(tabType, 'window') ? -6 : 0;
  return {
    padding: `0 ${rightPadding}px ${bottomPadding}px  ${rightPadding}px`,
    boxShadow: `0 0 ${px2remcss(6)} ` + bsColor,
    border,
    borderRadius,
    background,
    marginRight: margin,
    position: 'relative',
    bottom,
  };
};

export const getHoverStyleByTabType = props => {
  const { tabType } = props;
  const transform = matchType(tabType, 'card')
    ? `transform: translateX(${px2remcss(-10)}); transition: all 0.5s;`
    : '';
  const { disabled } = props;
  const color = disabled ? disableColor : themeColor;

  const iconColor = matchType(tabType, 'line') && !disabled ? themeColor : 'none';
  return { transform, color };
};
