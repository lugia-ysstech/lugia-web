import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './widgets/input';
import TextArea from './widgets/input';
import AmountInput from './widgets/amount-input';
import NumberInput from './widgets/number-input';
import Cascader from './widgets/cascader';
import Select from './widgets/select';
import AutoComplete from './widgets/auto-complete';
import TreeSelect from './widgets/tree-select';
import TimePicker from './widgets/time-picker';
import DatePicker from './widgets/date-picker';
const Wrapper = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;
export class ValidateInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value.indexOf('a') === -1 ? 'default' : 'error';
    console.log(this);
    return (
      <Input onChange={this.onChange} validateType={validateType} validateStatus={validateStatus} />
    );
  }
}

export class ValidateNumberInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newValue: value } = obj;
    this.setState({ value });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === 1 ? 'error' : 'default';
    console.log(this);
    return (
      <NumberInput
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

export class ValidateTextArea extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newValue: value } = obj;
    this.setState({ value });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value.indexOf('a') === -1 ? 'default' : 'error';
    console.log(this);
    return (
      <TextArea
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}
export class ValidateAmountInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newValue: value } = obj;
    this.setState({ value });
  };

  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === 1 ? 'error' : 'default';
    return (
      <AmountInput
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

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
export class ValidateAutoComplete extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menuData: data,
      value: props.value || '',
    };
  }
  search(query: string) {
    let menuData;
    let rowSet = [];
    const len = data.length;

    for (let i = 0; i < len; i++) {
      const row = data[i];
      if (query === row) {
        rowSet = [];
        break;
      }

      if (this.searchValue(query, row)) {
        rowSet.push(row);
      }
    }

    if (rowSet.length === len) {
      menuData = data;
    } else {
      menuData = rowSet;
    }
    this.setState({ menuData });
  }

  searchValue = (query: string, row: string) => {
    return row.indexOf(query) !== -1 || row === query;
  };
  onChange = (value: string) => {
    this.search(value);
    console.log(value, this);

    this.setState({ value });
  };

  render() {
    const { validateType } = this.props;
    const { menuData, value } = this.state;
    const validateStatus = value === 'Armin van Buuren' ? 'error' : 'default';
    return (
      <AutoComplete
        placeholder={'请输入'}
        showOldValue
        value={value}
        data={menuData}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

const data_Cascader = [
  {
    text: '一级菜单1',
    value: 'a1',
    disabled: false,
  },
  { text: '一级菜单2', value: 'a2', disabled: false },
  { text: '一级菜单3', value: 'a3', disabled: false },
  {
    text: '一级菜单4',
    value: 'a4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: 'a4-1',
        children: [{ text: '三级菜单4-1-1', value: 'a4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: 'a5', disabled: true },
  {
    text: '一级菜单6',
    value: 'a6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: 'a6-1' },
      {
        text: '次级菜单6-2',
        value: 'a6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: 'a6-2-1',
            children: [
              { text: 'sub1', value: 'suba1', children: [{ text: 'sub2', value: 'suba2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: 'a6-2-2' },
          { text: '三级菜单6-2-3', value: 'a6-2-3' },
        ],
      },
    ],
  },
  { text: '一级菜单7', value: 'a7', disabled: true },
  { text: '一级菜单8', value: 'a8', disabled: false },
  { text: '一级菜单9', value: 'a9', disabled: true },
  { text: '一级菜单10', value: 'a10', disabled: false },
];
export class ValidateCascader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  handleChangeActiveValue = (obj: Object) => {
    const value = obj[0];
    this.setState({ value });
  };

  onClear = () => {
    this.setState({ selectedKeys: [] });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === 'a1' ? 'error' : 'default';
    return (
      <Cascader
        showOldValue
        data={data_Cascader}
        placeholder={'请选择'}
        action={'hover'}
        separator={'*'}
        onClear={this.onClear}
        onChange={this.handleChangeActiveValue}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

const data_select = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(10);
export class ValidateSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  onChange = (obj: any) => {
    const { newDisplayValue: value } = obj;
    this.setState({ value });
  };

  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === 'txt0' ? 'error' : 'default';
    return (
      <Select
        canSearch
        displayField={'label'}
        limitCount={5}
        data={data_select}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

const data_TreeSelect = [
  { key: '1', title: '1', isLeaf: true },

  { key: '2', title: '2' },
  { key: '2.1', title: '2.1', pid: '2', path: '2' },
  { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true },
  { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1' },
  { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true },
  { key: '2.2', title: '2.2', pid: '2', path: '2' },
  { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2' },
  { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true },

  { key: '3', title: '3' },
  { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true },
  { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true },
  { key: '4', title: '4', isLeaf: true },
];
export class ValidateTreeSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newDisplayValue: value } = obj;
    this.setState({ value });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value[0] === '1' ? 'error' : 'default';
    return (
      <TreeSelect
        data={data_TreeSelect}
        onlySelectLeaf
        valueField={'key'}
        displayField={'title'}
        igronSelectField="notCanSelect"
        expandAll
        mutliple
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

export class ValidateDatePicker extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newValue: value } = obj;
    this.setState({ value });
  };

  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === '2020-04-30' ? 'error' : 'default';
    return (
      <DatePicker
        step={9}
        suffix={'lugia-icon-financial_date'}
        showTime
        data={data_select}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

export class ValidateTimePicker extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  onChange = (obj: any) => {
    const { newValue: value } = obj;
    this.setState({ value });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    const validateStatus = value === '06:06:06' ? 'error' : 'default';

    return (
      <TimePicker
        canSearch
        displayField={'label'}
        limitCount={5}
        data={data_select}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

class ValidateDemo extends Component {
  render() {
    const onChange = () => {};
    return (
      <div>
        <Wrapper>
          <p>input top 输入值 是否含有a</p>
          <ValidateInput validateType="top" onChange={onChange()} />
          <p>input bottom 输入值 是否含有a</p>
          <ValidateInput validateType="bottom" onChange={onChange()} />
          <p>inputinner 输入值 是否含有a </p>
          <ValidateInput validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>NumberInput top 输入值 是否是1</p>
          <ValidateNumberInput validateType="top" onChange={onChange()} />
          <p>NumberInput bottom 输入值 是否是1</p>
          <ValidateNumberInput validateType="bottom" onChange={onChange()} />
          <p>NumberInput inner 输入值 是否是1</p>
          <ValidateNumberInput validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>TextArea top 输入值 包含a</p>
          <ValidateTextArea validateType="top" onChange={onChange()} />
          <p>TextArea bottom 输入值 包含a</p>
          <ValidateTextArea validateType="bottom" onChange={onChange()} />
          <p>TextArea inner 输入值 包含a</p>
          <ValidateTextArea validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>AmountInput top 输入值 是否是1</p>
          <ValidateAmountInput
            validateType="top"
            placeholder={'请填写金额'}
            onChange={onChange('limit')}
          />
          <p>AmountInput bottom 输入值 是否是1</p>
          <ValidateAmountInput validateType="bottom" onChange={onChange()} />
          <p>AmountInput inner 输入值 是否是1</p>
          <ValidateAmountInput validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>TopAutoComplete top 搜索结果是否为Armin van Buuren</p>
          <ValidateAutoComplete validateType="top" onChange={onChange} />
          <p>ValidateAutoComplete bottom 搜索结果是否为Armin van Buuren</p>
          <ValidateAutoComplete validateType="bottom" onChange={onChange} />
          <p>ValidateAutoComplete inner 搜索结果是否为Armin van Buuren</p>
          <ValidateAutoComplete validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>Cascader top 选择是否为一级菜单</p>
          <ValidateCascader validateType="top" onChange={onChange()} />
          <p>Cascader bottom 选择是否为一级菜单</p>
          <ValidateCascader validateType="bottom" onChange={onChange()} />
          <p>Cascader inner 选择是否为一级菜单</p>
          <ValidateCascader validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>Select top 选择是否为txt0</p>
          <ValidateSelect validateType="top" onChange={onChange()} />
          <p>Select bottom 选择是否为txt0</p>
          <ValidateSelect validateType="bottom" onChange={onChange()} />
          <p>Select inner 选择是否为txt0</p>
          <ValidateSelect validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>TreeSelect top 选择是否为第1个文件</p>
          <ValidateTreeSelect validateType="top" onChange={onChange()} />
          <p>TreeSelect bottom 选择是否为第1个文件</p>
          <ValidateTreeSelect validateType="bottom" onChange={onChange()} />
          <p>TreeSelect inner 选择是否为第1个文件</p>
          <ValidateTreeSelect validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>DatePicker top 选择日期是否为2020-04-30</p>
          <ValidateDatePicker validateType="top" onChange={onChange()} />
          <p>DatePicker bottom 选择日期是否为2020-04-30</p>
          <ValidateDatePicker validateType="bottom" onChange={onChange()} />
          <p>DatePicker inner 选择日期是否为2020-04-30</p>
          <ValidateDatePicker validateType="inner" onChange={onChange()} />
        </Wrapper>

        <Wrapper>
          <p>TimePicker top 选择时间是否为06:06:06</p>
          <ValidateTimePicker validateType="top" onChange={onChange()} />
          <p>TimePicker bottom 选择时间是否为06:06:06</p>
          <ValidateTimePicker validateType="bottom" onChange={onChange()} />
          <p>TimePicker inner 选择时间是否为06:06:06</p>
          <ValidateTimePicker validateType="inner" onChange={onChange()} />
        </Wrapper>
      </div>
    );
  }
}
export default ValidateDemo;
