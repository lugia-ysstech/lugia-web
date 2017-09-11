/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
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
  return <InputTag/>;
};
export default InputDemo;
