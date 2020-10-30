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
import Theme from '../theme';
const H2 = styled.h2`
  padding: 20px;
`;

const Box = styled.div`
  padding-bottom: 20px;
`;

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}`, name: `name${i}`, address: `name${i + 1}` });
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

const selectTheme = {
  [Widget.Select]: {
    QueryInput: {
      Container: {
        normal: {
          width: 400,
          border: getBorder({ width: 1, style: 'solid', color: 'red' }),
        },
      },
      ClearButton: {
        normal: {
          color: 'blue',
        },
      },
      Placeholder: {
        normal: {
          color: 'green',
        },
      },
    },
    ToggleIcon: {
      normal: {
        color: 'blue',
      },
    },
    ResetIcon: {
      normal: {
        color: 'yellow',
      },
    },
    SearchAddIcon: {
      normal: {
        color: 'red',
      },
    },
    TagIcon: {
      normal: {
        color: 'yellow',
      },
    },
    CheckAllIcon: {
      normal: {
        color: 'orange',
      },
    },
    DeselectionIcon: {
      normal: {
        color: 'skyblue',
      },
    },
    SearchIcon: {
      normal: {
        color: 'brown',
      },
    },
  },
};

const pageLifeCycle: any = [
  { eventValue: 'constructor', eventName: '页面初始化' },
  { eventValue: 'componentDidMount', eventName: '页面打开' },
  { eventValue: 'componentWillUnmount', eventName: '页面关闭' },
];

const EventWarpNumber = styled.div`
  display: flex;
  width: 40px;
  height: 18px;
  background: #d8d8d8;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;
const Test = props => {
  return (
    <EventWarpNumber>
      <Icon iconClass={'lugia-icon-financial_lightning_o'} />1
    </EventWarpNumber>
  );
};

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      value: ['key-a'],
    };
  }

  renderSuffixItems(item) {
    return [<Test data={item} />];
  }

  render() {
    const { value } = this.state;

    return (
      <Box>
        <H2>single value 是constructor</H2>
        <Select
          createPortal
          data={pageLifeCycle}
          onSelect={this.onSelect}
          isShowClearButton={false}
          valueField={'eventValue'}
          displayField={'eventName'}
        />
        <H2>renderSuffixItems属性</H2>
        <Select
          createPortal
          data={pageLifeCycle}
          onSelect={this.onSelect}
          isShowClearButton={false}
          valueField={'eventValue'}
          displayField={'eventName'}
          renderSuffixItems={this.renderSuffixItems}
        />
        <H2>single search</H2>
        <Select virtual canSearch canClear={false} displayField={'label'} data={data} />

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
        <H2>多条件过滤</H2>
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
          searchFields={['value', 'label', 'address', 'name']}
        />

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

        <H2>主题配置</H2>
        <Theme config={selectTheme}>
          <Select
            data={data}
            displayField={'label'}
            mutliple
            limitCount={5}
            pullIconClass="lugia-icon-direction_backtop"
            clearIconClass="lugia-icon-financial_deselection"
            searchClearIcon="lugia-icon-reminder_clock_circle"
            toggleIcon="lugia-icon-direction_folding_up"
            resetIcon="lugia-icon-financial_loading"
            singleClearIcon="lugia-icon-reminder_close"
            searchAddIcon="lugia-icon-reminder_plus_circle"
            checkAllIcon="lugia-icon-reminder_check_square_o"
            deselectionIcon="lugia-icon-reminder_close_square_o"
            searchIcon="lugia-icon-financial_reverse_audit"
            closeable
            canInput
          />
        </Theme>
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
