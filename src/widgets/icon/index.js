/**
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/font/lugia-icon.css';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import styled from 'styled-components';
import { getMargin } from '../common/ThemeUtils';
import { px2rem } from '../css/units';
const getColor = (props: Object) => {
  const { color } = props.theme;
  return color ? `color: ${color};` : '';
};
const hover = (props: Object) => {
  const { hoverColor } = props.theme;
  return hoverColor ? `  &:hover { color: ${hoverColor}; }` : '';
};
const getFontSize = (props: Object) => {
  const { theme } = props;
  const { fontSize } = theme;
  const theFontSize = fontSize && fontSize !== 0 ? `${px2rem(fontSize)}rem` : '1.2rem';
  return `font-size:${theFontSize}`;
};
const IconTag = styled.i`
  user-select: none;
  cursor: pointer;
  ${getFontSize};
  ${getColor} ${hover};
  ${getMargin};
`;
type IconProps = {
  className?: string,
  iconClass: string,
  style: Object,
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

  render() {
    const {
      iconClass = 'lugia-icon-logo_lugia',
      onClick,
      getTheme,
      className = '',
      style,
    } = this.props;
    return (
      <IconTag
        className={`${iconClass} ${className}`}
        onClick={onClick}
        theme={getTheme()}
        style={style}
      />
    );
  }
}

export default ThemeProvider(Icon, Widget.Icon);
