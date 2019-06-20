/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';

const { themeColor, borderColor, borderDisableColor, disabledColor } = colorsFunc();

export type GroupCSSProps = {
  children: any,
  themes: Object,
  childType: 'default' | 'button',
};

const getFirstChildBorder = (props: GroupCSSProps): string => {
  const { children = [], themes = {}, childType = 'default' } = props;
  if (children && children.length > 0) {
    const { checked = false } = children[0].props;
    const { cancel = false } = children[0].props;
    const { disabled = false } = children[0].props;
    const colors = themes.color || themeColor;
    if (childType === 'button') {
      if (disabled) {
        return `
          border-left: 1px solid ${borderDisableColor};
        `;
      }
      if (cancel) {
        return `
          border-left: 1px solid ${disabledColor};
          & > span {
            border-radius: ${px2remcss(4)} 0 0 ${px2remcss(4)};
          }
        `;
      }

      return `
        border-left: 1px solid ${checked ? colors : borderColor};
      `;
    }
  }

  return '';
};
const getLastChildBorder = (props: GroupCSSProps): string => {
  const { themes = {}, children = [], childType = 'default' } = props;
  const { checked = false, disabled = false } =
    (children.length && children[children.length - 1].props) || {};
  const colors = themes.color || themeColor;
  if (childType === 'button') {
    if (checked) {
      return `
      border-right: 1px solid ${disabled ? borderDisableColor : colors};
    `;
    }
  }

  return '';
};
const getButtonCSS = (props: GroupCSSProps) => {
  const { childType = 'default' } = props;
  if (childType === 'button') {
    return `& > label:first-child > span {
      ${getFirstChildBorder(props)}; 
      border-radius: ${px2remcss(4)} 0 0 ${px2remcss(4)};
    }
    & > label:last-child > span {
      border-radius: 0 ${px2remcss(4)} ${px2remcss(4)} 0;
      ${getLastChildBorder(props)};
    }`;
  }
};

export const Group = CSSComponent({
  tag: 'div',
  className: 'check-group',
  css: css`
    ${getButtonCSS};
  `,
  normal: {
    selectNames: [
      ['opacity'],
      ['border'],
      ['background'],
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
    ],
  },
  hover: { selectNames: [] },
  active: { selectNames: [] },
  disabled: { selectNames: [] },
});
