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

class ClearIcon extends React.Component<IconProps> {
  static displayName = Widget.ClearIcon;

  render() {
    return <Icon iconClass="lugia-icon-reminder_close_circle_o" key="refresh" {...this.props} />;
  }
}

export default ClearIcon;
