/**
 *
 * create by ligx
 *
 * @flow
 */
import TreeUtils from '../utils';
import { getTreeData } from '../../menu/utils';
const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const errorData = [
  {
    value: '/dashboard',
    text: 'Dashboard',
    icon: 'lugia-icon-financial_sad',
    children: [
      {
        value: '/dashboard/analyse',
        text: '分析页',
      },
      {
        value: '/dashboard/monitor',
        text: '监控页',
      },
      {
        value: '/dashboard/desk',
        text: '工作台',
      },
    ],
  },
  {
    value: '/form',
    text: '表单页',
    icon: 'lugia-icon-financial_editor',
    children: [
      {
        value: '/form/basic-form',
        text: '基础表单',
      },
      {
        value: '/form/step-form',
        text: '分布表单',
      },
      {
        value: '/form/advanced-form',
        text: '高级表单',
      },
    ],
  },
  {
    value: '/list',
    text: '列表页',
    icon: 'lugia-icon-financial_table',
    children: [
      {
        value: '/list/table-list',
        text: '查询表格',
      },
      {
        value: '/list/basic-list',
        text: '标准列表',
      },
      {
        value: '/list/card-list',
        text: '卡片列表',
      },
      {
        value: '/list/search',
        text: '搜索列表',
        children: [
          {
            value: '/list/search/article',
            text: '文章列表',
          },
          {
            value: '/list/search/projects',
            text: '项目列表',
          },
          {
            value: '/list/search/applications',
            text: '应用列表',
          },
        ],
      },
    ],
  },
  {
    value: '/detail',
    text: '详情页',
    icon: 'lugia-icon-financial_sad_o',
    children: [
      {
        value: '/detail/basic-detail',
        text: '基础详情页',
      },
      {
        value: '/detail/advanced-detail',
        text: '高级详情页',
      },
    ],
  },
  {
    value: '/result',
    text: '结果页',
    icon: 'lugia-icon-reminder_check_circle_o',
    children: [
      {
        value: '/result/success',
        text: '成功页',
      },
      {
        value: '/result/failed',
        text: '失败页',
      },
    ],
  },
  {
    value: '/abnormal',
    text: '异常页',
    icon: 'lugia-icon-reminder_warning',
    children: [
      {
        value: '/abnormal/403',
        text: '403',
      },
      {
        value: '/abnormal/404',
        text: '404',
      },
      {
        value: '/abnormal/500',
        text: '500',
      },
    ],
  },
  {
    value: '/personal',
    text: '个人页',
    icon: 'lugia-icon-financial_user',
    children: [
      {
        value: '/personal/center',
        text: '个人中心',
      },
      {
        value: '/personal/settings',
        text: '个人设置',
      },
    ],
  },
  {
    value: '/user',
    text: '用户管理',
    icon: 'lugia-icon-financial_user',
  },
];

const obj = {
  '/dashboard': { index: 0, can: false },
  '/dashboard/analyse': { index: 1, can: true },
  '/dashboard/monitor': { index: 2, can: true },
  '/dashboard/desk': { index: 3, can: true },
  '/form': { index: 4, can: false },
  '/form/basic-form': { index: 5, can: true },
  '/form/step-form': { index: 6, can: true },
  '/form/advanced-form': { index: 7, can: true },
  '/list': { index: 8, can: false },
  '/list/table-list': { index: 9, can: true },
  '/list/basic-list': { index: 10, can: true },
  '/list/card-list': { index: 11, can: true },
  '/list/search': { index: 12, can: false },
  '/list/search/article': { index: 13, can: true },
  '/list/search/projects': { index: 14, can: true },
  '/list/search/applications': { index: 15, can: true },
  '/detail': { index: 16, can: false },
  '/detail/basic-detail': { index: 17, can: true },
  '/detail/advanced-detail': { index: 18, can: true },
  '/result': { index: 19, can: false },
  '/result/success': { index: 20, can: true },
  '/result/failed': { index: 21, can: true },
  '/abnormal': { index: 22, can: false },
  '/abnormal/403': { index: 23, can: true },
  '/abnormal/404': { index: 24, can: true },
  '/abnormal/500': { index: 25, can: true },
  '/personal': { index: 26, can: false },
  '/personal/center': { index: 27, can: true },
  '/personal/settings': { index: 28, can: true },
  '/user': { index: 29, can: true },
  lugia_tree_root: {
    can: false,
    canTotal: 22,
    nowVisible: 30,
    realyVisible: 30,
    childrenIdx: [0, 4, 8, 16, 19, 22, 26, 29],
    children: 8,
    begats: 30,
    index: -1,
  },
};
describe('utils.error.test', () => {
  it('generateNode', () => {
    const utils = new TreeUtils(getTreeData(errorData, '@'), {
      pathSeparator: '@',
    });

    const { rows, parentCount } = utils.slice(errorData, 2, 17, obj);
    const nodes = utils.generateTreeNode(rows);
  });
});
