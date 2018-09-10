/**
 * Layout
 * create by guorg
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';
import { getMargin } from '../common/ThemeUtils';
import { getThemeWidthCSS, getThemeHeightCSS } from './layout';

const FontSize = 1.2;

export type BlockProps = {
  getTheme: Function,
  children: any,
};
export type BlockState = {};

export const Block = styled.div`
  font-size: ${FontSize}rem;
  flex: auto;
  ${getThemeWidthCSS}
  ${getThemeHeightCSS}
  ${getMargin}
`;
