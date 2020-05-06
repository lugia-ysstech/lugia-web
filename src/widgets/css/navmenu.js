import { px2remcss } from './units';
import get from './theme-common-dict';
import { getBorderRadius } from '../theme/CSSProvider';
import changeColor from './utilsColor';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const navLightBackgroundColor = '$lugia-dict.@lugia/lugia-web.navLightBackgroundColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const navBackgroundColor = '$lugia-dict.@lugia/lugia-web.navBackgroundColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const padding = '$lugia-dict.@lugia/lugia-web.padding';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const transparency30 = 30;
const transparency70 = 70;

// mode : horizontal
// 水平导航菜单默认样式
// themeStyle: light
export const HorizontalLightTheme = {
  TitleContainer: {
    normal: {
      background: {
        color: navLightBackgroundColor,
      },
    },
  },
  BorderStyle: {
    normal: {
      background: {
        color: get('superLightColor'),
      },
    },
  },
  TabHeader: {
    SelectTabPan: {
      normal: {
        color: themeColor,
        font: { size: 14 },
      },
    },
    DefaultTabPan: {
      normal: {
        font: { size: 14 },
        height: 60,
        color: blackColor,
      },
      hover: {
        color: themeColor,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SelectLine: {
      normal: {
        background: { color: get('themeColor') },
        height: 4,
      },
    },
    PrefixIcon: {
      normal: {
        font: {
          size: sFontSize,
        },
        color: blackColor,
      },
      hover: {
        color: themeColor,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SelectPrefixIcon: {
      normal: {
        font: {
          size: sFontSize,
        },
        color: themeColor,
      },
    },
    SuffixIcon: {
      normal: {
        color: mediumGreyColor,
        font: {
          size: xsFontSize,
        },
      },
      hover: {
        color: themeColor,
      },
      disabled: {
        color: disableTextColor,
      },
    },
    SelectSuffixIcon: {
      normal: {
        color: themeColor,
        font: {
          size: xsFontSize,
        },
      },
    },
  },
};

// themeStyle: dark

export const HorizontalDarkTheme = {
  TitleContainer: {
    normal: {
      background: {
        color: navBackgroundColor,
      },
    },
  },
  BorderStyle: {
    normal: {
      background: {
        color: get('navBackgroundColor'),
      },
    },
  },
  TabHeader: {
    SelectTabPan: {
      normal: {
        color: themeColor,
      },
    },
    DefaultTabPan: {
      normal: {
        height: 60,
        font: {
          size: 14,
        },
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        background: {
          color: navBackgroundColor,
        },
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
      hover: {
        color: defaultColor,
      },
    },
    SelectLine: {
      normal: {
        background: { color: get('themeColor') },
        height: 4,
      },
    },
    PrefixIcon: {
      normal: {
        font: {
          size: sFontSize,
        },
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SelectPrefixIcon: {
      normal: {
        font: {
          size: sFontSize,
        },
        color: themeColor,
      },
    },
    SuffixIcon: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        font: {
          size: xsFontSize,
        },
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SelectSuffixIcon: {
      normal: {
        color: themeColor,
        font: {
          size: xsFontSize,
        },
      },
    },
  },
};

export const LightTabsMenuTheme = {
  Container: {
    normal: {
      background: {
        color: '#fff',
      },
      borderRadius: getBorderRadius(get('borderRadiusValue')),
    },
  },
  MenuItem: {
    MenuItemWrap: {
      hover: {
        background: {
          color: 'none',
        },
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        width: 200,
      },
    },
    MenuItem: {
      MenuItemWrap: {
        hover: {
          background: {
            color: 'none',
          },
        },
      },
    },
  },
};

// themeStyle: dark

export const DarkTabsMenuTheme = {
  Container: {
    normal: {
      background: {
        color: navBackgroundColor,
      },
      borderRadius: getBorderRadius(get('borderRadiusValue')),
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
        background: {
          color: navBackgroundColor,
        },
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: defaultColor,
      },
    },
    Text: {
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    PrefixIcon: {
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SuffixIcon: {
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SwitchIcon: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        width: 200,
        background: {
          color: navBackgroundColor,
        },
        borderRadius: getBorderRadius(get('borderRadiusValue')),
      },
    },
    MenuItem: {
      MenuItemWrap: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, 50).rgba,
        },
        hover: {
          color: defaultColor,
          background: {
            color: navBackgroundColor,
          },
        },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
      SelectedMenuItemWrap: {
        normal: {
          color: defaultColor,
        },
      },
      Text: {
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },

      PrefixIcon: {
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
      SuffixIcon: {
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
      SwitchIcon: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        },
        hover: {
          color: defaultColor,
        },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
    },
  },
};

// mode : inline
// 内嵌导航菜单默认样式
// themeStyle: light
export const PrimaryLightTheme = {
  TreeItem: {
    TreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
    },
    Text: {
      normal: { color: blackColor, fontSize: 14 },
      hover: { color: themeColor, fontSize: 14 },
      disabled: { color: disableTextColor, fontSize: 14 },
    },
    SelectedText: {
      normal: { color: themeColor, font: { size: 14 } },
      disabled: { color: disableTextColor, fontSize: 14 },
    },
    SelectedParentText: {
      normal: {
        color: themeColor,
        font: { size: 14 },
      },
    },
    SubTreeWrap: {
      normal: {
        background: {
          color: changeColor(get('themeColor'), 0, 0, 5).rgba,
        },
      },
    },
    SwitchIcon: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
    },
    SelectedParentSwitchIcon: {
      normal: {
        color: themeColor,
      },
    },
    SwitchIconExpanded: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
    },
    SelectedParentSwitchIconExpanded: {
      normal: {
        color: themeColor,
      },
    },
  },
  Container: {
    normal: {
      background: {
        color: navLightBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
};

export const EllipseLightTheme = {
  TreeItem: {
    TreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
    },
    Text: {
      normal: { color: blackColor, fontSize: 14 },
      hover: { color: themeColor, fontSize: 14 },
      disabled: { color: disableTextColor, fontSize: 14 },
    },
    SelectedText: {
      normal: {
        color: defaultColor,
        font: { size: 14 },
        background: {
          image: `linear-gradient(to right, ${get('themeColor')}, ${get('themeHoverColor')})`,
        },
        borderRadius: getBorderRadius(get('borderRadiusValue')),
      },
      disabled: { color: disableTextColor, fontSize: 14 },
    },
    SelectedParentText: {
      normal: {
        color: themeColor,
        font: { size: 14 },
        background: {
          image: 'none',
        },
        borderRadius: getBorderRadius(0),
      },
    },
    SwitchIcon: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
    },
    SelectedParentSwitchIcon: {
      normal: {
        color: themeColor,
      },
    },
    SwitchIconExpanded: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
    },
    SelectedParentSwitchIconExpanded: {
      normal: {
        color: themeColor,
      },
    },
  },
  Container: {
    normal: {
      background: {
        color: navLightBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
};

// themeStyle: dark
export const PrimaryDarkTheme = {
  Container: {
    normal: {
      background: {
        color: navBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
  TreeItem: {
    TreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
    },
    Text: {
      normal: { color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba, fontSize: 14 },
      hover: { color: defaultColor, fontSize: 14 },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        fontSize: 14,
      },
    },
    SelectedText: {
      normal: { color: themeColor, font: { size: 14 } },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        fontSize: 14,
      },
    },
    SelectedParentText: {
      normal: {
        color: defaultColor,
        font: { size: 14 },
      },
    },
    SubTreeWrap: {
      normal: {
        background: {
          color: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    SwitchIcon: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SelectedParentSwitchIcon: {
      normal: {
        color: defaultColor,
      },
    },
    SwitchIconExpanded: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SelectedParentSwitchIconExpanded: {
      normal: {
        color: defaultColor,
      },
    },
  },
};

export const EllipseDarkTheme = {
  Container: {
    normal: {
      background: {
        color: navBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
  TreeItem: {
    TreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: padding,
          right: padding,
        },
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
    },
    Text: {
      normal: { color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba, fontSize: 14 },
      hover: { color: themeColor, fontSize: 14 },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        fontSize: 14,
      },
    },
    SelectedText: {
      normal: {
        color: defaultColor,
        font: { size: 14 },
        background: {
          image: `linear-gradient(to right, ${get('themeColor')}, ${get('themeHoverColor')})`,
        },
        borderRadius: getBorderRadius(get('borderRadiusValue')),
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        fontSize: 14,
      },
    },
    SelectedParentText: {
      normal: {
        color: defaultColor,
        font: { size: 14 },
        background: {
          image: 'none',
        },
        borderRadius: getBorderRadius(0),
      },
    },
    SwitchIcon: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
      disabled: { color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba },
    },
    SelectedParentSwitchIcon: {
      normal: {
        color: defaultColor,
      },
      hover: {
        color: defaultColor,
      },
      disabled: { color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba },
    },
    SwitchIconExpanded: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
      disabled: { color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba },
    },
    SelectedParentSwitchIconExpanded: {
      normal: {
        color: defaultColor,
      },
      hover: {
        color: defaultColor,
      },
      disabled: { color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba },
    },
  },
};

// mode : vertical
// 垂直菜单默认样式

// themeStyle: light
export const LightMenuTheme = {
  Container: {
    normal: {
      background: {
        color: navLightBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
      hover: {
        background: {
          color: 'none',
        },
        border: {
          right: { color: get('superLightColor'), width: 1, style: 'solid' },
        },
      },
    },
    PrefixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
    },
    SuffixIcon: {
      normal: {
        fontSize: sFontSize,
      },
      hover: {
        fontSize: sFontSize,
      },
    },
    SwitchIcon: {
      normal: {
        color: mediumGreyColor,
      },
      hover: {
        color: themeColor,
      },
      disabled: {
        color: disableTextColor,
      },
    },
  },
  SubMenu: {
    MenuItem: {
      MenuItemWrap: {
        hover: {
          background: {
            color: 'none',
          },
        },
      },
      SwitchIcon: {
        normal: {
          color: mediumGreyColor,
        },
        hover: {
          color: themeColor,
        },
      },
    },
  },
};

// themeStyle: dark

export const DarkMenuTheme = {
  Container: {
    normal: {
      background: {
        color: navBackgroundColor,
      },
      boxShadow: null,
      borderRadius: getBorderRadius(0),
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
      hover: {
        color: defaultColor,
        background: {
          color: navBackgroundColor,
        },
        border: {
          right: { color: get('navBackgroundColor'), width: 1, style: 'solid' },
        },
      },
    },
    Text: {
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
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
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
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
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: defaultColor,
        background: {
          color: themeColor,
        },
      },
    },
    SwitchIcon: {
      normal: {
        color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
      },
      hover: {
        color: defaultColor,
      },
      disabled: {
        color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        background: {
          color: navBackgroundColor,
        },
      },
    },
    MenuItem: {
      MenuItemWrap: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        },
        hover: {
          color: defaultColor,
          background: {
            color: navBackgroundColor,
          },
        },
      },
      SelectedMenuItemWrap: {
        normal: {
          color: defaultColor,
          background: {
            color: themeColor,
          },
        },
      },
      Text: {
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
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
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
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
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
      SwitchIcon: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
        },
        hover: {
          color: defaultColor,
        },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
        },
      },
    },
  },
};
