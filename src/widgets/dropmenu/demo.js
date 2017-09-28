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
  <MenuItem key="1">1</MenuItem>
  <MenuItem key="2">b</MenuItem>
  <MenuItem key="3">c</MenuItem>
  <MenuItem key="4" checked>2</MenuItem>
  <MenuItem key="5" checked>3</MenuItem>
  <MenuItem key="6" checked>4</MenuItem>
  <MenuItem key="7" checked>5</MenuItem>
  <MenuItem key="8" checked>6</MenuItem>
  <MenuItem key="9" checked>7</MenuItem>
  <MenuItem key="10" checked>8</MenuItem>
  <MenuItem key="11" checked>9</MenuItem>
  <MenuItem key="12" checked>10</MenuItem>
  <MenuItem key="13" checked>1</MenuItem>
</Menu>;
export default () => {
  return <DropMenu menus={menus}>
    <input type="text"/>
  </DropMenu>;
};
