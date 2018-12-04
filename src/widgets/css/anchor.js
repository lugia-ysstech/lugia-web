/**
 * Anchor
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';

export type AnchorProps = {
  children: any,
  affix?: boolean,
  offsetTop?: number,
  slideType?: 'circle' | 'line' | 'none',
};
export type AnchorState = {
  activeLink: string,
};
type CSSProps = {
  index?: number,
  slideType: 'circle' | 'line',
};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();

const getAnchorBorder = (props: CSSProps) => {
  const { slideType } = props;
  if (slideType !== 'none') {
    return `border-left: ${em(2)} solid #e8e8e8;`;
  }
};
export const Anchor = styled.div`
  font-size: ${FontSize}rem;
  position: relative;
  background-color: #fff;
  ${getAnchorBorder};
  box-sizing: border-box;
  padding-bottom: ${em(6)};

  & > div:first-child {
    padding-top: ${em(6)};
  }
`;
const getTop = (props: CSSProps) => {
  const { index, slideType } = props;
  if ((index || index === 0) && index > -1) {
    const res = index * 24;
    if (slideType === 'circle') {
      return `top: ${em(8 + res)};background: ${themeColor};`;
    }
    return `top: ${em(res)};background: ${themeColor};`;
  }
};
const getCircleCSS = (props: CSSProps) => {
  const { slideType } = props;
  if (slideType === 'circle') {
    return `
      width: ${em(8)};
      height: ${em(8)};
      border-radius: 8px;
    `;
  }
  return `
    width: ${em(2)};
    height: ${em(24)};
  `;
};
export const Circle = styled.div`
  position: absolute;
  ${getCircleCSS};
  left: -${em(1)};
  ${getTop};
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
`;
