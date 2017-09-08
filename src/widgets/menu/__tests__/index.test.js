//@flow

import * as React from 'react';
import chai from 'chai';
import Menu from '../';
import 'jest-styled-components';

const ReactShallowRenderer = require('react-test-renderer/shallow');

const { MenuItem, } = Menu;
const { expect: exp, } = chai;

describe('Menu', () => {


  it('Menu single selectKeys 2', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Menu selectKeys={['2', '3',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual([
      <MenuItem key="1">a</MenuItem>,
      <MenuItem key="2" checked>b</MenuItem>,
      <MenuItem key="3" checked>c</MenuItem>,
      <MenuItem key="4">d</MenuItem>,]
    );
  });

  it('Menu mutliple selectKeys 2', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Menu selectKeys={['3', '4',]} mutliple>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual([
      <MenuItem key="1" mutliple>a</MenuItem>,
      <MenuItem key="2" mutliple>b</MenuItem>,
      <MenuItem key="3" mutliple checked>c</MenuItem>,
      <MenuItem key="4" mutliple checked>d</MenuItem>,]
    );
  });

  it('Menu mutliple onClick', () => {
  });

});
