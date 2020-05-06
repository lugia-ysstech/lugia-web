/**
 * UI颜色公共值
 * create by szfeng
 *
 * @flow
 */
import colorsFunc from './stateColor';
import { px2remcss } from './units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';
import { getThemeDefaultConfigFromSource } from '../utils';
import get from './theme-common-dict';

type SizeThemeConfig = {
  small: { [key: string]: object },
  default: { [key: string]: object },
  large: { [key: string]: object },
};

const DefaultWidth = 92;

const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';

const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const themeFocusColor = '$lugia-dict.@lugia/lugia-web.themeFocusColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const fontSmallSize = 12;
const fontDefaultSize = 14;
const fontLargeSize = 14;
const iconSamllSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const iconDefaultSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const iconLargeSize = '$lugia-dict.@lugia/lugia-web.sFontSize';

const heightSize = {
  small: smallSize,
  default: normalSize,
  large: largeSize,
};
const textFontSize = {
  small: fontSmallSize,
  default: fontDefaultSize,
  large: fontLargeSize,
};
const iconSize = {
  small: iconSamllSize,
  default: iconDefaultSize,
  large: iconLargeSize,
};

const crateDropMenuThemeConfig = (type: SizeType) => {
  return {
    Container: {
      normal: {
        height: heightSize[type],
      },
    },
    TextContainer: {
      normal: {
        fontSize: textFontSize[type],
      },
    },
    PrefixIcon: {
      normal: {
        fontSize: iconSize[type],
      },
    },
    SuffixIcon: {
      normal: {
        fontSize: iconSize[type],
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: iconSize[type],
      },
    },
  };
};

export const dropMenuThemeDefaultConfig: SizeThemeConfig = {
  small: crateDropMenuThemeConfig('small'),
  default: crateDropMenuThemeConfig('default'),
  large: crateDropMenuThemeConfig('large'),
};

export const getMenuThemeDefaultConfig = (sizeType: SizeType, themeName: string) => {
  return getThemeDefaultConfigFromSource(dropMenuThemeDefaultConfig)(sizeType, themeName);
};

const getHoverBgColorFromNormalOrHover = (params: Object, checked) => {
  const { normal = {}, hover = {} } = params;
  const { background: hoverBg = {} } = hover;

  const { background: normalBg = {} } = normal;
  return hoverBg.color
    ? hoverBg.color
    : normalBg.color
    ? colorsFunc(normalBg.color).hoverColor
    : checked
    ? get('themeFocusColor')
    : get('themeHoverColor');
};

const getActiveBgColorFromNormalOrActive = (params: Object) => {
  const { normal = {}, active = {} } = params;
  const { background: activeBg = {} } = active;

  const { background: normalBg = {} } = normal;

  return activeBg.color
    ? activeBg.color
    : normalBg.color
    ? colorsFunc(normalBg.color).mouseDownColor
    : themeActiveColor;
};

const getNoDividedCustomsDefaultCSS = themeMeta => {
  const { background = {} } = themeMeta;
  const { color = themeColor } = background;

  return {
    color: defaultColor,
    border: getBorder({
      color,
      width: 1,
      style: 'solid',
    }),
    background: {
      color,
    },
  };
};

const getNoDividedCheckedDefaultBasicCSS = param => {
  const { normal: { color = themeFocusColor } = {} } = param;
  return {
    border: 'none',
    color,
  };
};

const getNoDividedCheckedDefaultPrimary = param => {
  const { normal: { color = themeFocusColor } = {} } = param;
  return {
    border: getBorder(get('focusBorder')),
    color,
  };
};

const getNoDividedCheckedDefaultCustoms = param => {
  const { normal: { color = themeFocusColor } = {} } = param;
  return {
    color: defaultColor,
    border: getBorder({
      color,
      width: 1,
      style: 'solid',
    }),
    background: {
      color,
    },
  };
};

const getNoDividedCheckedDefaultCSS = (type, param) => {
  if (type === 'basic') {
    return getNoDividedCheckedDefaultBasicCSS(param);
  } else if (type === 'primary') {
    return getNoDividedCheckedDefaultPrimary(param);
  }
  return getNoDividedCheckedDefaultCustoms(param);
};

const getNoDividedDefaultCSS = (type, themeMeta) => {
  const basicCSS = {
    border: 'none',
    background: 'none',
    color: themeColor,
  };
  const primaryCSS = {
    color: blackColor,
    border: getBorder(get('normalBorder')),
  };
  return type === 'basic'
    ? basicCSS
    : type === 'primary'
    ? primaryCSS
    : getNoDividedCustomsDefaultCSS(themeMeta);
};

