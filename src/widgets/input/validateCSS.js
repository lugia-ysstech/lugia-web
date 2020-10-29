import React from 'react';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { isValidateError } from '../css/validateHoc';
import { units } from '@lugia/css';
import get from '../css/theme-common-dict';
import { getWidthCSS } from './utils';
const { px2remcss } = units;
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';

function getTipShowCSS(themeProps: Object) {
  const { propsConfig } = themeProps;
  const { validateStatus, innerVisible } = propsConfig;
  const theVisibility = isValidateError(validateStatus) && innerVisible ? 'visible' : 'hidden';
  return `visibility:${theVisibility}`;
}

export const TipBottom = CSSComponent({
  tag: 'div',
  className: 'inputTipBottom',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: dangerColor,
      fontSize: 12,
      height: 16,
      margin: {
        left: 10,
        top: 4,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      return getTipShowCSS(themeProps);
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
});

export const InnerTipText: Object = CSSComponent({
  tag: 'span',
  className: 'InnerTip',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['background'], ['margin']],
    defaultTheme: {
      color: dangerColor,
      fontSize: 12,
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { background } = themeMeta;
      const theColor = background && background.color ? background.color : 'white';
      return `${getTipShowCSS(themeProps)};background-color:${theColor};
          box-shadow: ${px2remcss(-14)} 0 ${px2remcss(6)} 0 ${theColor};`;
    },
  },
  css: css`
    min-width: ${px2remcss(30)};
    position: absolute;
    right: ${px2remcss(get('padding'))};
    top: 10%;
    height: 80%;
    display: flex;
    align-items: center;
  `,
});

export const BottomContainer: Object = CSSComponent({
  tag: 'div',
  className: 'BottomContainer',
  normal: {
    selectNames: [['width']],
    getCSS(themeMeta, themeProps) {
      const { width } = themeMeta;
      const { propsConfig: { inMega } = {} } = themeProps;
      const disPlayCSS = inMega ? 'display: flex;flex-direction: column;' : '';
      return `${getWidthCSS(width)}${disPlayCSS}`;
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
    font-size: 0;
    height: 100%;
  `,
});

export const FatherContainer: Object = CSSComponent({
  extend: BottomContainer,
  className: 'FatherContainer',
  css: css`
    position: relative;
  `,
});
