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
import Modal from '../modal';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
const Box = styled.div`
  margin: 50px;
`;

const data = [
  { key: '1', title: '中国' },
  {
    key: '1.1',
    title: '北京',
    pid: '1',
    path: '1',
  },
  { key: '1.1.1', title: '昌平', pid: '1.1', path: '1/1.1' },
  {
    key: '1.1.1.1',
    title: '海淀',
    pid: '1.1.1',
    path: '1/1.1/1.1.1',
    isLeaf: true,
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      suffixIconClass: 'lugia-icon-financial_contacts',
    },
  },

  { key: '1.2', title: '山西', pid: '1', path: '1' },
  { key: '1.2.1', title: '大同', pid: '1.2', path: '1/1.2', isLeaf: true },
  { key: '1.2.2', title: '太原', pid: '1.2', path: '1/1.2' },
  { key: '1.2.2.1', title: '迎泽街', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true },

  { key: '1.3', title: '上海', pid: '1', path: '1' },
  { key: '1.3.1', title: '外滩', pid: '1.3', path: '1/1.3' },
  { key: '1.3.1.1', title: '外滩海边', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { key: '1.3.1.2', title: '外滩小区', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { key: '1.3.2', title: '黄浦区', pid: '1.3', path: '1/1.3' },
  { key: '1.3.2.1', title: '海宁路', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { key: '1.3.2.2', title: '延安路', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { key: '1.3.3', title: '长宁区', pid: '1.3', path: '1/1.3', isLeaf: true },

  { key: '2', title: '朝鲜' },
  { key: '2.1', title: '平壤', pid: '2', path: '2' },
  { key: '2.1.2', title: '平壤街道', pid: '2.1', path: '2/2.1', isLeaf: true },

  { key: '3', title: '韩国' },
  { key: '3.1', title: '首尔', pid: '3', path: '3', isLeaf: true },
  { key: '3.2', title: '釜山', pid: '3', path: '3', isLeaf: true },

  { key: '4', title: '日本', isLeaf: true },
];

const info = [
  {
    value: '0',
    text: '北京分行',

    children: [
      // { value: '0-1-0', text: '朝阳支行办事处-1' },
      { value: '0-1', text: '朝阳支行办事处-2', children: [{ value: '0-111', text: '123' }] },
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
    ],
  },
  { value: '0-3', text: '天津分行' },
  { value: '0-4', text: '山西分行' },
  { value: '0-5', text: '上海分行' },
  { value: '0-6', text: '汉南分行' },
  { value: '0-7', text: '河南分行' },
];

const theme = {
  [Widget.TreeSelect]: {
    Tree: {
      Container: {
        normal: {
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
        width: 400,
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

const treeSelectTheme = {
  [Widget.TreeSelect]: {
    QueryInput: {
      Container: {
        normal: {
          width: 200,
          border: getBorder({ width: 1, color: 'red', style: 'solid' }),
        },
      },
      Placeholder: {
        normal: {
          color: '#eee',
        },
      },
      ClearButton: {
        normal: {
          color: 'yellow',
        },
      },
    },
    ToggleIcon: {
      normal: {
        color: 'red',
      },
    },
    ResetIcon: {
      normal: {
        color: 'yellow',
      },
    },
    SearchAddIcon: {
      normal: {
        color: 'lightblue',
      },
    },
    SearchIcon: {
      normal: {
        color: 'red',
      },
    },
    CheckAllIcon: {
      normal: {
        color: 'brown',
      },
    },
    DeselectionIcon: {
      normal: {
        color: 'pink',
      },
    },
    Tree: {
      TreeItem: {
        PrefixIcon: {
          normal: {
            color: 'blue',
          },
        },
        SuffixIcon: {
          normal: {
            color: 'orange',
          },
        },
        SelectedPrefixIcon: {
          normal: {
            color: 'red',
          },
        },
        SelectedSuffixIcon: {
          normal: {
            color: 'yellow',
          },
        },
      },
    },
    TagIcon: {
      normal: {
        color: 'red',
      },
    },
  },
};
const switchIconNames = {
  open: 'lugia-icon-logo_windows',
  close: 'lugia-icon-logo_windows_o',
};

export default class DefaultTreeSelect extends React.Component<any, any> {
  constructor(props: TreeSelectProps) {
    super(props);
    this.state = {
      value1: ['0'],
      value: ['1.1.1.1', '1.2.1', '0-4'],
      visible: false,
    };
  }

  renderSuffix = item => {
    const { isLeaf } = item;
    if (isLeaf) {
      return <Icon theme={iconConfig} iconClass={'lugia-icon-reminder_check_square'} />;
    }
  };
  onClick = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return [
      <Box>
        <Modal visible={this.state.visible} onOk={this.onClick} onCancel={this.onClick}>
          <TreeSelect theme={theme} createPortal={true} />
        </Modal>
        <button onClick={this.onClick}>打开Modal对话框</button>
      </Box>,
      <Box>
        <TreeSelect
          theme={theme}
          // valueField={'key'}
          // displayField={'title'}
          value={this.state.value1}
          pathSeparator={'/'}
          data={info}
          translateTreeData
          onlySelectLeaf={false}
          onSelect={obj => {
            console.log('onSelect=====>', obj);
          }}
          onChange={obj => {
            console.log('=====>', obj);
            const { newValue } = obj;
            this.setState({ value1: newValue });
          }}
          expandAll
          autoHeight
          pullIconClass="lugia-icon-direction_caret_down"
          renderSuffixItems={this.renderSuffix}
          // autoHeight
          // mutliple
        />
      </Box>,
      <Box>
        <TreeSelect
          theme={theme}
          valueField={'key'}
          displayField={'title'}
          value={this.state.value}
          pathSeparator={'/'}
          data={data}
          onlySelectLeaf={true}
          onSelect={obj => {
            console.log('onSelect=====>', obj);
          }}
          onChange={obj => {
            console.log('onChange=====>', obj);
            const { newValue } = obj;
            this.setState({ value: newValue });
          }}
          expandAll
          autoHeight
          pullIconClass="lugia-icon-direction_caret_down"
          renderSuffixItems={this.renderSuffix}
          mutliple
        />
      </Box>,
      <Box>
        <h2>主题配置</h2>
        <Theme config={treeSelectTheme}>
          <TreeSelect
            valueField={'key'}
            displayField={'title'}
            value={this.state.value}
            pathSeparator={'/'}
            data={data}
            onlySelectLeaf={true}
            onSelect={obj => {
              console.log('onSelect=====>', obj);
            }}
            onChange={obj => {
              console.log('onChange=====>', obj);
              const { newValue } = obj;
              this.setState({ value: newValue });
            }}
            expandAll
            pullIconClass="lugia-icon-direction_caret_down"
            renderSuffixItems={this.renderSuffix}
            toggleIcon="lugia-icon-logo_twitter"
            searchClearIcon="lugia-icon-logo_android"
            searchAddIcon="lugia-icon-logo_baidu"
            resetIcon="lugia-icon-financial_remote_control"
            searchIcon="lugia-icon-financial_wifi"
            checkAllIcon="lugia-icon-financial_like_o"
            deselectionIcon="lugia-icon-financial_unlike_o"
            switchIconNames={switchIconNames}
            singleClearIcon="lugia-icon-reminder_close_square"
            canSearch
            canInput
            mutliple
          />
        </Theme>
      </Box>,
    ];
  }
}
