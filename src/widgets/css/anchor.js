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
  slideType?: 'circle' | 'line',
  slideLine?: boolean,
};
export type AnchorState = {
  activeLink: string,
};
type CSSProps = {
  index?: number,
  slideType: 'circle' | 'line',
  slideLine: boolean,
};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();

const getAnchorBorder = (props: CSSProps) => {
  const { slideLine = true } = props;
  if (slideLine) {
    return `border-left: ${em(1)} solid #e8e8e8;`;
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
    const res = index * 26;
    let top = res;
    if (slideType === 'circle') {
      top += 9;
    }
    return `top: ${em(top)};background: ${themeColor};`;
  }
  return 'display: none';
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
  left: -${em(0.5)};
  ${getTop};
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
`;
