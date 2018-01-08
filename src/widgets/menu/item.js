/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import * as Widget from '../consts/Widget';
import { FontSize, } from '../css';
import { BackgroundColor, MenuItemHeight, SelectIcon, } from '../css/menu';

const Utils = require('vx-var-utils');
const { ObjectUtils, } = Utils;
type MenuItemProps = {
  checked: boolean,
  mutliple: boolean,
  onClick?: Function,
  children?: React.Node
};

const getBackGroundColor = (props: MenuItemProps) => {
  return props.checked ? `
    background-color: ${BackgroundColor};
    font-weight: 600;
    color: rgba(0,0,0,.65);
    ` : '';
};
const getMulipleCheckedStyle = (props: MenuItemProps) => {
  return props.checked ? `
    :after{
      color: #108ee9;
    } 
    :hover:after{
      color: #108ee9;
    }
    ` : `
    :hover:after{
      color: #d0c8c8;
    }
    `;
};
const SingleItem = styled.li `
    box-sizing: border-box;
    position: relative;
    display: block;
    height: ${MenuItemHeight}px;
    padding: 7px 8px;
    font-weight: 400;
    color: rgba(0,0,0,.65);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background .3s ease;
    :hover {
      background-color: #ecf6fd;
    }
    ${getBackGroundColor}
`;
const MutlipleItem = SingleItem.extend `
    :after {
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
      right: 8px;
      font-weight: 700;
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    ${getMulipleCheckedStyle}
`;

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
  };
  static displayName = Widget.MenuItem;

  render () {
    const { children, mutliple, checked, onClick, } = this.props;
    const Item = mutliple ? MutlipleItem : SingleItem;
    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    return <Item checked={checked} onClick={onClick} title={title}>{children}</Item>;
  }
}

export default MenuItem;
