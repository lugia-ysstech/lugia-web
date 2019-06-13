/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import styled, { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import Icon from '../icon';

const FontSize = 1.4;
const defaultColor = '#fff';
const em = px2emcss(FontSize);
const {
  themeColor,
  mediumGreyColor,
  borderColor,
  borderDisableColor,
  disableColor,
  disabledColor,
  marginToDifferentElement,
  marginToPeerElementForY,
  blackColor,
  lightGreyColor,
} = colorsFunc();

export type CheckBoxGroupProps = {
  defaultValue?: string[],
  value?: Array<string>,
  disabled?: boolean,
  data?: Array<Object>,
  onChange?: Function,
  displayField?: string,
  displayValue?: Array<string>,
  defaultDisplayValue?: Array<string>,
  valueField?: string,
  children?: any,
  getTheme: Function,
  styles?: 'default' | 'vertical',
  cache?: boolean,
  childType?: 'default' | 'button',
  size?: 'default' | 'small' | 'large' | 'bigger',
};
export type GroupCSSProps = {
  children: any,
  themes: Object,
  childType: 'default' | 'button',
};
export type CheckBoxGroupState = {
  value: Array<string>,
  displayValue: Array<string>,
  dataLength: number,
};

const getFirstChildBorder = (props: GroupCSSProps) => {
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
            border-radius: 4px 0 0 4px;
          }
        `;
      }
      console.log('colors borderColor', colors, borderColor);
      return `
        border-left: 1px solid ${checked ? colors : borderColor};
      `;
    }
  }
};
const getLastChildBorder = (props: GroupCSSProps) => {
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
};
const getButtonCSS = (props: GroupCSSProps) => {
  const { childType = 'default' } = props;
  if (childType === 'button') {
    return `& > span:first-child  > label > span {
      ${getFirstChildBorder(props)}; 
      border-radius: 4px 0 0 4px;
    }
    & > span:last-child > label > span {
      border-radius: 0 4px 4px 0;
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
