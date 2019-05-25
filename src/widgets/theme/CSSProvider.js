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

type BorderInnerType = {
  borderColor?: number,
  borderWidth?: string,
  borderStyle?: string,
};
type BorderType = {
  top?: BorderInnerType,
  right?: BorderInnerType,
  bottom?: BorderInnerType,
  left?: BorderInnerType,
};
type ColorType = string;
type OpacityType = number;
type BackgroundType = {
  backgroundColor?: ColorType,
  backgroundImage?: string,
};

type BoxShadowType = string;
type FontType = { fontStyle: string, fontWeight: number, fontSize: number };
type FontSizeType = string;
type BorderRadiusType = string | number;
type VisibilityType = 'visible' | 'hidden' | 'collapse';
type CursorType = 'Default' | 'Pointer' | 'text' | 'wait' | 'help' | 'Auto' | 'not-allowed';

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
  backgroundColor?: ColorType,
  fontSize?: FontSizeType,
  borderRadius?: BorderRadiusType,
  visibility?: VisibilityType,
  cursor?: CursorType,
};

type ThemeConfig = {
  normal: ThemeMeta,
  disabled: ThemeMeta,
  clicked: ThemeMeta,
  hover: ThemeMeta,
  children: { [childName: string]: ThemeConfig },
};

// 目前state类型
type TagType = 'span' | 'a' | 'input' | 'li' | 'button' | 'div' | 'i';
type StateType = 'normal' | 'clicked' | 'hover' | 'disabled';
type ThemeState = { clicked: boolean, disabled: boolean, hover: boolean };

type ThemeProps = {
  themeState: ThemeState,
  themeConfig: ThemeConfig,
};
type CSSProps = {
  themeProps: ThemeProps,
};
type CSSMeta = {
  selectNames?: Array<string[]>, // 默认不设置是取全部属性
  cssNames?: string[], // CSS生成的时候默认是使用内联样式 如果需要使用匿名类的属性列在此属性中指定
  getStyle?: (theme: ThemeConfig) => Object,
  getCSS?: (theme: ThemeConfig) => string,
  defaultTheme?: ThemeMeta, // 自己写的样式
};
type CSSConfig = {
  tag?: TagType,
  extend?: Object,
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

function getSizeFromTheme(size: WidthType | HeightType | BorderRadiusType) {
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
    return `${em(spaceTop)} ${em(spaceRight)} ${em(spaceBottom)} ${em(spaceLeft)}`;
  }
  return theSpace;
};

function getObjectStyleFromTheme(obj: Object) {
  if (!obj) return {};
  return obj;
}

function getBorderStyleFromTheme(border) {
  if (!border) return {};
  const DefaultBorderWidth = '1px';
  const DefaultBorderStyle = 'solid';
  const DefaultBorderColor = 'red';

  const borderTop = getAttributeFromObject(border, 'top', {});
  const borderBottom = getAttributeFromObject(border, 'bottom', {});
  const borderLeft = getAttributeFromObject(border, 'left', {});
  const borderRight = getAttributeFromObject(border, 'right', {});

  const borderTopWidth = getAttributeFromObject(borderTop, 'borderWidth', DefaultBorderWidth);
  const borderTopStyle = getAttributeFromObject(borderTop, 'borderStyle', DefaultBorderStyle);
  const borderTopColor = getAttributeFromObject(borderTop, 'borderColor', DefaultBorderColor);
  const borderBottomWidth = getAttributeFromObject(borderBottom, 'borderWidth', DefaultBorderWidth);
  const borderBottomStyle = getAttributeFromObject(borderBottom, 'borderStyle', DefaultBorderStyle);
  const borderBottomColor = getAttributeFromObject(borderBottom, 'borderColor', DefaultBorderColor);
  const borderLeftWidth = getAttributeFromObject(borderLeft, 'borderWidth', DefaultBorderWidth);
  const borderLeftStyle = getAttributeFromObject(borderLeft, 'borderStyle', DefaultBorderStyle);
  const borderLeftColor = getAttributeFromObject(borderLeft, 'borderColor', DefaultBorderColor);
  const borderRightWidth = getAttributeFromObject(borderRight, 'borderWidth', DefaultBorderWidth);
  const borderRightStyle = getAttributeFromObject(borderRight, 'borderStyle', DefaultBorderStyle);
  const borderRightColor = getAttributeFromObject(borderRight, 'borderColor', DefaultBorderColor);
  return Object.assign(
    {},
    { borderTopWidth },
    { borderTopStyle },
    { borderTopColor },
    { borderBottomWidth },
    { borderBottomStyle },
    { borderBottomColor },
    { borderLeftWidth },
    { borderLeftStyle },
    { borderLeftColor },
    { borderRightWidth },
    { borderRightStyle },
    { borderRightColor }
  );
}

