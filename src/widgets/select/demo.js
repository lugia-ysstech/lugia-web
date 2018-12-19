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

const H2 = styled.h2`
  padding: 20px;
`;

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(20 * 1);
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    const width = 300;
    this.state = {
      menu: null,
      value: ['key-a', 'key+', 'key++'],
      // config: { [Widget.Select]: { width } },
      config: {},
    };
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

  render() {
    const { config, value, displayValue } = this.state;

    return (
      <Theme config={config}>
        <div>
          <H2>single</H2>
          <Select
            data={data}
            displayField={'label'}
            value={value}
            throttle={1000}
            onQuery={this.onQuery}
            canSearch
            mutliple
            onChange={this.handleChange}
            onTrigger={this.onTrigger}
            onQuery={this.handleQuery}
            onSelect={this.handleSelect}
          />

          <H2>single search</H2>
          <Select canSearch displayField={'label'} data={data} />

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
          />
        </div>
      </Theme>
    );
  }

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
