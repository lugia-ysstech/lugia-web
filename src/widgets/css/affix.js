/**
 * Affix
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { getMargin, getWidth } from '../common/ThemeUtils';
import { px2emcss } from './units';

const FontSize = 1.2;
const em = px2emcss(FontSize);

type CSSProps = {
  fixed: boolean,
  offsetTop?: number,
  offsetBottom?: number,
};
export type AffixProps = {
  offsetTop?: number,
  offsetBottom?: number,
  target?: Function,
  children?: any,
  onChange?: Function,
};
export type AffixState = {
  fixed: boolean,
  offset?: number,
};
const getFixedCSS = (props: CSSProps) => {
  const { fixed } = props;
  if (fixed) {
    return `
      position: fixed;
    `;
  }
  return '';
};
const getTopOrBottomCSS = (props: CSSProps) => {
  const { offsetTop, offsetBottom } = props;
  if (typeof offsetTop === 'number') {
    return `top: ${em(offsetTop)}`;
  }
  if (typeof offsetBottom === 'number') {
    return `bottom: ${em(offsetBottom)}`;
  }
  return `
      top: ${em(0)};
    `;
};

export const Affix = styled.div`
  font-size: ${FontSize}rem;
  ${getFixedCSS} ${getTopOrBottomCSS};
`;
