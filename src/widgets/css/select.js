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

const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';

const smallTextFontSize = '12';
const normalTextFontSize = '14';
const largeTextFontSize = '14';

const cancelSmallIconSize = '$lugia-dict.@lugia/lugia-web.xxsFontSize';
const cancelDefaultIconSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const cancelLargeIconSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';

const switchSmallIconSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const switchDefaultIconSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const switchLargeIconSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
type SizeType = 'small' | 'default' | 'large';

export const inputTagThemeDefaultConfig: SizeThemeConfig = {
  small: {
    InputTagWrap: {
      normal: {
        height: smallSize,
      },
    },
    TextContent: {
      normal: {
        fontSize: smallTextFontSize,
      },
    },
    Placeholder: {
      normal: {
        fontSize: smallTextFontSize,
      },
    },
    ClearIcon: {
      normal: {
        fontSize: cancelSmallIconSize,
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: switchSmallIconSize,
      },
    },
    TagWrap: {
      normal: {
        height: 16,
      },
      disabled: {
        height: 16,
      },
      hover: {
        height: 16,
      },
    },
  },
  default: {
    InputTagWrap: {
      normal: {
        height: normalSize,
      },
    },
    TextContent: {
      normal: {
        fontSize: normalTextFontSize,
      },
    },
    Placeholder: {
      normal: {
        fontSize: normalTextFontSize,
      },
    },
    ClearIcon: {
      normal: {
        fontSize: cancelDefaultIconSize,
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: switchDefaultIconSize,
      },
    },
    TagWrap: {
      normal: {
        height: 20,
      },
      disabled: {
        height: 20,
      },
      hover: {
        height: 20,
      },
    },
  },
  large: {
    InputTagWrap: {
      normal: {
        height: largeSize,
      },
    },
    TextContent: {
      normal: {
        fontSize: largeTextFontSize,
      },
    },
    Placeholder: {
      normal: {
        fontSize: largeTextFontSize,
      },
    },
    ClearIcon: {
      normal: {
        fontSize: cancelLargeIconSize,
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: switchLargeIconSize,
      },
    },
    TagWrap: {
      normal: {
        height: 24,
      },
      disabled: {
        height: 24,
      },
      hover: {
        height: 24,
      },
    },
  },
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
