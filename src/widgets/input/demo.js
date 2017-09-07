/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
import Input from './';

export default () => {
  const view = {
    Input: {
      width: '100px',
    },
    register: {
      width: '20px',
    },
  };
  return <Theme config={view}>
    <Input width={50}/>
    <Input width={50} viewClass="register"/>
    <Input width={50} viewClass="register"/>
  </Theme>;
};
