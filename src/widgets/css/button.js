/**
 * Button 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import changeColor from '../css/utilsColor';
import { getThemeColor } from '../common/ThemeUtils';
import { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import type { MarginType, ThemeType } from '@lugia/lugia-web';

const em = px2emcss(1.2);

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type ButtonShape = 'default' | 'round';
type ButtonSize = 'default' | 'small' | 'large' | 'bigger';

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
};
export type ButtonOutProps = CSSProps & {
  clicked: boolean,
  themes: ThemeType,
};

type IconLoadingProps = {
  loading?: boolean,
};

type TypeColor = {
  color: string,
  backgroundColor: string,
  border: string,
};
type ShapeStyle = {
  borderRadius: string,
};

const Size = {
  bigger: {
    width: 100,
    height: 42,
    padding: 14,
    fontSize: 14,
    borderRadius: 21,
  },
  large: {
    width: 98,
    height: 38,
    padding: 12,
    fontSize: 14,
    borderRadius: 19,
  },
  default: {
    width: 80,
    height: 32,
    padding: 10,
    fontSize: 12,
    borderRadius: 16,
  },
  small: {
    width: 80,
    height: 28,
    padding: 8,
    fontSize: 12,
    borderRadius: 14,
  },
};

const NotCircleSize = {
  width: 32,
  borderRadius: 4,
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

function fetchPlainCSS(color: string): { [key: ButtonType]: TypeColor } {
  const defaultColor = color || globalThemeColor;
  const bgReduce = 55;
  const borderReduceS = 45;
  return {
    default: {
      color: defaultColor,
      backgroundColor: white,
      border: `1px solid ${disableColor}`,
    },
    primary: {
      color: defaultColor,
      backgroundColor: changeColor(defaultColor, bgReduce).color, //正常颜色下调s 55%
      border: `1px solid ${changeColor(defaultColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    success: {
      color: successColor,
      backgroundColor: changeColor(successColor, bgReduce).color, //正常颜色下调s 55%
      border: `1px solid ${changeColor(successColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    warning: {
      color: warningColor,
      backgroundColor: changeColor(warningColor, bgReduce).color, //正常颜色下调s 55%
      border: `1px solid ${changeColor(warningColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
    danger: {
      color: dangerColor,
      backgroundColor: changeColor(dangerColor, bgReduce).color, //正常颜色下调s 55%
      border: `1px solid ${changeColor(dangerColor, borderReduceS).color}`, //正常颜色下调s 45%
    },
  };
}

function fetchSize(sizeType: string) {
  const size = Size[sizeType];
  return {
    width: `${em(size.width)}`,
    height: `${em(size.height)}`,
    padding: `${em(size.padding)}`,
    fontSize: `${em(size.fontSize)}`,
  };
}

const ShapeCSS: { [key: ButtonSize]: ShapeStyle } = {
  bigger: {
    borderRadius: `${em(Size.bigger.borderRadius)}`,
  },
  default: {
    borderRadius: `${em(Size.default.borderRadius)}`,
  },
  large: {
    borderRadius: `${em(Size.large.borderRadius)}`,
  },
  small: {
    borderRadius: `${em(Size.small.borderRadius)}`,
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
  const { shape = 'default', size = 'default' } = props;
  let borderRadius = `${em(21)}`;
  if (shape === 'default') {
    borderRadius = `${em(4)}`;
  } else {
    borderRadius = ShapeCSS[size].borderRadius;
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
  const { disabled, type = 'default', themes } = props;
  const themeColor = getThemeColor(themes);
  const colorChange = fetchTypeCSS(themeColor)[type].backgroundColor;
  if (type === 'default') {
    color = disableColor;
    border = '1px solid #e8e8e8';
    backgroundColor = white;
  } else {
    color = white;
    border = 'none';
    backgroundColor = changeColor(colorChange, 45).color; //orange: 正常色S下调45%
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
  const { size = 'default' } = props;
  const { width, height, padding, fontSize } = fetchSize(size);

  return `
    width: ${width};
    height: ${height};
    padding: ${padding};
    font-size: ${fontSize};
  `;
};
export const getCircleCSS = (props: ButtonOutProps) => {
  const { circle = false } = props;
  const borderRadius = '50%';
  const width = `${em(NotCircleSize.width)}`;
  if (circle) {
    return `
      width: ${width};
      border-radius: ${borderRadius};
      padding: 0;
  `;
  }
};
export const getClickCSS = (props: ButtonOutProps) => {
  const { type = 'default', size = 'default', shape = 'default', circle = false, themes } = props;
  const { width: sizeWidth, height: sizeHeight } = fetchSize(size);
  const { width: ucCircleWidth } = NotCircleSize;
  const themeColor = getThemeColor(themes);
  const backGround =
    type === 'default'
      ? 'none'
      : colorsFunc(fetchTypeCSS(themeColor)[type].backgroundColor).mouseDownColor;
  const borderRadius = circle
    ? '50%'
    : shape === 'default'
      ? em(NotCircleSize.borderRadius)
      : ShapeCSS[size].borderRadius;

  const width = circle ? em(ucCircleWidth) : sizeWidth;

  const clickAnimate = keyframes`
  0% {
    width: 0;
    height: 0;
    background: ${backGround};
    border-radius: 0;
    opacity: 0;
  }
  50% {
    width: ${width};
    height: ${sizeHeight};
    background: ${backGround};
    opacity: 0.15;
    border-radius: ${borderRadius};
  }
  100% {
    width: ${width};
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
                width: 0;
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

const getMarginCSS = (margin?: MarginType): string => {
  let marginCss = '';
  if (margin) {
    if (typeof margin === 'number') {
      marginCss = em(margin);
    }
    if (typeof margin === 'object') {
      const { top, right, bottom, left } = margin;
      if (top && right && bottom && left) {
        marginCss = `${em(top)} ${em(right)} ${em(bottom)} ${em(left)}`;
      }
    }
  }
  return marginCss;
};
export const getThemeStyle = (props: ButtonOutProps) => {
  const { themes } = props;
  const { width, color, margin } = themes;
  const marginCss = getMarginCSS(margin);
  const withCss = width && typeof width === 'number' ? em(width) : '';
  const colorCss = color ? color : '';
  return `
    margin: ${marginCss};
    width: ${withCss};
    color: ${colorCss};
  `;
};
export const getIconStyle = () => {
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
