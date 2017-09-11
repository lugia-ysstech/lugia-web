/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import DropMenu from './';
import Menu from '../menu';

const { MenuItem, } = Menu;
const menus = <Menu>
  <MenuItem key="1">a</MenuItem>
  <MenuItem key="2">b</MenuItem>
  <MenuItem key="3">c</MenuItem>
  <MenuItem key="4" checked>d</MenuItem>
</Menu>;
export default () => {
  return <DropMenu menus={menus}>
    <input type="text"/>
  </DropMenu>;
};
