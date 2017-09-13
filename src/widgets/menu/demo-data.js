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
  for (let i = 0; i < 500000; i++) {
    items.push({ key: i, value: i, });
  }
  return <div>
    <div>hello world</div>
    <Theme config={{ [Widget.Menu]: { width: 200, height: 350, }, }}>
      <Menu data={items} mutliple>
      </Menu>
    </Theme>
  </div>;
};
