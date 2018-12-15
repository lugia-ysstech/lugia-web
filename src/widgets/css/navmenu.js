/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2emcss } from './units';
const em = px2emcss(1.2);
export const {
  themeColor,
  darkGreyColor,
  blackColor,
  mediumGreyColor,
  defaultColor,
} = colorsFunc();
export const MenuItemHeight = 60;
export const DefaultHeight = 1000;
export const ItemBackgroundColor = '#edf0fe';
const { hoverColor } = colorsFunc(themeColor);

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

export const NullSwitcher = Switcher.extend`
  opacity: 0;
`;

export const TreeUl = styled.ul`
  /* padding-right: ${em(18)}; */
  margin: 0;
  border-right: 1px solid #ccc;
  box-shadow: 1px 0 1px 1px #ccc;
`;

const getSelectIconOpacity = props => {
  const { selected } = props;
  return `opacity: ${selected ? 1 : 0}`;
};
const getChildrenSelected = props => {
  // 如果子元素有选中，则字体变 900
};

const getHeight = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return `min-height: ${num ? `${em(40)}` : `${em(60)}`};
  line-height: ${num ? `${em(40)}` : `${em(60)}`}
    `;
};

const getLiIcon = props => {
  const { type } = props;
  return type === 'ellipse'
    ? ''
    : `
  ::before {
    content: '';
    width: ${em(4)};
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

export const Li = styled.li`
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
  const { type } = props;
  return type === 'ellipse' ? '' : `background: ${ItemBackgroundColor} `;
};

export const ChildrenUl = styled.ul`
  margin: 0;
  padding: 0;
  ${getChildrenUlBackground};
`;

function getSelected(props) {
  const { selected, type } = props;
  if (type === 'ellipse') {
    return selected
      ? `color: ${defaultColor};
      &:hover {
        color: ${defaultColor};
      }
      `
      : `color: ${blackColor};
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
    : `color: ${blackColor};
  &:hover {
    color: ${themeColor};
  }
  `;
}

const getTitleWrapPadding = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return num
    ? `padding: 0 ${px2emcss(1.4)(40)} 0 ${px2emcss(1.4)(20 + num * 10)}`
    : `padding: 0 ${px2emcss(1.6)(40)} 0 ${px2emcss(1.6)(20 + num * 10)}`;
};

const getFontSize = props => {
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return `font-size: ${num ? em(14) : em(16)}`;
};

export const TitleWrap = styled.span`
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
  const { pos } = props;
  const num = pos.split('-').length - 2;
  return num ? `padding-left: ${px2emcss(1.4)(20)}` : `padding-left: ${px2emcss(1.6)(20)}`;
};

const getSelectedBackground = props => {
  const { type, selected } = props;
  if (type === 'ellipse') {
    return selected ? `background: ${themeColor};` : `background: ${defaultColor};`;
  }
  return 'background: transparent;';
};

export const TitleSpan = styled.span`
  opacity: 1;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s;
  ${getTitleSpanPadding};
  ${getBorderRadius};
  ${getSelectedBackground};
`;
TitleSpan.displayName = 'titleSpan';
