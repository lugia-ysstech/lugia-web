/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Menu from './index';
import Widget from '../consts/index';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import styled from 'styled-components';
import Icon from '../icon';
const { MenuItem } = Menu;
const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount;

const IconWrap = styled.div`
  position: absolute;
  right: 30px;
  top: 15px;
`;

const Button = styled.div`
  width: 200px;
  height: 40px;
  background: cornflowerblue;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
`;

const H2 = styled.h2`
  margin: 10px;
  color: orangered;
`;

const Box = styled.div`
  display: inline-block;
  margin: 10px 30px;
`;

const objData = [
  {
    value: '机构性质',
    text: '机构性质',
    des: 'JGXZ',
    icon: 'lugia-icon-direction_play_circle',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      prefixIconSrc: '',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
  },
  {
    value: '市场',
    text: '市场',
    des: 'MARKET',
  },
  {
    value: '报表规则类型',
    text: '报表规则类型',
    des: 'REPORT_RULE_TYPE',
  },
  {
    value: '特殊日期',
    text: '特殊日期',
    des: 'TSRQ',
  },
  {
    value: 'ACS 001',
    text: 'ACS 001',
    des: 'ACS 001',
  },
];

const data = [
  { value: '皮卡丘', text: '皮卡丘', disabled: true },
  { value: '妙蛙种子', text: '妙蛙种子', disabled: true },
  { value: '小火龙', text: '小火龙' },
  { value: '杰尼龟', text: '杰尼龟' },
  { value: '绿毛虫', text: '绿毛虫' },
  { value: '独角虫', text: '独角虫' },
  { value: '波波', text: '波波' },
  { value: '小拉达', text: '小拉达' },
  { value: '阿伯怪', text: '阿伯怪' },
  { value: '穿山鼠', text: '穿山鼠' },
  { value: '尼多兰', text: '尼多兰' },
  { value: '皮皮', text: '皮皮' },
];

const items = [];
for (let i = 0; i < 20; i++) {
  items.push({ text: i, value: i, disabled: false });
}
const hasChildrenData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    disabled: false,
  },
  { text: '一级菜单2', value: '一级菜单2', disabled: false },
  { text: '一级菜单3', value: '一级菜单3', disabled: false },
  {
    text: '一级菜单4',
    value: '一级菜单4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        children: [{ text: '三级菜单4-1-1', value: '三级菜单4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: '一级菜单5', disabled: true },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: '次级菜单6-1' },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            children: [
              { text: 'sub1', value: 'sub1', children: [{ text: 'sub2', value: 'sub2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: '三级菜单6-2-2' },
          { text: '三级菜单6-2-3', value: '三级菜单6-2-3' },
        ],
      },
      { text: '次级菜单6-3', value: '次级菜单6-3' },
      { text: '次级菜单6-4', value: '次级菜单6-4' },
      { text: '次级菜单6-5', value: '次级菜单6-5' },
      { text: '次级菜单6-6', value: '次级菜单6-6' },
      { text: '次级菜单6-7', value: '次级菜单6-7' },
      { text: '次级菜单6-8', value: '次级菜单6-8' },
      { text: '次级菜单6-9', value: '次级菜单6-9' },
      { text: '次级菜单6-10', value: '次级菜单6-10' },
    ],
  },
  { text: '一级菜单7', value: '一级菜单7', disabled: true },
  { text: '一级菜单8', value: '一级菜单8', disabled: false },
  { text: '一级菜单9', value: '一级菜单9', disabled: true },
  { text: '一级菜单10', value: '一级菜单10', disabled: false },
];

