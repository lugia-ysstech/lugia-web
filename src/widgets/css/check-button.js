/**
 * CheckButton 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2emcss } from '../css/units';
import Icon from '../icon';

type CheckSize = 'default' | 'small' | 'large' | 'bigger';
type TypeSizeCSS = {
  height: number,
  lineHeight: number,
};
export type CheckProps = {
  size?: CheckSize,
  checked?: boolean,
  disabled?: boolean,
  select?: 'radio' | 'checkbox',
  onChange?: Function,
  value?: any,
  children: any,
  cancel?: boolean,
  type: 'checkbox' | 'radio',
};
type CSSProps = {
  themes: Function,
  clicked: boolean,
  hasChecked: boolean,
  hover: boolean,
};
type PropsType = CSSProps & CheckProps;
export type CheckState = {
  hasChecked: boolean,
};

const em = px2emcss(1.2);
const getEm = (props: CheckProps) => {
  const { size = 'default' } = props;
  if (size === 'default' || 'small') {
    return { fontSize: '1.2rem', fontNum: 1.2 };
  }
  return { fontSize: '1.4rem', fontNum: 1.2 };
};
const {
  themeColor,
  borderColor,
  borderDisableColor,
  disabledColor,
  darkGreyColor,
  lightGreyColor,
  mediumGreyColor,
  spiritColor,
} = colorsFunc();
const SizeCSS: { [key: CheckSize]: TypeSizeCSS } = {
  default: {
    height: 32,
    lineHeight: 30,
  },
  small: {
    height: 28,
    lineHeight: 26,
  },
  large: {
    height: 38,
    lineHeight: 36,
  },
  bigger: {
    height: 42,
    lineHeight: 40,
  },
};
const getSizeCSS = (props: PropsType): string => {
  const { size = 'default' } = props;
  const { height, lineHeight } = SizeCSS[size];
  const { fontSize, fontNum } = getEm(props);
  const em = px2emcss(fontNum);

  return `
    height: ${em(height)};
    line-height: ${em(lineHeight)};
    font-size: ${fontSize};
  `;
};
const getHoverCSS = (props: PropsType): string => {
  const { disabled = false, checked = false, themes } = props;
  const colors = themes.color || themeColor;
  if (!disabled) {
    return `
      color: ${checked ? '#fff' : colors};
    `;
  }
  return `
    color: ${lightGreyColor};
  `;
};
const getDisabledCSS = (props: PropsType): string => {
  const { checked = false } = props;
  let background = '';
  const border = `1px solid ${borderDisableColor}`;
  const color = lightGreyColor;
  const cursor = 'not-allowed';
  if (checked) {
    background = spiritColor;
  } else {
    background = '#fff';
  }

  return `
     border: ${border};
     color: ${color};
     cursor: ${cursor};
     background: ${background};
  `;
};
const getCheckedCSS = (props: PropsType): string => {
  const {
    checked,
    themes,
    disabled,
    cancel = false,
    hasChecked = false,
    type = 'checkbox',
  } = props;
  const colors = themes.color || themeColor;
  if (disabled) {
    return getDisabledCSS(props);
  }
  if (cancel) {
    return `
      background-color: ${disabledColor};
      color: #ffffff;
      cursor: ${type === 'radio' ? 'not-allowed' : 'pointer'};
    `;
  }
  if (checked) {
    return `
      background-color: ${colors};
      color: #fff;
      border: 1px solid ${colors};
      border-right: 1px solid #fff;
     `;
  }

  return `
      border: 1px solid ${hasChecked ? colors : borderColor};
      color: ${darkGreyColor};
      background: #fff;
    `;
};

const getDisplayCSS = (props: PropsType): string => {
  const { hover = false } = props;
  if (hover) {
    return `padding: ${em(2)}`;
  }
  return 'z-index: -2';
};
const getThemeMarginCSS = (props: PropsType): string => {
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
  return '';
};
const getWidthCSS = (props: PropsType): string => {
  const { width } = props.themes;
  if (width) {
    return `
      width: ${em(width)};
    `;
  }
  return '';
};

export const LabelWrapper = styled.label`
  position: relative;
  display: ${props => (props.hasCancel ? 'none' : 'inline-block')};
  outline: none;
  transition: all 0.3s;
  ${getThemeMarginCSS} &:hover > span {
    ${getHoverCSS};
  }
`;
export const CheckInput = styled.input`
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
`;
export const CheckSpan = styled.span`
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0 ${em(10)};
  cursor: pointer;
  ${getCheckedCSS} border-left: 0;
  text-align: center;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${getSizeCSS};
  ${getWidthCSS};
`;
export const CancelSpan = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${darkGreyColor};
  background: ${lightGreyColor};
  ${getDisplayCSS};
`;
const getIconFont = (props: Object) => {
  const { size = 'default' } = props;
  if (size === 'default' || size === 'small') {
    return `
      font-size: ${em(16)}!important;
    `;
  }

  return `
      font-size: ${em(18)}!important;
    `;
};
export const IconWrap: Object = styled(Icon)`
  vertical-align: text-bottom !important;
  ${getIconFont}
  color: ${mediumGreyColor};
`;
