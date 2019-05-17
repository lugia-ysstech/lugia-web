/**
 *
 * create by ligx
 *
 * @flow
 */

// import type { ThemeType } from '@lugia/lugia-web';
import React from 'react';
import styled, { css } from 'styled-components';

type WidthType = number;
type HeightType = number;
type MarginType = { top?: number, right?: number, bottom?: number, left?: number };
type PaddingType = { top?: number, right?: number, bottom?: number, left?: number };
type BorderType = {
  borderWidth: string,
  borderStyle: string,
  borderColor: string,
};
type ColorType = string;
type OpacityType = number;
type BackgroundType = {
  backgroundColor: ColorType,
  backgroundImage: string,
};

type FontSizeType = number;
type FontType = { fontStyle: string, fontWeight: number, fontSize: number };

type ThemeMeta = {
  background?: BackgroundType,
  backgroundColor?: ColorType,
  border?: BorderType,
  width?: WidthType,
  height?: HeightType,
  font?: FontType,
  fontSize?: FontSizeType,
  color?: ColorType,
  opacity?: OpacityType,
  margin?: MarginType,
  padding?: PaddingType,
};

type ThemeConfig = {
  normal: ThemeMeta,
  disabled: ThemeMeta,
  clicked: ThemeMeta,
  hover: ThemeMeta,
  children: { [childName: string]: ThemeConfig },
};

// 目前state类型
type TagType = 'span' | 'a' | 'input' | 'li' | 'button' | 'div';

type ThemeProps = {
  themeState: { click: boolean, disabled: boolean, hover: boolean },
  themeConfig: ThemeConfig,
};
type CSSMeta = {
  selectNames?: string[], // 默认不设置是取全部属性
  getStyle?: (theme: ThemeConfig) => Object,
  default?: ThemeMeta, // 自己写的样式
};
type CSSConfig = {
  tag: TagType,
  css: any, // 这个是要去 css 模板的写法

  normal?: CSSMeta,
  clicked?: CSSMeta,
  hover?: CSSMeta,
  disabled?: CSSMeta,
};

function getStyleByThemeMeta(theme: ThemeMeta): Object {
  const { width = 0, height = 0, background, color } = theme;
  console.log(theme, 'theme');
  //
  // const newTheme = {};
  // for (const key in theme) {
  //   theme[key] = newTheme[key];
  // }
  // console.log(newTheme,'newTheme');
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
  const { width, height, color, background } = style;
  //有这条属性 才去 赋值, 没有就不给添加
  const theBg = background ? background : '';
  return `
        width: ${width};
        color: ${color};
        height: ${height};
        background:${theBg}`;
}
function getConfigSelectArray(cssConfig, state) {
  let array = [];
  if (cssConfig && state && cssConfig[state] && cssConfig[state].selectNames) {
    array = [...cssConfig[state].selectNames];
  }
  return array;
}
function selectSelfStyle(stateArray: Array<string>, style: Object): Object {
  if (stateArray.length === 0) {
    return style;
  }
  const newStyle = {};
  stateArray &&
    stateArray.forEach(child => {
      console.log('child', child);
      const hasKey = child in style;
      if (hasKey) {
        newStyle[child] = style[child];
      }
    });
  return newStyle;
}
//默认style
function getDefaultStyle(cssConfig, state) {
  if (!cssConfig || !state) return {};
  return cssConfig && cssConfig[state] && cssConfig[state].default ? cssConfig[state].default : {};
}

// style obj
function getStyle(cssConfig: CSSConfig) {
  return (props: ThemeProps) => {
    const { themeState, themeConfig } = props;

    // 获取状态配置数组
    const normalArray = getConfigSelectArray(cssConfig, 'normal');
    const clickedArray = getConfigSelectArray(cssConfig, 'clicked');
    const hoverArray = getConfigSelectArray(cssConfig, 'hover');
    const disabledArray = getConfigSelectArray(cssConfig, 'disabled');

    const { normal = {}, clicked = {}, disabled = {}, hover = {} } = themeConfig;
    // normal < click < disabled < hover

    const normalDefaultStyle = getDefaultStyle(cssConfig, 'normal');
    const clickedDefaultStyle = getDefaultStyle(cssConfig, 'clicked');
    const disabledDefaultStyle = getDefaultStyle(cssConfig, 'disabled');
    const hoverDefaultStyle = getDefaultStyle(cssConfig, 'hover');
    console.log('hoverStyle', hoverDefaultStyle);
    const {
      hover: hoverState = false,
      disabled: disabledState = false,
      click: clickState = false,
    } = themeState;
    //获取每种状态里边的配置项 然后给到的 themeMeta 里边取

    const normalStyle = Object.assign(
      selectSelfStyle(normalArray, getStyleByThemeMeta(normal)),
      normalDefaultStyle
    );

    const clickedStyle = clickState
      ? selectSelfStyle(clickedArray, getStyleByThemeMeta(clicked))
      : clickedDefaultStyle;
    const disabledStyle = disabledState
      ? selectSelfStyle(disabledArray, getStyleByThemeMeta(disabled))
      : disabledDefaultStyle;
    const hoverStyle = hoverState
      ? selectSelfStyle(hoverArray, getStyleByThemeMeta(hover))
      : hoverDefaultStyle;
    console.log(normalStyle, 'normalStyle');
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
