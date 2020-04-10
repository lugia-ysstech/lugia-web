import React from 'react';

import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { isValidateError } from '../css/input';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import get from '../css/theme-common-dict';
const { px2remcss } = units;
const { shadowSpread, hShadow, vShadow, borderSize } = colorsFunc();
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const dangerHoverColor = '$lugia-dict.@lugia/lugia-web.dangerHoverColor';
const dangerActiveColor = '$lugia-dict.@lugia/lugia-web.dangerActiveColor';

function getTipShowCSS(themeProps: Object) {
  const { propsConfig } = themeProps;
  const { validateStatus, _isTipMaskVisible = true } = propsConfig;
  const theVisibility = isValidateError(validateStatus) && _isTipMaskVisible ? 'visible' : 'hidden';
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
      height: 32,
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
    selectNames: [['font'], ['fontSize'], ['color']],
    defaultTheme: {
      color: dangerColor,
    },
  },
  css: css`
    min-width: ${px2remcss(30)};
    background-color: ${get('defaultColor')};
  `,
});
export const InnerTip: Object = CSSComponent({
  tag: 'span',
  className: 'InnerTip',
  normal: {
    selectNames: [],
    getCSS(themeMeta: Object, themeProps: Object) {
      return getTipShowCSS(themeProps);
    },
  },
  css: css`
    min-width: ${px2remcss(30)};
    position: absolute;
    right: ${px2remcss(32)};
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
  `,
});
export const InnerTipMask: Object = StaticComponent({
  tag: 'div',
  className: 'InnerTipMask',
  css: css`
    width: ${px2remcss(15)};
  `,
});
export const FatherContainer: Object = StaticComponent({
  tag: 'div',
  className: 'FatherContainer',
  css: css`
    position: relative;
    height: 100%;
  `,
});

export const defaultBorderThemeProps = {
  themeConfig: {
    normal: {
      border: getBorder({ color: dangerColor, width: borderSize, style: 'solid' }),
      boxShadow: getBoxShadow(
        `${hShadow}px ${vShadow}px ${shadowSpread}px ${get('inputDangerColor')}`
      ),
    },
    hover: {
      border: getBorder({ color: dangerHoverColor, width: borderSize, style: 'solid' }),
    },
    active: {
      border: getBorder({ color: dangerActiveColor, width: borderSize, style: 'solid' }),
      boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px ${dangerActiveColor}`),
    },
    disable: {
      border: getBorder({ color: borderColor, width: borderSize, style: 'solid' }),
    },
  },
};
export const defaultFontColorThemeProps = {
  themeConfig: {
    normal: {
      color: dangerColor,
    },
  },
};
