/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './navmenu';
import Widget from '../consts/index';
import Theme from '../theme';

// console.info(new Date() - now);
const onSelect = (selectedKeys, info) => {},
  onCheck = (checkedKeys, info) => {};

const data = [
  {
    key: '授权管理',
    title: '授权管理',
    alwaysExpanded: true,
    icon: 'lugia-icon-financial_archive',
    children: [
      {
        key: '授权参数设计',
        title: '授权参数设计',
        alwaysExpanded: true,
        children: [
          { key: '授权子参数一', title: '授权子参数一' },
          { key: '授权子参数二', title: '授权子参数二' },
        ],
      },
    ],
  },
  { key: '监控', title: '监控', icon: 'lugia-icon-financial_columns' },
  {
    key: '部署',
    title: '部署',
    icon: 'lugia-icon-financial_add_pic',
    children: [
      { key: '电脑部署', title: '电脑部署', children: [{ key: '显示器', title: '显示器' }] },
      { key: '网络部署', title: '网络部署' },

      {
        key: '硬件部署',
        title: '硬件部署',
        children: [
          { key: '鼠标部署', title: '鼠标部署', children: [{ key: '左键', title: '左键' }] },
          { key: '键盘部署', title: '键盘部署', children: [{ key: '键A', title: '键A' }] },
        ],
      },
    ],
  },
];

const newData = [
  {
    value: '授权管理',
    text: '授权管理',
    alwaysExpanded: true,
    icon: 'lugia-icon-financial_archive',
    children: [
      {
        value: '授权参数设计',
        text: '授权参数设计',
        alwaysExpanded: true,
        children: [
          { value: '授权子参数一', text: '授权子参数一' },
          { value: '授权子参数二', text: '授权子参数二' },
        ],
      },
    ],
  },

  {
    value: '部署',
    text: '部署',
    icon: 'lugia-icon-financial_add_pic',
    children: [
      { value: '电脑部署', text: '电脑部署', children: [{ value: '显示器', text: '显示器' }] },
      { value: '网络部署', text: '网络部署' },

      {
        value: '硬件部署',
        text: '硬件部署',
        children: [
          { value: '鼠标部署', text: '鼠标部署', children: [{ value: '左键', text: '左键' }] },
          { value: '键盘部署', text: '键盘部署', children: [{ value: '键A', text: '键A' }] },
        ],
      },
      { value: '网络1', text: '网络1' },
      { value: '网络2', text: '网络2' },
      { value: '网络3', text: '网络3' },
      { value: '网络4', text: '网络4' },
      { value: '网络5', text: '网络5' },
      { value: '网络6', text: '网络6' },
      { value: '网络7', text: '网络7' },
      { value: '网络8', text: '网络8' },
      { value: '网络9', text: '网络9' },
      { value: '网络10', text: '网络10' },
      { value: '网络11', text: '网络11' },
      { value: '网络12', text: '网络12' },
    ],
  },
  { value: '监控', text: '监控', icon: 'lugia-icon-financial_columns' },
  { value: '监控2', text: '监控2', icon: 'lugia-icon-financial_columns' },
  { value: '监控3', text: '监控3', icon: 'lugia-icon-financial_columns' },
  { value: '监控4', text: '监控4', icon: 'lugia-icon-financial_columns' },
  { value: '监控5', text: '监控5', icon: 'lugia-icon-financial_columns' },
  { value: '监控6', text: '监控6', icon: 'lugia-icon-financial_columns' },
];

export default class LimitTree extends React.Component<Object, Object> {
  all: boolean;

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
  }

  render() {
    const config = {
      [Widget.Tree]: {
        // height: 200,
        width: 220,
      },
    };
    return (
      <Theme config={config}>
        <Navmenu
          inlineType={'ellipse'}
          // inlineType={'primary'}
          mode={'inline'}
          // mode={'vertical'}
          // valueField={'key'}
          // displayField={'title'}
          data={newData}
          action={'hover'}
          onChange={this.onChange}
          expandAll={true}
        />
      </Theme>
    );
  }

  onChange = value => {
    // console.log(value);
  };
}
