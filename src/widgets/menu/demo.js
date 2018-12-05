/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';

const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount;
const MenuWrap = styled.div`
  display: inline-block;
`;

const items = [];
for (let i = 0; i < 100000; i++) {
  items.push({ text: i, value: i, disabled: false });
}
const data = [
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
      selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
      expandedPath: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
      scrollerValue: 0,
      start: 0,
    };
  }

  render() {
    const { items = [], selectedKeys, expandedPath } = this.state;
    return (
      <div>
        <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
          <Menu
            separator={'/'}
            mutliple={false}
            expandedPath={expandedPath}
            popupVisible={true}
            action={'hover'}
            onChange={this.onChange}
            handleIsInMenu={this.handleIsInMenu}
            data={data}
            selectedKeys={selectedKeys}
            offsetY={0}
            onClear={this.onClear}
            onMouseEnter={this.onMouseEnter}
            onClick={this.onClick}
          />
        </Theme>
      </div>
    );
  }

  onClick = (e, keys, item) => {
    // const start = data.indexOf(item);
    // this.setState({ start });
    const { selectedKeys } = keys;
    console.log('selectedKeys', selectedKeys);
    this.setState({ selectedKeys, expandedPath: selectedKeys });
  };

  onMouseEnter = (event, expandedPath, item) => {
    this.setState({ expandedPath });
  };

  onScroller = (start, end) => {
    // this.setState({ start });
  };
}
