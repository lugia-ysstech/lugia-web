/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Transfer from './group';
import Widget from '../consts/index';
import Theme from '../theme';

const data = [
  { text: '选项1', value: 'key-1', disabled: false },
  { text: '选项2', value: 'key-2', disabled: false },
  { text: '选项3', value: 'key-3', disabled: false },
  { text: '选项4', value: 'key-4', disabled: false },
  { text: '选项5', value: 'key-5', disabled: true },
  { text: '选项6', value: 'key-6', disabled: false },
  { text: '选项7', value: 'key-7', disabled: false },
  { text: '选项8', value: 'key-8', disabled: false },
  { text: '选项9', value: 'key-9', disabled: false },
  { text: '选项0', value: 'key-0', disabled: true },
  { text: '选项10', value: 'key-10', disabled: true },
];
const treeData = [
  { text: '1', value: '1' },
  {
    text: '2',
    value: '2',
    children: [
      {
        text: '2.1',
        value: '2.1',
        children: [{ text: '2.1.1', value: '2.1.1' }, { text: '2.1.2', value: '2.1.2' }],
      },
      {
        text: '2.2',
        value: '2.2',
        children: [{ text: '2.2.1', value: '2.2.1' }, { text: '2.2.2', value: '2.2.2' }],
      },
    ],
  },
];
const transferButtonIcon = {
  transferLeftButtonIcon: 'lugia-icon-direction_caret_right',
  transferRightButtonIcon: 'lugia-icon-direction_caret_left',
};

