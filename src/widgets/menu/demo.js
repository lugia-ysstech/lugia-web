/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './';

const { MenuItem, } = Menu;
export default () => {
  return <Menu>
    <MenuItem key="1">a</MenuItem>
    <MenuItem key="2">b</MenuItem>
    <MenuItem key="3">c</MenuItem>
    <MenuItem key="4" checked>d</MenuItem>
  </Menu>;
};
