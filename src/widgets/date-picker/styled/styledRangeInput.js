import { css } from 'styled-components';
import { getBackground, FontSize } from '../../css/input';
import { px2remcss } from '../../css/units';
import CSSComponent from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';
import { themeColor } from './utils';
const { lightGreyColor, normalColor, borderSize } = themeColor;
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
  `,
  option: {
    hover: true,
  },
});
export const RangeInputInner = CSSComponent({
  tag: 'div',
  className: 'RangeInputInner',
  normal: {
    selectNames: [['height'], ['borderRadius']],
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
      text-align: center;
    }

    & input:focus {
      border: none;
      box-shadow: none;
    }

    display: block;
  `,
});
export const RangeInputInnerInput = CSSComponent({
  tag: 'div',
  className: 'RangeInputInnerInput',
  normal: {
    selectNames: [],
    getCSS(themeMate) {
      const {
        border: {
          left: { width: leftWidth = borderSize } = {},
          right: { width: rightWidth = borderSize } = {},
        } = {},
      } = ({} = themeMate);
      return `
        width:calc((100% - (100%-${leftWidth + rightWidth}px)*0.1) * 0.5);
         `;
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
  focus: {
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
    selectNames: [['color']],
    getCSS(themeMate) {
      const {
        border: {
          left: { width: leftWidth = borderSize } = {},
          right: { width: rightWidth = borderSize } = {},
        } = {},
      } = ({} = themeMate);
      return `
        width:calc((100% - ${leftWidth + rightWidth}px) * 0.1);
         `;
    },
  },
  hover: {
    selectNames: [['color']],
    getCSS(themeMate, themeConfig) {
      const {
        border: {
          left: { width: leftWidth = borderSize } = {},
          right: { width: rightWidth = borderSize } = {},
        } = {},
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
    selectNames: [['background'], ['color']],
  },
  css: css`
    display: inline-block;
    text-align: center;
    background: transparent;
  `,
});
