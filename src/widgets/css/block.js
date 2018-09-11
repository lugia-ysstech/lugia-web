/**
 * Layout
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { getMargin, getWidth } from '../common/ThemeUtils';
import { getThemeHeightCSS } from './layout';

const FontSize = 1.2;

export type BlockProps = {
  getTheme: Function,
  children: any,
};
export type BlockState = {};

export const Block = styled.div`
  font-size: ${FontSize}rem;
  flex: 1;
  position: relative;
  ${getWidth}
  ${getThemeHeightCSS}
  ${getMargin}
`;