function getStringStyleFromTheme(stringStyle: string) {
  const theStringStyle = stringStyle && typeof stringStyle === 'string' ? stringStyle : '';
  return theStringStyle;
}

function getNumberStyleFromTheme(numberStyle: number) {
  const theNumberStyle = numberStyle && typeof numberStyle === 'number' ? numberStyle : 0;
  return theNumberStyle;
}

function themeMeta2Style(theme: ThemeMeta): Object {
  const {
    background,
    border,
    width,
    height,
    font,
    fontSize = DefaultFontSize,
    color,
    opacity,
    margin,
    padding,
    boxShadow,
    borderRadius,
    visibility,
    cursor,
  } = theme;
  const style = {};

  setStyleValue(style, 'fontSize', fontSize, getStringStyleFromTheme);
  setStyleValue(style, 'width', width, getSizeFromTheme);
  setStyleValue(style, 'height', height, getSizeFromTheme);

  setStyleValue(style, 'color', color, getStringStyleFromTheme);
  setStyleValue(style, 'opacity', opacity, getNumberStyleFromTheme);
  setStyleValue(style, 'boxShadow', boxShadow, getStringStyleFromTheme);
  setStyleValue(style, 'visibility', visibility, getStringStyleFromTheme);
  setStyleValue(style, 'cursor', cursor, getStringStyleFromTheme);
  setStyleValue(style, 'padding', padding, (target: Object) =>
    getSpaceFromTheme('padding', target)
  );
  setStyleValue(style, 'margin', margin, (target: Object) => getSpaceFromTheme('margin', target)); //  fontSize传入
  setStyleValue(style, 'borderRadius', borderRadius, getSizeFromTheme);
  Object.assign(
    style,
    getObjectStyleFromTheme(font),
    getObjectStyleFromTheme(background),
    getBorderStyleFromTheme(border)
  );
  return style;
}

function setStyleValue(style: Object, name: string, value: any, cb: Function) {
  if (value) {
    style[name] = cb(value);
  }
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
    const selectNameThemeMeta = getSelectNameThemeMeta(theme, selectNames);
    if (stateType === 'hover') {
      return deepMerge(defaultTheme, selectNameThemeMeta);
    }
    return selectNameThemeMeta;
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
    console.log(getThemeMetaByConfig(themeMeta), 'getThemeMetaByConfig');
    return themeMeta2Style(getThemeMetaByConfig(themeMeta));
  };
}

let enabledClassNameBool = false;

export function enabledClassName() {
  enabledClassNameBool = true;
}

export function getClassName(className: string): string {
  return enabledClassNameBool ? className : '';
}

function getCSS(getStyle: Function) {
  return function(props: CSSProps) {
    const style = getStyle(props);
    return css`
      ${style2css(style)}
    `;
  };
}

function getStateTypes(themeState: ThemeState = {}): StateType[] {
  const res = ['normal'];

  const { hover = false, disabled = false, clicked = false } = themeState;

  if (hover) {
    res.push('hover');
  }
  if (clicked) {
    res.push('clicked');
  }
  if (disabled) {
    res.push('disabled');
  }
  return res;
}

function createGetStyleFromPropsAndCSSConfig(cssConfig: CSSConfig) {
  return function(props: CSSProps) {
    return getStyleFromPropsAndCSSConfigByHook(
      cssConfig,
      props,
      (cssConfig: CSSConfig, stateType: StateType): Function => {
        return packStyle(cssConfig, stateType);
      }
    );
  };
}

function getStyleValue(beforeValue: any, nextValue: any) {
  return Object.assign(beforeValue, nextValue);
}

function getStyleFromPropsAndCSSConfigByHook(
  cssConfig: CSSConfig,
  props: CSSProps,
  createGetStyle: (cssConfig: CSSConfig, stateType: StateType) => Function
) {
  return getInfoFromPropsAndCSSConfigByHook(cssConfig, props, {
    createGetStyle,
    initVal: {},
    getValue: getStyleValue,
  });
}

