import * as React from 'react';
import Table from '../index';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    style: {
      background: '#e98010',
      fontSize: '10px',
      color: 'white',
      fontStyle: 'italic',
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
    style: {
      background: '#e91055',
      fontSize: '10px',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
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

const treeColumnsStyle = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    style: {
      background: '#10e992',
    },
    width: '12%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    style: {
      background: '#e9a110',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const treeData = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
export default class ExpandIconDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <h3>修改每列样式</h3>
          <Table columns={columns} data={data} />
        </div>

        <div style={{ padding: '20px' }}>
          <h3>修改展开列样式</h3>
          <Table
            columns={columns}
            data={data}
            expandedRowRender={record => (
              <div style={{ marginLeft: -8, width: 100 }}>{record.name}</div>
            )}
            collapseIcon={'lugia-icon-direction_up_circle'}
            expandIcon={'lugia-icon-direction_down_circle'}
            expandedRowStyle={{
              background: '#108ee9',
            }}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h3>修改树形table列样式</h3>
          <Table
            columns={treeColumnsStyle}
            data={treeData}
            collapseIcon={'lugia-icon-direction_up_circle'}
            expandIcon={'lugia-icon-direction_down_circle'}
          />
        </div>
      </div>
    );
  }
}
