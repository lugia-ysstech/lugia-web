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
import colors from '../css/stateColor';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

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

const theme = {
  [Widget.TreeSelect]: {
    Tree: {
      TreeWrap: {
        normal: {
          width: 500,
          height: 300,
          opacity: 1,
          background: { color: '#E086BB' },
          boxShadow: getBoxShadow('2px 2px 5px 5px #9C2D6E'),
          border: getBorder({ color: '#9C2D6E', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          // padding: {
          //   left: 20,
          //   right: 20,
          // },
          // margin: {
          //   left: 20,
          // },
        },
        hover: {
          opacity: 0.9,
          background: { color: '#F51196' },
          boxShadow: getBoxShadow('2px 2px 5px 5px #F51196'),
          border: getBorder({ color: '#F51196', width: 1, style: 'solid' }),
          // borderRadius: getBorderRadius(40),
        },
      },

      TreeItem: {
        TreeItemWrap: {
          normal: {
            background: { color: '#21EBE8' },
            border: getBorder({ color: '#F51196', width: 1, style: 'solid' }),

            // padding: { left: 30, right: 30 },
          },
          hover: {
            background: { color: '#119E9C' },
            color: 'white',
            // borderRadius: getBorderRadius(40),
          },
          active: {
            background: { color: '#036664' },
            // color: '#4d63ff',
          },
        },
        SelectedTreeItemWrap: {
          normal: {
            background: {
              color: '#000',
            },
          },
        },
        Text: {
          normal: {
            color: '#fff',
            width: 200,
            // background: { color: '#333' },
            font: { size: 14 },
            padding: {
              left: 20,
            },
            // border: getBorder({ color: '#F51196', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(40),
            // border: getBorder({ color: '#F51196', width: 1, style: 'solid' }),
          },
          hover: {
            color: 'red',
            background: { color: '#2982F5' },
            // border: getBorder({ color: '#F75993', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(10),
          },
          active: {
            color: '#fff',
            background: { color: '#ddd' },
            // border: getBorder({ color: '#ddd', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(40),
          },
        },
        SelectedText: {
          normal: {
            color: 'red',
            font: { size: 20 },
          },
        },
        SubTreeWrap: {
          normal: {
            background: { color: '#66eecc' },
          },
          hover: {
            background: { color: '#bbb' },
          },
        },
        Checkbox: {
          normal: {
            color: '#4d63ff',
          },
        },

        Switch: {
          normal: {
            color: '#F51196',
            font: {
              size: 20,
            },
          },
          hover: {
            color: '#4d63ff',
          },
        },
      },
    },

    InputTag: {
      InputTagWrap: {
        normal: {
          width: 340,
          height: 60,
          color: '#4d63ff',
          boxShadow: '2px 2px 5px #000',
          font: { size: 20 },
          // background: { color: '#eee' },
          borderRadius: getBorderRadius(20),
          // margin: {
          //   top: 40,
          //   left: 100,
          // },
          // padding: {
          //   left: '20',
          //   right: '30',
          // },
        },
        hover: {
          boxShadow: '2px 2px 5px #4d63ff',
          color: '#4d63ff',
          borderRadius: getBorderRadius(10),
        },
      },
      TagWrap: {
        normal: {
          height: 20,
          margin: {
            left: 50,
            right: 5,
          },
          padding: {
            left: 10,
            right: 10,
          },

          // border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 10 }),
        },
        hover: {
          background: { color: 'orange' },
        },
      },
      TagIcon: {
        normal: {
          font: { fontSize: 14, color: '#999' },
        },
        hover: {
          color: '#4d63ff',
        },
      },
      Icon: {
        normal: {
          color: '#ddd',
          font: { fontSize: 30 },
        },
        hover: { color: '#4d63ff' },
      },
      Menu: {
        Container: {
          normal: {
            width: 200,
            height: 200,
            opacity: 0.6,
            boxShadow: '2px 2px 5px #4d63ff',
            background: { color: '#000' },
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 20 }),
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
      },
    },
  },
};

export default class DefaultTreeSelect extends React.Component<any, any> {
  render() {
    return (
      <TreeSelect
        theme={theme}
        data={data}
        onlySelectLeaf
        valueField={'key'}
        displayField={'title'}
        igronSelectField="notCanSelect"
        expandAll
        // autoHeight
        mutliple
      />
    );
  }
}
