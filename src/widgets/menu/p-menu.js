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
  { value: '波波', text: '波波', icon: 'lugia-icon-financial_transfer_i' },
  { value: '小拉达', text: '小拉达', icon: 'lugia-icon-logo_QQ' },
];

const multiLevelMenuSmallData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    icon: 'lugia-icon-financial_group',
    des: '一级菜单1',
    disabled: true,
  },
  {
    text: '一级菜单2',
    value: '一级菜单2',
    icon: 'lugia-icon-financial_date',
    des: '一级菜单2',
  },
  {
    text: '一级菜单3',
    value: '一级菜单3',
    icon: 'lugia-icon-financial_classification',
    des: '一级菜单3',
  },
  {
    text: '一级菜单4',
    value: '一级菜单4',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单4',
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        icon: 'lugia-icon-financial_markdown',
        des: '市场',
        children: [
          {
            text: '三级菜单4-1-1',
            value: '三级菜单4-1-1',
            icon: 'lugia-icon-financial_bell',
            des: '三级菜单4-1-1',
          },
        ],
      },
    ],
  },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单6',
    children: [
      {
        text: '次级菜单6-1',
        value: '次级菜单6-1',
        icon: 'lugia-icon-financial_home',
        des: '次级菜单6-1',
      },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        icon: 'lugia-icon-financial_lock',
        des: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            icon: 'lugia-icon-financial_pdf',
            des: '三级菜单6-2-1',
          },
          {
            text: '三级菜单6-2-2',
            value: '三级菜单6-2-2',
            icon: 'lugia-icon-financial_remind',
            des: '三级菜单6-2-2',
          },
          {
            text: '三级菜单6-2-3',
            value: '三级菜单6-2-3',
            icon: 'lugia-icon-financial_transfer_i',
            des: '三级菜单6-2-3',
          },
        ],
      },
      {
        text: '次级菜单6-3',
        value: '次级菜单6-3',
        icon: 'lugia-icon-financial_transfer_i',
        des: '次级菜单6-3',
      },
      {
        text: '次级菜单6-4',
        value: '次级菜单6-4',
        icon: 'lugia-icon-logo_baidu',
        des: '次级菜单6-4',
      },
      {
        text: '次级菜单6-5',
        value: '次级菜单6-5',
        icon: 'lugia-icon-logo_github',
        des: '次级菜单6-5',
      },
      {
        text: '次级菜单6-6',
        value: '次级菜单6-6',
        icon: 'lugia-icon-logo_html5',
        des: '次级菜单6-6',
      },
    ],
  },
];

const multiLevelMenuDefaultData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    icon: 'lugia-icon-financial_group',
    des: '一级菜单1',
  },

  {
    text: '一级菜单4',
    value: '一级菜单4',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单4',
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        icon: 'lugia-icon-financial_markdown',
        des: '市场',
        children: [
          {
            text: '三级菜单4-1-1',
            value: '三级菜单4-1-1',
            icon: 'lugia-icon-financial_bell',
            des: '三级菜单4-1-1',
          },
        ],
      },
    ],
  },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单6',
    children: [
      {
        text: '次级菜单6-1',
        value: '次级菜单6-1',
        icon: 'lugia-icon-financial_home',
        des: '次级菜单6-1',
      },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        icon: 'lugia-icon-financial_lock',
        des: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            icon: 'lugia-icon-financial_pdf',
            des: '三级菜单6-2-1',
          },
          {
            text: '三级菜单6-2-2',
            value: '三级菜单6-2-2',
            icon: 'lugia-icon-financial_remind',
            des: '三级菜单6-2-2',
          },
          {
            text: '三级菜单6-2-3',
            value: '三级菜单6-2-3',
            icon: 'lugia-icon-financial_transfer_i',
            des: '三级菜单6-2-3',
          },
        ],
      },
      {
        text: '次级菜单6-3',
        value: '次级菜单6-3',
        icon: 'lugia-icon-financial_transfer_i',
        des: '次级菜单6-3',
      },
      {
        text: '次级菜单6-4',
        value: '次级菜单6-4',
        icon: 'lugia-icon-logo_baidu',
        des: '次级菜单6-4',
      },
      {
        text: '次级菜单6-5',
        value: '次级菜单6-5',
        icon: 'lugia-icon-logo_github',
        des: '次级菜单6-5',
      },
      {
        text: '次级菜单6-6',
        value: '次级菜单6-6',
        icon: 'lugia-icon-logo_html5',
        des: '次级菜单6-6',
      },
      {
        text: '次级菜单6-7',
        value: '次级菜单6-7',
        icon: 'lugia-icon-logo_html5',
        des: '次级菜单6-6',
      },
    ],
  },
];

