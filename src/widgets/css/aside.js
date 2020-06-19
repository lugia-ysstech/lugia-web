/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import type { ThemeType } from '@lugia/lugia-web';
import type { screensType } from '../css/row';
import styled from 'styled-components';
import { getMargin, createGetWidthOrHeight } from '../common/ThemeUtils';
import { getThemeHeightCSS } from './layout';
import Icon from '../icon';
import CSSComponent from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
import { css } from 'styled-components';
import { getBorderRadius } from '@lugia/theme-utils';

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();
const getWidth = createGetWidthOrHeight('width', { fontSize: FontSize, defaultWidth: 200 });

type BasicType = {
  collapsedWidth?: number,
  collapsed?: boolean,
};
export type AsideProps = {
  getTheme: Function,
  children: any,
  collapsible?: boolean,
  trigger?: any,
  onCollapse?: Function,
  reverseArrow?: boolean,
  breakpoint?: screensType,
  onBreakpoint?: Function,
  value?: string,
} & BasicType;
export type AsideState = {
  collapsed: boolean,
  screens: screensType,
};
type CSSProps = {
  theme: ThemeType,
  needNarrow: boolean,
} & BasicType;

const getCollapsedWidth = (props: CSSProps) => {
  const { collapsed, collapsedWidth = 64 } = props;

  if (collapsed) {
    return `width: ${em(collapsedWidth)};`;
  }
};
const getBackgroundCSS = (props: CSSProps): string => {
  const { backgroundColor } = props.theme;
  const background = backgroundColor || themeColor;

  return `background: ${background}`;
};

export const Aside = CSSComponent({
  tag: 'div',
  className: 'Aside',
  css: css`
    font-size: ${FontSize}rem;
    position: relative;
    transition: all 0.3s;
    ${getWidth};
    ${getCollapsedWidth};
    ${getThemeHeightCSS};
    ${getMargin};
  `,
  normal: {
    defaultTheme: {},
    selectNames: [['background']],
  },
});

export const Trigger = styled.div`
  position: absolute;
  bottom: 0;
  height: ${em(48)};
  line-height: ${em(48)};
  text-align: center;
  transition: all 0.3s;
  ${getBackgroundCSS};
  ${getWidth};
  ${getCollapsedWidth} cursor: pointer;
`;
export const IconWrap: Object = styled(Icon)`
  color: #fff;
`;

export const ChildrenWrap = CSSComponent({
  tag: 'div',
  className: 'ChildrenWrap',
  css: css`
    height: 100%;
    ${getBackgroundCSS};
  `,
  normal: {
    defaultTheme: {},
    selectNames: [],
  },
});
