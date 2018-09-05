/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';
import { getMargin } from '../common/ThemeUtils';
import { getThemeWidthCSS, getThemeHeightCSS } from './layout';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type AsideProps = {
  getTheme: Function,
  children: any,
};
export type AsideState = {};

export const Aside = styled.div`
  font-size: ${FontSize}rem;
  ${getThemeWidthCSS}
  ${getThemeHeightCSS}
  ${getMargin}
`;
