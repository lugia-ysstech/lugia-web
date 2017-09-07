/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
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
  return <Theme config={view}>
    <Input/>
    <Input viewClass="register"/>
    <Theme config={{ register: { width: '300px', }, }}>
      <Input viewClass="register"/>
    </Theme>
  </Theme>;
};
export default InputDemo;
