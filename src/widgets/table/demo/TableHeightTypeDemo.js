import * as React from 'react';
import Table from '../index';

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
    dataIndex: '',
    key: 'operations',
    render: () => <a href="javascript:;">Delete</a>,
  },
];

const data = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Uzi', age: 36, address: 'some where', key: '3' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
];

export default class TableHeightTypeDemo extends React.Component {
  render() {
    return (
      <div>
        <p>
          表格高度展示 默认：tableHeightType 不传时,如果想设置表格高度，主题高度值需要时数字类型
        </p>
        <Table
          columns={columns}
          data={data}
          viewClass={'Table'}
          theme={{
            Table: {
              Container: { normal: { height: 300 } },
            },
          }}
        />
        <p>表格高度展示-fixed：表格高度固定</p>
        <p>固定高度：需要有高度值</p>
        <Table
          columns={columns}
          data={data}
          lugiadLayout={{ heightType: 'fixed' }}
          viewClass={'Table'}
          theme={{ Table: { Container: { normal: { height: '200px' } } } }}
        />
        <p>固定高度：fixed 无高度值时，默认被自己的内容填充</p>
        <Table columns={columns} data={data} lugiadLayout={{ heightType: 'fixed' }} />

        <p>表格高度展示-auto：内容适配</p>
        <p>不受父元素高度影响</p>
        <div style={{ height: '320px', overflow: 'auto' }}>
          <Table columns={columns} data={data} lugiadLayout={{ heightType: 'auto' }} />
        </div>

        <p>表格高度展示-free：自适应</p>
        <p>虽父高度变化</p>
        <div style={{ height: '300px' }}>
          <Table columns={columns} data={data} lugiadLayout={{ heightType: 'reactive' }} />
        </div>
      </div>
    );
  }
}
