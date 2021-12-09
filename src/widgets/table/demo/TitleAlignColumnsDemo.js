import * as React from 'react';
import Table from '../index';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    titleAlign: 'right',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
    align: 'right',
    titleAlign: 'left',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
    align: 'center',
    titleAlign: 'left',
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
  },
];
const data = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Uzi', age: 36, address: 'some where', key: '3' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
];

export default class TitleAlignColumnsDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <Table columns={columns} data={data} />
        </div>
      </div>
    );
  }
}
