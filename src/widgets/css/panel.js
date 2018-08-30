/**
 * Panel 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import Icon from '../icon';

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
  style?: Object,
  getTheme: Function,
  onClick?: Function,
} & BasicPropsType;
export type PanelState = BasicStateType;
type CSSProps = {
  themes: Object,
} & BasicPropsType &
  BasicStateType;

const {
  themeColor,
  mediumGreyColor,
  borderColor,
  borderDisableColor,
  disableColor,
  disabledColor,
  marginToDifferentElement,
  darkGreyColor,
  blackColor,
  lightGreyColor,
} = colorsFunc();

const getThemeMarginCSS = (props: CSSProps) => {
  const { margin } = props.themes;
  if (margin) {
    if (typeof margin === 'number') {
      return `margin: ${em(margin)};`;
    }
    if (typeof margin === 'object') {
      const { top, right, bottom, left } = margin;
      if (top && right && bottom && left) {
        return `margin: ${em(top)} ${em(right)} ${em(bottom)} ${em(left)};`;
      }
    }
  }
};
const getWidthCSS = (props: CSSProps) => {
  const { width } = props.themes;
  if (width) {
    return `
      width: ${em(width)};
    `;
  }
};
const getThemeColorCSS = (props: CSSProps) => {
  const { color } = props.themes;
  if (color) {
    return `
      background: ${color};
    `;
  }
};
export const PanelWrap = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid #e8e8e8;
  ${getThemeMarginCSS}
  ${getWidthCSS}
  ${getThemeColorCSS}
`;

const getColorCSS = (props: CSSProps): string => {
  const { disabled } = props;
  if (disabled) {
    return `
      color: ${lightGreyColor};
    `;
  }

  return `
      color: ${blackColor};
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
const getPanelConten = (props: CSSProps): string => {
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
  const color = themes.color || defaultColor;
  if (disabled) {
    return `
      color: ${lightGreyColor};
      background: ${color};
    `;
  }

  return `
      color: ${darkGreyColor};
      background: ${color};
    `;
};
export const PanelContentWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  ${getPanelConten};
  ${getContenColor};
  margin-left: ${(props: CSSProps) => (props.hover ? em(-12) : 'none')};
`;

export const PanelContent = styled.div`
  box-sizing: border-box;
  font-weight: 300;
  padding: ${em(6)} ${em(30)} ${em(22)} ${em(30)};
`;

const getIconTransform = (props: CSSProps) => {
  const { opening, open, closing } = props;
  if (opening) {
    return `
      transition: transform 0.3s;
      transform: rotate(90deg)
    `;
  }
  if (closing) {
    return `
      transition: transform 0.3s;
      transform: rotate(0deg)
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
  display: ${(props: CSSProps) => (props.hover ? 'block' : 'none')};
  width: ${em(30)};
  height: ${(props: CSSProps) => em(props.headerHeight)};
  position: absolute;
  top: 0;
  left: ${em(-10)};
  background: #e6f7ff;
`;
