/**
 * CheckButton 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { css } from 'styled-components';
import CSSComponent, { getBorder, StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import Icon from '../icon';
import changeColor from './utilsColor';

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

const em = px2remcss;
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

  return `
    height: ${em(height)};
    line-height: ${em(lineHeight)};
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
  const { checked, disabled, cancel = false, hasChecked = false, type = 'checkbox' } = props;
  const colors = themeColor;
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
      border-left: 0;
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

export const LabelWrapper = CSSComponent({
  tag: 'label',
  className: 'label-wrapper',
  css: css`
    position: relative;
    display: ${props => (props.hasCancel ? 'none' : 'inline-block')};
    outline: none;
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [['opacity']],
  },
  hover: {
    selectNames: [['opacity']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['opacity']],
  },
});
export const CheckInput = StaticComponent({
  tag: 'input',
  className: 'check-input',
  css: css`
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
  `,
});

export const CheckSpan = CSSComponent({
  tag: 'span',
  className: 'check-span',
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0 ${em(10)};
    cursor: pointer;
    text-align: center;
    margin: 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    ${getSizeCSS};
  `,
  normal: {
    selectNames: [
      ['border'],
      ['background'],
      ['width'],
      ['height'],
      ['color'],
      ['fontSize'],
      ['fontWeight'],
      ['padding'],
    ],
    getCSS(themeMeta: Object) {
      const { props } = themeMeta;
      return getCheckedCSS(props);
    },
  },
  hover: {
    selectNames: [['border'], ['background'], ['color'], ['fontSize'], ['fontWeight']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['border'], ['background'], ['color']],
    defaultTheme: {
      color: lightGreyColor,
      border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
    },
    getCSS(themeMeta: Object) {
      const { background, bgColor = {}, isChecked } = themeMeta;
      if (!background) {
        const { background: nromalBgColor } = bgColor;
        const defultDisabledColor = isChecked ? spiritColor : '#fff';
        const normalColor = nromalBgColor
          ? changeColor(nromalBgColor.color, 45).color
          : defultDisabledColor;
        return `background: ${normalColor};`;
      }
    },
  },
});

export const CancelSpan = StaticComponent({
  tag: 'span',
  className: 'cancel-span',
  css: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${darkGreyColor};
    background: ${lightGreyColor};
    ${getDisplayCSS};
  `,
});

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
