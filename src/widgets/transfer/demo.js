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

export default class TransferDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      targetKeys: [],
      sourceSelectedKeys: ['选项5'],
      targetSelectedKeys: ['选项2'],
    };
  }
  handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.info('sourceSelectedKeys ====>>>', sourceSelectedKeys);
    console.info('targetSelectedKeys ====>>>', targetSelectedKeys);
    this.setState({
      sourceSelectedKeys,
      targetSelectedKeys,
    });
  };
  handleDirectionClick = (nextTargetKeys: string[], type: 'right' | 'left', moveKey: string[]) => {
    this.setState({
      targetKeys: nextTargetKeys,
    });
  };
  render() {
    const { targetKeys, sourceSelectedKeys, targetSelectedKeys } = this.state;
    return (
      <div style={{ marginLeft: '30px', marginTop: '30px' }}>
        <Transfer
          data={data}
          showSearch
          sourceSelectedKeys={sourceSelectedKeys}
          targetSelectedKeys={targetSelectedKeys}
          targetKeys={targetKeys}
          onSelectChange={this.handleSelectChange}
          onDirectionClick={this.handleDirectionClick}
        />
        <Transfer
          data={data}
          showSearch
          defaultSourceSelectedKeys={['选项5']}
          defaultTargetSelectedKeys={['选项2']}
          defaultTargetKeys={['选项2', '选项3', '选项7']}
        />
      </div>
    );
  }
}
