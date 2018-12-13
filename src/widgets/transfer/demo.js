/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Transfer from './group';

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
      targetKeys: [],
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
    return (
      <div style={{ marginLeft: '30px', marginTop: '30px' }}>
        {/*<Transfer*/}
        {/*data={data}*/}
        {/*showSearch*/}
        {/*sourceSelectedKeys={sourceSelectedKeys}*/}
        {/*targetSelectedKeys={targetSelectedKeys}*/}
        {/*targetKeys={targetKeys}*/}
        {/*onSelectChange={this.handleSelectChange}*/}
        {/*onDirectionClick={this.handleDirectionClick}*/}
        {/*/>*/}
        <Transfer
          data={data}
          showSearch
          defaultSourceSelectedKeys={['选项5']}
          defaultTargetSelectedKeys={['选项2']}
          defaultTargetKeys={['选项2', '选项3', '选项4']}
        />
        <Transfer
          data={treeData}
          type="tree"
          sourceSelectedKeys={['2.2.1']}
          targetSelectedKeys={['2.1.1']}
          targetKeys={['3.1', '3.2', '2.1.1']}
          showSearch
          displayValue={['dis1', 'dis2']}
        />
        <Transfer
          data={treeData}
          type="tree"
          defaultSourceSelectedKeys={['2.2.1']}
          defaultTargetSelectedKeys={['2.1.1']}
          defaultTargetKeys={['3.1', '3.2', '2.1.1']}
          showSearch
          displayValue={['dis1', 'dis2', '2.1.1']}
        />
      </div>
    );
  }
}
