/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { css } from 'styled-components';
import { getMargin, getWidth } from '../common/ThemeUtils';
import { getThemeHeightCSS } from './layout';
import { px2emcss } from './units';
import Icon from '../icon';
import CSSComponent from '@lugia/theme-css-hoc';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type BlockProps = {
  getTheme: Function,
  children: any,
  value?: string,
  enlarged?: boolean,
  order?: number,
  isContent?: boolean,
};
export type BlockState = {};

export const Block = CSSComponent({
  tag: 'div',
  className: 'Block',
  css: css`
    font-size: ${FontSize}rem;
    flex: ${props => (props.enlarge ? 'auto' : props.isContent ? 'auto' : '0 0 auto')};
    display: ${props => (props.display ? 'block' : 'none')};
    position: relative;
    ${getWidth}
    ${getThemeHeightCSS}
    ${getMargin}
  `,
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['background']],
  },
});
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
export const IconWrap: Object = styled(Icon)`
  vertical-align: bottom !important;
`;