const multiLevelMenuLargeData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    icon: 'lugia-icon-financial_group',
    des: '一级菜单1',
  },

  {
    text: '一级菜单4',
    value: '一级菜单4',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单4',
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        icon: 'lugia-icon-financial_markdown',
        des: '市场',
        children: [
          {
            text: '三级菜单4-1-1',
            value: '三级菜单4-1-1',
            icon: 'lugia-icon-financial_bell',
            des: '三级菜单4-1-1',
          },
        ],
      },
    ],
  },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    icon: 'lugia-icon-financial_editor',
    des: '一级菜单6',
    children: [
      {
        text: '次级菜单6-1',
        value: '次级菜单6-1',
        icon: 'lugia-icon-financial_home',
        des: '次级菜单6-1',
      },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        icon: 'lugia-icon-financial_lock',
        des: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            icon: 'lugia-icon-financial_pdf',
            des: '三级菜单6-2-1',
          },
          {
            text: '三级菜单6-2-2',
            value: '三级菜单6-2-2',
            icon: 'lugia-icon-financial_remind',
            des: '三级菜单6-2-2',
          },
          {
            text: '三级菜单6-2-3',
            value: '三级菜单6-2-3',
            icon: 'lugia-icon-financial_transfer_i',
            des: '三级菜单6-2-3',
          },
        ],
      },
      {
        text: '次级菜单6-3',
        value: '次级菜单6-3',
        icon: 'lugia-icon-financial_transfer_i',
        des: '次级菜单6-3',
      },
      {
        text: '次级菜单6-4',
        value: '次级菜单6-4',
        icon: 'lugia-icon-logo_baidu',
        des: '次级菜单6-4',
      },
      {
        text: '次级菜单6-5',
        value: '次级菜单6-5',
        icon: 'lugia-icon-logo_github',
        des: '次级菜单6-5',
      },
      {
        text: '次级菜单6-6',
        value: '次级菜单6-6',
        icon: 'lugia-icon-logo_html5',
        des: '次级菜单6-6',
      },
    ],
  },
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
      selectedKeysSmall: [],
      expandedPathSmall: [],
      selectedKeysDefault: [],
      expandedPathDefault: [],
      selectedKeysLarge: [],
      expandedPathLarge: [],
      start: 0,
    };
  }

  onExpandPathChange = expandedPath => {
    this.setState({ expandedPath });
  };

  render() {
    const {
      selectedKeys,
      expandedPath,
      selectedKeysSmall,
      expandedPathSmall,
      selectedKeysDefault,
      expandedPathDefault,
      selectedKeysLarge,
      expandedPathLarge,
    } = this.state;
    return [
      <H1>多级菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> size={'small'} 多级菜单 </H1>
          <Menu
            separator={'/'}
            size={'small'}
            checkedCSS={'background'}
            expandedPath={expandedPathSmall}
            selectedKeys={selectedKeysSmall}
            data={multiLevelMenuSmallData}
            onClick={this.onClickSmall}
            offsetY={0}
            autoHeight={true}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'default'} 多级菜单 </H1>
          <Menu
            mutliple={false}
            separator={'/'}
            size={'default'}
            checkedCSS={'background'}
            expandedPath={expandedPathDefault}
            selectedKeys={selectedKeysDefault}
            data={multiLevelMenuDefaultData}
            offsetY={0}
            onClick={this.onClickDefault}
            autoHeight={true}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'large'} 多级菜单 </H1>,
          <Menu
            separator={'/'}
            size={'large'}
            expandedPath={expandedPathLarge}
            selectedKeys={selectedKeysLarge}
            data={multiLevelMenuLargeData}
            offsetY={0}
            onClick={this.onClickLager}
            autoHeight={true}
          />
        </RowWrapItem>
      </RowWrap>,
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

  onClickSmall = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeysSmall: selectedKeys, expandedPathSmall: selectedKeys });
  };
  onClickDefault = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeysDefault: selectedKeys, expandedPathDefault: selectedKeys });
  };
  onClickLager = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeysLarge: selectedKeys, expandedPathLarge: selectedKeys });
  };
}
