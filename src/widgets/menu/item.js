/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';

type MenuItemProps = {
  checked: boolean,
  mutliple: boolean,
  children?: React.Node
};
const SelectIcon = '\\e73e';
const singleChecked = (props: MenuItemProps) => {
  return props.checked ? `
    background-color: #f7f7f7;
    font-weight: 600;
    color: rgba(0,0,0,.65);
    ` : '';
};
const mulipleChecked = (props: MenuItemProps) => {
  return props.checked ? `
    :after{
      color: #108ee9;
    } 
    :hover:after{
      color: #108ee9;
    }
    ` : '';
};
const SingleItem = styled.li `
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
    ${singleChecked}
`;
const MutlipleItem = SingleItem.extend `
    :after {
      font-family: "iconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
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
    ${mulipleChecked}
`;

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
  };

  render () {
    const { children, mutliple, } = this.props;
    const Item = mutliple ? MutlipleItem : SingleItem;
    return <Item {...this.props}>{children}</Item>;
  }
}

export default MenuItem;
