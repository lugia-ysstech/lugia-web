/**
 * Panel 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import changeColor from '../css/utilsColor';
import { getThemeMarginOrBorderWidthCSS } from '../common/getThemes';
import Icon from '../icon';
import type { ThemeType } from '@lugia/lugia-web';

const FontSize = 1.4;
const em = px2emcss(FontSize);
const defaultColor = '#fff';

type BasicPropsType = {
  disabled?: boolean,
  open: boolean,
  showArrow?: boolean,
};
type BasicStateType = {
  open: boolean,
  opening: boolean,
  closing: boolean,
  height: number,
  hover: boolean,
  headerHeight: number,
};
export type PanelProps = {
  header?: string | any,
  value?: string,
  children?: any,
  getTheme: Function,
  onClick?: Function,
} & BasicPropsType;
export type PanelState = BasicStateType;
type CSSProps = {
  themes: ThemeType,
} & BasicPropsType &
  BasicStateType;

const { themeColor, darkGreyColor, blackColor, lightGreyColor } = colorsFunc();

export const getThemeMarginCSS = (props: CSSProps): string => {
  const { margin } = props.themes;
  return getThemeMarginOrBorderWidthCSS(margin, 'margin', FontSize);
};
export const getThemeWidthCSS = (props: CSSProps) => {
  const { width } = props.themes;
  if (width) {
    return `
      width: ${em(width)};
    `;
  }
};
const getThemeBackgroundColorCSS = (props: CSSProps): string => {
  const { backgroundColor } = props.themes;
  if (backgroundColor) {
    return `
      background: ${backgroundColor};
    `;
  }

  return `
      background: ${defaultColor};
    `;
};
const getThemeBorderWidthCSS = (props: CSSProps): string => {
  const { border, borderColor } = props.themes;
  const bdColor = borderColor || '#e8e8e8';
  const css = getThemeMarginOrBorderWidthCSS(border, 'border-width', FontSize);
  if (css) {
    return `
      border-color: ${bdColor};
      border-style: solid;
      ${css}
    `;
  }

  return `
    border-color: ${bdColor};
    border-style: solid;
    border-width: 0 0 1px 0;
  `;
};
const getBoxShadow = (props: CSSProps) => {
  const { hover } = props;
  const { backgroundColor, border } = props.themes;
  const color = backgroundColor || defaultColor;
  const shadowColor = changeColor(color, 0, 30, 20).rgba;
  if (hover && border) {
    if ((typeof border === 'number' && border === 0) || !border.bottom) {
      return `
      box-shadow: 0px 0px 6px ${shadowColor};
    `;
    }
  }
};
export const PanelWrap = styled.div`
  box-sizing: border-box;
  ${getThemeBorderWidthCSS} ${getThemeBackgroundColorCSS};
`;

const getColorCSS = (props: CSSProps): string => {
  const { disabled, themes } = props;
  const color = themes.color || blackColor;
  if (disabled) {
    return `
      color: ${lightGreyColor};
    `;
  }

  return `
      color: ${color};
    `;
};
const getHeaderPadding = (props: CSSProps): string => {
  const { showArrow } = props;
  if (showArrow) {
    return `
      padding: ${em(16)} 0 ${em(16)} ${em(30)};
    `;
  }
  return `
    padding: ${em(16)} 0 ${em(16)} ${em(20)};
  `;
};

export const PanelHeader = styled.div`
  box-sizing: border-box;
  position: relative;
  ${getHeaderPadding};
  font-size: ${FontSize}rem;
  cursor: ${(props: CSSProps) => (props.disabled ? 'not-allowed' : 'pointer')};
  line-height: ${em(22)};
  user-select: none;
  ${getColorCSS};
`;
const getPanelContent = (props: CSSProps): string => {
  const { open, opening, closing, height } = props;
  const OpenKeyframe = keyframes`
  from { height: 0; }
  to { height: ${height}px; }
`;
  const CloseKeyframe = keyframes`
  from { height: ${height}px; }
  to { height: 0; }
`;
  if (opening) {
    return `
     height: ${height}px;
     animation:${OpenKeyframe} .5s;
     `;
  }
  if (closing) {
    return `
     height: ${height}px;
     animation:${CloseKeyframe} .5s;
     `;
  }
  if (open) {
    return `
     height: 100%;`;
  }
  return `
    height: 0;
`;
};
const getContenColor = (props: CSSProps): string => {
  const { disabled, themes } = props;
  const backgroundColor = themes.backgroundColor || defaultColor;
  if (disabled) {
    return `
      color: ${lightGreyColor};
      background: ${backgroundColor};
    `;
  }

  return `
      color: ${darkGreyColor};
      background: ${backgroundColor};
    `;
};
const getContentPadding = (props: CSSProps): string => {
  const { showArrow, hover } = props;
  if (showArrow) {
    return `
     padding: ${em(6)} ${em(30)} ${em(22)} ${em(34)};
    `;
  }
  if (hover) {
    return `
      padding: ${em(6)} ${em(30)} ${em(22)} ${em(36)};
  `;
  }
  return `
    padding: ${em(6)} ${em(30)} ${em(22)} ${em(24)};
  `;
};
export const PanelContentWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  ${getPanelContent};
  ${getContenColor};
  margin-left: ${(props: CSSProps) => (props.hover ? em(-12) : 'none')};
`;

export const PanelContent = styled.div`
  box-sizing: border-box;
  font-weight: 300;
  ${getContentPadding};
`;

const getIconTransform = (props: CSSProps) => {
  const { opening, open, closing } = props;
  if (opening) {
    return `
      transition: transform 0.3s;
      transform: rotate(90deg);
    `;
  }
  if (closing) {
    return `
      transition: transform 0.3s;
      transform: rotate(0deg);
    `;
  }
  if (open) {
    return `
      transform: rotate(90deg)
    `;
  }
};
export const IconWrap = styled(Icon)`
  font-size: ${FontSize}rem;
  display: inline-block;
  position: absolute;
  top: ${em(18)};
  left: ${em(10)};
  ${getIconTransform};
`;

export const HoverIconWrap = styled.div`
  box-sizing: border-box;
  transition: all 0.3s;
  opacity: ${(props: CSSProps) => (props.hover ? '1' : '0')};
  width: ${(props: CSSProps) => (props.hover ? em(30) : 0)};
  height: ${(props: CSSProps) => em(props.headerHeight)};
  position: absolute;
  top: 0;
  left: ${em(-10.5)};
  ${getThemeBackgroundColorCSS};
`;
export const Wrap = styled.div`
  transition: all 0.2s;
  padding-left: ${em(12)};
  ${getThemeMarginCSS}
  ${getThemeWidthCSS}
  ${getBoxShadow}
`;
