/**
 *
 * create by ligx
 *
 * @flow
 */

import Lugiad from './index';
import Theme from '../theme';
import React from 'react';

import Widget from '../consts';
const config = {
  [Widget.Lugiad]: {
    Container: {
      normal: {
        width: 100,
        height: 100,
        background: {
          color: 'red',
        },
      },
    },
  },
};
export default () => {
  return (
    <Theme config={config}>
      <Lugiad />
    </Theme>
  );
};
