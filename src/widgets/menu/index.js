import * as React from 'react';
import Menu from './menu';
import { getMenuItemHeight } from '../css/menu';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import Item from './item';
import { getTreeData } from './utils';

class ThrottleMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.innerMenu = React.createRef();
  }

  render() {
    const { props } = this;
    const { data = [], children, getPartOfThemeConfig, __treeData__, separator = '|' } = props;
    const treeData =
      __treeData__ && __treeData__.length !== 0 ? __treeData__ : getTreeData(data, separator);
    const menuItemThemeConfig = getPartOfThemeConfig('MenuItem');
    const menuItemHeight = getMenuItemHeight(menuItemThemeConfig, props);
    return (
      <Menu ref={this.innerMenu} {...props} menuItemHeight={menuItemHeight} treeData={treeData}>
        {children}
      </Menu>
    );
  }
}

const MenuWrap = ThemeHoc(ThrottleMenu, Widget.Menu, {
  hover: true,
});

MenuWrap.MenuItem = Item;
export default MenuWrap;
