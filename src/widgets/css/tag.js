/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';
import { FontSize } from '../css';
import { isNumber, toNumber } from '../common/NumberUtils';

export const {
  themeColor,
  mediumGreyColor,
  disableColor,
  dangerColor,
  darkGreyColor,
  borderRadius,
  defaultColor,
  borderDisableColor,
  mouseDownColor,
  lightGreyColor,
} = colorsFunc();

const defaultHeight = 20;

type shapeType = 'basic' | 'round';
type styleType = 'customs' | 'primary' | 'basic' | 'presets' | 'optional';

const getAnimationCSS = (isClose: boolean) => {
  return isClose === true
    ? 'opacity: 0; transform: scale(0,1)'
    : 'opacity: 1; transform: scale(1,1)';
};

const getPadding = (closable: Boolean) => {
  return closable ? `0 ${px2remcss(5)} 0 ${px2remcss(8)}` : ` 0 ${px2remcss(8)}`;
};

const getRadius = (shape: shapeType, height: number) => {
  height = toNumber(height, defaultHeight);
  return shape === 'round' ? `${px2remcss(height)}` : `${px2remcss(borderRadius)}`;
};

const getCustomsCSS = (params: Object) => {
  // 由于边框色默认随着bgColor改变，所以要获取到配置的bgColor
  // 其他type不需要，则直接取默认bgColor
  const defaultBgColor = {
    color: themeColor,
  };
  const { color = '#fff', background = defaultBgColor } = params;
  const { color: bgColor } = background;
  return {
    color,
    background: bgColor,
    border: `1px solid ${bgColor}`,
  };
};

const getPrimaryCSS = (params: Object) => {
  const defaultBgColor = {
    color: '#e8e8e8',
  };
  const { color = darkGreyColor, background = defaultBgColor } = params;
  const { color: bgColor } = background;

  return {
    color,
    background: bgColor,
    border: `1px solid ${bgColor}`,
  };
};

const getBasicCSS = (params: Object) => {
  const { color = darkGreyColor, background = '' } = params;
  return {
    color,
    background,
    border: '1px solid #cccccc',
  };
};

const getPresetsCSS = (params: Object) => {
  const { color = dangerColor } = params;
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

const getLineHeight = (height: number) => {
  return toNumber(height, defaultHeight);
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
  const hoverbgColor = getHoverBgColorFromNormalOrHover(params, disableColor);
  const hoverCSS = {
    background: hoverbgColor,
  };
  return isHasBorder(params, hoverCSS, hoverbgColor);
};
const getBasicHoverCSS = (params: Object) => {
  const { hover } = params;
  const { color: hoverColor } = hover;
  const color = hoverColor ? hoverColor : themeColor;
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
  const color = normalColor ? normalColor : dangerColor;

  if (hoverColor) {
    hoverCSS.color = hoverColor;
  } else {
    hoverCSS.color = colorsFunc(color).hoverColor;
  }

  return isHasBorder(params, hoverCSS, colorsFunc(color).hoverColor);
};

const getCustomsHoverCSS = (params: Object) => {
  const hoverbgColor = colorsFunc(getHoverBgColorFromNormalOrHover(params, themeColor)).hoverColor;
  const hoverCSS = {
    background: hoverbgColor,
  };
  return isHasBorder(params, hoverCSS, hoverbgColor);
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
  className: 'tagContianer',
  normal: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
      ['margin'],
      ['padding'],
    ],
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
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
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
    font-size: ${FontSize};
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
    getCSS: themeMeta => {
      const { height } = themeMeta;
      return `line-height: ${px2remcss(getLineHeight(height))}`;
    },
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
    vertical-align: top;
  `,
});

export const CloseButtonWrap = CSSComponent({
  tag: 'span',
  className: 'CloseButtonWrap',
  normal: {
    selectNames: [['margin']],
    getCSS: themeMeta => {
      const { font = {} } = themeMeta;
      const { size = 16 } = font;
      return `
        width: ${px2remcss(size)}
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    position: relative;
    box-sizing: content-box;
    top: 50%;
    transform: translateY(-45%);
    margin-left: ${px2remcss(5)};
    transition: all 0.3s;
  `,
});

const getOptionalCSS = (checked: Boolean, params: Object) => {
  const defaultBackgroundColor = checked ? themeColor : 'transparent';
  const { color: normalColor, background = {} } = params;
  const color = normalColor ? normalColor : checked ? defaultColor : darkGreyColor;
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
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
      ['margin'],
      ['padding'],
    ],
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
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { color: hoverColor } = themeMeta;
      const { propsConfig } = themeProps;
      const { checked } = propsConfig;
      const color = hoverColor ? hoverColor : checked ? defaultColor : themeColor;
      return `
        color: ${color};
        `;
    },
  },
  active: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
      ['font'],
    ],
    getStyle: (themeMeta, themeProps) => {
      const { color: activeColor, background = {} } = themeMeta;
      const color = activeColor ? activeColor : colorsFunc(themeColor).mouseDownColor;
      const backgroundColor = background.color ? background.color : themeColor;
      return { color, backgroundColor };
    },
  },
  css: css`
    display: inline-block;
    height: ${px2remcss(defaultHeight)};
    border-radius: ${getRadius};
    font-size: ${FontSize};
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    text-align: center;
    vertical-align: top;
    transition: all 0.15s ease-in;
  `,
  option: { hover: true, active: true },
});
