/**
 *
 * create by szfeng
 *
 * @flow
 */
import colorsFunc from './stateColor';
import styled from 'styled-components';
import { px2emcss } from './units';

const em = px2emcss(1.2);
export const {
  themeColor,
  darkGreyColor,
  blackColor,
  mediumGreyColor,
  defaultColor,
  spiritColor,
} = colorsFunc();
export const MenuItemHeight = 40;
export const DefaultHeight = 1000;
export const DescribeColor = '#999';
export const ItemBackgroundColor = '#edf0fe';

// const getSpiritColor = (color: string) => {
//   const { spiritColor } = colorsFunc(color);
//   return spiritColor;
// };

// const getDarkBakcgroundColor = (color: string) => {
// const darkColor = changeColor(color, -30, 80);
// return darkColor;
// };

export const Switcher = styled.span`
  font-size: ${em(14)};
  color: ${mediumGreyColor};
  display: inline-block;
  position: absolute;
  right: ${px2emcss(1.4)(10)};
  top: 0;
  margin: 0 ${em(10)};
  vertical-align: top;
`;
Switcher.displayName = 'switcherButton';

export const NullSwitcher = styled(Switcher)`
  opacity: 0;
`;

export const TreeUl = styled.ul`
  margin: 0;
`;

const getSelectIconOpacity = props => {
  const { selected } = props;
  return `opacity: ${selected ? 1 : 0}`;
};
const getChildrenSelected = props => {
  // 如果子元素有选中，则字体变 900
};

const getHeight = props => {
  const { pos, height = 40 } = props;
  const num = pos.split('-').length - 2;
  return `min-height: ${num ? `${em(height)}` : `${em(height)}`};
  line-height: ${num ? `${em(height)}` : `${em(height)}`}
    `;
};

const getLiIcon = props => {
  const { inlineType } = props;
  return inlineType === 'ellipse'
    ? ''
    : `
  ::before {
    content: '';
    width: ${em(6)};
    border-radius: ${em(4)};
    height: ${em(MenuItemHeight)};
    background: ${themeColor};
    opacity: 1;
    transition: all 0.3s;
    position: absolute;
    left: 0;
    top: 0;
    ${getSelectIconOpacity(props)};
  }
  `;
};

const getLiBackground = props => {
  const { theme, color = themeColor } = props;
  // const { color: darkBackColor } = getDarkBakcgroundColor(color);
  return `background: ${theme === 'dark' ? '#000033' : ''}`;
};

export const Li = styled.li`
  ${getLiBackground};
  ${getChildrenSelected};
  ${getHeight};
  list-style: none;
  white-space: nowrap;
  position: relative;
  outline: 0;
  overflow: hidden;
  user-select: none;
  ${getLiIcon};
`;
Li.displayName = 'liItem';

const getChildrenUlBackground = props => {
  const { inlineType } = props;
  return inlineType === 'ellipse' ? '' : `background: ${ItemBackgroundColor} `;
};

export const ChildrenUl = styled.ul`
  margin: 0;
  padding: 0;
  ${getChildrenUlBackground};
`;

function getSelected(props) {
  const { selected, inlineType, describe, theme } = props;
  if (describe) {
    return `color: ${theme === 'light' ? '#bbb' : DescribeColor}`;
  }
  if (inlineType === 'ellipse') {
    return selected
      ? `color: ${defaultColor};
      &:hover {
        color: ${defaultColor};
      }
      `
      : `color: ${theme === 'dark' ? defaultColor : blackColor};
    &:hover {
      color: ${themeColor};
    }
    `;
  }
  return selected
    ? `color: ${themeColor}; font-weight: 900;
    &:hover {
      color: ${themeColor};
    }
    `
    : `color: ${theme === 'dark' ? defaultColor : blackColor};
  &:hover {
    color: ${themeColor};
  }
  `;
}

const getTitleWrapPadding = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return num
    ? `padding: 0 ${px2emcss(1.4)(40)} 0 ${px2emcss(1.4)(10 + num * 10)}`
    : `padding: 0 ${px2emcss(1.6)(40)} 0 ${px2emcss(1.6)(10 + num * 10)}`;
};

const getFontSize = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return `font-size: ${num ? em(14) : em(16)}`;
};

const getTitleWrapBackground = props => {
  const { theme, pos, inlineType } = props;
  const num = pos.split('-').length - 2;
  return theme === 'dark' && inlineType === 'primary' && num === 0
    ? 'background: rgba(255, 255, 255, 0.1)'
    : '';
};
export const TitleWrap = styled.span`
  ${getTitleWrapBackground};
  ${getFontSize};
  ${getTitleWrapPadding};
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  vertical-align: top;
  transition: opacity 0.5s ease;
  ${getSelected};
`;

const getBorderRadius = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return `
    border-radius: ${num ? em(60) : em(40)};
  `;
};

const getTitleSpanPadding = props => {
  const { pos, paddingLeft = 20 } = props;
  const num = pos.split('-').length - 2;
  return num ? `padding-left: ${px2emcss(1.4)(paddingLeft)}` : `padding-left: ${px2emcss(1.6)(20)}`;
};

const getSelectedBackground = props => {
  const { inlineType, selected, theme } = props;
  if (inlineType === 'ellipse') {
    return selected
      ? `background: linear-gradient(to right, ${themeColor}, #808eff);`
      : `background: ${theme === 'dark' ? '#000033' : defaultColor};`;
  }
  return 'background: transparent;';
};

const getTitleSpanHeight = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return num ? px2emcss(1.4)(32) : px2emcss(1.6)(32);
};

export const TitleSpan = styled.span`
  height: ${getTitleSpanHeight};
  line-height: ${getTitleSpanHeight};
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  ${getTitleSpanPadding};
  ${getBorderRadius};
  ${getSelectedBackground};
`;
TitleSpan.displayName = 'titleSpan';
