import { px2remcss } from '../css/units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import '../css/theme-common-dict';

const noLastItemColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const marginToSameElement = '$lugia-dict.@lugia/lugia-web.marginToSameElement';
export const defaultColor = '$lugia-dict.@lugia/lugia-web.blackColor';
export const hoverDefaultColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
export const iconfontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
export const iconToTextMargin = '$lugia-dict.@lugia/lugia-web.paddingToText';

export const CommonSpan = CSSComponent({
  tag: 'span',
  className: 'commonSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['margin'], ['padding'], ['font']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig: { isLastItem } = {} } = themeConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      return {
        color,
        fontSize: sectionFontSize,
      };
    },
  },

  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['font']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig: { isLastItem } = {} } = themeConfig;
      const color = isLastItem ? defaultColor : hoverDefaultColor;
      return {
        color,
      };
    },
  },
  css: css`
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
  `,
  option: { hover: true },
});

export const ALink = CSSComponent({
  tag: 'a',
  className: 'aLink',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['margin'], ['padding']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig: { isLastItem } = {} } = themeConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      return {
        color,
        fontSize: sectionFontSize,
      };
    },
  },

  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig: { isLastItem } = {} } = themeConfig;
      const color = isLastItem ? defaultColor : hoverDefaultColor;
      return {
        color,
      };
    },
  },

  css: css`
    text-decoration: none;
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
  `,
  option: { hover: true },
});

export const SeparatorSpan = CSSComponent({
  tag: 'span',
  className: 'separatorSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['margin'], ['padding']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig: { isLastItem } = {} } = themeConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      const textToSeparatorLeft = isLastItem ? 0 : marginToSameElement;
      const textToSeparatorLeftRight = isLastItem ? 0 : marginToSameElement;
      return {
        color,
        margin: { top: 0, right: textToSeparatorLeftRight, bottom: 0, left: textToSeparatorLeft },
      };
    },
  },

  css: css`
    font-size: ${px2remcss(16)};
    display: inline-block;
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
    defaultTheme: {},
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
    width: 100%;
  `,
  option: { hover: true },
});

export const ItemWrap = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [
      ['width'],
      ['padding'],
      ['margin'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  hover: {
    selectNames: [
      ['width'],
      ['padding'],
      ['margin'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  css: css`
    display: inline-block;
    padding: 0;
    box-sizing: border-box;
    vertical-align: top;
  `,
});

export const FlexBox = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  `,
});

export const FlexContainer = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
  `,
});
