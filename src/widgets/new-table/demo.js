import React from 'react';
import Table from './';
import EditTable from './editTableView';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 16px;
  margin: 10px;
`;
const selectData = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, text: `txt${i}` });
  }
  return res;
})(10);

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
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
    width: 200,
    align: 'right',
  },
  {
    title: 'isIn',
    dataIndex: 'isIn',
    key: 'isIn',
    width: 200,
    render: (text, record, index) => <div>{!text || text === 'false' ? 'B' : 'A'}</div>,
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
    render: () => (
      <a tabIndex={-1} href="javascript:;">
        Delete
      </a>
    ),
  },
];

const data = [
  {
    name: 'long and long and long and long Jack',
    age: 28,
    address: 'long and long and long and long long and long and long and long some where',
    key: '1',
  },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Uzi', age: 36, address: 'some where', key: '3' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
];

const dataA = [
  { name: '', age: 28, key: '1', isIn: true },
  { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
  { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
  { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
  { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
];

export default class TableDemo extends React.Component<Object, Object> {
  constructor(props) {
    super(props);
    this.state = {
      tableData: dataA,
    };
  }
  onChange = res => {
    console.log('onChange', res);
    const { data } = res;
    this.setState({ tableData: data });
  };
  onCell = res => {
    console.log('onCell', res);
  };
  render() {
    const { tableData } = this.state;
    return (
      <div>
        <Title>可编辑表格</Title>
        <EditTable
          data={tableData}
          columns={columns}
          tableStyle={'bordered'}
          tableSize={'large'}
          title={'这是一个有边框的表格'}
          footer={<div>这是表格底部信息</div>}
          onChange={this.onChange}
          onCell={this.onCell}
          selectSuffixElement={<div>00</div>}
        />
        <Title>基本表格</Title>
        <Table
          data={data}
          columns={columns}
          title={'这是一个表格'}
          footer={<div>这是表格底部信息</div>}
        />
        <Title>tableSize： large tableStyle：zebraStripe </Title>
        <Table data={tableData} columns={columns} tableStyle={'zebraStripe'} tableSize={'large'} />
        <Title>tableSize： middle tableStyle：bordered </Title>
        <Table
          data={data}
          columns={columns}
          tableStyle={'bordered'}
          tableSize={'middle'}
          title={'这是一个有边框的表格'}
          footer={<div>这是表格底部信息</div>}
        />
        <Title>tableSize： large tableStyle：bordered data:null </Title>
        <Table columns={columns} tableStyle={'bordered'} tableSize={'large'} />
        <Title>tableSize： default tableStyle：bordered column:null </Title>
        <Table
          data={data}
          // columns={columns}
          tableStyle={'bordered'}
          footer={<div>这是表格底部信息</div>}
        />
      </div>
    );
  }
}
