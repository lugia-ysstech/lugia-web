/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';

import InputTag from './';
import * as Widget from '../consts/Widget';

const InputDemo = () => {
  const view = {
    [Widget.Input]: {
      width: '80px',
    },
    register: {
      width: '40px',
    },
  };
  return <Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
    <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
              value={['abcdeddfasdddfadasf', 'b', 'c',]}/>
  </Theme>;
};
export default InputDemo;
