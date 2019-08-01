/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Cascader from './index';
import styled from 'styled-components';
import Widget from '../consts/index';
import { getBorder } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';

const Box = styled.div`
  padding-bottom: 500px;
`;

const data = [
  {
    text: '一级菜单1',
    value: 'a1',
    disabled: false,
  },
  { text: '一级菜单2', value: 'a2', disabled: false },
  { text: '一级菜单3', value: 'a3', disabled: false },
  {
    text: '一级菜单4',
    value: 'a4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: 'a4-1',
        children: [{ text: '三级菜单4-1-1', value: 'a4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: 'a5', disabled: true },
  {
    text: '一级菜单6',
    value: 'a6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: 'a6-1' },
      {
        text: '次级菜单6-2',
        value: 'a6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: 'a6-2-1',
            children: [
              { text: 'sub1', value: 'suba1', children: [{ text: 'sub2', value: 'suba2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: 'a6-2-2' },
          { text: '三级菜单6-2-3', value: 'a6-2-3' },
        ],
      },
    ],
  },
  { text: '一级菜单7', value: 'a7', disabled: true },
  { text: '一级菜单8', value: 'a8', disabled: false },
  { text: '一级菜单9', value: 'a9', disabled: true },
  { text: '一级菜单10', value: 'a10', disabled: false },
];

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: 'a6/a6-2/a6-2-1/suba1/suba2',
      data,
    };
  }
  render() {
    const { selectedKeys, data } = this.state;
    const config = {
      [Widget.Cascader]: {
        Menu: {
          MenuWrap: {
            normal: {
              width: 200,
              height: 350,
              opacity: 0.6,
              boxShadow: '2px 2px 5px #4d63ff',
              background: { color: '#000' },
              border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
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
          MenuWrap: {
            normal: { width: 200, height: 350, fontSize: 14, background: { color: '#ccc' } },
          },
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

        InputTag: {
          InputTagWrap: {
            normal: {
              width: 500,
              height: 60,
              color: '#4d63ff',
              boxShadow: '2px 2px 5px #000',
              font: { size: 20 },
              borderRadius: getBorderRadius(20),
              hover: {
                boxShadow: '2px 2px 5px #4d63ff',
                color: '#4d63ff',
                borderRadius: getBorderRadius(10),
              },
            },
          },
        },
      },
    };

    return (
      <Box>
        <Cascader
          theme={config}
          data={data}
          action={'hover'}
          value={selectedKeys}
          defaultValue={['a6/a6-2/a6-2-1/suba1/suba2']}
          separator={'/'}
          onClick={this.onClick}
          onChange={this.onChange}
          disabled={false}
          showAllLevels={false}
          placeholder={'请选择'}
          allowClear={true}
          onClear={this.onClear}
        />
      </Box>
    );
  }

  onClick = (e: Object, keys: Object) => {
    // const { selectedKeys } = keys;
    // this.setState({ selectedKeys });
  };
  onChange = (target: Object) => {};

  onClear = () => {
    this.setState({ selectedKeys: [] });
  };
}
