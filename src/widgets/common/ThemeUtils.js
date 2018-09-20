/**
 *
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import { getAttributeFromObject } from './ObjectUtils';
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
const { themeColor: globalThemeColor } = colorsFunc();

type MarginOpt = {
  fontSize: number,
  default: {
    left: number,
    right: number,
    top: number,
    bottom: number,
  },
};
type WidthOpt = {
  fontSize: number,
  defaultWidth?: number,
};

const DefaultFontSize = 1.2;
const DefaultMargin = 0;

export const createGetMargin = (
  opt?: MarginOpt = {
    fontSize: DefaultFontSize,
    default: {
      left: DefaultMargin,
      right: DefaultMargin,
      top: DefaultMargin,
      bottom: DefaultMargin,
    },
  }
) => {
  const {
    fontSize = DefaultFontSize,
    default: {
      left = DefaultMargin,
      right = DefaultMargin,
      top = DefaultMargin,
      bottom = DefaultMargin,
    },
  } = opt;
  const em = px2emcss(fontSize);
  return (props: { theme: ThemeType }) => {
    const { theme } = props;
    const { margin } = theme;
    if (typeof margin === 'number') {
      return `margin:${em(margin)} `;
    }
    if (margin !== undefined) {
      const marginTop = getAttributeFromObject(margin, 'top', top);
      const marginBottom = getAttributeFromObject(margin, 'bottom', bottom);
      const marginLeft = getAttributeFromObject(margin, 'left', left);
      const marginRight = getAttributeFromObject(margin, 'right', right);
      return `margin:${em(marginTop)} ${em(marginRight)} ${em(marginBottom)} ${em(marginLeft)};`;
    }
    return '';
  };
};

export const createGetWidthOrHeight = (
  type?: 'width' | 'height' = 'width',
  opt?: WidthOpt = { fontSize: DefaultFontSize }
) => {
  const { fontSize, defaultWidth } = opt;
  const em = px2emcss(fontSize);
  return (props: { theme: ThemeType }) => {
    const { width = defaultWidth } = props.theme;
    if (typeof width === 'number') {
      return `${type}: ${em(width)};`;
    }
    return '';
  };
};

export const getMargin = createGetMargin();
export const getWidth = createGetWidthOrHeight();
export const getHeight = createGetWidthOrHeight('height');

export function getThemeColor(theme: ThemeType = {}): string {
  const { color: themeColor } = theme;
  return themeColor ? themeColor : globalThemeColor;
}
