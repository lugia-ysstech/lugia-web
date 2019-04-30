/**
 * create by szfeng
 *
 * @flow
 */

import { css, keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import * as InputCSS from './input';

export const { themeColor, darkGreyColor } = colorsFunc();

export const checkAllButtonAnimate = (fromHeight: any, toHeight: any) => {
  const animate = keyframes`
    from {
      transform: translateY(-${fromHeight});
    }
    to {
      transform: translateY(-${toHeight});
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
      animation: ${checkAllButtonAnimate(0, InputCSS.DefaultHeight)} 0.4s linear;
      animation-fill-mode: forwards;
    `;
  }

  if (toShowCheckAllButtonIng) {
    return css`
      animation: ${checkAllButtonAnimate(InputCSS.DefaultHeight, 0)} 0.4s linear;
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
      transform: translateY(-${InputCSS.DefaultHeight});
        `;
  }
  return '';
}
