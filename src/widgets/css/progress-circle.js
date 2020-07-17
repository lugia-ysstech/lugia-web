/**
 * Progress
 * create by guorg
 * @flow
 */
import styled, { css } from 'styled-components';
import { px2remcss } from './units';
import { getTextColor, getWrapFontSize } from './progress-line';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
type CSSProps = {
  size: 'default' | 'small',
};

const blackColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';

const getWidthAndHeight = (props: CSSProps) => {
  const { size } = props;
  const distance = size === 'default' ? px2remcss(120) : px2remcss(80);
  return `
    width: ${distance};
    height: ${distance};
  `;
};

export const SvgInner = CSSComponent({
  tag: 'div',
  className: 'SvgInner',
  css: css`
    ${getWidthAndHeight}
    position: relative;
    font-size: ${getWrapFontSize}rem;
  `,
  normal: {
    selectNames: [['width'], ['height']],
  },
});

const getFontSize = (props: CSSProps) => {
  const { size } = props;
  const fontSize = size === 'small' ? 'headLineFontSize' : 'largeTitleFontSize';
  return `font-size: ${px2remcss(get(fontSize))}`;
};

export const SvgText = CSSComponent({
  tag: 'span',
  className: 'ProgressSvgText',
  css: css`
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    line-height: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    margin: 0;
    color: ${getTextColor};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: normal;
    white-space: nowrap;
    ${getFontSize};
  `,
  normal: {
    selectNames: [['font'], ['color']],
    defaultTheme: {
      color: blackColor,
    },
    getThemeMeta(themeMeta, themeProps): Object {
      const { propsConfig = {} } = themeProps;
      const { status } = propsConfig;
      const color = getTextColor(status);

      return {
        color,
      };
    },
  },
});

export const CircleWrap = StaticComponent({
  tag: 'svg',
  className: 'CircleWrap',
  css: css`
    width: 100%;
    height: 100%;
  `,
});
