import * as React from 'react';
import AutoComplete from './';
import { getBorder } from '@lugia/theme-utils';
import Widget from '../consts/index';
import styled from 'styled-components';
const data = [
  'Nikcy Romero',
  'Armin van Buuren',
  'Hardwell',
  'Zedd',
  'Kazze',

  'Vicetone',
  'Martin Garrix',
  'David Guetta',
  'The Chainsmokers',
  'Kygo',

  'Axwell ^ Ingrosso',
  'Dimitri Vegas & Like Mike',
  'Calvin Harris',
  'Avicci',
  'Fedde Le Grand',

  'Tiesto',
  'Snoop Dogg',
  'Bassjackers',
  'Sebastian Ingrosso',
  'Swedish House Mafia',
  'Alesso',
  'Afrojack',
  'Knife Party',
  'Dannic',
  'R3hab',
];

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

const config = {
  [Widget.AutoComplete]: {
    Container: {
      normal: {
        width: 300,
      },
    },
  },
};

export default class AutoCompleteBounded extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menuData: data,
    };
  }

  render() {
    const { menuData, value } = this.state;
    return [
      <H1>自动完成</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'} </H1>
          <AutoComplete
            size={'small'}
            disabled={false}
            theme={config}
            data={menuData}
            onChange={this.onChange}
            placeholder={'请输入'}
            showOldValue={true}
            value={value}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'} </H1>
          <AutoComplete
            size={'default'}
            disabled={false}
            theme={config}
            data={menuData}
            onChange={this.onChange}
            placeholder={'请输入'}
            showOldValue={true}
            value={value}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'} </H1>
          <AutoComplete
            size={'large'}
            disabled={false}
            theme={config}
            data={menuData}
            onChange={this.onChange}
            placeholder={'请输入'}
            showOldValue={true}
            value={value}
          />
        </RowWrapItem>
      </RowWrap>,
    ];
  }

  onChange = (value: string) => {
    this.search(value);
    this.setState({ value });
  };
  search(query: string) {
    let menuData;
    let rowSet = [];
    const len = data.length;

    for (let i = 0; i < len; i++) {
      const row = data[i];
      if (this.searchValue(query, row)) {
        rowSet.push(row);
      }
      if (query === row) {
        rowSet = [];
        break;
      }
    }
    if (rowSet.length === len) {
      menuData = data;
    } else {
      menuData = rowSet;
    }
    this.setState({ menuData });
  }

  searchValue = (query: string, row: string): boolean => {
    return row.indexOf(query) !== -1;
  };
}
