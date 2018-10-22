/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Message from './message';
import Widget from '../consts/index';
import Theme from '../theme';

export default class AlertDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Alert]: {
        width: 200,
        color: '#ffa500',
      },
    };
    return (
      <div>
        <Message />
      </div>
    );
  }
}
