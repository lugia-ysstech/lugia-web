import * as React from 'react';
import EditTable from '../editTableView';

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
  },
  {
    title: 'Operations',
    dataIndex: 'operations',
    key: 'operations',
    render: () => <a href="javascript:;">Delete</a>,
  },
];

const data = [
  { name: 'Uzi', age: 28, address: 'some where', key: '1', description: 'I am ADC.' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '2', description: 'I am Jungle.' },
  { name: 'JackLove', age: 36, address: 'some where', key: '3', description: 'I am ADC.' },
  { name: 'Ming', age: 36, address: 'some where', key: '4', description: 'I am Assist .' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5', description: 'I am Ap.' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6', description: 'I am Top.' },
];

export default class TableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      selectRowKeys: [],
    };
  }

  selectChange = (value, checked, record) => {
    this.setState({ selectRowKeys: value });
  };

  render() {
    const { selectRowKeys } = this.state;
    return (
      <div>
        <EditTable
          data={data}
          columns={columns}
          allowEditHead={true}
          rowKey={'name'}
          scrollY={120}
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Ming' };
            },
            width: 60,
          }}
        />
      </div>
    );
  }
}
