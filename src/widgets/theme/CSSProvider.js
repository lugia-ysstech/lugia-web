/**
 *
 * create by ligx
 *
 * @flow
 */

import React from 'react';
import merge from 'deepmerge';
import decamelize from 'decamelize';
import styled, { css } from 'styled-components';
import { px2emcss } from '../css/units';
import { getAttributeFromObject } from '../common/ObjectUtils';

type WidthType = number | string;
type HeightType = number | string;
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

type BoxShadowType = string;
type FontType = { fontStyle: string, fontWeight: number, fontSize: number };
type fontSizeType = number;

const DefaultFontSize = 1.2;
const em = px2emcss(DefaultFontSize);

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
  boxShadow?: BoxShadowType,
  backgroundColor: ColorType,
  fontSize: fontSizeType,
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

type MarginOpt = {
  fontSize: number,
  default: {
    left: number,
    right: number,
    top: number,
    bottom: number,
  },
};

export function deepMerge(objA: Object, objB: Object): Object {
  objA = objA || {};
  objB = objB || {};
  return merge(objA, objB);
}

export function getAttributeValue(obj: Object, path: string[]): any {
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
function getSizeFromTheme(size: WidthType | HeightType) {
  const theSize =
    typeof size === 'string' && size.indexOf('%') > -1
      ? size
      : typeof size === 'number'
      ? em(size)
      : '';
  return theSize;
}
const DefaultSpace = 0;
export const getSpaceFromTheme = (
  spaceType: 'margin' | 'padding',
  space: MarginType | PaddingType,
  opt?: MarginOpt = {
    fontSize: DefaultFontSize,
    default: {
      left: DefaultSpace,
      right: DefaultSpace,
      top: DefaultSpace,
      bottom: DefaultSpace,
    },
  }
) => {
  const theSpace = '';
  const {
    fontSize = DefaultFontSize,
    default: {
      left = DefaultSpace,
      right = DefaultSpace,
      top = DefaultSpace,
      bottom = DefaultSpace,
    },
  } = opt;
  const em = px2emcss(fontSize);
  if (typeof space === 'number') {
    return `:${em(space)} `;
  }
  if (space !== undefined) {
    const spaceTop = getAttributeFromObject(space, 'top', top);
    const spaceBottom = getAttributeFromObject(space, 'bottom', bottom);
    const spaceLeft = getAttributeFromObject(space, 'left', left);
    const spaceRight = getAttributeFromObject(space, 'right', right);
    return `${em(spaceTop)} ${em(spaceRight)} ${em(spaceBottom)} ${em(spaceLeft)};`;
  }
  return theSpace;
};
function getObjectStyleFromTheme(obj: Object) {
  if (!obj) return {};
  return obj;
}
function getStringStyleFromTheme(stringStyle: string) {
  const theStringStyle = typeof stringStyle === 'string' && stringStyle ? stringStyle : '';
  return theStringStyle;
}
function getNumberStyleFromTheme(numberStyle: number) {
  const theNumberStyle = typeof numberStyle === 'number' && numberStyle ? numberStyle : 1;
  return theNumberStyle;
}
//todo
function themeMeta2Style(theme: ThemeMeta): Object {
  const {
    backgroundColor = '',
    background = {},
    border = {},
    width = 0,
    height = 0,
    font = {},
    fontSize,
    color = '',
    opacity,
    margin = {},
    padding = {},
    boxShadow = '',
  } = theme;
  // todo  themeProps 转化 style 对象
  // width,height 转em
  // 内部含有对象的 都得根据自己的对象规则 转化成Style对象 用驼峰命名
  const style = {};
  style.width = getSizeFromTheme(width);
  style.height = getSizeFromTheme(height);
  style.fontSize = getStringStyleFromTheme(fontSize);
  style.color = getStringStyleFromTheme(color);
  style.backgroundColor = getStringStyleFromTheme(backgroundColor);
  style.opacity = getNumberStyleFromTheme(opacity);
  style.boxShadow = getStringStyleFromTheme(boxShadow);
  style.padding = getSpaceFromTheme('padding', padding);
  style.margin = getSpaceFromTheme('margin', margin);
  Object.assign(
    style,
    getObjectStyleFromTheme(font),
    getObjectStyleFromTheme(background),
    getObjectStyleFromTheme(border)
  );

  return style;
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
    console.log(theme, 'getThemeMeta cssConfig', cssConfig);
    if (!theme) {
      return {};
    }
    if (!cssConfig) {
      return theme;
    }
    const config = cssConfig[stateType];
    console.log(config, 'getThemeMeta config');

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
    const value = getAttributeValue(theme, names);
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

let enabledClassNameBool = false;

function getStyle(cssConfig: CSSConfig) {
  console.log(cssConfig, 'getStyle cssConfig');
  const getNormalStyle = packStyle(cssConfig, 'normal');
  const getClickedStyle = packStyle(cssConfig, 'clicked');
  const getHoverStyle = packStyle(cssConfig, 'hover');
  const getDisabledStyle = packStyle(cssConfig, 'disabled');
  return (props: ThemeProps) => {
    const { themeState, themeConfig } = props;
    console.log(themeConfig, 'getStyle themeConfig');
    const { normal = {}, clicked = {}, disabled = {}, hover = {} } = themeConfig;
    const {
      hover: hoverState = false,
      disabled: disabledState = false,
      click: clickState = false,
    } = themeState;

    const normalStyle = getNormalStyle(normal);
    console.log(normalStyle, 'getStyle normalStyle');
    const clickedStyle = clickState ? getClickedStyle(clicked) : {};
    console.log(clickedStyle, 'getStyle clickedStyle');
    const disabledStyle = disabledState ? getDisabledStyle(disabled) : {};
    const hoverStyle = hoverState ? getHoverStyle(hover) : {};
    return { style: Object.assign(normalStyle, clickedStyle, disabledStyle, hoverStyle) };
  };
}

export function enabledClassName() {
  enabledClassNameBool = true;
}

export function getClassName(className: string): string {
  return enabledClassNameBool ? className : '';
}

function getCSS(getStyle: Function) {
  return (props: ThemeProps) => {
    const { style } = getStyle(props);
    return css`
      ${style2css(style)}
    `;
  };
}
//todo 自定义字符串css
export function getUserDefineCSS(cssConfig: CSSConfig) {
  return (props: ThemeProps): string => {
    return '';
  };
}

// todo  自定义 style css
export function getUserDefineStyle(cssConfig: CSSConfig) {
  return (props: ThemeProps): Object => {
    const style = getStyle(cssConfig);
    return {
      style,
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
  const getStyleByThemeMeta = getStyle(cssConfig);

  return styledElement.attrs((themeProps: ThemeProps) => {
    return deepMerge(getStyleByThemeMeta(themeProps), { style: getTheStyle(themeProps) });
  })`
    ${css}
    ${getCSS(getStyleByThemeMeta)}
    ${getTheCSS}
  `;
}
