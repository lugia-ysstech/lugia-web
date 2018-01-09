/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import Icon from './';
type IconProps = {
  viewClass?: string,
  onClick?: Function,
  getTheme?: Function,
};

class RefershIcon extends React.Component<IconProps> {
  static displayName = Widget.RefershIcon;


  render () {
    return <Icon iconClass="sv-icon-android-refresh" key="refresh" {...this.props}></Icon>;
  }
}

export default RefershIcon;
