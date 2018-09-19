/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Affix from './affix';
import Button from '../button';

export default () => {
  return (
    <div style={{ width: '200px', height: '1200px' }}>
      <div style={{ width: '200px', height: '200px' }} />
      <Affix offsetTop={50}>
        <Button>affix-top</Button>
      </Affix>
      <div style={{ width: '200px', height: '500px' }} />
      <Affix offsetBottom={50}>
        <Button>affix-bottom</Button>
      </Affix>
    </div>
  );
};