const theme = {
  [Widget.Menu]: {
    MenuItem: {
      MenuItemWrap: { normal: { height: 50, background: { color: '#E6E6FA' } } },
    },
  },
};

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: [],
      expandedPath: [],
      scrollerValue: 0,
      start: 0,
    };
  }

  render() {
    const { selectedKeys, expandedPath } = this.state;

    const view = {
      [Widget.Menu]: {
        Container: {
          normal: {
            width: 300,
            height: 200,
            background: {
              color: '#E6E6FA',
            },
            padding: {
              left: 20,
              right: 20,
              bottom: 30,
            },
          },
        },

        MenuItem: {
          MenuItemWrap: {
            normal: {
              height: 60,
              border: {
                left: { color: 'transparent', style: 'solid', width: 4 },
              },
            },
            hover: {
              background: {
                color: '#B9D3EE',
              },
              color: '#4d63ff',
            },
          },
          SelectedMenuItemWrap: {
            normal: {
              background: {
                color: '#B9D3EE',
              },
              border: {
                left: { color: '#3A5FCD', style: 'solid', width: 4 },
              },
            },
            hover: {
              color: '#4d63ff',
              background: {
                color: '#B9D3EE',
              },
            },
          },
          Divider: {
            normal: { background: { color: '#D4D4D4' } },
          },
          PreIcon: {
            hover: {
              fontSize: 20,
            },
          },

          SuffixIcon: {
            hover: {
              fontSize: 20,
            },
          },

          SwitchIcon: {
            hover: {
              fontSize: 20,
            },
          },
          TextContainer: {
            normal: {
              padding: {
                top: 10,
                left: 20,
              },
            },
          },
          DesContainer: {
            normal: {
              padding: {
                left: 20,
              },
            },
            hover: {
              // color: 'orange',
            },
            active: {
              color: '#3d1c4e',
            },
          },
        },
      },
    };

    return (
      <div>
        <H2>带有辅助文本的菜单</H2>
        <Box>
          <Menu
            theme={view}
            autoHeight
            divided
            data={objData}
            renderSuffixItems={this.renderSuffixItems}
          />
        </Box>

        <Box>
          <Menu
            theme={view}
            checkedCSS={'checkbox'}
            mutliple={true}
            autoHeight
            divided
            renderSuffixItems={this.renderSuffixItems}
            data={objData}
          />
        </Box>

        <H2>单选基本菜单</H2>

        <Box>
          <Menu theme={theme} autoHeight divided data={data} />
        </Box>

        <Box>
          <Menu theme={theme} autoHeight checkedCSS={'checkbox'} divided data={data} />
        </Box>

        <Box>
          <Menu theme={theme} autoHeight checkedCSS={'background'} divided data={data} />
        </Box>

        <H2>多选基本菜单</H2>

        <Box>
          <Menu
            theme={theme}
            autoHeight
            checkedCSS={'checkbox'}
            divided
            mutliple={true}
            data={data}
          />
        </Box>

        <Box>
          <Menu divided theme={theme} autoHeight mutliple data={data} />
        </Box>

        <H2>级联嵌套菜单 </H2>
        <Box>
          <Menu
            theme={theme}
            separator={'/'}
            mutliple={false}
            action={'hover'}
            expandedPath={expandedPath}
            selectedKeys={selectedKeys}
            handleIsInMenu={this.handleIsInMenu}
            data={hasChildrenData}
            offsetY={0}
            onExpandPathChange={this.onExpandPathChange}
            onClick={this.onClick}
            autoHeight
          />
        </Box>
        <Button onClick={this.btnClick}>hello</Button>
      </div>
    );
  }

  renderSuffixItems(item, channel) {
    const iconTheme = {
      [Widget.Icon]: {
        Icon: {
          normal: {
            margin: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 0,
            },
            fontSize: 14,
          },
          hover: {
            color: 'red',
          },
        },
      },
    };
    return (
      <IconWrap>
        <Icon
          theme={iconTheme}
          lugiaConsumers={channel.consumer}
          iconClass={'lugia-icon-financial_editor'}
          onClick={() => {
            console.log('first Icon');
          }}
        />

        <Icon
          theme={iconTheme}
          lugiaConsumers={channel.consumer}
          iconClass={'lugia-icon-reminder_close_circle_o'}
          onClick={() => {
            console.log('second Icon');
          }}
        />
      </IconWrap>
    );
  }

  clickDefaultMenu = (e, keys, item) => {
    const { selectedKeys } = keys;
  };

  btnClick = (e, keys, item) => {
    this.setState({
      selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
      expandedPath: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
    });
  };

  onClick = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys, expandedPath: selectedKeys });
  };

  onExpandPathChange = expandedPath => {
    this.setState({ expandedPath });
  };

  onScroller = (start, end) => {
    // this.setState({ start });
  };
}
