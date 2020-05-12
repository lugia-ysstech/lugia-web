/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Theme from '../theme/index';
import TreeSelect from './index';
import Widget from '../consts/index';
import styled from 'styled-components';
import Icon from '../icon';

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

const info = [
  {
    value: '0',
    text: '北京分行',

    children: [
      // { value: '0-1-0', text: '朝阳支行办事处-1' },
      { value: '0-1-1', text: '朝阳支行办事处-2', children: [{ value: '0-111', text: '123' }] },
      {
        value: '0-2',
        text: '海淀支行办事处',
        icons: {
          prefixIconClass: 'lugia-icon-financial_heart',
          prefixIconSrc: '',
          suffixIconClass: 'lugia-icon-financial_contacts',
          suffixIconSrc: '',
        },
      },
      { value: '0-3', text: '石景山支行办事处' },
    ],
  },
  { value: '1', text: '天津分行' },
];

const config = {
  [Widget.TreeSelect]: {
    Container: {
      normal: {
        width: 300,
      },
    },
  },
};

const iconConfig = {
  [Widget.Icon]: {
    Icon: {
      normal: {
        opacity: 0,
      },
      hover: {
        opacity: 1,
      },
    },
  },
};

export default class DefaultTreeSelect extends React.Component<any, any> {
  renderSuffix = item => {
    const { isLeaf } = item;
    if (isLeaf) {
      return <Icon theme={iconConfig} iconClass={'lugia-icon-reminder_check_square'} />;
    }
  };
  render() {
    return [
      <H1> 单选 treeSelect </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> size={'small'} </H1>
          <TreeSelect
            theme={config}
            isShowClearButton
            canSearch
            size={'small'}
            data={info}
            translateTreeData
            onlySelectLeaf={false}
            canInput
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'default'} </H1>
          <TreeSelect
            data={info}
            size={'default'}
            theme={config}
            translateTreeData
            onlySelectLeaf={false}
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'large'} </H1>
          <TreeSelect
            data={info}
            theme={config}
            size={'large'}
            translateTreeData
            onlySelectLeaf={false}
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
      </RowWrap>,
      <H1>多选 treeSelect</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> size={'small'} </H1>
          <TreeSelect
            mutliple
            theme={config}
            isShowClearButton
            canSearch
            size={'small'}
            data={info}
            translateTreeData
            onlySelectLeaf={false}
            canInput
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'default'} </H1>
          <TreeSelect
            mutliple
            data={info}
            size={'default'}
            theme={config}
            translateTreeData
            onlySelectLeaf={false}
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'large'} </H1>
          <TreeSelect
            mutliple
            data={info}
            theme={config}
            size={'large'}
            translateTreeData
            onlySelectLeaf={false}
            expandAll
            autoHeight
            pullIconClass="lugia-icon-direction_caret_down"
          />
        </RowWrapItem>
      </RowWrap>,
    ];
  }
}
