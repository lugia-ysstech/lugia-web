/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tree from '../';
import { createTestComponent, } from 'sv-test-utils';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;
const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig, } = require('vx-mock');
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
const HalfChecked = 'sv-tree-checkbox-indeterminate';
const Checked = 'sv-tree-checkbox-checked';
const Selected = 'sv-tree-node-selected';
const CheckBox = '.sv-tree-checkbox';
const CheckBoxInner = '.sv-tree-checkbox-inner';
const TreeRow = '.sv-tree-node-content-wrapper';
describe('Tree', () => {
  let order;
  beforeEach(() => {
    order = VerifyOrder.create();
  });

  class ExpandAllTree extends React.Component<Object, Object> {
    render () {
      return <Tree
        key="tree"
        expandAll
        {...this.props}
      >
      </Tree>;
    }
  }

  it('props: query: 2.1.2.1 expandAll: true mutliple: false', () => {
    const Target = <Tree
      expandAll
      showLine
      query="2.1.2.1"
      data={rowData}
    >
    </Tree>;
    const cmp = mount(Target);
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
    const titles = cmp.find('.sv-tree-title');
    exp(titles.length).to.be.equal(4);
    exp(titles.at(0).text()).to.be.equal('2');
    exp(titles.at(1).text()).to.be.equal('2.1');
    exp(titles.at(2).text()).to.be.equal('2.1.2');
    exp(titles.slice(3, 4).text()).to.be.equal('2.1.2.1');
  });

  it('props: query: 2.1.2.1 expandAll: false mutliple: true', () => {
    const cmp = mount(<Tree
      expandAll
      mutliple
      showLine
      data={rowData}
    >
    </Tree>);
  });


  it('props: defaultValue: 1 mutliple: true onChange监听', async () => {

    class LimitTree extends React.Component<Object, Object> {
      render () {
        return <Tree
          expandAll
          {...this.props}
        >
        </Tree>;
      }

    }

    let onChange;
    const res = new Promise(resolve => {
      const values = [];
      onChange = v => {
        values.push(v);
        if (values.length === 2) {
          resolve(values);
        }
      };
    });

    const Target = <LimitTree defaultValue="1" data={rowData} mutliple onChange={onChange}/>;
    const cmp = mount(Target);
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
    const chkBox = cmp.find(CheckBoxInner);
    chkBox.at(1).simulate('click', {});
    chkBox.at(1).simulate('click', {});
    chkBox.at(3).simulate('click', {});
    const result = await res;
    exp(result).to.be.eql([['1', '1.1',], ['1',], ['1', '1.2.1',],]);
  });

  it('props: value: 1 mutliple: true onChange监听 limit', async () => {

    class LimitTree extends React.Component<Object, Object> {
      render () {
        return <Tree
          value={'1'}
          expandAll
          {...this.props}
        >
        </Tree>;
      }

    }

    let onChange;
    const res = new Promise(resolve => {
      const values = [];
      onChange = v => {
        values.push(v);
        if (values.length === 2) {
          resolve(values);
        }
      };
    });

    const Target = <LimitTree defaultValue="2" data={rowData} mutliple onChange={onChange}/>;
    const cmp = mount(Target);
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();

    const chkBox = cmp.find(CheckBoxInner);
    chkBox.at(1).simulate('click', {});
    chkBox.at(1).simulate('click', {});
    chkBox.at(3).simulate('click', {});
    const result = await res;
    cmp.find(CheckBox);
    exp(result).to.be.eql([['1', '1.1',], ['1',], ['1', '1.2.1',],]);
  });


  it('props: defaultValue: 1,1.1,1.2  mutliple: false', () => {

    const cmp = mount(<ExpandAllTree data={rowData} defaultValue="1,1.1,1.2"/>);
    exp(cmp.find('.' + Selected).length).to.be.equal(0);
  });

  it('props: value 1  mutliple: false', () => {

    const cmp = mount(<ExpandAllTree data={rowData} value="1"/>);
    const chkBoxes = cmp.find(TreeRow);
    exp(cmp.find('.' + Selected).length).to.be.equal(1);
    exp(chkBoxes.at(0).hasClass(Selected)).to.be.true;
    exp(chkBoxes.at(1).hasClass(Selected)).to.be.false;
    exp(chkBoxes.at(2).hasClass(Selected)).to.be.false;
  });

  it('props: defaultValue: 1,1.1,1.2 & value 1  mutliple: false', () => {

    const cmp = mount(<ExpandAllTree data={rowData} defaultValue="1" value="1.2"/>);
    const chkBoxes = cmp.find(TreeRow);
    exp(cmp.find('.' + Selected).length).to.be.equal(1);
    exp(chkBoxes.at(2).hasClass(Selected)).to.be.true;
  });


  it('props: defaultValue: 1 mutliple: false onChange监听', async () => {

    class LimitTree extends React.Component<Object, Object> {
      render () {
        return <Tree
          expandAll
          {...this.props}
        >
        </Tree>;
      }

    }

    let onChange;
    const res = new Promise(resolve => {
      const values = [];
      onChange = v => {
        values.push(v);
        if (values.length === 2) {
          resolve(values);
        }
      };
    });

    const cmp = mount(<LimitTree defaultValue="1" data={rowData} mutliple={false} onChange={onChange}/>);
    const getChkBox = () => cmp.find(TreeRow);

    getChkBox().at(1).simulate('click', {});
    
    cmp.update();
    exp(cmp.find(TreeRow).at(1).hasClass(Selected)).to.be.true;
    getChkBox().at(1).simulate('click', {});
    getChkBox().at(3).simulate('click', {});
    
    cmp.update();

    const result = await res;
    exp(cmp.find('.' + Selected).length).to.be.equal(1);
    exp(result).to.be.eql([['1.1',], ['',], ['1.2.1',],]);
  });

  it('props: value: 1 mutliple: false onChange监听 limit', async () => {

    class LimitTree extends React.Component<Object, Object> {
      constructor (props) {
        super(props);
        const { value, } = props;
        this.state = { value, };
      }

      render () {
        const { value, } = this.state;
        return [<Tree
          value={value}
          expandAll
          {...this.props}
        >
        </Tree>, <button onClick={this.onClick}></button>,];
      }

      onClick = () => {
        this.setState({ value: '1.1', });
      }
    }

    let onChange;
    const res = new Promise(resolve => {
      const values = [];
      onChange = v => {
        values.push(v);
        if (values.length === 2) {
          resolve(values);
        }
      };
    });

    const Target = <LimitTree value="1" data={rowData} onChange={onChange}/>;
    const cmp = mount(Target);
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();

    const getChkBox = () => cmp.find(TreeRow);

    function checkSelectStatus () {
      exp(getChkBox().at(0).hasClass(Selected)).to.be.true;
      exp(getChkBox().at(1).hasClass(Selected)).to.be.false;
      exp(getChkBox().at(3).hasClass(Selected)).to.be.false;
    }

    getChkBox().at(1).simulate('click', {});
    checkSelectStatus();
    getChkBox().at(1).simulate('click', {});
    checkSelectStatus();
    getChkBox().at(3).simulate('click', {});
    checkSelectStatus();
    const result = await res;
    cmp.find(CheckBox);
    exp(result).to.be.eql([['1.1',], ['1.1',], ['1.2.1',],]);
  });


  it('props: value: 1 mutliple: false 重新设置value属性', () => {


    class Target extends React.Component<Object, Object> {
      constructor (props) {
        super(props);
        const { value, } = props;
        this.state = { value, };
      }

      render () {
        const { value, } = this.state;
        return [<Tree data={rowData}
                       expandAll
                       value={value}
        >
        </Tree>, <button onClick={this.onClick}></button>,];
      }

      onClick = () => {
        this.setState({ value: '1.1', });
      }
    }

    const cmp = mount(<Target value="1"/>);

    exp(cmp.find(TreeRow).at(0).hasClass(Selected)).to.be.true;
    exp(cmp.find(`.${Selected}`).length).to.be.equal(1);
    cmp.find('button').simulate('click');
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(1);
    exp(cmp.find(TreeRow).at(0).hasClass(Selected)).to.be.false;
    exp(cmp.find(TreeRow).at(1).hasClass(Selected)).to.be.true;

  });


  it('mutliple: false change props.value ', () => {

    const cmp = mount(<Tree expandAll data={rowData}/>);
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
    cmp.setProps({ value: '1', });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(1);

    cmp.setProps({ value: '1.1', });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(1);

  });

  it('mutliple: false change props.value 1 => ""  ', () => {
    createSinglePropsValueEmptyCase('');
  });

  it('mutliple: false change props.value 1 => undefined  ', () => {
    createSinglePropsValueEmptyCase(undefined);
  });


  function createSinglePropsValueEmptyCase (emptyValue: any) {
    const cmp = mount(<Tree expandAll data={rowData}/>);
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
    cmp.setProps({ value: '1', });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(1);

    cmp.setProps({ value: emptyValue, });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
  }


  it('mutliple: true change props.value 1 => ""  ', () => {
    createMutlipePropsValueEmptyCase('');
  });

  it('mutliple: true change props.value 1 => undefined  ', () => {
    createMutlipePropsValueEmptyCase(undefined);
  });


  function createMutlipePropsValueEmptyCase (emptyValue: any) {
    const cmp = mount(<Tree mutliple={true} expandAll data={rowData}/>);
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
    cmp.setProps({ value: '1', });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(1);

    cmp.setProps({ value: emptyValue, });
    
    cmp.update();
    exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);
  }

  it('props: defaultValue: 1,1.1,1.2  mutliple: true', () => {

    const cmp = mount(<ExpandAllTree data={rowData} defaultValue="1,1.1,1.2" mutliple/>);
    const chkBoxes = cmp.find(CheckBox);
    exp(chkBoxes.at(0).hasClass(HalfChecked)).to.be.true;
    exp(chkBoxes.at(1).hasClass(Checked)).to.be.true;
    exp(chkBoxes.at(2).hasClass(HalfChecked)).to.be.true;
  });

  it('props: value 1  mutliple: true', () => {

    const cmp = mount(<ExpandAllTree data={rowData} value="1" mutliple/>);
    const chkBoxes = cmp.find(CheckBox);
    exp(chkBoxes.at(0).hasClass(HalfChecked)).to.be.true;
    exp(chkBoxes.at(1).hasClass(Checked)).to.be.false;
    exp(chkBoxes.at(2).hasClass(HalfChecked)).to.be.false;
  });

  it('props: defaultValue: 1,1.1,1.2 & value 1  mutliple: true', () => {

    const cmp = mount(<ExpandAllTree data={rowData} defaultValue="1,1.1,1.2" value="1" mutliple/>);
    const chkBoxes = cmp.find(CheckBox);
    exp(chkBoxes.at(0).hasClass(HalfChecked)).to.be.true;
    exp(chkBoxes.at(1).hasClass(Checked)).to.be.false;
    exp(chkBoxes.at(2).hasClass(HalfChecked)).to.be.false;
  });


  it('props: defaultValue: 1  mutliple: false', () => {

    const cmp = mount(<ExpandAllTree defaultValue="1" data={rowData} mutliple={false}/>);
    exp(cmp.find(CheckBox).length).to.be.equal(0);
    exp(cmp.find(TreeRow).first().hasClass(Selected)).to.be.true;
  });

  it('props: defaultValue: 1,1.1,1.2  mutliple: false', () => {
    const cmp = mount(<ExpandAllTree data={rowData} defaultValue="1,1.1,1.2" mutliple={false}/>);
    exp(cmp.find(CheckBox).length).to.be.equal(0);
    exp(cmp.find(TreeRow).first().hasClass(Selected)).to.be.false;
  });


  it('mutliple: true ,  onlySelectLeaf: true', async () => {

    const promise = new Promise(resolve => {
      const onChange = v => {
        resolve(v);
      };
      const cmp = mount(<Tree mutliple={true} expandAll data={rowData} onChange={onChange} onlySelectLeaf/>);
      cmp.find(CheckBoxInner).at(5).simulate('click', {});

      
      cmp.update();
      exp(cmp.find(`.${Selected}`).length).to.be.equal(0);
      exp(cmp.find(`.${Checked}`).length).to.be.equal(3);
      exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(3);
    });
    exp(await promise).to.be.eql(['1.2.2.1.1', '1.2.2.1.2',]);
  });
  it('mutliple: true ,  limitCount: 1', async () => {

    const promise = new Promise(resolve => {
      const onChange = (value, displayValue) => {
        resolve({ value, displayValue, });
      };
      const cmp = mount(<Tree mutliple={true} expandAll data={rowData} onChange={onChange} limitCount={1}/>);
      cmp.find(CheckBoxInner).at(5).simulate('click', {});

      
      cmp.update();
    });
    const result = await promise;
    exp(result).to.be.eql({ value: ['1.2.2.1',], displayValue: ['1.2.2.1',], });
  });

  it('mutliple: false ,  onlySelectLeaf: true', () => {
    const cmp = mount(<Tree mutliple={false} expandAll data={rowData}
                            onlySelectLeaf/>);
    cmp.find(TreeRow).at(5).simulate('click', {});

    
    cmp.update();
    exp(cmp.find(`${CheckBox}`).length).to.be.equal(0);
    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
  });
  it('mutliple: false ,  igronSelectField: title', () => {
    const cmp = mount(<Tree mutliple={false} expandAll data={rowData} igronSelectField={'title'}/>);
    cmp.find(TreeRow).at(5).simulate('click', {});

    
    cmp.update();
    exp(cmp.find(`${CheckBox}`).length).to.be.equal(0);
    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
  });
  it('mutliple: false ,  limitCount: 0', () => {
    const cmp = mount(<Tree mutliple={false} expandAll data={rowData} limitCount={0}/>);
    cmp.find(TreeRow).at(5).simulate('click', {});

    
    cmp.update();
    exp(cmp.find(`${CheckBox}`).length).to.be.equal(0);
    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
  });


  it('mutliple: true ,  value： 在不可见的位置', () => {
    let target = {};
    const Target = createTestComponent(Tree, the => {
      target = the;
    });
    const cmp = mount(<Target value={'3.2'} data={rowData} mutliple expandAll/>);

    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
    target.getThemeTarget().setState({ start: 17, }, () => {

    });
    
    cmp.update();
    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(1);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(1);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
    const chkBox = cmp.find(CheckBox);
    exp(chkBox.at(chkBox.length - 4).hasClass(HalfChecked), '3被半选上').to.be.true;
    exp(chkBox.at(chkBox.length - 2).hasClass(Checked), '3.2被全选上').to.be.true;
  });

  it('mutliple: false ,  value： 在不可见的位置', () => {
    let target = {};
    const Target = createTestComponent(Tree, the => {
      target = the;
    });
    const cmp = mount(<Target value={'3.2'} data={rowData} expandAll/>);

    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(0);
    target.getThemeTarget().setState({ start: 17, }, () => {

    });
    
    cmp.update();
    exp(cmp.find(`.${Checked}`).length, '全选结点必须为0').to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`, '半选书必须为0').length).to.be.equal(0);
    exp(cmp.find(`.${Selected}`).length, '单选数应该为0').to.be.equal(1);
    const rows = cmp.find(TreeRow);
    exp(rows.at(rows.length - 2).hasClass(Selected)).to.be.true;
  });


  it('props:  expandAll:true | false,  mutliple: true , query:  1.3.2.1  & 1.3.2.1.1 & 1.3', () => {
    createMutlipleTreeQueryCase(true, true);
    createMutlipleTreeQueryCase(false, true);
  });

  it('props:  expandAll:true | false,  mutliple: false , query:  1.3.2.1  & 1.3.2.1.1 & 1.3', () => {
    createMutlipleTreeQueryCase(true, false);
    createMutlipleTreeQueryCase(false, false);
  });

  function createMutlipleTreeQueryCase (expandAll: boolean, mutliple: boolean) {

    const cmp = mount(<Tree data={rowData} expandAll={expandAll} mutliple={mutliple}/>);

    cmp.setProps({ query: '1.3.2.1', });
    
    cmp.update();
    const getValue = () => cmp.find(TreeRow).map(node => node.text()).join(',');
    exp(getValue()).to.be.equal('1,1.3,1.3.2,1.3.2.1');
    exp(cmp.find(TreeRow).length).to.be.equal(4);

    cmp.setProps({ query: '1.3.2.1.1', });
    
    cmp.update();
    exp(cmp.find(TreeRow).length).to.be.equal(0);

    cmp.setProps({ query: '1.3', });
    
    cmp.update();

    exp(getValue()).to.be.equal('1,1.3,1.3.1,1.3.1.1,1.3.1.2,1.3.2,1.3.2.1,1.3.2.2,1.3.3');
    exp(cmp.find(TreeRow).length).to.be.equal(9);
  }

  const Switcher = '.sv-tree-switcher';
  const SwitcherOpen = 'sv-tree-switcher_open';
  const SwitcherClose = 'sv-tree-switcher_close';
  it('expandAll: false 折叠测试', () => {
    const expandAll = true;
    const cmp = mount(<Tree data={rowData} expandAll={expandAll}/>);

    // 折叠 1
    expectNodeExpandStatue(cmp, 0, true);
    exp(cmp.find(TreeRow).at(1).text(), '第二个结点为1.1').to.be.equal('1.1');
    cmp.find(Switcher).at(0).simulate('click');
    
    cmp.update();
    exp(cmp.find(TreeRow).at(1).text(), '第二个结点为2').to.be.equal('2');
    expectNodeExpandStatue(cmp, 0, false);

    // 折叠 2
    expectNodeExpandStatue(cmp, 1, true);
    cmp.find(Switcher).at(1).simulate('click');
    
    cmp.update();
    expectNodeExpandStatue(cmp, 1, false);

    // 折叠 3
    expectNodeExpandStatue(cmp, 2, true);
    cmp.find(Switcher).at(2).simulate('click');
    
    cmp.update();
    expectNodeExpandStatue(cmp, 2, false);


    // 展开 1 操作
    cmp.find(Switcher).at(0).simulate('click');
    
    cmp.update();
    exp(cmp.find(TreeRow).at(1).text(), '第二个结点为2').to.be.equal('1.1');
    expectNodeExpandStatue(cmp, 0, true);

  });

  function expectNodeExpandStatue (cmp, index: number, open: boolean) {

    exp(cmp.find(Switcher).at(index).hasClass(open ? SwitcherOpen : SwitcherClose), '1 目前为展开').to.be.true;
    exp(cmp.find(Switcher).at(index).hasClass(open ? SwitcherClose : SwitcherOpen), '1 目前为展开').to.be.false;
  }

  const empty = '<span class="sc-iwsKbI hanuQI">查无结果</span>';
  it('data 为空的情况', () => {
    const cmp = mount(<Tree/>);
    exp(cmp.html()).to.be.equal(empty);
  });

  it('data 为[]的情况', () => {
    const cmp = mount(<Tree data={[]}/>);
    exp(cmp.html()).to.be.equal(empty);
  });

  it('重新设置熟悉为 null 的情况', () => {
    const cmp = mount(<Tree data={rowData}/>);
    cmp.setProps({ data: null, });
    
    cmp.update();
    exp(cmp.html()).to.be.equal(empty);
  });

  it('多选树，shift键只选当前节点，不选择子节点', () => {

    const cmp = mount(<Tree data={rowData} expandAll mutliple/>);
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);

    cmp.find(CheckBox).at(0).simulate('click', { shiftKey: true, });
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(1);
    exp(cmp.find(CheckBox).at(0).hasClass(HalfChecked)).to.be.true;
  });
  it('多选树，shift键反选节点，', () => {

    const cmp = mount(<Tree data={rowData} expandAll mutliple/>);
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);

    cmp.find(CheckBox).at(0).simulate('click');
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(14);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);


    cmp.find(CheckBox).at(0).simulate('click', { shiftKey: true, });
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);
  });


  it('查询结果切换是value设置是否正确', () => {

    const cmp = mount(<Tree data={rowData} expandAll={true} mutliple={true}/>);
    cmp.setProps({ value: '3.1', });
    
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);

    cmp.setProps({ query: '3.1', });
    
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(1);
    exp(cmp.find(CheckBox).at(5).hasClass(HalfChecked)).to.be.true;
    exp(cmp.find(CheckBox).at(6).hasClass(Checked)).to.be.true;
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(1);

    cmp.setProps({ query: '', });
    
    cmp.update();
    exp(cmp.find(`.${Checked}`).length).to.be.equal(0);
    exp(cmp.find(`.${HalfChecked}`).length).to.be.equal(0);
  });
  it('查询所有时先移动滚动条到底部，而后进行查询。最后恢复为查询全部', () => {
    let target = {};
    const Target = createTestComponent(Tree, the => {
      target = the;
    });
    const cmp = mount(<Target value={'3.2'} data={rowData} mutliple expandAll/>);


    target.getThemeTarget().setState({ start: 17, }, () => {

    });
    
    cmp.update();
    exp(target.getThemeTarget().state.start, '移动滚动条到底部失败').to.be.equal(17);

    cmp.setProps({ query: '3.1', });
    
    cmp.update();
    exp(target.getThemeTarget().state.start, '查询后start统一移动到顶部').to.be.equal(0);

    cmp.setProps({ query: '', });
    
    cmp.update();
    exp(target.getThemeTarget().state.start, '恢复到原来的底部位置').to.be.equal(17);

  });

  // displayValue的测试场景
  // value为4的场景

});
