import colorsFunc from './stateColor';
export const { themeColor } = colorsFunc();

// mode : inline
// 内嵌导航菜单默认样式
// themeStyle: light
export const PrimaryLightTheme = {
  TreeItem: {
    TreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 20,
          right: 20,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 20,
          right: 20,
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
  TreeWrap: {},
  TreeItem: {
    TreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 20,
          right: 20,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        padding: {
          left: 20,
          right: 20,
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
  TreeWrap: {
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
          left: 20,
          right: 20,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 20,
          right: 20,
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
  TreeWrap: {
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
          left: 20,
          right: 20,
        },
      },
    },
    SelectedTreeItemWrap: {
      normal: {
        height: 40,
        padding: {
          left: 20,
          right: 20,
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
  MenuWrap: {
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
  MenuWrap: {
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
    MenuWrap: {
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
