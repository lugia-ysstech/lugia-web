/**
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { delay } from '@lugia/react-test-utils';
import Select from '../';
import Widget from '../../consts/index';
import Theme from '../../theme';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(20 * 10);

describe('Select', () => {
  it('点击弹出面板', () => {
    const cmp = mount(<Select displayField={'label'} data={data} />);
    cmp
      .children()
      .at(0)
      .simulate('click');

    cmp.update();
    exp(cmp.find('MenuContainer').length).to.be.equal(1);
  });

  it('单选 设置value', async () => {
    const value = ['szfeng'];
    const cmp = mount(<Select mutliple data={data} value={value} displayField={'label'} />);
    exp(getInputTagValue(cmp)).to.be.eql(value);
    exp(getInputTagDisplayValue(cmp)).to.be.eql(value);
  });

  it('单选查询功能', async () => {
    const cmp = mount(<Select data={data} canSearch displayField={'label'} />);
    const queryValue = 'szfeng';
    showTrigger(cmp);
    changeQuery(cmp, queryValue);
    exp(getQueryInputValue(cmp)).to.be.equal(queryValue);
  });

  it('关闭trigger后，清空queryInput值', () => {
    const cmp = mount(<Select data={data} canSearch displayField={'label'} />);
    const queryValue = 'szfeng';
    showTrigger(cmp);
    changeQuery(cmp, queryValue);
    showTrigger(cmp);
    showTrigger(cmp);
    exp(getQueryInputValue(cmp)).to.be.equal('');
  });

  it('点击选择全部', () => {
    const cmp = mount(<Select data={data} mutliple displayField={'label'} />);
    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    unCheckAll(cmp);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
  });

  function createCanInputSelect({ mutliple }) {
    it(`多选mutliple: ${mutliple.toString()} canInput: true`, () => {
      const cmp = mount(
        <Select data={data} mutliple={mutliple} canSearch canInput displayField={'label'} />
      );
      showTrigger(cmp);
      const text = 'shizhenfeng';
      changeQuery(cmp, text);
      queryInputEnter(cmp);
      mutliple
        ? exp(cmp.find(Widget.InputTagItem).text()).to.be.equal(text)
        : exp(getInputTagValue(cmp)[0]).to.be.equal(text);
    });
  }

  createCanInputSelect({ mutliple: true });
  createCanInputSelect({ mutliple: false });

  it('选择全部 limitCount: 10', async () => {
    const cmp = mount(<Select data={data} mutliple limitCount={10} displayField={'label'} />);
    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    const value = data.filter((item: Object, index: number) => index < 10).map(item => item.value);
    checkSelectValue(cmp, value);
  });

  it('选择全部 limitCount: 10, canInput 先选全部再自定义输入', async () => {
    const cmp = mount(
      <Select data={data} mutliple canSearch canInput limitCount={10} displayField={'label'} />
    );

    showTrigger(cmp);
    checkAll(cmp);
    const text = 'szfeng';
    changeQuery(cmp, text);
    queryInputEnter(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;

    const value = data.filter((item: Object, index: number) => index < 10).map(item => item.value);
    checkSelectValue(cmp, value);
  });

  class LimitSelect extends React.Component<any, any> {
    constructor(props) {
      super(props);
      const { value = [], displayValue = [] } = props;
      this.state = { value, displayValue };
    }

    render() {
      const { state, props } = this;
      const { value, displayValue } = state;
      const { limitCount } = props;
      return (
        <Select
          data={data}
          mutliple
          value={value}
          onChange={this.onChange}
          displayValue={displayValue}
          canInput
          canSearch
          limitCount={limitCount}
          displayField={'label'}
        />
      );
    }

    onChange = obj => {
      const { newValue, newDisplayValue } = obj;
      this.setState({
        value: newValue,
        displayValue: newDisplayValue,
      });
    };
  }

  it('limitCount: 5 受限组件', () => {
    const cmp = mount(<LimitSelect limitCount={5} />);

    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    const expValue = data
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.value);
    checkSelectValue(cmp, [...expValue]);
    unCheckAll(cmp);
    checkSelectValue(cmp, []);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
  });

  it('limitCount: 5 受限组件==>有默认值==>刷新', () => {
    const limit = 5;

    const value = ['key-0'];
    const cmp = mount(<LimitSelect value={value} limitCount={limit} />);

    showTrigger(cmp);
    checkSelectValue(cmp, value);
    clickRefreshButton(cmp);
    checkSelectValue(cmp, []);
    exp(getQueryInputValue(cmp)).to.be.equal('');
  });

  it('默认值为顶部的值 然后全选 limitCount: 5', () => {
    const value = ['key-0', 'key-1'];
    const displayValue = [];
    const cmp = mount(
      <Select
        data={data}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canSearch
        canInput
        limitCount={5}
        displayField={'label'}
      />
    );

    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    checkSelectValue(cmp, [...value, 'key-2', 'key-3', 'key-4']);
    showTrigger(cmp);
    unCheckAll(cmp);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
    checkSelectValue(cmp, []);
  });

  it('默认值为中间的值 然后进行全选 limitCount: 5', () => {
    const value = ['key-10', 'key-11'];
    const displayValue = [];
    const cmp = mount(
      <Select
        data={data}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canSearch
        canInput
        limitCount={5}
        displayField={'label'}
      />
    );

    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    checkSelectValue(cmp, [...value, 'key-0', 'key-1', 'key-2']);
    showTrigger(cmp);
    unCheckAll(cmp);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
    checkSelectValue(cmp, []);
  });

  it('默认值为底部的值 然后进行全选 limitCount: 5', () => {
    const value = ['key-199998', 'key-199999'];
    const displayValue = [];
    const cmp = mount(
      <Select
        data={data}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canSearch
        canInput
        limitCount={5}
        displayField={'label'}
      />
    );

    showTrigger(cmp);
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;
    checkSelectValue(cmp, [...value, 'key-0', 'key-1', 'key-2']);
    showTrigger(cmp);
    unCheckAll(cmp);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
    checkSelectValue(cmp, []);
  });

  it('受限组件 点击全选', async () => {
    let onChange;
    const changeResult = new Promise(resolve => {
      onChange = arg => {
        const { newValue: value, newDisplayValue: displayValue } = arg;
        resolve({ value, displayValue });
      };
    });

    const value = ['123'];
    const displayValue = ['一二三'];
    const config = { [Widget.Select]: { width: 300 } };

    const cmp = mount(
      <Theme config={config}>
        <Select
          data={data}
          onChange={onChange}
          mutliple
          value={value}
          displayValue={displayValue}
          canSearch
          canInput
          displayField={'label'}
        />
      </Theme>
    );
    showTrigger(cmp);
    checkAll(cmp);
    checkSelectValue(cmp, value);

    const result = await changeResult;
    expect(result).toEqual({
      value: [...value, ...getAllDataValue(data)],
      displayValue: [...displayValue, ...getAllDataDisplayValue(data)],
    });
    checkSelectValue(cmp, value);
  });

  it('受限组件 可自定义输入canInput ,添加', async () => {
    let onChange;
    const changeResult = new Promise(resolve => {
      onChange = arg => {
        const { newValue: value, newDisplayValue: displayValue } = arg;
        resolve({ value, displayValue });
      };
    });

    const value = ['123'];
    const displayValue = ['一二三'];
    const config = { [Widget.Select]: { width: 300 } };

    const cmp = mount(
      <Theme config={config}>
        <Select
          data={data}
          onChange={onChange}
          mutliple
          value={value}
          displayValue={displayValue}
          canSearch
          canInput
          displayField={'label'}
        />
      </Theme>
    );
    showTrigger(cmp);
    checkAll(cmp);
    checkSelectValue(cmp, value);

    const result = await changeResult;
    expect(result).toEqual({
      value: [...value, ...getAllDataValue(data)],
      displayValue: [...displayValue, ...getAllDataDisplayValue(data)],
    });
    checkSelectValue(cmp, value);
  });

  it('非受限组件 value 点击选择全部', async () => {
    let onChange;
    const changeResult = new Promise(resolve => {
      onChange = arg => {
        const { newValue: value, newDisplayValue: displayValue } = arg;
        resolve({ value, displayValue });
      };
    });

    const value = ['123'];
    const displayValue = ['一二三'];
    const config = { [Widget.Select]: { width: 300 } };

    const cmp = mount(
      <Theme config={config}>
        <Select
          data={data}
          onChange={onChange}
          mutliple
          value={value}
          displayValue={displayValue}
          canSearch
          canInput
          displayField={'label'}
        />
      </Theme>
    );
    showTrigger(cmp);
    checkAll(cmp);
    checkSelectValue(cmp, value);

    const result = await changeResult;
    expect(result).toEqual({
      value: [...value, ...getAllDataValue(data)],
      displayValue: [...displayValue, ...getAllDataDisplayValue(data)],
    });
    checkSelectValue(cmp, value);
  });

  it('非受限组件 defaultValue 点击选择全部', async () => {
    let onChange;
    const changeResult = new Promise(resolve => {
      onChange = arg => {
        const { newValue: value, newDisplayValue: displayValue } = arg;
        resolve({ value, displayValue });
      };
    });

    const value = ['123'];
    const displayValue = ['一二三'];
    const config = { [Widget.Select]: { width: 300 } };

    const cmp = mount(
      <Theme config={config}>
        <Select
          data={data}
          onChange={onChange}
          mutliple
          defaultValue={value}
          defaultDisplayValue={displayValue}
          canSearch
          canInput
          displayField={'label'}
        />
      </Theme>
    );
    showTrigger(cmp);
    checkAll(cmp);
    const allValue = [...value, ...getAllDataValue(data)];
    const allDisplayValue = [...displayValue, ...getAllDataDisplayValue(data)];

    checkSelectValue(cmp, allValue);

    const result = await changeResult;
    expect(result).toEqual({
      value: allValue,
      displayValue: allDisplayValue,
    });
  });

  it('canInput，先输入自定义值，再选择全部', async () => {
    const config = { [Widget.Select]: { width: 300 } };

    const cmp = mount(
      <Theme config={config}>
        <Select data={data} mutliple canInput canSearch limitCount={5} displayField={'label'} />
      </Theme>
    );
    showTrigger(cmp);
    const text = '100';
    changeQuery(cmp, text);
    queryInputEnter(cmp);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
    checkAll(cmp);
    exp(findCancelCheckedAllButton(cmp).props().isCheckedAll).to.be.true;

    const expValue = data
      .filter((item: Object, index: number) => index < 4)
      .map(item => item.value);
    checkSelectValue(cmp, ['100', ...expValue]);
  });

  it('多选mutliple 点击menu第一个，触发onSelect事件', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue: value, newDisplayValue: displayValue } = v;

        result.push({ value, displayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const cmp = mount(
      <Select
        data={data}
        displayField={'label'}
        mutliple
        canSearch
        canInput
        limitCount={5}
        onSelect={onSelect}
      />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const value = ['key-0'];
    const displayValue = ['txt0'];

    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const result = await selectPromise;
    expect(result).toEqual([{ value, displayValue }, { value: [], displayValue: [] }]);
  });

  it('单选 点击menu第一个，触发onSelect事件', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue: value, newDisplayValue: displayValue } = v;

        result.push({ value, displayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const cmp = mount(
      <Select data={data} displayField={'label'} limitCount={5} onSelect={onSelect} />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const value = 'key-0';
    const displayValue = 'txt0';

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const result = await selectPromise;
    expect(result).toEqual([{ value, displayValue }, { value, displayValue }]);
  });

  it('单选 点击menu第一个后再点击第二个，触发onSelect事件', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue: value, newDisplayValue: displayValue } = v;

        result.push({ value, displayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const cmp = mount(
      <Select data={data} displayField={'label'} limitCount={5} onSelect={onSelect} />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const value = 'key-0';
    const displayValue = 'txt0';

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(1)
      .simulate('click');

    const newValue = 'key-1';
    const newDisplayValue = 'txt1';

    const result = await selectPromise;
    expect(result).toEqual([
      { value, displayValue },
      { value: newValue, displayValue: newDisplayValue },
    ]);
  });

  it('多选mutliple，点击全选按钮，触发onSelect事件', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue: value, newDisplayValue: displayValue } = v;

        result.push({ value, displayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const cmp = mount(
      <Select
        data={data}
        displayField={'label'}
        mutliple
        canSearch
        canInput
        limitCount={5}
        onSelect={onSelect}
      />
    );

    showTrigger(cmp);
    checkAll(cmp);
    const value = data.filter((item: Object, index: number) => index < 5).map(item => item.value);
    const displayValue = data
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.label);

    unCheckAll(cmp);
    const result = await selectPromise;
    expect(result).toEqual([{ value, displayValue }, { value: [], displayValue: [] }]);
  });

  it('多选mutliple，点击选中项，全选状态为‘不全选’', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue: value, newDisplayValue: displayValue } = v;

        result.push({ value, displayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const cmp = mount(
      <Select
        data={data}
        displayField={'label'}
        mutliple
        canSearch
        canInput
        limitCount={5}
        onSelect={onSelect}
      />
    );

    showTrigger(cmp);
    checkAll(cmp);
    const value = data.filter((item: Object, index: number) => index < 5).map(item => item.value);
    const displayValue = data
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.label);

    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const newValue = value.slice(1, 5);
    const newDisplayValue = displayValue.slice(1, 5);
    const result = await selectPromise;
    expect(await selectPromise).toEqual([
      { value, displayValue },
      { value: newValue, displayValue: newDisplayValue },
    ]);
    cmp.update();
    await delay(100);
    exp(findCheckedAllButton(cmp).props().isCheckedAll).to.be.false;
  });

  it('弹出》输入查询字段》收起》弹出，触发onQuery为空', async () => {
    const value = 'szfeng';
    let onQuery;
    const queryEventData = new Promise(resolve => {
      const queryValue = [];
      onQuery = value => {
        queryValue.push(value);
        if (queryValue.length === 2) {
          resolve(queryValue);
        }
      };
    });
    const cmp = mount(
      <Select
        data={data}
        value={value}
        throttle={0}
        onQuery={onQuery}
        displayField={'label'}
        canSearch
        mutliple
      />
    );
    showTrigger(cmp);
    changeQuery(cmp, value);
    exp(getQueryInputValue(cmp)).to.be.equal(value);
    showTrigger(cmp);
    showTrigger(cmp);
    exp(await queryEventData).to.be.eql([value, '']);
  });

  it('弹出》输入查询字段》点击刷新按钮，触发onQuery为空', async () => {
    const value = 'szfeng';
    let onQuery;
    const queryEventData = new Promise(resolve => {
      const queryValue = [];
      onQuery = value => {
        queryValue.push(value);
        if (queryValue.length === 2) {
          resolve(queryValue);
        }
      };
    });
    const cmp = mount(
      <Select data={data} value={value} throttle={0} onQuery={onQuery} canSearch mutliple />
    );
    showTrigger(cmp);
    changeQuery(cmp, value);
    exp(getQueryInputValue(cmp)).to.be.equal(value);
    clickRefreshButton(cmp);
    exp(await queryEventData).to.be.eql([value, '']);
  });

  it('mutliple canInput:弹出》输入查询字段》敲回车，触发onQuery为空', async () => {
    const value = 'szfeng';
    let onQuery;
    const queryEventData = new Promise(resolve => {
      const queryValue = [];
      onQuery = value => {
        queryValue.push(value);
        if (queryValue.length === 2) {
          resolve(queryValue);
        }
      };
    });
    const cmp = mount(
      <Select
        data={data}
        value={value}
        throttle={0}
        onQuery={onQuery}
        canSearch
        canInput
        mutliple
      />
    );
    showTrigger(cmp);
    changeQuery(cmp, value);
    exp(getQueryInputValue(cmp)).to.be.equal(value);
    queryInputEnter(cmp);
    exp(await queryEventData).to.be.eql([value, '']);
  });

  it('displayValue "szfeng" not exist &  dataItem not exist', async () => {
    const value = 'szfeng';

    const cmp = mount(<Select data={data} value={value} mutliple />);
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual([value]);
  });

  it("value = ['szfeng'] not exist &  dataItem not exist", async () => {
    const value = ['szfeng'];

    const cmp = mount(<Select data={data} value={value} mutliple />);
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(value);
  });

  it('displayValue  ["szfeng"]  displayValue = \'displayValue\' not exist &  dataItem not exist', async () => {
    const value = ['szfeng'];
    const displayValue = 'displayValue';

    const cmp = mount(<Select data={data} value={value} displayValue={displayValue} mutliple />);
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual([displayValue]);
  });

  it('didUpdate ', async () => {
    const value = ['szfeng'];
    const displayValue = ['displayValue'];

    const cmp = mount(<Select data={data} value={value} displayValue={displayValue} mutliple />);
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(displayValue);
  });

  it('displayValue is undefined ', async () => {
    const value = ['key-0'];

    const cmp = mount(<Select displayField={'label'} data={data} value={value} mutliple />);
    console.log(
      'cmpcmp',
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    );

    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['txt0']);
  });

  it('displayValue is [] ', async () => {
    const value = ['key-0'];

    const cmp = mount(
      <Select displayField={'label'} displayValue={[]} data={data} value={value} mutliple />
    );
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['txt0']);
  });

  it('displayValue is [] for didUpdate not exist to exist', async () => {
    const value = ['key-0'];

    const cmp = mount(
      <Select displayField={'label'} displayValue={[]} data={data} value={value} mutliple />
    );
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['txt0']);
    cmp.setProps({ displayValue: ['hello'] });
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['hello']);
  });

  it('displayValue is [] for didUpdate  exist to not exist', async () => {
    const value = ['key-0'];

    const cmp = mount(
      <Select displayField={'label'} displayValue={['hello']} data={data} value={value} mutliple />
    );
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['hello']);
    cmp.setProps({ displayValue: [] });
    expect(
      cmp
        .find(Widget.InputTag)
        .at(0)
        .instance().props.displayValue
    ).toEqual(['txt0']);
  });

  it('多选mutliple 非受限组件，测试oldValue,newValue', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue, oldValue, newItem, oldItem, newDisplayValue } = v;

        result.push({ newValue, oldValue, newItem, oldItem, newDisplayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const defaultValue = ['szfeng', '史振峰'];
    const defaultDisplayValue = ['hades', '哈迪斯'];

    const cmp = mount(
      <Select
        data={data}
        displayField={'label'}
        mutliple
        canSearch
        canInput
        limitCount={5}
        onSelect={onSelect}
        defaultValue={defaultValue}
        defaultDisplayValue={defaultDisplayValue}
      />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const FirstExpNewValue = [...defaultValue, 'key-0'];
    const FirstExpOldValue = [...defaultValue];
    const FirstExpNewDisplayValue = [...defaultDisplayValue, 'txt0'];
    const FirstExpNewItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
      { value: 'key-0', label: 'txt0' },
    ];
    const FirstExpOldItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
    ];

    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const SecondExpNewValue = [...defaultValue];
    const SecondExpOldValue = [...defaultValue, 'key-0'];
    const SecondExpNewDisplayValue = [...defaultDisplayValue];
    const SecondExpNewItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
    ];
    const SecondExpOldItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
      { value: 'key-0', label: 'txt0' },
    ];

    const result = await selectPromise;
    expect(result).toEqual([
      {
        newValue: FirstExpNewValue,
        oldValue: FirstExpOldValue,
        newItem: FirstExpNewItem,
        oldItem: FirstExpOldItem,
        newDisplayValue: FirstExpNewDisplayValue,
      },
      {
        newValue: SecondExpNewValue,
        oldValue: SecondExpOldValue,
        newItem: SecondExpNewItem,
        oldItem: SecondExpOldItem,
        newDisplayValue: SecondExpNewDisplayValue,
      },
    ]);
  });

  it('多选mutliple 受限组件，测试oldValue,newValue', async () => {
    let onSelect;
    const selectPromise = new Promise(res => {
      const result = [];
      onSelect = v => {
        const { newValue, oldValue, newItem, oldItem, newDisplayValue } = v;

        result.push({ newValue, oldValue, newItem, oldItem, newDisplayValue });
        if (result.length === 2) {
          res(result);
        }
      };
    });

    const value = ['szfeng', '史振峰'];
    const displayValue = ['hades', '哈迪斯'];

    const cmp = mount(
      <Select
        data={data}
        displayField={'label'}
        mutliple
        canSearch
        canInput
        limitCount={5}
        onSelect={onSelect}
        value={value}
        displayValue={displayValue}
      />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(0)
      .simulate('click');

    const FirstExpNewValue = [...value, 'key-0'];
    const FirstExpOldValue = [...value];
    const FirstExpNewDisplayValue = [...displayValue, 'txt0'];
    const FirstExpNewItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
      { value: 'key-0', label: 'txt0' },
    ];
    const FirstExpOldItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
    ];

    cmp
      .find(Widget.MenuItem)
      .at(1)
      .simulate('click');

    const SecondExpNewValue = [...value, 'key-1'];
    const SecondExpOldValue = [...value];
    const SecondExpNewDisplayValue = [...displayValue, 'txt1'];
    const SecondExpNewItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
      { value: 'key-1', label: 'txt1' },
    ];
    const SecondExpOldItem = [
      { value: 'szfeng', label: 'hades' },
      { value: '史振峰', label: '哈迪斯' },
    ];

    const result = await selectPromise;
    expect(result).toEqual([
      {
        newValue: FirstExpNewValue,
        oldValue: FirstExpOldValue,
        newItem: FirstExpNewItem,
        oldItem: FirstExpOldItem,
        newDisplayValue: FirstExpNewDisplayValue,
      },
      {
        newValue: SecondExpNewValue,
        oldValue: SecondExpOldValue,
        newItem: SecondExpNewItem,
        oldItem: SecondExpOldItem,
        newDisplayValue: SecondExpNewDisplayValue,
      },
    ]);
  });

  it('单选 value受限组件，displayValue不受限，测试组件被受限', async () => {
    const cmp = mount(<Select data={data} displayField={'label'} value={['key-0']} />);

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(1)
      .simulate('click');

    await delay(300);
    cmp.update();

    exp(getInputTagValue(cmp)).to.be.eql(['key-0']);
    exp(getInputTagDisplayValue(cmp)).to.be.eql(['txt0']);

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(3)
      .simulate('click');

    await delay(300);
    cmp.update();

    exp(getInputTagValue(cmp)).to.be.eql(['key-0']);
    exp(getInputTagDisplayValue(cmp)).to.be.eql(['txt0']);
  });

  it('多选 value受限组件，displayValue不受限，测试组件被受限', async () => {
    const cmp = mount(
      <Select data={data} displayField={'label'} value={['key-0', 'key-1']} mutliple />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(2)
      .simulate('click');

    await delay(300);
    cmp.update();

    exp(getInputTagValue(cmp)).to.be.eql(['key-0', 'key-1']);
    exp(getInputTagDisplayValue(cmp)).to.be.eql(['txt0', 'txt1']);

    showTrigger(cmp);
    cmp
      .find(Widget.MenuItem)
      .at(1)
      .simulate('click');

    await delay(300);
    cmp.update();

    exp(getInputTagValue(cmp)).to.be.eql(['key-0', 'key-1']);
    exp(getInputTagDisplayValue(cmp)).to.be.eql(['txt0', 'txt1']);
  });

  function changeQuery(cmp: Object, value: string) {
    getQueryInput(cmp).simulate('change', { target: { value } });
  }

  function getQueryInput(cmp: Object) {
    return cmp
      .find(Widget.Input)
      .find('input')
      .at(0);
  }

  function getQueryInputValue(cmp: Object) {
    return getQueryInput(cmp).props().value;
  }

  function showTrigger(cmp: Object) {
    getInputTagFocusInput(cmp).simulate('click');
  }

  function getInputTagFocusInput(cmp: Object) {
    return cmp.find(Widget.InputTagFocuInput);
  }

  function checkAll(cmp: Object) {
    findCheckedAllButton(cmp).simulate('click');
  }

  function unCheckAll(cmp: Object) {
    findCancelCheckedAllButton(cmp).simulate('click');
  }

  function clickRefreshButton(cmp: Object) {
    cmp.find('RefreshButton').simulate('click');
  }

  function findCheckedAllButton(cmp: Object) {
    return cmp.find('CheckAllButton');
  }

  function findCancelCheckedAllButton(cmp: Object) {
    return cmp.find('CancelCheckAllButton');
  }

  function queryInputEnter(cmp: Object) {
    simulateQueryInput(cmp, 13);
  }

  function simulateQueryInput(cmp: Object, keyCode: number) {
    getQueryInput(cmp).simulate('keydown', { keyCode });
  }

  function checkSelectValue(cmp, value) {
    exp(getMenuValue(cmp)).to.be.eql(value);
    exp(getInputTagValue(cmp)).to.be.eql(value);
  }

  function getMenuValue(cmp: Object) {
    return cmp.find(Widget.Menu).props().selectedKeys;
  }

  function getInputTagValue(cmp: Object) {
    return getInputTag(cmp).props().value;
  }

  function getInputTagDisplayValue(cmp) {
    return getInputTag(cmp).props().displayValue;
  }

  function getInputTag(cmp: Object) {
    return cmp.find(Widget.InputTag);
  }

  function clearInputTagValue(cmp: Object) {
    cmp.find(Widget.InputTagClearButton).simulate('click');
  }

  function getAllDataValue(data) {
    return data.map(item => item.value);
  }

  function getAllDataDisplayValue(data) {
    return data.map(item => item.label);
  }
});
