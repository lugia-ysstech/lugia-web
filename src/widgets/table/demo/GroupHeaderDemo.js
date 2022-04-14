import * as React from 'react';
import Table from '../index';

const data = [
  {
    key: '001',
    name: 'Lugia',
    age: '10',
    score: 0,
  },
  {
    key: '002',
    name: 'Lugia-store',
    age: '15',
    score: 5,
  },
  {
    key: '003',
    name: 'LugiaX',
    age: '20',
    score: -2,
  },
  {
    key: '005',
    name: 'MegaIDE',
    age: '26',
    score: 1,
  },
  {
    key: '006',
    name: 'n',
    age: '11',
    score: -2,
  },
  {
    key: '007',
    name: 'Lugia-router',
    age: '45',
    score: -2,
  },
  {
    key: '008',
    name: 'redux',
    age: '33',
    score: -2,
  },
  {
    key: '009',
    name: 'Lugia-model',
    age: '18',
    score: 5,
  },
];
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    sortType: 'string',
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'left',
    sortType: 'number',
    ellipsis: true,
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
    align: 'left',
    sortType: 'number',
    ellipsis: true,
    children: [
      {
        title: '单位净值',
        dataIndex: '100012unitNetValue',
        key: '100012unitNetValue',
        align: 'right',
        titleAlign: 'center',
        round: 4,
        unit: '0',
      },
      {
        title: '组合净值',
        dataIndex: '100012pfNav',
        key: '100012pfNav',
        align: 'right',
        titleAlign: 'center',
        round: 4,
        unit: '1',
      },
      {
        title: '组合总资产市值',
        dataIndex: '100012pfMv',
        key: '100012pfMv',
        align: 'right',
        titleAlign: 'center',
        round: 2,
        unit: '1',
      },
      {
        title: '杠杆比率',
        dataIndex: '100012leverageRatio',
        key: '100012leverageRatio',
        align: 'right',
        titleAlign: 'center',
        round: 4,
        unit: '0',
      },
    ],
  },
];

export default class GroupHeaderDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <Table columns={columns} data={data} scroll={{ y: 100 }} />
        </div>
      </div>
    );
  }
}
