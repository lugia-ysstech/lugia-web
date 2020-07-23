import * as React from 'react';
import AutoComplete from './';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
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
    const config_icon = {
      [Widget.AutoComplete]: {
        InputClearButton: {
          normal: {
            color: 'red',
          },
        },
        OldItem: {
          normal: {
            color: 'orange',
            background: { color: '#4A90E2' },
            opacity: 1,
            boxShadow: getBoxShadow('5px 2px 5px orange'),
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            height: 30,
          },
          hover: {
            color: 'orange',
          },
        },
        OldTimeIcon: {
          normal: {
            color: 'white',
          },
        },
        Container: {
          normal: {
            width: 300,
            height: 40,
          },
        },
      },
    };
    const { menuData, value } = this.state;
    return (
      <div>
        <Box>
          <h4> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;加检验的demo</h4>
          <AutoComplete
            theme={config}
            showOldValue
            value={value}
            data={menuData}
            validateStatus={'error'}
            onChange={this.onChange}
          />
        </Box>
        <Box>
          <h4>demo</h4>
          <AutoComplete
            theme={config}
            showOldValue
            value={value}
            data={menuData}
            onChange={this.onChange}
          />
        </Box>
        <Box>
          <h4>设置清除图标和上一次选中值图标的demo</h4>
          <AutoComplete
            theme={config_icon}
            showOldValue
            value={value}
            data={menuData}
            onChange={this.onChange}
            clearIcon="lugia-icon-reminder_close_square_o"
            oldTimeIcon="lugia-icon-financial_remind"
          />
        </Box>
      </div>
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
