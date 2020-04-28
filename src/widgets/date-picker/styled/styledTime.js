import { css } from 'styled-components';
import { getDateWrrap, fontSize, em } from './utils';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getThemeUpdate } from './utils';

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
    zoom: 1;
    &::after {
      content: '';
      height: 0;
      line-height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }

    ${props => (props.noBorder ? '' : `border-right: 1px solid ${getThemeUpdate().borderColor}`)};
  `,
});
export const TimeWrapInner = StaticComponent({
  tag: 'ul',
  css: css`
    display: flex;
    flex-grow: 1;
  `,
});
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
    ${props => (props.noBorder ? 'border-right:none !important;' : '')};
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
    border-bottom: 1px solid ${getThemeUpdate().borderColor};
    padding: ${getDateWrrap().top} 0 ${em(12)};
  `,
});
