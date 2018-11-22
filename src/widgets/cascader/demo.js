/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Cascader from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import Trigger from '../trigger';
import InputTag from '../inputtag';

const items = [
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
        children: [
          {
            text: '三级菜单1',
            value: '三级菜单1',
            children: [
              { text: 'sub1', value: 'sub1', children: [{ text: 'sub2', value: 'sub2' }] },
            ],
          },
          { text: '三级菜单2', value: '三级菜单2' },
          { text: '三级菜单3', value: '三级菜单3' },
        ],
      },
    ],
  },
  { text: '选项7', value: '选项7', disabled: true },
  { text: '选项8', value: '选项8', disabled: false },
  { text: '选项9', value: '选项9', disabled: true },
  { text: '选项10', value: '选项10', disabled: false },
];

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: ['选项6/次级菜单2/三级菜单1/a/sub2'],
    };
  }
  render() {
    const { selectedKeys } = this.state;

    return (
      <div>
        <Theme config={{ [Widget.Cascader]: { width: 200, menuWidth: 100 } }}>
          <Cascader
            data={items}
            action={'hover'}
            value={selectedKeys}
            selectedKeys={selectedKeys}
            separator={'/'}
            // popupVisible={true}
            // offsetX={10}
            onClick={this.onClick}
            onChange={this.onChange}
            disabled={false}
          />
        </Theme>
      </div>
    );
  }

  onClick = (e: Object, keys: Object) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys });
  };
  onChange = (target: Object) => {
    // console.log('target', target);
  };
}
