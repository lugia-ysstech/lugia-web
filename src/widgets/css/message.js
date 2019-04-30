/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import styled, { css } from 'styled-components';
import type { Type } from './component-iconwrap';

export type MessageProps = {
  iconType?: Type,
  time: number,
  content: string,
  callBack?: Function,
} & ForRemoveType;
type ForRemoveType = {
  parentDom: any,
  rootDom: any,
};
export type MessageState = {
  visible: boolean,
  opening: boolean,
  closing: boolean,
};
type CSSProps = {
  opening: boolean,
  closing: boolean,
};

const FontSize = 1.4;
const em = px2emcss(FontSize);

export const Message = styled.div`
  font-size: ${FontSize}rem;
  padding: ${em(8)};
  text-align: center;
  transition: all 0.3s;
`;
const getAnimate = (props: CSSProps) => {
  const { opening, closing } = props;
  const openAnimate = css`
    0% {
      opacity: 0;
      margin-top: -30px;
    }
    50% {
      opacity: 0.1;
      margin-top: -15px;
    }
    100% {
      opacity: 1;
      margin-top: 0;
    }
  `;
  const closeAnimate = css`
    0% {
      opacity: 1;
      margin-top: 0;
    }
    100% {
      opacity: 0;
      margin-top: -30px;
    }
  `;
  if (opening) {
    return `
      animation:${openAnimate} .3s ease-in;
    `;
  }
  if (closing) {
    return `
      animation:${closeAnimate} .3s ease-in;
    `;
  }
};
export const MessageContent = styled.div`
  padding: ${em(10)} ${em(20)};
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(102, 102, 102, 0.2);
  background: #fff;
  display: inline-block;
  ${getAnimate};
`;
