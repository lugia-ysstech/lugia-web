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
import { px2remcss } from '../css/units';

const data = [
  { text: '选项1', value: '选项1', disabled: false },
  { text: '选项2', value: '选项2', disabled: false },
  { text: '选项3', value: '选项3', disabled: false },
  { text: '选项4', value: '选项4', disabled: false },
  { text: '选项5', value: '选项5', disabled: true },
  { text: '选项6', value: '选项6', disabled: false },
  { text: '选项7', value: '选项7', disabled: false },
  { text: '选项8', value: '选项8', disabled: false },
  { text: '选项9', value: '选项9', disabled: false },
  { text: '选项0', value: '选项0', disabled: true },
  { text: '选项10', value: '选项10', disabled: true },
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

export default class TransferDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      targetKeys: ['选项3', '选项7', '选项9'],
      sourceSelectedKeys: ['选项5'],
      targetSelectedKeys: [],
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
          MenuWrap: {
            normal: { height: 500 },
          },
        },
        TransferPanelTree: {
          TreeWrap: {
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
      },
    };
    // height: 400,
    // width: 300,
    return (
      <div style={{ marginLeft: '30px', marginTop: '30px' }}>
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
      </div>
    );
  }
}
