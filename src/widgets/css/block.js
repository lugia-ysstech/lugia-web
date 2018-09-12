/**
 * Layout
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { getMargin, getWidth } from '../common/ThemeUtils';
import { getThemeHeightCSS } from './layout';
import { px2emcss } from './units';
import Icon from '../icon';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type BlockProps = {
  getTheme: Function,
  children: any,
  value?: string,
  enlarged?: boolean,
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
export const Enlarge = styled.div`
  position: absolute;
  top: ${em(10)};
  right: ${em(10)};
  width: ${em(20)};
  height: ${em(20)};
  text-align: center;
  background: #e8e8e8;
  cursor: pointer;
`;
export const IconWrap = styled(Icon)`
  vertical-align: bottom !important;
`;
