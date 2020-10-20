/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { css } from 'styled-components';
import { getMargin, getWidth } from '../common/ThemeUtils';
import CSSComponent from '@lugia/theme-css-hoc';

const FontSize = 1.2;
const em = px2emcss(FontSize);

type BasicType = {
  direction?: 'row' | 'column',
};
export type LayoutProps = {
  children: any,
  getTheme: Function,
  needEnlarge?: boolean,
} & BasicType;
export type LayoutState = {
  enlarge: boolean,
  enlargeValue: string[],
};
type CSSProps = {
  isWrap?: boolean,
  theme: ThemeType,
} & BasicType;
const getDirectionCSS = (props: CSSProps): string => {
  const { direction = 'column' } = props;
  if (direction === 'row') {
    return 'flex-direction: row;';
  }

  return 'flex-direction: column;';
};
export const getThemeHeightCSS = (props: CSSProps) => {
  const { height } = props.theme;
  if (height) {
    return `
      height: ${em(height)};
    `;
  }
};

export const Layout = CSSComponent({
  tag: 'div',
  className: 'Layout',
  css: css`
    display: flex;
    flex: auto;
    font-size: ${FontSize}rem;
    ${getDirectionCSS};
    ${getWidth}
    ${getThemeHeightCSS}
    ${getMargin}
  `,
  normal: {
    selectNames: [['width'], ['height'], ['margin']],
  },
});
