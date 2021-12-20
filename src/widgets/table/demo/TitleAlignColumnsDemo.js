import * as React from 'react';
import Table from '../index';

const columns = [
  {
    title: '11月完成投资额',
    dataIndex: 'month',
    key: 'month',
    titleAlign: 'center',
    ellipsis: true,
    children: [
      {
        title: '新增',
        dataIndex: 'increaseMonth',
        key: 'increaseMonth',
        align: 'right',
        titleAlign: 'center',
        ellipsis: true,
        width: 100,
      },
      {
        title: '减持',
        dataIndex: 'hdReductionMonth',
        key: 'hdReductionMonth',
        align: 'right',
        titleAlign: 'center',
        ellipsis: true,
        width: 100,
        children: [
          {
            title: '新增',
            dataIndex: 'increaseCy',
            key: 'increaseCy',
            align: 'right',
            titleAlign: 'center',
            ellipsis: true,
            width: 100,
          },
          {
            title: '新增',
            dataIndex: 'increaseCy',
            key: 'increaseCy',
            align: 'right',
            titleAlign: 'center',
            ellipsis: true,
            width: 100,
          },
        ],
      },
    ],
  },
  {
    title: '境内股票',
    dataIndex: 'pfName',
    key: 'pfName',
    align: 'center',
    titleAlign: 'center',
    ellipsis: true,
    width: 160,
  },
  {
    title: '本年累计完成投资额',
    dataIndex: 'cy',
    key: 'cy',
    titleAlign: 'center',

    ellipsis: true,
    children: [
      {
        title: '新增',
        dataIndex: 'increaseCy',
        key: 'increaseCy',
        align: 'right',
        titleAlign: 'center',
        ellipsis: true,
        width: 100,
      },
      {
        title: '减持',
        dataIndex: 'hdReductionCy',
        key: 'hdReductionCy',
        align: 'right',
        titleAlign: 'center',
        ellipsis: true,
        width: 100,
      },
      {
        title: '净增',
        dataIndex: 'netIncreaseCy',
        key: 'netIncreaseCy',
        align: 'right',
        titleAlign: 'center',
        ellipsis: true,
        width: 100,
        children: [
          {
            title: '新增',
            dataIndex: 'increaseCy',
            key: 'increaseCy',
            align: 'right',
            titleAlign: 'center',
            ellipsis: true,
            width: 100,
          },
        ],
      },
    ],
  },
];
const data = [
  {
    pfName: '11',
    increaseMonth: '11',
    hdReductionMonth: '11',
    netIncreaseMonth: '11',
    increaseCy: '11',
    hdReductionCy: '11',
    netIncreaseCy: '11',
  },
  {
    pfName: '11',
    increaseMonth: '11',
    hdReductionMonth: '11',
    netIncreaseMonth: '11',
    increaseCy: '11',
    hdReductionCy: '11',
    netIncreaseCy: '11',
  },
  {
    pfName: '11',
    increaseMonth: '11',
    hdReductionMonth: '11',
    netIncreaseMonth: '11',
    increaseCy: '11',
    hdReductionCy: '11',
    netIncreaseCy: '11',
  },
  {
    pfName: '11',
    increaseMonth: '11',
    hdReductionMonth: '11',
    netIncreaseMonth: '11',
    increaseCy: '11',
    hdReductionCy: '11',
    netIncreaseCy: '11',
  },
  {
    pfName: '11',
    increaseMonth: '11',
    hdReductionMonth: '11',
    netIncreaseMonth: '11',
    increaseCy: '11',
    hdReductionCy: '11',
    netIncreaseCy: '11',
  },
];

export default class TitleAlignColumnsDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <Table columns={columns} data={data} />
        </div>
      </div>
    );
  }
}
