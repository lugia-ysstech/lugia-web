/**
 *
 * create by ligx
 *
 * @flow
 */
import type { SizeType } from '../menu/item';

import colorsFunc from './stateColor';
import styled from 'styled-components';
import { FontSizeNumber } from './';
import { px2emcss } from './units';
import CommonIcon from '../icon';
const em = px2emcss(FontSizeNumber);
export const { themeColor, disableColor, blackColor, lightGreyColor, defaultColor } = colorsFunc();
export const DefaultMenuItemHeight = 35;
export const LargeMenuItemHeight = 60;
export const BiggerMenuItemHeight = 40;
export const MenuItemHeight = 35;
export const DefaultHeight = 250;
export const DefaultWidth = 250;
export const ItemBackgroundColor = '#edf0fe';
export const SelectIcon = '\\e73e';
export const Height = 30;

export const getMenuItemHeight = (size: SizeType) => {
  return size === 'large'
    ? LargeMenuItemHeight
    : size === 'bigger'
    ? BiggerMenuItemHeight
    : DefaultMenuItemHeight;
};

export const TextIcon: Object = styled(CommonIcon)`
  display: inline-block;
  position: relative;
  padding-right: ${em(6)};
  top: ${em(1.5)};
`;
export const RightIcon = styled.span`
  position: absolute;
  right: ${em(12)};
  top: 50%;
  transform: translateY(-50%);
`;

const getMaxHeight = props => {
  const { theme, length, size, autoHeight = false } = props;
  const { height: themeHeight } = theme;
  let height;
  if (!autoHeight && !themeHeight) {
    height = DefaultHeight;
  } else if (themeHeight || themeHeight === 0) {
    height = themeHeight;
  } else {
    const menuItemHeight = getMenuItemHeight(size);

    height = menuItemHeight * length;
  }
  return `${em(height)}`;
};

const getHeight = props => {
  const { theme, length, size, autoHeight = false } = props;
  const { height: themeHeight } = theme;
  let height;
  if (autoHeight) {
    const menuItemHeight = getMenuItemHeight(size);
    height = menuItemHeight * length;
  } else {
    height = themeHeight || themeHeight === 0 ? themeHeight : DefaultHeight;
  }
  return `${em(height)}`;
};

const getWidth = props => {
  const { theme } = props;
  const { width } = theme;
  return `width: ${em(width)}`;
};
export const MenuContainer = styled.ul`
  font-size: ${FontSizeNumber}rem;
  ${getWidth};
  outline: none;
  margin: 0;
  user-select: none;
  padding-left: 0;
  list-style: none;
  height: ${getHeight};
  max-height: ${getMaxHeight};
  overflow: hidden;
`;
