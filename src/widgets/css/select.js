/**
 * create by szfeng
 *
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';
import get from './theme-common-dict';
import { getThemeDefaultConfigFromSource } from '../utils';
export const MenuItemHeight = 30;
export const DefaultHeight = 250;
export const DefaultWidth = 200;

type SizeThemeConfig = {
  small: { [key: string]: Object },
  default: { [key: string]: any },
  large: { [key: string]: any },
};
type SizeType = 'small' | 'default' | 'large';

const wrapSize = {
  small: '$lugia-dict.@lugia/lugia-web.smallSize',
  default: '$lugia-dict.@lugia/lugia-web.normalSize',
  large: '$lugia-dict.@lugia/lugia-web.largeSize',
};

const textFontSize = {
  small: 12,
  default: 14,
  large: 14,
};

const tagWrapHeight = {
  small: 16,
  default: 18,
  large: 24,
};

const cancelSmallIconSize = {
  small: '$lugia-dict.@lugia/lugia-web.xxsFontSize',
  default: '$lugia-dict.@lugia/lugia-web.xsFontSize',
  large: '$lugia-dict.@lugia/lugia-web.xsFontSize',
};

const switchSmallIconSize = {
  small: '$lugia-dict.@lugia/lugia-web.xsFontSize',
  default: '$lugia-dict.@lugia/lugia-web.sFontSize',
  large: '$lugia-dict.@lugia/lugia-web.sFontSize',
};

const crateInputTagThemeConfig = (type: SizeType) => {
  return {
    InputTagWrap: {
      normal: {
        height: wrapSize[type],
      },
    },
    TextContent: {
      normal: {
        fontSize: textFontSize[type],
      },
    },
    Placeholder: {
      normal: {
        fontSize: textFontSize[type],
      },
    },
    ClearIcon: {
      normal: {
        fontSize: cancelSmallIconSize[type],
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: switchSmallIconSize[type],
      },
    },
    TagWrap: {
      normal: {
        height: tagWrapHeight[type],
      },
      disabled: {
        height: tagWrapHeight[type],
      },
      hover: {
        height: tagWrapHeight[type],
      },
    },
  };
};

export const inputTagThemeDefaultConfig: SizeThemeConfig = {
  small: crateInputTagThemeConfig('small'),
  default: crateInputTagThemeConfig('default'),
  large: crateInputTagThemeConfig('large'),
};

export const getSelectThemeDefaultConfig = (sizeType: SizeType, themeName: string) => {
  return getThemeDefaultConfigFromSource(inputTagThemeDefaultConfig)(sizeType, themeName);
};

export const PopupMenuWrap = CSSComponent({
  tag: 'div',
  className: 'PopupMenuWrap',
  normal: {
    selectNames: [['width'], ['borderRadius'], ['boxShadow'], ['background']],
    defaultTheme: {
      background: {
        color: '#ffffff',
      },
      boxShadow: get('normalBoxShadow'),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
    },
  },
  css: `
  display:inline-block;
  `,
  option: { hover: true },
});
