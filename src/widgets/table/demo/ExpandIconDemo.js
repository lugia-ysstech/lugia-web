import * as React from 'react';
import Table from '../index';
import Icon from '../../icon';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
    render: () => <a href="#">Delete</a>,
  },
];

const data = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Rook', age: 22, address: 'some where', key: '3' },
  { name: 'Lise', age: 33, address: 'some where', key: '4' },
  { name: 'Lise', age: 33, address: 'some where', key: '5' },
  { name: 'Lise', age: 33, address: 'some where', key: '6' },
  { name: 'Lise', age: 33, address: 'some where', key: '7' },
  { name: 'asdasda', age: 33, address: 'some where', key: '8' },
  { name: 'asdasda', age: 33, address: 'some where', key: '9' },
  { name: 'asdasda', age: 33, address: 'some where', key: '10' },
];

export default class ExpandIconDemo extends React.Component {
  render() {
    return (
      <div>
        <h3>修改展开图标 传字符串</h3>
        <Table
          columns={columns}
          data={data}
          expandedRowRender={record => <p>{record.name}</p>}
          expandIcon={'lugia-icon-direction_caret_up'}
          collapseIcon={'lugia-icon-direction_caret_down'}
        />

        <br />
        <br />

        <h3>修改展开图标 传函数</h3>
        <Table
          columns={columns}
          data={data}
          expandedRowRender={record => <p>{record.name}</p>}
          expandIcon={() => <Icon iconClass={'lugia-icon-direction_arrow_down'} />}
          collapseIcon={() => <Icon iconClass={'lugia-icon-direction_arrow_up'} />}
        />
      </div>
    );
  }
}
