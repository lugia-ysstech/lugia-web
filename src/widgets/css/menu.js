/**
 *
 * create by szfeng
 *
 * @flow
 */
import type { SizeType } from '../menu/item';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import get from './theme-common-dict';
import { getBorderRadius, getBorder } from '@lugia/theme-utils';
import { getThemeDefaultConfigFromSource } from '../utils';

export const DefaultMenuItemHeight = 36;
export const LargeMenuItemHeight = 60;
export const BiggerMenuItemHeight = 48;
export const MenuItemHeight = 36;
export const DefaultHeight = 250;
export const DefaultWidth = 250;
export const ItemBackgroundColor = '#edf0fe';
export const SelectIcon = '\\e73e';
export const Height = 30;

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';

const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';

const smallCheckboxSize = 14;
const defaultCheckboxSize = 16;
const largeCheckboxSize = 16;

const fontSize = 14;

type SizeThemeConfig = {
  small: { [key: string]: object },
  default: { [key: string]: object },
  large: { [key: string]: object },
};

export const menuThemeDefaultConfig: SizeThemeConfig = {
  small: {
    Text: {
      normal: {
        fontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    PrefixIcon: {
      normal: {
        fontSize: xsFontSize,
      },
      hover: {
        fontSize: xsFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SuffixIcon: {
      normal: {
        fontSize: xsFontSize,
      },
      hover: {
        fontSize: xsFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    Checkbox: {
      CheckboxText: {
        normal: {
          fontSize: 12,
          color: blackColor,
        },
        hover: {
          fontSize: 12,
          color: themeColor,
        },
        disabled: {
          color: disableTextColor,
        },
      },
      CheckboxEdgeChecked: {
        normal: {
          width: smallCheckboxSize,
          height: smallCheckboxSize,
          background: {
            color: themeColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: smallCheckboxSize,
          height: smallCheckboxSize,
          background: {
            color: disableTextColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
      CheckboxEdgeUnChecked: {
        normal: {
          width: smallCheckboxSize,
          height: smallCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
        },
        hover: {
          width: smallCheckboxSize,
          height: smallCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: smallCheckboxSize,
          height: smallCheckboxSize,
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
    },
  },
  default: {
    Text: {
      normal: {
        fontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    PrefixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SuffixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    Checkbox: {
      CheckboxText: {
        normal: {
          fontSize: 12,
          color: blackColor,
        },
        hover: {
          fontSize: 12,
          color: themeColor,
        },
        disabled: {
          color: disableTextColor,
        },
      },
      CheckboxEdgeChecked: {
        normal: {
          width: defaultCheckboxSize,
          height: defaultCheckboxSize,
          background: {
            color: themeColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: defaultCheckboxSize,
          height: defaultCheckboxSize,
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
      CheckboxEdgeUnChecked: {
        normal: {
          width: defaultCheckboxSize,
          height: defaultCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
        },
        hover: {
          width: defaultCheckboxSize,
          height: defaultCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: defaultCheckboxSize,
          height: defaultCheckboxSize,
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
    },
  },
  large: {
    Text: {
      normal: {
        fontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    PrefixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SuffixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    Checkbox: {
      CheckboxText: {
        normal: {
          fontSize: 12,
          color: blackColor,
        },
        hover: {
          fontSize: 12,
          color: themeColor,
        },
        disabled: {
          color: disableTextColor,
        },
      },
      CheckboxEdgeChecked: {
        normal: {
          width: largeCheckboxSize,
          height: largeCheckboxSize,
          background: {
            color: themeColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: largeCheckboxSize,
          height: largeCheckboxSize,
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
      CheckboxEdgeUnChecked: {
        normal: {
          width: largeCheckboxSize,
          height: largeCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
        },
        hover: {
          width: largeCheckboxSize,
          height: largeCheckboxSize,
          background: {
            color: defaultColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          width: largeCheckboxSize,
          height: largeCheckboxSize,
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
    },
  },
};

export const getMenuThemeDefaultConfig = (sizeType: SizeType, themeName: string) => {
  return getThemeDefaultConfigFromSource(menuThemeDefaultConfig)(sizeType, themeName);
};

export const getMenuItemHeight = (size: SizeType) => {
  return size === 'large'
    ? LargeMenuItemHeight
    : size === 'default'
    ? BiggerMenuItemHeight
    : DefaultMenuItemHeight;
};

export const SwitchIconContainer = StaticComponent({
  tag: 'span',
  className: 'SwitchIconContainer',
  css: css`
    position: absolute;
    right: ${px2remcss(12)};
    top: 50%;
    transform: translateY(-50%);
  `,
});

export const MenuContainer = CSSComponent({
  tag: 'ul',
  className: 'MenuContainer',
  normal: {
    selectNames: [['width'], ['background'], ['padding']],
    getCSS: (themeMeta, themeProps) => {
      const { menuItemHeight, length, autoHeight, defaultHeight } = themeProps.propsConfig;
      let { height: themeHeight } = themeMeta;
      themeHeight = !themeHeight && themeHeight !== 0 ? defaultHeight : themeHeight;
      const height = autoHeight ? menuItemHeight * length : themeHeight;
      return `height: ${px2remcss(height)};
      `;
    },
    defaultTheme: {
      background: {
        color: '#fff',
      },
      width: DefaultWidth,
    },
  },
  hover: {
    selectNames: [['background']],
  },
  css: css`
    outline: none;
    margin: 0;
    user-select: none;
    padding-left: 0;
    list-style: none;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});
MenuContainer.displayName = 'MenuContainer';

const getIcon = checkedCSS => {
  return `
    ${
      checkedCSS !== 'mark'
        ? ''
        : `
    &::after {
      font-family: "sviconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
      color: transparent;
      display: inline-block;
      transform: scale(.83333333) rotate(0deg);
      zoom: 1;
      transition: all .2s ease;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${px2remcss(12)};
      font-weight: 700;
      font-size: ${px2remcss(16)};
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    `
    }
  `;
};

export const ItemWrap = CSSComponent({
  tag: 'li',
  className: 'ItemWrap',
  normal: {
    selectNames: [
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['padding'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
      ['margin', 'bottom'],
    ],
    defaultTheme: {
      cursor: 'pointer',
    },
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { menuItemHeight } = {} } = themeProps;

      return `
        height: ${px2remcss(menuItemHeight)};
        `;
    },
  },
  hover: {
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
  },
  disabled: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['borderRadius'],
      ['padding'],
      ['fontSize'],
      ['background'],
      ['opacity'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      color: lightGreyColor,
      font: {
        fontWeight: 500,
      },
    },
  },
  css: css`
    box-sizing: border-box;
    position: relative;
    font-weight: 100;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: background-color, border, borderRadius, opacity, boxShadow;
    transition-duration: 0.3s;
    font-size: ${px2remcss(14)};
    display: flex;
    flex-direction: column;

    & > i {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});
ItemWrap.displayName = 'ItemWrap';

export const DividerWrap = CSSComponent({
  tag: 'div',
  className: 'DividerWrap',
  normal: {
    selectNames: [['background']],
  },
  css: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #666;
    height: ${px2remcss(1)};
  `,
});

export const TextContainer = CSSComponent({
  tag: 'div',
  className: 'TextContainer',
  normal: {
    selectNames: [['padding'], ['lineHeight']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    padding: ${px2remcss(0)} ${px2remcss(get('padding'))};
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    & i {
      vertical-align: middle;
    }
  `,
});

export const DesContainer = CSSComponent({
  tag: 'div',
  className: 'DesContainer',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['padding'], ['lineHeight']],
    getCSS(themeMeta, themeConfig) {
      const {
        propsConfig: { isCheckbox },
      } = themeConfig;
      return `
      padding-left: ${isCheckbox ? px2remcss(36) : px2remcss(get('padding'))};
      `;
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  active: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  css: css`
    overflow: hidden;
    padding-left: ${px2remcss(get('padding'))};
    box-sizing: border-box;
    flex: 1;
    color: ${get('mediumGreyColor')};
    display: flex;
    align-items: center;
    font-size: ${px2remcss(12)};
    transition: all 0.3s;
    font-weight: 500;
  `,
  option: { hover: true, active: true, disabled: true },
});

export const Text = CSSComponent({
  tag: 'span',
  className: 'Text',
  normal: {
    selectNames: [['font'], ['fontSize']],
  },
  hover: {
    selectNames: [['font'], ['fontSize']],
  },
  css: css`
    transition: all 0.3s;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  `,
  option: { hover: true, active: true },
});

export const SuffixElementWrap = StaticComponent({
  tag: 'div',
  className: 'SuffixElementWrap',
  css: css`
    transition: all 0.3s;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  `,
});