const getColorFromNormalOrHover = (params: Object) => {
  const { normal = {}, hover = {} } = params;
  return hover.color
    ? hover.color
    : normal.color
    ? colorsFunc(normal.color).hoverColor
    : themeColor;
};

const getColorFromNormalOrActive = params => {
  const { normal = {}, active = {} } = params;

  return active.color
    ? active.color
    : normal.color
    ? colorsFunc(normal.color).mouseDownColor
    : themeActiveColor;
};

const getNoDividedBasicHoverCSS = param => {
  const color = getColorFromNormalOrHover(param, get('themeColor'));
  return {
    color,
  };
};

const getNoDividedBasicActiveCSS = param => {
  const color = getColorFromNormalOrActive(param, get('themeColor'));
  return {
    color,
  };
};

const getNoDividedCustomsHoverCSS = param => {
  const hoverbgColor = getHoverBgColorFromNormalOrHover(param);
  const hoverCSS = {
    background: {
      color: hoverbgColor,
    },
    border: getBorder({
      color: hoverbgColor,
      width: 1,
      style: 'solid',
    }),
    color: defaultColor,
  };
  return hoverCSS;
};

const getNoDividedCustomsActiveCSS = param => {
  const activebgColor = getActiveBgColorFromNormalOrActive(param);
  const activeCSS = {
    background: {
      color: activebgColor,
    },
    border: getBorder({
      color: activebgColor,
      width: 1,
      style: 'solid',
    }),
  };
  return activeCSS;
};

const getNoDividedPrimaryHoverCSS = param => {
  const color = getColorFromNormalOrHover(param, get('themeColor'));

  return {
    color,
    border: getBorder(get('hoverBorder')),
  };
};

const getNoDividedPrimaryAativeCSS = param => {
  const color = getColorFromNormalOrActive(param, get('themeColor'));

  return {
    color,
    border: getBorder(get('activeBorder')),
  };
};

const getNoDividedHoverCSS = (type, param) => {
  const { disabled } = param;
  if (disabled) {
    return {};
  }
  if (type === 'basic') {
    return getNoDividedBasicHoverCSS(param);
  } else if (type === 'primary') {
    return getNoDividedPrimaryHoverCSS(param);
  }
  return getNoDividedCustomsHoverCSS(param);
};

const getNoDividedActiveCSS = (type, param) => {
  if (type === 'basic') {
    return getNoDividedBasicActiveCSS(param);
  } else if (type === 'primary') {
    return getNoDividedPrimaryAativeCSS(param);
  }
  return getNoDividedCustomsActiveCSS(param);
};

const getNoDividedDisabledCSS = type => {
  if (type === 'basic') {
    return {
      color: themeDisabledColor,
    };
  } else if (type === 'primary') {
    return {
      color: disableTextColor,
      border: getBorder(get('disabledBorder')),
    };
  }
  const disColor = themeDisabledColor;
  return {
    border: getBorder({
      color: disColor,
      width: 1,
      style: 'solid',
    }),
    background: {
      color: disColor,
    },
  };
};

const getDividedContainerHeight = size => {
  const height =
    size === 'small' ? get('smallSize') : size === 'large' ? get('largeSize') : get('normalSize');
  return height;
};

