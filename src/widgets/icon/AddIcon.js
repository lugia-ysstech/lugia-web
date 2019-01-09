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

  render() {
    return <Icon iconClass="lugia-icon-reminder_plus_circle_o" key="refresh" {...this.props} />;
  }
}

export default AddIcon;
