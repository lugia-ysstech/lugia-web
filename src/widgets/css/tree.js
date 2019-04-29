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
export const { themeColor, darkGreyColor, mediumGreyColor, hoverColor, spiritColor } = colorsFunc();
export const MenuItemHeight = 34;
export const DefaultHeight = 250;
export const ItemBackgroundColor = '#edf0fe';

const getSwitcherMargin = (props: Object) => {
  const { mutliple } = props;
  return `margin-right: ${mutliple ? em(10) : '0'}`;
};

export const Switcher = styled.span`
  font-size: ${em(12)};
  color: ${mediumGreyColor};
  display: inline-block;
  margin-left: ${em(5)};
  vertical-align: top;
  ${getSwitcherMargin};
`;
Switcher.displayName = 'switcherButton';

export const NullSwitcher = styled(Switcher)`
  opacity: 0;
`;

export const TreeUl = styled.ul`
  margin: 0;
  overflow: hidden;
  padding-right: ${em(20)};
`;

export const Li = styled.li`
  min-height: ${em(MenuItemHeight)};
  line-height: ${em(MenuItemHeight)};
  list-style: none;
  padding-right: ${em(12)};
  white-space: nowrap;
  outline: 0;
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

  return props.selected ? 'background-color: rgba(77,99,255,0.2)' : null;
}

const getCursor = (props: Object) => {
  const { disabled } = props;
  return `cursor: ${disabled ? 'not-allowed' : 'pointer'}`;
};

const getHoverStyled = (props: Object) => {
  const { notCanSelect, selected, disabled } = props;
  return notCanSelect || selected || disabled
    ? ''
    : `&:hover {
    background-color: ${spiritColor};
  }`;
};

const getBorderRadius = (props: Object) => {
  const { shape } = props;
  return `border-radius: ${shape === 'round' ? em(35) : em(4)}`;
};

export const TitleWrap = styled.span`
  width: 100%;
  overflow: hidden;
  vertical-align: top;
  display: inline-block;
  text-decoration: none;
  box-sizing: border-box;
  padding-left: ${em(10)};
  transition: all 0.5s ease;
  font-size: ${em(14)};
  ${getCursor};
  ${getChecked};
  ${getHoverStyled};
  ${getBorderRadius}
  ${getCheckedStyled};
`;

export const TitleSpan = styled.span`
  opacity: 1;
`;
TitleSpan.displayName = 'titleSpan';
