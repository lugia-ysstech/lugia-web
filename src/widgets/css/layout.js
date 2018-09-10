/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';
import { getMargin } from '../common/ThemeUtils';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type LayoutProps = {
  direction?: 'row' | 'column',
  children: any,
  getTheme: Function,
};
export type LayoutState = {};
type CSSProps = {
  direction?: 'row' | 'column',
  isWrap?: boolean,
  theme: ThemeType,
};
const getDirectionCSS = (props: CSSProps): string => {
  const { direction = 'column' } = props;
  if (direction === 'row') {
    return 'flex-direction: row;';
  }

  return 'flex-direction: column;';
};
export const getThemeWidthCSS = (props: CSSProps) => {
  const { width } = props.theme;
  if (width) {
    return `
      width: ${em(width)};
    `;
  }
};
export const getThemeHeightCSS = (props: CSSProps) => {
  const { height } = props.theme;
  if (height) {
    return `
      height: ${em(height)};
    `;
  }
};

export const Layout = styled.div`
  display: flex;
  flex: auto;
  font-size: ${FontSize}rem;
  ${getDirectionCSS};
  ${getThemeWidthCSS}
  ${getThemeHeightCSS}
  ${getMargin}
`;
