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

const Suffix = styled.div`
  height: 30px;
  width: 50px;
  background: red;
`;

const Box = styled.div`
  display: inline-block;
  box-shadow: 4px 0 3px 3px #f8f8f8;
  margin: 0 20px;
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
const suffix = <Suffix>'M'</Suffix>;
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

const menuTheme = {
  [Widget.NavMenu]: {
    Menu: {
      MenuWrap: {
        normal: {
          width: 300,
          height: 400,
          // opacity: 0.7,
          background: {
            color: '#ccc',
          },
          padding: {
            left: 10,
            top: 30,
            //   right: 30,
          },
          margin: {
            left: 20,
            top: 20,
          },
          border: getBorder({ color: '#ff3366', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
        },
        hover: {
          background: {
            color: '#ff66cc',
          },
          // opacity: 1,
          border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
        },
      },
      MenuItem: {
        MenuItemWrap: {
          normal: {
            height: 60,
            background: { color: '#ff99cc' },
            color: '#cc00cc',
            // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            padding: {
              left: 60,
              top: 0,
            },
            font: {
              size: 16,
            },
          },
          hover: {
            color: '#fff',
            background: {
              color: '#660066',
            },
            opacity: 0.9,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },

          active: {
            color: '#4d63ff',
            background: {
              color: 'ff0099',
            },
            opacity: 0.9,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(60),
          },

          disabled: {
            background: { color: '#ff99cc' },
            color: 'red',
            borderRadius: getBorderRadius(60),
            opacity: 0.7,
            padding: {
              left: 30,
              top: 0,
            },
            font: {
              size: 26,
            },
          },
        },

        SelectedMenuItemWrap: {
          normal: {
            height: 80,
            background: { color: '#cc00ff' },
            color: '#fff',
            // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(80),
            padding: {
              left: 30,
            },
            font: {
              size: 20,
            },
          },
          hover: {
            color: '#4d63ff',
            background: {
              color: '#ffffcc',
            },
            opacity: 1,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#336699', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(60),
          },

          active: {
            color: '#cc0000',
            background: {
              color: 'ff9900',
            },
            opacity: 1,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#000033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(0),
          },
        },
      },

      SubMenu: {
        MenuWrap: {
          normal: {
            width: 100,
            background: {
              color: '#660033',
            },
          },
        },

        MenuItem: {
          MenuItemWrap: {
            normal: {
              color: '#fff',
            },
          },
        },

        SubMenu: {
          MenuWrap: {
            normal: {
              width: 200,
              background: {
                color: '#777777',
              },
            },
          },
        },
      },
    },
  },
};

const treeTheme = {
  [Widget.NavMenu]: {
    Tree: {
      TreeWrap: {
        normal: {
          width: 300,
        },
      },
      TreeItem: {
        TreeItemWrap: {
          normal: {
            padding: { left: 30, right: 30 },
          },
        },
        SelectedTreeItemWrap: {
          normal: {
            padding: { left: 30, right: 30 },
          },
        },
        Text: {
          normal: {
            height: 35,
          },
          hover: {
            color: '#4d63ff',
            background: {
              color: '#fff',
            },
          },
          active: {
            background: {
              color: '#fff',
            },
          },
          disabled: {
            background: {
              color: '#ccc',
            },
          },
        },
        SelectedText: {
          normal: {
            height: 35,
            background: { color: '#3d85c6' },
            borderRadius: getBorderRadius(40),
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
    this.state = { value: ['Affix 固钉'] };
  }

  render() {
    return (
      <div>
        {/* <Navmenu data={horiData} theme={menuTheme} mode={'vertical'} />, */}
        <HoriBox>
          <Navmenu data={horiData} mode={'horizontal'} />,
        </HoriBox>
        <Box>
          <H3>light主题 ellipse</H3>
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
        </Box>
        <Box>
          <H3>dark主题 ellipse</H3>
          {/* <Theme config={config}> */}
          <Navmenu
            theme={treeTheme}
            inlineType={'ellipse'}
            mode={'inline'}
            data={newData}
            value={this.state.value}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
          {/* </Theme> */}
        </Box>

        {/* <Box>
          <H3>light主题 primary</H3>
          <Theme config={config}>
            <Navmenu
              inlineType={'primary'}
              mode={'inline'}
              data={newData}
              value={this.state.value}
              inlineExpandAll={true}
              onChange={this.onChange}
              onSelect={this.onSelect}
            />
          </Theme>
        </Box>

        <Box>
          <H3>dark主题 primary</H3>
          <Theme config={config}>
            <Navmenu
              inlineType={'primary'}
              mode={'inline'}
              data={newData}
              theme={'dark'}
              value={this.state.value}
              inlineExpandAll={true}
              onChange={this.onChange}
              onSelect={this.onSelect}
            />
          </Theme>
        </Box> */}
      </div>
    );
  }

  onSelect = target => {
    this.setState({ value: target.value });
  };
  onChange = value => {
    console.log(value);
  };
  onClick = (keys, item) => {
    const { selectedKeys } = keys;
    console.log(selectedKeys);
    this.setState({ value: selectedKeys });
  };
}
