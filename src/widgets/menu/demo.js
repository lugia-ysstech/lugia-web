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
    <MenuItem checked>
      a
    </MenuItem>
    <MenuItem>
      b
    </MenuItem>
    <MenuItem>
      b
    </MenuItem>
  </Menu>;
};
