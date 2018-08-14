/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
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

export type CSStype = {
  themes: ThemeType,
  hasChecked: boolean,
  hasCancel: boolean,
};
export type CheckBoxProps = {
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean,
  cancel?: boolean,
  getTheme: Function,
  onChange?: (event: Object, val: any) => any,
  value?: string,
  children?: any,
  styles?: 'default' | 'vertical',
  handleCancelItemClick: Function,
};
type CheckBoxType = CheckBoxProps & CSStype;

const getColors = (props: CheckBoxType): string => {
  const {
    checked = false,
    hasChecked = false,
    themes,
    disabled,
    indeterminate,
    cancel = false,
  } = props;
  const ComThemeColor = themes.color || themeColor;
  if (disabled) {
    return `
        background-color: ${disableColor};
        border: 1px solid ${borderDisableColor};
      `;
  }
  if (cancel) {
    return `
        background-color: ${disabledColor};
        border: 1px solid ${disabledColor};
    `;
  }
  if (checked || indeterminate) {
    return `
    background-color: ${ComThemeColor};
    border: 1px solid ${ComThemeColor};
    `;
  }
  return `
  background-color: ${defaultColor};
  border: 1px solid ${hasChecked ? ComThemeColor : borderColor};
  `;
};
const hoverStyle = (props: CheckBoxType): string => {
  const { disabled, themes, cancel } = props;
  const ComThemeColor = themes.color || themeColor;
  if (cancel) {
    return '';
  }
  return `
    border: 1px solid ${disabled ? borderDisableColor : ComThemeColor};
  `;
};
const getAfterTransform = (props: CheckBoxType): string => {
  const { checked, indeterminate } = props;
  if (checked) {
    return `
      left: ${em(5)};
      top: ${em(2)};
      width: ${em(6)};
      height: ${em(10)};
      transform: rotate(45deg) scale(1);
      transition: all .2s cubic-bezier(.71,-.46,.88,.6);
  `;
  }
  if (indeterminate) {
    return `
      left: ${em(3)};
      top: ${em(7)};
      width: ${em(10)};
      height: ${em(1)};
      transform: scale(1);
      transition: all .2s cubic-bezier(.03,.86,.56,.87);
    `;
  }
  return `
    left: ${em(5)};
    top: ${em(2)};
    width: ${em(6)};
    height: ${em(10)};
    transform: rotate(45deg) scale(0);
    transition: all .1s cubic-bezier(.71,-.46,.88,.6);
  `;
};
const getStyleCSS = (props: CheckBoxType): string => {
  const { styles = 'default', hasCancel } = props;
  if (hasCancel) {
    return `
      display: none;
    `;
  }
  if (styles === 'vertical') {
    return `
      display: block;
      margin-bottom: ${em(marginToPeerElementForY)};
    `;
  }
  return `
    display: inline-block;
    margin-right: ${em(marginToDifferentElement)};
  `;
};
const getThemeMargin = (props: CheckBoxType): string => {
  const { margin } = props.themes;
  if (margin) {
    if (typeof margin === 'number') {
      return `margin: ${em(margin)};`;
    }
    if (typeof margin === 'object') {
      const { top, right, bottom, left } = margin;
      if (top && right && bottom && left) {
        return `margin: ${em(top)} ${em(right)} ${em(bottom)} ${em(left)};`;
      }
    }
  }
  return '';
};

export const CheckBoxWrap = styled.label`
  font-size: ${FontSize}rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? lightGreyColor : blackColor)};
  width: ${props => (props.themes.width ? em(props.themes.width) : 'none')};
  box-sizing: border-box;
  padding: 0;
  list-style: none;
  display: inline-block;
  position: relative;
  white-space: nowrap;
  ${getStyleCSS} ${getThemeMargin};

  &:hover > span span {
    ${hoverStyle};
  }
`;
export const CheckBoxContent = styled.span`
  margin: 0;
  outline: none;
  line-height: 1;
  vertical-align: text-bottom;
  display: inline-block;
`;
export const CheckBoxLabelSpan = styled.span`
  padding-left: ${em(10)};
`;
export const CheckBoxInput = styled.input`
  position: absolute;
  left: 0;
  z-index: 1;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
export const CheckBoxInnerSpan = styled.span`
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: 0;
  display: block;
  width: ${em(18)};
  height: ${em(18)};
  border-radius: ${em(2)};
  ${getColors} transition: all 0.3s;

  &:hover {
    ${hoverStyle};
  }
  &::after {
    position: absolute;
    box-sizing: border-box;
    ${getAfterTransform} display: table;
    border: ${em(2)} solid ${props => (props.disabled ? lightGreyColor : defaultColor)};
    border-top: 0;
    border-left: 0;
    content: ' ';
  }
`;
export const HoverSpan = styled.span`
  box-sizing: border-box;
  display: block;
  width: ${em(18)};
  height: ${em(18)};
`;
export const IconWrap = styled(Icon)`
  vertical-align: text-bottom !important;
  font-size: ${em(18)};
  color: ${mediumGreyColor};
`;
