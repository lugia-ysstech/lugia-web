/**
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/font/lugia-icon.css';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import CSSComponent, { css } from '../theme/CSSProvider';

const IconTag = CSSComponent({
  tag: 'i',
  className: 'iconTag',
  normal: {
    selectNames: [['color'], ['margin'], ['fontSize'], ['padding'], ['cursor']],
    defaultTheme: { cursor: 'pointer' },
  },
  hover: {
    selectNames: [['color'], ['margin'], ['cursor']],
  },
  active: {
    selectNames: [['color'], ['cursor']],
  },
  disabled: {
    selectNames: [['color'], ['cursor']],
  },
  css: css`
    user-select: none;
  `,
});
type IconProps = {
  className?: string,
  iconClass: string,
  style: Object,
  onClick?: Function,
  getTheme: Function,
  themeProps: Object,
  disabled: boolean,
};

class Icon extends React.Component<IconProps> {
  static displayName = Widget.Icon;

  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };
  onClick = e => {
    const { disabled, onClick } = this.props;
    if (disabled) {
      return;
    }
    onClick && onClick(e);
  };
  render() {
    const {
      iconClass = 'lugia-icon-logo_lugia',
      themeProps,
      className = '',
      style,
      disabled,
    } = this.props;
    return (
      <IconTag
        className={`${iconClass} ${className}`}
        onClick={this.onClick}
        themeProps={themeProps}
        style={style}
        disabled={disabled}
        {...addMouseEvent(this)}
      />
    );
  }
}

export default ThemeHoc(Icon, Widget.Icon, { hover: true, active: true });
