/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Table from './index';
import Theme from '../theme';
import Widget from '../consts/index';

const { ColumnGroup, Column } = Table;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    // width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    // width: 200,
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    // width: 100,
    key: 'operations',
    render: () => <a href="#">Delete</a>,
  },
];

const data = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Rook', age: 22, address: 'some where', key: '3' },
  { name: 'Lise', age: 33, address: 'some where', key: '4' },
];

const Data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default class ModalDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectRowKeys: ['1'],
    };
  }

  selectChange = (selectRowKeys: string, records: Object) => {
    console.log('selectRowKeys', selectRowKeys);
    console.log('records', records);
    this.setState({
      selectRowKeys,
    });
  };

  render() {
    console.log('this.state', this.state.selectRowKeys);
    const tableView = {
      [Widget.Table]: {
        width: 500,
      },
    };
    const config = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 200,
          },
        },
      },
    };
    return (
      <div style={{ padding: '20px' }}>
        <h1>边框表格</h1>
        <Theme config={config}>
          <Table columns={columns} data={data} />
        </Theme>
        <br />
        <h1>边框表格</h1>
        <Table
          columns={columns}
          data={data}
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys: this.state.selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Jack' };
            },
            width: 60,
          }}
          expandedRowRender={record => <p>{record.name}</p>}
          expandIconAsCell
        />
        <br />
        <h1>边框表格</h1>
        <Table
          columns={columns}
          data={data}
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys: this.state.selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Jack' };
            },
            width: 60,
          }}
          expandedRowRender={record => <p>{record.name}</p>}
        />
        <br />
        <h1>斑马纹表格</h1>
        <Table
          columns={columns}
          data={data}
          tableStyle="zebraStripe"
          selectOptions={{ onChange: this.selectChange }}
        />
        <br />
        <h1>线性分割表格</h1>
        <Table columns={columns} data={data} tableStyle="linear" />
        <br />
        <h1>表格合并</h1>
        <Table data={Data} tableStyle="linear">
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <span>{tag}</span>
                ))}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a href="javascript:;">Invite {record.lastName}</a>
                <a href="javascript:;">Delete</a>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}
