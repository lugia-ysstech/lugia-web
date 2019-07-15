import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

export const { themeColor, mediumGreyColor, darkGreyColor, blackColor } = colorsFunc();
export const DefaultColor = mediumGreyColor;
export const HoverDefaultColor = blackColor;
export const FontWeight = 500;
export const FontSize = px2remcss(14);
export const separatorMarginLeft = px2remcss(10);
export const separatorMarginRight = px2remcss(10);

export const CommonSpan = CSSComponent({
  tag: 'span',
  className: 'commonSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['margin'], ['padding'], ['font']],
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: HoverDefaultColor,
    },
  },
  css: css`
    font-size: ${FontSize};
    transition: font-size 0.3s;
  `,
  option: { hover: true },
});

export const ALink = CSSComponent({
  tag: 'a',
  className: 'aLink',
  normal: {
    selectNames: [['color'], ['fontSize'], ['margin'], ['padding'], ['font']],
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: HoverDefaultColor,
    },
  },

  css: css`
    text-decoration: none;
    color: ${DefaultColor};
    transition: font-size 0.3s;
  `,
  option: { hover: true },
});

export const SeparatorSpan = CSSComponent({
  tag: 'span',
  className: 'separatorSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['margin']],
  },

  css: css`
    font-size: ${px2remcss(16)};
    display: inline-block;
    margin-left: ${separatorMarginLeft};
    margin-right: ${separatorMarginRight};
    color: ${DefaultColor};
  `,
});

export const BreadcrumbContainer = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
      ['border'],
      ['opacity'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
    getCSS: themeMeta => {
      const { height = 30 } = themeMeta;
      return `line-height: ${px2remcss(height)}`;
    },
    defaultTheme: {
      padding: {
        left: 20,
      },
    },
  },
  hover: {
    selectNames: [['border'], ['borderRadius'], ['boxShadow'], ['background'], ['opacity']],
  },
  css: css`
    height: ${px2remcss(30)};
    display: inline-block;
    box-sizing: border-box;
    transition: all 0.3s;
    overflow: hidden;
  `,
  option: { hover: true },
});

export const ItemWrap = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [['width'], ['padding'], ['margin'], ['opacity']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    padding: 0;
    box-sizing: border-box;
    vertical-align: center;
  `,
});
