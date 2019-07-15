/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import Theme from '../theme';
import message from './index';
import Button from '../button';
import Message from './message';
import Widget from '../consts';

export default class MessageDemo extends React.Component<any, any> {
  showMessage = (type: 'info' | 'success' | 'error' | 'warning' | 'loading') => () => {
    message[type]('哈哈哈哈', 100);
  };
  render() {
    return (
      <div>
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
        <MessageStyle />
      </div>
    );
  }
}
export const MessageStyle = () => {
  const messageView = {
    [Widget.Message]: {
      MessageWrap: {
        normal: {
          width: 200,
          height: 50,
          boxShadow: getBoxShadow('0 0'),
          background: {
            color: 'green',
          },
          borderRadius: getBorderRadius(6),
          padding: 10,
          opacity: 0.8,
          border: getBorder({ width: 1, style: 'solid', color: 'red' }),
        },
      },
      MessageText: {
        normal: {
          color: 'red',
          font: { size: 16, weight: 600 },
        },
      },
      MessageIcon: {
        normal: {
          color: 'pink',
          font: { size: 18 },
        },
      },
    },
  };
  return (
    <div style={{ marginLeft: '50px' }}>
      <Theme config={messageView}>
        <Message iconType="info" content="hello world" time={1000} />
      </Theme>
      <br />
      <br />
      <Message iconType="info" content="hello world" time={1000} />
      <br />
      <br />
      <Message iconType="success" content="hello world" time={10} />
      <br />
      <br />
      <Message iconType="error" content="hello world" time={10} />
      <br />
      <br />
      <Message iconType="warning" content="hello world" time={10} />
      <br />
      <br />
      <Message iconType="loading" content="hello world" time={10} />
    </div>
  );
};
