/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './';
import Widget from '../consts/index';
import styled from 'styled-components';
import Icon from '../icon';
const Box = styled.div`
  display: inline-block;
  padding: 10px;
  padding-left: 20px;
  vertical-align: top;
`;

const H2 = styled.h2`
  height: 50px;
  margin: 20px;
  background: rgba(0, 0, 51, 0.9);
  color: #fff;
  line-height: 50px;
  text-align: center;
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
  margin: 20px;
`;

const horiData = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
    icons: {
      suffixIconClass: 'lugia-icon-finacial1_lock_o',
    },
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

const tabsTheme = {
  [Widget.NavMenu]: {
    Tabs: {
      TitleContainer: {
        normal: {
          background: '#000033',
        },
      },
      TabHeader: {
        SelectTabPan: {
          normal: {
            color: '#4d63ff',
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
          hover: {
            color: '#4d63ff',
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
    this.state = { value: ['Affix 固钉'], activityValue: '项目实战', height: 500 };
  }

  tabsOnChange = (target: Object) => {
    const { item } = target;
    const { value } = item;
    this.setState({ activityValue: value });
  };

  render() {
    const menuTheme = {
      [Widget.NavMenu]: {
        Menu: {
          Container: {
            normal: {
              width: 300,
              height: 400,
              background: {
                color: '#DB7093',
              },
            },
          },

          MenuItem: {
            MenuItemWrap: {
              normal: {
                color: '#fff',
                background: {
                  image: 'linear-gradient(to right, #8B1A1A, #BCD2EE)',
                },
              },
              hover: {
                background: {
                  color: '#CD2626',
                },
              },
            },

            SelectedMenuItemWrap: {
              normal: {
                background: {
                  color: '#B22222',
                },
              },
              hover: {
                background: {
                  color: '#B22222',
                },
              },
            },

            PrefixIcon: {
              normal: {
                color: '#0000CD',
                margin: {
                  right: 5,
                },
                font: {
                  size: 16,
                },
              },
              hover: {
                color: '#87CEFF',
                font: {
                  size: 20,
                },
              },
            },

            SuffixIcon: {
              normal: {
                color: '#0000CD',
                margin: {
                  left: 5,
                },
                font: {
                  size: 18,
                },
              },
              hover: {
                color: '#87CEFF',
                font: {
                  size: 20,
                },
              },
            },

            SwitchIcon: {
              normal: {
                color: '#ffffff',
              },
            },
          },

          SubMenu: {
            Container: {
              normal: {
                background: {
                  color: '#778899',
                },
              },
            },

            MenuItem: {
              MenuItemWrap: {
                normal: {
                  background: {
                    color: '#9AC0CD',
                  },
                },
              },
            },
          },
        },
      },
    };
    return (
      <div>
        <H2>水平导航菜单</H2>

        <HoriBox>
          <H3>light主题</H3>
          <Navmenu
            data={horiData}
            activityValue={this.state.activityValue}
            mode={'horizontal'}
            onChange={this.tabsOnChange}
          />
        </HoriBox>

        <HoriBox>
          <H3>dark主题</H3>
          <Navmenu data={horiData} themeStyle={'dark'} mode={'horizontal'} />
        </HoriBox>

        <HoriBox>
          <H3>主题样式配置</H3>
          <Navmenu data={horiData} theme={tabsTheme} mode={'horizontal'} />
        </HoriBox>

        <H2>垂直导航菜单</H2>

        <div>
          <Box>
            <H3>light主题</H3>
            <Navmenu autoHeight data={horiData} mode={'vertical'} />
          </Box>
        </div>

        <div>
          <Box>
            <H3>dark主题</H3>
            <Navmenu autoHeight data={horiData} mode={'vertical'} themeStyle={'dark'} />
          </Box>
        </div>

        <div>
          <Box>
            <H3>主题样式配置</H3>
            <Navmenu
              autoHeight
              data={horiData}
              mode={'vertical'}
              theme={menuTheme}
              divided
              renderSuffixItems={this.renderSuffixItems}
            />
          </Box>
        </div>

        <H2>内嵌导航菜单</H2>

        <Box>
          <H3>light主题</H3>
          <Navmenu
            mode={'inline'}
            data={newData}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
            renderSuffixItems={this.renderSuffixItems}
          />

          <Navmenu
            inlineType={'ellipse'}
            mode={'inline'}
            data={newData}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </Box>

        <Box>
          <H3>dark主题</H3>
          <Navmenu
            inlineType={'primary'}
            mode={'inline'}
            themeStyle={'dark'}
            data={newData}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
            switchIconNames={{
              open: 'lugia-icon-direction_caret_up',
              close: 'lugia-icon-direction_caret_down',
            }}
          />

          <Navmenu
            inlineType={'ellipse'}
            themeStyle={'dark'}
            mode={'inline'}
            data={newData}
            inlineExpandAll={true}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </Box>
      </div>
    );
  }

  renderSuffixItems = item => {
    const { children = [] } = item;

    if (children && children.length !== 0) {
      return null;
    }

    const iconTheme = {
      [Widget.Icon]: {
        Icon: {
          normal: {
            margin: {
              right: 10,
              top: 0,
              bottom: 0,
            },
            fontSize: 14,
            opacity: 0,
            getCSS: () => {
              return `
              transition: all 0.3s
              `;
            },
          },
          hover: {
            color: '#98FB98',
            font: {
              size: 16,
            },
            opacity: 1,
          },
        },
      },
    };
    return [
      <Icon
        theme={iconTheme}
        iconClass="lugia-icon-financial_like"
        onClick={e => {
          e.stopPropagation();
          console.log('first Icon');
        }}
      />,
      <Icon
        theme={iconTheme}
        iconClass="lugia-icon-financial_heart_o"
        onClick={e => {
          e.stopPropagation();
          console.log('second Icon');
        }}
      />,
    ];
  };

  onSelect = target => {
    this.setState({ value: target.value });
  };
  onChange = value => {};
  onClick = (keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ value: selectedKeys });
  };
}
