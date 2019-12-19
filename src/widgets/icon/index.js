/**
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/font/lugia-icon.css';
import { px2remcss } from '../css/units';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import CSSComponent, { css, StaticComponent } from '../theme/CSSProvider';

const getNormalFontSize = (themeConfig: object) => {
  const { normal = {} } = themeConfig;
  const { fontSize, font = {} } = normal;
  const { size } = font;
  return fontSize ? fontSize : size ? size : 14;
};

const IconImgWrap = CSSComponent({
  tag: 'i',
  className: 'iconImgWrap',
  normal: {
    selectNames: [['margin'], ['padding'], ['fontSize'], ['font'], ['cursor']],
    getCSS: (themeMeta, themeProps) => {
      const { themeConfig } = themeProps;
      const activeFontSize = getNormalFontSize(themeConfig);
      return `
        width: ${px2remcss(activeFontSize)};
        height: ${px2remcss(activeFontSize)};
        text-align: center;
        
        & img{
          max-width: 100%;
          max-height: 100%;
        }
      `;
    },
    defaultTheme: {},
  },
  hover: {
    selectNames: [['fontSize'], ['font']],
    getCSS: (themeMeta, themeProps) => {
      const { fontSize, font = {} } = themeMeta;
      const { size } = font;
      const { themeConfig } = themeProps;
      const activeFontSize = fontSize ? fontSize : size ? size : getNormalFontSize(themeConfig);
      return `
        width: ${px2remcss(activeFontSize)};
        height: ${px2remcss(activeFontSize)};
        text-align: center;
        
        & img{
          max-width: 100%;
          max-height: 100%;
        }
      `;
    },
  },
  active: {
    selectNames: [['fontSize'], ['font']],
    getCSS: (themeMeta, themeProps) => {
      const { fontSize, font = {} } = themeMeta;
      const { size } = font;
      const { themeConfig } = themeProps;
      const activeFontSize = fontSize ? fontSize : size ? size : getNormalFontSize(themeConfig);
      return `
        width: ${px2remcss(activeFontSize)};
        height: ${px2remcss(activeFontSize)};
        text-align: center;

        & img{
          max-width: 100%;
          max-height: 100%;
        }
      `;
    },
  },
  disabled: {
    selectNames: [['cursor']],
  },
  css: `
    display: inline-block;
    box-sizing: content-box
  `,
});

export const FlexBox = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `,
});

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
  onClick?: Function,
  getTheme: Function,
  themeProps: Object,
  singleTheme?: boolean,
  getPartOfThemeProps: Function,
  disabled: boolean,
  src?: string,
};

class Icon extends React.Component<IconProps> {
  static displayName = Widget.Icon;

  static defaultProps = {};
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
      src,
    } = this.props;

    if (src) {
      return (
        <IconImgWrap
          onClick={this.onClick}
          themeProps={singleTheme ? themeProps : getPartOfThemeProps('Icon')}
          disabled={disabled}
          {...addMouseEvent(this)}
        >
          <FlexBox>
            <img src={src} />
          </FlexBox>
        </IconImgWrap>
      );
    }
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
