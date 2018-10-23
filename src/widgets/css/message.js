/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
import type { ThemeType } from '@lugia/lugia-web';
import { createGetWidthOrHeight } from '../common/ThemeUtils';
import styled, { keyframes } from 'styled-components';
import type { Type } from './component-iconwrap';
import Icon from '../icon';

export type MessageProps = {
  iconType?: Type,
  time: number,
  content: string,
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
const IconFontSize = 1.6;
const em = px2emcss(FontSize);
const iconEM = px2emcss(IconFontSize);
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  mediumGreyColor,
  blackColor,
  darkGreyColor,
  padding,
  marginToSameElement,
} = colorsFunc();

export const Message = styled.div`
  font-size: ${FontSize}rem;
  padding: ${em(8)};
  text-align: center;
  transition: all 0.3s;
`;
const getAnimate = (props: CSSProps) => {
  const { opening, closing } = props;
  const openAnimate = keyframes`
    0% {
      margin-top: -30px;
    }
    70% {
      margin-top: 0;
    }
    100% {
      margin-top: 0;
    }
  `;
  const closeAnimate = keyframes`
    0% {
      margin-top: 0;
    }
    100% {
      margin-top: -30px;
    }
  `;
  if (opening) {
    return `
      animation:${openAnimate} .2s ease-in;
    `;
  }
  if (closing) {
    return `
      animation:${closeAnimate} .2s ease-in;
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
