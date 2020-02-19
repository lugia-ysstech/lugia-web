/**
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import '../css/font/lugia-icon.css';
import '../css/font/lugia-symbol-icon.css';
import { px2remcss } from '../css/units';
import Widget from '../consts/index';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import CSSComponent, { css, StaticComponent } from '../theme/CSSProvider';
import Svg from './Svg';
import { deepMerge } from '@lugia/object-utils';
const getNormalFontSize = (themeConfig: Object) => {
  const { normal: { fontSize, font: { size } = {} } = {} } = themeConfig;

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
      const { fontSize, font: { size } = {} } = themeMeta;
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
    selectNames: [
      ['color'],
      ['margin'],
      ['fontSize'],
      ['font'],
      ['padding'],
      ['cursor'],
      ['opacity'],
    ],
    defaultTheme: { cursor: 'pointer' },
    getCSS: (themeMeta, themeProps) => {
      console.log('themeMeta', themeMeta);
      return getSymbolStyle(themeMeta, themeProps);
    },
  },
  hover: {
    selectNames: [['color'], ['margin'], ['cursor'], ['fontSize'], ['font'], ['opacity']],
    getCSS: (themeMeta, themeProps) => {
      return getSymbolStyle(themeMeta, themeProps);
    },
  },
  active: {
    selectNames: [['color'], ['cursor'], ['fontSize'], ['font'], ['opacity']],
    getCSS: (themeMeta, themeProps) => {
      return getSymbolStyle(themeMeta, themeProps);
    },
  },
  disabled: {
    selectNames: [['color'], ['cursor'], ['opacity']],
    defaultTheme: { cursor: 'not-allowed' },
    getCSS: (themeMeta, themeProps) => {
      return getSymbolStyle(themeMeta, themeProps);
    },
  },
  css: css`
    user-select: none;
  `,
});

function getSymbolStyle(themeMeta, themeProps) {
  const { fontSize, font: { size } = {} } = themeMeta;
  const {
    propsConfig: { isSymbol },
  } = themeProps;

  if (isSymbol) {
    console.log('themeMeta', themeMeta);
    const iconSize = fontSize || size || 20;
    return `

    width:${iconSize}px;
    height:${iconSize}px;
    display:inline-block;

    & > svg{
        width:${iconSize}px;
        height:${iconSize}px;
    }

    `;
  }
  return '';
}
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

    const isSymbolIcon = iconClass.startsWith('lugia-symbol-icon') && !disabled;
    const iconClassName = isSymbolIcon ? {} : { className: `${iconClass} ${className}` };
    const deepMergeTheme = deepMerge(getPartOfThemeProps('Icon'), {
      propsConfig: { isSymbol: isSymbolIcon },
    });

    return (
      <IconTag
        {...iconClassName}
        onClick={this.onClick}
        themeProps={singleTheme ? themeProps : deepMergeTheme}
        disabled={disabled}
        {...addMouseEvent(this)}
      >
        {isSymbolIcon ? <Svg iconClass={iconClass} /> : null}
      </IconTag>
    );
  }
}

export default ThemeHoc(Icon, Widget.Icon, { hover: true, active: true });
