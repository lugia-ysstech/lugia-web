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
  const items = [];
  for (let i = 0; i < 20000; i++) {
    items.push(<MenuItem key={i}>{i}</MenuItem>);
  }
  return <div>
    <div>hello world</div>
    <Theme config={{ [Widget.Menu]: { width: 200, height: 350, }, }}><Menu>
      {items}
    </Menu></Theme>
  </div>;
};
