/**
 * Button 颜色公共值
 * create by guorg
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';
import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';
import { css, keyframes } from 'styled-components';
import {
  TypeTheme,
  DisabledTypeTheme,
  PlainTypeTheme,
  PlainDisabledTypeTheme,
  TypeHoverTheme,
  ActiveTypeTheme,
  PlainHoverTheme,
  PlainActiveTypeTheme,
  defaultActiveTheme,
  defaultHoverTheme,
  defaultTheme,
  defaultDisabledTheme,
  SizeTheme,
  CircleTheme,
  ShapeTheme,
  textDefaultTheme,
  textDefaultHoverTheme,
  textDefaultActiveTheme,
  textDefaultDisabledTheme,
  TextTypeTheme,
  TextTypeHoverTheme,
  TextTypeActiveTheme,
  TextTypeDisabledTheme,
  TextPlainTypeTheme,
  TextPlainHoverTheme,
  TextPlainDisabledTypeTheme,
  TextPlainActiveTypeTheme,
  TextSizeTheme,
  TextCircleTheme,
} from '../button/theme';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
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
  onClick?: (SyntheticEvent<HTMLButtonElement>) => any,
  getTheme: Function,
  viewClass?: string,
  loading?: boolean,
  em: Function,
  hasChildren?: boolean,
  block?: boolean,
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

const Size = {
  large: {
    height: 40,
    borderRadius: 20,
  },
  default: {
    height: 32,
    borderRadius: 16,
  },
  small: {
    height: 24,
    borderRadius: 12,
  },
};

const NotCircleSize = {
  width: 32,
  borderRadius: 4,
};
const CircleCSS = {
  default: {
    font: 16,
  },
  small: {
    font: 12,
  },
  large: {
    font: 18,
  },
};
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  lightGreyColor,
  darkGreyColor,
  defaultColor: white,
} = colorsFunc();
const cursor = 'not-allowed';

function fetchType(type: string): Object {
  if (type === 'default') {
    return {
      color: darkGreyColor,
      border: `1px solid ${lightGreyColor}`,
    };
  }
  return {
    color: white,
    border: 'none',
  };
}

function fetchTypeCSS(color: string): { [key: ButtonType]: TypeColor } {
  const defaultColor = color || themeColor;
  const defaultTypeStyle = fetchType('default');
  const otherTypeStyle = fetchType('other');
  return {
    default: {
      backgroundColor: white,
      ...defaultTypeStyle,
    },
    primary: {
      backgroundColor: defaultColor,
      ...otherTypeStyle,
    },
    success: {
      backgroundColor: successColor,
      ...otherTypeStyle,
    },
    warning: {
      backgroundColor: warningColor,
      ...otherTypeStyle,
    },
    danger: {
      backgroundColor: dangerColor,
      ...otherTypeStyle,
    },
  };
}

function fetchSize(sizeType: string) {
  const { height } = Size[sizeType] || Size.default;
  return {
    height: `${px2remcss(height)}`,
  };
}

const ShapeCSS: { [key: ButtonSize]: ShapeStyle } = {
  default: {
    borderRadius: Size.default.borderRadius,
  },
  large: {
    borderRadius: Size.large.borderRadius,
  },
  small: {
    borderRadius: Size.small.borderRadius,
  },
};

export const getClickCSS = (props: ButtonOutProps) => {
  const { type = 'default', size = 'default', shape = 'default', circle = false } = props;
  const { height: sizeHeight } = fetchSize(size);
  const typeTheme = fetchTypeCSS(themeColor)[type] || fetchTypeCSS(themeColor).default;
  const backGround =
    type === 'default' ? 'none' : colorsFunc(typeTheme.backgroundColor).mouseDownColor;
  const borderRadius = circle
    ? '50%'
    : shape === 'default'
    ? px2remcss(NotCircleSize.borderRadius)
    : px2remcss(ShapeCSS[size].borderRadius);

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
  const { clicked } = props;
  if (clicked) {
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
  const { hasChildren = true } = props;
  if (!hasChildren) {
    return '';
  }
  return `
    margin-right: ${px2remcss(10)};
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
export const getCircleIconFont = (props: CSSProps) => {
  const { size = 'default' } = props;
  const fontSize = CircleCSS[size].font;
  return `font-size: ${px2remcss(fontSize)};`;
};
export const getIconCursor = (props: CSSProps): ?string => {
  const { disabled } = props;
  if (disabled) {
    return `cursor: ${cursor}; !important`;
  }
  return '';
};
const getHoverStyle = (propsConfig: Object = {}) => {
  const { type = 'default', plain } = propsConfig;
  let hoverTheme;
  if (plain) {
    hoverTheme = PlainHoverTheme[type] || PlainHoverTheme.default;
  } else {
    hoverTheme = TypeHoverTheme[type] || TypeHoverTheme.default;
  }
  return hoverTheme;
};
export const ButtonOut = CSSComponent({
  tag: 'button',
  className: 'ButtonOut',
  normal: {
    selectNames: [['background'], ['border'], ['height'], ['width'], ['padding'], ['borderRadius']],
    defaultTheme,
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
      let normalTheme;
      if (loading) {
        if (plain) {
          normalTheme = PlainHoverTheme[type] || PlainHoverTheme.default;
        } else {
          normalTheme = TypeHoverTheme[type] || TypeHoverTheme.default;
        }
      } else if (plain) {
        normalTheme = PlainTypeTheme[type] || PlainTypeTheme.default;
      } else {
        normalTheme = TypeTheme[type] || TypeTheme.default;
      }
      const sizeTheme = circle
        ? CircleTheme[size] || CircleTheme.default
        : SizeTheme[size] || SizeTheme.default;
      const shapeTheme =
        shape === 'round'
          ? ShapeTheme[size] || ShapeTheme.default
          : { borderRadius: getBorderRadius(4) };

      return { ...normalTheme, ...shapeTheme, ...sizeTheme };
    },
  },
  hover: {
    selectNames: [['background'], ['border']],
    defaultTheme: defaultHoverTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      return getHoverStyle(propsConfig);
    },
  },
  disabled: {
    selectNames: [['background'], ['border']],
    defaultTheme: { ...defaultDisabledTheme, cursor },
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default', plain } = propsConfig;
      let disabledTheme;
      if (plain) {
        disabledTheme = PlainDisabledTypeTheme[type] || PlainDisabledTypeTheme.default;
      } else {
        disabledTheme = DisabledTypeTheme[type] || DisabledTypeTheme.default;
      }

      return disabledTheme;
    },
  },
  active: {
    selectNames: [['background'], ['border']],
    defaultTheme: defaultActiveTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      const { type = 'default', plain } = propsConfig;
      let activeTheme;
      if (plain) {
        activeTheme = PlainActiveTypeTheme[type] || PlainActiveTypeTheme.default;
      } else {
        activeTheme = ActiveTypeTheme[type] || ActiveTypeTheme.default;
      }

      return activeTheme;
    },
  },
  focus: {
    selectNames: [['background'], ['border']],
    defaultTheme: defaultHoverTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;
      return getHoverStyle(propsConfig);
    },
  },
  css: css`
    display: inline-block;
    margin-bottom: 0;
    box-sizing: border-box;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
    user-select: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    text-transform: none;
    outline: 0;
    ${props => (props.block ? 'width: 100%;' : '')}
    ${props => (props.loading ? 'pointer-events: none;' : '')}
    ${getClickCSS}
  `,
});

export const getTextLoadingTheme = (props: Object) => {
  const { plain, type = 'default' } = props;
  if (plain) {
    return TextPlainHoverTheme[type] || TextPlainHoverTheme.default;
  }
  return TextTypeHoverTheme[type] || TextTypeHoverTheme.default;
};
export const getTextNormalTheme = (propsConfig: Object) => {
  const { type = 'default', plain, loading } = propsConfig;
  let normalTheme;
  if (loading) {
    normalTheme = getTextLoadingTheme({ plain, type });
  } else if (plain) {
    normalTheme = TextPlainTypeTheme[type] || TextPlainTypeTheme.default;
  } else {
    normalTheme = TextTypeTheme[type] || TextTypeTheme.default;
  }

  return normalTheme;
};
export const getTextHoverStyle = (propsConfig: Object = {}) => {
  const { type = 'default', plain } = propsConfig;
  let hoverTheme;
  if (plain) {
    hoverTheme = TextPlainHoverTheme[type] || TextPlainHoverTheme.default;
  } else {
    hoverTheme = TextTypeHoverTheme[type] || TextTypeHoverTheme.default;
  }
  return hoverTheme;
};
export const getTextActiveTheme = (propsConfig: Object) => {
  const { type = 'default', plain } = propsConfig;
  let activeTheme;
  if (plain) {
    activeTheme = TextPlainActiveTypeTheme[type] || TextPlainActiveTypeTheme.default;
  } else {
    activeTheme = TextTypeActiveTheme[type] || TextTypeActiveTheme.default;
  }

  return activeTheme;
};
export const getTextDisabledTheme = (propsConfig: Object) => {
  const { type = 'default', plain } = propsConfig;
  let disabledTheme;
  if (plain) {
    disabledTheme = TextPlainDisabledTypeTheme[type] || TextPlainDisabledTypeTheme.default;
  } else {
    disabledTheme = TextTypeDisabledTheme[type] || TextTypeDisabledTheme.default;
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
        ? TextCircleTheme[size] || TextCircleTheme.default
        : TextSizeTheme[size] || TextSizeTheme.default;

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
    defaultTheme: textDefaultHoverTheme,
    getThemeMeta(themeMeta: Object, themeProps: Object): Object {
      const { propsConfig = {} } = themeProps;

      return getTextHoverStyle(propsConfig);
    },
  },
});