export const NoDividedContainer = CSSComponent({
  tag: 'div',
  className: 'NoDividedContainer',

  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['lineHeight'],
      ['color'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { normal = {}, hover = {} } = themeConfig;
      const { type, checked } = propsConfig;
      const { height = get('normalSize') } = themeMeta;
      const defaultCSS = checked
        ? getNoDividedCheckedDefaultCSS(type, { normal, hover })
        : getNoDividedDefaultCSS(type, themeMeta);
      return {
        height,
        ...defaultCSS,
      };
    },
    defaultTheme: {},
  },
  hover: {
    selectNames: [
      ['color'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],

    getThemeMeta: (themeMeta, themeProps) => {
      const { themeConfig, propsConfig } = themeProps;
      const { normal = {}, hover = {} } = themeConfig;
      const { type, disabled } = propsConfig;
      const hoverCSS = getNoDividedHoverCSS(type, { normal, hover, disabled });

      return { ...hoverCSS };
    },
    defaultTheme: {},
  },
  active: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { themeConfig, propsConfig } = themeProps;
      const { normal = {}, active = {} } = themeConfig;
      const { type } = propsConfig;
      const activeCSS = getNoDividedActiveCSS(type, { normal, active });
      return { ...activeCSS };
    },
  },
  disabled: {
    selectNames: [
      ['color'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;

      const disabledCSS = getNoDividedDisabledCSS(type);

      return {
        ...disabledCSS,
      };
    },
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    width: ${px2remcss(DefaultWidth)};
    border-radius: ${px2remcss(get('borderRadiusValue'))};
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: 0.3s;
    border-width: ${px2remcss(1)};
    border-style: solid;
    position: relative;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    font-size: ${px2remcss(14)};
  `,
  option: { hover: true, active: true, disabled: true },
});

const getCursor = props => {
  const { disabled } = props;
  return `cursor: ${disabled ? 'not-allowed' : 'pointer'}`;
};

export const CheckInput = StaticComponent({
  tag: 'input',
  className: 'CheckInput',
  css: css`
    position: absolute;
    left: 0;
    top: 0;
    outline: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    opacity: 0;
    ${getCursor}
  `,
});

export const NoDividedWrap = StaticComponent({
  tag: 'div',
  className: 'NoDividedWrap',
  css: css`
    height: 100%;
    width: 100%;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    white-space: nowrap;
    & i {
      vertical-align: middle;
    }
  `,
});

export const NoDividedIconWrap = CSSComponent({
  tag: 'span',
  className: 'NoDividedIconWrap',
  normal: {
    selectNames: [
      ['margin'],
      ['padding'],
      ['color'],
      ['opacity'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {},
    defaultTheme: {},
  },
  css: css`
    display: inline-block;
    padding-left: ${px2remcss(6)};
    padding-right: ${px2remcss(6)};
    overflow: hidden;
  `,
});

const getDividedHoverCSS = (type, themeConfig = {}) => {
  const { hover = {} } = themeConfig;
  const color = hover.color
    ? hover.color
    : type === 'primary'
    ? get('hoverBorder').color
    : get('defaultColor');
  return color;
};

const getDividedActiveCSS = (type, themeConfig = {}) => {
  const { active = {} } = themeConfig;
  const color = active.color
    ? active.color
    : type === 'primary'
    ? get('activeBorder').color
    : get('defaultColor');
  return color;
};

export const DividedContainer = CSSComponent({
  tag: 'div',
  className: 'DividedContainer',

  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['lineHeight'],
      ['opacity'],
      ['font'],
      ['fontSize'],
      ['cursor'],
      ['color'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    getThemeMeta: themeMeta => {
      const { height = get('normalSize') } = themeMeta;
      return {
        height,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { normal: { height = get('normalSize') } = {} } = themeConfig;
      const { disabled, dividedThemeConfig, type, size = 'default' } = propsConfig;
      const newHeight = isNaN(parseInt(height, 10)) ? getDividedContainerHeight(size) : height;
      const hoverCSS = `
             &:hover > span {
             height: ${px2remcss(newHeight)};
              border-color: ${getDividedHoverCSS(type, dividedThemeConfig)}
             }

             &:active > span {
              height: ${px2remcss(newHeight)};
              border-color: ${getDividedActiveCSS(type, dividedThemeConfig)}
             }
             `;

      return disabled ? '' : hoverCSS;
    },
    defaultTheme: {},
  },

  disabled: {
    selectNames: [
      ['lineHeight'],
      ['opacity'],
      ['boxShadow'],
      ['font'],
      ['fontSize'],
      ['cursor'],
      ['color'],
      ['borderRadius'],
    ],
    getThemeMeta: () => {
      return {};
    },
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    width: ${px2remcss(DefaultWidth)};
    border-radius: ${px2remcss(get('borderRadiusValue'))};
    transition: all 0.3s;
    position: relative;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    font-size: ${px2remcss(14)};
  `,
  option: { hover: false, active: false, disabled: true },
});

export const DividedWrap = StaticComponent({
  tag: 'div',
  className: 'DividedWrap',
  css: css`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    overflow: hidden;
  `,
});

const getDevidedTextContainerPrimaryDefaultCSS = isPullContainer => {
  return {
    border: getBorder(get('normalBorder')),
    color: isPullContainer ? mediumGreyColor : blackColor,
  };
};

const getDevidedTextContainerCustomsDefaultCSS = themeMeta => {
  const { background = {} } = themeMeta;
  const { color = themeColor } = background;
  return {
    color: defaultColor,
    background: {
      color,
    },
    border: getBorder({
      color,
      width: 1,
      style: 'solid',
    }),
  };
};

