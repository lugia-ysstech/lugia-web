import { css } from 'styled-components';
import { FontSize } from '../../css/input';
import { px2remcss } from '../../css/units';
import CSSComponent from '@lugia/theme-css-hoc';
import { getThemeUpdate } from './utils';

export const em = px2remcss;

export const RangeInputWrap = CSSComponent({
  tag: 'div',
  className: 'RangeInputWrap',
  normal: {
    selectNames: [
      ['width'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
      ['background'],
      ['margin'],
      ['padding'],
    ],
  },
  hover: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
  },
  active: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
  },
  focus: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
  },
  disabled: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background'], ['borderRadius']],
  },
  css: css`
    font-size: ${FontSize}rem;
    display: inline-block;
    transition: all 0.3s;
    overflow: hidden;
    height: 100%;
  `,
  option: {
    hover: true,
  },
});
export const RangeInputInner = CSSComponent({
  tag: 'div',
  className: 'RangeInputInner',
  normal: {
    selectNames: [['borderRadius']],
  },
  hover: {
    selectNames: [['background']],
  },
  active: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['background'], ['borderRadius']],
  },
  css: css`
    & input {
      border: none;
    }

    & input:focus {
      border: none;
      box-shadow: none;
    }

    display: flex;
    height: 100%;
    align-items: center;
  `,
});
export const RangeInputInnerInput = CSSComponent({
  tag: 'div',
  className: 'RangeInputInnerInput',
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
  focus: {
    selectNames: [],
  },
  css: css`
    width: 50%;
    & input {
      ${props => (props.last ? ' padding-left: 0 !important;' : '')};
    }
  `,
});
export const RangeMiddleSpan = CSSComponent({
  tag: 'span',
  className: 'RangeMiddleSpan',
  normal: {
    selectNames: [['color'], ['font'], ['margin']],
  },
  hover: {
    selectNames: [['color'], ['font']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['background'], ['color']],
  },
  css: css`
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0 ${getThemeUpdate().paddingToText}px;
  `,
});
