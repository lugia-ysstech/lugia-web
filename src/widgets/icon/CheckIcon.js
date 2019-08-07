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
  className?: string,
  getTheme?: Function,
  checked: boolean,
};

const UnCheck = 'lugia-icon-reminder_close_square_o';
const Checked = 'lugia-icon-reminder_check_square_o';

class CheckIcon extends React.Component<IconProps> {
  static displayName = Widget.CheckIcon;
  static defaultProps = {
    checked: false,
  };
  render() {
    const iconClass = this.props.checked ? Checked : UnCheck;
    return <Icon iconClass={iconClass} key="refresh" {...this.props} />;
  }
}

export default CheckIcon;
