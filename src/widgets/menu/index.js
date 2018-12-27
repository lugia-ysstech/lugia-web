import * as React from 'react';
import Menu from './menu';
import { getMenuItemHeight } from '../css/menu';
export default class ThrottleMenu extends React.Component<any, any> {
  constructor(props: CascaderProps) {
    super(props);
    this.menu = React.createRef();
  }

  render() {
    const { props } = this;
    const { size = 'default' } = props;
    const menuItemHeight = getMenuItemHeight(size);
    return <Menu ref={this.menu} {...props} menuItemHeight={menuItemHeight} />;
  }
}
