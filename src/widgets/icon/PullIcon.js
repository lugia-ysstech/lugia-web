/**
 *
 * create by liangguodong on 2018/7/2
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

class PullIcon extends React.Component<IconProps> {
  static displayName = Widget.PullIcon;

  render() {
    return <Icon iconClass="lugia-icon-direction_down" key="refresh" {...this.props} />;
  }
}

export default PullIcon;
