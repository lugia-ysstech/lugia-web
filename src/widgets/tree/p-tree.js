/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from './index.js';
import Icon from '../icon';
import styled from 'styled-components';

const IconBox = styled.div`
  margin: 0 4px;
  z-index: 1000;
`;

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
`;
const info = [
  {
    value: '0',
    text: '北京分行',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      prefixIconSrc: '',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
    disabled: true,
    children: [
      {
        value: '0-1',
        text: '朝阳支行办事处',
        icon: 'lugia-icon-financial_describe',
        disabled: true,
        children: [
          {
            value: '0-1-0',
            text: '朝阳支行办事处-1',
            icon: 'lugia-icon-financial_bell',
            disabled: true,
          },
          {
            value: '0-1-1',
            text: '朝阳支行办事处-2',
            icon: 'lugia-icon-financial_contacts',
            disabled: true,
          },
        ],
      },
      { value: '0-2', text: '海淀支行办事处', icon: 'lugia-icon-financial_excle' },
      { value: '0-3', text: '石景山支行办事处', icon: 'lugia-icon-financial_jpg' },
    ],
  },
  {
    value: '1',
    text: '天津分行',
    icon: 'lugia-icon-financial_QR_code',
    children: [
      { value: '1-1', text: '和平支行办事处', icon: 'lugia-icon-financial_release_letter' },
      { value: '1-2', text: '河东支行办事处', icon: 'lugia-icon-financial_setting' },
      { value: '1-3', text: '南开支行办事处', icon: 'lugia-icon-financial_QR_code' },
    ],
  },
];

const renderSuffix = (item: Object) => {
  const { isLeaf } = item;
  if (isLeaf) {
    return [
      <IconBox>
        <Icon iconClass={'lugia-icon-direction_rollback'} />
      </IconBox>,
      <IconBox>
        <Icon iconClass={'lugia-icon-reminder_check_square'} />
      </IconBox>,
      <IconBox>
        <Icon iconClass={'lugia-icon-financial_delete'} />
      </IconBox>,
    ];
  }
};

export default () => {
  return [
    <H1>单选选树</H1>,
    <RowWrap>
      <RowWrapItem>
        <H1>size={'small'}</H1>
        <Tree data={info} size={'small'} expandAll translateTreeData autoHeight onlySelectLeaf />
      </RowWrapItem>
      <RowWrapItem>
        <H1>size={'default'}</H1>
        <Tree
          data={info}
          size={'default'}
          expandAll
          translateTreeData
          autoHeight
          parentIsHighlight
          onlySelectLeaf
        />
      </RowWrapItem>
      <RowWrapItem>
        <h1>size={'large'}</h1>
        <Tree
          data={info}
          size={'large'}
          expandAll
          translateTreeData
          autoHeight
          parentIsHighlight
          onlySelectLeaf={false}
          renderSuffixItems={renderSuffix}
        />
      </RowWrapItem>
    </RowWrap>,
    <H1>多选树</H1>,
    <RowWrap>
      <RowWrapItem>
        <H1>size={'small'}</H1>
        <Tree
          data={info}
          size={'small'}
          expandAll
          translateTreeData
          autoHeight
          parentIsHighlight
          onlySelectLeaf={false}
          mutliple
        />
      </RowWrapItem>
      <RowWrapItem>
        <H1>size={'default'}</H1>
        <Tree
          data={info}
          size={'default'}
          expandAll
          translateTreeData
          autoHeight
          parentIsHighlight
          onlySelectLeaf={false}
          mutliple
        />
      </RowWrapItem>
      <RowWrapItem>
        <H1>size={'large'}</H1>
        <Tree
          data={info}
          size={'large'}
          expandAll
          translateTreeData
          autoHeight
          parentIsHighlight
          onlySelectLeaf={false}
          mutliple
        />
      </RowWrapItem>
    </RowWrap>,
    <H1>拖拽</H1>,
    <RowWrap>
      <RowWrapItem>
        <Tree
          data={info}
          size={'default'}
          expandAll
          translateTreeData
          autoHeight
          draggable
          onDrop={() => {}}
        />
      </RowWrapItem>
    </RowWrap>,
  ];
};
