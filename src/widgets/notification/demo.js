/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Notification from './notification';
import notification from './index';
import Button from '../button';
import Widget from '../consts/index';
import Theme from '../theme';
import { createNotification } from './create';

export default class NotificationDemo extends React.Component<any, any> {
  render() {
    notification.open({ title: '今天天气很好！', description: '因为今天的太阳很大。' });
    notification.info({
      duration: 6,
      title: '今天天气很好！',
      description: '因为今天的太阳很大。',
    });
    notification.success({
      duration: 0,
      title: '今天天气很好！',
      description: '因为今天的太阳又升起来了。',
    });
    notification.error({
      duration: null,
      title: '今天天气太糟糕了！',
      description: '因为今天的太阳不在家。',
    });
    notification.warning({ title: '今天天气不太好！', description: '因为今天是阴天。' });
    notification.open({
      icon: 'lugia-icon-reminder_check_circle',
      title: '今天天气很好！',
      description: '因为今天的太阳很大。',
    });
    notification.open({
      icon: 'lugia-icon-reminder_check_circle',
      title: '今天天气很好！',
      description: '因为今天的太阳很大。',
      placement: 'topLeft',
    });
    notification.open({
      icon: 'lugia-icon-reminder_check_circle',
      title: '今天天气很好！1',
      description: '因为今天的太阳很大1。',
      placement: 'bottomLeft',
    });
    notification.open({
      icon: 'lugia-icon-reminder_check_circle',
      title: '今天天气很好！2',
      description: '因为今天的太阳很大2。',
      placement: 'bottomLeft',
    });
    return <div />;
  }
}
