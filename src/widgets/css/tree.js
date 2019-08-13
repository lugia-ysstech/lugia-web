/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import colorsFunc from './stateColor';
import { px2remcss } from './units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';

export const {
  themeColor,
  darkGreyColor,
  mediumGreyColor,
  hoverColor,
  spiritColor,
  mouseDownColor,
  lightGreyColor,
} = colorsFunc();

export const TreeItemHeight = 35;
export const DefaultHeight = 250;
export const ItemBackgroundColor = '#edf0fe';

export const Switch = CSSComponent({
  tag: 'span',
  className: 'Switch',
  normal: {
    selectNames: [['color'], ['font']],
  },
  hover: {
    selectNames: [['color'], ['font']],
  },
  active: {
    selectNames: [['color'], ['font']],
  },
  disabled: {
    selectNames: [['color'], ['font']],
  },
  css: css`
    font-size: ${px2remcss(14)};
    color: ${mediumGreyColor};
    display: inline-block;
    padding: 0 ${px2remcss(5)};
    vertical-align: top;
    transition: all 0.3s;
  `,
  option: { hover: true, active: true },
});
Switch.displayName = 'switcherButton';

export const NullSwitch = CSSComponent({
  extend: Switch,
  className: 'NullSwitch',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    opacity: 0;
  `,
});

export const TreeUl = CSSComponent({
  tag: 'ul',
  className: 'TreeUl',
  normal: {
    selectNames: [['width'], ['background'], ['padding', 'left'], ['padding', 'right']],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { top } = propsConfig;
      return `
        top: ${px2remcss(top)}
      `;
    },
  },
  hover: {
    selectNames: [['background']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  `,
  option: { hover: true },
});

export const Li = StaticComponent({
  tag: 'li',
  className: 'Li',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    min-height: ${px2remcss(30)};
    list-style: none;
    white-space: nowrap;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
  `,
});
Li.displayName = 'liItem';

const getSelectIconOpacity = selected => {
  return `opacity: ${selected ? 1 : 0}`;
};

const getLiIcon = (inlineType, itemHeight, selected) => {
  const opacity = getSelectIconOpacity(selected);
  return inlineType === 'ellipse'
    ? ''
    : `
  ::before {
    content: '';
    width: ${px2remcss(6)};
    border-radius: ${px2remcss(4)};
    height: ${px2remcss(itemHeight)};
    background: ${themeColor};
    transition: all 0.3s;
    position: absolute;
    left: 0;
    top: 0;
    ${opacity}
  }
  `;
};

export const NavLi = CSSComponent({
  tag: 'li',
  className: 'NavLi',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { inlineType, itemHeight, selected } = propsConfig;
      const selectedCSS = getLiIcon(inlineType, itemHeight, selected);
      return `${selectedCSS}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    list-style: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
  `,
});
NavLi.displayName = 'NavLi';

export const SubTreeWrap = CSSComponent({
  tag: 'ul',
  className: 'SubTreeWrap',
  normal: {
    selectNames: [
      ['width'],
      ['background'],
      ['opacity'],
      ['border'],
      ['margin'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['border']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});

const getNormalBgColor = (selected: boolean) => {
  return selected ? 'rgba(77,99,255,0.2)' : '';
};

const getNavNolmalBgColor = (selected: boolean, inlineType: 'primary' | 'ellipse') => {
  return !selected
    ? ''
    : inlineType === 'primary'
    ? ''
    : `linear-gradient(to right, ${themeColor}, #808eff)`;
};

export const TitleWrap = CSSComponent({
  tag: 'div',
  className: 'TitleWrap',
  normal: {
    selectNames: [
      ['height'],
      ['color'],
      ['font'],
      ['background'],
      ['padding', 'left'],
      ['padding', 'left'],
      ['border'],
      ['borderRadius'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { itemHeight, selected, inlineType, __navmenu } = propsConfig;
      const { height = itemHeight } = themeMeta;
      const bgColor = __navmenu
        ? getNavNolmalBgColor(selected, inlineType)
        : getNormalBgColor(selected);
      return css`
        line-height: ${px2remcss(height)};
        background: ${bgColor};
      `;
    },
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { shape, inlineType } = propsConfig;
      const borderRadius = shape === 'round' || inlineType === 'ellipse' ? 99999 : 4;
      return {
        borderRadius: getBorderRadius(borderRadius),
      };
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { mutliple } = propsConfig;
      const color = !mutliple ? `${spiritColor}` : '';

      return {
        background: {
          color,
        },
      };
    },
  },
  active: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
  },
  disabled: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: lightGreyColor,
      font: {
        fontWeight: 500,
      },
    },
  },

  css: css`
    flex: 1;
    overflow: hidden;
    display: inline-block;
    height: 100%;
    vertical-align: top;
    padding-left: ${px2remcss(10)};
    transition: all 0.2s;
  `,
  option: { hover: true, active: true, diabled: true },
});

export const TitleSpan = CSSComponent({
  tag: 'div',
  className: 'TitleSpan',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { describe } = propsConfig;
      const color = describe ? '#ccc' : '';
      return `color: ${color}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    opacity: 1;
  `,
});

TitleSpan.displayName = 'titleSpan';

const getFlexBoxPaddingLeft = pos => {
  const num = pos.split('-').length - 2;
  return num ? num * 16 : 0;
};

export const FlexWrap = CSSComponent({
  tag: 'div',
  className: 'FlexWrap',
  normal: {
    selectNames: [['background'], ['height'], ['border'], ['borderRadius'], ['opacity']],
    getCSS: (themeMeta, themeProps) => {
      const { pos, itemHeight } = themeProps.propsConfig;
      const paddingLeft = getFlexBoxPaddingLeft(pos);
      return `
          padding-left: ${px2remcss(paddingLeft)};
          line-height: ${px2remcss(itemHeight)};
          height: ${px2remcss(itemHeight)}
        `;
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  css: css`
    transition: all 0.3s;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
  `,
  option: { hover: true, active: true },
});

export const FlexBox = CSSComponent({
  tag: 'div',
  className: 'FlexBox',
  normal: {
    selectNames: [['padding', 'left'], ['padding', 'right']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-right: ${px2remcss(10)};
  `,
});

export const SuffixWrap = StaticComponent({
  tag: 'div',
  className: 'SuffixWrap',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    height: 100%;
    right: ${px2remcss(15)};
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: all 0.5s;
    opacity: 0;
    font-size: ${px2remcss(20)};
  `,
});
