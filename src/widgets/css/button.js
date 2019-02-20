/**
 * Button 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import changeColor from '../css/utilsColor';
import { getThemeColor } from '../common/ThemeUtils';
import { keyframes } from 'styled-components';
import type { MarginType, ThemeType } from '@lugia/lugia-web';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type ButtonShape = 'default' | 'round';
type ButtonSize = 'default' | 'small' | 'large';

type CSSProps = {
  shape?: ButtonShape,
  type?: ButtonType,
  plain?: boolean,
  size?: ButtonSize,
  loading?: boolean,
  circle?: boolean,
  disabled?: boolean,
  children?: (SyntheticEvent<HTMLButtonElement>) => any,
  icon?: string,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => any,
  getTheme: Function,
  viewClass?: string,
  loading?: boolean,
  em: Function,
  hasChildren?: boolean,
};
export type ButtonOutProps = CSSProps & {
  clicked: boolean,
  themes: ThemeType,
  onMouseOut: Function,
  onMouseEnter: Function,
  onMouseOver: Function,
  onMouseUp: Function,
  onMouseDown: Function,
};

type IconLoadingProps = {
  loading?: boolean,
};

type TypeColor = {
  color: string,
  backgroundColor: string,
  border: string,
};
type PlainTypeColor = {
  color: string,
  backgroundColor: string,
  border: string,
  disabledColor: string,
  disabledBorder: string,
};
type ShapeStyle = {
  borderRadius: number,
};

const Size = {
  large: {
    height: 40,
    vPadding: 13,
    dPadding: 18,
    fontSize: 1.4,
    borderRadius: 20,
  },
  default: {
    height: 32,
    vPadding: 9,
    dPadding: 18,
    fontSize: 1.4,
    borderRadius: 16,
  },
  small: {
    height: 24,
    vPadding: 6,
    dPadding: 14,
    fontSize: 1.2,
    borderRadius: 12,
  },
};

const NotCircleSize = {
  width: 32,
  borderRadius: 4,
};
const CircleCSS = {
  default: {
    font: 16,
  },
  small: {
    font: 12,
  },
  large: {
    font: 18,
  },
};
const {
  themeColor: globalThemeColor,
  successColor,
  warningColor,
  dangerColor,
  lightGreyColor: disableColor,
  darkGreyColor: defaultColor,
  defaultColor: white,
} = colorsFunc();

function fetchType(type: string): Object {
  if (type === 'default') {
    return {
      color: defaultColor,
      border: `1px solid ${disableColor}`,
    };
  }
  return {
    color: white,
    border: 'none',
  };
}

function fetchTypeCSS(color: string): { [key: ButtonType]: TypeColor } {
  const defaultColor = color || globalThemeColor;
  const defaultTypeStyle = fetchType('default');
  const otherTypeStyle = fetchType('other');
  return {
    default: {
      backgroundColor: white,
      ...defaultTypeStyle,
    },
    primary: {
      backgroundColor: defaultColor,
      ...otherTypeStyle,
    },
    success: {
      backgroundColor: successColor,
      ...otherTypeStyle,
    },
    warning: {
      backgroundColor: warningColor,
      ...otherTypeStyle,
    },
    danger: {
      backgroundColor: dangerColor,
      ...otherTypeStyle,
    },
  };
}

function fetchPlainCSS(color: string): { [key: ButtonType]: PlainTypeColor } {
  const defaultColor = color || globalThemeColor;
  const bgReduceA = 5;
  const borderReduceS = 45;
  return {
    default: {
      color: changeColor('#333', borderReduceS).color,
      disabledColor: changeColor('#333', borderReduceS).color,
      backgroundColor: white,
      border: `1px solid ${disableColor}`,
      disabledBorder: `1px solid ${changeColor('#333', borderReduceS).color}`, //正常颜色下调s 45%
    },
    primary: {
      color: defaultColor,
      disabledColor: changeColor(defaultColor, borderReduceS).color, //正常颜色下调s 45%
      backgroundColor: changeColor(defaultColor, 0, 0, bgReduceA).rgba, //正常颜色透明度 5%；
      border: `1px solid ${defaultColor}`, //正常颜se
      disabledBorder: `1px solid ${changeColor(defaultColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    success: {
      color: successColor,
      disabledColor: changeColor(successColor, borderReduceS).color, //正常颜色下调s 45%
      backgroundColor: changeColor(successColor, 0, 0, bgReduceA).rgba, //正常颜色透明度 5%；
      border: `1px solid ${successColor}`, //正常颜色
      disabledBorder: `1px solid ${changeColor(successColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    warning: {
      color: warningColor,
      disabledColor: changeColor(warningColor, borderReduceS).color, //正常颜色下调s 45%
      backgroundColor: changeColor(warningColor, 0, 0, bgReduceA).rgba, //正常颜色透明度 5%；
      border: `1px solid ${warningColor}`, //正常颜色
      disabledBorder: `1px solid ${changeColor(warningColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    danger: {
      color: dangerColor,
      disabledColor: changeColor(dangerColor, borderReduceS).color, //正常颜色下调s 45%
      backgroundColor: changeColor(dangerColor, 0, 0, bgReduceA).rgba, //正常颜色透明度 5%；
      border: `1px solid ${dangerColor}`, //正常颜色
      disabledBorder: `1px solid ${changeColor(dangerColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
  };
}

function fetchSize(sizeType: string, em: Function) {
  const { height, vPadding, dPadding, fontSize } = Size[sizeType];
  return {
    height: `${em(height)}`,
    vPadding: `${em(vPadding)}`,
    dPadding: `${em(dPadding)}`,
    fontSize,
  };
}

const ShapeCSS: { [key: ButtonSize]: ShapeStyle } = {
  default: {
    borderRadius: Size.default.borderRadius,
  },
  large: {
    borderRadius: Size.large.borderRadius,
  },
  small: {
    borderRadius: Size.small.borderRadius,
  },
};

export const getTypeCSS = (props: ButtonOutProps) => {
  const { type = 'default', plain, themes = {} } = props;
  const themeColor = getThemeColor(themes);
  const { color, backgroundColor, border } = plain
    ? fetchPlainCSS(themeColor)[type]
    : fetchTypeCSS(themeColor)[type];
  return `
    color: ${color};
    background-color: ${backgroundColor};
    border: ${border};
  `;
};

export const getShapeCSS = (props: ButtonOutProps) => {
  const { shape = 'default', size = 'default', em } = props;
  let borderRadius = `${em(21)}`;
  if (shape === 'default') {
    borderRadius = `${em(4)}`;
  } else {
    borderRadius = em(ShapeCSS[size].borderRadius);
  }
  return `
    border-radius: ${borderRadius};
  `;
};
export const getDisabledCSS = (props: ButtonOutProps) => {
  let backgroundColor = '',
    color = '',
    border = '';
  const cursor = 'not-allowed';
  const { disabled, type = 'default', themes, plain } = props;
  const themeColor = getThemeColor(themes);
  const colorChange = fetchTypeCSS(themeColor)[type].backgroundColor;

  if (type === 'default') {
    color = disableColor;
    border = '1px solid #e8e8e8';
    backgroundColor = white;
  } else {
    if (plain) {
      const {
        disabledColor,
        disabledBorder,
        backgroundColor: disabledBackgroundColor,
      } = fetchPlainCSS(themeColor)[type];
      color = disabledColor;
      border = disabledBorder;
      backgroundColor = disabledBackgroundColor;
    } else {
      color = white;
      border = 'none';
      backgroundColor = changeColor(colorChange, 45).color; //orange: 正常色S下调45%
    }
  }
  if (disabled) {
    return `
      background-color: ${backgroundColor};
      color: ${color};
      border: ${border};
      cursor: ${cursor};
      &:hover{
        background-color: ${backgroundColor};
        color: ${color};
        border: ${border};
      };
    `;
  }
};
export const getSizeCSS = (props: ButtonOutProps) => {
  const { size = 'default', em } = props;
  const { dPadding, fontSize } = fetchSize(size, em);

  return `
    
    padding: 0 ${dPadding};
    font-size: ${fontSize}rem;
  `;
};
export const getCircleCSS = (props: ButtonOutProps) => {
  const { circle = false, em, size = 'default' } = props;
  const borderRadius = '50%';
  const width = `${em(Size[size].height)}`;
  if (circle) {
    return `
      width: ${width};
      height: ${width};
      border-radius: ${borderRadius};
      padding: 0;
  `;
  }
};
export const getClickCSS = (props: ButtonOutProps) => {
  const {
    type = 'default',
    size = 'default',
    shape = 'default',
    circle = false,
    themes,
    em,
  } = props;
  const { height: sizeHeight } = fetchSize(size, em);
  const themeColor = getThemeColor(themes);
  const backGround =
    type === 'default'
      ? 'none'
      : colorsFunc(fetchTypeCSS(themeColor)[type].backgroundColor).mouseDownColor;
  const borderRadius = circle
    ? '50%'
    : shape === 'default'
    ? em(NotCircleSize.borderRadius)
    : em(ShapeCSS[size].borderRadius);

  const clickAnimate = keyframes`
  0% {
    width: 0;
    height: 0;
    background: ${backGround};
    border-radius: 0;
    opacity: 0;
  }
  50% {
    width: 100%;
    height: ${sizeHeight};
    background: ${backGround};
    opacity: 0.15;
    border-radius: ${borderRadius};
  }
  100% {
    width: 100%;
    height: ${sizeHeight};
    background: ${backGround};
    opacity: 0;
    border-radius: ${borderRadius};
  }
`;
  const { clicked } = props;
  if (clicked) {
    return `&::after{
                content: '';
                height: 0;
                border: 0;
                position: absolute;
                z-index: 50;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: ${clickAnimate} .5s linear;
            }`;
  }
};
export const getActiveCSS = (props: ButtonOutProps) => {
  const { type = 'default', themes } = props;
  const themeColor = getThemeColor(themes);
  if (type === 'default') {
    const color = colorsFunc(themeColor).mouseDownColor;
    return `
      color: ${color};
      border: 1px solid ${color};
    `;
  }

  return `
    background-color: ${colorsFunc(fetchTypeCSS(themeColor)[type].backgroundColor).mouseDownColor};
  `;
};
export const hoverStyle = (props: ButtonOutProps) => {
  const { type = 'default', plain = false, themes } = props;
  let color = '',
    border = '',
    backgroundColor = '';
  const themeColor = getThemeColor(themes);

  const typeBgcolor = fetchTypeCSS(themeColor)[type].backgroundColor;

  if (type === 'default') {
    const colorInfo = colorsFunc(themeColor ? themeColor : globalThemeColor);
    const defaultColor = colorInfo.hoverColor;

    color = defaultColor; //red:正常色s下调20%
    border = `1px solid ${defaultColor}`; //red:正常色s下调20%
    backgroundColor = plain ? white : colorInfo.spiritColor; //ccc:正常色透明度5%
  } else if (plain) {
    color = white;
    border = fetchPlainCSS(themeColor)[type].border;
    backgroundColor = typeBgcolor;
  } else {
    color = white;
    border = 'none';
    backgroundColor = colorsFunc(typeBgcolor).hoverColor; //red: 正常色s下调20%
  }

  return `
    color: ${color};
    border: ${border};
    background-color: ${backgroundColor};  
  `;
};

const getMarginCSS = (em: Function, margin?: MarginType): string => {
  let marginCss = '';
  if (margin) {
    if (typeof margin === 'number') {
      marginCss = em(margin);
    }
    if (typeof margin === 'object') {
      const { top = 0, right = 0, bottom = 0, left = 0 } = margin;
      marginCss = `${em(top)} ${em(right)} ${em(bottom)} ${em(left)}`;
    }
  }
  return marginCss;
};
export const getThemeStyle = (props: ButtonOutProps) => {
  const { themes, em } = props;
  const { width, color, margin } = themes;
  const marginCss = getMarginCSS(em, margin);
  const withCss = width && typeof width === 'number' ? em(width) : '';
  const colorCss = color ? color : '';
  return `
    margin: ${marginCss};
    width: ${withCss};
    color: ${colorCss};
  `;
};
export const getIconStyle = (props: CSSProps) => {
  const { em, hasChildren = true } = props;
  if (!hasChildren) {
    return '';
  }
  return `
    margin-right: ${em(10)};
  `;
};
export const getLoadingIconStyle = (props: IconLoadingProps) => {
  const IconSoin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
  const { loading = false } = props;
  if (loading) {
    return `
      animation: ${IconSoin} 1s infinite linear;
    `;
  }
};
export const getChildrenLineHeight = (props: CSSProps) => {
  const { size = 'default', em, type = 'default', plain } = props;
  const { height } = Size[size];
  if (type === 'default' || plain) {
    return `line-height: ${em(height - 2)};`;
  }

  return `
    line-height: ${em(height)};
  `;
};
export const getCircleIconFont = (props: CSSProps) => {
  const { size = 'default', em } = props;
  const fontSize = CircleCSS[size].font;
  return `font-size: ${em(fontSize)};`;
};
