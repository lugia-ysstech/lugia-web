/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Menu from './index';
import styled from 'styled-components';
const RowWrap = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
`;

const RowWrapItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const H1 = styled.h1`
  text-align: center;
  background: #000;
  color: #fff;
  margin: 0 0 10px;
`;

const objData = [
  {
    value: '机构性质',
    text: '机构性质',
    icon: 'lugia-icon-financial_filing_cabinet',
    des: '机构性质',
  },
  {
    value: '市场',
    text: '市场',
    icon: 'lugia-icon-financial_delete',
    des: '市场',
  },
  {
    value: '报表规则类型',
    text: '报表规则类型',
    icon: 'lugia-icon-financial_form',
    des: '市场',
  },
  {
    value: '特殊日期',
    text: '特殊日期',
    icon: 'lugia-icon-financial_contacts',
    des: '市场',
  },
  {
    value: 'ACS 001',
    text: 'ACS 001',
    icon: 'lugia-icon-financial_describe',
    des: '市场',
  },
];

const data = [
  {
    value: '皮卡丘',
    text: '皮卡丘',
    disabled: true,
    icon: 'lugia-icon-financial_excle',
    des: '市场',
  },
  {
    value: '妙蛙种子',
    text: '妙蛙种子',
    disabled: true,
    icon: 'lugia-icon-financial_excle',
    des: '市场',
  },
  { value: '小火龙', text: '小火龙', icon: 'lugia-icon-financial_markdown', des: '市场' },
  { value: '杰尼龟', text: '杰尼龟', icon: 'lugia-icon-direction_play_circle', des: '市场' },
  { value: '绿毛虫', text: '绿毛虫', icon: 'lugia-icon-financial_pdf' },
  { value: '独角虫', text: '独角虫', icon: 'lugia-icon-financial_warnings' },
  { value: '波波', text: '波波', icon: 'lugia-icon-logo_android' },
  { value: '小拉达', text: '小拉达', icon: 'lugia-icon-logo_QQ' },
];

const items = [];
for (let i = 0; i < 20; i++) {
  items.push({ text: i, value: i, disabled: false });
}
export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: [],
      expandedPath: [],
      start: 0,
    };
  }

  render() {
    return [
      <H1>menu checkedCSS="none"</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'} </H1>
          <Menu size={'small'} checkedCSS="none" autoHeight data={data} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'} </H1>
          <Menu size={'default'} checkedCSS="none" autoHeight data={objData} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'} </H1>
          <Menu size={'large'} checkedCSS="none" autoHeight data={objData} />
        </RowWrapItem>
      </RowWrap>,
      <H1>menu checkedCSS="background"</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'} </H1>
          <Menu size={'small'} checkedCSS="background" autoHeight data={data} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'} </H1>
          <Menu size={'default'} checkedCSS="background" autoHeight data={objData} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'} </H1>
          <Menu size={'large'} checkedCSS="background" autoHeight data={objData} />
        </RowWrapItem>
      </RowWrap>,
      <H1>menu checkedCSS="checkbox"</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'} </H1>
          <Menu size={'small'} checkedCSS="checkbox" autoHeight data={data} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'} </H1>
          <Menu size={'default'} checkedCSS="checkbox" autoHeight data={objData} />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'} </H1>
          <Menu size={'large'} checkedCSS="checkbox" autoHeight data={objData} />
        </RowWrapItem>
      </RowWrap>,
    ];
  }

  onClick = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys, expandedPath: selectedKeys });
  };
}
