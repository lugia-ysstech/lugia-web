/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';

type MenuItemProps = {
  children: React.Node
};
const CloseIcon = '\\e73e';
const ItemContainer = styled.li `
    position: relative;
    display: block;
    padding: 7px 8px;
    font-weight: 400;
    color: rgba(0,0,0,.65);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    transition: background .3s ease;
    :hover {
      background-color: #ecf6fd;
    }
    :hover:after{
      color: #ddd;
    }
    :after {
      font-family: "iconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${CloseIcon}";
      color: transparent;
      display: inline-block;
      font-size: 14px;
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
`;

class MenuItem extends React.Component<MenuItemProps> {

  render () {
    const { children, } = this.props;
    return <ItemContainer>{children}</ItemContainer>;
  }
}

export default MenuItem;
