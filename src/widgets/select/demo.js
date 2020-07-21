/**
 *
 * create by szfeng
 *
 */

import * as React from 'react';
import Select from './index';
import Widget from '../consts/index';
import styled from 'styled-components';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Icon from '../icon';
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

const newView = {
  [Widget.Select]: {
    Container: {
      normal: {
        width: 600,
        height: 80,
      },
    },
  },
};

const config = {
  [Widget.Select]: {
    Container: {
      normal: {
        width: 300,
        height: 50,
        border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
      },
      hover: {
        border: getBorder({ color: 'blue', width: 10, style: 'solid' }),
      },
      active: {
        border: getBorder({ color: 'pink', width: 10, style: 'solid' }),
      },
    },
    ValidateErrorInput: {
      normal: {
        border: getBorder({ color: 'yellow', width: 1, style: 'solid' }),
      },
    },
  },
};

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      value: ['key-a'],
    };
  }

  render() {
    const { value } = this.state;

    return (
      <Box>
        <H2>select 自定义后缀 demo</H2>

        <Select
          theme={config}
          createPortal
          data={data}
          onSelect={this.onSelect}
          isShowClearButton={false}
          displayField={'label'}
          validateStatus={'error'}
          validateType={'inner'}
          help={'您输入的有误'}
          suffix={
            <Icon
              onClick={e => {
                console.log('suffix');
                e.stopPropagation();
              }}
              iconClass={'lugia-icon-reminder_refresh'}
            />
          }
          prefix={
            <Icon
              onClick={e => {
                console.log('prefix');
                e.stopPropagation();
              }}
              iconClass={'lugia-icon-financial_like'}
            />
          }
          mutliple={false}
        />

        <H2>single search</H2>
        <Select virtual canSearch canClear={false} displayField={'label'} data={data} />

        <Select virtual canSearch displayField={'label'} disabled data={data} />

        <H2>single canInput</H2>
        <Select virtual canSearch canInput displayField={'label'} data={data} />

        <H2>非受限 mutliple</H2>
        <Select virtual data={data} displayField={'label'} mutliple limitCount={5} />

        <H2>非受限 mutliple DefaultValue</H2>
        <Select
          theme={newView}
          mutliple
          virtual
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
          virtual
          mutliple
          canSearch
          limitCount={3}
          canInput
          displayField={'label'}
          data={data}
          onQuery={this.onQuery}
          onChange={this.onChange}
        />
        <H2>原生滚动条</H2>
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
        <H2>性能原生滚动条</H2>
        <Select
          value={value}
          displayValue={[]}
          mutliple
          virtual
          canSearch
          limitCount={3}
          canInput
          displayField={'label'}
          data={data}
          onQuery={this.onQuery}
          onChange={this.onChange}
        />
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

  onSelect = obj => {
    console.log('obj', obj);
  };

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
