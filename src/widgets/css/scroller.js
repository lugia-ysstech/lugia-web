/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

export const BarDefaultSize = 12;
export const DefaultWidth = 250;
export const DefaultHeight = 250;
export const BarDefaultSizePadding = 4;

export const ContainerBackgroundColor = '#fbfbfb';
export const BarBackgroundColor = '#c2c2c2';
export const BarHoverBackgroundColor = '#7a7a7a';

export const ScrollerContainer = CSSComponent({
  tag: 'div',
  className: 'ScrollerContainer',
  normal: {
    selectNames: [
      ['width'],
      ['margin'],
      ['opacity'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { autoHeight, totalSize } = themeProps.propsConfig;
      const { height = DefaultHeight } = themeMeta;
      const activeHeight = autoHeight ? totalSize : height;
      return `
        height: ${px2remcss(activeHeight)}
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
    selectNames: [['background'], ['opacity'], ['border'], ['boxShadow'], ['borderRadius']],
  },
  css: css`
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
    border-radius: ${px2remcss(4)};
    &:hover > div:nth-child(2) {
      opacity: 1;
    }
  `,
  option: { hover: true },
});

export const Col = CSSComponent({
  tag: 'div',
  className: 'Col',
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
  css: css`
    width: ${px2remcss(DefaultWidth)};
    position: absolute;
    display: inline-block;
    height: ${px2remcss(DefaultHeight)};
  `,
});

export const ScrollerCol = CSSComponent({
  tag: 'div',
  className: 'ScrollerCol',
  normal: {
    selectNames: [['height']],
    getCSS: (themeMeta, themeProps) => {
      const { isDrag } = themeProps.propsConfig;
      const getOpacity = isDrag ? 'opacity: 1' : '';
      return `
        right: 0;
        ${getOpacity};
      `;
    },
  },
  css: css`
    width: ${px2remcss(BarDefaultSize)};
    position: absolute;
    display: inline-block;
    transition: opacity 0.3s;
    opacity: 0;
  `,
});
