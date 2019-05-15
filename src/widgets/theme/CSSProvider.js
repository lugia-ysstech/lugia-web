/**
 *
 * create by ligx
 *
 * @flow
 */

import type { ThemeType } from '@lugia/lugia-web';
import React from 'react';
import styled, { css } from 'styled-components';

type ThemeConfig = {
  normal: ThemeType,
  disabled: ThemeType,
  clicked: ThemeType,
  hover: ThemeType,
  children: { [childName: string]: ThemeConfig },
};

// 目前state类型
type TagType = 'span' | 'a' | 'input' | 'li' | 'button';

type ThemeProps = {
  themeState: { click: boolean, disabled: boolean, hover: boolean },
  themeConfig: ThemeConfig,
};
type CSSMeta = {
  selectNames?: string[], // 默认是取全部属性
  getStyle?: (theme: ThemeConfig) => Object,
  default?: ThemeType,
};
type CSSConfig = {
  tag: TagType,
  css: any,
  normal?: CSSMeta,
  clicked?: CSSMeta,
  hover?: CSSMeta,
  disabled?: CSSMeta,
};

function getStyleByThemeMeta(theme: ThemeType): Object {
  const { width = 0, height = 0, background, color } = theme;
  return {
    width: `${width}px`,
    height: `${height}px`,
    background,
    color,
  };
}

function style2css(style: Object): string {
  if (!style) {
    return '';
  }
  const { width, height, color } = style;
  return `
        width: ${width};
        color: ${color};
        height: ${height};`;
}

// style obj
function getStyle(css: CSSConfig) {
  return (props: ThemeProps) => {
    const { themeState, themeConfig } = props;
    const { normal = {}, clicked = {}, disabled = {}, hover = {} } = themeConfig;
    // normal < click < disabled < hover

    const normalStyle = getStyleByThemeMeta(normal);

    const {
      hover: hoverState = false,
      disabled: disabledState = false,
      click: clickState = false,
    } = themeState;

    const clickedStyle = clickState ? getStyleByThemeMeta(clicked) : {};
    const disabledStyle = disabledState ? getStyleByThemeMeta(disabled) : {};
    const hoverStyle = hoverState ? getStyleByThemeMeta(hover) : {};
    return { style: Object.assign(normalStyle, clickedStyle, disabledStyle, hoverStyle) };
  };
}

let enabledClassNameBool = false;

export function enabledClassName() {
  enabledClassNameBool = true;
}

export function getClassName(className: string): string {
  return enabledClassNameBool ? className : '';
}

// css str
function getCSS(getStyle: Function) {
  return (props: ThemeProps) => {
    const { style } = getStyle(props);
    return css`
      ${style2css(style)}
    `;
  };
}

export default function CSSProvider(cssConfig: CSSConfig) {
  const { tag, css } = cssConfig;
  const styledElement = styled[tag];
  if (!styledElement) {
    throw new Error(`Not support tag: ${tag}`);
  }
  const style = getStyle(css);
  return styledElement.attrs(style)`
    ${css}
    ${getCSS(style)}
  `;
}
