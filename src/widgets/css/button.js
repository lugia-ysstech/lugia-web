/**
 * Button 颜色公共值
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';
import colorsFunc from '../css/stateColor';
import get from '../css/theme-common-dict';
import { px2remcss } from '../css/units';
import { css, keyframes } from 'styled-components';
import {
  typeTheme,
  disabledTypeTheme,
  plainTypeTheme,
  plainDisabledTypeTheme,
  typeHoverTheme,
  activeTypeTheme,
  plainHoverTheme,
  plainActiveTypeTheme,
  defaultActiveTheme,
  defaultHoverTheme,
  linkTheme,
  defaultDisabledTheme,
  sizeTheme,
  circleTheme,
  shapeTheme,
  textDefaultTheme,
  textDefaultHoverTheme,
  textDefaultActiveTheme,
  textDefaultDisabledTheme,
  textTypeTheme,
  textTypeHoverTheme,
  textTypeActiveTheme,
  textTypeDisabledTheme,
  textPlainTypeTheme,
  textPlainHoverTheme,
  textPlainDisabledTypeTheme,
  textPlainActiveTypeTheme,
  textSizeTheme,
  textCircleTheme,
  textDefaultFocusTheme,
  defaultFocusTheme,
  typeFocusTheme,
  plainFocusTypeTheme,
  textPlainFocusTheme,
  textTypeFocusTheme,
  defaultButtonTheme,
} from '../button/theme';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'link';
type ButtonShape = 'default' | 'round';
type ButtonSize = 'default' | 'small' | 'large';
type CSSProps = {
  shape?: ButtonShape,
  type?: ButtonType,
  plain?: boolean,
  size?: ButtonSize,
  loading?: boolean,
  circle?: boolean,
  disabled?: boolean,
  children?: (SyntheticEvent<HTMLButtonElement>) => any,
  text?: string | React.ReactNode,
  icon?: string,
  suffixIcon?: string,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => any,
  getTheme: Function,
  viewClass?: string,
  em: Function,
  hasChildren?: boolean,
  block?: boolean,
  transition?: boolean,
};
export type ButtonOutProps = CSSProps & {
  clicked: boolean,
  onMouseOut: Function,
  onMouseEnter: Function,
  onMouseOver: Function,
  onMouseUp: Function,
  onMouseDown: Function,
  onMouseLeave: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  dispatchEvent: Function,
  themeProps: Object,
};
type IconLoadingProps = {
  loading?: boolean,
};
type TypeColor = {
  color: string,
  backgroundColor: string,
  border: string,
};
type ShapeStyle = {
  borderRadius: number,
};
type SizeStyle = {
  height: number,
  borderRadius: number,
};

const NotCircleSize = {
  width: 32,
  borderRadius: get('borderRadiusValue'),
};
const cursor = 'not-allowed';

function fetchType(type: string): Object {
  if (type === 'default') {
    return {
      border: `1px solid ${get('borderColor')}`,
    };
  }
  return {
    border: 'none',
  };
}

function fetchTypeCSS(color: string): { [key: ButtonType]: TypeColor } {
  const defaultColor = color || get('themeColor');
  const defaultTypeStyle = fetchType('default');
  const otherTypeStyle = fetchType('other');
  return {
    default: {
      backgroundColor: get('defaultColor'),
      ...defaultTypeStyle,
    },
    primary: {
      backgroundColor: defaultColor,
      ...otherTypeStyle,
    },
    success: {
      backgroundColor: get('successColor'),
      ...otherTypeStyle,
    },
    warning: {
      backgroundColor: get('warningColor'),
      ...otherTypeStyle,
    },
    danger: {
      backgroundColor: get('dangerColor'),
      ...otherTypeStyle,
    },
  };
}

const size: { [key: ButtonSize]: SizeStyle } = {
  large: {
    height: get('largeSize'),
    borderRadius: get('largeSize') / 2,
  },
  default: {
    height: get('normalSize'),
    borderRadius: get('normalSize') / 2,
  },
  small: {
    height: get('smallSize'),
    borderRadius: get('smallSize') / 2,
  },
};

function fetchSize(sizeType: ButtonSize) {
  const { height } = size[sizeType] || size.default;
  return {
    height: `${px2remcss(height)}`,
  };
}
const ShapeCSS: { [key: ButtonSize]: ShapeStyle } = {
  default: {
    borderRadius: size.default.borderRadius,
  },
  large: {
    borderRadius: size.large.borderRadius,
  },
  small: {
    borderRadius: size.small.borderRadius,
  },
};

export const getClickCSS = (props: ButtonOutProps) => {
  const { type = 'default', size = 'default', shape = 'default', circle = false } = props;
  if (type === 'link') return '';

  const { height: sizeHeight } = fetchSize(size);
  const typeTheme =
    fetchTypeCSS(get('themeColor'))[type] || fetchTypeCSS(get('themeColor')).default;
  const backGround =
    type === 'default' ? 'none' : colorsFunc(typeTheme.backgroundColor).mouseDownColor;
  const borderRadius = circle
    ? '50%'
    : shape === 'default'
    ? px2remcss(NotCircleSize.borderRadius)
    : (ShapeCSS[size] && px2remcss(ShapeCSS[size].borderRadius)) || '';

  const clickAnimate = keyframes`
    0% {
      width: 0;
      height: 0;
      background: ${backGround};
      border-radius: 0;
      opacity: 0;
    }
    50% {
      width: 100%;
      height: ${sizeHeight};
      background: ${backGround};
      opacity: 0.15;
      border-radius: ${borderRadius};
    }
    100% {
      width: 100%;
      height: ${sizeHeight};
      background: ${backGround};
      opacity: 0;
      border-radius: ${borderRadius};
    }
  `;
  const { clicked, transition } = props;
  if (clicked && transition) {
    return css`
      &::after {
        content: '';
        height: 0;
        border: 0;
        position: absolute;
        z-index: 50;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: ${clickAnimate} 0.5s linear;
      }
    `;
  }
};
export const getIconStyle = (props: Object) => {
  const { hasChildren = true, isSuffix = false } = props;
  if (!hasChildren) {
    return '';
  }
  return `
    margin-${isSuffix ? 'left' : 'right'}: ${px2remcss(get('paddingToText'))};
  `;
};
const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

export const getLoadingIconStyle = (props: IconLoadingProps) => {
  const { loading = false } = props;
  if (loading) {
    return css`
      animation: ${spin} 1s infinite linear;
    `;
  }
};
export const getIconCursor = (props: Object): string => {
  const { disabled } = props;
  if (disabled) {
    return `cursor: ${cursor};`;
  }
  return '';
};
const getHoverStyle = (propsConfig: Object = {}) => {
  const { type = 'default', plain } = propsConfig;
  let hoverTheme;
  if (plain) {
    hoverTheme = plainHoverTheme()[type] || plainHoverTheme().default;
  } else {
    hoverTheme = typeHoverTheme()[type] || typeHoverTheme().default;
  }
  return hoverTheme;
};
export const ButtonOut = CSSComponent({
  tag: 'button',
  className: 'ButtonOut',
  normal: {
    selectNames: [
      ['background'],
      ['border'],
      ['height'],
      ['width'],
      ['padding'],
      ['margin'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    defaultTheme: defaultButtonTheme(),
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const {
        type = 'default',
        plain,
        loading,
        size = 'default',
        circle,
        shape = 'default',
      } = propsConfig;
      if (type === 'link') return linkTheme;

      let normalTheme;
      if (loading) {
        if (plain) {
          normalTheme = plainHoverTheme()[type] || plainHoverTheme().default;
        } else {
          normalTheme = typeHoverTheme()[type] || typeHoverTheme().default;
        }
      } else if (plain) {
        normalTheme = plainTypeTheme()[type] || plainTypeTheme().default;
      } else {
        normalTheme = typeTheme()[type] || typeTheme().default;
      }
      const sizeThemeStyle = circle
        ? circleTheme[size] || circleTheme.default
        : sizeTheme[size] || sizeTheme.default;
      const shapeThemeStyle =
        shape === 'round'
          ? shapeTheme[size] || shapeTheme.default
          : { borderRadius: getBorderRadius(get('borderRadiusValue')) };

      return { ...normalTheme, ...shapeThemeStyle, ...sizeThemeStyle };
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['boxShadow']],
    defaultTheme: defaultHoverTheme(),
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default' } = propsConfig;
      if (type === 'link') return linkTheme;

      return getHoverStyle(propsConfig);
    },
  },
  disabled: {
    selectNames: [['background'], ['border'], ['boxShadow']],
    defaultTheme: { ...defaultDisabledTheme(), cursor },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default', plain } = propsConfig;
      if (type === 'link') return linkTheme;

      let disabledTheme;
      if (plain) {
        disabledTheme = plainDisabledTypeTheme()[type] || plainDisabledTypeTheme().default;
      } else {
        disabledTheme = disabledTypeTheme()[type] || disabledTypeTheme().default;
      }

      return disabledTheme;
    },
  },
  active: {
    selectNames: [['background'], ['border'], ['boxShadow']],
    defaultTheme: defaultActiveTheme(),
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default', plain } = propsConfig;
      if (type === 'link') return linkTheme;

      let activeTheme;
      if (plain) {
        activeTheme = plainActiveTypeTheme()[type] || plainActiveTypeTheme().default;
      } else {
        activeTheme = activeTypeTheme()[type] || activeTypeTheme().default;
      }

      return activeTheme;
    },
  },

  focus: {
    selectNames: [['background'], ['border'], ['boxShadow']],
    defaultTheme: defaultFocusTheme(),
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default', plain } = propsConfig;
      if (type === 'link') return linkTheme;

      let focusTheme;
      if (plain) {
        focusTheme = plainFocusTypeTheme()[type] || plainFocusTypeTheme().default;
      } else {
        focusTheme = typeFocusTheme()[type] || typeFocusTheme().default;
      }
      return focusTheme;
    },
  },
  css: css`
    display: inline-block;
    margin-bottom: 0;
    box-sizing: border-box;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
    user-select: none;
    position: relative;
    text-transform: none;
    outline: 0;
    ${props => (props.block ? 'width: 100%;' : '')}
    ${props => (props.loading ? 'pointer-events: none;' : '')}
    ${props =>
      (props.transition
        ? 'transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);'
        : 'transition: none')}
    ${getClickCSS}
  `,
});
export const getTextLoadingTheme = (props: Object) => {
  const { plain, type = 'default' } = props;
  if (plain) {
    return textPlainHoverTheme[type] || textPlainHoverTheme.default;
  }
  return textTypeHoverTheme[type] || textTypeHoverTheme.default;
};
export const getTextNormalTheme = (propsConfig: Object) => {
  const { type = 'default', plain, loading } = propsConfig;
  let normalTheme;
  if (loading) {
    normalTheme = getTextLoadingTheme({ plain, type });
  } else if (plain) {
    normalTheme = textPlainTypeTheme[type] || textPlainTypeTheme.default;
  } else {
    normalTheme = textTypeTheme[type] || textTypeTheme.default;
  }

  return normalTheme;
};
export const getTextHoverStyle = (propsConfig: Object = {}) => {
  const { type = 'default', plain } = propsConfig;
  let hoverTheme;
  if (plain) {
    hoverTheme = textPlainHoverTheme[type] || textPlainHoverTheme.default;
  } else {
    hoverTheme = textTypeHoverTheme[type] || textTypeHoverTheme.default;
  }
  return hoverTheme;
};
export const getTextFocusStyle = (propsConfig: Object = {}) => {
  const { type = 'default', plain } = propsConfig;
  let focusTheme;
  if (plain) {
    focusTheme = textPlainFocusTheme[type] || textPlainFocusTheme.default;
  } else {
    focusTheme = textTypeFocusTheme[type] || textTypeFocusTheme.default;
  }
  return focusTheme;
};
export const getTextActiveTheme = (propsConfig: Object) => {
  const { type = 'default', plain } = propsConfig;
  let activeTheme;
  if (plain) {
    activeTheme = textPlainActiveTypeTheme[type] || textPlainActiveTypeTheme.default;
  } else {
    activeTheme = textTypeActiveTheme[type] || textTypeActiveTheme.default;
  }

  return activeTheme;
};
export const getTextDisabledTheme = (propsConfig: Object) => {
  const { type = 'default', plain } = propsConfig;
  let disabledTheme;
  if (plain) {
    disabledTheme = textPlainDisabledTypeTheme[type] || textPlainDisabledTypeTheme.default;
  } else {
    disabledTheme = textTypeDisabledTheme[type] || textTypeDisabledTheme.default;
  }

  return disabledTheme;
};
export const Text = CSSComponent({
  className: 'ButtonText',
  tag: 'span',
  normal: {
    selectNames: [['color'], ['font']],
    defaultTheme: textDefaultTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { size = 'default', circle } = propsConfig;
      const normalTheme = getTextNormalTheme(propsConfig);
      const sizeTheme = circle
        ? textCircleTheme[size] || textCircleTheme.default
        : textSizeTheme[size] || textSizeTheme.default;
      return { ...normalTheme, ...sizeTheme };
    },
  },
  hover: {
    selectNames: [['color'], ['font']],
    defaultTheme: textDefaultHoverTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;

      return getTextHoverStyle(propsConfig);
    },
  },
  active: {
    selectNames: [['color'], ['font']],
    defaultTheme: textDefaultActiveTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;

      return getTextActiveTheme(propsConfig);
    },
  },
  disabled: {
    selectNames: [['color'], ['font']],
    defaultTheme: textDefaultDisabledTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;

      return getTextDisabledTheme(propsConfig);
    },
  },
  focus: {
    selectNames: [['color'], ['font']],
    defaultTheme: textDefaultFocusTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;

      return getTextFocusStyle(propsConfig);
    },
  },
});

export const ButtonContent = StaticComponent({
  tag: 'span',
  className: 'ButtonContent',
  css: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
});
