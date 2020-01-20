/**
 *
 * create by szfeng
 *
 * @flow
 */
import type { SizeType } from '../menu/item';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from './stateColor';
import { px2remcss } from '../css/units';
export const {
  themeColor,
  disableColor,
  blackColor,
  lightGreyColor,
  defaultColor,
  mediumGreyColor,
} = colorsFunc();
export const DefaultMenuItemHeight = 35;
export const LargeMenuItemHeight = 60;
export const BiggerMenuItemHeight = 40;
export const MenuItemHeight = 35;
export const DefaultHeight = 250;
export const DefaultWidth = 250;
export const ItemBackgroundColor = '#edf0fe';
export const SelectIcon = '\\e73e';
export const Height = 30;

export const getMenuItemHeight = (size: SizeType) => {
  return size === 'large'
    ? LargeMenuItemHeight
    : size === 'bigger'
    ? BiggerMenuItemHeight
    : DefaultMenuItemHeight;
};

export const SwitchIconContainer = StaticComponent({
  tag: 'span',
  className: 'SwitchIconContainer',
  css: css`
    position: absolute;
    right: ${px2remcss(12)};
    top: 50%;
    transform: translateY(-50%);
  `,
});

export const MenuContainer = CSSComponent({
  tag: 'ul',
  className: 'MenuContainer',
  normal: {
    selectNames: [['width'], ['background'], ['padding']],
    getCSS: (themeMeta, themeProps) => {
      const { menuItemHeight, length, autoHeight } = themeProps.propsConfig;
      let { height: themeHeight } = themeMeta;
      themeHeight = !themeHeight && themeHeight !== 0 ? DefaultHeight : themeHeight;
      const height = autoHeight ? menuItemHeight * length : themeHeight;
      return `height: ${px2remcss(height)};
      `;
    },
    defaultTheme: {
      background: {
        color: '#fff',
      },
      width: DefaultWidth,
    },
  },
  hover: {
    selectNames: [['background']],
  },
  css: css`
    outline: none;
    margin: 0;
    user-select: none;
    padding-left: 0;
    list-style: none;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});

const getIcon = checkedCSS => {
  return `
    ${
      checkedCSS !== 'mark'
        ? ''
        : `
    &::after {
      font-family: "sviconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
      color: transparent;
      display: inline-block;
      transform: scale(.83333333) rotate(0deg);
      zoom: 1;
      transition: all .2s ease;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${px2remcss(12)};
      font-weight: 700;
      font-size: ${px2remcss(16)};
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    `
    }
  `;
};

export const ItemWrap = CSSComponent({
  tag: 'li',
  className: 'ItemWrap',
  normal: {
    selectNames: [
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['padding'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
    ],
    defaultTheme: {
      cursor: 'pointer',
    },
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { menuItemHeight } = {} } = themeProps;

      return `
        height: ${px2remcss(menuItemHeight)};
        `;
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
  },
  active: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
  },
  disabled: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['borderRadius'],
      ['padding'],
      ['fontSize'],
      ['background'],
      ['opacity'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      color: lightGreyColor,
      font: {
        fontWeight: 500,
      },
    },
  },
  css: css`
    box-sizing: border-box;
    position: relative;
    font-weight: 100;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: background-color, border, borderRadius, opacity, boxShadow;
    transition-duration: 0.3s;
    font-size: ${px2remcss(14)};
    display: flex;
    flex-direction: column;

    & > i {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});
ItemWrap.displayName = 'ItemWrap';

export const DividerWrap = CSSComponent({
  tag: 'div',
  className: 'DividerWrap',
  normal: {
    selectNames: [['background']],
  },
  css: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #666;
    height: ${px2remcss(1)};
  `,
});

export const TextContainer = CSSComponent({
  tag: 'div',
  className: 'TextContainer',
  normal: {
    selectNames: [['padding'], ['lineHeight']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    padding: ${px2remcss(0)} ${px2remcss(8)};
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    & i {
      vertical-align: middle;
    }
  `,
});

export const DesContainer = CSSComponent({
  tag: 'div',
  className: 'DesContainer',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['padding'], ['lineHeight']],
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  active: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  css: css`
    overflow: hidden;
    padding-left: ${px2remcss(10)};
    box-sizing: border-box;
    flex: 1;
    color: ${mediumGreyColor};
    font-weight: 100;
    display: flex;
    align-items: center;
    font-size: ${px2remcss(12)};
    transition: all 0.3s;
  `,
  option: { hover: true, active: true, disabled: true },
});

export const Text = StaticComponent({
  tag: 'span',
  className: 'Text',
  css: css`
    transition: all 0.3s;
  `,
});

export const SuffixElementWrap = StaticComponent({
  tag: 'div',
  className: 'SuffixElementWrap',
  css: css`
    transition: all 0.3s;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  `,
});
