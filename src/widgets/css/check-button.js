/**
 * CheckButton 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { css } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
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
  childrenIndex: number,
  childrenCount: number,
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
  darkGreyColor,
  lightGreyColor,
  mediumGreyColor,
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

const getDisplayCSS = (props: PropsType): string => {
  const { hover = false } = props;
  if (hover) {
    return `padding: ${em(2)}`;
  }
  return 'z-index: -2';
};

const getCursor = (props: PropsType) => {
  const { disabled, cancel = false, type = 'checkbox' } = props;
  if (disabled) {
    return 'cursor: not-allowed;';
  }
  if (cancel) {
    return `
      cursor: ${type === 'radio' ? 'not-allowed' : 'pointer'};
    `;
  }

  return 'cursor: pointer';
};
const getHasCheckCSS = (props: PropsType) => {
  const { hasChecked = false } = props;
  if (hasChecked) {
    return ` border: 1px solid ${themeColor};`;
  }
};

export const LabelWrapper = StaticComponent({
  tag: 'label',
  className: 'CheckButtonLabelWrapper',
  css: css`
    position: relative;
    display: ${props => (props.hasCancel ? 'none' : 'inline-block')};
    outline: none;
    transition: all 0.3s;
  `,
});
export const CheckInput = StaticComponent({
  tag: 'input',
  className: 'CheckButtonCheckInput',
  css: css`
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
  `,
});

const getPadding = (themeProps: Object): Object => {
  if (!themeProps) {
    return {};
  }
  const { themeConfig = {} } = themeProps;
  const { normal = {} } = themeConfig;
  const { padding } = normal;
  if (!padding) {
    return {};
  }

  return { padding };
};

export const CheckSpan = CSSComponent({
  tag: 'span',
  className: 'CheckButtonCheckSpan',
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align: middle;
    ${getCursor};
    ${getHasCheckCSS};
    text-align: center;
    margin: 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-left: 0;
    ${getSizeCSS};
  `,
  normal: {
    selectNames: [
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['width'],
      ['height'],
      ['color'],
      ['font'],
      ['padding'],
    ],
    defaultTheme: {
      opacity: 1,
      color: darkGreyColor,
      border: {
        top: { color: borderColor, width: 1, style: 'solid' },
        right: { color: borderColor, width: 1, style: 'solid' },
        bottom: { color: borderColor, width: 1, style: 'solid' },
      },
      background: { color: '#fff' },
      fontSize: em(12),
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      return getPadding(themeProps);
    },
  },
  hover: {
    selectNames: [
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['color'],
      ['font'],
      ['padding'],
    ],
    defaultTheme: {
      color: themeColor,
      opacity: 1,
      border: {
        top: { color: borderColor, width: 1, style: 'solid' },
        right: { color: borderColor, width: 1, style: 'solid' },
        bottom: { color: borderColor, width: 1, style: 'solid' },
      },
      background: { color: '#fff' },
      fontSize: em(12),
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      return getPadding(themeProps);
    },
  },
  disabled: {
    selectNames: [['opacity'], ['borderRadius'], ['border'], ['background'], ['color']],
    defaultTheme: {
      color: lightGreyColor,
      opacity: 1,
      border: {
        top: { color: borderDisableColor, width: 1, style: 'solid' },
        right: { color: borderDisableColor, width: 1, style: 'solid' },
        bottom: { color: borderDisableColor, width: 1, style: 'solid' },
      },
      background: { color: '#fff' },
      fontSize: em(12),
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      return getPadding(themeProps);
    },
  },
});

export const CancelSpan = StaticComponent({
  tag: 'span',
  className: 'CheckButtonCancelSpan',
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
