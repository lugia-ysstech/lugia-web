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
    selectNames: [['color'], ['margin'], ['fontSize'], ['font'], ['padding'], ['cursor']],
    defaultTheme: { cursor: 'pointer' },
  },
  hover: {
    selectNames: [['color'], ['margin'], ['cursor'], ['fontSize'], ['font']],
  },
  active: {
    selectNames: [['color'], ['cursor'], ['fontSize'], ['font']],
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
  singleTheme?: boolean,
  getPartOfThemeProps: Function,
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
      className = '',
      disabled,
      themeProps,
      getPartOfThemeProps,
      singleTheme = false,
    } = this.props;
    return (
      <IconTag
        className={`${iconClass} ${className}`}
        onClick={this.onClick}
        themeProps={singleTheme ? themeProps : getPartOfThemeProps('Icon')}
        disabled={disabled}
        {...addMouseEvent(this)}
      />
    );
  }
}

export default ThemeHoc(Icon, Widget.Icon, { hover: true, active: true });
