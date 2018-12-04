/**
 * Anchor
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';

export type AnchorLinkProps = {
  title: string | React.ReactNode,
  href: string,
  children?: any,
  onClick?: Function,
  active?: boolean,
};
export type AnchorLinkState = {};
type CSSProps = {
  active?: boolean,
};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();

export const LinkWrap = styled.div`
  font-size: ${FontSize}rem;
  padding-top: ${em(12)};
  padding-left: ${em(10)};
  line-height: 1;
`;
const getLinkColor = (props: CSSProps) => {
  const { active } = props;
  if (active) {
    return `color: ${themeColor};`;
  }
  return 'color: #333;';
};
export const Link = styled.a`
  display: block;
  ${getLinkColor};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${themeColor};
  }
  &:focus {
    text-decoration: none;
  }
`;
