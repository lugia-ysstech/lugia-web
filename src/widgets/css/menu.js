/**
 *
 * create by ligx
 *
 * @flow
 */
import colorsFunc from './stateColor';
import styled from 'styled-components';
import { FontSizeNumber } from './';
import { px2emcss } from './units';
import CommonIcon from '../icon';
const em = px2emcss(FontSizeNumber);

export const { themeColor, disableColor, blackColor, lightGreyColor, defaultColor } = colorsFunc();
export const MenuItemHeight = 35;
export const DefaultHeight = 250;
export const DefaultWidth = 250;
export const ItemBackgroundColor = '#edf0fe';
export const SelectIcon = '\\e73e';
export const Height = 30;

export const LeftIcon = styled(CommonIcon)`
  font-size: ${em(12)};
  padding-right: ${px2emcss(1.2)(10)};
`;
export const RightIcon = styled.span`
  position: absolute;
  right: ${em(12)};
  top: 50%;
  transform: translateY(-50%);
`;

const getHeight = props => {
  const { theme } = props;
  const { height: themeHeight } = theme;
  const height = themeHeight || themeHeight === 0 ? themeHeight : DefaultHeight;
  return `${em(height)}`;
};
const getWidth = props => {
  const { theme, level } = props;
  const { width, submenuWidth } = theme;
  if (level === 0) {
    return width ? `width: ${em(width)};` : '';
  }
  return submenuWidth ? `width: ${em(submenuWidth)};` : '';
};
export const MenuContainer = styled.ul`
  ${getWidth};
  outline: none;
  margin: 0;
  user-select: none;
  padding-left: 0;
  list-style: none;
  height: ${getHeight};
  max-height: ${getHeight};
  overflow: hidden;
`;
