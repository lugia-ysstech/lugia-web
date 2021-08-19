import React from 'react';
import message from '../index';
import Button from '../../button/index';

export default class MessageDemo extends React.Component {
  showMessage = type => () => {
    message[type]('消息提示', 2);
  };
  render() {
    return (
      <div>
        <Button type="success" onClick={this.showMessage('success')}>
          成功提示
        </Button>
        <br />
        <br />
        <Button type="danger" onClick={this.showMessage('error')}>
          错误提示
        </Button>
        <br />
        <br />
        <Button type="warning" onClick={this.showMessage('warning')}>
          警告提示
        </Button>
        <br />
        <br />
        <Button onClick={this.showMessage('loading')}>加载提示</Button>
      </div>
    );
  }
}
