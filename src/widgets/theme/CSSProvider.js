/**
 *
 * create by ligx
 *
 * @flow
 */

// import type { ThemeType } from '@lugia/lugia-web';
import React from 'react';
import merge from 'deepmerge';
import decamelize from 'decamelize';
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

type FontType = { fontStyle: string, fontWeight: number, fontSize: number };
type BoxShadow = {};
type ThemeMeta = {
  background?: BackgroundType,
  border?: BorderType,
  width?: WidthType,
  height?: HeightType,
  font?: FontType,
  color?: ColorType,
  opacity?: OpacityType,
  margin?: MarginType,
  padding?: PaddingType,
  boxShadow?: BoxShadow,
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
type StateType = 'normal' | 'clicked' | 'hover' | 'disabled';
type ThemeProps = {
  themeState: { click: boolean, disabled: boolean, hover: boolean },
  themeConfig: ThemeConfig,
};
type CSSMeta = {
  selectNames?: Array<string[]>, // 默认不设置是取全部属性
  cssNames?: string[], // CSS生成的时候默认是使用内联样式 如果需要使用匿名类的属性列在此属性中指定
  getStyle?: (theme: ThemeConfig) => Object,
  getCSS?: (theme: ThemeConfig) => string,
  defaultTheme?: ThemeMeta, // 自己写的样式
};
type CSSConfig = {
  tag: TagType,
  css: any, // 这个是要去 css 模板的写法
  normal?: CSSMeta,
  clicked?: CSSMeta,
  hover?: CSSMeta,
  disabled?: CSSMeta,
};

export function deepMerge(objA: Object, objB: Object): Object {
  objA = objA || {};
  objB = objB || {};
  return merge(objA, objB);
}

export function getAttritubeValue(obj: Object, path: string[]): any {
  if (!obj) {
    return;
  }
  if (!path || path.length === 0) {
    return;
  }
  let target = obj;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    target = target[key];
    if (!target) {
      return;
    }
  }
  return target;
}

export function packObject(path: string[], value: any): Object {
  if (!path || path.length === 0) {
    return {};
  }

  const result = {};
  let current = result;

  const lastIndex = path.length - 1;
  path.forEach((key: string, index: number) => {
    if (lastIndex === index) {
      current[key] = value;
    } else {
      current = current[key] = {};
    }
  });

  return result;
}

function themeMeta2Style(theme: ThemeMeta): Object {
  const { width = 0, height = 0, background, color } = theme;
  console.log(theme, 'theme');
  return {
    width: `${width}px`,
    height: `${height}px`,
    background,
    color,
  };
}

export function style2css(style: Object): string {
  if (!style) {
    return '';
  }
  const keys = Object.keys(style);
  if (keys.length === 0) {
    return '';
  }
  return keys
    .map((key: string) => {
      const val = style[key];
      return val ? `${decamelize(key, '-')}:${val};` : '';
    })
    .join('');
}

export function getThemeMeta(
  cssConfig: CSSConfig,
  stateType: StateType
): (theme: ThemeMeta) => ThemeMeta {
  return (theme: ThemeMeta): ThemeMeta => {
    if (!theme) {
      return {};
    }
    if (!cssConfig) {
      return theme;
    }
    const config = cssConfig[stateType];
    if (!config) {
      return theme;
    }
    const { defaultTheme = {}, selectNames = [] } = config;
    return deepMerge(defaultTheme, getSelectNameThemeMeta(theme, selectNames));
  };
}

export function getSelectNameThemeMeta(theme: ?ThemeMeta, selectNames: Array<string[]>): ThemeMeta {
  if (!theme) {
    return {};
  }
  if (!selectNames || selectNames.length === 0) {
    return theme;
  }

  let result = {};
  selectNames.forEach((names: string[]) => {
    const value = getAttritubeValue(theme, names);
    if (value !== undefined && value !== null) {
      result = deepMerge(result, packObject(names, value));
    }
  });
  return result;
}

function packStyle(cssConfig: CSSConfig, stateType: StateType): (themeMeta: ThemeMeta) => Object {
  const getThemeMetaByConfig = getThemeMeta(cssConfig, stateType);

  return (themeMeta: ThemeMeta) => {
    return themeMeta2Style(getThemeMetaByConfig(themeMeta));
  };
}

// style obj
function getStyle(cssConfig: CSSConfig) {
  const getNormalStyle = packStyle(cssConfig, 'normal');
  const getClickedStyle = packStyle(cssConfig, 'clicked');
  const getHoverStytle = packStyle(cssConfig, 'hover');
  const getDisabledStyle = packStyle(cssConfig, 'disabled');
  return (props: ThemeProps) => {
    const { themeState, themeConfig } = props;

    // 获取状态配置数组

    const { normal = {}, clicked = {}, disabled = {}, hover = {} } = themeConfig;
    const {
      hover: hoverState = false,
      disabled: disabledState = false,
      click: clickState = false,
    } = themeState;

    const normalStyle = getNormalStyle(normal);

    const clickedStyle = clickState ? getClickedStyle(clicked) : {};
    const disabledStyle = disabledState ? getDisabledStyle(disabled) : {};
    const hoverStyle = hoverState ? getHoverStytle(hover) : {};
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

export function getUserDefineCSS(cssConfig: CSSConfig) {
  return (props: ThemeProps): string => {
    return '';
  };
}

export function getUserDefineStyle(cssConfig: CSSConfig) {
  return (props: ThemeProps): Object => {
    return {
      style: {},
    };
  };
}

export default function CSSProvider(cssConfig: CSSConfig) {
  const { tag, css } = cssConfig;
  const styledElement = styled[tag];
  if (!styledElement) {
    throw new Error(`Not support tag: ${tag}`);
  }
  const getTheCSS = getUserDefineCSS(cssConfig);
  const getTheStyle = getUserDefineStyle(cssConfig);
  const getStyleByThemeMeta = getStyle(css);
  return styledElement.attrs((themeProps: ThemeProps) => {
    return deepMerge(getStyleByThemeMeta(themeProps), { style: getTheStyle(themeProps) });
  })`
    ${css}
    ${getCSS(getStyleByThemeMeta)}
    ${getTheCSS}
  `;
}
