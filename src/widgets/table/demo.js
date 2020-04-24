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
  { name: 'Lise', age: 33, address: 'some where', key: '5' },
  { name: 'Lise', age: 33, address: 'some where', key: '6' },
  { name: 'Lise', age: 33, address: 'some where', key: '7' },
  { name: 'asdasda', age: 33, address: 'some where', key: '8' },
  { name: 'asdasda', age: 33, address: 'some where', key: '9' },
  { name: 'asdasda', age: 33, address: 'some where', key: '10' },
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
      updateData: data,
    };
  }
  update = () => {
    const data = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      data.push({ name: 'Rose' + i, age: 36, address: 'some where', key: '2' });
    }
    this.setState({ updateData: data });
  };

  selectChange = (selectRowKeys: string, records: Object) => {
    console.log('selectRowKeys', selectRowKeys);
    console.log('records', records);
    this.setState({
      selectRowKeys,
    });
  };

  render() {
    console.log('this.state', this.state.selectRowKeys);
    const config = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 200,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const configSmall = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 100,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const configDefault = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 352,
            background: {
              color: 'red',
            },
          },
        },
      },
    };

    const configLarge = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 440,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const { updateData } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <h1>表格size</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <h3>size=small</h3>
            <Table
              theme={configSmall}
              useFixedHeader
              columns={columns}
              data={updateData}
              size={'small'}
            />
            <button onClick={this.update}>动态改数据条数</button>
          </div>
          <div style={{ flex: '1' }}>
            <h3>size=default</h3>
            <Theme config={configDefault}>
              <Table useFixedHeader columns={columns} data={updateData} />
            </Theme>
          </div>
          <div style={{ flex: '1' }}>
            <h3>size=large</h3>
            <Theme config={configLarge}>
              <Table useFixedHeader columns={columns} data={data} size={'large'} />
            </Theme>
          </div>
        </div>
        <h1>边框表格</h1>
        <Theme config={config}>
          <Table useFixedHeader columns={columns} data={data} />
        </Theme>
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
          scroll={{
            y: 200,
          }}
          useFixedHeader
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
