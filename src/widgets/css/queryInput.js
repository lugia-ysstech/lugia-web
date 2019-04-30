/**
 * create by szfeng
 *
 * @flow
 */

import { css } from 'styled-components';
import colorsFunc from '../css/stateColor';
import * as InputCSS from './input';

export const { themeColor, darkGreyColor } = colorsFunc();

export const checkAllButtonAnimate = (fromHeight: any, toHeight: any) => {
  const animate = css`
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
    return `
        animation: ${checkAllButtonAnimate(0, InputCSS.DefaultHeight)} .4s linear;
        animation-fill-mode: forwards;
          `;
  }

  if (toShowCheckAllButtonIng) {
    return `
        animation: ${checkAllButtonAnimate(InputCSS.DefaultHeight, 0)} .4s linear;
        animation-fill-mode: forwards
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
