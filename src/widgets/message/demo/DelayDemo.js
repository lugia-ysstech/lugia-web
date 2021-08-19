import React from 'react';
import message from '../index';
import Button from '../../button/index';

export default class MessageDemo extends React.Component {
  showMessage = () => {
    message.info('普通提示', 5);
  };
  render() {
    return (
      <Button type="primary" onClick={this.showMessage}>
        普通提示
      </Button>
    );
  }
}
