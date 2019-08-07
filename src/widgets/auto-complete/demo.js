import * as React from 'react';
import AutoComplete from './';
import { getBorder } from '@lugia/theme-utils';
import Widget from '../consts/index';
import { getBorderRadius } from '../theme/CSSProvider';

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
            font: { size: 20 },
            background: { color: '#333' },
            opacity: 0.6,
            padding: { left: 10 },
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },
          hover: {
            color: '#4d63ff',
            background: { color: '#4a8e29' },
            opacity: 1,
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },
        },
        AutoInput: {
          Container: {
            normal: {
              width: 600,
              height: 60,
            },
          },
        },
        Menu: {
          MenuWrap: {
            normal: {
              width: 300,
              height: 350,
              opacity: 0.6,
              boxShadow: '2px 2px 5px #4d63ff',
              background: { color: '#000' },
              border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
            },
            hover: {
              opacity: 1,
            },
          },
          MenuItem: {
            normal: { color: '#ccc', fontSize: 14, font: { fontWeight: 900 } },
            hover: {
              color: '#fff',
              fontSize: 20,
              background: { color: 'green' },
              font: { fontWeight: 400 },
            },
            active: {
              color: 'blue',
              fontSize: 14,
              background: { color: 'pink' },
              font: { fontWeight: 900 },
            },
            disabled: { color: 'red', background: { color: '#000' } },
          },
          SelectedMenuItem: {
            normal: {
              color: 'blue',
              font: { fontWeight: 900 },
              fontSize: 18,
              background: { color: 'orange' },
            },
            hover: { color: '#000', background: { color: 'yellow' } },
            active: { color: 'green' },
          },
          Divider: { normal: { color: 'red' } },
        },
      },
    };
    const { menuData, value } = this.state;
    return (
      <AutoComplete
        theme={config}
        showOldValue
        value={value}
        data={menuData}
        onChange={this.onChange}
      />
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

// export default class Demo extends React.Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menuData: data,
//       value: '',
//     };
//   }
//   render() {
//     return (
//       <AutoComplete
//         data={this.state.menuData}
//         onChange={this.onChange}
//         placeholder={'请输入'}
//         showOldValue={true}
//       />
//     );
//   }

//   onChange = value => {
//     this.search(value);
//   };

//   search(query) {
//     let menuData;
//     let rowSet = [];
//     const len = data.length;

//     for (let i = 0; i < len; i++) {
//       const row = data[i];
//       if (query === row) {
//         rowSet = [];
//         break;
//       }

//       if (this.searchValue(query, row)) {
//         rowSet.push(row);
//       }
//     }

//     if (rowSet.length === len) {
//       menuData = data;
//     } else {
//       menuData = rowSet;
//     }
//     this.setState({ menuData });
//   }

//   searchValue = (query, row) => {
//     return row.indexOf(query) !== -1 || row === query;
//   };
// }
