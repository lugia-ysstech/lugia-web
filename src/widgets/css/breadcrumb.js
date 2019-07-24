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
    selectNames: [['color'], ['fontSize'], ['font'], ['margin'], ['padding'], ['font']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? '#000' : DefaultColor;
      return {
        color,
      };
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['font']],
    defaultTheme: {
      color: HoverDefaultColor,
    },
  },
  css: css`
    display: inline-block;
    font-size: ${FontSize};
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `,
  option: { hover: true },
});

export const ALink = CSSComponent({
  tag: 'a',
  className: 'aLink',
  normal: {
    selectNames: [
      ['color'],
      ['fontSize'],
      ['font'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? '#000' : DefaultColor;
      return {
        color,
      };
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: HoverDefaultColor,
    },
  },

  css: css`
    text-decoration: none;
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `,
  option: { hover: true },
});

export const SeparatorSpan = CSSComponent({
  tag: 'span',
  className: 'separatorSpan',
  normal: {
    selectNames: [
      ['color'],
      ['fontSize'],
      ['font'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? '#000' : DefaultColor;
      return {
        color,
      };
    },
  },

  css: css`
    font-size: ${px2remcss(16)};
    display: inline-block;
    margin-left: ${separatorMarginLeft};
    margin-right: ${separatorMarginRight};
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
    vertical-align: top;
  `,
});

export const FlexBox = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  `,
});
