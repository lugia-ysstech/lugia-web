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

const Box = styled.div`
  padding: 100px;
`;
export default class AutoCompleteBounded extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menuData: data,
    };
  }
  static getDerivedStateFromProps(props: any, state: any) {
    const hasValueInProps = 'value' in props;
    const value = hasValueInProps ? props.value : state ? state.value : props.defaultValue;
    if (!state) {
      return {
        value,
      };
    }
    return {
      value,
    };
  }

  render() {
    const config = {
      [Widget.AutoComplete]: {
        OldItem: {
          normal: {
            height: 50,
            color: '#000',
          },
          hover: {
            color: '#4d63ff',
          },
        },

        Container: {
          normal: {
            width: 300,
            height: 40,
          },
        },

        ValidateErrorInput: {
          normal: {
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
          },
        },

        ValidateErrorText: {
          normal: {
            background: {
              color: 'orange',
            },
          },
        },
      },
    };
    const { menuData, value } = this.state;
    return (
      <Box>
        <AutoComplete
          theme={config}
          showOldValue
          value={value}
          data={menuData}
          validateStatus={'error'}
          onChange={this.onChange}
        />
      </Box>
    );
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
