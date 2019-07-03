/**
 *
 * create by ligx
 *
 * @flow
 */
import type { SizeType } from '../menu/item';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import colorsFunc from './stateColor';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CommonIcon from '../icon';
export const { themeColor, disableColor, blackColor, lightGreyColor, defaultColor } = colorsFunc();
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

export const TextIcon: Object = styled(CommonIcon)`
  display: inline-block;
  position: relative;
  padding-right: ${px2remcss(10)};
  top: ${px2remcss(1.5)};
`;
export const RightIcon = styled.span`
  position: absolute;
  right: ${px2remcss(12)};
  top: 50%;
  transform: translateY(-50%);
`;

export const MenuContainer = CSSComponent({
  tag: 'ul',
  className: 'MenuContainer',
  normal: {
    selectNames: [
      ['width'],
      ['borderRadius'],
      ['border'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
      ['padding'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { size, length, autoHeight } = themeProps.propsConfig;
      let { height: themeHeight } = themeMeta;
      themeHeight = !themeHeight && themeHeight !== 0 ? DefaultHeight : themeHeight;
      const height = autoHeight ? getMenuItemHeight(size) * length : themeHeight;
      return `height: ${px2remcss(height)};
      `;
    },
  },
  hover: {
    selectNames: [['opacity']],
  },
  css: css`
    width: ${px2remcss(DefaultWidth)};
    outline: none;
    margin: 0;
    user-select: none;
    padding-left: 0;
    list-style: none;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: #fff;
  `,
});

const getIcon = props => {
  const { checkedCSS } = props;
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
      // font-size: ${12};
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

const getHoverCSS = (props: Object) => {
  const { disabled, theme } = props;
  const { hover } = theme;

  return disabled
    ? ''
    : `&:hover {
    font-weight: ${hover ? hover.fontWeight : 900};
    background: ${hover ? hover.background : ItemBackgroundColor};
    color: ${hover ? hover.color : blackColor};
  }`;
};

const getItemCheckedCSS = (checked: Boolean, checkedCSS: string) => {
  const color = checked && checkedCSS !== 'background' ? themeColor : blackColor;
  const backgroundColor = checked && checkedCSS === 'background' ? disableColor : '';
  const fontWeight = checked ? 900 : 500;
  return {
    color,
    backgroundColor,
    fontWeight,
  };
};

export const ItemWrap = ThemeHoc(
  CSSComponent({
    tag: 'li',
    className: 'ItemWrap',
    normal: {
      selectNames: [['color'], ['font'], ['fontSize'], ['background'], ['opacity']],
      defaultTheme: {
        cursor: 'pointer',
      },
      getCSS: (themeMeta, themeProps) => {
        const { propsConfig } = themeProps.themeConfig;
        const { checked, checkedCSS, size } = propsConfig;
        const height = getMenuItemHeight(size);
        const { color, backgroundColor, fontWeight } = getItemCheckedCSS(checked, checkedCSS);
        return `
        color: ${color};
        background: ${backgroundColor};
        font-weight: ${fontWeight};
        height: ${px2remcss(height)}
        `;
      },
    },
    hover: {
      selectNames: [['color'], ['font'], ['fontSize'], ['background'], ['opacity']],
      defaultTheme: {
        font: {
          fontWeight: 900,
        },
        background: {
          color: ItemBackgroundColor,
        },
        color: blackColor,
      },
    },
    active: {
      selectNames: [['color'], ['font'], ['fontSize'], ['background'], ['opacity']],
      getCSS: (themeMeta, themeProps) => {},
    },
    disabled: {
      selectNames: [['color'], ['font'], ['background'], ['opacity']],
      defaultTheme: {
        cursor: 'not-allowed',
        color: lightGreyColor,
        font: {
          fontWeight: 500,
        },
      },
      getCSS: (themeMeta, themeProps) => {},
    },
    css: css`
      box-sizing: border-box;
      position: relative;
      display: block;
      font-weight: 100;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease;
      font-size: ${px2remcss(12)};
    `,
  }),

  'ItemWrap',
  { hover: true, active: true }
);

export const DividerWrap = CSSComponent({
  tag: 'div',
  className: 'DividerWrap',
  normal: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: ${px2remcss(1)};
  `,
});

export const TextContainer = CSSComponent({
  tag: 'div',
  className: 'TextContainer',
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
    padding: ${px2remcss(0)} ${px2remcss(8)};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  `,
});
