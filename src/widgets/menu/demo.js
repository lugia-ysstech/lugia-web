/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Menu from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import { getBorder } from '@lugia/theme-utils';
import styled from 'styled-components';
import { getBorderRadius } from '../theme/CSSProvider';
const { MenuItem } = Menu;
const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount;

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

const MenuWrap = styled.div`
  margin: 10px;
`;

const Box = styled.div`
  display: inline-block;
  margin: 10px 30px;
`;

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
for (let i = 0; i < 100000; i++) {
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

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items,
      // selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      // expandedPath: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      selectedKeys: [],
      expandedPath: [],
      scrollerValue: 0,
      start: 0,
    };
  }

  render() {
    const { items = [], selectedKeys, expandedPath } = this.state;
    const checkedKey = '4';
    const config = {
      [Widget.Menu]: {
        MenuWrap: {
          normal: {
            width: 600,
            height: 350,
            opacity: 0.6,
            boxShadow: '2px 2px 5px 5px #4d63ff',
            background: { color: '#000' },
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            // padding: {
            //   top: 30,
            //   left: 20,
            //   right: 20,
            // },
          },
          hover: {
            opacity: 1,
          },
        },
        MenuItem: {
          normal: { color: '#ccc', fontSize: 14, font: { fontWeight: 900 } },
          hover: {
            color: '#fff',
            fontSize: 20,
            background: { color: 'green' },
            font: { fontWeight: 400 },
          },
          active: {
            color: 'blue',
            fontSize: 14,
            background: { color: 'pink' },
            font: { fontWeight: 900 },
          },
          disabled: { color: 'red', background: { color: '#000' } },
        },
        SelectedMenuItem: {
          normal: {
            color: 'blue',
            font: { fontWeight: 900 },
            fontSize: 18,
            background: { color: 'orange' },
          },
          hover: { color: '#000', background: { color: 'yellow' } },
          active: { color: 'green' },
        },
        Divider: { normal: { color: 'red' } },
      },
      [Widget.SubMenu]: {
        MenuWrap: { normal: { width: 200, height: 350, fontSize: 14 } },
        MenuItem: {
          normal: { color: '#4d63ff' },
          hover: { color: '#000', background: { color: 'orange' }, font: { fontWeight: 900 } },
          active: { color: '#999' },
          disabled: { color: 'red', background: { color: '#000' } },
        },
        SelectedMenuItem: {
          normal: { color: 'blue', font: { fontWeight: 900 }, background: { color: '#ccc' } },
          hover: { color: '#000', background: { color: 'yellow' } },
          active: { color: 'green' },
        },
      },
    };
    return (
      <div>
        <Box>
          <Menu divided theme={config} mutliple={false} data={data} />
        </Box>

        <Box>
          <Menu divided theme={config} mutliple data={data} />
        </Box>

        <MenuWrap>
          <H2>级联嵌套菜单 </H2>
          <Box>
            <Theme config={config}>
              <Menu
                separator={'/'}
                mutliple={false}
                popupVisible={true}
                // action={'click'}
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
            </Theme>
          </Box>
          <Button onClick={this.btnClick}>hello</Button>
        </MenuWrap>
      </div>
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
