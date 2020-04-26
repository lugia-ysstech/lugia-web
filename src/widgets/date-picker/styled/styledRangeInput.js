import { css } from 'styled-components';
import { getBackground, FontSize } from '../../css/input';
import { px2remcss } from '../../css/units';
import CSSComponent from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';
import { themeColor } from './utils';
const { lightGreyColor, normalColor, borderSize, paddingToText } = themeColor;
export const em = px2remcss;

export const RangeInputWrap = CSSComponent({
  tag: 'div',
  className: 'RangeInputWrap',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
      ['background'],
    ],
    defaultTheme: {
      border: getBorder({ style: 'solid', width: borderSize, color: lightGreyColor }),
    },
  },
  hover: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
    defaultTheme: {
      border: getBorder({ color: normalColor }),
    },
  },
  active: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
  },
  disabled: {
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background'], ['borderRadius']],
    defaultTheme: {
      border: getBorder({ color: lightGreyColor }),
    },
  },
  css: css`
    font-size: ${FontSize}rem;
    display: inline-block;
    ${props => getBackground(props)};
    transition: all 0.3s;
    overflow: hidden;
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
    selectNames: [['color'], ['font']],
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
    padding: 0 ${paddingToText}px;
  `,
});
