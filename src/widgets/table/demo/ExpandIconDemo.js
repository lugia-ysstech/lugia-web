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
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

export default class ExpandIconDemo extends React.Component {
  render() {
    return (
      <div>
        <h1>修改展开图标 传函数</h1>
        <Table
          columns={columns}
          data={data}
          expandedRowRender={record => <p>{record.name}</p>}
          expandIcon={'lugia-icon-direction_caret_up'}
          collapseIcon={'lugia-icon-direction_caret_down'}
        />

        <br />
        <br />

        <h1>修改展开图标 传字符串</h1>
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
