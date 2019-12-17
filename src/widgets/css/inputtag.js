/**
 * UI颜色公共值
 * create by szfeng
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import colorsFunc from './stateColor';
import Widget from '../consts/index';
import Icon from '../icon';
import { isNumber } from '../common/NumberUtils';

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

export const Container = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [['width'], ['height'], ['margin']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: ${px2remcss(250)};
    transition: all 0.3s;
  `,
});
Container.displayName = 'InputTagWrap';

export const OutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['color'],
      ['boxShadow'],
      ['opacity'],
      ['cursor'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { height = Height } = themeMeta;
      return `
      line-height: ${px2remcss(height)}
      `;
    },
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
    selectNames: [],
    defaultTheme: {
      background: {
        color: disableColor,
      },
      cursor: 'not-allowed',
    },
  },

  css: css`
    height: ${px2remcss(Height)};
    width: ${px2remcss(250)};
    border-radius: ${px2remcss(4)};
    background: ${defaultColor};
    color: ${blackColor};
    font-size: ${px2remcss(12)};
    transition: all 0.3s;
  `,
  option: { hover: true, disabled: true },
});

export const InnerContainer = CSSComponent({
  tag: 'div',
  className: 'InnerContainer',
  normal: {
    selectNames: [['width'], ['height'], ['padding']],
    getCSS: themeMeta => {
      const { height = 30 } = themeMeta;
      return `
        line-height: ${px2remcss(height)};
      `;
    },
  },

  hover: {
    selectNames: [],
  },
  css: css`
    height: ${px2remcss(30)};
    width: ${px2remcss(250)};
    position: relative;
    user-select: none;
    padding-left: ${px2remcss(10)};
    padding-right: ${px2remcss(10)};
    display: flex;
  `,
});

export const SingleInnerContainer = CSSComponent({
  tag: 'div',
  className: 'SingleInnerContainer',
  normal: {
    selectNames: [['width'], ['height'], ['padding'], ['font']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    position: relative;
    user-select: none;
    padding-left: ${px2remcss(10)};
    padding-right: ${px2remcss(10)};
    display: flex;
  `,
});

export const IconWrap = CSSComponent({
  tag: 'div',
  className: 'IconWrap',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['margin'], ['opacity']],
  },
  hover: {
    selectNames: [['color'], ['fontSize'], ['font'], ['opacity']],
  },
  css: css`
    display: inline-block;
    height: 100%;
    float: right;
    position: relative;
    padding-left: ${px2remcss(10)};
    transition: all 0.3s;
  `,
  option: { hover: true },
});
export const CommonIcon = Icon;

export const FlexResBox = CSSComponent({
  tag: 'span',
  className: 'FlexResBox',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    flex: 1;
    overflow: hidden;
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

export const List = CSSComponent({
  tag: 'div',
  className: 'List',
  normal: {
    selectNames: [['height']],
    getCSS: themeMeta => {
      const { height = 30 } = themeMeta;
      return `
        line-height: ${px2remcss(height)};
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    list-style: none;
    height: ${px2remcss(30)};
    line-height: ${px2remcss(30)};
    margin: 0;
    padding: 0;
  `,
});

export const HiddenList = CSSComponent({
  tag: 'div',
  className: 'FocuInput',
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

export const FocuInput = CSSComponent({
  tag: 'input',
  className: 'FocuInput',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
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
  tag: 'span',
  className: 'InputTagTheme',
  normal: {
    selectNames: [['width'], ['height']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: block;
    height: ${px2remcss(Height)};
  `,
});

export const ItemWrap = CSSComponent({
  tag: 'span',
  className: 'ItemWrap',
  normal: {
    selectNames: [['height']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    height: ${px2remcss(20)};
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
      ['fontSize'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['padding', 'left'],
      ['padding', 'right'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['opacity'],
    ],
    getCSS: (themeMeta, themeProps) => {
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
    font-size: ${px2remcss(12)};
    margin-right: ${px2remcss(5)};
    user-select: none;
    background: ${ItemBackgroundColor};
    color: ${darkGreyColor};
    cursor: default;
    display: flex;
    overflow: hidden;
    transition: all 0.3s;
    box-sizing: border-box;
  `,
  option: { hover: true },
});

export const ItemText = CSSComponent({
  tag: 'span',
  className: 'ItemText',
  normal: {
    selectNames: [['width'], ['height'], ['font']],
  },
  hover: {
    selectNames: [],
  },
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

export const CloseButtonWrap = CSSComponent({
  tag: 'li',
  className: 'CloseButtonWrap',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['opacity']],
    getThemeMeta: (themeMeta, themeProps) => {
      const { font = {} } = themeMeta;
      const { fontSize = 12 } = font;
      const size = isNumber(fontSize) ? fontSize : 12;
      return {
        width: size,
      };
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['opacity']],
  },
  css: css`
    color: ${mediumGreyColor};
    position: relative;
    font-size: ${px2remcss(12)};
    margin-left: ${px2remcss(5)};
    height: 100%;
  `,
  option: { hover: true },
});

export const CloseButton = Icon;
CloseButton.displayName = Widget.InputTagCloseButton;
