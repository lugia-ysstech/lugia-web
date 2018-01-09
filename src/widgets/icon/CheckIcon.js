/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import * as Widget from '../consts/index';
import Icon from './';

type IconProps = {
  viewClass?: string,
  onClick?: Function,
  className?: string,
  getTheme?: Function,
  checked:boolean,
};

const UnCheck = 'sv-icon-android-checkbox-out1';
const Checked = 'sv-icon-android-checkbox';

class CheckIcon extends React.Component<IconProps> {
  static displayName = Widget.CheckIcon;
  static defaultProps = {
    checked: false,
  };
  render () {
    const iconClass = this.props.checked ? Checked : UnCheck;
    return <Icon iconClass={iconClass} key="refresh" {...this.props}></Icon>;
  }
}

export default CheckIcon;
