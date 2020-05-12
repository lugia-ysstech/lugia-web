/**
 * UI颜色公共值
 * create by szfeng
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import Widget from '../consts/index';
import Icon from '../icon';
import get from './theme-common-dict';
import { getBoxShadow } from '@lugia/theme-utils';
import changeColor from './utilsColor';
import { getBorder } from '@lugia/theme-utils';

const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
export const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
export const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';

export const FontSize = 12;
export const MarginTop = 4;
export const MarginRight = 4;
export const PaddingLeft = 10;
export const PadingRight = 20;
export const Height = 32;
export const SingleLineHeight = 30;
export const ItemBackgroundColor = '#edf0fe';
export const ItemContainerBackgroundColor = '#f6f5ff';

export const OutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['color'],
      ['font'],
      ['boxShadow'],
      ['opacity'],
      ['cursor'],
    ],
    defaultTheme: {
      cursor: 'pointer',
      border: getBorder(get('normalBorder')),
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['cursor'],
    ],
    defaultTheme: {
      border: getBorder(get('hoverBorder')),
    },
  },
  active: {
    selectNames: [['border']],
    defaultTheme: {
      border: getBorder(get('activeBorder')),
    },
  },
  focus: {
    selectNames: [['border']],
    defaultTheme: {
      border: getBorder(get('focusBorder')),
      boxShadow: getBoxShadow(`0px 0px 4px 0px ${changeColor(get('themeColor'), 0, 0, 40).rgba}`),
    },
  },
  disabled: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['border'],
      ['font'],
      ['borderRadius'],
      ['background'],
      ['color'],
      ['boxShadow'],
      ['opacity'],
      ['cursor'],
    ],
    defaultTheme: {
      border: getBorder(get('disabledBorder')),
      background: {
        color: disableColor,
      },
      cursor: 'not-allowed',
    },
  },

  css: css`
    height: ${px2remcss(Height)};
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: ${px2remcss(get('borderRadiusValue'))};
    background: ${get('defaultColor')};
    color: ${get('blackColor')};
    font-size: ${px2remcss(FontSize)};
    transition: all 0.3s;
    outline: none;
    & > div {
      height: 100%;
      width: 100%;
    }
  `,
  option: { hover: true, disabled: true, active: true, focus: true },
});

export const InnerContainer = CSSComponent({
  tag: 'div',
  className: 'InnerContainer',
  normal: {
    selectNames: [['padding']],
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['padding']],
  },
  css: css`
    width: 100%;
    height: 100%;
    position: relative;
    user-select: none;
    padding-left: ${px2remcss(10)};
    padding-right: ${px2remcss(10)};
    display: flex;
    align-items: center;
  `,
  option: { hover: false, active: false, disabled: true },
});

export const SingleInnerContainer = CSSComponent({
  tag: 'div',
  className: 'SingleInnerContainer',
  normal: {
    selectNames: [['padding']],
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['padding']],
  },
  css: css`
    width: 100%;
    height: 100%;
    position: relative;
    user-select: none;
    padding-left: ${px2remcss(get('padding'))};
    padding-right: ${px2remcss(get('padding'))};
    display: flex;
    align-items: center;

    & i {
      vertical-align: middle;
    }
  `,
});

export const IconWrap = StaticComponent({
  tag: 'div',
  className: 'IconWrap',
  css: css`
    height: 100%;
    float: right;
    position: relative;
    padding-left: ${px2remcss(10)};
    transition: all 0.3s;
  `,
  option: { hover: true },
});
export const CommonIcon = Icon;

export const FlexResBox = StaticComponent({
  tag: 'div',
  className: 'FlexResBox',
  css: css`
    flex: 1;
    position: relative;
  `,
});

export const TextContent = CSSComponent({
  tag: 'span',
  className: 'TextContent',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: {
      color: get('blackColor'),
    },
  },
  disabled: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: {
      color: get('disableTextColor'),
    },
  },
  option: { disabled: true },
});

export const Prefix = StaticComponent({
  tag: 'span',
  className: 'Prefix',
  css: css`
    padding-right: ${px2remcss(get('padding'))};
    position: relative;
  `,
});

export const Suffix = StaticComponent({
  tag: 'div',
  className: 'Suffix',
  css: css`
    position: relative;
    display: flex;
    align-items: center;
  `,
});

export const List = StaticComponent({
  tag: 'div',
  className: 'List',
  css: css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
});

export const HiddenList = StaticComponent({
  tag: 'div',
  className: 'HiddenList',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    top: -1238908;
  `,
});

export const FocuInput = StaticComponent({
  tag: 'input',
  className: 'FocuInput',
  css: css`
    position: absolute;
    left: -${px2remcss(500)};
    width: ${px2remcss(1)};
    height: ${px2remcss(1)};
    padding: 0;
    border: none;
  `,
});
FocuInput.displayName = Widget.InputTagFocuInput;

export const ItemWrap = StaticComponent({
  tag: 'span',
  className: 'ItemWrap',
  css: css`
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
  `,
});

export const ItemContainer = CSSComponent({
  tag: 'div',
  className: 'ItemContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['color'],
      ['font'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['padding', 'left'],
      ['padding', 'right'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['opacity'],
    ],
    defaultTheme: {
      background: {
        color: changeColor(get('themeColor'), 0, 0, 10).rgba,
      },
      color: darkGreyColor,
    },
    getCSS: themeMeta => {
      const { height = 20 } = themeMeta;
      return `
          line-height: ${px2remcss(height)};
          border-radius: ${px2remcss(height)};
        `;
    },
  },
  hover: {
    selectNames: [
      ['background'],
      ['color'],
      ['borderRadius'],
      ['border'],
      ['font'],
      ['opacity'],
      ['boxShadow'],
    ],
  },
  disabled: {
    selectNames: [['color'], ['background']],
    defaultTheme: {
      color: disableTextColor,
    },
  },

  css: css`
    padding: 0 ${px2remcss(get('padding'))};
    height: ${px2remcss(20)};
    font-size: ${px2remcss(get('xxsFontSize'))};
    margin-right: ${px2remcss(4)};
    user-select: none;
    cursor: default;
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: all 0.3s;
    box-sizing: border-box;
  `,
  option: { hover: true, disabled: true },
});

export const ItemText = StaticComponent({
  tag: 'span',
  className: 'ItemText',
  css: css`
    font-size: ${px2remcss(12)};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    margin: 0;
    padding: 0;
    flex: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  `,
});

export const HiddenItem = CSSComponent({
  tag: 'div',
  className: 'HiddenItem',
  normal: {
    selectNames: [['font'], ['fontSize']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    position: absolute !important;
    top: -943124px;
    margin: 0;
    padding: 0;
  `,
});
