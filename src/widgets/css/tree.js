/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import colorsFunc from './stateColor';
import { px2remcss } from './units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';
import get from './theme-common-dict';
import changeColor from './utilsColor';
import { getBorder } from '@lugia/theme-utils';
import { getThemeDefaultConfigFromSource } from '../utils';

export type SizeType = 'small' | 'default' | 'large';

export const { transitionTime } = colorsFunc();

export const TreeItemHeight = 35;
export const DefaultHeight = 250;

type SizeThemeConfig = {
  small: { [key: string]: Object },
  default: { [key: string]: any },
  large: { [key: string]: any },
};

const xxsFontSize = '$lugia-dict.@lugia/lugia-web.xxsFontSize';
const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
const descriptionFontSize = '$lugia-dict.@lugia/lugia-web.descriptionFontSize';
const textFontSize = {
  small: descriptionFontSize,
  default: sectionFontSize,
  large: sectionFontSize,
};
const switchIcon = {
  small: xxsFontSize,
  default: xsFontSize,
  large: xsFontSize,
};

const switchIconExpanded = {
  small: xxsFontSize,
  default: xsFontSize,
  large: xsFontSize,
};

const iconSize = {
  small: xsFontSize,
  default: sFontSize,
  large: sFontSize,
};

const checkBoxSize = {
  small: 14,
  default: 16,
  large: 16,
};

