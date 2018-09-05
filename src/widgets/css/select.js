/**
 * create by szfeng
 *
 * @flow
 */
import { keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import * as InputCSS from './input';
const { themeColor } = colorsFunc();

export const MenuItemHeight = 30;
export const DefaultHeight = 250;
export const CheckAllFontSize = 18;

export const { normalColor } = colorsFunc();

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

export function IsShowSearchInputHandle(props: Object) {
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
}
