import React from 'react';
import Table from './';
import EditTable from './editTableView';
import Checkbox from '../checkbox';
import styled from 'styled-components';
import Theme from '../theme';
import Widgets from '../consts';

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
    align: 'left',
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
    align: 'center',
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

const treeColumns = [
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
    editType: 'string',
    columnType: '',
  },
  { title: 'text', dataIndex: 'text', key: 'text', editType: 'string', columnType: '' },
  {
    title: 'icons',
    dataIndex: 'icons',
    key: 'icons',
    editType: 'object',
    columnType: '',
    children: [
      { title: 'prefix', dataIndex: 'prefix', key: 'prefix', editType: 'Icon' },
      { title: 'suffix', dataIndex: 'suffix', key: 'suffix', editType: 'Icon' },
    ],
  },
  {
    title: 'children',
    dataIndex: 'children',
    key: 'children',
    editType: 'Object[]',
    columnType: '',
  },
];
const treeData = [
  {
    value: '一级节点-1',
    text: '一级节点-1',
    key: 1,
    children: [
      { key: 11, value: '二级节点1-1', text: '二级节点1-1' },
      {
        key: 12,
        value: '二级节点1-2',
        text: '二级节点1-2',
      },
    ],
    icons: {
      prefix: 123,
      suffix: 334,
    },
  },
  {
    value: '一级节点-2',
    text: '一级节点-2',
    key: 2,
    children: [
      {
        key: 21,
        value: '二级节点2-1',
        text: '二级节点2-1',
      },
      {
        key: 22,
        value: '二级节点2-2',
        text: '二级节点2-2',
      },
    ],
  },
];

const checkboxColumns = [
  {
    title: 'checkbox',
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: 200,
    render: (text, record) => {
      const { isHead } = record;
      return isHead ? <Checkbox>全选</Checkbox> : <Checkbox>text</Checkbox>;
    },
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'isIn',
    dataIndex: 'isIn',
    key: 'isIn',
    render: (text, record, index) => <div>{!text || text === 'false' ? 'B' : 'A'}</div>,
    width: 200,
  },
];

const checkBoxdata = [
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
const newData = [
  {
    name: '姓名',
    age: '年龄',
    address: '地址',
    key: '选项',
    checkbox: '全选',
    isHead: true,
  },
];

export default class TableDemo extends React.Component<Object, Object> {
  constructor(props) {
    super(props);
    this.state = {
      tableData: dataA,
      treeData,
      treeColumns,
      columns,
      checkBoxdata: newData.concat(checkBoxdata),
      checkboxColumns,
    };
  }
  onChange = res => {
    console.log('onChange', res);
    const { data, columns } = res;
    this.setState({ tableData: data, columns });
  };
  onChangeTreeData = res => {
    console.log('onChange', res);
    const { data, columns } = res;
    this.setState({ treeData: data, treeColumns: columns });
  };
  onCell = res => {
    console.log('onCell', res);
  };
  onChangeCheckData = res => {
    const { data, columns } = res;
    this.setState({ checkBoxdata: data, checkboxColumns: columns });
  };
  onHeaderCell = res => {
    console.log('OnHeaderCell', res);
  };
  render() {
    const { tableData, treeData, treeColumns, columns, checkBoxdata, checkboxColumns } = this.state;

    const config = {
      [Widgets.EditTable]: {
        EditTarget: {
          normal: {
            padding: {
              right: 10,
              left: 10,
            },
          },
        },
        Table: {
          Th_Td: {
            normal: {
              padding: {
                left: 20,
              },
            },
          },
          Th: {
            normal: {
              background: {
                color: 'pink',
              },
            },
          },
        },
      },
    };
    const tableConfig = {
      [Widgets.Table]: {
        Th_Td: {
          normal: {
            padding: {
              left: 30,
            },
          },
        },
        Th: {
          normal: {
            background: {
              color: 'pink',
            },
          },
        },
      },
    };

    return (
      <div>
        <Title>多选可编辑表格 嵌套数据</Title>
        <div>{JSON.stringify(treeData)}</div>
        <EditTable
          data={checkBoxdata}
          columns={checkboxColumns}
          showHeader={false}
          allowEditHead={false}
          tableStyle={'bordered'}
          onChange={this.onChangeCheckData}
        />
        <Title>可编辑表格 嵌套数据</Title>
        <div>{JSON.stringify(treeData)}</div>
        <Theme config={config}>
          <EditTable
            data={treeData}
            columns={treeColumns}
            allowEditHead={false}
            tableSize={'large'}
            title={'这是一个有边框的表格'}
            footer={<div>这是表格底部信息</div>}
            onChange={this.onChangeTreeData}
            onCell={this.onCell}
            onHeaderCell={this.onHeaderCell}
            selectSuffixElement={<div>00</div>}
          />
        </Theme>
        <Title>可编辑表格</Title>
        <Theme config={config}>
          <EditTable
            data={tableData}
            columns={columns}
            tableStyle={'bordered'}
            tableSize={'large'}
            title={'这是一个有边框的表格'}
            footer={<div>这是表格底部信息</div>}
            onChange={this.onChange}
            onCell={this.onCell}
            onHeaderCell={this.onHeaderCell}
            isEditHead
            selectSuffixElement={<div>00</div>}
          />
        </Theme>
        <Theme config={tableConfig}>
          <Title>基本表格</Title>
          <Table
            data={data}
            columns={columns}
            title={'这是一个表格'}
            footer={<div>这是表格底部信息</div>}
          />
        </Theme>
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
