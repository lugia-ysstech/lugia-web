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

type BasicType = {
  disabled?: boolean,
  open: boolean,
};
export type PanelProps = {
  header?: string | any,
  value?: string,
  children?: any,
  style?: Object,
  getTheme: Function,
  hasValue: boolean,
  onChange?: Function,
} & BasicType;
export type PanelState = {
  open: boolean,
};
type CSSProps = {
  themes: Object,
} & BasicType;

export const OpenKeyframe = keyframes`
  from {height: 0;}
  to {height: 100}
`;
export const CloseKeyframe = keyframes`
  from {height: 100px;}
  to {height: 0px}
`;
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
export const PanelHeader = styled.div`
  box-sizing: border-box;
  position: relative;
  padding: ${em(16)} 0 ${em(16)} ${em(30)};
  font-size: ${FontSize}rem;
  cursor: ${(props: CSSProps) => (props.disabled ? 'not-allowed' : 'pointer')};
  line-height: ${em(16)};
  ${getColorCSS};
`;
const getPanelConten = (props: CSSProps): string => {
  const { open, opening, closing, height } = props;

  if (opening) {
    return `
     height: ${height}px;
     animation:${OpenKeyframe} 1s;
     `;
  }
  if (closing) {
    return `
     height: ${height}px;
     animation:${CloseKeyframe} 1s;
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
export const PanelContentWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  ${getPanelConten};
`;
const getContenColor = (props: CSSProps): string => {
  const { disabled } = props;
  if (disabled) {
    return `
      color: ${lightGreyColor};
    `;
  }

  return `
      color: ${darkGreyColor};
    `;
};
export const PanelContent = styled.div`
  box-sizing: border-box;
  font-weight: 300;
  padding: ${em(6)} ${em(30)} ${em(22)} ${em(30)};
  ${getContenColor};
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
