/**
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from '../../consts/index';
import AutoComplete from '../';
import { delay } from '@lugia/react-test-utils';
import chai from 'chai';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;

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

describe('autocomplete', () => {
  it('非受限：input框输入值', () => {
    const cmp = mount(<AutoComplete />);
    changeInputValue(cmp, 'szfeng');
    expect(getInputValue(cmp)).toBe('szfeng');
  });

  it('受限：input框输入值', () => {
    const cmp = mount(<AutoComplete value={''} />);
    changeInputValue(cmp, 'szfeng');
    expect(getInputValue(cmp)).toBe('');
  });

  it('defaultValue: input框输入值', () => {
    const cmp = mount(<AutoComplete defaultValue={'hades'} />);
    expect(getInputValue(cmp)).toBe('hades');
    changeInputValue(cmp, 'szfeng');
    expect(getInputValue(cmp)).toBe('szfeng');
  });

  it('data is { value: Number[]}', () => {
    const numberData = [1, 2, 3];
    const cmp = mount(<AutoComplete data={numberData} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, '1');
    expect(getInputValue(cmp)).toBe('1');
    expect(getMenuData(cmp)).toEqual([
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' },
    ]);
  });

  class AutoCompleteNotBounded extends React.Component<any, any> {
    static defaultProps = {
      data,
    };
    constructor(props) {
      super(props);
      this.state = {
        menuData: data,
      };
    }
    render() {
      const { menuData } = this.state;
      return <AutoComplete data={menuData} onChange={this.onChange} showOldValue={true} />;
    }

    onChange = (value: string) => {
      this.search(value);
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

  it('非受限：input框输入后，menu显示过滤后的值', () => {
    const cmp = mount(<AutoCompleteNotBounded />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Axwell ^ Ingrosso', text: 'Axwell ^ Ingrosso' },
      { value: 'Avicci', text: 'Avicci' },
      { value: 'Alesso', text: 'Alesso' },
      { value: 'Afrojack', text: 'Afrojack' },
    ]);

    changeInputValue(cmp, '');
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);

    changeInputValue(cmp, '');
    expect(getInputValue(cmp)).toBe('');

    expect(findEmptyBox(cmp).length).toBe(1);
  });

  it('非受限：输入》查询》点击MenuItem =》显示选中项', () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
  });

  it('非受限：输入》查询》点击MenuItem》查询》点击MenuItem》显示旧值', async () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 1);
    expect(getInputValue(cmp)).toBe('Bassjackers');

    changeInputValue(cmp, 'C');
    expect(getInputValue(cmp)).toBe('C');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');
  });

  it('非受限：输入》查询》点击MenuItem》点击清除按钮》显示旧值为上一次值', () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'C');
    expect(getInputValue(cmp)).toBe('C');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');
  });

  it('非受限：点击旧值 》Input显示旧值', () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);
    changeInputValue(cmp, 'C');
    expect(getInputValue(cmp)).toBe('C');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');

    selectOldValueItem(cmp);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
    expect(findEmptyBox(cmp).length).toBe(1);
  });

  it('first select no oldValue', async () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');

    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    letInputOnBlur(cmp);
    await delay(100);
    letInputonFocus(cmp);
    selectMenuItem(cmp, 0);

    changeInputValue(cmp, 'C');
    expect(getInputValue(cmp)).toBe('C');
    expect(getOldValue(cmp)).toBe('B');
  });

  it('input value on blur save old value', async () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    letInputOnBlur(cmp);
    await delay(100);

    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    letInputOnBlur(cmp);

    await delay(100);
    letInputonFocus(cmp);
    expect(getOldValue(cmp)).toBe('A');

    changeInputValue(cmp, 'C');
    letInputOnBlur(cmp);
    await delay(100);
    letInputonFocus(cmp);
    changeInputValue(cmp, 'C');
    expect(getInputValue(cmp)).toBe('C');
    expect(getOldValue(cmp)).toBe('B');
  });

  it('input value on blur save old value , value is In AutoCompleteBounded.state.value', async () => {
    const cmp = mount(<AutoCompleteBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    letInputOnBlur(cmp);
    await delay(100);

    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    letInputOnBlur(cmp);

    cmp.update();
    await delay(100);
    letInputonFocus(cmp);
    changeInputValue(cmp, 'C');
    expect(getOldValue(cmp)).toBe('A');

    letInputOnBlur(cmp);
    await delay(100);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'D');
    expect(getOldValue(cmp)).toBe('B');
  });

  it('input value on blur save old value is limit', async () => {
    const cmp = mount(<AutoCompleteBounded data={data} value={'A'} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    letInputonFocus(cmp);
    expect(getInputValue(cmp)).toBe('A');
    letInputOnBlur(cmp);
    await delay(100);

    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('A');
    letInputOnBlur(cmp);

    await delay(100);
    letInputonFocus(cmp);
    expect(findOldValueSpan(cmp).length).toBe(0);

    changeInputValue(cmp, 'C');
    letInputOnBlur(cmp);
    await delay(100);
    letInputonFocus(cmp);
    changeInputValue(cmp, 'D');
    expect(findOldValueSpan(cmp).length).toBe(0);
  });

  it('on blur switch twice value', async () => {
    const cmp = mount(<AutoCompleteNotBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');

    letInputOnBlur(cmp);
    await delay(100);
    expect(getInputValue(cmp)).toBe('A');

    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    letInputOnBlur(cmp);
    await delay(100);
    expect(getInputValue(cmp)).toBe('B');

    await delay(100);
    letInputonFocus(cmp);
    changeInputValue(cmp, 'C');
    expect(getOldValue(cmp)).toBe('A');

    letInputOnBlur(cmp);
    await delay(100);
    letInputonFocus(cmp);
    expect(getOldValue(cmp)).toBe('B');

    expect(getMenuData(cmp)).toEqual([
      { value: 'The Chainsmokers', text: 'The Chainsmokers' },
      { value: 'Calvin Harris', text: 'Calvin Harris' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('The Chainsmokers');
    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getOldValue(cmp)).toBe('C');

    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
    letInputonFocus(cmp);
    changeInputValue(cmp, 'D');
    expect(getOldValue(cmp)).toBe('The Chainsmokers');
  });

  class AutoCompleteBounded extends React.Component<any, any> {
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

  it('受限：输入》查询》点击MenuItem =》显示选中项', () => {
    const cmp = mount(<AutoCompleteBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
  });

  it('受限：输入》查询》点击MenuItem》查询》点击MenuItem》显示旧值', async () => {
    const cmp = mount(<AutoCompleteBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
    letInputOnBlur(cmp);
    await delay(100);

    letInputonFocus(cmp);
    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 1);
    expect(getInputValue(cmp)).toBe('Bassjackers');
    letInputOnBlur(cmp);
    await delay(100);

    letInputonFocus(cmp);
    changeInputValue(cmp, 'C');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');
  });

  it('受限：输入》查询》点击MenuItem》点击清除按钮》显示旧值为上一次值', () => {
    const cmp = mount(<AutoCompleteBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'B');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');
  });

  it('受限：点击旧值 》Input显示旧值', () => {
    const cmp = mount(<AutoCompleteBounded data={data} />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'Armin van Buuren', text: 'Armin van Buuren' },
      { value: 'Bassjackers', text: 'Bassjackers' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);
    changeInputValue(cmp, 'B');
    expect(getOldValue(cmp)).toBe('Armin van Buuren');

    selectOldValueItem(cmp);
    expect(getInputValue(cmp)).toBe('Armin van Buuren');
    expect(findEmptyBox(cmp).length).toBe(1);
  });

  // Email自动补全框
  const emailData = ['@gmail.com', '@sina.com', '@163.com', '@qq.com'];

  class AutoCompleteEmailInput extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = {
        menuData: [],
      };
    }
    render() {
      const { menuData } = this.state;
      return <AutoComplete showOldValue data={menuData} onChange={this.onChange} />;
    }

    onChange = value => {
      this.getMenuData(value);
    };

    getMenuData = (value: string) => {
      const newData = [];
      emailData.forEach(item => {
        if (value.indexOf('@') === -1) {
          item = '' + value + item;
          newData.push(item);
        }
      });

      this.setState({ menuData: newData });
    };
  }

  it('Email自动补全@后缀：输入a，显示所有的后缀', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);

    changeInputValue(cmp, '');
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'B@gmail.com', text: 'B@gmail.com' },
      { value: 'B@sina.com', text: 'B@sina.com' },
      { value: 'B@163.com', text: 'B@163.com' },
      { value: 'B@qq.com', text: 'B@qq.com' },
    ]);

    changeInputValue(cmp, '');
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);
  });

  it('Email自动补全@后缀：输入@，不显示任何选项', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);

    changeInputValue(cmp, 'A@');
    expect(getInputValue(cmp)).toBe('A@');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'B@gmail.com', text: 'B@gmail.com' },
      { value: 'B@sina.com', text: 'B@sina.com' },
      { value: 'B@163.com', text: 'B@163.com' },
      { value: 'B@qq.com', text: 'B@qq.com' },
    ]);

    changeInputValue(cmp, '');
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);
  });

  it('Email自动补全@后缀：输入A，点击menuItem，选中该项', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('A@gmail.com');
  });

  it('Email自动补全@后缀：输入》选中》再输入》选中，显示旧值', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('A@gmail.com');

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'B@gmail.com', text: 'B@gmail.com' },
      { value: 'B@sina.com', text: 'B@sina.com' },
      { value: 'B@163.com', text: 'B@163.com' },
      { value: 'B@qq.com', text: 'B@qq.com' },
    ]);
    selectMenuItem(cmp, 1);
    expect(getInputValue(cmp)).toBe('B@sina.com');
    changeInputValue(cmp, 'B');
    expect(getOldValue(cmp)).toBe('A@gmail.com');
  });

  it('Email自动补全@后缀：输入》查询》点击MenuItem》点击清除按钮》显示旧值为上一次值', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('A@gmail.com');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);
    changeInputValue(cmp, 'B');
    expect(getOldValue(cmp)).toBe('A@gmail.com');
  });

  it('Email自动补全@后缀：选中旧值，input显示旧值', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('A@gmail.com');

    changeInputValue(cmp, 'B');
    expect(getInputValue(cmp)).toBe('B');
    expect(getMenuData(cmp)).toEqual([
      { value: 'B@gmail.com', text: 'B@gmail.com' },
      { value: 'B@sina.com', text: 'B@sina.com' },
      { value: 'B@163.com', text: 'B@163.com' },
      { value: 'B@qq.com', text: 'B@qq.com' },
    ]);
    selectMenuItem(cmp, 1);
    expect(getInputValue(cmp)).toBe('B@sina.com');
    changeInputValue(cmp, 'B');
    expect(getOldValue(cmp)).toBe('A@gmail.com');
  });

  it('Email自动补全@后缀：点击旧值 》Input显示旧值', () => {
    const cmp = mount(<AutoCompleteEmailInput />);
    letInputonFocus(cmp);

    changeInputValue(cmp, 'A');
    expect(getInputValue(cmp)).toBe('A');
    expect(getMenuData(cmp)).toEqual([
      { value: 'A@gmail.com', text: 'A@gmail.com' },
      { value: 'A@sina.com', text: 'A@sina.com' },
      { value: 'A@163.com', text: 'A@163.com' },
      { value: 'A@qq.com', text: 'A@qq.com' },
    ]);
    selectMenuItem(cmp, 0);
    expect(getInputValue(cmp)).toBe('A@gmail.com');

    clickClearButton(cmp);
    expect(getInputValue(cmp)).toBe('');
    expect(findEmptyBox(cmp).length).toBe(1);

    changeInputValue(cmp, 'A');
    expect(getOldValue(cmp)).toBe('A@gmail.com');

    selectOldValueItem(cmp);
    expect(getInputValue(cmp)).toBe('A@gmail.com');
    expect(findEmptyBox(cmp).length).toBe(1);
  });

  function findEmptyBox(cmp: Object) {
    return cmp.find('emptyBox');
  }

  function changeInputValue(cmp: Object, value: string) {
    return getInput(cmp).simulate('change', { target: { value } });
  }

  function getInputValue(cmp) {
    return getInput(cmp).props().value;
  }

  function getInput(cmp: Object) {
    return cmp
      .find(Widget.Input)
      .find('input')
      .at(0);
  }

  function letInputOnBlur(cmp: Object) {
    return getInput(cmp).simulate('blur', {});
  }

  function letInputonFocus(cmp: Object) {
    return getInput(cmp).simulate('focus', {});
  }

  function getMenuData(cmp: Object) {
    return getMenu(cmp).props().data;
  }

  function getMenu(cmp: Object) {
    return cmp.find(Widget.Menu);
  }

  function selectMenuItem(cmp: Object, index: number) {
    return cmp
      .find(Widget.MenuItem)
      .at(index)
      .simulate('click', {});
  }

  function findOldValueSpan(cmp: Object) {
    return cmp.find('OldValueTitle');
  }
  function getOldValue(cmp: Object) {
    return findOldValueSpan(cmp)
      .at(0)
      .text();
  }

  function clickClearButton(cmp: Object) {
    return cmp
      .find('i')
      .at(0)
      .simulate('click', {});
  }

  function selectOldValueItem(cmp: Object) {
    return OldValueItem(cmp).simulate('click', {});
  }

  function OldValueItem(cmp: Object) {
    return cmp.find('oldValueItem').at(0);
  }
});
