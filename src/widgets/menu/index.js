/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Item from './item';
import '../css/sv.css';

type MenuProps = {
  children: React.Node
};
const MenuContainer = styled.ul`
  outline: none;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  max-height: 250px;
  overflow: auto;
`;


class Menu extends React.Component<MenuProps> {
  static MenuItem: typeof Item;

  render () {
    const { children, } = this.props;
    return <MenuContainer>{children}</MenuContainer>;
  }
}

Menu.MenuItem = Item;
export default Menu;


