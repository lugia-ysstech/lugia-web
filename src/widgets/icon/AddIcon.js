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

class AddIcon extends React.Component<IconProps> {
  static displayName = Widget.AddIcon;

  render () {
    return <Icon iconClass="sv-icon-plus" key="refresh" {...this.props}></Icon>;
  }
}

export default AddIcon;
