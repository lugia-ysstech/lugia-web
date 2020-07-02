/**
 * Progress
 * create by guorg
 * @flow
 */
import { css, keyframes } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import get from '../css/theme-common-dict';
import { px2remcss } from './units';

type StatusType = 'success' | 'error' | 'default';

export type ProgressProps = {
  type?: 'line' | 'circle' | 'dashboard',
  size?: 'default' | 'small',
  percent?: number,
  status?: StatusType,
  showInfo?: boolean,
  active?: boolean,
  format?: Function,
  getTheme: Function,
  showType?: 'default' | 'inside',
  themeProps: Object,
  getPartOfThemeProps: Function,
  iconClass?: string,
};

export type ProgressState = {
  fixed: boolean,
};

type CSSProps = {
  type: 'line' | 'circle' | 'dashboard',
  percent: number,
  status: 'success' | 'default' | 'error',
  theme: Object,
  showInfo: boolean,
  inside: boolean,
  size: 'default' | 'small',
  showType: 'default' | 'inside',
};

const FontSize = 1.4;
const isSmall = size => size === 'small';
export const getWrapFontSize = (props: Object) => {
  const { size } = props;
  if (isSmall(size)) {
    return 1.2;
  }
  return FontSize;
};

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const superLightColor = '$lugia-dict.@lugia/lugia-web.superLightColor';

export const handlePercent = (per: number) => {
  per = per - 0;
  per = per && !isNaN(per) ? per : 0;
  return Math.min(Math.max(per, 0), 100);
};

const bgColor = background => ({ background });
const BackgroundCSS = {
  success: {
    ...bgColor(successColor),
  },
  default: {
    ...bgColor(themeColor),
  },
  error: {
    ...bgColor(dangerColor),
  },
};

const activeAnimate = keyframes`
  0% {
    opacity: 0.1;
    width: 0;
  }
  20% {
    opacity: 0.5;
    width: 0;
  }
  100% {
    opacity: 0;
    width: 100%;
  }
`;

const getProgressCSS = (value: number): string => `
  width: calc(100% - ${px2remcss(value + 20)}); 
  margin-right:${px2remcss(value)}
`;

const getProgtrssWidth = (props: CSSProps) => {
  const { showInfo, showType } = props;
  if (showInfo && showType === 'default') {
    return ` ${getProgressCSS(get('marginToSameElement'))} `;
  }

  return 'width: 100%;';
};

export const ProgressLine = CSSComponent({
  tag: 'div',
  className: 'ProgressLine',
  css: css`
    ${getProgtrssWidth};
    display: inline-block;
    border-radius: ${px2remcss(50)};
    vertical-align: middle;
  `,
  normal: {
    selectNames: [['background'], ['borderRadius'], ['border'], ['boxShadow'], ['margin', 'right']],
    defaultTheme: {
      background: { color: superLightColor },
    },
    getCSS(themeMeta): string {
      const { margin: { right } = {} } = themeMeta;
      if (right) {
        return ` ${getProgressCSS(right)} `;
      }
    },
  },
});

const getBackGroundWidth = (props: CSSProps) => {
  const { percent } = props;
  return `
    width: ${handlePercent(percent)}%;
  `;
};

const getHeight = (propsConfig: Object) => {
  const { size, showType } = propsConfig;

  if (showType === 'inside') {
    return 16;
  }
  if (isSmall(size)) {
    return 6;
  }
  return 8;
};
const getLineHeight = (height: number | string) => {
  if (typeof height === 'number') {
    return px2remcss(height);
  }

  return height;
};
export const ProgressBackground = CSSComponent({
  tag: 'div',
  className: 'ProgressInnerLine',
  css: css`
    transition: all 0.3s;
    ${getBackGroundWidth};
    border-radius: ${px2remcss(50)};
    position: relative;
    text-align: right;
    box-sizing: border-box;
  `,
  normal: {
    selectNames: [
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['padding', 'right'],
    ],
    defaultTheme: {
      background: {
        color: themeColor,
      },
    },
    getThemeMeta(themeMeta, themeProps): Object {
      const { propsConfig = {} } = themeProps;
      const { status } = propsConfig;
      const height = getHeight(propsConfig);
      const backgroundCSS = BackgroundCSS[status];

      return {
        background: {
          color: backgroundCSS ? backgroundCSS.background : themeColor,
        },
        height,
      };
    },
    getCSS(themeMeta, themeProps): string {
      const { propsConfig = {} } = themeProps;
      const { height } = themeMeta;
      const lineHeight = height ? getLineHeight(height) : px2remcss(getHeight(propsConfig));
      const { active, activeLineTheme } = propsConfig;
      const { themeConfig: { normal: { color = '#fff' } = {} } = {} } = activeLineTheme;
      if (active) {
        return css`
          line-height: ${lineHeight};
          &::before {
            content: '';
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${color};
            border-radius: 50%;
            animation: ${activeAnimate} 2.4s ease infinite;
          }
        `;
      }
      return `line-height: ${lineHeight};`;
    },
  },
});

export const getTextColor = (status: 'error' | 'success' | 'default') => {
  if (status === 'error') {
    return dangerColor;
  }
  if (status === 'success') {
    return successColor;
  }

  return blackColor;
};

export const getTextFont = (propsConfig: Object) => {
  const { type, size } = propsConfig;
  if (type === 'circle' || type === 'dashboard') {
    if (isSmall(size)) {
      return 26;
    }
    return 40;
  }

  return isSmall(size) ? 12 : get('sectionFontSize');
};

export const ProgressText = CSSComponent({
  tag: 'span',
  className: 'ProgressText',
  css: css`
    display: inline-block;
    width: ${px2remcss(20)};
    text-align: left;
    white-space: nowrap;
    word-break: normal;
    vertical-align: middle;
  `,
  normal: {
    selectNames: [['font'], ['color']],
    defaultTheme: {
      font: { size: 14 },
      color: mediumGreyColor,
    },
    getThemeMeta(themeMeta, themeProps): Object {
      const { propsConfig = {} } = themeProps;
      const { status, size } = propsConfig;
      const color = getTextColor(status);
      const fontSize = getTextFont(size);

      return {
        color,
        font: { size: fontSize },
      };
    },
  },
});

const getMinWidth = (props: CSSProps) => {
  const { size, type } = props;
  if (type === 'line') {
    const minWidth = isSmall(size) ? 56 : 60;

    return `min-width: ${px2remcss(minWidth)};`;
  }
};

export const Wrap = CSSComponent({
  tag: 'div',
  className: 'progressLineWrap',
  css: css`
    font-size: ${getWrapFontSize}rem;
    ${getMinWidth};
  `,
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
    defaultTheme: {
      opacity: 1,
    },
  },
});

export const InsideText = CSSComponent({
  tag: 'span',
  className: 'ProgressInsideText',
  css: css`
    text-align: left;
    margin: 0 ${px2remcss(6)};
    white-space: nowrap;
    word-break: normal;
  `,
  normal: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: '#fff',
      font: { size: 14 },
    },
  },
});
