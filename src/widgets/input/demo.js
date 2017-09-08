/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Input from './';
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
  return <Input/>;
};
export default InputDemo;
