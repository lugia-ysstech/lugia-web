/**
 * Layout
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import { px2remcss } from '../css/units';
import { css, keyframes } from 'styled-components';
import type { Type } from './component-iconwrap';

export type MessageProps = {
  iconType?: Type,
  time: number,
  content: string,
  callBack?: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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

export const Message = StaticComponent({
  tag: 'div',
  className: 'Message',
  css: css`
    font-size: ${px2remcss(14)};
    text-align: center;
    transition: all 0.3s;
    padding: ${px2remcss(8)};
  `,
});

const getAnimate = (props: CSSProps) => {
  const { opening, closing } = props;
  const openAnimate = keyframes`
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

  const closeAnimate = keyframes`
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
    return css`
      animation: ${openAnimate} 0.3s ease-in;
    `;
  }
  if (closing) {
    return css`
      animation: ${closeAnimate} 0.3s ease-in;
    `;
  }
};
export const MessageContent = CSSComponent({
  tag: 'div',
  className: 'MessageContent',
  css: css`
    display: inline-block;
    ${getAnimate};
  `,
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['boxShadow'],
      ['background'],
      ['borderRadius'],
      ['padding'],
      ['opacity'],
      ['border'],
    ],
    defaultTheme: {
      font: { size: 14 },
      boxShadow: getBoxShadow('0 0 6px rgba(102, 102, 102, 0.2)'),
      background: { color: '#fff' },
      borderRadius: getBorderRadius(4),
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
      },
      opacity: 1,
    },
  },
});
