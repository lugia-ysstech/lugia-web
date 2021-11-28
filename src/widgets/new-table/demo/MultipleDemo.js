import * as React from 'react';
import EditTable from '../editTableView';
import Select from '../../select';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    mutliple: true,
    type: 'select',
    selectData: [
      { value: 1, text: '一个地址' },
      { value: 2, text: '2个地址' },
      { value: 3, text: '3个地址' },
      { value: 4, text: '4个地址' },
      { value: 5, text: '5个地址' },
      { value: 6, text: '6个地址' },
    ],

    customEditElement: a => {
      const {
        lugiaExtraData: { columnConfig, record },
      } = a;
      const { mutliple, dataIndex, selectData } = columnConfig;
      const { [dataIndex]: value } = record;

      const onChange = event => {
        const { newValue, oldValue, newItem } = event;
        console.log({ oldValue, newValue, newItem });
        a.listener.emit('quitEdit', { oldValue, newValue, newItem, isQuit: false });
      };

      return <Select mutliple={mutliple} value={value} data={selectData} onChange={onChange} />;
    },
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
    render: () => <a href="javascript:;">Delete</a>,
  },
];

const data = [
  { name: 'Jack', age: 28, address: 1, key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Uzi', age: 36, address: 'some where', key: '3' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
];

export default class TableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
    };
  }

  onChange = data => {
    this.setState({ data: data.data });
  };

  getTextData = (item, text, record) => {
    const { type, dataIndex, selectData } = item;
    if (type === 'select') {
      const value = record[dataIndex];

      if (Array.isArray(value)) {
        const valueText = [];
        for (const data of value) {
          const current = selectData.find(dataitem => {
            return dataitem.value === data;
          });
          valueText.push(current ? current.text : data);
        }
        return valueText.join(',');
      }
      const current = selectData.find(dataitem => {
        return dataitem.value === value;
      });
      return current ? current.text : text;
    }
    return text;
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <EditTable
          columns={columns.map((item: any) => {
            const { render } = item;
            if (render) {
              return item;
            }
            item.render = (text: string, record: ItemType) => {
              return <p> {this.getTextData(item, text, record)}</p>;
            };
            return item;
          })}
          data={data}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