const getDevidedTextContainerDefaultCSS = (type, themeMeta, isPullContainer) => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryDefaultCSS(isPullContainer)
    : getDevidedTextContainerCustomsDefaultCSS(themeMeta);
};

const getDevidedTextContainerPrimaryHoverCSS = checked => {
  return {
    border: checked ? getBorder(get('focusBorder')) : getBorder(get('hoverBorder')),
    color: checked ? themeFocusColor : themeColor,
  };
};

const getDevidedTextContainerCustomsHoverCSS = (themeConfig, checked) => {
  const hoverbgColor = getHoverBgColorFromNormalOrHover(themeConfig, checked);
  const hoverCSS = {
    background: {
      color: hoverbgColor,
    },
    border: getBorder({
      color: hoverbgColor,
      width: 1,
      style: 'solid',
    }),
    color: defaultColor,
  };
  return hoverCSS;
};

const getDevidedTextContainerHoverCSS = (type, themeConfig, checked) => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryHoverCSS(checked)
    : getDevidedTextContainerCustomsHoverCSS(themeConfig, checked);
};

const getDevidedTextContainerPrimaryActiveCSS = () => {
  return {
    border: getBorder(get('activeBorder')),
    color: themeActiveColor,
  };
};

const getDevidedTextContainerCustomsActiveCSS = themeConfig => {
  const activebgColor = getActiveBgColorFromNormalOrActive(themeConfig);
  const activeCSS = {
    background: {
      color: activebgColor,
    },
    border: getBorder({
      color: activebgColor,
      width: 1,
      style: 'solid',
    }),
  };
  return activeCSS;
};

const getDevidedTextContainerActiveCSS = (type, themeConfig) => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryActiveCSS()
    : getDevidedTextContainerCustomsActiveCSS(themeConfig);
};

const getDevidedTextContainerPrimaryDisabledCSS = () => {
  return {
    border: getBorder(get('disabledBorder')),
    color: disableTextColor,
  };
};

const getDevidedTextContainerCustomsDisabledCSS = () => {
  return {
    border: getBorder({
      color: themeDisabledColor,
      width: 1,
      style: 'solid',
    }),
    background: {
      color: themeDisabledColor,
    },
  };
};

const getDevidedTextContainerDisabledCSS = type => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryDisabledCSS()
    : getDevidedTextContainerCustomsDisabledCSS();
};