export default class TransferDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      targetKeys: ['选项3', '选项7', '选项9'],
      sourceSelectedKeys: ['选项5'],
      targetSelectedKeys: [],
      fruitsData: [],
    };
  }
  handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    this.setState({
      sourceSelectedKeys,
      targetSelectedKeys,
    });
  };
  handleDirectionClick = (nextTargetKeys: string[], type: 'right' | 'left', moveKey: string[]) => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    if (type === 'left') {
      this.setState({
        targetSelectedKeys: this.getKeys(targetSelectedKeys, moveKey),
      });
    } else {
      this.setState({
        sourceSelectedKeys: this.getKeys(sourceSelectedKeys, moveKey),
      });
    }
    this.setState({
      targetKeys: nextTargetKeys,
    });
  };
  getKeys = (oldKey: string[], moveKey: string[]) => {
    const keys = [];
    oldKey.forEach(item => {
      if (!moveKey.includes(item)) {
        keys.push(item);
      }
    });
    return keys;
  };

  componentDidMount() {
    this.setState({ fruitsData: this.createFruitsData() });
  }

  createRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  createFruitsData = () => {
    const fruits = [
      '苹果',
      '沙果',
      '海棠',
      '野樱莓',
      '枇杷',
      '欧楂',
      '山楂',
      '香梨',
      '雪梨',
      '杏',
      '樱桃',
      '水蜜桃',
      '油桃',
      '蟠桃等',
      '李子',
      '梅子',
      '西梅',
    ];
    const data = [];
    const exist = {};
    for (let i = 0; i < 10; i++) {
      const value = fruits[this.createRandom(1, fruits.length)];
      if (exist[value]) {
        i--;
      } else {
        exist[value] = true;
        data.push({ text: value, value, disabled: false });
      }
    }
    return data;
  };

  changeData = () => {
    this.setState({ fruitsData: this.createFruitsData() });
  };

  render() {
    const { targetKeys, sourceSelectedKeys, targetSelectedKeys } = this.state;
    const TransferView = {
      [Widget.Transfer]: {
        TransferWrap: {
          normal: {
            width: 700,
            height: 500,
            margin: 10,
            padding: 10,
            background: { color: 'orange' },
            border: getBorder({ width: 1, style: 'solid', color: 'red' }),
            borderRadius: getBorderRadius(10),
          },
        },
        TransferPanel: {
          normal: {
            width: 210,
            height: 300,
            margin: 10,
            padding: 0,
            background: { color: '#fff' },
            border: getBorder({ width: 1, style: 'solid', color: 'red' }),
            borderRadius: getBorderRadius(10),
            boxShadow: getBoxShadow('0 4px 12px rgba(0, 0, 0, 0.15)'),
            opacity: 0.8,
          },
        },
        TransferHeaderWrap: {
          normal: {
            background: { color: 'pink' },
            border: getBorder({ width: 1, style: 'solid', color: 'green' }),
          },
        },
        TransferPanelHeaderCheckbox: {
          CheckboxText: {
            normal: {
              color: 'red',
            },
          },
          CheckboxEdgeIndeterminate: {
            normal: {
              background: { color: 'red' },
            },
          },
        },
        TransferHeaderText: {
          normal: {
            color: 'green',
            font: { size: 16, weight: 500 },
            padding: 0,
          },
        },
        TransferCancelBox: {
          normal: {
            width: 200,
            height: 70,
            background: 'pink',
            margin: 0,
            padding: 0,
          },
        },
        TransferCancelCheckbox: {
          CheckboxEdgeCancel: {
            normal: {
              background: {
                color: 'pink',
              },
            },
          },
        },
        TransferPanelMenu: {
          Container: {
            normal: { height: 500 },
          },
        },
        TransferPanelTree: {
          Container: {
            normal: { height: 500 },
          },
        },
        TransferButton: {
          ButtonWrap: {
            normal: {
              width: 100,
              height: 50,
              padding: 9,
              margin: 10,
              background: { color: 'orange' },
              border: getBorder({ width: 2, style: 'solid', color: 'green' }),
              borderRadius: getBorderRadius(10),
            },
            hover: {
              background: { color: 'yellow' },
              border: getBorder({ width: 2, style: 'solid', color: 'red' }),
            },
            active: {
              background: { color: 'red' },
              border: getBorder({ width: 2, style: 'solid', color: 'yellow' }),
            },
            disabled: {
              background: { color: 'green' },
              border: getBorder({ width: 2, style: 'solid', color: 'pink' }),
            },
            focus: {
              background: { color: 'pink' },
              border: getBorder({ width: 2, style: 'solid', color: 'green' }),
            },
          },
        },
        TransferSearchInput: {
          Container: {
            normal: {
              width: 160,
              margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              },
            },
          },
          Input: {
            normal: {
              background: { color: 'red' },
            },
          },
        },
      },
    };
    const transferTheme = {
      [Widget.Transfer]: {
        TransferPanelMenu: {
          Container: {
            normal: { height: 500 },
          },
          MenuItem: {
            Text: {
              normal: {
                color: 'blue',
              },
            },
            CheckedText: {
              normal: {
                color: 'red',
              },
            },
          },
        },
        TransferButton: {
          Container: {
            normal: {
              background: {
                color: 'red',
              },
            },
          },
        },
      },
    };
    const { fruitsData } = this.state;
    return (
      <div style={{ marginLeft: '30px', marginTop: '30px' }}>
        <Transfer />
        <Transfer type="tree" />
        <button onClick={this.changeData}>异步加载数据</button>
        <Transfer data={fruitsData} defaultValue={['枇杷', '杏', '水蜜桃', '李子']} />

        <Transfer
          data={data}
          showSearch
          sourceSelectedKeys={sourceSelectedKeys}
          targetSelectedKeys={targetSelectedKeys}
          value={targetKeys}
          onSelectChange={this.handleSelectChange}
          onDirectionClick={this.handleDirectionClick}
        />
        <Transfer
          data={data}
          showSearch
          defaultSourceSelectedKeys={['选项5']}
          defaultTargetSelectedKeys={['选项2']}
          defaultValue={['选项2', '选项3', '选项4']}
        />
        <p>theme: height:400</p>
        <Theme config={TransferView}>
          <Transfer
            data={data}
            showSearch
            defaultSourceSelectedKeys={['选项5']}
            defaultTargetSelectedKeys={['选项2']}
            defaultValue={['选项2', '选项3', '选项4']}
          />
        </Theme>

        <p>normal tree transfer</p>
        <Transfer
          data={treeData}
          type="tree"
          sourceSelectedKeys={['2.2.1']}
          targetSelectedKeys={['2.1.1']}
          value={['2.1.1']}
          showSearch
        />
        <p>cancel tree transfer</p>
        <Transfer
          data={treeData}
          type="tree"
          sourceSelectedKeys={['2.2.1']}
          targetSelectedKeys={['2.1.1']}
          value={['3.1', '3.2', '3.3', '2.1.1']}
          showSearch
          displayValue={['dis1', 'dis2', 'dis3']}
        />
        <Transfer
          data={treeData}
          type="tree"
          defaultSourceSelectedKeys={['2.2.1']}
          defaultTargetSelectedKeys={['2.1.1']}
          defaultValue={['3.1', '3.2', '2.1.1']}
          showSearch
          defaultDisplayValue={['dis1', 'dis2', '2.1.1']}
        />
        <p>theme: height:400</p>
        <Theme config={TransferView}>
          <Transfer
            data={treeData}
            type="tree"
            defaultSourceSelectedKeys={['2.2.1']}
            defaultTargetSelectedKeys={['2.1.1']}
            defaultValue={['3.1', '3.2', '2.1.1']}
            showSearch
            defaultDisplayValue={['dis1', 'dis2', '2.1.1']}
          />
        </Theme>
        <p>测试公共值</p>
        <br />
        <Transfer
          data={data}
          showSearch
          defaultSourceSelectedKeys={['选项5']}
          defaultTargetSelectedKeys={['选项2']}
          defaultValue={['选项2', '选项3', '选项4']}
        />

        <Transfer
          data={treeData}
          type="tree"
          defaultSourceSelectedKeys={['2.2.1']}
          defaultTargetSelectedKeys={['2.1.1']}
          defaultValue={['3.1', '3.2', '2.1.1']}
          showSearch
          defaultDisplayValue={['dis1', 'dis2', '2.1.1']}
        />

        <br />
        <br />
        <br />
        <h2>主题</h2>
        <Theme config={transferTheme}>
          <Transfer
            data={data}
            showSearch
            sourceSelectedKeys={sourceSelectedKeys}
            targetSelectedKeys={targetSelectedKeys}
            value={targetKeys}
            transferButtonIcon={transferButtonIcon}
            onSelectChange={this.handleSelectChange}
            onDirectionClick={this.handleDirectionClick}
          />
        </Theme>
      </div>
    );
  }
}
