import styled, { css } from 'styled-components';
import { getThemeProperty, getDateWrrap, fontSize, em } from './utils';
import CSSComponent from '@lugia/theme-css-hoc';
import { themeColor } from './utils';
const { borderColor } = themeColor;
export const TimeWrap = CSSComponent({
  tag: 'div',
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
export const TimeWrapInner = styled.ul`
  display: flex;
  flex-grow: 1;
`;
export const TimeCol = CSSComponent({
  tag: 'li',
  className: 'TimeCol',
  normal: {
    selectNames: [['border', 'right']],
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
    overflow: hidden;
  `,
});

export const TimeTitle = CSSComponent({
  tag: 'div',
  className: 'TimeTitle',
  normal: {
    selectNames: [['color']],
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
    font-size: ${em(14)};
    text-align: center;
    border-bottom: 1px solid ${borderColor};
    padding: ${getDateWrrap().top} 0 ${em(12)};
  `,
});
