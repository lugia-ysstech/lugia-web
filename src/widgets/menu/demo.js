/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './test';
import Theme from '../theme';
import Widget from '../consts/index';

const items = [];
for (let i = 0; i < 100000; i++) {
  items.push({ text: i, value: i, disabled: false });
}

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
    this.state = { items, selectedKeys: ['1', '2'] };
  }

  render() {
    const { items = [], selectedKeys } = this.state;
    return (
      <div>
        <Theme config={{ [Widget.Menu]: { width: 200, height: 350 } }}>
          <Menu
            mutliple={true}
            checkbox={true}
            selectedKeys={selectedKeys}
            data={items}
            onClick={this.onClick}
            // handleItemWrap={this.handleItemWrap}
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
