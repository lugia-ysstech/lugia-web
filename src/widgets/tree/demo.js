/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from './index.js';
import Widget from '../consts/index';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const newData = [
  {
    value: 'Components',
    text: 'Components',
    children: [
      {
        value: 'General',
        text: 'General',

        children: [
          {
            value: 'Button 按钮',
            text: 'Button 按钮',
            icon: 'lugia-icon-financial_add_pic',
            children: [{ value: '皮皮', text: '皮皮' }, { value: '卡卡', text: '卡卡' }],
          },
          {
            value: 'Icon 图标',
            text: 'Icon 图标',
            icon: 'lugia-icon-financial_archive',
            describe: true,
          },
        ],
      },
      { value: '皮卡丘', text: '皮卡丘' },
      {
        value: 'Layout',
        text: 'Layout',
        children: [
          { value: 'Grid 栅格', text: 'Grid 栅格' },
          { value: 'Layout 布局', text: 'Layout 布局', describe: true },
        ],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        children: [
          { value: 'Affix 固钉', text: 'Affix 固钉', disabled: true },
          { value: 'Breadcrumb 面包屑', text: 'Breadcrumb 面包屑', describe: true },
          { value: 'Dropdown 下拉菜单', text: 'Dropdown 下拉菜单', notCanSelect: true },
          { value: 'Menu 导航菜单', text: 'Menu 导航菜单' },
          { value: 'Pagination 分页', text: 'Pagination 分页' },
          { value: 'Steps 步骤条', text: 'Steps 步骤条' },
        ],
      },

      {
        value: 'Data Entry',
        text: 'Data Entry',
        describe: true,
        children: [
          { value: 'AutoComplete 自动完成', text: 'AutoComplete 自动完成' },
          { value: 'Cascader 级联选择', text: 'Cascader 级联选择' },
          { value: 'Checkbox 多选框', text: 'Checkbox 多选框' },
          { value: 'DatePicker 日期选择框', text: 'DatePicker 日期选择框' },
          { value: 'Form 表单', text: 'Form 表单' },
          { value: 'Input 输入框', text: 'Input 输入框' },
        ],
      },
    ],
  },
];

