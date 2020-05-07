/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Theme from '../theme/index';
import TreeSelect from './index';
import Widget from '../consts/index';
import styled from 'styled-components';
import Icon from '../icon';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
const Box = styled.div`
  margin: 50px;
`;

const data = [
  { key: '1', title: '1' },
  { key: '1.1', title: '1.1', pid: '1', path: '1' },
  { key: '1.1.1', title: '1.1.1', pid: '1.1', path: '1/1.1' },
  { key: '1.1.1.1', title: '1.1.1.1', pid: '1.1.1', path: '1/1.1/1.1.1' },
  {
    key: '1.1.1.1.1',
    title: '1.1.1.1.1',
    pid: '1.1.1.1',
    path: '1/1.1/1.1.1/1.1.1.1',
    isLeaf: true,
  },
  { key: '1.2', title: '1.2', pid: '1', path: '1' },
  { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
  { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2' },
  { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2' },
  {
    key: '1.2.2.1.1',
    title: '1.2.2.1.1',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  {
    key: '1.2.2.1.2',
    title: '1.2.2.1.2',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true },

  { key: '1.3', title: '1.3', pid: '1', path: '1' },
  { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3' },
  { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3' },
  { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true },

  { key: '2', title: '2' },
  { key: '2.1', title: '2.1', pid: '2', path: '2' },
  { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true },
  { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1' },
  { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true },
  { key: '2.2', title: '2.2', pid: '2', path: '2' },
  { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2' },
  { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true },

  { key: '3', title: '3' },
  { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true },
  { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true },
  { key: '4', title: '4', isLeaf: true },
];

const info = [
  {
    value: '0',
    text: '北京分行',

    children: [
      // { value: '0-1-0', text: '朝阳支行办事处-1' },
      { value: '0-1-1', text: '朝阳支行办事处-2', children: [{ value: '0-111', text: '123' }] },
      {
        value: '0-2',
        text: '海淀支行办事处',
        icons: {
          prefixIconClass: 'lugia-icon-financial_heart',
          prefixIconSrc: '',
          suffixIconClass: 'lugia-icon-financial_contacts',
          suffixIconSrc: '',
        },
      },
      { value: '0-3', text: '石景山支行办事处' },
    ],
  },
  { value: '0-3', text: '石景山支行办事处' },
  { value: '0-4', text: '石景山支行办事处' },
  { value: '0-5', text: '石景山支行办事处' },
  { value: '0-6', text: '石景山支行办事处' },
  { value: '0-7', text: '石景山支行办事处' },
];

const theme = {
  [Widget.TreeSelect]: {
    Tree: {
      Container: {
        normal: {
          width: 202,
          height: 224,
          background: { color: '#fff' },
          boxShadow: getBoxShadow('0 0 6px 0 rgba(0,0,0,0.20)'),
          borderRadius: getBorderRadius(1),
        },
        hover: {},
      },

      TreeItem: {
        TreeItemWrap: {
          normal: {
            height: 28,
          },
          hover: {
            background: {
              color: '#4d63ff',
            },
          },
        },
        SelectedTreeItemWrap: {
          normal: {},
          hover: {
            background: {
              color: '#4d63ff',
            },
          },
        },
        Text: {
          normal: {},
          hover: {
            color: '#fff',
            background: { color: '' },
          },
        },
        SelectedText: {
          normal: {},
          hover: {
            color: '#fff',
            background: { color: '' },
          },
        },
        SubTreeWrap: {
          normal: {},
          hover: {},
        },

        SwitchIcon: {
          normal: {
            font: {
              size: 18,
            },
            color: 'red',
          },
          hover: {
            color: 'blue',
          },
        },
      },
    },

    Container: {
      normal: {
        width: 202,
        height: 28,
        padding: {
          left: 10,
          right: 4,
        },
        borderRadius: getBorderRadius(2),
        border: getBorder({ color: '#e8e8e8', width: 1, style: 'solid' }),
      },
      hover: {
        borderRadius: getBorderRadius(2),
        border: getBorder({ color: '#4d68ff', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('0 0 4px 0 rgba(77,104,255,0.3)'),
      },
    },
    SwitchIcon: {
      normal: {
        font: {
          size: 10,
        },
        color: '#a6aab2',
      },
      hover: {
        color: '#a6aab2',
      },
    },
  },
};

const iconConfig = {
  [Widget.Icon]: {
    Icon: {
      normal: {
        opacity: 0,
      },
      hover: {
        opacity: 1,
      },
    },
  },
};

export default class DefaultTreeSelect extends React.Component<any, any> {
  renderSuffix = item => {
    const { isLeaf } = item;
    if (isLeaf) {
      return <Icon theme={iconConfig} iconClass={'lugia-icon-reminder_check_square'} />;
    }
  };
  render() {
    return (
      <Box>
        <TreeSelect
          theme={theme}
          data={info}
          translateTreeData
          onlySelectLeaf
          expandAll
          autoHeight
          pullIconClass="lugia-icon-direction_caret_down"
          renderSuffixItems={this.renderSuffix}
          // autoHeight
          // mutliple
        />
      </Box>
    );
  }
}
