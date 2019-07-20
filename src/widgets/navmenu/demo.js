/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './';
import Widget from '../consts/index';
import styled from 'styled-components';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const Box = styled.div`
  display: inline-block;
  box-shadow: 4px 0 3px 3px #f8f8f8;
  vertical-align: top;
`;

const H3 = styled.h3`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  background: cornflowerblue;
  color: #fff;
`;

const HoriBox = styled.div`
  margin: 10px 0 50px;
`;

const horiData = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
  },
  {
    value: '快速上手',
    text: '快速上手',
    disabled: true,
    icon: 'lugia-icon-financial_columns',
    children: [
      { value: '快速上手子1-1', text: '快速上手1-1' },
      { value: '快速上手子1-2', text: '快速上手1-2' },
    ],
  },
  { value: '项目实战', text: '项目实战', children: [] },
  { value: '在Lugia-mega中使用', text: '在Lugia-mega中使用' },
  {
    value: 'Components',
    text: 'Components',

    children: [
      { value: 'AutoComplete 自动完成', text: '自动完成' },
      { value: 'Cascader 级联选择', text: '级联选择' },
      { value: 'Checkbox 多选框', text: '多选框' },
      { value: 'DatePicker 日期选择框', text: '日期选择框' },
      { value: 'Form 表单', text: '表单', children: [{ value: 'aa', text: 'aa' }] },
      { value: 'Input 输入框', text: '输入框' },
    ],
  },
];
const newData = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
  },
  { value: '快速上手', text: '快速上手', icon: 'lugia-icon-financial_columns' },
  { value: '项目实战', text: '项目实战' },
  { value: '在Lugia-mega中使用', text: '在Lugia-mega中使用' },
  {
    value: 'Components',
    text: 'Components',
    children: [
      {
        value: 'General',
        text: 'General',
        describe: true,
        children: [
          { value: 'Button 按钮', text: 'Button 按钮', icon: 'lugia-icon-financial_add_pic' },
          { value: 'Icon 图标', text: 'Icon 图标', icon: 'lugia-icon-financial_archive' },
        ],
      },

      {
        value: 'Layout',
        text: 'Layout',
        describe: true,
        children: [
          { value: 'Grid 栅格', text: 'Grid 栅格' },
          { value: 'Layout 布局', text: 'Layout 布局' },
        ],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        describe: true,
        children: [
          { value: 'Affix 固钉', text: 'Affix 固钉' },
          { value: 'Breadcrumb 面包屑', text: 'Breadcrumb 面包屑' },
          { value: 'Dropdown 下拉菜单', text: 'Dropdown 下拉菜单' },
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

const treeTheme = {
  [Widget.NavMenu]: {
    Tree: {
      TreeWrap: {
        normal: {
          width: 300,
          height: 400,
        },
      },
    },
  },
};

const tabsTheme = {
  [Widget.NavMenu]: {
    Tabs: {
      TabHeader: {
        SelectTabPan: {
          normal: {
            color: 'red',
          },
          disabled: {
            color: '#ccc',
          },
        },
        DefaultTabPan: {
          normal: {
            height: 31,
            background: {
              color: 'red',
            },
          },
          hover: {
            color: 'orange',
          },
          disabled: {
            color: '#ccc',
          },
        },
      },
    },
  },
};

export default class LimitDemo extends React.Component<Object, Object> {
  all: boolean;

  constructor(props) {
    super(props);
    this.state = { value: ['Affix 固钉'], activityValue: 3 };
  }

  tabsOnChange = (target: Object) => {
    const { index: activityValue } = target;
    this.setState({ activityValue });
  };

  render() {
    return (
      <div>
        <HoriBox>
          <Navmenu
            data={horiData}
            theme={tabsTheme}
            activityValue={this.state.activityValue}
            mode={'horizontal'}
            onChange={this.tabsOnChange}
          />
        </HoriBox>
        <div>
          <Box>
            <H3>light主题</H3>
            <Navmenu data={horiData} mode={'vertical'} />
          </Box>
        </div>
        <div>
          <Box>
            <H3>dark主题</H3>
            <Navmenu
              // autoHeight={false}
              data={horiData}
              themeStyle={'dark'}
              mode={'vertical'}
            />
          </Box>
        </div>
        <Box>
          <H3>light主题</H3>
          <Navmenu
            inlineType={'primary'}
            theme={treeTheme}
            mode={'inline'}
            data={newData}
            value={this.state.value}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />

          <Navmenu
            inlineType={'ellipse'}
            theme={treeTheme}
            mode={'inline'}
            data={newData}
            value={this.state.value}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </Box>
        <Box>
          <H3>dark主题</H3>
          <Navmenu
            inlineType={'primary'}
            theme={treeTheme}
            mode={'inline'}
            themeStyle={'dark'}
            data={newData}
            value={this.state.value}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />

          <Navmenu
            inlineType={'ellipse'}
            theme={treeTheme}
            themeStyle={'dark'}
            mode={'inline'}
            data={newData}
            value={this.state.value}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </Box>
      </div>
    );
  }

  onSelect = target => {
    this.setState({ value: target.value });
  };
  onChange = value => {};
  onClick = (keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ value: selectedKeys });
  };
}
