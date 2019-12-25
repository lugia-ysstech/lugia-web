/**
 * UI颜色公共值
 * create by szfeng
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from './stateColor';
import Widget from '../consts/index';
import Icon from '../icon';

export const {
  themeColor,
  darkGreyColor,
  blackColor,
  mediumGreyColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
  disableColor,
} = colorsFunc();

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
      border: {
        top: {
          color: lightGreyColor,
          style: 'solid',
          width: 1,
        },
        left: {
          color: lightGreyColor,
          style: 'solid',
          width: 1,
        },
        bottom: {
          color: lightGreyColor,
          style: 'solid',
          width: 1,
        },
        right: {
          color: lightGreyColor,
          style: 'solid',
          width: 1,
        },
      },
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
    getStyle: (themeMeta, themeProps) => {},
    defaultTheme: {
      border: {
        top: {
          color: themeColor,
          style: 'solid',
          width: 1,
        },
        left: {
          color: themeColor,
          style: 'solid',
          width: 1,
        },
        bottom: {
          color: themeColor,
          style: 'solid',
          width: 1,
        },
        right: {
          color: themeColor,
          style: 'solid',
          width: 1,
        },
      },
    },
  },
  active: {
    selectNames: [],
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
    border-radius: ${px2remcss(4)};
    background: ${defaultColor};
    color: ${blackColor};
    font-size: ${px2remcss(FontSize)};
    transition: all 0.3s;
  `,
  option: { hover: true, disabled: true },
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

export const SingleInnerContainer = StaticComponent({
  tag: 'div',
  className: 'SingleInnerContainer',
  css: css`
    position: relative;
    user-select: none;
    height: 100%;
    padding-left: ${px2remcss(10)};
    padding-right: ${px2remcss(10)};
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
  tag: 'span',
  className: 'FlexResBox',
  css: css`
    flex: 1;
    overflow: hidden;
    position: relative;
  `,
});

export const Prefix = CSSComponent({
  tag: 'span',
  className: 'Prefix',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    position: relative;
    left: ${px2remcss(-5)};
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

export const InputTagTheme = CSSComponent({
  tag: 'div',
  className: 'InputTagTheme',
  normal: {
    selectNames: [['width']],
  },
});

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

  css: css`
    padding: 0 ${px2remcss(5)};
    height: ${px2remcss(20)};
    font-size: ${px2remcss(FontSize)};
    margin-right: ${px2remcss(5)};
    user-select: none;
    background: ${ItemBackgroundColor};
    color: ${darkGreyColor};
    cursor: default;
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: all 0.3s;
    box-sizing: border-box;
  `,
  option: { hover: true },
});

export const ItemText = StaticComponent({
  tag: 'span',
  className: 'ItemText',
  css: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    margin: 0;
    padding: 0;
    flex: 1;
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
