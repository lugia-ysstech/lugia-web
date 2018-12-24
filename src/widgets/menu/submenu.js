/**
 * create by szfeng
 *
 * @flow
 */
import Menu from './index';
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import ThrolleScroller from '../scroller/ThrottleScroller';
import Widget from '../consts/index';
import Theme from '../theme';

class SubMenu extends React.Component<IconProps> {
  //   static displayName = Widget.ClearIcon;

  render() {
    const props = this.props;
    return <Menu {...props} />;
  }
}

export default ThemeProvider(ThrolleScroller(SubMenu, 35), Widget.SubMenu);
