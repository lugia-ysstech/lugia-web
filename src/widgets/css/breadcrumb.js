import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';

import CSSComponent from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';

export const { themeColor, mediumGreyColor, darkGreyColor, blackColor } = colorsFunc();

export const DefaultColor = mediumGreyColor;
export const HoverDefaultColor = blackColor;
export const FontWeight = 500;
export const FontSize = px2remcss(14);
export const separatorMarginLeft = px2remcss(10);
export const separatorMarginRight = px2remcss(10);

export const CommonSpan = ThemeHoc(
  CSSComponent({
    tag: 'span',
    className: 'commonSpan',
    normal: {
      selectNames: [['color'], ['fontSize']],
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: HoverDefaultColor,
      },
    },
    css: `
    font-size: ${FontSize}
  `,
  }),
  'commonSpan',
  { hover: true, actived: false }
);

export const SeparatorSpan = CSSComponent({
  tag: 'span',
  className: 'separatorSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['margin']],
  },

  css: `
  font-size: ${FontSize};
  display: inline-block;
  margin-left: ${separatorMarginLeft};
  margin-right: ${separatorMarginRight};
  color: ${DefaultColor};
  `,
});

export const ALink = ThemeHoc(
  CSSComponent({
    tag: 'a',
    className: 'aLink',
    normal: {
      selectNames: [['color'], ['fontSize']],
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: HoverDefaultColor,
      },
    },

    css: `
    font-weight: ${FontWeight};
    text-decoration: none;
    color: ${DefaultColor};
  `,
  }),
  'aLink',
  { hover: true, actived: false }
);

export const BreadcrumbContainer = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [['width'], ['height'], ['color'], ['padding'], ['margin']],
  },
  css: `
    display: inline-block;
    padding: 0;
    box-sizing: border-box
  `,
});
