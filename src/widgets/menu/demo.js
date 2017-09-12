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
    <div>hello world</div>
    <Theme config={{ [Widget.Menu]: { width: 200, height: 350, }, }}><Menu>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu></Theme>
  </div>;
};
