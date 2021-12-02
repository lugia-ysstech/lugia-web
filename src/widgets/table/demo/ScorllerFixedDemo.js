import React, { useState } from 'react';
import Table from '../index';
import Button from '../../button';

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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 110,
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
];

export default () => {
  const [width, setWidth] = useState(695);

  const widthCss = `${width}px`;

  return (
    <div style={{ width: widthCss }}>
      <div>
        表格目前宽度：<span style={{ color: 'red' }}>{widthCss}</span> 滚动条宽度: 700
      </div>
      <Table columns={columns} data={data} scroll={{ x: 700 }} />
      <div>忽略5像素（含5像素）情况下的水平滚动条</div>
      <Table columns={columns} data={data} scroll={{ x: 700 }} xScrollerCritical={5} />
      <Button
        onClick={() => {
          setWidth(width - 1);
        }}
      >
        缩小
      </Button>{' '}
      <Button
        onClick={() => {
          setWidth(width + 1);
        }}
      >
        放大
      </Button>
    </div>
  );
};
