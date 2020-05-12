/**
 *
 * create by ligx
 *
 * @flow
 */
export default {
  '/': {
    exact: true,
    render: async () => import('./widgets/input/demo'),
  },
  '/affix': {
    render: async () => import('./widgets/affix/demo'),
  },

  '/alert': {
    render: async () => import('./widgets/alert/demo'),
  },

  '/amountinput': {
    render: async () => import('./widgets/amount-input/demo'),
  },
  '/anchor': {
    render: async () => import('./widgets/anchor/demo'),
  },
  '/autocomplete': {
    render: async () => import('./widgets/auto-complete/demo'),
  },

  '/avatar': {
    render: async () => import('./widgets/avatar/demo'),
  },

  '/backtop': {
    render: async () => import('./widgets/back-top/demo'),
  },
  '/badge': {
    render: async () => import('./widgets/badge/demo'),
  },
  '/breadcrumb': {
    render: async () => import('./widgets/breadcrumb/demo'),
  },

  '/button': {
    render: async () => import('./widgets/button/demo'),
  },

  '/card': {
    render: async () => import('./widgets/card/demo'),
  },

  '/carousel': {
    render: async () => import('./widgets/carousel/demo'),
  },
  '/cascader': {
    render: async () => import('./widgets/cascader/demo'),
  },

  '/checkbox': {
    render: async () => {
      return (await import('./widgets/checkbox/demo')).CheckboxDemo;
    },
  },
  '/checkbox-group': {
    render: async () => {
      return (await import('./widgets/checkbox/demo')).CheckboxGroupDemo;
    },
  },
  '/collapse': {
    render: async () => import('./widgets/collapse/demo').CollapseDemo,
  },
  '/datepicker': {
    render: async () => import('./widgets/date-picker/demo'),
  },

  '/divider': {
    render: async () => import('./widgets/divider/demo'),
  },
  '/drawer': {
    render: async () => import('./widgets/drawer/demo'),
  },
  '/dropmenu': {
    render: async () => import('./widgets/dropmenu/demo'),
  },
  '/p-dropmenu': {
    render: async () => import('./widgets/dropmenu/p-dropmenu'),
  },
  '/grid': {
    render: async () => import('./widgets/grid/demo'),
  },
  '/icon': {
    render: async () => import('./widgets/icon/demo'),
  },

  '/input': {
    render: async () => import('./widgets/input/demo'),
  },
  '/layout': {
    render: async () => import('./widgets/layout/demo'),
  },

  '/loading': {
    render: async () => import('./widgets/loading/demo'),
  },

  '/menu': {
    render: async () => import('./widgets/menu/demo'),
  },
  '/p-menu': {
    render: async () => import('./widgets/menu/p-menu'),
  },
  '/message': {
    render: async () => import('./widgets/message/demo'),
  },

  '/modal': {
    render: async () => import('./widgets/modal/demo'),
  },

  '/navmenu': {
    render: async () => import('./widgets/navmenu/demo'),
  },
  '/p-navmenu': {
    render: async () => import('./widgets/navmenu/p-navmenu'),
  },
  '/notification': {
    render: async () => import('./widgets/notification/demo'),
  },

  '/numberinput': {
    render: async () => import('./widgets/number-input/demo'),
  },

  '/pageloading': {
    render: async () => import('./widgets/page-loading/demo'),
  },
  '/pagination': {
    render: async () => import('./widgets/pagination/demo'),
  },

  '/popconfirm': {
    render: async () => import('./widgets/popconfirm/demo'),
  },

  '/popover': {
    render: async () => import('./widgets/popover/demo'),
  },
  '/progress': {
    render: async () => import('./widgets/progress/demo'),
  },

  '/radio': {
    render: async () => {
      return (await import('./widgets/radio/demo')).RadioDemo;
    },
  },
  '/radio-group': {
    render: async () => {
      return (await import('./widgets/radio/demo')).RadioGroupDemo;
    },
  },

  '/rate': {
    render: async () => import('./widgets/rate/demo'),
  },
  '/select': {
    render: async () => import('./widgets/select/demo'),
  },
  '/p-select': {
    render: async () => import('./widgets/select/p-select'),
  },

  '/skeleton': {
    render: async () => import('./widgets/skeleton/demo'),
  },

  '/slider': {
    render: async () => import('./widgets/slider/demo'),
  },

  '/steps': {
    render: async () => import('./widgets/steps/demo'),
  },

  '/switch': {
    render: async () => import('./widgets/switch/demo'),
  },
  '/table': {
    render: async () => import('./widgets/table/demo'),
  },

  '/tabs': {
    render: async () => import('./widgets/tabs/demo'),
  },

  '/tag': {
    render: async () => import('./widgets/tag/demo'),
  },

  '/timeline': {
    render: async () => import('./widgets/time-line/demo'),
  },

  '/timepicker': {
    render: async () => import('./widgets/time-picker/demo'),
  },

  '/tooltip': {
    render: async () => import('./widgets/tooltip/demo'),
  },
  '/transfer': {
    render: async () => import('./widgets/transfer/demo'),
  },
  '/tree': {
    render: async () => import('./widgets/tree/demo'),
  },
  '/dragTree': {
    render: async () => import('./widgets/tree/dragDome.js'),
  },
  '/p-tree': {
    render: async () => import('./widgets/tree/p-tree.js'),
  },
  '/treeselect': {
    render: async () => import('./widgets/tree-select/demo'),
  },
  '/p-treeSelect': {
    render: async () => import('./widgets/tree-select/p-demo'),
  },
  '/upload': {
    render: async () => import('./widgets/upload/demo'),
  },
  '/newTable': {
    render: async () => import('./widgets/new-table/demo'),
  },
  '/ValidateDemo': {
    render: async () => import('./ValidateDemo'),
  },
};
