/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';
import { toNumber } from '../common/NumberUtils';
import get from '../css/theme-common-dict';

const defaultHeight = 20;
export function getPublicColor() {
  return {
    themeColor: get('themeColor'),
    disableColor: get('disableColor'),
    dangerColor: get('dangerColor'),
    dangerHoverColor: get('dangerHoverColor'),
    themeHoverColor: get('themeHoverColor'),
    darkGreyColor: get('darkGreyColor'),
    borderRadiusValue: get('borderRadiusValue'),
    defaultColor: get('defaultColor'),
    blackColor: get('blackColor'),
  };
}
export const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
export const fontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const descriptionFontSize = '$lugia-dict.@lugia/lugia-web.descriptionFontSize';
export const paddingToText = '$lugia-dict.@lugia/lugia-web.paddingToText';

type shapeType = 'basic' | 'round';
type styleType = 'customs' | 'primary' | 'basic' | 'presets' | 'optional';

const getAnimationCSS = (isClose: boolean) => {
  return isClose === true
    ? 'opacity: 0; transform: scale(0,1)'
    : 'opacity: 1; transform: scale(1,1)';
};

const getPadding = (closable: Boolean) => {
  return closable ? `0 ${px2remcss(8)} 0 ${px2remcss(8)}` : ` 0 ${px2remcss(8)}`;
};

const getRadius = (shape: shapeType, height: number) => {
  height = toNumber(height, defaultHeight);
  return shape === 'round'
    ? `${px2remcss(height)}`
    : `${px2remcss(getPublicColor().borderRadiusValue)}`;
};

const getCustomsCSS = (params: Object) => {
  // 由于边框色默认随着bgColor改变，所以要获取到配置的bgColor
  // 其他type不需要，则直接取默认bgColor
  const defaultBgColor = {
    color: getPublicColor().themeColor,
  };
  const { color = getPublicColor().defaultColor, background = defaultBgColor } = params;
  const { color: bgColor } = background;
  return {
    color,
    background: bgColor,
    border: `1px solid ${bgColor}`,
  };
};

const getPrimaryCSS = (params: Object) => {
  const defaultBgColor = {
    color: get('superLightColor'),
  };
  const { color = getPublicColor().darkGreyColor, background = defaultBgColor } = params;
  const { color: bgColor } = background;
  return {
    color,
    background: bgColor,
    border: `1px solid ${bgColor}`,
  };
};

const getBasicCSS = (params: Object) => {
  const { color = getPublicColor().darkGreyColor, background = '' } = params;
  const { width, style, color: borderColor } = get('normalBorder');
  return {
    color,
    background,
    border: `${width}px ${style} ${borderColor}`,
  };
};

const getPresetsCSS = (params: Object) => {
  const { color = getPublicColor().dangerColor } = params;
  const defaultBgColor = colorsFunc(color).spiritColor;
  const { background = defaultBgColor } = params;

  return {
    color,
    background,
    border: `1px solid ${color}`,
  };
};

const getDefaultCSS = (type: styleType, params: Object) => {
  return type === 'primary'
    ? getPrimaryCSS(params)
    : type === 'basic'
    ? getBasicCSS(params)
    : type === 'presets'
    ? getPresetsCSS(params)
    : getCustomsCSS(params);
};

const getHoverBgColorFromNormalOrHover = (params: Object, defaultBgColor: string) => {
  const { normal, hover } = params;
  const { background: hoverBg = {} } = hover;

  const { background: normalBg = {} } = normal;
  return hoverBg.color ? hoverBg.color : normalBg.color ? normalBg.color : defaultBgColor;
};

const isHasBorder = (params: Object, obj: Object, defaultBorderColor: string) => {
  const { normal, hover } = params;
  const { border: hoverBorder } = hover;
  const { border: normalBorder } = normal;
  const target = { ...obj };
  // 如果有hoverBorder，返回undefined，配置项中的hoverBorder会生效
  // 如果没有配置hoverBorder，取的是配置项中的 normalBorder
  // 如果没有配置hoverBorder 和 normalBorder，才会自动生成 默认的border
  if (hoverBorder) {
    target.border = undefined;
  }
  if (!hoverBorder && !normalBorder) {
    target.border = `1px solid ${defaultBorderColor}`;
  }
  return target;
};

const getPrimaryHoverCSS = (params: Object) => {
  const hoverBgColor = getHoverBgColorFromNormalOrHover(params, getPublicColor().disableColor);
  const hoverCSS = {
    background: hoverBgColor,
  };
  return isHasBorder(params, hoverCSS, hoverBgColor);
};
const getBasicHoverCSS = (params: Object) => {
  const { hover } = params;
  const { color: hoverColor } = hover;
  const color = hoverColor ? hoverColor : getPublicColor().themeColor;
  const hoverCSS = {
    color,
  };
  return isHasBorder(params, hoverCSS, color);
};
const getPresetsHoverCSS = (params: Object) => {
  const { normal = {}, hover = {} } = params;
  const { color: normalColor } = normal;
  const { color: hoverColor } = hover;
  const hoverCSS = {};
  const color = normalColor ? normalColor : getPublicColor().dangerHoverColor;

  if (hoverColor) {
    hoverCSS.color = hoverColor;
  } else {
    hoverCSS.color = colorsFunc(color).hoverColor;
  }

  return isHasBorder(params, hoverCSS, colorsFunc(color).hoverColor);
};

