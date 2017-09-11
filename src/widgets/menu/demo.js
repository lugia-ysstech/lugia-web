/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './';
import Theme from '../theme';
import * as Widget from '../consts/Widget';

const { MenuItem, } = Menu;
export default () => {
  return <div>
    <Menu>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4" checked>d</MenuItem>
    </Menu>
    <Theme config={{ [Widget.Menu]: { width: '500px', }, }}>
      < Menu>
        < MenuItem key="1">1</MenuItem>
        <MenuItem key="2">2</MenuItem>
        <MenuItem key="3">3</MenuItem>
        <MenuItem key="4" checked>4</MenuItem>
      </Menu>
    </Theme>
  </div>;
};
