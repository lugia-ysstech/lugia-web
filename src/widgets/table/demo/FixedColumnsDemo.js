import React, { useState } from 'react';
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
    dataIndex: 'operations',
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
  { name: 'asd', age: 26, address: 'some where', key: '7' },
  { name: 'asds', age: 26, address: 'some where', key: '8' },
  { name: 'asdsad', age: 26, address: 'some where', key: '9' },
  { name: 'asds', age: 26, address: 'some where', key: '10' },
  { name: 'Jack', age: 28, address: 'some where', key: '13' },
  { name: 'Rose', age: 36, address: 'some where', key: '22' },
  { name: 'Uzi', age: 36, address: 'some where', key: '33' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '43' },
  { name: 'Rookie', age: 36, address: 'some where', key: '53' },
  { name: 'TheShy', age: 36, address: 'some where', key: '63' },
  { name: 'asd', age: 26, address: 'some where', key: '73' },
  { name: 'asds', age: 26, address: 'some where', key: '83' },
  { name: 'asdsad', age: 26, address: 'some where', key: '93' },
  { name: 'asds', age: 26, address: 'some where', key: '103' },
];

const fixedData = [
  {
    text: '固定当前列',
    value: 'fixedCurrent',
  },
  {
    text: '取消当前列固定',
    value: 'cancelCurrent',
  },
  {
    text: '固定当前列及左侧',
    value: 'fixedCurrentAndLeft',
  },
  {
    text: '取消全部固定列',
    value: 'cancelAll',
  },
];

export default function TableDemo() {
  const [fixedColumns, setFixedColumns] = useState([]);

  const onFixed = param => {
    const { dataIndex, type } = param;

    switch (type) {
      case 'cancelCurrent':
        setFixedColumns(oldFixedColumns => {
          return oldFixedColumns.filter(item => item.dataIndex !== dataIndex);
        });
        break;
      case 'fixedCurrent':
        const exist = fixedColumns.find(item => item.dataIndex === dataIndex);
        if (!exist) {
          setFixedColumns(oldFixedColumns => {
            return [...oldFixedColumns, { dataIndex }];
          });
        }
        break;
      case 'fixedCurrentAndLeft':
        const targetColumnIndex = columns.findIndex(item => item.dataIndex === dataIndex);
        setFixedColumns(
          columns.slice(0, targetColumnIndex + 1).map(item => {
            const { dataIndex } = item;
            return { dataIndex };
          })
        );
        break;

      case 'cancelAll':
        setFixedColumns([]);
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <Table
        onFixed={onFixed}
        columns={columns}
        data={data}
        fixedData={fixedData}
        canFixedColumnsDataIndex={['name', 'age']}
        fixedColumns={fixedColumns}
        scroll={{ x: 500 }}
      />
    </div>
  );
}
