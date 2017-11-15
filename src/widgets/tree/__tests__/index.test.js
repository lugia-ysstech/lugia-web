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
import Tree from '../';

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
    const cmp = mount(<Tree
      expandAll
      showLine
      query="2.1.2.1"
      data={rowData}
    >
    </Tree>);
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

    const cmp = mount(<LimitTree defaultValue="1" data={rowData} mutliple onChange={onChange}/>);
    const chkBox = cmp.find(CheckBoxInner);
    chkBox.at(1).simulate('click', {});
    chkBox.at(1).simulate('click', {});
    chkBox.at(3).simulate('click', {});
    const result = await res;
    exp(result).to.be.eql([ [ '1', '1.1', ], [ '1', ], [ '1', '1.2.1', ], ]);
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

    const cmp = mount(<LimitTree defaultValue="1" data={rowData} mutliple onChange={onChange}/>);
    const chkBox = cmp.find(CheckBoxInner);
    chkBox.at(1).simulate('click', {});
    chkBox.at(1).simulate('click', {});
    chkBox.at(3).simulate('click', {});
    const result = await res;
    cmp.find(CheckBox);
    exp(result).to.be.eql([ [ '1', '1.1', ], [ '1', ], [ '1', '1.2.1', ], ]);
  });


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
});
