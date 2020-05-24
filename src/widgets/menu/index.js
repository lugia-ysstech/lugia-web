import * as React from 'react';
import Menu from './menu';
import { getMenuItemHeight } from '../css/menu';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import Item from './item';

class ThrottleMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.innerMenu = React.createRef();
  }

  render() {
    const { props } = this;
    const { children, getPartOfThemeConfig } = props;
    const menuItemThemeConfig = getPartOfThemeConfig('MenuItem');
    const menuItemHeight = getMenuItemHeight(menuItemThemeConfig, props);
    return (
      <Menu ref={this.innerMenu} {...props} menuItemHeight={menuItemHeight}>
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
