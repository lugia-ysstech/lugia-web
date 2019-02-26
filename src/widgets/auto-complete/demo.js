import * as React from 'react';
import AutoComplete from './';

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
    const { menuData, value } = this.state;
    return <AutoComplete showOldValue value={value} data={menuData} onChange={this.onChange} />;
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
