/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import Icon from '../icon';
import { FontSizeNumber } from '../css';
import ThemeHoc from '@lugia/theme-hoc';
import colorsFunc from '../css/stateColor';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';

export const BarDefaultSize = 12;
export const DefaultWidth = 250;
export const DefaultHeight = 250;
export const BarDefaultSizePadding = 4;

export const ContainerBackgroundColor = '#fbfbfb';
export const BarBackgroundColor = '#c2c2c2';
export const BarHoverBackgroundColor = '#7a7a7a';

// const getHeight = (height: number, autoHeight: boolean, totalSize: number) => {
//   // if (!autoHeight) {
//   //   return height;
//   // }
//   if (autoHeight) {
//     return totalSize;
//   }
//   return height;
// };

export const ScrollerContainer = CSSComponent({
  tag: 'div',
  className: 'ScrollerContainer',
  normal: {
    selectNames: [['width']],
    getCSS: (themeMeta, themeProps) => {
      const { autoHeight, totalSize } = themeProps.propsConfig;
      const { height = DefaultHeight } = themeMeta;
      const activeHeight = autoHeight ? totalSize : height;
      return `
        height: ${px2remcss(activeHeight)}
      `;
    },
  },
  css: `
    overflow: hidden;
    font-size: ${FontSizeNumber};
    width: ${px2remcss(DefaultWidth)};
    // height: ${px2remcss(DefaultHeight)};
    position: relative;
    background: pink;
    &:hover > div:nth-child(2) {
      opacity: 1
    }
  `,
});

export const Col = CSSComponent({
  tag: 'div',
  className: 'Col',
  normal: {
    selectNames: [['width'], ['height']],
  },
  css: `
      width: ${px2remcss(DefaultWidth)};
      font-size: ${FontSizeNumber}rem;
      position: absolute;
      display: inline-block;
      overflow:hidden;
      background: orange;
    `,
});

export const ScrollerCol = CSSComponent({
  tag: 'div',
  className: 'ScrollerCol',
  normal: {
    selectNames: [['height']],
    getCSS: (themeMeta, themeProps) => {
      const { width = DefaultWidth } = themeMeta;
      const { isDrag } = themeProps.propsConfig;

      const left = width - BarDefaultSize;
      const getOpacity = isDrag ? 'opacity: 1' : '';
      return `
        left: ${px2remcss(left)};
        ${getOpacity};
      `;
    },
  },
  css: `
        width: ${px2remcss(BarDefaultSize)};
        position: absolute;
        display: inline-block;
        transition: opacity 0.3s;
        background: green;
        opacity: 0
      `,
});