const getCustomsHoverCSS = (params: Object) => {
  const hoverBgColor = getHoverBgColorFromNormalOrHover(params, getPublicColor().themeHoverColor);
  const hoverCSS = {
    background: hoverBgColor,
  };
  return isHasBorder(params, hoverCSS, hoverBgColor);
};

const getHoverCSS = (type: styleType, params: Object) => {
  return type === 'primary'
    ? getPrimaryHoverCSS(params)
    : type === 'basic'
    ? getBasicHoverCSS(params)
    : type === 'presets'
    ? getPresetsHoverCSS(params)
    : getCustomsHoverCSS(params);
};

export const TagWrap = CSSComponent({
  tag: 'div',
  className: 'tagContainer',
  normal: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['opacity'],
      ['margin'],
      ['padding'],
      ['cursor'],
      ['font'],
      ['color'],
      ['fontSize'],
    ],
    getThemeMeta() {
      return {
        fontSize: descriptionFontSize,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const { height, color: themeColor, background: themeBgColor } = themeMeta;
      const { propsConfig } = themeProps;
      const { shape, type, closable, isClose } = propsConfig;
      const radius = getRadius(shape, height);

      const { color, background, border } = getDefaultCSS(type, {
        color: themeColor,
        background: themeBgColor,
      });
      const padding = getPadding(closable);
      const closeCSS = getAnimationCSS(isClose);

      return `
          border-radius: ${radius};
          color: ${color};
          background: ${background};
          border: ${border};
          padding: ${padding};
          ${closeCSS}
        `;
    },
  },
  hover: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
      ['color'],
      ['fontSize'],
    ],
    getStyle: (themeMeta, themeProps) => {
      const { themeConfig, propsConfig } = themeProps;
      const { normal = {}, hover = {} } = themeConfig;
      const { type } = propsConfig;
      const hoverCSS = getHoverCSS(type, {
        normal,
        hover,
      });
      return {
        ...hoverCSS,
      };
    },
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    height: ${px2remcss(defaultHeight)};
    border-radius: ${getRadius};
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    text-align: center;
    vertical-align: top;
    transition: all 0.15s ease-in;
  `,
  option: { hover: true, active: true },
});

export const ItemText = CSSComponent({
  tag: 'span',
  className: 'ItemText',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    vertical-align: middle;
    vertical-align: top;
  `,
});

const getOptionalCSS = (checked: Boolean, params: Object) => {
  const defaultBackgroundColor = checked ? getPublicColor().themeColor : 'transparent';
  const { color: normalColor, background = {} } = params;
  const color = normalColor
    ? normalColor
    : checked
    ? getPublicColor().defaultColor
    : getPublicColor().blackColor;
  const backgroundColor = background.color ? background.color : defaultBackgroundColor;
  return {
    color,
    background: backgroundColor,
    border: '1px solid transparent',
  };
};

export const OptionalWrap = CSSComponent({
  tag: 'div',
  className: 'OptionalWrap',
  normal: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['opacity'],
      ['margin'],
      ['padding'],
      ['cursor'],
      ['font'],
      ['color'],
      ['fontSize'],
    ],
    getThemeMeta() {
      return {
        fontSize: descriptionFontSize,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        height,
        color: themeColor,
        background: themeBgColor,
        border: themeBorder,
      } = themeMeta;
      const { propsConfig } = themeProps;
      const { shape, closable, checked } = propsConfig;
      const radius = getRadius(shape, height);
      const { color, background, border } = getOptionalCSS(checked, {
        color: themeColor,
        background: themeBgColor,
        border: themeBorder,
      });
      const padding = getPadding(closable);
      return `
          border-radius: ${radius};
          color: ${color};
          background: ${background};
          border: ${border};
          padding: ${padding};
        `;
    },
  },
  hover: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
      ['color'],
      ['fontSize'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { color: hoverColor } = themeMeta;
      const { propsConfig } = themeProps;
      const { checked } = propsConfig;
      const color = hoverColor
        ? hoverColor
        : checked
        ? getPublicColor().defaultColor
        : getPublicColor().themeColor;
      return `
        color: ${color};
        `;
    },
  },
  active: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
      ['color'],
      ['fontSize'],
    ],
    getStyle: (themeMeta, themeProps) => {
      const { color: activeColor } = themeMeta;
      const color = activeColor ? activeColor : themeActiveColor;
      return { color };
    },
  },
  css: css`
    display: inline-block;
    height: ${px2remcss(defaultHeight)};
    border-radius: ${getRadius};
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    text-align: center;
    vertical-align: top;
    transition: all 0.15s ease-in;
  `,
  option: { hover: true, active: true },
});

export const FlexBox = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  `,
});
