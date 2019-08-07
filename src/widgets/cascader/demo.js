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
        Menu: {
          MenuWrap: {
            normal: {
              width: 200,
              height: 300,
              // opacity: 0.7,
              background: {
                color: '#ccc',
              },
              padding: {
                left: 10,
                top: 30,
                //   right: 30,
              },
              margin: {
                left: 20,
                top: 20,
              },
              border: getBorder({ color: '#ff3366', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
              boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
            },
            hover: {
              background: {
                color: '#ff66cc',
              },
              // opacity: 1,
              border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
              boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
            },
          },
          MenuItem: {
            MenuItemWrap: {
              normal: {
                height: 60,
                background: { color: '#ff99cc' },
                color: '#cc00cc',
                // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(20),
                padding: {
                  left: 60,
                  top: 0,
                },
                font: {
                  size: 16,
                },
              },
              hover: {
                color: '#fff',
                background: {
                  color: '#660066',
                },
                opacity: 0.9,
                font: {
                  fontWeight: 900,
                },
                // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(20),
              },

              active: {
                color: '#4d63ff',
                background: {
                  color: 'ff0099',
                },
                opacity: 0.9,
                font: {
                  fontWeight: 900,
                },
                // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(60),
              },

              disabled: {
                background: { color: '#ff99cc' },
                color: 'red',
                borderRadius: getBorderRadius(60),
                opacity: 0.7,
                padding: {
                  left: 30,
                  top: 0,
                },
                font: {
                  size: 26,
                },
              },
            },

            SelectedMenuItemWrap: {
              normal: {
                height: 80,
                background: { color: '#cc00ff' },
                color: '#fff',
                // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(80),
                padding: {
                  left: 30,
                },
                font: {
                  size: 20,
                },
              },
              hover: {
                color: '#4d63ff',
                background: {
                  color: '#ffffcc',
                },
                opacity: 1,
                font: {
                  fontWeight: 900,
                },
                // border: getBorder({ color: '#336699', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(60),
              },

              active: {
                color: '#cc0000',
                background: {
                  color: 'ff9900',
                },
                opacity: 1,
                font: {
                  fontWeight: 900,
                },
                // border: getBorder({ color: '#000033', width: 1, style: 'solid' }),
                borderRadius: getBorderRadius(0),
              },
            },

            Divider: {
              normal: { background: { color: 'red' } },
            },

            Checkbox: {
              CheckboxText: {
                normal: {
                  color: 'red',
                  font: { fontSize: 22, fontWeight: 500 },
                },
                hover: { color: 'green', font: { fontSize: 16, fontWeight: 500 } },
                disabled: { color: 'yellow', font: { fontSize: 16, fontWeight: 500 } },
              },
            },
          },

          SubMenu: {
            MenuWrap: {
              normal: {
                width: 100,
                background: {
                  color: '#660033',
                },
              },
            },

            MenuItem: {
              MenuItemWrap: {
                normal: {
                  color: '#fff',
                },
              },
            },

            SubMenu: {
              MenuWrap: {
                normal: {
                  width: 200,
                  background: {
                    color: '#777777',
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
