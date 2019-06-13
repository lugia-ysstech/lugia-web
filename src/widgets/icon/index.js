/**
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/font/lugia-icon.css';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css } from '../theme/CSSProvider';

const IconTag = CSSComponent({
  tag: 'i',
  className: 'iconTag',
  normal: {
    selectNames: [['color'], ['margin'], ['fontSize'], ['padding'], ['cursor']],
  },
  hover: {
    selectNames: [['color'], ['margin'], ['cursor']],
  },
  css: css`
    user-select: none;
    cursor: pointer;
  `,
});
type IconProps = {
  className?: string,
  iconClass: string,
  style: Object,
  onClick?: Function,
  getTheme: Function,
  themeProps: Object,
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
      themeProps,
      className = '',
      style,
    } = this.props;
    return (
      <IconTag
        className={`${iconClass} ${className}`}
        onClick={onClick}
        themeProps={themeProps}
        style={style}
      />
    );
  }
}

export default ThemeHoc(Icon, Widget.Icon, { hover: true });
