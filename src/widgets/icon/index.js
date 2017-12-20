/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/sv.css';
import * as Widget from '../consts/Widget';
import ThemeProvider from '../common/ThemeProvider';
import styled from 'styled-components';

const getColor = (props: Object) => {
  const { color, } = props.theme;
  return color ? `color: ${color};` : '';
};
const hover = (props: Object) => {
  const { hoverColor, } = props.theme;
  return hoverColor ? `  &:hover { color: ${hoverColor}; }` : '';
};
const IconTag = styled.i`
  user-select: none;
  cursor: pointer;
  ${getColor}
  ${hover}
`;
type IconProps = {
  className?: string,
  iconClass: string,
  onClick?: Function,
  getTheme: Function,
};

class Icon extends React.Component<IconProps> {
  static displayName = Widget.Icon;

  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  render () {
    const { iconClass, onClick, getTheme, className = '', } = this.props;
    return <IconTag className={`iconfont ${iconClass} ${className}`}
                    onClick={onClick}
                    theme={getTheme()}> </IconTag>;
  }
}

export default ThemeProvider(Icon, Widget.Icon);
