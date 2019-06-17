/**
 *
 * create by ligx
 *
 * @flow
 */
import type { SizeType } from '../menu/item';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import colorsFunc from './stateColor';
import styled from 'styled-components';
import { FontSizeNumber } from './';
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
    selectNames: [['width'], ['fontSize'], ['fontWeight']],
    getCSS: (themeMeta, themeProps) => {
      let { height: themeHeight } = themeMeta;

      themeHeight = !themeHeight && themeHeight !== 0 ? DefaultHeight : themeHeight;
      const { size, length, autoHeight } = themeProps.propsConfig;
      const height = autoHeight ? getMenuItemHeight(size) * length : themeHeight;
      return `height: ${px2remcss(height)}`;
    },
  },
  css: `
    font-size: ${px2remcss(FontSizeNumber)};
    width: ${px2remcss(DefaultWidth)};
    outline: none;
    margin: 0;
    user-select: none;
    padding-left: 0;
    list-style: none;
    overflow: hidden;
    // background: #ccc;
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

const getItemHeight = (props: Object) => {
  const { size } = props;
  const itemHeight = getMenuItemHeight(size);
  return `height: ${px2remcss(itemHeight)}`;
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

const getCursor = (props: Object) => {
  const { disabled } = props;
  return `cursor: ${disabled ? 'not-allowed' : 'pointer'}`;
};

const getBackground = (props: Object) => {
  const { theme } = props;
  const { background } = theme;
  return `background: ${background ? background : ''}`;
};

const getMulipleCheckedStyle = (props: MenuItemProps) => {
  return props.checked
    ? `
    :after{
      color: ${themeColor};
    } 
    :hover:after{
      color: ${themeColor};
    }
    `
    : `
    :hover:after{
      color: #d0c8c8;
    }
    `;
};

const getItemColorAndBackground = (props: MenuItemProps) => {
  const { checked, disabled, checkedCSS, theme } = props;
  const { color } = theme;

  return disabled
    ? `color: ${lightGreyColor};
     font-weight: 500;`
    : checked && checkedCSS !== 'background'
    ? `
    color: ${themeColor};
    font-weight: 900;
  `
    : checked && checkedCSS === 'background'
    ? `
      color: ${blackColor};
      font-weight: 900;
      background: ${disableColor}
    `
    : `
    color: ${color};
    font-weight: 500;
  `;
};

export const SingleItem = ThemeHoc(
  CSSComponent({
    tag: 'li',
    className: 'SingleItem',
    normal: {
      selectNames: [['color'], ['font'], ['background'], ['opacity']],
      getCSS: (themeMeta, themeProps) => {
        const { height } = themeMeta;
        return `height: ${px2remcss(height)}`;
      },
    },
    hover: {
      selectNames: [['color'], ['font'], ['background'], ['opacity']],
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
      selectNames: [['color'], ['font'], ['background'], ['opacity']],
      getCSS: (themeMeta, themeProps) => {},
    },
    disabled: {
      selectNames: [['color'], ['font'], ['background'], ['opacity']],
      defaultTheme: {},
      getCSS: (themeMeta, themeProps) => {},
    },
    css: `
    box-sizing: border-box;
    position: relative;
    display: block;
    font-weight: 100;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.3s ease;
    
    ${getMulipleCheckedStyle};
    ${getItemColorAndBackground};
    ${getBackground};
    `,
  }),

  'SingleItem',
  { hover: true, active: true }
);

export const MutlipleItem = ThemeHoc(
  CSSComponent({
    extend: SingleItem,
    className: 'MutlipleItem',
    normal: {
      selectNames: [['color']],
    },
    css: `
    // ${getIcon};
    // ${getMulipleCheckedStyle};
    background: pink;

    &:hover {
      background: pink
    }
  `,
  }),

  'MutlipleItem',
  { hover: true, actived: false }
);

// export const MutlipleItem =
//CSSComponent({
//   extend: SingleItem,
//   className: 'MutlipleItem',
//   normal: {
//     selectNames: [['color']],
//   },
//   css: `
//     ${getIcon};
//     ${getMulipleCheckedStyle};
//   `,
// });
