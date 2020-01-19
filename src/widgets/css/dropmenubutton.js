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

export const {
  themeColor,
  disableColor,
  blackColor,
  darkGreyColor,
  lightGreyColor,
  defaultColor,
  hoverColor,
  mouseDownColor,
  borderRadius,
} = colorsFunc();

const DefaultHeight = 32;
const DefaultWidth = 92;

const getHoverBgColorFromNormalOrHover = (params: Object) => {
  const { normal = {}, hover = {} } = params;
  const { background: hoverBg = {} } = hover;

  const { background: normalBg = {} } = normal;

  return hoverBg.color
    ? hoverBg.color
    : normalBg.color
    ? colorsFunc(normalBg.color).hoverColor
    : hoverColor;
};

const getActiveBgColorFromNormalOrActive = (params: Object) => {
  const { normal = {}, active = {} } = params;
  const { background: activeBg = {} } = active;

  const { background: normalBg = {} } = normal;

  return activeBg.color
    ? activeBg.color
    : normalBg.color
    ? colorsFunc(normalBg.color).mouseDownColor
    : mouseDownColor;
};

const getNoDividedCustomsDefaultCSS = themeMeta => {
  const { background = {} } = themeMeta;
  const { color = themeColor } = background;

  return {
    color: '#fff',
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
  const { normal: { color = themeColor } = {} } = param;
  return {
    border: 'none',
    color: colorsFunc(color).hoverColor,
  };
};

const getNoDividedCheckedDefaultCSS = (type, param) => {
  if (type === 'basic') {
    return getNoDividedCheckedDefaultBasicCSS(param);
  }

  return getNoDividedHoverCSS(type, param);
};

const getNoDividedDefaultCSS = (type, themeMeta) => {
  const basicCSS = {
    border: 'none',
    background: 'none',
    color: themeColor,
  };
  const primaryCSS = {
    color: darkGreyColor,
    border: getBorder({
      color: lightGreyColor,
      width: 1,
      style: 'solid',
    }),
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
    : hoverColor;
};

const getColorFromNormalOrActive = params => {
  const { normal = {}, active = {} } = params;

  return active.color
    ? active.color
    : normal.color
    ? colorsFunc(normal.color).mouseDownColor
    : mouseDownColor;
};

const getNoDividedBasicHoverCSS = param => {
  const color = getColorFromNormalOrHover(param, themeColor);
  return {
    color,
  };
};

const getNoDividedBasicActiveCSS = param => {
  const color = getColorFromNormalOrActive(param, themeColor);
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
  const activebgColor = getActiveBgColorFromNormalOrActive(param, themeColor);
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
  const color = getColorFromNormalOrHover(param, themeColor);

  return {
    color,
    border: getBorder({
      color,
      width: 1,
      style: 'solid',
    }),
  };
};

const getNoDividedPrimaryAativeCSS = param => {
  const color = getColorFromNormalOrActive(param, themeColor);

  return {
    color,
    border: getBorder({
      color,
      width: 1,
      style: 'solid',
    }),
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
      color: disableColor,
    };
  } else if (type === 'primary') {
    return {
      color: disableColor,
    };
  }
  const disColor = colorsFunc(themeColor).disabledColor;
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
      const { height = DefaultHeight } = themeMeta;

      const defaultCSS = checked
        ? getNoDividedCheckedDefaultCSS(type, { normal, hover })
        : getNoDividedDefaultCSS(type, themeMeta);
      return {
        lineHeight: px2remcss(height - 2),
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
    height: ${px2remcss(DefaultHeight)};
    width: ${px2remcss(DefaultWidth)};
    border-radius: ${px2remcss(borderRadius)};
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
    text-align: center;
    overflow: hidden;
    padding: 0 ${px2remcss(4)};
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
  const color = hover.color ? hover.color : type === 'primary' ? hoverColor : defaultColor;
  return color;
};

const getDividedActiveCSS = (type, themeConfig = {}) => {
  const { active = {} } = themeConfig;
  const color = active.color ? active.color : type === 'primary' ? mouseDownColor : defaultColor;
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
      ['boxShadow'],
      ['borderRadius'],
    ],
    getThemeMeta: themeMeta => {
      const { height = DefaultHeight } = themeMeta;
      return { lineHeight: px2remcss(height - 2) };
    },
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;
      const { normal: { height = DefaultHeight } = {} } = themeConfig;
      const { disabled, dividedThemeConfig, type } = propsConfig;

      const hoverCSS = `
             &:hover > span { 
             height: ${px2remcss(height)};
              border-color: ${getDividedHoverCSS(type, dividedThemeConfig)}
             }
             
             &:active > span {
               height: ${px2remcss(height)};
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
    height: ${px2remcss(DefaultHeight)};
    width: ${px2remcss(DefaultWidth)};
    border-radius: ${px2remcss(borderRadius)};
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

const getDevidedTextContainerPrimaryDefaultCSS = () => {
  return {
    border: getBorder({
      width: 1,
      style: 'solid',
      color: lightGreyColor,
    }),
    color: darkGreyColor,
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

const getDevidedTextContainerDefaultCSS = (type, themeMeta) => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryDefaultCSS()
    : getDevidedTextContainerCustomsDefaultCSS(themeMeta);
};

const getDevidedTextContainerPrimaryHoverCSS = () => {
  return {
    border: getBorder({
      color: hoverColor,
      style: 'solid',
      width: 1,
    }),
    color: hoverColor,
  };
};

const getDevidedTextContainerCustomsHoverCSS = themeConfig => {
  const hoverbgColor = getHoverBgColorFromNormalOrHover(themeConfig);
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

const getDevidedTextContainerHoverCSS = (type, themeConfig) => {
  return type === 'primary'
    ? getDevidedTextContainerPrimaryHoverCSS()
    : getDevidedTextContainerCustomsHoverCSS(themeConfig);
};

const getDevidedTextContainerPrimaryActiveCSS = () => {
  return {
    border: getBorder({
      color: mouseDownColor,
      style: 'solid',
      width: 1,
    }),
    color: mouseDownColor,
  };
};

const getDevidedTextContainerCustomsActiveCSS = themeConfig => {
  const activebgColor = getActiveBgColorFromNormalOrActive(themeConfig, -themeColor);
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
    border: getBorder({
      color: lightGreyColor,
      style: 'solid',
      width: 1,
    }),
    color: lightGreyColor,
  };
};

const getDevidedTextContainerCustomsDisabledCSS = () => {
  const disColor = colorsFunc(themeColor).disabledColor;
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
        ? getDevidedTextContainerHoverCSS(type, themeConfig)
        : getDevidedTextContainerDefaultCSS(type, themeMeta);
      return {
        ...defaultCSS,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        propsConfig: { borderRadius: { topLeft, bottomLeft } = {} },
      } = themeProps;
      const activeTopLeft = topLeft || topLeft === 0 ? topLeft : borderRadius;
      const activeBottomLeft = bottomLeft || bottomLeft === 0 ? bottomLeft : borderRadius;
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
    display: inline-block;
    width: 75%;
    max-width: 90%;
    height: 100%;

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
        ? getDevidedTextContainerHoverCSS(type, themeConfig)
        : getDevidedTextContainerDefaultCSS(type, themeMeta);
      return {
        ...defaultCSS,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        propsConfig: { borderRadius: { topRight, bottomRight } = {} },
      } = themeProps;
      const activeTopRight = topRight || topRight === 0 ? topRight : borderRadius;
      const activeBottomRight = bottomRight || bottomRight === 0 ? bottomRight : borderRadius;
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
    display: inline-block;
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
    const { color = lightGreyColor } = disabledTheme;
    return type === 'primary' ? color : defaultColor;
  }
  if (checked) {
    const { hover: { color } = {} } = themeConfig;

    return color ? color : type === 'primary' ? hoverColor : defaultColor;
  }
  const { normal: { color: normalColor } = {} } = themeConfig;

  if (normalColor) {
    return normalColor;
  }

  return type === 'primary' ? lightGreyColor : defaultColor;
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
