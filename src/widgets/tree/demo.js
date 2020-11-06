/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from './index.js';
import Widget from '../consts/index';
import { getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import styled from 'styled-components';
import Theme from '../theme';

const config = {
  [Widget.Tree]: {
    Container: {
      normal: {
        width: 500,
      },
    },

    TreeItem: {
      TreeItemWrap: {
        normal: {
          height: 50,
          // border: {
          //   top: { color: 'orange', style: 'solid', width: 1 },
          // },
          // padding: {
          //   left: 10,
          // },
          background: {
            color: '#FFAEB9',
          },
          opacity: 1,
          borderRadius: getBorderRadius(10),
        },
        hover: {
          background: {
            color: '#EE2C2C',
          },
          opacity: 0.8,
          borderRadius: getBorderRadius(40),
        },
      },
      SelectedTreeItemWrap: {},
      Text: {
        normal: {
          height: 30,
          font: {
            size: 20,
          },
          padding: {
            // left: 50,
          },
          color: '#FFFF00',
          // border: {
          //   bottom: { color: '#DBDBDB', style: 'solid', width: 3 },
          // },
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('0 0 5px 5px #4d63ff'),
          background: { color: 'orange' },
        },
        hover: {
          background: {
            color: '#EE1289',
          },
          color: '#4d63ff',
          borderRadius: getBorderRadius(0),
          boxShadow: getBoxShadow('0 0 5px 10px #CAFF70'),
        },
      },
      SelectedText: {
        normal: {
          font: {
            size: 16,
          },
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
          border: {
            bottom: { color: '#DBDBDB', style: 'solid', width: 1 },
          },
          borderRadius: getBorderRadius(0),
        },
        hover: {
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
        },
      },

      PrefixIcon: {
        normal: {
          fontSize: 12,
          color: 'red',
        },
        hover: {
          fontSize: 20,
          color: '#4d63ff',
        },
      },

      SuffixIcon: {
        normal: {
          fontSize: 12,
          color: 'red',
        },
        hover: {
          fontSize: 20,
          color: '#4d63ff',
        },
      },

      SubTreeWrap: {
        normal: {
          background: { color: '#F8F8FF' },
        },
      },

      SwitchIcon: {
        normal: {
          font: {
            size: 20,
          },
          color: 'red',
        },
        hover: {
          color: 'blue',
        },
      },
      // Switch: {
      //   normal: {
      //     color: '#F51196',
      //     font: {
      //       size: 20,
      //     },
      //   },
      //   hover: {
      //     color: '#4d63ff',
      //   },
      //   disabled: {
      //     background: {
      //       color: 'red',
      //     },
      //     color: 'red',
      //   },
      // },
    },
  },
};

const info = [
  {
    value: '0',
    text: '北京分行',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      prefixIconSrc: '',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
    icon: 'lugia-icon-direction_play_circle',

    children: [
      {
        value: '0-1',
        text: '朝阳支行办事处',
        children: [
          { value: '0-1-0', text: '朝阳支行办事处-1' },
          { value: '0-1-1', text: '朝阳支行办事处-2' },
        ],
      },
      { value: '0-2', text: '海淀支行办事处' },
      { value: '0-3', text: '石景山支行办事处' },
    ],
  },
  {
    value: '1',
    text: '天津分行',
    children: [
      {
        value: '1-1',
        text: '和平支行办事处',
        children: [
          { value: '0-3-0', text: '朝阳支行办事处-1' },
          { value: '0-3-1', text: '朝阳支行办事处-2' },
        ],
      },
      { value: '1-2', text: '河东支行办事处' },
      { value: '1-3', text: '南开支行办事处' },
      { value: '1-4', text: '和平支行办事处1' },
    ],
  },
  {
    value: '2',
    text: '南京分行',
    children: [
      {
        value: '2-3',
        text: '南京分行--1',
      },
      { value: '2-4', text: '南京分行--1' },
    ],
  },
];
const switchIconNames = {
  open: 'lugia-icon-direction_down',
  close: 'lugia-icon-direction_right',
};

const RowWrap = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
`;

const RowWrapItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const H1 = styled.h1`
  text-align: center;
  background: #000;
  color: #fff;
`;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class TreeDome extends React.Component {
  constructor(props: TreeProps) {
    super(props);
    this.state = {
      expandKeys: [],
      data: info,
    };
  }
  onExpand = (a, b, c) => {
    console.log('a', a, b);
    // this.setState({ expandKeys: a });
  };
  onSelect = (a, b, c) => {
    console.log('onSelect', a, b);
  };
  onClick = () => {
    const obj = {
      value: random(3, 100),
      text: `xx${random(3, 100)}分行`,
    };
    this.setState({
      data: [
        {
          value: '0',
          text: '北京分行',
          icons: {
            prefixIconClass: 'lugia-icon-financial_heart',
            prefixIconSrc: '',
            suffixIconClass: 'lugia-icon-financial_contacts',
            suffixIconSrc: '',
          },
          icon: 'lugia-icon-direction_play_circle',
          children: [
            {
              value: '0-1',
              text: '朝阳支行办事处',
              children: [
                { value: '0-1-0', text: '朝阳支行办事处-1' },
                { value: '0-1-1', text: '朝阳支行办事处-2' },
              ],
            },
            { value: '0-2', text: '海淀支行办事处' },
            { value: '0-3', text: '石景山支行办事处' },
          ],
        },
        obj,
      ],
    });
  };
  render() {
    return [
      <H1>普通</H1>,
      <RowWrap>
        <RowWrapItem>
          <Tree
            data={info}
            expandAll
            theme={config}
            translateTreeData
            autoHeight
            parentIsHighlight
            onlySelectLeaf
            query="南"
            // mutliple
            // __navmenu
            switchIconNames={switchIconNames}
          />
        </RowWrapItem>
        <RowWrapItem>
          <Tree
            data={info}
            expandAll
            theme={config}
            translateTreeData
            autoHeight
            parentIsHighlight
            onlySelectLeaf
            mutliple
            query="南"
            // __navmenu
            switchIconNames={switchIconNames}
          />
        </RowWrapItem>
      </RowWrap>,
      <H1>刷新data数据,不丢失展开项</H1>,
      <RowWrap>
        <Tree
          data={this.state.data}
          parentIsHighlight
          autoHeight
          translateTreeData
          onExpand={this.onExpand}
          switchIconNames={switchIconNames}
        />
        <button onClick={this.onClick}>修改data数据</button>
      </RowWrap>,
      <H1>InjectProps传入data值</H1>,
      <RowWrap>
        <Theme
          config={{
            HHHHH: {
              InjectProps: {
                data: [
                  {
                    value: '一级节点-1',
                    text: '一级节点-1',
                    children: [
                      {
                        value: '二级节点1-1',
                        text: '二级节点1-1',
                      },
                      {
                        value: '二级节点1-2',
                        text: '二级节点1-2',
                      },
                    ],
                  },
                  {
                    value: '一级节点-2',
                    text: '一级节点-2',
                    children: [
                      {
                        value: '二级节点2-1',
                        text: '二级节点2-1',
                      },
                      {
                        value: '二级节点2-2',
                        text: '二级节点2-2',
                      },
                    ],
                  },
                ],
              },
            },
          }}
        >
          <Tree viewClass={'HHHHH'} translateTreeData />
        </Theme>
      </RowWrap>,
    ];
  }
}
