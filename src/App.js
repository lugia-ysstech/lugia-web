import React, { Component } from 'react';
import { createRoute, go } from '@lugia/lugiax-router';
import router from './router';
import Menu from './widgets/menu';
import Input from './widgets/input';
import ThemeView from './ThemeView';
import message from './widgets/message';

const data = [
  {
    value: '/affix',
    sort: 35,
    text: 'Affix 固钉',
  },
  {
    value: '/navmenu',
    sort: 36,
    text: 'NavMenu 导航菜单',
  },
  {
    value: '/pagination',
    sort: 37,
    text: 'Pagination 分页',
  },
  {
    value: '/steps',
    sort: 38,
    text: 'Steps 步骤条',
  },
  {
    value: '/alert',
    sort: 39,
    text: 'Alert 警告提示',
  },
  {
    value: '/drawer',
    sort: 40,
    text: 'Drawer 抽屉',
  },
  {
    value: '/message',
    sort: 41,
    text: 'Message 全局提示',
  },
  {
    value: '/modal',
    sort: 42,
    text: 'Modal 对话框',
  },
  {
    value: '/notification',
    sort: 43,
    text: 'Notification 通知提醒框',
  },
  {
    value: '/popconfirm',
    sort: 44,
    text: 'Popconfirm 气泡确认框',
  },
  {
    value: '/progress',
    sort: 45,
    text: 'Progress 进度条',
  },
  {
    value: '/skeleton',
    sort: 46,
    text: 'Skeleton 加载占位符',
  },
  {
    value: '/amountinput',
    sort: 47,
    text: 'AmountInput 金额输入框',
  },
  {
    value: '/autocomplete',
    sort: 48,
    text: 'AutoComplete 自动完成',
  },
  {
    value: '/cascader',
    sort: 49,
    text: 'Cascader 级联选择',
  },
  {
    value: '/checkbox',
    sort: 50,
    text: 'Checkbox 多选框',
  },
  {
    value: '/datepicker',
    sort: 51,
    text: 'DatePicker 日期选择器',
  },
  {
    value: '/dropmenu',
    sort: 52,
    text: 'Dropmenu 下拉菜单',
  },
  {
    value: '/input',
    sort: 53,
    text: 'Input 文本输入框',
  },
  {
    value: '/menu',
    sort: 54,
    text: 'Menu 菜单',
  },
  {
    value: '/numberinput',
    sort: 55,
    text: 'NumberInput 数字输入框',
  },
  {
    value: '/radio',
    sort: 56,
    text: 'Radio 单选框',
  },
  {
    value: '/rate',
    sort: 57,
    text: 'Rate 评分',
  },
  {
    value: '/select',
    sort: 58,
    text: 'Select 选择器',
  },
  {
    value: '/slider',
    sort: 59,
    text: 'Slider 滑动输入条',
  },
  {
    value: '/switch',
    sort: 60,
    text: 'Switch 开关',
  },
  {
    value: '/timepicker',
    sort: 61,
    text: 'TimePicker 时间选择器',
  },
  {
    value: '/transfer',
    sort: 62,
    text: 'Transfer 穿梭框',
  },
  {
    value: '/tree',
    sort: 63,
    text: 'Tree 树形控件',
  },
  {
    value: '/treeselect',
    sort: 64,
    text: 'TreeSelect 树形选择控件',
  },
  {
    value: '/upload',
    sort: 65,
    text: 'Upload 上传',
  },
  {
    value: '/anchor',
    sort: 66,
    text: 'Anchor 锚点',
  },
  {
    value: '/backtop',
    sort: 67,
    text: 'BackTop 回到顶部',
  },
  {
    value: '/divider',
    sort: 68,
    text: 'Divider 分割线',
  },
  {
    value: '/loading',
    sort: 69,
    text: 'Loading 加载中',
  },
  {
    value: '/avatar',
    sort: 70,
    text: 'Avatar 头像',
  },
  {
    value: '/badge',
    sort: 71,
    text: 'Badge 徽标数',
  },
  {
    value: '/card',
    sort: 72,
    text: 'Card 卡片',
  },
  {
    value: '/carousel',
    sort: 73,
    text: 'Carousel 走马灯',
  },
  {
    value: '/collapse',
    sort: 74,
    text: 'Collapse 折叠面板',
  },
  {
    value: '/popover',
    sort: 75,
    text: 'Popover 气泡卡片',
  },
  {
    value: '/table',
    sort: 76,
    text: 'Table 表格',
  },
  {
    value: '/tabs',
    sort: 77,
    text: 'Tabs 标签页',
  },
  {
    value: '/tag',
    sort: 78,
    text: 'Tag 标签',
  },
  {
    value: '/timeline',
    sort: 79,
    text: 'TimeLine 时间轴',
  },
  {
    value: '/tooltip',
    sort: 80,
    text: 'Tooltip 文字提示',
  },
  {
    value: '/breadcrumb',
    sort: 81,
    text: 'Breadcrumb 面包屑',
  },
  {
    value: '/button',
    text: 'Button 按钮',
  },
  {
    value: '/icon',
    text: 'Icon 图标',
  },
  {
    value: '/grid',
    text: 'Grid 栅格',
  },
  {
    value: '/layout',
    text: 'Layout 布局',
  },
];

const processMap = {
  amountinput: '/amount-input',
  autocomplete: '/auto-complete',
  backtop: '/back-top',
  datepicker: '/date-picker',
  timepicker: '/time-picker',
  treeselect: '/tree-select',
  timeline: '/time-line',
  numberinput: '/number-input',
};

const modules = {};
data.reduce((modules, item) => {
  const { value: itemValue, text } = item;
  const processVal = processMap[itemValue.replace(/\//g, '')];
  const value = processVal ? processVal : itemValue;
  try {
    modules[itemValue] = {
      Target: require(`./widgets${value}/index`).default,
      Info: require(`./widgets${value}/lugia.${value.replace(/\//g, '')}.zh-CN.json`),
    };
  } catch (err) {
    delete modules[itemValue];
    const msg = `${text}组件加载错误`;
    message.error(msg);
    console.error(msg);
  }
  return modules;
}, modules);

class Header extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { data, modulePath: '/' };
  }

  onChange = item => {
    const { newValue = '' } = item;

    this.setState({
      data: data.filter(({ value }) => {
        return value && value.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
      }),
    });
  };

  render() {
    return [<ThemeView modulePath={this.state.modulePath} modules={modules} />];
  }

  onChangeItem = ({ selectedKeys }) => {
    const url = selectedKeys[0];
    if (url) {
      go({ url });
      this.setState({
        modulePath: url,
      });
    }
  };
}

export default () => {
  return [<Header />, createRoute(router)];
};
