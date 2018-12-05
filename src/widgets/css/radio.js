/**
 * Radio 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';

const FontSize = 1.4;
const em = px2emcss(FontSize);
const {
  themeColor,
  padding,
  borderColor,
  borderDisableColor,
  disableColor,
  marginToDifferentElement,
  marginToPeerElementForY,
  blackColor,
  lightGreyColor,
} = colorsFunc();

type RadioStyleType = 'default' | 'vertical';
export type CSStype = {
  themes: ThemeType,
};
export type RadioProps = {
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  cancel?: boolean,
  styles?: RadioStyleType,
  getTheme: Function,
  onChange?: Function,
  item?: Object,
  value?: string,
  children?: any,
};
type RadioType = RadioProps & CSStype;

const getStyleCSS = (props: RadioType): string => {
  const { styles = 'default' } = props;
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

const getThemeColor = (props: RadioType): string => {
  const { themes, cancel } = props;
  const ComThemeColor = themes.color || themeColor;
  if (cancel) {
    return colorsFunc(ComThemeColor).disabledColor;
  }
  return ComThemeColor;
};
const getIsClickBorder = (props: RadioType): string => {
  const { checked } = props;
  return `
    border: 1px solid ${checked ? getThemeColor(props) : borderColor};
  `;
};
const getClickedCSS = (props: RadioType): string => {
  const { checked, disabled } = props;
  if (checked) {
    return `
      position: absolute;
      width: ${em(10)};
      height: ${em(10)};
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: ${em(10)};
      display: table;
      border-top: 0;
      border-left: 0;
      content: ' ';
      background-color: ${disabled ? lightGreyColor : getThemeColor(props)};
    `;
  }
  return '';
};
const hoverStyle = (props: RadioType): string => {
  const { disabled } = props;

  return `
    border: 1px solid ${disabled ? borderDisableColor : getThemeColor(props)};
  `;
};
const getDisabledCSS = (props: RadioType): string => {
  const { disabled } = props;
  if (disabled) {
    return `
      background-color: ${disableColor};
      border: 1px solid ${borderDisableColor};
      color: ${lightGreyColor};
      
      &::after {
        ${getInnerDisabledCheckCSS(props)};
      }
    `;
  }
  return '';
};
const getInnerDisabledCheckCSS = (props: RadioType): string => {
  const { checked, defaultChecked } = props;

  return `background-color: ${checked || defaultChecked ? lightGreyColor : 'none'}`;
};
const getThemeMargin = (props: RadioType): string => {
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

export const RadioWrap = styled.label`
  font-size: ${FontSize}rem;
  line-height: 1.5;
  color: ${props => (props.disabled ? lightGreyColor : blackColor)};
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  display: inline-block;
  position: relative;
  white-space: nowrap;
  width: ${props => (props.themes.width ? em(props.themes.width) : 'none')};
  ${props => (props.disabled || props.cancel ? 'cursor: not-allowed' : 'cursor: pointer')};
  ${getStyleCSS};
  ${getThemeMargin};

  &:hover > span > span {
    ${hoverStyle};
  }
`;
export const RadioContent = styled.span`
  margin: 0;
  outline: none;
  line-height: 1;
  vertical-align: text-bottom;
  display: inline-block;
`;
export const RadioChildrenSpan = styled.span`
  padding-left: ${em(padding)};
`;
export const RadioInnerSpan = styled.span`
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: ${em(16)};
  height: ${em(16)};
  border-radius: 50%;
  ${getIsClickBorder};
  background-color: #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &::after {
    ${getClickedCSS};
  }

  ${getDisabledCSS};
`;
