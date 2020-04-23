/**
 * create by szfeng
 *
 * @flow
 */

import { css, keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import * as InputCSS from './input';
import { px2remcss } from '../css/units';
import get from '../css/theme-common-dict';

export const { themeColor, darkGreyColor } = colorsFunc();

export const checkAllButtonAnimate = (fromHeight: any, toHeight: any) => {
  const animate = keyframes`
    from {
      transform: translateY(-${px2remcss(fromHeight)});
    }
    to {
      transform: translateY(-${px2remcss(toHeight)});
    }
  `;
  return animate;
};

export function getCheckAllButtonColor(props: Object) {
  return props.isCheckedAll === false ? themeColor : 'red';
}

export function IsShowSearchInputHandle(props: Object): string {
  const {
    showSearchInput,
    showCheckAllButton,
    toShowSearchInputIng,
    toShowCheckAllButtonIng,
  } = props;
  if (toShowSearchInputIng) {
    return css`
      animation: ${checkAllButtonAnimate(0, get('smallSize'))} 0.4s linear;
      animation-fill-mode: forwards;
    `;
  }

  if (toShowCheckAllButtonIng) {
    return css`
      animation: ${checkAllButtonAnimate(get('smallSize'), 0)} 0.4s linear;
      animation-fill-mode: forwards;
    `;
  }

  if (showCheckAllButton) {
    return `
        transform: translateY(0);
        `;
  }

  if (showSearchInput) {
    return `
      transform: translateY(-${px2remcss(get('smallSize'))});
        `;
  }
  return '';
}