export const DevidedTextContainer = CSSComponent({
  tag: 'div',
  className: 'DevidedTextContainer',
  normal: {
    selectNames: [
      ['width'],
      ['padding'],
      ['background'],
      ['lineHeight'],
      ['border', 'left'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['opacity'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type, checked } = propsConfig;

      const defaultCSS = checked
        ? getDevidedTextContainerHoverCSS(type, themeConfig, checked)
        : getDevidedTextContainerDefaultCSS(type, themeMeta);
      return {
        ...defaultCSS,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        propsConfig: { borderRadius: { topLeft, bottomLeft } = {} },
      } = themeProps;
      const activeTopLeft = topLeft || topLeft === 0 ? topLeft : get('borderRadiusValue');
      const activeBottomLeft =
        bottomLeft || bottomLeft === 0 ? bottomLeft : get('borderRadiusValue');
      return `
      border-top-left-radius: ${px2remcss(activeTopLeft)};
      border-bottom-left-radius: ${px2remcss(activeBottomLeft)};
      `;
    },
    defaultTheme: {},
  },
  hover: {
    selectNames: [
      ['background'],
      ['border', 'left'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type } = propsConfig;

      const hoverCSS = getDevidedTextContainerHoverCSS(type, themeConfig);
      return {
        ...hoverCSS,
      };
    },
    defaultTheme: {},
  },
  active: {
    selectNames: [
      ['lineHeight'],
      ['background'],
      ['border', 'left'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type } = propsConfig;

      const activeCSS = getDevidedTextContainerActiveCSS(type, themeConfig);
      return {
        ...activeCSS,
      };
    },

    defaultTheme: {},
  },
  disabled: {
    selectNames: [
      ['lineHeight'],
      ['background'],
      ['border', 'left'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['opacity'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;

      const disabledCSS = getDevidedTextContainerDisabledCSS(type);
      return {
        ...disabledCSS,
      };
    },
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    transition: all 0.3s;
    border-right: 0;
    width: 75%;
    max-width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & i {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});

export const NoDevidedTextContainer = CSSComponent({
  tag: 'div',
  className: 'NoDevidedTextContainer',
  normal: {
    selectNames: [
      ['width'],
      ['padding'],
      ['lineHeight'],
      ['color'],
      ['opacity'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    defaultTheme: {},
  },
  hover: {
    selectNames: [['color'], ['opacity'], ['font'], ['fontSize']],
    defaultTheme: {},
  },
  active: {
    selectNames: [['color'], ['opacity'], ['font'], ['fontSize']],

    defaultTheme: {},
  },
  disabled: {
    selectNames: [['color'], ['opacity'], ['font'], ['fontSize']],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    display: inline-block;
    vertical-align: top;
    transition: all 0.3s;
  `,
  option: { hover: true, active: true, disabled: true },
});

export const PullContainer = CSSComponent({
  tag: 'span',
  className: 'PullContainer',
  normal: {
    selectNames: [
      ['padding'],
      ['background'],
      ['lineHeight'],
      ['border', 'right'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['cursor'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type, checked } = propsConfig;
      const defaultCSS = checked
        ? getDevidedTextContainerHoverCSS(type, themeConfig, checked)
        : getDevidedTextContainerDefaultCSS(type, themeMeta, true);
      return {
        ...defaultCSS,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        propsConfig: { borderRadius: { topRight, bottomRight } = {} },
      } = themeProps;
      const activeTopRight = topRight || topRight === 0 ? topRight : get('borderRadiusValue');
      const activeBottomRight =
        bottomRight || bottomRight === 0 ? bottomRight : get('borderRadiusValue');
      return `
      border-top-right-radius: ${px2remcss(activeTopRight)};
      border-bottom-right-radius: ${px2remcss(activeBottomRight)};
      `;
    },
    defaultTheme: {},
  },
  hover: {
    selectNames: [
      ['lineHeight'],
      ['background'],
      ['border', 'right'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type } = propsConfig;
      const hoverCSS = getDevidedTextContainerHoverCSS(type, themeConfig);
      return {
        ...hoverCSS,
      };
    },
    defaultTheme: {},
  },
  active: {
    selectNames: [
      ['lineHeight'],
      ['background'],
      ['border', 'right'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { type } = propsConfig;

      const activeCSS = getDevidedTextContainerActiveCSS(type, themeConfig);
      return {
        ...activeCSS,
      };
    },

    defaultTheme: {},
  },
  disabled: {
    selectNames: [
      ['lineHeight'],
      ['background'],
      ['border', 'right'],
      ['border', 'top'],
      ['border', 'bottom'],
      ['color'],
      ['opacity'],
      ['font'],
      ['fontSize'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;

      const disabledCSS = getDevidedTextContainerDisabledCSS(type);
      return {
        ...disabledCSS,
      };
    },
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    z-index: 200;
    & i {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});
PullContainer.displayName = 'DropMenuPullButton';

const getSeparatorWidth = props => {
  const { width } = props;
  return width ? px2remcss(width) : '75%';
};

const getSeparatorBorderColor = props => {
  const { type, disabled, themeConfig, checked } = props;

  if (disabled) {
    const { disabled: disabledTheme = {} } = themeConfig;
    const { color = get('borderDisableColor') } = disabledTheme;
    return type === 'primary' ? color : get('defaultColor');
  }
  if (checked) {
    const { hover: { color } = {} } = themeConfig;
    return color ? color : type === 'primary' ? get('focusBorder').color : get('defaultColor');
  }
  const { normal: { color: normalColor = get('borderColor') } = {} } = themeConfig;

  if (normalColor) {
    return type === 'primary' ? normalColor : get('defaultColor');
  }

  return type === 'primary' ? get('lightGreyColor') : get('defaultColor');
};

const getSeparatorBorderWidth = props => {
  const { disabled, themeConfig } = props;
  const { disabled: disabledTheme = {} } = themeConfig;
  const { width = 1 } = disabledTheme;
  if (disabled) {
    return px2remcss(width);
  }

  const { normal: { width: normalWidth = 1 } = {} } = themeConfig;

  return px2remcss(normalWidth);
};

const getSeparatorHeight = props => {
  const { checked, themeConfig } = props;
  const { normal: { height } = {} } = themeConfig;
  return checked ? '100%' : height ? px2remcss(height) : '70%';
};

export const SeparatorBorder = StaticComponent({
  tag: 'span',
  className: 'SeparatorBorder',
  css: css`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: ${getSeparatorHeight};
    border-right: ${getSeparatorBorderWidth} solid ${getSeparatorBorderColor};
    z-index: 2;
    transition: all 0.3s;
    width: ${getSeparatorWidth};
    max-width: 90%;
  `,
});
