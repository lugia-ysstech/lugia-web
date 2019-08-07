import * as React from 'react';
import Menu from './menu';
import { getMenuItemHeight } from '../css/menu';
import Item from './item';

class ThrottleMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.innerMenu = React.createRef();
  }

  render() {
    const { props } = this;
    const { size = 'default', children } = props;
    const menuItemHeight = getMenuItemHeight(size);
    return (
      <Menu ref={this.innerMenu} {...props} menuItemHeight={menuItemHeight}>
        {children}
      </Menu>
    );
  }
}

ThrottleMenu.MenuItem = Item;
export default ThrottleMenu;
