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
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

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
        Container: {
          normal: {
            width: 250,
          },
        },
        Menu: {
          Container: {
            normal: {
              width: 200,
              height: 300,
              background: {
                color: '#ccc',
              },
              boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
            },
          },
          MenuItem: {
            MenuItemWrap: {
              normal: {
                height: 60,
                color: '#cc00cc',
                font: {
                  size: 16,
                },
              },
              hover: {
                color: '#fff',
                opacity: 0.9,
                font: {
                  fontWeight: 900,
                },
              },
            },

            SelectedMenuItemWrap: {
              normal: {
                font: {
                  size: 20,
                },
              },
            },
          },

          SubMenu: {
            Container: {
              normal: {
                width: 200,
                background: {
                  color: '#FFE4C4',
                },
              },
            },

            MenuItem: {
              MenuItemWrap: {
                normal: {
                  color: 'orange',
                },
              },
            },

            SubMenu: {
              Container: {
                normal: {
                  width: 200,
                  background: {
                    color: '#FFE4C4	',
                  },
                },
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
          // value={selectedKeys}
          // defaultValue={['a6/a6-2/a6-2-1/suba1/suba2']}
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
