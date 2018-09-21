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
  onChange?: Function,
};
export type AffixState = {
  fixed: boolean,
};
const getFixedCSS = (props: CSSProps) => {
  const { fixed } = props;
  if (fixed) {
    return `
      position: fixed;
    `;
  }
  return 'color: #333;';
};
const getTopOrBottomCSS = (props: CSSProps) => {
  const { offsetTop, offsetBottom } = props;
  if (offsetTop || offsetTop == 0) {
    return `top: ${em(offsetTop)}`;
  }
  if (offsetBottom || offsetBottom == 0) {
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
