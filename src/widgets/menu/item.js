/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import { FontSize } from '../css';
import {
  ItemBackgroundColor,
  MenuItemHeight,
  SelectIcon,
  themeColor,
  blackColor,
} from '../css/menu';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const Utils = require('@lugia/type-utils');
const { ObjectUtils } = Utils;
type MenuItemProps = {
  checked: boolean,
  mutliple: boolean,
  onClick?: Function,
  children?: React.Node,
};

const getMulipleCheckedStyle = (props: MenuItemProps) => {
  return props.checked
    ? `
    :after{
      color: ${themeColor};
    } 
    :hover:after{
      color: ${themeColor};
    }
    `
    : `
    :hover:after{
      color: #d0c8c8;
    }
    `;
};

const getItemColor = (props: MenuItemProps) => {
  return props.checked
    ? `
    color: ${themeColor};
    font-weight: 900;
  `
    : `
    color: ${blackColor};
    font-weight: 500;
  `;
};
const SingleItem = styled.li`
  box-sizing: border-box;
  position: relative;
  display: block;
  height: ${em(MenuItemHeight)};
  padding: ${em(7)} ${em(8)};
  font-weight: 400;
  ${getItemColor};
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${ItemBackgroundColor};
    font-weight: 900;
  }
`;

const MutlipleItem = SingleItem.extend`
    &::after {
      font-family: "sviconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
      color: transparent;
      display: inline-block;
      font-size: ${FontSize};
      transform: scale(.83333333) rotate(0deg);
      zoom: 1;
      transition: all .2s ease;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${em(10)};
      font-weight: 700;
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    
    ${getMulipleCheckedStyle}
`;
MutlipleItem.displayName = 'mutlipleMenuItem';

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
  };
  static displayName = Widget.MenuItem;

  render() {
    const { children, mutliple, checked, onClick } = this.props;
    const Item = mutliple ? MutlipleItem : SingleItem;
    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    return (
      <Item onClick={onClick} title={title} checked={checked}>
        {children}
      </Item>
    );
  }
}

export default MenuItem;
