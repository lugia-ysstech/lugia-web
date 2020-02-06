import colorsFunc from './stateColor';
export const { themeColor } = colorsFunc();

// mode : horizontal
// 水平导航菜单默认样式
// themeStyle: light
export const HorizontalLightTheme = {
  TitleContainer: {},
  TabHeader: {
    SelectTabPan: {
      normal: {
        color: themeColor,
      },
    },
    DefaultTabPan: {
      normal: {
        height: 60,
      },
    },
  },
};

// themeStyle: dark

export const HorizontalDarkTheme = {
  TitleContainer: {},
  TabHeader: {
    SelectTabPan: {
      normal: {
        color: themeColor,
      },
    },
    DefaultTabPan: {
      normal: {
        height: 60,
        color: '#fff',
        background: {
          color: '#000033',
        },
        font: {
          weight: 900,
        },
      },
    },
  },
};

export const LightTabsMenuTheme = {
  Container: {
    normal: {
      background: {
        color: '',
      },
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        height: 40,
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: themeColor,
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        width: 200,
      },
    },
  },
};

// themeStyle: dark

export const DarkTabsMenuTheme = {
  Container: {
    normal: {
      background: {
        color: 'rgba(0, 0, 51, 0.7)',
      },
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        height: 40,
        color: '#fff',
      },
      hover: {
        color: '#fff',
        background: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: themeColor,
      },
      hover: {
        color: '#fff',
        background: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        width: 200,
        background: {
          color: 'rgba(0, 0, 51, 0.7)',
        },
      },
    },
    MenuItem: {
      MenuItemWrap: {
        normal: {
          height: 40,
          color: '#fff',
        },
        hover: {
          color: '#fff',
          background: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
      SelectedMenuItemWrap: {
        normal: {
          color: themeColor,
        },
        hover: {
          color: '#fff',
          background: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
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
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    Text: {
      normal: { height: 32 },
      hover: { background: { color: '' }, color: themeColor },
      active: { background: { color: '' }, color: themeColor },
      disabled: {},
    },
    SelectedText: {
      normal: { color: themeColor, font: { weight: 900 } },
      hover: { background: { color: '' }, color: themeColor },
      active: { background: { color: '' }, color: themeColor },
      disabled: {},
    },
    SubTreeWrap: {
      normal: {
        background: {
          color: '#edf0fe',
        },
      },
    },
  },
};

export const EllipseLightTheme = {
  Container: {},
  TreeItem: {
    TreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    Text: {
      normal: {
        height: 32,
      },
      hover: {
        background: { color: '' },
        color: themeColor,
      },
      active: {
        background: { color: '' },
      },
      disabled: {},
    },
    SelectedText: {
      normal: {
        height: 32,
        color: '#fff',
      },
      hover: {},
      active: { background: { color: '' } },
      disabled: {},
    },
  },
};

// themeStyle: dark
export const PrimaryDarkTheme = {
  Container: {
    normal: {
      background: {
        color: 'rgba(0, 0, 51, 0.7)',
      },
    },
  },
  TreeItem: {
    TreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    Text: {
      normal: { height: 32, color: '#fff' },
      hover: { background: { color: '' }, color: themeColor },
      active: { background: { color: '' }, color: themeColor },
      disabled: {},
    },
    SelectedText: {
      normal: { color: themeColor, font: { weight: 900 } },
      hover: { background: { color: '' }, color: themeColor },
      active: { background: { color: '' }, color: themeColor },
      disabled: {},
    },
    SubTreeWrap: {
      normal: {
        background: {
          color: '#000033',
        },
      },
    },
  },
};

export const EllipseDarkTheme = {
  Container: {
    normal: {
      background: {
        color: 'rgba(0, 0, 51, 0.7)',
      },
    },
  },
  TreeItem: {
    TreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 10,
          right: 10,
        },
      },
    },
    Text: {
      normal: { height: 32, color: '#fff' },
      hover: { background: { color: '' }, color: themeColor },
      active: { background: { color: '' }, color: themeColor },
      disabled: {},
    },
    SelectedText: {
      normal: { height: 32, color: '#fff' },
      hover: { background: { color: '' } },
      active: { background: { color: '' } },
      disabled: {},
    },
    SubTreeWrap: {
      normal: {
        background: {
          color: '#000033',
        },
      },
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
        color: '',
      },
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        height: 60,
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: themeColor,
      },
    },
  },
};

// themeStyle: dark

export const DarkMenuTheme = {
  Container: {
    normal: {
      background: {
        color: 'rgba(0, 0, 51, 0.7)',
      },
    },
  },
  MenuItem: {
    MenuItemWrap: {
      normal: {
        height: 60,
        color: '#fff',
      },
      hover: {
        color: '#fff',
        background: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    SelectedMenuItemWrap: {
      normal: {
        color: themeColor,
      },
      hover: {
        color: '#fff',
        background: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },
  SubMenu: {
    Container: {
      normal: {
        background: {
          color: 'rgba(0, 0, 51, 0.7)',
        },
      },
    },
    MenuItem: {
      MenuItemWrap: {
        normal: {
          height: 40,
          color: '#fff',
        },
        hover: {
          color: '#fff',
          background: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
      SelectedMenuItemWrap: {
        normal: {
          color: themeColor,
        },
        hover: {
          color: '#fff',
          background: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  },
};
