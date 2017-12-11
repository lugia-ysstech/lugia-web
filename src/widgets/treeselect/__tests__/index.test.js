/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTestComponent, } from 'sv-test-utils';
import TreeSelect from '../';
import Trigger from '../../trigger';
import * as Widget from '../../consts/Widget';
import Theme from '../../theme';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;
const rowData = [
  { key: '1', title: '1', },
  { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
  { key: '1.2', title: '1.2', pid: '1', path: '1', },
  { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
  { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
  { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
  { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
  { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
  { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

  { key: '1.3', title: '1.3', pid: '1', path: '1', },
  { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
  { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
  { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
  { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
  { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
  { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
  { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

  { key: '2', title: '2', },
  { key: '2.1', title: '2.1', pid: '2', path: '2', },
  { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
  { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
  { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
  { key: '2.2', title: '2.2', pid: '2', path: '2', },
  { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
  { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

  { key: '3', title: '3', },
  { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
  { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
  { key: '4', title: '4', isLeaf: true, },
];
const SelectedIcon = 'SelectedIcon';

describe('TreeSelect', () => {
  it('输入框点击后，弹出面板', () => {
    const cmp = mount(<TreeSelect data={rowData}/>);
    cmp.children().at(0).simulate('click');

    cmp.update();
    exp(cmp.find(Trigger).length).to.be.equal(1);
  });
  it('getTheme 获取下拉树各部件的样式信息 并且 配置了组件的样式， 则组件要加上自部件的样式设置', () => {
    const styleConfig = {
      width: 500,
    };
    const svThemeConfigTree = { [ Widget.TreeSelect ]: styleConfig, };
    const expResult: Object = {
      [ Widget.Tree ]: Object.assign({}, styleConfig, { svThemeConfigTree, }),
      [ Widget.Trigger ]: Object.assign({}, styleConfig, { svThemeConfigTree, }),
      [ Widget.InputTag ]: Object.assign({}, styleConfig, { svThemeConfigTree, }),
      [ Widget.Input ]: Object.assign({}, styleConfig, { width: styleConfig.width - 6, }, { svThemeConfigTree, }),
      [ SelectedIcon ]: { color: '#d9d9d9', hoverColor: '#108ee9', },
    };
    createThemeCase(styleConfig, expResult);
  });
  it('未指定width', () => {
    const styleConfig = {};

    const expResult: Object = {
      [ Widget.Tree ]: { svThemeConfigTree: { [ Widget.TreeSelect ]: {}, }, },
      [ Widget.Trigger ]: { svThemeConfigTree: { [ Widget.TreeSelect ]: {}, }, },
      [ Widget.InputTag ]: { svThemeConfigTree: { [ Widget.TreeSelect ]: {}, }, },
      [ Widget.Input ]: { svThemeConfigTree: { [ Widget.TreeSelect ]: {}, }, },
      [ SelectedIcon ]: { color: '#d9d9d9', hoverColor: '#108ee9', },
    };

    createThemeCase(styleConfig, expResult);
  });

  function createThemeCase (styleConfig: Object, expResult: Object) {

    const config = {
        [ Widget.TreeSelect ]: styleConfig,
      }
    ;


    class TestDemo extends React.Component<any, any> {
      treeSelect: Object;

      render () {
        const getTreeSelect: Function = (cmp: Object) => this.treeSelect = cmp;
        return <Theme config={config}>
          <TreeSelect data={rowData} ref={getTreeSelect}/></Theme>;
      }
    }

    const Target = createTestComponent(TestDemo, target => {
      const resultTheme = target.treeSelect.getThemeTarget().getTheme();
      exp(resultTheme).to.be.eql(expResult);
    });
    const cmp = mount(<Target/>);
    exp(cmp.find(Widget.Theme).at(1).props().config).to.be.eql(expResult);

  }

  it('测试查询功能 local', async () => {
    const cmp = mount(<TreeSelect data={rowData} throttle={0}/>);
    const firstValue = 'helloworld';
    chagneQuery(cmp, firstValue);
    exp(getTreeQuery(cmp)).to.be.equal(firstValue);
    exp(findQueryInputValue(cmp)).to.be.equal(firstValue);


    const secondValue = 'ligx';
    chagneQuery(cmp, secondValue);
    exp(getTreeQuery(cmp)).to.be.equal(secondValue);
    exp(findQueryInputValue(cmp)).to.be.equal(secondValue);
  });
  it('测试查询功能 remote', async () => {
    const cmp = mount(<TreeSelect data={rowData} throttle={0} mode="remote"/>);
    const firstValue = 'helloworld';
    chagneQuery(cmp, firstValue);
    exp(getTreeQuery(cmp)).to.be.equal('');
    exp(findQueryInputValue(cmp)).to.be.equal(firstValue);

  });

  it('选择全部', () => {
    const cmp = mount(<TreeSelect data={rowData} throttle={0} mutliple igronSelectField="isLeaf"/>);
    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');

  });


  function createCanInput ({ mutliple, }) {


    it(`canInput mutliple: ${mutliple.toString()}`, () => {
      let onChange;
      const cmp = mount(<TreeSelect data={rowData}
                                    mutliple={mutliple}
                                    canInput
      />);
      cmp.find(Widget.InputTag).simulate('click');
      const txt = '100';
      chagneQuery(cmp, txt);
      findQueryInput(cmp).simulate('keydown', { keyCode: 13, });
      mutliple ? exp(cmp.find(Widget.InputTagItem).text()).to.be.equal(txt) : exp(cmp.find(Widget.InputTag).text().trim()).to.be.equal(txt);
    });
  }

  createCanInput({ mutliple: true, });
  createCanInput({ mutliple: false, });


  function createSelectAll (expandAll) {

    it(`selectAll expandAll${expandAll.toString()}`, () => {


      const cmp = mount(<TreeSelect data={rowData}
                                    mutliple
                                    expandAll={expandAll}
                                    canInput/>);
      cmp.find(Widget.InputTag).simulate('click');
      cmp.find(Widget.CheckIcon).simulate('click');
      exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    });
  }

  createSelectAll(true);
  createSelectAll(false);


  it('selectAll igronSelectField', async () => {


    let onChange;
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  expandAll={true}
                                  onChange={onChange}
                                  igronSelectField="isLeaf"
                                  canInput/>);

    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    const value = ['1', '1.2', '1.2.2', '1.2.2.1', '1.3', '1.3.1', '1.3.2', '2', '2.1', '2.1.2', '2.2', '2.2.1', '3',];
    exp(cmp.find(Widget.Tree).props().value).to.be.eql(value);
  });

  it('selectAll onlySelectLeaf', async () => {


    let onChange;
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  expandAll={true}
                                  onChange={onChange}
                                  onlySelectLeaf
                                  canInput/>);

    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');

    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    const value = rowData.filter((item: Object) => item.isLeaf).map(item => item.key);
    exp(cmp.find(Widget.Tree).props().value).to.be.eql(value);
  });
  it('selectAll limitCount: 5', async () => {


    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  expandAll={true}
                                  limitCount={5}/>);

    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');

    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    const value = rowData.filter((item: Object, index: number) => index < 5).map(item => item.key);
    exp(cmp.find(Widget.Tree).props().value).to.be.eql(value);
  });

  it('selectAll limitCount: 5 caninput 先选全部再输入', async () => {


    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  canInput
                                  expandAll={true}
                                  limitCount={5}/>);

    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');
    const txt = '100';
    chagneQuery(cmp, txt);
    findQueryInput(cmp).simulate('keydown', { keyCode: 13, });
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    const value = rowData.filter((item: Object, index: number) => index < 5).map(item => item.key);
    exp(cmp.find(Widget.Tree).props().value).to.be.eql(value);
  });


  it('selectAll limitCount: 5 caninput value: 我们啊 全选  然后进行刷新操作 非受限情况', async () => {


    const str = '我么啊啊';
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  value={str}
                                  displayValue={str}
                                  canInput
                                  expandAll={true}
                                  limitCount={5}/>);

    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.CheckIcon).simulate('click');

    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;

    const value = rowData.filter((item: Object, index: number) => index < 4).map(item => item.key);

    exp(cmp.find(Widget.Tree).props().value).to.be.eql([str, ...value,]);

    cmp.find(Widget.CheckIcon).simulate('click');
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.false;
    exp(cmp.find(Widget.Tree).props().value).to.be.eql([str,]);


  });
  it('全选  然后进行刷新操作 非受限情况', async () => {


    const str = '我么啊啊';
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  defaultValue={str}
                                  defaultDisplayValue={str}
                                  canInput
                                  expandAll={true}
                                  limitCount={5}/>);
    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.RefershIcon).simulate('click');
    exp(cmp.find(Widget.Tree).props().value).to.be.eql([]);

  });
  it('全选  然后进行刷新操作 受限情况', async () => {


    const str = '我么啊啊';
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  value={str}
                                  displayValue={str}
                                  canInput
                                  expandAll={true}
                                  limitCount={5}/>);
    cmp.find(Widget.InputTag).simulate('click');
    cmp.find(Widget.RefershIcon).simulate('click');
    exp(cmp.find(Widget.Tree).props().value).to.be.eql([str,]);

  });


  it('selectAll limitCount: 5 caninput 先输入再选全部', async () => {


    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  canInput
                                  expandAll={true}
                                  limitCount={5}/>);

    cmp.find(Widget.InputTag).simulate('click');
    const txt = '100';
    chagneQuery(cmp, txt);
    findQueryInput(cmp).simulate('keydown', { keyCode: 13, });
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.false;
    cmp.find(Widget.CheckIcon).simulate('click');
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.true;
    const value = rowData.filter((item: Object, index: number) => index < 4).map(item => item.key);
    exp(cmp.find(Widget.Tree).props().value).to.be.eql(['100', ...value,]);
  });
  it('没有任何结点可以选择的情况  全选框状态应该是未选中', async () => {

    const rowData = [
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '4', title: '4', },
      { key: '5', title: '5', },
      { key: '6', title: '6', },
      { key: '7', title: '7', },
      { key: '8', title: '8', },
      { key: '9', title: '9', },
      { key: '10', title: '10', },
      { key: '11', title: '11', },
      { key: '12', title: '12', },
      { key: '13', title: '13', },
      { key: '14', title: '14', },
      { key: '15', title: '15', },
      { key: '16', title: '16', },
      { key: '17', title: '17', },
      { key: '18', title: '18', },
      { key: '19', title: '19', },
      { key: '20', title: '20', },
      { key: '21', title: '21', },
      { key: '22', title: '22', },
      { key: '23', title: '23', },
      { key: '24', title: '24', },
      { key: '25', title: '25', },
      { key: '26', title: '26', },
      { key: '27', title: '27', },
      { key: '28', title: '28', },
      { key: '29', title: '29', },
      { key: '30', title: '30', },
      { key: '31', title: '31', },
      { key: '32', title: '32', },
      { key: '33', title: '33', },
      { key: '34', title: '34', },
      { key: '35', title: '35', },
      { key: '36', title: '36', },
      { key: '37', title: '37', },
      { key: '38', title: '38', },
      { key: '39', title: '39', },
      { key: '40', title: '40', },
      { key: '41', title: '41', },
      { key: '42', title: '42', },
      { key: '43', title: '43', },
      { key: '44', title: '44', },
      { key: '45', title: '45', },
      { key: '46', title: '46', },
      { key: '47', title: '47', },
      { key: '48', title: '48', },
      { key: '49', title: '49', },
      { key: '50', title: '50', },
      { key: '51', title: '51', },
      { key: '52', title: '52', },
      { key: '53', title: '53', },
      { key: '54', title: '54', },
      { key: '55', title: '55', },
    ];
    const cmp = mount(<TreeSelect data={rowData}
                                  mutliple
                                  canInput
                                  onlySelectLeaf
                                  expandAll={true}
                                  limitCount={5}/>);

    cmp.find(Widget.InputTag).simulate('click');
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.false;
    cmp.find(Widget.CheckIcon).simulate('click');
    exp(cmp.find(Widget.CheckIcon).props().checked).to.be.false;
    exp(cmp.find(Widget.Tree).props().value).to.be.eql([]);
  });

  function getTreeQuery (cmp: Object) {
    return findTree(cmp).props().query;
  }

  function findTree (cmp: Object) {
    return cmp.find(Widget.Tree).at(0);
  }

  function chagneQuery (cmp: Object, value: string) {
    findQueryInput(cmp).simulate('change', { target: { value, }, });

  }

  function findQueryInputValue (cmp: Object) {
    return findQueryInput(cmp).props().value;
  }

  function findQueryInput (cmp: Object) {
    return cmp.find(Widget.Input).find('input').at(0);
  }
});



