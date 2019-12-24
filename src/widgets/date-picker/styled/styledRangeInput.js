import { css } from 'styled-components';
import { getBackground, FontSize } from '../../css/input';
import { getInputBorderRadius } from '../../common/ThemeUtils';
import { px2remcss } from '../../css/units';
import CSSComponent from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';
import { themeColor } from './utils';
const { lightGreyColor, normalColor } = themeColor;
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
      width: '100%',
      border: getBorder({ style: 'solid', width: 1, color: lightGreyColor }),
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
    selectNames: [['border'], ['boxShadow'], ['borderRadius'], ['background']],
    defaultTheme: {
      border: getBorder({ color: lightGreyColor }),
    },
  },
  css: css`
    font-size: ${FontSize}rem;
    display: inline-block;
    ${getInputBorderRadius};
    ${props => getBackground(props)};
    transition: all 0.3s;
  `,
  option: {
    hover: true,
  },
});
export const RangeInputInner = CSSComponent({
  tag: 'span',
  className: 'RangeInputInner',
  normal: {
    selectNames: [],
    getCSS(themeMate, themeConfig) {
      //  console.log(themeMate, themeConfig);
    },
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
    & input {
      border: none;
      text-align: center;
      background: transparent;
    }

    & input:focus {
      border: none;
      box-shadow: none;
    }

    display: block;
    margin-left: -1px;
    ${getInputBorderRadius};
  `,
});
export const RangeInputInnerInput = CSSComponent({
  tag: 'div',
  className: 'RangeInputInnerInput',
  normal: {
    selectNames: [],
    getCSS(themeMate) {
      const {
        border: { left: { width: leftWidth = 1 } = {}, right: { width: rightWidth = 1 } = {} } = {},
      } = ({} = themeMate);
      return `
        width:calc((100% - (100%-${leftWidth + rightWidth}px)*0.1) * 0.5);
         `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
  `,
});
export const RangeMiddleSpan = CSSComponent({
  tag: 'span',
  className: 'RangeMiddleSpan',
  normal: {
    selectNames: [],
    getCSS(themeMate) {
      const {
        border: { left: { width: leftWidth = 1 } = {}, right: { width: rightWidth = 1 } = {} } = {},
      } = ({} = themeMate);
      return `
        width:calc((100% - ${leftWidth + rightWidth}px) * 0.1);
         `;
    },
  },
  hover: {
    selectNames: [],
    getCSS(themeMate, themeConfig) {
      const {
        border: { left: { width: leftWidth = 1 } = {}, right: { width: rightWidth = 1 } = {} } = {},
      } = ({} = themeMate);
      const {
        propsConfig: { width },
      } = themeConfig;
      return `
        width:${em((width - leftWidth - rightWidth) * 0.1)}
         `;
    },
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    text-align: center;
  `,
});
