/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import { px2remcss } from './units';
import Icon from '../icon';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius, getBorder } from '../theme/CSSProvider';
import { getBoxShadow } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';

const fontSize = 1.2;
const em = px2remcss;
const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
export function getThemeStyle() {
  return {
    defaultColor: get('defaultColor'),
    normalBoxShadow: get('normalBoxShadow'),
    hoverBoxShadow: get('hoverBoxShadow'),
    activeBoxShadow: get('activeBoxShadow'),
  };
}
type showType = 'textType' | 'iconType';
export type BackTopProps = {
  visibilityHeight?: number,
  children?: any,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  target?: Function,
  themeProps: Object,
  icon?: string,
  text: string,
  showType: showType,
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

export const textStyle = {
  normal: {
    color: blackColor,
    border: getBorder({ width: 1, style: 'solid', color: borderColor }),
    borderRadius: getBorderRadius(4),
    boxShadow: getBoxShadow('0 0 0 0 transparent'),
  },
  hover: {
    color: themeHoverColor,
    border: getBorder({ width: 1, style: 'solid', color: themeHoverColor }),
    boxShadow: getBoxShadow('0 0 0 0 transparent'),
  },
  active: {
    color: themeActiveColor,
    border: getBorder({ width: 1, style: 'solid', color: themeActiveColor }),
    boxShadow: getBoxShadow('0 0 0 0 transparent'),
  },
};

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

const CommonBackTopStyle = CSSComponent({
  tag: 'div',
  className: 'CommonBackTopStyle',
  css: css`
    text-align: center;
    overflow: hidden;
  `,
});

export const BackTopContent = CSSComponent({
  extend: CommonBackTopStyle,
  className: 'BackTopContent',
  css: css`
    position: relative;
    background: ${getThemeStyle().defaultColor};
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
      ['boxShadow'],
    ],
    defaultTheme: {
      color: themeColor,
      width: 40,
      height: 40,
      opacity: 1,
      borderRadius: getBorderRadius(40),
    },
  },
  hover: {
    selectNames: [['color'], ['boxShadow'], ['border']],
    defaultTheme: {
      color: themeHoverColor,
    },
  },
  active: {
    selectNames: [['color'], ['boxShadow'], ['border']],
    defaultTheme: {
      color: themeActiveColor,
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
