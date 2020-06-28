/**
 *
 * create by szfeng
 *
 */

import * as React from 'react';
import Select from './index';
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

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({
      value: `key-${i}`,
      label:
        i === 0
          ? `key-${i}keykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykeykey`
          : `key-${i}`,
      icon: 'lugia-icon-financial_monitoring',
    });
  }
  return res;
})(10);

const data1 = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({
      value: `key-${i}`,
      label: `txt${i}`,
      icon: 'lugia-icon-financial_monitoring',
    });
  }
  return res;
})(10);

const config = {
  [Widget.Select]: {
    Container: {
      normal: {
        width: '250',
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
    return [
      <H1>单选select</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'}</H1>
          <Select
            disabled={false}
            placeholder={'请选择'}
            defaultValue={['key-0']}
            theme={config}
            createPortal
            data={data}
            onSelect={this.onSelect}
            displayField={'label'}
            size={'small'}
            prefix={
              <Icon
                onClick={e => {
                  console.log('prefix');
                  e.stopPropagation();
                }}
                iconClass={'lugia-icon-financial_like'}
              />
            }
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'}</H1>
          <Select
            theme={config}
            createPortal
            data={data}
            displayField={'label'}
            onSelect={this.onSelect}
            placeholder={'请选择'}
            isShowClearButton={true}
            size={'default'}
            mutliple={false}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'}</H1>
          <Select
            theme={config}
            createPortal
            data={data}
            displayField={'label'}
            placeholder={'请选择'}
            onSelect={this.onSelect}
            isShowClearButton={true}
            size={'large'}
            mutliple={false}
          />
        </RowWrapItem>
      </RowWrap>,
      <H1>多选select</H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>size={'small'} checkedCSS='background'</H1>
          <Select
            disabled={false}
            defaultValue={['key-1', 'key-2', 'key-3', 'key-4', 'key-5', 'key-6', 'key-7', 'key-8']}
            theme={config}
            createPortal
            placeholder={'请选择'}
            data={data}
            onSelect={this.onSelect}
            isShowClearButton={false}
            displayField={'label'}
            size={'small'}
            checkedCSS="background"
            prefix={
              <Icon
                onClick={e => {
                  console.log('prefix');
                  e.stopPropagation();
                }}
                iconClass={'lugia-icon-financial_like'}
              />
            }
            mutliple={true}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'default'} checkedCSS='checkbox'</H1>
          <Select
            disabled={false}
            value={['key-1', 'key-2']}
            theme={config}
            createPortal
            placeholder={'请选择'}
            data={data}
            displayField={'label'}
            onSelect={this.onSelect}
            isShowClearButton={true}
            size={'default'}
            checkedCSS="checkbox"
            mutliple={true}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1>size={'large'} checkedCSS='checkbox'</H1>
          <Select
            disabled={true}
            value={['key-1', 'key-2']}
            theme={config}
            placeholder={'请选择'}
            createPortal
            data={data1}
            displayField={'label'}
            onSelect={this.onSelect}
            isShowClearButton={true}
            checkedCSS="checkbox"
            size={'large'}
            mutliple={true}
          />
        </RowWrapItem>
      </RowWrap>,
    ];
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
