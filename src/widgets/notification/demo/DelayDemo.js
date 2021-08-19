import React from 'react';
import notification from '../index';
import Button from '../../button/index';

export default class NotificationDemo extends React.Component {
  durationOpen = duration => {
    notification.open({
      title: '恭喜！成功完成任务！',
      description: '您今天的任务圆满完成，再接再厉。',
      duration,
    });
  };
  render() {
    return (
      <div>
        <Button onClick={() => this.durationOpen(6)}>自定义延时关闭</Button>
        &nbsp;&nbsp;
        <Button onClick={() => this.durationOpen(0)}>不关闭</Button>
      </div>
    );
  }
}