const crateTreeThemeConfig = (type: SizeType) => {
  return {
    Text: {
      normal: {
        fontSize: textFontSize[type],
        color: blackColor,
      },
      hover: {
        fontSize: textFontSize[type],
        color: blackColor,
        background: {
          color: changeColor(get('themeColor'), 0, 0, 5).rgba,
        },
      },
    },
    SelectedText: {
      normal: {
        fontSize: textFontSize[type],
        color: themeColor,
      },
      hover: {
        fontSize: textFontSize[type],
        color: blackColor,
      },
    },
    SwitchIcon: {
      normal: {
        fontSize: switchIcon[type],
        color: mediumGreyColor,
      },
      disabled: {
        fontSize: switchIcon[type],
        color: disableTextColor,
      },
    },
    SwitchIconExpanded: {
      normal: {
        fontSize: switchIconExpanded[type],
        color: mediumGreyColor,
      },
      disabled: {
        fontSize: switchIconExpanded[type],
        color: disableTextColor,
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
    Checkbox: {
      CheckboxText: {
        normal: {
          color: blackColor,
        },
        hover: {
          color: blackColor,
        },
      },
      CheckboxEdgeChecked: {
        normal: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          background: {
            color: themeColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          background: {
            color: disableTextColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
      CheckboxEdgeUnChecked: {
        normal: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
        },
        hover: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          background: {
            color: disableColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
      CheckboxEdgeIndeterminate: {
        normal: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          background: {
            color: themeColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        },
        disabled: {
          height: checkBoxSize[type],
          width: checkBoxSize[type],
          background: {
            color: disableTextColor,
          },
          borderRadius: getBorderRadius(2),
          border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
        },
      },
    },
  };
};

const treeThemeDefaultConfig = () => ({
  small: crateTreeThemeConfig('small'),
  default: crateTreeThemeConfig('default'),
  large: crateTreeThemeConfig('large'),
});

export const getTreeThemeDefaultConfig = (sizeType: SizeType, themeName: string) => {
  return getThemeDefaultConfigFromSource(treeThemeDefaultConfig())(sizeType, themeName);
};

export const getMenuItemHeight = (size: SizeType) => {
  return size === 'large'
    ? get('largeSize')
    : size === 'default'
    ? get('normalSize')
    : get('smallSize');
};

export const CheckBoxContainer = StaticComponent({
  tag: 'div',
  className: 'CheckBoxContainer',
  css: css`
    display: flex;
    height: 100%;
    flex: 1;
    align-items: center;
    padding-left: ${() => px2remcss(get('marginToSameElement'))};
  `,
  option: { hover: true, active: true },
});
CheckBoxContainer.displayName = 'CheckBoxContainer';

export const Switch = StaticComponent({
  tag: 'span',
  className: 'Switch',
  css: css`
    font-size: ${px2remcss(14)};
    color: ${() => get('mediumGreyColor')};
    display: inline-block;
  `,
  option: { hover: true, active: true },
});
Switch.displayName = 'switcherButton';

export const NullSwitch = StaticComponent({
  extend: Switch,
  className: 'NullSwitch',
  css: css`
    opacity: 0;
  `,
});

export const TreeUl = CSSComponent({
  tag: 'ul',
  className: 'TreeUl',
  normal: {
    selectNames: [['width'], ['background'], ['padding', 'left'], ['padding', 'right']],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { top } = propsConfig;
      return `
        top: ${px2remcss(top)}
      `;
    },
  },
  hover: {
    selectNames: [['background']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
    position: relative;
    box-sizing: border-box;
  `,
  option: { hover: true },
});

export const Li = CSSComponent({
  tag: 'li',
  className: 'Li',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { dragState, marginBottom, hasChildren } = {} } = themeProps;
      const dragStateCss = getDragState(dragState);
      const marginValue = hasChildren ? 0 : marginBottom;
      return `${dragStateCss};margin-bottom: ${px2remcss(marginValue)}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    min-height: ${px2remcss(20)};
    list-style: none;
    white-space: nowrap;
    position: relative;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
  `,
});
Li.displayName = 'liItem';

const getSelectIconOpacity = selected => {
  return `opacity: ${selected ? 1 : 0}`;
};

const getLiIcon = (inlineType, itemHeight, selected) => {
  const opacity = getSelectIconOpacity(selected);
  return inlineType === 'ellipse'
    ? ''
    : `
  ::before {
    content: '';
    width: ${px2remcss(4)};
    border-radius: ${px2remcss(2)};
    height: ${px2remcss(itemHeight)};
    background: ${get('themeColor')};
    transition: all ${transitionTime};
    position: absolute;
    left: 0;
    top: 0;
    ${opacity}
  }
  `;
};

const getDragState = dragState => {
  if (dragState === 'dragOverGapTop') {
    return ` ::after {
      content: '';
      width: 100%;
      border-top: 2px dashed ${get('mediumGreyColor')};
      position: absolute;
      left: 0;
      top: 0;
    }`;
  } else if (dragState === 'dragOverGapBottom') {
    return ` ::after {
      content: '';
      width: 100%;
      border-top: 2px dashed  ${get('mediumGreyColor')};
      position: absolute;
      left: 0;
      bottom: 0;
    }`;
  } else if (dragState === 'noDrop') {
    return ` ::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      cursor: not-allowed;
    }`;
  }
  return '';
};
export const NavLi = CSSComponent({
  tag: 'li',
  className: 'NavLi',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const {
        propsConfig: { inlineType, itemHeight, selected, marginBottom, hasChildren } = {},
      } = themeProps;
      const marginValue = hasChildren ? 0 : marginBottom;
      return `margin-bottom: ${px2remcss(marginValue)};`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    list-style: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
  `,
});
NavLi.displayName = 'NavLi';

export const SelectLine = CSSComponent({
  tag: 'div',
  className: 'SelectLine',
  normal: {
    selectNames: [['width'], ['background'], ['height'], ['borderRadius']],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { position } = {} } = themeProps;
      const positionCss = position === 'right' ? 'right:0' : 'left:0';
      return `${positionCss};opacity: 1;`;
    },
  },
  css: css`
    transition: all ${transitionTime};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
  `,
});
SelectLine.displayName = 'SelectLine';

export const SubTreeWrap = CSSComponent({
  tag: 'ul',
  className: 'SubTreeWrap',
  normal: {
    selectNames: [
      ['width'],
      ['background'],
      ['opacity'],
      ['border'],
      ['margin'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { paddingTop } = {} } = themeProps;
      return `padding-top: ${px2remcss(paddingTop)};`;
    },
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['border']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
  `,
  option: { hover: true },
});

export const TitleWrap = CSSComponent({
  tag: 'div',
  className: 'TitleWrap',
  normal: {
    selectNames: [
      ['height'],
      ['lineHeight'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['padding'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],

    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig: { selected, inlineType, __navmenu, shape } = {} } = themeProps;

      const borderRadius = shape === 'round' ? 99999 : borderRadiusValue;
      return __navmenu && selected && inlineType === 'ellipse'
        ? {
            background: {
              color: get('themeColor'),
            },
            borderRadius: getBorderRadius(borderRadius),
          }
        : {
            borderRadius: getBorderRadius(borderRadius),
          };
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  active: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  disabled: {
    selectNames: [
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['padding'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      color: disableTextColor,
      font: {
        fontWeight: 500,
      },
    },
  },

  css: css`
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 100%;
    vertical-align: top;
    padding-left: ${() => px2remcss(get('marginToSameElement'))};
    box-sizing: border-box;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: 0.2s;
    & span {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});

export const TitleSpan = CSSComponent({
  tag: 'div',
  className: 'TitleSpan',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { describe } = propsConfig;
      const color = describe ? get('mediumGreyColor') : '';
      return `color: ${color}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    opacity: 1;
    display: flex;
    flex: 1;
    overflow: hidden;
    align-items: center;
  `,
});

TitleSpan.displayName = 'titleSpan';

const getFlexBoxPaddingLeft = pos => {
  const num = pos.split('-').length - 2;
  return num ? num * 14 : 0;
};

export const FlexWrap = CSSComponent({
  tag: 'div',
  className: 'FlexWrap',
  normal: {
    selectNames: [
      ['background'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['cursor'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { pos, itemHeight, dragState } = themeProps.propsConfig;
      const paddingLeft = getFlexBoxPaddingLeft(pos);
      if (dragState === 'dragOver') {
        return `
         padding-left: ${px2remcss(paddingLeft)};
          height: ${px2remcss(itemHeight)}
          background: ${get('disableColor')};
        `;
      }
      return `
          padding-left: ${px2remcss(paddingLeft)};
          height: ${px2remcss(itemHeight)}
        `;
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  disabled: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity'], ['cursor']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: disableTextColor,
      font: {
        fontWeight: 500,
      },
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
  `,
  option: { hover: true, active: true },
});

export const FlexBox = CSSComponent({
  tag: 'div',
  className: 'FlexBox',
  normal: {
    selectNames: [['padding']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['padding']],
  },
  css: css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding-right: ${() => px2remcss(get('marginToSameElement'))};
  `,
});

export const SuffixWrap = StaticComponent({
  tag: 'div',
  className: 'SuffixWrap',
  css: css`
    position: absolute;
    height: 100%;
    right: ${px2remcss(12)};
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    z-index: 100;
  `,
});

export const Text = StaticComponent({
  tag: 'span',
  className: 'Text',
  css: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
});

export const DragCopyWrap = StaticComponent({
  tag: 'div',
  className: 'DragCopyWrap',
  css: css`
    font-size: ${px2remcss(14)};
    position: fixed;
    text-align: center;
    width: 186px;
    background-color: ${() => get('disableColor')};
    border: 1px dashed ${() => get('lightGreyColor')};
    border-radius: 2px;
    line-height: 28px;
    z-index: 100;
  `,
});
