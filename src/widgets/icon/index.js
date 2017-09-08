/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import '../css/sv.css';

type IconProps = {
  iconClass: string,
  onClick?: Function,
};

class Icon extends React.Component<IconProps> {
  render () {
    const { iconClass, onClick, } = this.props;
    return <i className={`iconfont ${iconClass}`} onClick={onClick}> </i>;
  }
}

export default Icon;
