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
import { getMargin } from '../common/ThemeUtils';
import { getThemeWidthCSS, getThemeHeightCSS } from './layout';
import Icon from '../icon';

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();

export type AsideProps = {
  getTheme: Function,
  children: any,
  collapsible?: boolean,
  collapsedWidth?: number,
  collapsed?: boolean,
  trigger?: any,
  onCollapse?: Function,
  reverseArrow?: boolean,
  breakpoint?: screensType,
  onBreakpoint?: Function,
};
export type AsideState = {
  collapsed: boolean,
  screens: screensType,
};
type CSSProps = {
  theme: ThemeType,
  collapsed: boolean,
  collapsedWidth?: number,
  needNarrow: boolean,
};

const getWidth = (props: CSSProps) => {
  const { collapsed, collapsedWidth = 64 } = props;
  const { width = 200 } = props.theme;
  if (collapsed) {
    return `width: ${em(collapsedWidth)};`;
  }
  return `width: ${em(width)};`;
};
const getBackgroundCSS = (props: CSSProps): string => {
  const { backgroundColor } = props.theme;
  const background = backgroundColor || themeColor;

  return `background: ${background}`;
};
export const Aside = styled.div`
  font-size: ${FontSize}rem;
  position: relative;
  width: ${em(200)};
  transition: all 0.3s;
  ${getWidth};
  ${getThemeHeightCSS};
  ${getMargin};
`;
export const Trigger = styled.div`
  position: absolute;
  bottom: 0;
  height: 48px;
  line-height: 48px;
  text-align: center;
  transition: all 0.3s;
  width: ${em(200)};
  ${getBackgroundCSS};
  ${getWidth} cursor: pointer;
`;
export const IconWrap = styled(Icon)`
  color: #fff;
`;
export const ChildrenWrap = styled.div`
  height: 100%;
  ${getBackgroundCSS};
`;
