/**
 * Panel 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { css, keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import changeColor from '../css/utilsColor';
import { getMargin } from './collapse';
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
  title?: string | any,
  value?: string,
  children?: any,
  getTheme: Function,
  onClick?: Function,
} & BasicPropsType;
export type PanelState = BasicStateType;
type CSSProps = {
  theme: ThemeType,
  hasChildren?: boolean,
} & BasicPropsType &
  BasicStateType;

const { darkGreyColor, blackColor, lightGreyColor } = colorsFunc();

export const getThemeWidthCSS = (props: CSSProps) => {
  const { width } = props.theme;
  if (width) {
    return `
      width: ${em(width)};
    `;
  }
};
const getThemeBackgroundColorCSS = (props: CSSProps): string => {
  const { backgroundColor } = props.theme;
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
  const { borderSize, borderColor } = props.theme;
  const bdColor = borderColor || '#e8e8e8';

  if (typeof borderSize === 'number') {
    return `
      border-width: ${em(borderSize)};
      border-color: ${bdColor};
      border-style: solid;
    `;
  }
  if (typeof borderSize === 'object') {
    const { top = 0, right = 0, bottom = 0, left = 0 } = borderSize;

    return `
      border-width: ${em(top)} ${em(right)} ${em(bottom)} ${em(left)};
      border-color: ${bdColor};
      border-style: solid;
    `;
  }
  return `
    border-color: ${bdColor};
    border-style: solid;
    border-width: 0 0 1px 0;
  `;
};
const getBoxShadow = (props: CSSProps) => {
  const { hover, opening } = props;
  if (opening) {
    return '';
  }
  const { backgroundColor, borderSize } = props.theme;
  const color = backgroundColor || defaultColor;
  const shadowColor = changeColor(color, 0, 30, 20).rgba;
  if (hover && borderSize) {
    if ((typeof borderSize === 'number' && borderSize === 0) || !borderSize.bottom) {
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
  const { disabled, theme } = props;
  const color = theme.color || blackColor;
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
  line-height: 1;
  user-select: none;
  ${getColorCSS};
`;
const getPanelContent = (props: CSSProps): string => {
  const { open, opening, closing, headerHeight = 0 } = props;
  let { height } = props;
  height = height + headerHeight;
  const OpenKeyframe = keyframes`
    from {
      height: ${em(headerHeight)};
    }
    to {
      height: ${height}px;
    }
  `;
  const CloseKeyframe = keyframes`
    from {
      height: ${height}px;
    }
    to {
      height: ${em(headerHeight)};
    }
  `;
  if (opening) {
    return css`
      height: ${height}px;
      animation: ${OpenKeyframe} 0.5s;
    `;
  }
  if (closing) {
    return css`
      height: ${height}px;
      animation: ${CloseKeyframe} 0.5s;
    `;
  }
  if (open) {
    return `
     height: 100%;`;
  }
  return `
    height: ${em(headerHeight)};
  `;
};
const getContenColor = (props: CSSProps): string => {
  const { disabled, theme } = props;
  const backgroundColor = theme.backgroundColor || defaultColor;
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
  const { showArrow, hasChildren } = props;
  if (!hasChildren) {
    return '';
  }
  if (showArrow) {
    return `
     padding: ${em(6)} ${em(30)} ${em(22)} ${em(34)};
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
`;

export const PanelContent = styled.div`
  box-sizing: border-box;
  font-weight: 300;
  line-height: 1.5;
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

export const IconWrap: Object = styled(Icon)`
  font-size: ${FontSize}rem;
  display: inline-block;
  position: absolute;
  top: ${em(16)};
  left: ${em(10)};
  color: #666;
  ${getIconTransform};
`;

export const HoverIconWrap = styled.div`
  box-sizing: border-box;
  transition: left 0.3s;
  opacity: ${(props: CSSProps) => (props.hover ? '1' : '0')};
  width: ${em(14)};
  ${getPanelContent};
  position: absolute;
  top: 0;
  left: ${(props: CSSProps) => (props.hover ? em(-10.5) : 0)};
  ${getThemeBackgroundColorCSS};
`;
export const Wrap = styled.div`
  transition: all 0.2s;
  font-size: ${FontSize}rem;
  ${getMargin}
  ${getThemeWidthCSS}
  ${getBoxShadow}
`;
