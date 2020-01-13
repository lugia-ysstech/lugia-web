import { css } from 'styled-components';
import { getThemeProperty, getDateWrrap, fontSize, em } from './utils';
import CSSComponent from '@lugia/theme-css-hoc';
const TimeColBorderColor = '#e8e8e8';
export const TimeWrap = CSSComponent({
  tag: 'ul',
  className: 'TimeWrap',
  normal: {
    selectNames: [['width']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    font-size: ${fontSize}rem;
    border-right: ${props => (props.hasTimeWrapBorder ? '1px solid #ddd' : '')};
    zoom: 1;
    &::after {
      content: '';
      height: 0;
      line-height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
  `,
});
export const TimeCol = CSSComponent({
  tag: 'li',
  className: 'TimeCol',
  normal: {
    selectNames: [['width']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    float: left;
    border-right: ${props => (props.noBorder ? 'none' : `1px solid ${TimeColBorderColor}`)};
    overflow: hidden;
  `,
});

export const TimeTitle = CSSComponent({
  tag: 'div',
  className: 'TimeTitle',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-size: ${fontSize}rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: ${getDateWrrap().top} 0 ${em(12)};
  `,
});
