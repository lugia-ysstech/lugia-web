/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTestComponent, delay } from '@lugia/react-test-utils';
import TreeSelect from '../';
import Trigger from '../../trigger';
import Widget from '../../consts/index';
import Theme from '../../theme';

import { adjustValue } from '../../utils';
import { DefaultHeight, MenuItemHeight } from '../../css/tree';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;
const rowData = [
  { value: '1', text: '1' },
  { value: '1.1', text: '1.1', pid: '1', path: '1', isLeaf: true },
  { value: '1.2', text: '1.2', pid: '1', path: '1' },
  { value: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
  { value: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2' },
  { value: '1.2.2.1', text: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2' },
  {
    value: '1.2.2.1.1',
    text: '1.2.2.1.1',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  {
    value: '1.2.2.1.2',
    text: '1.2.2.1.2',
    pid: '1.2.2.1',
    path: '1/1.2/1.2.2/1.2.2.1',
    isLeaf: true,
  },
  { value: '1.2.2.2', text: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true },

  { value: '1.3', text: '1.3', pid: '1', path: '1' },
  { value: '1.3.1', text: '1.3.1', pid: '1.3', path: '1/1.3' },
  { value: '1.3.1.1', text: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { value: '1.3.1.2', text: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true },
  { value: '1.3.2', text: '1.3.2', pid: '1.3', path: '1/1.3' },
  { value: '1.3.2.1', text: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { value: '1.3.2.2', text: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true },
  { value: '1.3.3', text: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true },

  { value: '2', text: '2' },
  { value: '2.1', text: '2.1', pid: '2', path: '2' },
  { value: '2.1.1', text: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true },
  { value: '2.1.2', text: '2.1.2', pid: '2.1', path: '2/2.1' },
  { value: '2.1.2.1', text: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true },
  { value: '2.2', text: '2.2', pid: '2', path: '2' },
  { value: '2.2.1', text: '2.2.1', pid: '2.2', path: '2/2.2' },
  { value: '2.2.1.1', text: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { value: '2.2.1.2', text: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true },
  { value: '2.2.2', text: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true },

  { value: '3', text: '3' },
  { value: '3.1', text: '3.1', pid: '3', path: '3', isLeaf: true },
  { value: '3.2', text: '3.2', pid: '3', path: '3', isLeaf: true },
  { value: '4', text: '4', isLeaf: true },
];

const SelectedIcon = 'SelectedIcon';

describe('TreeSelect', () => {
  it('输入框点击后，弹出面板', () => {
    const cmp = mount(<TreeSelect data={rowData} />);
    cmp
      .children()
      .at(0)
      .simulate('click');

    cmp.update();
    exp(cmp.find(Trigger).length).to.be.equal(1);
  });
  it('getTheme 获取下拉树各部件的样式信息 并且 配置了组件的样式， 则组件要加上自部件的样式设置', () => {
    const styleConfig = { width: 500 };
    const svThemeConfigTree = { [Widget.TreeSelect]: styleConfig };
    const expResult: Object = {
      [Widget.Tree]: Object.assign(
        {},
        styleConfig,
        { svThemeConfigTree },
        { height: adjustValue(DefaultHeight, MenuItemHeight) - 2 }
      ),
      [Widget.Trigger]: Object.assign(
        //减去边框2px？
        {},
        styleConfig,
        { svThemeConfigTree }
      ),
      [Widget.InputTag]: Object.assign({}, styleConfig, { svThemeConfigTree }),
      [Widget.Input]: Object.assign(
        {},
        styleConfig,
        { width: styleConfig.width },
        { svThemeConfigTree }
      ),
      [SelectedIcon]: { color: '#d9d9d9', hoverColor: '#108ee9' },
    };
    createThemeCase(styleConfig, expResult);
  });

  it('未指定width', () => {
    const styleConfig = {};

    const expResult: Object = {
      [Widget.Tree]: {
        height: adjustValue(DefaultHeight, MenuItemHeight) - 2,
        svThemeConfigTree: { [Widget.TreeSelect]: {} },
        width: 200,
      },
      [Widget.Trigger]: { svThemeConfigTree: { [Widget.TreeSelect]: {} }, width: 200 },
      [Widget.InputTag]: { svThemeConfigTree: { [Widget.TreeSelect]: {} }, width: 200 },
      [Widget.Input]: { svThemeConfigTree: { [Widget.TreeSelect]: {} }, width: 200 },
      [SelectedIcon]: { color: '#d9d9d9', hoverColor: '#108ee9' },
    }; //减去边框2px？

    createThemeCase(styleConfig, expResult);
  });

  function createThemeCase(styleConfig: Object, expResult: Object) {
    const config = { [Widget.TreeSelect]: styleConfig };

    class TestDemo extends React.Component<any, any> {
      treeSelect: Object;

      render() {
        const getTreeSelect: Function = (cmp: Object) => (this.treeSelect = cmp);
        return (
          <Theme config={config}>
            <TreeSelect data={rowData} ref={getTreeSelect} />
          </Theme>
        );
      }
    }

    const Target = createTestComponent(TestDemo, target => {
      const resultTheme = target.treeSelect.getThemeTarget().getCurrentTheme();
      expect(resultTheme).toEqual(expResult);
    });
    const cmp = mount(<Target />);
    expect(
      cmp
        .find(Widget.Theme)
        .at(1)
        .props().config
    ).toEqual(expResult);
  }

  it('测试查询功能 local', async () => {
    const cmp = mount(<TreeSelect canSearch data={rowData} throttle={0} />);
    const firstValue = 'helloworld';
    showTrigger(cmp);
    changeQuery(cmp, firstValue);
    exp(getTreeQuery(cmp)).to.be.equal(firstValue);
    exp(getQueryInputValue(cmp)).to.be.equal(firstValue);

    const secondValue = 'ligx';
    changeQuery(cmp, secondValue);
    exp(getTreeQuery(cmp)).to.be.equal(secondValue);
    exp(getQueryInputValue(cmp)).to.be.equal(secondValue);
  });

  it('测试查询功能 remote', async () => {
    const cmp = mount(<TreeSelect canSearch data={rowData} throttle={0} mode="remote" />);
    const firstValue = 'helloworld';
    showTrigger(cmp);
    changeQuery(cmp, firstValue);
    exp(getTreeQuery(cmp)).to.be.equal('');
    exp(getQueryInputValue(cmp)).to.be.equal(firstValue);
  });

  it('选择全部', () => {
    const cmp = mount(
      <TreeSelect data={rowData} canSearch throttle={0} mutliple igronSelectField="isLeaf" />
    );
    showTrigger(cmp);
    selctedAll(cmp);
  });

  function createCanInput({ mutliple }) {
    it(`canInput mutliple: ${mutliple.toString()}`, () => {
      let onChange;
      const cmp = mount(<TreeSelect canSearch data={rowData} mutliple={mutliple} canInput />);
      showTrigger(cmp);
      const txt = '100';
      changeQuery(cmp, txt);
      queryInputEnter(cmp);

      mutliple
        ? exp(cmp.find(Widget.InputTagItem).text()).to.be.equal(txt)
        : exp(getInputTagValue(cmp)[0]).to.be.equal(txt);
    });
  }

  createCanInput({ mutliple: true });
  createCanInput({ mutliple: false });

  function createSelectAll(expandAll) {
    it(`selectAll expandAll${expandAll.toString()}`, () => {
      const cmp = mount(
        <TreeSelect canSearch data={rowData} mutliple expandAll={expandAll} canInput />
      );
      showTrigger(cmp);
      selctedAll(cmp);
      exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    });
  }

  createSelectAll(true);
  createSelectAll(false);

  it('selectAll igronSelectField', async () => {
    let onChange;
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        expandAll={true}
        onChange={onChange}
        igronSelectField="isLeaf"
        canInput
        canSearch
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;

    const value = [
      '1',
      '1.2',
      '1.2.2',
      '1.2.2.1',
      '1.3',
      '1.3.1',
      '1.3.2',
      '2',
      '2.1',
      '2.1.2',
      '2.2',
      '2.2.1',
      '3',
    ];
    checkTreeSelectValue(cmp, value);
  });

  it('selectAll onlySelectLeaf', async () => {
    let onChange;
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        expandAll={true}
        onChange={onChange}
        onlySelectLeaf
        canInput
        canSearch
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);

    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;

    const value = rowData.filter((item: Object) => item.isLeaf).map(item => item.value);
    checkTreeSelectValue(cmp, value);
  });

  it('selectAll limitCount: 5', async () => {
    const cmp = mount(
      <TreeSelect canSearch data={rowData} mutliple expandAll={true} limitCount={5} />
    );

    showTrigger(cmp);
    selctedAll(cmp);

    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;

    const value = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.value);
    checkTreeSelectValue(cmp, value);
  });

  it('selectAll limitCount: 5 caninput 先选全部再输入', async () => {
    const cmp = mount(
      <TreeSelect data={rowData} canSearch mutliple canInput expandAll={true} limitCount={5} />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    const txt = '100';
    changeQuery(cmp, txt);
    queryInputEnter(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;

    const value = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.value);
    checkTreeSelectValue(cmp, value);
  });

  it('selectAll limitCount: 5 caninput value: 我们啊 全选  然后进行刷新操作', async () => {
    const value = ['1231', 'lgx'];
    const displayValue = ['我么啊啊', 'ab'];
    const limit = 5;
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
        limitCount={limit}
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    const expValue = rowData
      .filter((item: Object, index: number) => index < 3)
      .map(item => item.value);
    checkTreeSelectValue(cmp, [...value, ...expValue], limit);
    cmp.update();
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, value, limit);
  });

  it('selectAll 默认值为顶部的值 然后进行全选 limitCount: 5', () => {
    const value = ['1'];
    const displayValue = [];
    const limit = 5;
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
        limitCount={limit}
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    checkTreeSelectValue(cmp, ['1', '1.1', '1.2', '1.2.1', '1.2.2'], limit);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, [], limit);
  });

  class LimitTreeSelect extends React.Component<any, any> {
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
        <TreeSelect
          data={rowData}
          mutliple
          value={value}
          onChange={this.onChange}
          displayValue={displayValue}
          canInput
          canSearch
          expandAll={true}
          limitCount={limitCount}
        />
      );
    }

    onChange = obj => {
      this.setState(obj);
    };
  }

  it('selectAll limitCount: 5 受限组件', () => {
    const limit = 5;

    const cmp = mount(<LimitTreeSelect limitCount={limit} />);

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    checkTreeSelectValue(cmp, ['1', '1.1', '1.2', '1.2.1', '1.2.2'], limit);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, [], limit);
  });

  it(' limitCount: 5 受限组件', () => {
    const limit = 5;

    const cmp = mount(<LimitTreeSelect limitCount={limit} />);

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    checkTreeSelectValue(cmp, ['1', '1.1', '1.2', '1.2.1', '1.2.2'], limit);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, [], limit);
    checkTreeSelectValue(cmp, [], limit);
  });

  it('selectAll limitCount: 5 受限组件 有默认值 然后刷新', () => {
    const limit = 5;

    const value = ['1'];
    const cmp = mount(<LimitTreeSelect value={value} limitCount={limit} />);

    showTrigger(cmp);
    checkTreeSelectValue(cmp, value, limit);
    refreshValue(cmp);
    checkTreeSelectValue(cmp, [], limit);
    exp(getTreeQuery(cmp)).to.be.equal('');
    exp(getQueryInputValue(cmp)).to.be.equal('');
  });

  it('selectAll 默认值为中间的值 然后进行全选 limitCount: 5', () => {
    const value = ['2.2', '2.2.1.1'];
    const displayValue = [];
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    checkTreeSelectValue(cmp, [...value, '1', '1.1', '1.2']);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, []);
  });

  it('selectAll 默认值为底部的值 然后进行全选 limitCount: 5', () => {
    const value = ['4', '3.2', '3.1'];
    const displayValue = [];
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    checkTreeSelectValue(cmp, [...value, '1', '1.1']);
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, []);
  });

  it('非受限 刷新操作', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });

    let onRefresh;
    const refreshResult = new Promise(resolve => {
      onRefresh = () => {
        resolve(true);
      };
    });

    const str = '我么啊啊';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onRefresh={onRefresh}
        onChange={onChange}
        mutliple
        defaultValue={str}
        defaultDisplayValue={str}
        canInput
        canSearch
        expandAll={true}
        limitCount={5}
      />
    );
    showTrigger(cmp);
    refreshValue(cmp);
    exp(getTreeQuery(cmp)).to.be.equal('');
    exp(getQueryInputValue(cmp)).to.be.equal('');
    checkTreeSelectValue(cmp, []);
    exp(await refreshResult).to.be.eql(true);
    exp(await changeReuslt).to.be.eql({ value: [], displayValue: [] });
  });

  it('非受限 没有值直接刷新 操作', () => {
    const onChange = () => {
      throw new Error('不应触发change事件');
    };

    const cmp = mount(
      <TreeSelect
        data={rowData}
        onChange={onChange}
        mutliple
        canSearch
        canInput
        expandAll={true}
        limitCount={5}
      />
    );
    showTrigger(cmp);
    refreshValue(cmp);
    exp(getTreeQuery(cmp)).to.be.equal('');
    exp(getQueryInputValue(cmp)).to.be.equal('');
    checkTreeSelectValue(cmp, []);
  });

  function checkTreeSelectValue(cmp, value, limit) {
    if (limit != undefined) {
      const limitTitle = cmp.find(Widget.TreeSelectLimitTitle).text();
      exp(limitTitle.trim()).to.be.eql(`已选择${value.length}个结点,最多可选${limit}个结点.`);
    }
    exp(getTreeValue(cmp)).to.be.eql(value);
    exp(getInputTagValue(cmp)).to.be.eql(value);
  }

  it('受限组件 清空值 clickRefresh(cmp); onChange', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const config = { [Widget.TreeSelect]: { width: 100 } };

    const cmp = mount(
      <Theme config={config}>
        <TreeSelect
          data={rowData}
          onChange={onChange}
          mutliple
          value={value}
          displayValue={displayValue}
          canInput
          canSearch
          expandAll={true}
        />
      </Theme>
    );
    await delay(0, async () => {
      showTrigger(cmp);
      clearInputTagValue(cmp);
      checkTreeSelectValue(cmp, [value]);

      const result = await changeReuslt;

      exp(result).to.be.eql({
        value: [],
        displayValue: [],
      });
      checkTreeSelectValue(cmp, [value]);
    });
  });

  it('非受限组件 清空值 onChange', async () => {
    const limit = 1000;

    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const config = { [Widget.TreeSelect]: { width: 100 } };

    const cmp = mount(
      <Theme config={config}>
        <TreeSelect
          data={rowData}
          onChange={onChange}
          mutliple
          limitCount={limit}
          defaultValue={value}
          defaultDisplayValue={displayValue}
          canInput
          canSearch
          expandAll={true}
        />
      </Theme>
    );
    await delay(0, async () => {
      showTrigger(cmp);
      clearInputTagValue(cmp);
      checkTreeSelectValue(cmp, [], limit);

      const result = await changeReuslt;

      exp(result).to.be.eql({
        value: [],
        displayValue: [],
      });
      checkTreeSelectValue(cmp, [], limit);
    });
  });

  it('受限组件 全选操作 clickRefresh(cmp); onChange', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onChange={onChange}
        mutliple
        value={value}
        displayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
      />
    );
    showTrigger(cmp);
    selctedAll(cmp);
    checkTreeSelectValue(cmp, [value]);
    const result = await changeReuslt;
    exp(result).to.be.eql({
      value: [value, ...getAllRowDataValue(rowData)],
      displayValue: [displayValue, ...getAllRowDataDisplayValue(rowData)],
    });
  });

  it('受限组件 canInput: true  手工添加项 onChange', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onChange={onChange}
        mutliple
        value={value}
        displayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
      />
    );
    const txt = 'hello';
    showTrigger(cmp);
    changeQuery(cmp, txt);
    queryInputEnter(cmp);
    checkTreeSelectValue(cmp, [value]);
    const result = await changeReuslt;
    exp(result).to.be.eql({
      value: [value, txt],
      displayValue: [displayValue, txt],
    });
  });

  it('非受限组件 选择全部  onChange', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onChange={onChange}
        mutliple
        value={value}
        displayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
      />
    );
    showTrigger(cmp);
    selctedAll(cmp);
    checkTreeSelectValue(cmp, [value]);

    const result = await changeReuslt;
    exp(result).to.be.eql({
      value: [value, ...getAllRowDataValue(rowData)],
      displayValue: [displayValue, ...getAllRowDataDisplayValue(rowData)],
    });
  });

  it('非受限组件 选择全部  onChange', async () => {
    let onChange;
    const changeReuslt = new Promise(resolve => {
      onChange = arg => {
        resolve(arg);
      };
    });
    const value = '我么啊啊';
    const displayValue = '我么啊啊';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onChange={onChange}
        mutliple
        defaultValue={value}
        defaultDisplayValue={displayValue}
        canInput
        canSearch
        expandAll={true}
      />
    );
    showTrigger(cmp);
    selctedAll(cmp);
    const allValue = [value, ...getAllRowDataValue(rowData)];

    checkTreeSelectValue(cmp, allValue);

    const result = await changeReuslt;
    exp(result).to.be.eql({
      value: allValue,
      displayValue: [displayValue, ...getAllRowDataDisplayValue(rowData)],
    });
  });

  function getAllRowDataValue(data) {
    return data.map(item => item.value);
  }

  function getAllRowDataDisplayValue(data) {
    return data.map(item => item.text);
  }

  it('selectAll limitCount: 5 caninput 先输入再选全部', async () => {
    const cmp = mount(
      <TreeSelect data={rowData} mutliple canSearch canInput expandAll={true} limitCount={5} />
    );

    showTrigger(cmp);
    const txt = '100';
    changeQuery(cmp, txt);
    queryInputEnter(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.true;
    const value = rowData
      .filter((item: Object, index: number) => index < 4)
      .map(item => item.value);
    checkTreeSelectValue(cmp, ['100', ...value]);
  });

  it('多选 选择第一个 onSelect 事件', async () => {
    let onSelect;
    const selAllPromise = new Promise(res => {
      const result = [];
      onSelect = (value, text) => {
        const target = {};
        target.value = value;
        target.displayValue = text;
        result.push(target);
        if (result.length === 2) {
          res(result);
        }
      };
    });
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        onSelect={onSelect}
        canInput
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    cmp
      .find(Widget.Checkbox)
      .at(0)
      .simulate('click');
    const value = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.value);
    const displayValue = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.text);
    cmp
      .find(Widget.Checkbox)
      .at(0)
      .simulate('click');
    const result = await selAllPromise;
    expect(result).toEqual([{ value, displayValue }, { value: [], displayValue: [] }]);
  });

  it('单选 选择第一个 onSelect 事件', async () => {
    let onSelect;
    const selAllPromise = new Promise(res => {
      const result = [];
      onSelect = (value, text) => {
        const target = {};
        target.value = value;
        target.displayValue = text;
        result.push(target);
        if (result.length === 2) {
          res(result);
        }
      };
    });
    const cmp = mount(
      <TreeSelect
        data={rowData}
        onSelect={onSelect}
        canSearch
        canInput
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    cmp
      .find('titleSpan')
      .at(0)
      .simulate('click');
    const value = rowData
      .filter((item: Object, index: number) => index < 1)
      .map(item => item.value);
    const displayValue = rowData
      .filter((item: Object, index: number) => index < 1)
      .map(item => item.text);
    cmp
      .find('titleSpan')
      .at(0)
      .simulate('click');
    const result = await selAllPromise;
    expect(result).toEqual([{ value, displayValue }, { value: [''], displayValue: [''] }]);
  });

  it('selectAll onSelect 事件', async () => {
    let onSelect;
    const selAllPromise = new Promise(res => {
      const result = [];
      onSelect = (value, text) => {
        const target = {};
        target.value = value;
        target.displayValue = text;
        result.push(target);
        if (result.length === 2) {
          res(result);
        }
      };
    });
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        onSelect={onSelect}
        canInput
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    selctedAll(cmp);
    const value = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.value);
    const displayValue = rowData
      .filter((item: Object, index: number) => index < 5)
      .map(item => item.text);
    selctedAll(cmp);
    const result = await selAllPromise;
    const expRes = [{ value, displayValue }, { value: [], displayValue: [] }];
    expect(result).toEqual(expRes);
  });

  it('没有任何结点可以选择的情况  全选框状态应该是未选中', async () => {
    const rowData = [
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' },
      { value: '4', text: '4' },
      { value: '5', text: '5' },
      { value: '6', text: '6' },
      { value: '7', text: '7' },
      { value: '8', text: '8' },
      { value: '9', text: '9' },
      { value: '10', text: '10' },
      { value: '11', text: '11' },
      { value: '12', text: '12' },
      { value: '13', text: '13' },
      { value: '14', text: '14' },
      { value: '15', text: '15' },
      { value: '16', text: '16' },
      { value: '17', text: '17' },
      { value: '18', text: '18' },
      { value: '19', text: '19' },
      { value: '20', text: '20' },
      { value: '21', text: '21' },
      { value: '22', text: '22' },
      { value: '23', text: '23' },
      { value: '24', text: '24' },
      { value: '25', text: '25' },
      { value: '26', text: '26' },
      { value: '27', text: '27' },
      { value: '28', text: '28' },
      { value: '29', text: '29' },
      { value: '30', text: '30' },
      { value: '31', text: '31' },
      { value: '32', text: '32' },
      { value: '33', text: '33' },
      { value: '34', text: '34' },
      { value: '35', text: '35' },
      { value: '36', text: '36' },
      { value: '37', text: '37' },
      { value: '38', text: '38' },
      { value: '39', text: '39' },
      { value: '40', text: '40' },
      { value: '41', text: '41' },
      { value: '42', text: '42' },
      { value: '43', text: '43' },
      { value: '44', text: '44' },
      { value: '45', text: '45' },
      { value: '46', text: '46' },
      { value: '47', text: '47' },
      { value: '48', text: '48' },
      { value: '49', text: '49' },
      { value: '50', text: '50' },
      { value: '51', text: '51' },
      { value: '52', text: '52' },
      { value: '53', text: '53' },
      { value: '54', text: '54' },
      { value: '55', text: '55' },
    ];
    const cmp = mount(
      <TreeSelect
        data={rowData}
        mutliple
        canSearch
        canInput
        onlySelectLeaf
        expandAll={true}
        limitCount={5}
      />
    );

    showTrigger(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    selctedAll(cmp);
    exp(findSelectAllButton(cmp).props().isCheckedAll).to.be.false;
    checkTreeSelectValue(cmp, []);
  });

  it('键盘子节点选择问题 shift选择 父节点', async () => {
    const cmp = mount(<TreeSelect data={rowData} mutliple expandAll={true} />);
    showTrigger(cmp);
    queryInputDown(cmp);
    queryInputShift(cmp);
    showTrigger(cmp);
    showTrigger(cmp);
    cmp.update();
    checkTreeSelectValue(cmp, ['1']);
  });

  it('键盘子节点选择问题 shift选择 子节点', async () => {
    const cmp = mount(<TreeSelect data={rowData} canSearch mutliple expandAll={true} />);
    showTrigger(cmp);
    queryInputDown(cmp);
    queryInputDown(cmp);
    queryInputShift(cmp);
    checkTreeSelectValue(cmp, ['1.1']);
  });

  it('键盘子节点选择问题 shift选择 子节点', async () => {
    const cmp = mount(<TreeSelect data={rowData} mutliple expandAll={true} />);
    showTrigger(cmp);
    queryInputDown(cmp);
    queryInputDown(cmp);
    queryInputShift(cmp);
    checkTreeSelectValue(cmp, ['1.1']);
  });

  it('键盘子节点选择问题 ctrl选择 父节点', async () => {
    const cmp = mount(<TreeSelect data={rowData} mutliple expandAll={true} />);
    showTrigger(cmp);
    queryInputDown(cmp);
    queryInputCtrl(cmp);
    const expectResult = rowData
      .filter(item => {
        return item.value == '1' || (item.path && item.path.startsWith('1'));
      })
      .map(item => item.value);
    checkTreeSelectValue(cmp, expectResult);
  });

  it('键盘子节点选择问题 ctrl选择 子节点', async () => {
    const cmp = mount(<TreeSelect data={rowData} mutliple expandAll={true} />);
    showTrigger(cmp);
    queryInputDown(cmp);
    queryInputDown(cmp);
    queryInputCtrl(cmp);
    checkTreeSelectValue(cmp, ['1.1']);
  });

  it('点击删除查询内容', async () => {
    const value = 'hello';
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
      <TreeSelect
        data={rowData}
        value={value}
        throttle={0}
        onQuery={onQuery}
        mutliple
        canSearch
        expandAll={true}
      />
    );
    showTrigger(cmp);
    const old = 'hello';
    changeQuery(cmp, old);
    exp(getQueryInputValue(cmp)).to.be.equal(old);
    exp(findTree(cmp).props().query).to.be.equal(old);
    exp(findTree(cmp).props().value).to.be.eql([value]);

    clearQueryInput(cmp);
    exp(getQueryInputValue(cmp)).to.be.equal('');
    exp(findTree(cmp).props().query).to.be.equal('');
    exp(findTree(cmp).props().value).to.be.eql([value]);
    exp(await queryEventData).to.be.eql([old, '']);
  });

  it('弹出->输入查询条件->收齐->弹出面板 要触发onQuery为空的事件', async () => {
    const value = 'hello';
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
      <TreeSelect
        data={rowData}
        value={value}
        throttle={0}
        onQuery={onQuery}
        canSearch
        mutliple
        expandAll={true}
      />
    );

    const old = 'hello';
    showTrigger(cmp);
    changeQuery(cmp, old);
    showTrigger(cmp);
    showTrigger(cmp);
    cmp.update();
    exp(await queryEventData).to.be.eql([old, '']);
  });

  it('弹出->输入查询条件->刷新按钮 要触发onQuery为空的事件', async () => {
    const value = 'hello';
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
      <TreeSelect
        data={rowData}
        value={value}
        throttle={0}
        onQuery={onQuery}
        mutliple
        canSearch
        expandAll={true}
      />
    );
    const old = 'hello';
    showTrigger(cmp);
    changeQuery(cmp, old);
    refreshValue(cmp);
    exp(await queryEventData).to.be.eql([old, '']);
  });

  it('多选  canInput: true, 弹出->输入查询条件->点击添加项->输入查询条件->查询框回车 要触发onQuery为空的事件', async () => {
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
      <TreeSelect
        data={rowData}
        canInput={true}
        throttle={0}
        onQuery={onQuery}
        mutliple
        canSearch
        expandAll={true}
      />
    );
    const ligx = 'hello';
    showTrigger(cmp);
    changeQuery(cmp, ligx);
    queryInputEnter(cmp);
    checkTreeSelectValue(cmp, [ligx]);
    const kxy = 'kxy';
    changeQuery(cmp, kxy);
    queryInputEnter(cmp);
    checkTreeSelectValue(cmp, [ligx, kxy]);
    exp(await queryEventData).to.be.eql([ligx, '', kxy, '']);
  });

  it('单选  canInput: true, 弹出->输入查询条件->点击添加项->输入查询条件->查询框回车 要触发onQuery为空的事件', async () => {
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
      <TreeSelect
        data={rowData}
        canSearch
        canInput={true}
        throttle={0}
        onQuery={onQuery}
        expandAll={true}
      />
    );
    const ligx = 'hello';
    showTrigger(cmp);
    changeQuery(cmp, ligx);
    queryInputEnter(cmp);
    checkTreeSelectValue(cmp, [ligx]);
    const kxy = 'kxy';
    changeQuery(cmp, kxy);
    queryInputEnter(cmp);
    checkTreeSelectValue(cmp, [kxy]);
    exp(await queryEventData).to.be.eql([ligx, '', kxy, '']);
  });

  it('单选 只value设置值', async () => {
    const value = 'hello';
    const cmp = mount(<TreeSelect data={rowData} value={value} throttle={0} expandAll={true} />);
    exp(getInputTagValue(cmp)).to.be.eql([value]);
    exp(getInputTagDisplayValue(cmp)).to.be.eql([value]);
  });

  it('单选 value displayValue', async () => {
    const value = '0';
    const displayValue = 'hello';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        value={value}
        displayValue={displayValue}
        throttle={0}
        expandAll={true}
      />
    );
    exp(getInputTagValue(cmp)).to.be.eql([value]);
    exp(getInputTagDisplayValue(cmp)).to.be.eql([displayValue]);
  });

  it('多选 value displayValue 逗号分隔', async () => {
    const value = '1,2,3,4';
    const displayValue = '1,2,3,4';
    const cmp = mount(
      <TreeSelect
        data={rowData}
        value={value}
        displayValue={displayValue}
        throttle={0}
        expandAll={true}
      />
    );
    exp(getInputTagValue(cmp)).to.be.eql([value]);
    exp(getInputTagDisplayValue(cmp)).to.be.eql([displayValue]);
  });

  function getInputTagValue(cmp) {
    return getInputTag(cmp).props().value;
  }

  function getInputTagDisplayValue(cmp) {
    return getInputTag(cmp).props().displayValue;
  }

  function getTreeValue(cmp) {
    return cmp.find(Widget.Tree).props().value;
  }

  function showTrigger(cmp: Object) {
    getInputTagFocusInput(cmp).simulate('click');
  }

  function getInputTagFocusInput(cmp: Object) {
    return cmp.find(Widget.InputTagFocuInput);
  }

  function getInputTag(cmp: Object) {
    return cmp.find(Widget.InputTag);
  }

  function getTreeQuery(cmp: Object) {
    return findTree(cmp).props().query;
  }

  function queryInputDown(cmp: Object) {
    simulateQueryInput(cmp, 40);
  }

  function queryInputShift(cmp: Object) {
    simulateQueryInput(cmp, 16);
  }

  function queryInputCtrl(cmp: Object) {
    simulateQueryInput(cmp, 17);
  }

  function queryInputEnter(cmp: Object) {
    simulateQueryInput(cmp, 13);
  }

  function simulateQueryInput(cmp: Object, keyCode: number) {
    getQueryInput(cmp).simulate('keydown', { keyCode });
  }

  function findTree(cmp: Object) {
    return cmp.find(Widget.Tree).at(0);
  }

  function clearQueryInput(cmp: Object) {
    cmp.find('ClearButton').simulate('click');
  }

  function clearInputTagValue(cmp: Object) {
    cmp.find(Widget.InputTagClearButton).simulate('click');
  }

  function refreshValue(cmp: Object) {
    cmp.find('RefreshButton').simulate('click');
  }

  function clickAdd(cmp: Object) {
    getAddIcon(cmp).simulate('click');
  }

  function getAddIcon(cmp: Object) {
    return cmp.find('addIcon');
  }

  function selctedAll(cmp: Object) {
    findSelectAllButton(cmp).simulate('click');
  }

  function findSelectAllButton(cmp) {
    return cmp.find('CheckAllButton');
  }

  function changeQuery(cmp: Object, value: string) {
    getQueryInput(cmp).simulate('change', { target: { value } });
  }

  function getQueryInputValue(cmp: Object) {
    return getQueryInput(cmp).props().value;
  }

  function getQueryInput(cmp: Object) {
    return cmp
      .find(Widget.Input)
      .find('input')
      .at(0);
  }
});
