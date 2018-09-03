/**
 *
 * create by guorg
 *
 * @flow
 */
import type { MarginType, RadiusType } from '@lugia/lugia-web';
import { px2emcss } from '../css/units';

export function getThemeMarginOrBorderWidthCSS(
  theme: MarginType,
  type: 'margin' | 'border-width',
  FontSize: number
): string {
  const em = px2emcss(FontSize);
  if (theme || theme === 0) {
    if (typeof theme === 'number') {
      return `${type}: ${em(theme)};`;
    }
    if (typeof theme === 'object') {
      const { top, right, bottom, left } = theme;

      return `${type}: ${em(top)} ${em(right)} ${em(bottom)} ${em(left)};`;
    }
  }

  return '';
}

export function getThemeBorderRadiusCSS(theme: RadiusType, FontSize: number) {
  const em = px2emcss(FontSize);
  if (theme) {
    if (typeof theme === 'number') {
      return `border-radius: ${em(theme)};`;
    }
    if (typeof theme === 'object') {
      const { topLeft, topRight, bottomLeft, bottomRight } = theme;

      return `border-radius: ${em(topLeft)} ${em(topRight)} ${em(bottomLeft)} ${em(bottomRight)};`;
    }
  }

  return '';
}
