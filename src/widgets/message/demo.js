/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Message from './message';
import message from './index';
import Button from '../button';
import Widget from '../consts/index';
import Theme from '../theme';
import { createMessage } from './create-message';

export default class MessageDemo extends React.Component<any, any> {
  showMessage = (type: 'info' | 'success' | 'error' | 'warning' | 'loading') => () => {
    message[type]('哈哈哈哈', 2);
  };
  render() {
    return (
      <div>
        <Message iconType="info" />
        <Message iconType="success" />
        <Message iconType="error" />
        <Message iconType="warning" />
        <Message iconType="loading" />
        <br />
        <br />
        <Button onClick={this.showMessage('info')}>普通提示</Button>
        <br />
        <br />
        <Button onClick={this.showMessage('success')}>成功提示</Button>
        <br />
        <br />
        <Button onClick={this.showMessage('error')}>错误提示</Button>
        <br />
        <br />
        <Button onClick={this.showMessage('warning')}>警告提示</Button>
        <br />
        <br />
        <Button onClick={this.showMessage('loading')}>加载提示</Button>
      </div>
    );
  }
}
