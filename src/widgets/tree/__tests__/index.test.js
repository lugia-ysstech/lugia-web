/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, render, } from 'enzyme';
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
describe('Tree', () => {
  let order;
  beforeEach(() => {
    order = VerifyOrder.create();
  });

  class TreeDemo extends React.Component<Object, Object> {
    render () {
      const { data, defaultValue, mutliple = true, } = this.props;
      return <Tree
        key="tree"
        expandAll
        showLine
        data={data}
        mutliple={mutliple}
        defaultValue={defaultValue}
      >
      </Tree>;
    }
  }

 
  it('props: defaultValue: 1 mutliple: true', () => {

    const cmp = render(<TreeDemo defaultValue={'1'} data={rowData}/>);
    exp(cmp.find('.sv-tree-checkbox').first().hasClass('sv-tree-checkbox-indeterminate')).to.be.true;
  });

  it('props: defaultValue: 1,1.1,1.2  mutliple: true', () => {

    const cmp = render(<TreeDemo data={rowData} defaultValue="1,1.1,1.2"/>);
    const chkBoxes = cmp.find('.sv-tree-checkbox');
    exp(chkBoxes.slice(0, 1).hasClass('sv-tree-checkbox-indeterminate')).to.be.true;
    exp(chkBoxes.slice(1, 2).hasClass('sv-tree-checkbox-checked')).to.be.true;
    exp(chkBoxes.slice(2, 3).hasClass('sv-tree-checkbox-indeterminate')).to.be.true;
  });


  it('props: defaultValue: 1  mutliple: false', () => {

    const cmp = render(<TreeDemo defaultValue={'1'} data={rowData} mutliple={false}/>);
    exp(cmp.find('.sv-tree-checkbox').length).to.be.equal(0);
    exp(cmp.find('.sv-tree-node-content-wrapper').first().hasClass('sv-tree-node-selected')).to.be.true;
  });

  it('props: defaultValue: 1,1.1,1.2  mutliple: false', () => {
    const cmp = render(<TreeDemo data={rowData} defaultValue="1,1.1,1.2" mutliple={false}/>);
    exp(cmp.find('.sv-tree-checkbox').length).to.be.equal(0);
    exp(cmp.find('.sv-tree-node-content-wrapper').first().hasClass('sv-tree-node-selected')).to.be.false;
  });
});
