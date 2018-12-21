/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './';
import Widget from '../consts/index';
import Theme from '../theme';
import styled from 'styled-components';

const Box = styled.div`
  display: inline-block;
  padding-top: 30px;
  padding-right: 20px;
  height: 1500px;
  box-shadow: 3px 0 3px 3px #ccc;
`;

const newData = [
  { value: 'Lugia Design of React', text: 'Lugia Design of React' },
  { value: '快速上手', text: '快速上手' },
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
          { value: 'Button 按钮', text: 'Button 按钮' },
          { value: 'Icon 图标', text: 'Icon 图标' },
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

export default class LimitTree extends React.Component<Object, Object> {
  all: boolean;

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
  }

  render() {
    const config = {
      [Widget.NavMenu]: {
        width: 300,
      },
    };
    return (
      <Box>
        <Theme config={config}>
          <Navmenu
            inlineType={'ellipse'}
            // inlineType={'primary'}
            mode={'inline'}
            data={newData}
            onChange={this.onChange}
            inlineExpandAll={true}
          />
        </Theme>
      </Box>
    );
  }

  onChange = value => {
    // console.log(value);
  };
}
