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
export const { themeColor, darkGreyColor, mediumGreyColor } = colorsFunc();
export const MenuItemHeight = 34;
export const DefaultHeight = 250;
export const ItemBackgroundColor = '#edf0fe';

export const Switcher = styled.span`
  font-size: ${em(12)};
  color: ${mediumGreyColor};
  display: inline-block;
  margin: 0 ${em(10)};
  vertical-align: top;
`;
Switcher.displayName = 'switcherButton';

export const NullSwitcher = Switcher.extend`
  opacity: 0;
`;

export const TreeUl = styled.ul`
  padding-right: ${em(18)};
  margin: 0;
`;

export const Li = styled.li`
  min-height: ${em(MenuItemHeight)};
  line-height: ${em(MenuItemHeight)};
  list-style: none;
  white-space: nowrap;
  outline: 0;
  overflow: hidden;
`;
Li.displayName = 'liItem';

export const ChildrenUl = styled.ul`
  margin: 0;
  padding: 0 0 0 ${em(18)};
`;

function getChecked(props) {
  if (props.checked) {
    return `color: ${themeColor}`;
  }
  return `color:${darkGreyColor}`;
}

function getCheckedStyled(props) {
  if (props.notCanSelect) {
    return `color: ${mediumGreyColor}`;
  }

  return props.selected ? `background-color: ${ItemBackgroundColor}` : null;
}

const getCursor = (props: Object) => {
  const { disabled } = props;
  return `cursor: ${disabled ? 'not-allowed' : 'pointer'}`;
};

export const TitleWrap = styled.span`
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding-left: ${em(6)};
  display: inline-block;
  ${getCursor};
  text-decoration: none;
  vertical-align: top;
  transition: all 0.5s ease;
  font-size: ${em(14)};
  ${getChecked};
  ${getCheckedStyled};
  &:hover {
    background-color: ${ItemBackgroundColor};
  }
`;

export const TitleSpan = styled.span`
  opacity: 1;
`;
TitleSpan.displayName = 'titleSpan';
