/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import type { screensType } from '../css/row';
import styled from 'styled-components';
import { getMargin, createGetWidthOrHeight } from '../common/ThemeUtils';
import { getThemeHeightCSS } from './layout';
import Icon from '../icon';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { css } from 'styled-components';
import get from './theme-common-dict';

const FontSize = 1.2;
const em = px2emcss(FontSize);
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
const getBackgroundCSS = () => {
  return `background: ${get('themeColor')}`;
};

export const Aside = StaticComponent({
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
});

export const Trigger = CSSComponent({
  tag: 'div',
  className: 'Trigger',
  css: css`
    position: absolute;
    bottom: 0;
    height: ${em(48)};
    line-height: ${em(48)};
    text-align: center;
    transition: all 0.3s;
    ${getBackgroundCSS};
    ${getWidth};
    ${getCollapsedWidth};
    cursor: pointer;
  `,
  normal: {
    selectNames: [['height'], ['background']],
  },
});

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
    selectNames: [['background']],
  },
});
