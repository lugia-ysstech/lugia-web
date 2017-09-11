//@flow

import * as React from 'react';
import chai from 'chai';
import Menu from '../';
import 'jest-styled-components';
import { shallow, } from 'enzyme';

const ReactShallowRenderer = require('react-test-renderer/shallow');

const { MenuItem, } = Menu;
const { expect: exp, } = chai;

describe('Menu', () => {


  it('DropMenu single selectedKeys 2', () => {
    const renderer = new ReactShallowRenderer();
    expect(renderer.render(<Menu selectedKeys={['2', '3',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>)).toMatchSnapshot();
  });

  it('DropMenu mutliple selectedKeys 2', () => {
    const renderer = new ReactShallowRenderer();
    expect(renderer.render(<Menu selectedKeys={['3', '4',]} mutliple>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>)).toMatchSnapshot();
  });

  it('DropMenu mutliple onClick', () => {
    const checkedKey = '4';
    const dom = shallow(<Menu mutliple>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    dom.find(MenuItem).forEach(node => {
      exp(node.prop('checked')).to.be.false;
    });
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    dom.find(MenuItem).forEach(node => {
      exp(node.prop('checked')).to.be.true;
    });
  });
  it('DropMenu mutliple onClick selectedKeys: 1 2', () => {
    const checkedKey = '4';
    const dom = shallow(<Menu mutliple selectedKeys={['1', '2',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.false;
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.true;
  });

  it('DropMenu single onClick selectedKeys: 1 2', () => {
    const checkedKey = '4';
    const dom = shallow(<Menu selectedKeys={['1', '2',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.false;
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.true;
  });
});
