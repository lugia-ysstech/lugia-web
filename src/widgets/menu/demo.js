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

const items = [];
for (let i = 0; i < 100000; i++) {
  items.push({ text: i, value: i, disabled: false });
}

const data = [
  {
    text: '选项1',
    value: '选项1',
    disabled: false,
  },
  { text: '选项2', value: '选项2', disabled: false },
  { text: '选项3', value: '选项3', disabled: false },
  { text: '选项4', value: '选项4', disabled: false },
  { text: '选项5', value: '选项5', disabled: true },
  {
    text: '选项6',
    value: '选项6',
    disabled: false,
    children: [
      { text: '次级菜单1', value: '次级菜单1' },
      {
        text: '次级菜单2',
        value: '次级菜单2',
        children: [{ text: 'e', value: 'e' }, { text: 'f', value: 'f' }, { text: 'g', value: 'g' }],
      },
      {
        text: '次级菜单3',
        value: '次级菜单3',
        children: [
          {
            text: '三级菜单1',
            value: '三级菜单1',
            children: [
              { text: 'a', value: 'a' },
              { text: 'b', value: 'b' },
              { text: 'c', value: 'c' },
            ],
          },
          { text: '三级菜单2', value: '三级菜单2' },
          { text: '三级菜单3', value: '三级菜单3' },
          { text: '三级菜单4', value: '三级菜单4' },
          { text: '三级菜单5', value: '三级菜单5' },
          { text: '三级菜单6', value: '三级菜单6' },
          { text: '三级菜单7', value: '三级菜单7' },
          { text: '三级菜单8', value: '三级菜单8' },
          { text: '三级菜单9', value: '三级菜单9' },
          { text: '三级菜单10', value: '三级菜单10' },
        ],
      },
    ],
  },
  { text: '选项7', value: '选项7', disabled: true },
  { text: '选项8', value: '选项8', disabled: false },
  { text: '选项9', value: '选项9', disabled: true },
  { text: '选项10', value: '选项10', disabled: false },
];

const items2 = [
  {
    text: '选项1',
    value: '选项1',
    disabled: false,
    children: [
      { text: '次级菜单1', value: '次级菜单1' },
      { text: '次级菜单2', value: '次级菜单2' },
      { text: '次级菜单3', value: '次级菜单3' },
    ],
  },
  { text: '选项2', value: '选项2', disabled: false },
  { text: '选项3', value: '选项3', disabled: false },
  { text: '选项4', value: '选项4', disabled: false },
  { text: '选项5', value: '选项5', disabled: true },
  {
    text: '选项6',
    value: '选项6',
    disabled: false,
    children: [
      { text: '次级菜单1', value: '次级菜单1' },
      { text: '次级菜单2', value: '次级菜单2' },
      { text: '次级菜单3', value: '次级菜单3' },
    ],
  },
  { text: '选项7', value: '选项7', disabled: true },
  { text: '选项8', value: '选项8', disabled: false },
];
export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { items, selectedKeys: ['选项2', '选项3'] };
  }

  render() {
    const { items = [], selectedKeys } = this.state;
    return (
      <div>
        <h2>级联Menu基础样式</h2>
        <Theme config={{ [Widget.Menu]: { width: 200 } }}>
          <Menu
            mutliple={false}
            data={data}
            onClick={this.onClick}
            onMouseEnter={() => console.info('onMouseEnter')}
          />
        </Theme>

        <h2>多选基础样式</h2>
        <Theme config={{ [Widget.Menu]: { width: 200, height: 350 } }}>
          <Menu
            mutliple={false}
            checkbox={true}
            selectedKeys={selectedKeys}
            data={items}
            onClick={this.onClick}
          />
        </Theme>
        <h2>穿梭框单选样式</h2>
        <Theme config={{ [Widget.Menu]: { width: 168 } }}>
          <Menu
            mutliple={true}
            checkbox={true}
            selectedKeys={selectedKeys}
            data={items2}
            onClick={this.onClick}
          />
        </Theme>
      </div>
    );
  }

  onClick = (e, keys) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys });
  };
}
