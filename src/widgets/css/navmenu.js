import get from './theme-common-dict';
import changeColor from './utilsColor';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';

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
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const superLightColor = '$lugia-dict.@lugia/lugia-web.superLightColor';

const transparency30 = 30;
const transparency70 = 70;

// mode : horizontal
// 水平导航菜单默认样式
// themeStyle: light

export const HorizontalLightTheme = () => {
  return {
    Container: {
      normal: {
        background: {
          color: navLightBackgroundColor,
        },
      },
    },
    TitleContainer: {
      normal: {
        background: {
          color: 'transparent',
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
          font: { size: get('sectionFontSize') },
        },
      },
      DefaultTabPan: {
        normal: {
          font: { size: get('sectionFontSize') },
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
};

// themeStyle: dark

export const HorizontalDarkTheme = () => {
  return {
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
            size: get('sectionFontSize'),
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
};

export const LightTabsMenuTheme = () => {
  return {
    Container: {
      normal: {
        background: {
          color: '#fff',
        },
        width: 200,
        borderRadius: getBorderRadius(borderRadiusValue),
      },
    },
    MenuItem: {
      MenuItemWrap: {
        hover: {
          background: {
            color: 'transparent',
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
              color: 'transparent',
            },
          },
        },
      },
    },
  };
};

// themeStyle: dark

export const DarkTabsMenuTheme = () => {
  return {
    Container: {
      normal: {
        background: {
          color: navBackgroundColor,
        },
        width: 200,
        borderRadius: getBorderRadius(borderRadiusValue),
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
          background: {
            color: navBackgroundColor,
          },
          width: 200,
          borderRadius: getBorderRadius(borderRadiusValue),
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
};
// mode : inline
// 内嵌导航菜单默认样式
// themeStyle: light
export const PrimaryLightTheme = () => {
  return {
    TreeItem: {
      TreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
        },
      },
      SelectedTreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
        },
      },
      Text: {
        normal: { color: blackColor, fontSize: get('sectionFontSize') },
        hover: { color: themeColor, fontSize: get('sectionFontSize') },
        disabled: { color: disableTextColor, fontSize: get('sectionFontSize') },
      },
      SelectedText: {
        normal: { color: themeColor, font: { size: get('sectionFontSize') } },
        disabled: { color: disableTextColor, fontSize: get('sectionFontSize') },
      },
      SelectedParentText: {
        normal: {
          color: themeColor,
          font: { size: get('sectionFontSize') },
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
};

export const EllipseLightTheme = () => {
  return {
    TreeItem: {
      TreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
        },
      },
      SelectedTreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
        },
      },
      Text: {
        normal: { color: blackColor, fontSize: get('sectionFontSize') },
        hover: { color: themeColor, fontSize: get('sectionFontSize') },
        disabled: { color: disableTextColor, fontSize: get('sectionFontSize') },
      },
      SelectedText: {
        normal: {
          color: defaultColor,
          font: { size: get('sectionFontSize') },
          background: {
            color: get('themeColor'),
          },
          borderRadius: getBorderRadius(borderRadiusValue),
        },
        disabled: { color: disableTextColor, fontSize: get('sectionFontSize') },
      },
      SelectedParentText: {
        normal: {
          color: themeColor,
          font: { size: get('sectionFontSize') },
          background: {
            color: 'transparent',
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
};

// themeStyle: dark
export const PrimaryDarkTheme = () => {
  return {
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
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
        },
      },
      SelectedTreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
        },
      },
      Text: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
          fontSize: get('sectionFontSize'),
        },
        hover: { color: defaultColor, fontSize: get('sectionFontSize') },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
          fontSize: get('sectionFontSize'),
        },
      },
      SelectedText: {
        normal: { color: themeColor, font: { size: get('sectionFontSize') } },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
          fontSize: get('sectionFontSize'),
        },
      },
      SelectedParentText: {
        normal: {
          color: defaultColor,
          font: { size: get('sectionFontSize') },
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
};

export const EllipseDarkTheme = () => {
  return {
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
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
        },
      },
      SelectedTreeItemWrap: {
        normal: {
          padding: {
            left: padding,
            right: padding,
          },
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
        },
      },
      Text: {
        normal: {
          color: changeColor(get('defaultColor'), 0, 0, transparency70).rgba,
          fontSize: get('sectionFontSize'),
        },
        hover: { color: themeColor, fontSize: get('sectionFontSize') },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
          fontSize: get('sectionFontSize'),
        },
      },
      SelectedText: {
        normal: {
          color: defaultColor,
          font: { size: get('sectionFontSize') },
          background: {
            color: get('themeColor'),
          },
          borderRadius: getBorderRadius(borderRadiusValue),
        },
        disabled: {
          color: changeColor(get('defaultColor'), 0, 0, transparency30).rgba,
          fontSize: get('sectionFontSize'),
        },
      },
      SelectedParentText: {
        normal: {
          color: defaultColor,
          font: { size: get('sectionFontSize') },
          background: {
            color: 'transparent',
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
};

// mode : vertical
// 垂直菜单默认样式

// themeStyle: light
export const LightMenuTheme = () => {
  return {
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
          border: getBorder(
            { style: 'solid', color: superLightColor, width: 1 },
            { directions: ['r'] }
          ),
        },
        hover: {
          background: {
            color: 'transparent',
          },
          border: getBorder(
            { style: 'solid', color: superLightColor, width: 1 },
            { directions: ['r'] }
          ),
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
              color: 'transparent',
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
};
// themeStyle: dark

export const DarkMenuTheme = () => {
  return {
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
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
        },
        hover: {
          color: defaultColor,
          background: {
            color: navBackgroundColor,
          },
          border: getBorder(
            { style: 'solid', color: navBackgroundColor, width: 1 },
            { directions: ['r'] }
          ),
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
};
