/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import * as Widget from '../consts/Widget';
import Icon from './';
type IconProps = {
  viewClass?: string,
  onClick?: Function,
  getTheme?: Function,
};

class ClearIcon extends React.Component<IconProps> {
  static displayName = Widget.ClearIcon;


  render () {
    return <Icon iconClass="sv-icon-android-close" key="refresh" {...this.props}></Icon>;
  }
}

export default ClearIcon;
