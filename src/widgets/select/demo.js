/**
 *
 * create by szfeng
 *
 */

import * as React from 'react';
import Select from './index';
import Widget from '../consts/index';
import Theme from '../theme/index';
import styled from 'styled-components';
import { getBorder } from '@lugia/theme-css-hoc';

const H2 = styled.h2`
  padding: 20px;
`;

const Box = styled.div`
  padding-bottom: 500px;
`;

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(10);

const config = {
  [Widget.Select]: {
    [Widget.Menu]: {
      MenuWrap: {
        normal: {
          width: 300,
          height: 200,
          opacity: 0.6,
          boxShadow: '2px 2px 5px #4d63ff',
          background: { color: '#000' },
          border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 20 }),
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
    },
    [Widget.InputTag]: {
      InputTagWrap: {
        normal: {
          width: 340,
          height: 60,
          color: '#4d63ff',
          boxShadow: '2px 2px 5px #000',
          font: { size: 20 },
          // background: { color: '#eee' },
          border: getBorder({}, { radius: 20 }),
          margin: {
            top: 40,
            left: 100,
          },
          // padding: {
          //   left: '20',
          //   right: '30',
          // },
        },
        hover: {
          boxShadow: '2px 2px 5px #4d63ff',
          color: '#4d63ff',
          border: getBorder({}, { radius: 10 }),
        },
      },
      // TagWrap: {
      //   normal: {
      //     height: 20,
      //     margin: {
      //       left: 50,
      //       right: 5,
      //     },
      //     padding: {
      //       left: 10,
      //       right: 10,
      //     },

      //     // border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 10 }),
      //   },
      //   hover: {
      //     background: { color: 'orange' },
      //   },
      // },
      // TagIcon: {
      //   normal: {
      //     font: { fontSize: 14, color: '#999' },
      //   },
      //   hover: {
      //     color: '#4d63ff',
      //   },
      // },
      Icon: {
        normal: {
          // color: '#ddd',
          font: { fontSize: 30 },
        },
        hover: { color: '#4d63ff' },
      },
      // Menu: {
      //   MenuWrap: {
      //     normal: {
      //       width: 200,
      //       height: 200,
      //       opacity: 0.6,
      //       boxShadow: '2px 2px 5px #4d63ff',
      //       background: { color: '#000' },
      //       border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 20 }),
      //     },
      //     hover: {
      //       opacity: 1,
      //     },
      //   },
      //   MenuItem: {
      //     normal: { color: '#ccc', fontSize: 14, font: { fontWeight: 900 } },
      //     hover: {
      //       color: '#fff',
      //       fontSize: 20,
      //       background: { color: 'green' },
      //       font: { fontWeight: 400 },
      //     },
      //     active: {
      //       color: 'blue',
      //       fontSize: 14,
      //       background: { color: 'pink' },
      //       font: { fontWeight: 900 },
      //     },
      //     disabled: { color: 'red', background: { color: '#000' } },
      //   },
      // },
    },
  },
};

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    const width = 300;
    this.state = {
      menu: null,
      value: ['key-a'],
    };
  }

  render() {
    const { value, displayValue } = this.state;

    return (
      <Box>
        <H2>single</H2>
        <Select
          theme={config}
          data={data}
          displayField={'label'}
          mutliple
          // value={value}
          // displayValue={value}
          // throttle={1000}
          // onQuery={this.onQuery}
          // canSearch
          // onChange={this.handleChange}
          // onTrigger={this.onTrigger}
          // onQuery={this.handleQuery}
          // onSelect={this.handleSelect}
        />

        {/* <H2>single search</H2>
          <Select canSearch displayField={'label'} data={data} />

          <Select canSearch displayField={'label'} disabled data={data} />

          <H2>single canInput</H2>
          <Select canSearch canInput displayField={'label'} data={data} />

          <H2>非受限 mutliple</H2>
          <Select data={data} displayField={'label'} mutliple limitCount={5} />

          <H2>非受限 mutliple DefaultValue</H2>
          <Select
            mutliple
            defaultValue={['key-0', 'key-1']}
            defaultDisplayValue={['txt0', 'txt1']}
            displayField={'label'}
            limitCount={5}
            data={data}
            onSelect={this.onSelect}
            onChange={this.onChange}
          />

          <H2>受限 mutliple canInput</H2>
          <Select
            value={value}
            displayValue={[]}
            mutliple
            canSearch
            limitCount={3}
            canInput
            displayField={'label'}
            data={data}
            onQuery={this.onQuery}
            onChange={this.onChange}
          /> */}
      </Box>
    );
  }

  handleChange = obj => {
    console.log('obj', obj);
  };

  onTrigger = () => {
    console.log('visible');
  };

  handleQuery = value => {
    console.log('query', value);
  };

  handleSelect = obj => {
    console.log('handleSelect', obj);
  };

  onChange = obj => {
    const { value, displayValue } = obj;
    this.setState({ value, displayValue });
  };

  onSelect = obj => {};

  onQuery = value => {
    console.log(value);
  };

  onChangeNoDisplayValue = obj => {
    const { value, displayValue } = obj;

    this.setState({
      value,
      displayValue,
    });
  };
}
