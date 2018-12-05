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
        children: [{ test: '三级菜单4-1-1', value: '三级菜单4-1-1' }],
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
      selectedKeys: ['一级菜单6/次级菜单2/三级菜单1/sub1'],
      expandedPath: ['一级菜单6/次级菜单2/三级菜单1/sub1'],
    };
  }
  render() {
    const { selectedKeys, expandedPath } = this.state;

    return (
      <div>
        <Theme config={{ [Widget.Cascader]: { width: 200, menuWidth: 200 } }}>
          <Cascader
            data={items}
            action={'click'}
            value={selectedKeys}
            // selectedKeys={selectedKeys}
            // expandedPath={expandedPath}
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
    console.log('selectedKeys', selectedKeys);
    this.setState({ selectedKeys });
  };
  onChange = (target: Object) => {
    // console.log('target', target);
  };
}
