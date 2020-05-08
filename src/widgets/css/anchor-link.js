/**
 * Anchor
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import styled from 'styled-components';
import get from './theme-common-dict';

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

export const LinkWrap = styled.div`
  font-size: ${FontSize}rem;
  padding-top: ${em(12)};
  padding-left: ${em(get('marginToSameElement'))};
  line-height: 1;
`;

const getLinkColor = (props: CSSProps) => {
  const { active } = props;
  let color = 'darkGreyColor';
  if (active) {
    color = 'themeColor';
  }
  return `color: ${get(color)};`;
};

export const Link = styled.a`
  display: block;
  ${getLinkColor};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${get('themeColor')};
  }
  &:focus {
    text-decoration: none;
  }
`;
