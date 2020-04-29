/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import { px2remcss } from './units';
import Icon from '../icon';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '../theme/CSSProvider';
import get from '../css/theme-common-dict';

const fontSize = 1.2;
const em = px2remcss;
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const normalBoxShadow = get('normalBoxShadow');
const hoverBoxShadow = get('hoverBoxShadow');
const activeBoxShadow = get('activeBoxShadow');

export type BackTopProps = {
  visibilityHeight?: number,
  children?: any,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  target?: Function,
  themeProps: Object,
  icon?: string,
};
export type BackTopState = {
  fixed: boolean,
  posRight: number,
  posBottom: number,
};
type CSSProps = {
  fixed: boolean,
  theme: Object,
  posRight: number,
  posBottom: number,
  hasTarget: boolean,
};

const getFixedCSS = (props: CSSProps) => {
  const ShowKeyframe = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
  const { fixed } = props;
  if (fixed) {
    return css`
      position: fixed;
      animation: ${ShowKeyframe} 0.4s;
    `;
  }
};
const getLeftOrRight = (props: CSSProps) => {
  const { hasTarget, posRight, posBottom } = props;
  if (hasTarget) {
    return `left: ${em(posRight)};top: ${em(posBottom)}`;
  }
  return `right: ${em(posRight)};bottom: ${em(posBottom)}`;
};

export const IconWrap: Object = styled(Icon)`
  vertical-align: bottom !important;
`;

const CommonBackTopStyle = CSSComponent({
  tag: 'div',
  className: 'CommonBackTopStyle',
  css: css`
    border: 1px solid #e8e8e8;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 0 ${em(4)} #e8e8e8;
  `,
});

export const BackTop = StaticComponent({
  tag: 'div',
  className: 'BackTop',
  css: css`
    font-size: ${fontSize}rem;
    ${getFixedCSS};
    ${getLeftOrRight};
    cursor: pointer;
  `,
});

export const BackTopContent = CSSComponent({
  extend: CommonBackTopStyle,
  className: 'BackTopContent',
  css: css`
    position: relative;
  `,
  normal: {
    selectNames: [
      ['background'],
      ['color'],
      ['width'],
      ['height'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      background: { color: defaultColor },
      color: '$lugia-dict.@lugia/lugia-web.themeColor',
      width: 40,
      height: 40,
      opacity: 1,
      boxShadow: normalBoxShadow,
      borderRadius: getBorderRadius(40),
    },
  },
  hover: {
    selectNames: [['color'], ['boxShadow']],
    defaultTheme: {
      background: { color: defaultColor },
      color: themeHoverColor,
      boxShadow: hoverBoxShadow,
    },
  },
  active: {
    selectNames: [['color'], ['boxShadow']],
    defaultTheme: {
      background: { color: defaultColor },
      color: themeActiveColor,
      boxShadow: activeBoxShadow,
    },
  },

  option: { hover: true, active: true },
});

export const IconBox = CSSComponent({
  tag: 'span',
  className: 'BackTopIconBox',
  normal: {
    selectNames: [['color']],
  },
  css: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
});
