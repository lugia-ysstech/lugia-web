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
      { value: '1-1', text: '和平支行办事处' },
      { value: '1-2', text: '河东支行办事处' },
      { value: '1-3', text: '南开支行办事处' },
    ],
  },
];
const switchIconNames = {
  open: 'lugia-icon-direction_down',
  close: 'lugia-icon-direction_right',
};

export default () => {
  return (
    <div>
      <Tree
        data={info}
        expandAll
        theme={config}
        translateTreeData
        autoHeight
        parentIsHighlight
        onlySelectLeaf
        // mutliple
        // __navmenu
        switchIconNames={switchIconNames}
      />
      <Tree
        data={info}
        expandAll
        theme={config}
        translateTreeData
        autoHeight
        parentIsHighlight
        onlySelectLeaf
        mutliple
        // __navmenu
        switchIconNames={switchIconNames}
      />
    </div>
  );
};
