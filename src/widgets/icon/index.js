/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import '../css/sv.css';
import * as Widget from '../consts/Widget';
import ThemeProvider from '../common/ThemeProvider';
import styled from 'styled-components';

const color = (props: Object) => {
  const { color, } = props.theme;
  return color ? `color: ${color};` : '';
};
const hover = (props: Object) => {
  const { hoverColor, } = props.theme;
  return hoverColor ? `  &:hover { color: ${hoverColor}; }` : '';
};
const IconTag = styled.i`
  ${color}
  ${hover}
`;
type IconProps = {
  iconClass: string,
  onClick?: Function,
  getTheme: Function,
};

class Icon extends React.Component<IconProps> {
  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  render () {
    const { iconClass, onClick, getTheme, } = this.props;
    return <IconTag className={`iconfont ${iconClass}`}
                    onClick={onClick}
                    theme={getTheme()}> </IconTag>;
  }
}

export default ThemeProvider(Icon, Widget.Icon);
