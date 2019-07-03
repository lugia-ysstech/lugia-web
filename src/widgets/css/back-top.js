/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import { getBorder } from '@lugia/theme-utils';
import ThemeHoc from '@lugia/theme-hoc';
import colorsFunc from '../css/stateColor';
import { px2remcss } from './units';
import Icon from '../icon';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '../theme/CSSProvider';

const { defaultColor, themeColor } = colorsFunc();
const FontSize = 1.2;
const em = px2remcss;

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
  className: 'common-back-top',
  css: css`
    border: 1px solid #e8e8e8;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 0 ${em(4)} #e8e8e8;
  `,
});

export const BackTop = StaticComponent({
  tag: 'div',
  className: 'back-top',
  css: css`
    font-size: ${FontSize}rem;
    ${getFixedCSS};
    ${getLeftOrRight};
    cursor: pointer;
  `,
});

export const BackTopContent = CSSComponent({
  extend: CommonBackTopStyle,
  className: 'back-top-content',
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
      color: themeColor,
      width: 40,
      height: 40,
      opacity: 1,
      border: getBorder({ color: '#e8e8e8', width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(40),
    },
  },
});

export const IconBox = CSSComponent({
  tag: 'span',
  className: 'icon-box',
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

export const Icons = ThemeHoc(
  CSSComponent({
    className: 'back-top-icon',
    extend: Icon,
    normal: {
      selectNames: [['color'], ['fontSize'], ['margin'], ['padding']],
      defaultTheme: {
        margin: 0,
        padding: 0,
      },
    },
    hover: {
      selectNames: [['color'], ['fontSize'], ['margin'], ['padding']],
    },
    css: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
  }),
  'BackTopIcon',
  { hover: true, active: false }
);
