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
      width: 3000,
    },
    register: {
      width: 20,
    },
  };
  return <Theme config={view}>
    <Input/>
    <Input viewClass="register"/>
    <Theme config={{ register: { width: 5000, }, }}>
      <Input viewClass="register"/>
    </Theme>
  </Theme>;
};
export default InputDemo;
