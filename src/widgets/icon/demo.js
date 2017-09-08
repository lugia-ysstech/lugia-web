/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Icon from './';

export default () => {
  const onClick = () => {
    console.info('click');
  };
  return <Icon iconClass="sv-icon-close" onClick={onClick}/>;
};