function getInfoFromPropsAndCSSConfigByHook(
  cssConfig: CSSConfig,
  props: CSSProps,
  opt: {
    createGetStyle: (cssConfig: CSSConfig, stateType: StateType) => Function,
    initVal: any,
    getValue: (beforeValue: any, nextValue: any) => any,
  }
) {
  const { createGetStyle, initVal, getValue } = opt;
  const { themeProps } = props;
  const { themeState } = themeProps;

  const stateTypes = getStateTypes(themeState);

  const { themeConfig = {} } = themeProps;
  return stateTypes.reduce((beforeValue: any, stateType: StateType) => {
    const { [stateType]: themeMeta = {} } = themeConfig;
    const getStyle = createGetStyle(cssConfig, stateType);
    return getValue(beforeValue, getStyle(themeMeta));
  }, initVal);
}

function getCSSFromPropsAndCSSConfigByHook(
  cssConfig: CSSConfig,
  props: CSSProps,
  createGetStyle: (cssConfig: CSSConfig, stateType: StateType) => Function
) {
  return getInfoFromPropsAndCSSConfigByHook(cssConfig, props, {
    createGetStyle,
    initVal: '',
    getValue(beforeValue: any, nextValue: any) {
      return `${beforeValue}${nextValue}`;
    },
  });
}

const always = (val: any) => () => val;
const alwaysEmptyString = always('');
const alwaysEmptyObject = always({});

export function createGetUserDefineCSS(cssConfig: CSSConfig) {
  return (props: CSSProps): string => {
    return getCSSFromPropsAndCSSConfigByHook(
      cssConfig,
      props,
      (cssConfig: CSSConfig, stateType: StateType): Function => {
        if (!cssConfig) {
          return alwaysEmptyString;
        }
        const cssMeta = cssConfig[stateType];
        if (!cssMeta) {
          return alwaysEmptyString;
        }
        const { getCSS } = cssMeta;
        if (!getCSS) {
          return alwaysEmptyString;
        }
        return getCSS;
      }
    );
  };
}

export function createGetUserDefineStyle(cssConfig: CSSConfig) {
  return (props: CSSProps): Object => {
    return getStyleFromPropsAndCSSConfigByHook(
      cssConfig,
      props,
      (cssConfig: CSSConfig, stateType: StateType): Function => {
        if (!cssConfig) {
          return alwaysEmptyObject;
        }
        const cssMeta = cssConfig[stateType];
        if (!cssMeta) {
          return alwaysEmptyObject;
        }
        const { getStyle } = cssMeta;
        if (!getStyle) {
          return alwaysEmptyObject;
        }
        return getStyle;
      }
    );
  };
}

function createGetStyleByDefaultThemeMeta(cssConfig: CSSConfig) {
  return (props: CSSProps): string => {
    return getInfoFromPropsAndCSSConfigByHook(cssConfig, props, {
      createGetStyle(cssConfig: CSSConfig, stateType: StateType): Function {
        if (!cssConfig || stateType === 'hover') {
          return alwaysEmptyObject;
        }
        const cssMeta = cssConfig[stateType];
        if (!cssMeta) {
          return alwaysEmptyObject;
        }
        const { defaultTheme } = cssMeta;
        if (!defaultTheme) {
          return alwaysEmptyObject;
        }
        return always(themeMeta2Style(defaultTheme));
      },
      initVal: {},
      getValue: getStyleValue,
    });
  };
}

export default function CSSProvider(cssConfig: CSSConfig) {
  const { tag = 'span', css, extend } = cssConfig;
  const styledElement = extend ? styled(extend) : styled[tag];
  if (!styledElement) {
    throw new Error(`Not support tag: ${tag}`);
  }
  const getTheCSS = createGetUserDefineCSS(cssConfig);
  const getTheStyle = createGetUserDefineStyle(cssConfig);
  const getStyleByThemeMeta = createGetStyleFromPropsAndCSSConfig(cssConfig);
  const getDefaultStyle = createGetStyleByDefaultThemeMeta(cssConfig);
  return styledElement.attrs((props: CSSProps) => {
    console.log(getStyleByThemeMeta(props), 'getStyleByThemeMeta');
    return { style: deepMerge(getStyleByThemeMeta(props), getTheStyle(props)) };
  })`
    ${css}
    ${getCSS(getDefaultStyle)}
    ${getTheCSS}
  `;
}
