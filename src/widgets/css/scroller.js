/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */

import { px2remcss } from '../css/units';
import Icon from '../icon';
import { FontSizeNumber } from '../css';
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
    selectNames: [['width'], ['boxShadow'], ['borderRadius']],
    getCSS: (themeMeta, themeProps) => {
      const { autoHeight, totalSize } = themeProps.propsConfig;
      const { height = DefaultHeight } = themeMeta;
      const activeHeight = autoHeight ? totalSize : height;
      return `
        height: ${px2remcss(activeHeight)}
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    font-size: ${FontSizeNumber};
    width: ${px2remcss(DefaultWidth)};
    position: relative;
    transition: all 0.5s;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    &:hover > div:nth-child(2) {
      opacity: 1;
    }
  `,
});

export const Col = CSSComponent({
  tag: 'div',
  className: 'Col',
  normal: {
    selectNames: [['width'], ['height']],
  },
  css: css`
    width: ${px2remcss(DefaultWidth)};
    position: absolute;
    display: inline-block;
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
  css: css`
    width: ${px2remcss(BarDefaultSize)};
    position: absolute;
    display: inline-block;
    transition: opacity 0.3s;
    opacity: 0;
  `,
});
