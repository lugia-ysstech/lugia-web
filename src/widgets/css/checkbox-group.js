/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */
import { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import get from './theme-common-dict';

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
    const colors = themes.color || get('themeColor');
    const borderRadiusValue = get('borderRadiusValue');
    if (childType === 'button') {
      if (disabled) {
        return `
          border-left: 1px solid ${get('borderDisableColor')};
        `;
      }
      if (cancel) {
        return `
          border-left: 1px solid ${get('disabledColor')};
          & > span {
            border-radius: ${px2remcss(borderRadiusValue)} 0 0 ${px2remcss(borderRadiusValue)};
          }
        `;
      }
      const { color: normalBorderColor } = get('normalBorder');
      return `
        border-left: 1px solid ${checked ? colors : normalBorderColor};
      `;
    }
  }

  return '';
};
const getLastChildBorder = (props: GroupCSSProps): string => {
  const { themes = {}, children = [], childType = 'default' } = props;
  const { checked = false, disabled = false } =
    (children.length && children[children.length - 1].props) || {};
  const colors = themes.color || get('themeColor');
  if (childType === 'button') {
    if (checked) {
      return `
      border-right: 1px solid ${disabled ? get('borderDisableColor') : colors};
    `;
    }
  }

  return '';
};
const getButtonCSS = (props: GroupCSSProps) => {
  const borderRadiusValue = get('borderRadiusValue');
  const { childType = 'default' } = props;
  if (childType === 'button') {
    return `& > label:first-child > span {
      ${getFirstChildBorder(props)};
      border-radius: ${px2remcss(borderRadiusValue)} 0 0 ${px2remcss(borderRadiusValue)};
    }
    & > label:last-child > span {
      border-radius: 0 ${px2remcss(borderRadiusValue)} ${px2remcss(borderRadiusValue)} 0;
      ${getLastChildBorder(props)};
    }`;
  }
};

export const Group = CSSComponent({
  tag: 'div',
  className: 'CheckboxGroup',
  css: css`
    ${getButtonCSS};
  `,
  normal: {
    selectNames: [
      ['opacity'],
      ['border'],
      ['borderRadius'],
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