const rowData = [
  // { value: '1.1.1.1', text: '1.1.1.1', pid: '1.1.1', path: '1/1.1/1.1.1' },

  { value: '1', text: '1' },
  { value: '1.1', text: '1.1', pid: '1', path: '1' },
  { value: '1.1.1', text: '1.1.1', pid: '1.1', path: '1/1.1' },
  { value: '1.1.1.1', text: '1.1.1.1', pid: '1.1.1', path: '1/1.1/1.1.1' },
  {
    value: '1.1.1.1.1',
    text: '1.1.1.1.1',
    pid: '1.1.1.1',
    path: '1/1.1/1.1.1/1.1.1.1',
    isLeaf: true,
  },
  { value: '1.2', text: '1.2', pid: '1', path: '1' },
  { value: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
  { value: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2' },
  { value: '1.2.2.1', text: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2' },
  {
    value: '1.2.2.1.1',
    text: '1.2.2.1.1',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  {
    value: '1.2.2.1.2',
    text: '1.2.2.1.2',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  { value: '1.2.2.2', text: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true },

  { value: '1.3', text: '1.3', pid: '1', path: '1' },
  { value: '1.3.1', text: '1.3.1', pid: '1.3', path: '1/1.3' },
  { value: '1.3.1.1', text: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { value: '1.3.1.2', text: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { value: '1.3.2', text: '1.3.2', pid: '1.3', path: '1/1.3' },
  { value: '1.3.2.1', text: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { value: '1.3.2.2', text: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { value: '1.3.3', text: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true },

  { value: '2', text: '2' },
  { value: '2.1', text: '2.1', pid: '2', path: '2' },
  { value: '2.1.1', text: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true },
  { value: '2.1.2', text: '2.1.2', pid: '2.1', path: '2/2.1' },
  { value: '2.1.2.1', text: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true },
  { value: '2.2', text: '2.2', pid: '2', path: '2' },
  { value: '2.2.1', text: '2.2.1', pid: '2.2', path: '2/2.2' },
  { value: '2.2.1.1', text: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { value: '2.2.1.2', text: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { value: '2.2.2', text: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true },

  { value: '3', text: '3' },
  { value: '3.1', text: '3.1', pid: '3', path: '3', isLeaf: true },
  { value: '3.2', text: '3.2', pid: '3', path: '3', isLeaf: true },
  { value: '4', text: '4', isLeaf: true },
];

const data = [
  { value: '1', text: '选项 1' },
  {
    value: '1.1',
    text: '选项 1.1',
    pid: '1',
    path: '1',
    icon: 'lugia-icon-financial_columns',
    disabled: true,
  },
  {
    value: '1.1.1',
    text: '选项 1.1.1',
    pid: '1.1',
    path: '1/1.1',
    isLeaf: true,
    disabled: true,
    icon: 'lugia-icon-financial_columns',
  },
  {
    value: '1.1.2',
    text: '选项 1.1.2',
    pid: '1.1',
    path: '1/1.1',
    isLeaf: true,
    notCanSelect: true,
  },

  { value: '1.2', text: '选项 1.2', pid: '1', path: '1' },
  { value: '1.2.1', text: '选项 1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
  { value: '1.2.2', text: '选项 1.2.2', pid: '1.2', path: '1/1.2' },
  {
    value: '1.2.2.1',
    text: '选项 1.2.2.1',
    pid: '1.2.2',
    path: '1/1.2/1.2.2',
    isLeaf: true,
  },

  {
    value: '1.2.2.2',
    text: '选项 1.2.2.2',
    pid: '1.2.2',
    path: '1/1.2/1.2.2',
    isLeaf: true,
  },

  { value: '1.3', text: '选项 1.3', pid: '1', path: '1', isLeaf: true },

  { value: '2', text: '选项 2' },
  { value: '2.1', text: '选项 2.1', pid: '2', path: '2', isLeaf: true },
  { value: '2.2', text: '选项 2.2', pid: '2', path: '2', isLeaf: true },
];

const config = {
  [Widget.Tree]: {
    Container: {
      normal: {
        width: 500,
      },
    },

    TreeItem: {
      TreeItemWrap: {
        normal: {
          height: 50,
          // border: {
          //   top: { color: 'orange', style: 'solid', width: 1 },
          // },
          // padding: {
          //   left: 10,
          // },
          background: {
            color: '#FFAEB9',
          },
          opacity: 1,
          borderRadius: getBorderRadius(10),
        },
        hover: {
          background: {
            color: '#EE2C2C',
          },
          opacity: 0.8,
          borderRadius: getBorderRadius(40),
        },
      },
      SelectedTreeItemWrap: {},
      Text: {
        normal: {
          height: 30,
          font: {
            size: 20,
          },
          padding: {
            // left: 50,
          },
          color: '#FFFF00',
          // border: {
          //   bottom: { color: '#DBDBDB', style: 'solid', width: 3 },
          // },
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('0 0 5px 5px #4d63ff'),
          background: { color: 'orange' },
        },
        hover: {
          background: {
            color: '#EE1289',
          },
          color: '#4d63ff',
          borderRadius: getBorderRadius(0),
          boxShadow: getBoxShadow('0 0 5px 10px #CAFF70'),
        },
      },
      SelectedText: {
        normal: {
          font: {
            size: 16,
          },
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
          border: {
            bottom: { color: '#DBDBDB', style: 'solid', width: 1 },
          },
          borderRadius: getBorderRadius(0),
        },
        hover: {
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
        },
      },

      PrefixIcon: {
        normal: {
          fontSize: 12,
          color: 'red',
        },
        hover: {
          fontSize: 20,
          color: '#4d63ff',
        },
      },

      SuffixIcon: {
        normal: {
          fontSize: 12,
          color: 'red',
        },
        hover: {
          fontSize: 20,
          color: '#4d63ff',
        },
      },

      SubTreeWrap: {
        normal: {
          background: { color: '#F8F8FF' },
        },
      },

      SwitchIcon: {
        normal: {
          font: {
            size: 20,
          },
          color: 'red',
        },
        hover: {
          color: 'blue',
        },
      },
      // Switch: {
      //   normal: {
      //     color: '#F51196',
      //     font: {
      //       size: 20,
      //     },
      //   },
      //   hover: {
      //     color: '#4d63ff',
      //   },
      //   disabled: {
      //     background: {
      //       color: 'red',
      //     },
      //     color: 'red',
      //   },
      // },
    },
  },
};

const info = [
  {
    value: '北京分行',
    text: '北京分行',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      prefixIconSrc: '',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
    icon: 'lugia-icon-direction_play_circle',

    children: [
      { value: '朝阳支行办事处', text: '朝阳支行办事处' },
      { value: '海淀支行办事处', text: '海淀支行办事处' },
      { value: '石景山支行办事处', text: '石景山支行办事处' },
    ],
  },
  {
    value: '天津分行',
    text: '天津分行',
    children: [
      { value: '和平支行办事处', text: '和平支行办事处' },
      { value: '河东支行办事处', text: '河东支行办事处' },
      { value: '南开支行办事处', text: '南开支行办事处' },
    ],
  },
  {
    value: '上海分行',
    text: '上海分行',
    children: [
      { value: '黄埔支行办事处', text: '黄埔支行办事处' },
      { value: '长宁支行办事处', text: '长宁支行办事处' },
      { value: '虹口支行办事处', text: '虹口支行办事处' },
    ],
  },

  {
    value: '深圳分行',
    text: '深圳分行',
    children: [
      { value: '南山支行办事处', text: '南山支行办事处' },
      { value: '盐口支行办事处', text: '盐口支行办事处' },
      { value: '福田支行办事处', text: '福田支行办事处' },
    ],
  },
];

const switchIconNames = {
  open: 'lugia-icon-direction_down',
  close: 'lugia-icon-direction_right',
};

export default () => {
  return (
    <div>
      <Tree
        data={info}
        expandAll
        theme={config}
        translateTreeData
        autoHeight
        parentIsHighlight
        onlySelectLeaf
        // mutliple
        // __navmenu
        switchIconNames={switchIconNames}
      />
      <Tree
        data={info}
        expandAll
        theme={config}
        translateTreeData
        autoHeight
        parentIsHighlight
        onlySelectLeaf
        mutliple
        // __navmenu
        switchIconNames={switchIconNames}
      />
    </div>
  );
};
