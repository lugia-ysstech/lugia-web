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
  mutliple: boolean,
  children: React.ChildrenArray<React.Element<typeof Item>>,
  selectKeys?: Array<string>,
};
const MenuContainer = styled.ul`
  outline: none;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  max-height: 250px;
  overflow: auto;
`;


type MenuItemProps = {|
  checked?: boolean,
  mutliple: boolean,
|} ;

class Menu extends React.Component<MenuProps> {
  static MenuItem: typeof Item;
  static defaultProps = {
    mutliple: false,
  };

  render () {
    const { children, } = this.props;
    const items = [];
    if (children !== null) {
      React.Children.forEach(children, (child: React.Element<typeof Item>) => {
        items.push(this.renderMenuItem(child));
      });
    }
    return <MenuContainer>{items}</MenuContainer>;
  }

  renderMenuItem = (child: React.Element<typeof Item>) => {
    const { key, } = child;
    return React.cloneElement(child, this.fetchExtendProps(key));
  };

  fetchExtendProps (key?: null | number | string): MenuItemProps {
    const { mutliple, selectKeys, } = this.props;
    if (!key || !this.isSelect(selectKeys)(key)) {
      return { mutliple, };
    }
    return { checked: true, mutliple, };
  }

  isSelect (selectedKeys?: Array<string>): (number | string) => boolean {
    const existKey = {};
    selectedKeys && selectedKeys.forEach(key => {
      existKey[ key ] = true;
    });
    return (key: number | string) => {
      return existKey[ key ];
    };
  }
}

Menu.MenuItem = Item;
export default Menu;


