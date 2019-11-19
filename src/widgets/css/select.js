/**
 * create by szfeng
 *
 * @flow
 */

import CSSComponent, { css } from '@lugia/theme-css-hoc';

export const SelectContainer = CSSComponent({
  tag: 'div',
  className: 'SelectContainer',
  normal: {
    selectNames: [['width']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    overflow: hidden;
  `,
});
SelectContainer.displayName = 'SelectContainer';

export const MenuItemHeight = 30;
export const DefaultHeight = 250;
export const DefaultWidth = 200;
