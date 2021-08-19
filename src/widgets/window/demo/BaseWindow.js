import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Window from '../index';
import Button from '../../button/index';

const Text = styled.p`
  padding: 20px;
  text-align: center;
`;
class BaseWindow extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  onClick = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    return (
      <Fragment>
        <Button onClick={this.onClick}>点击打开窗体组件</Button>
        <Window visible={visible} onClose={this.onClose}>
          <Text>我是窗体组件</Text>
          <Text>点头部灰色区域可以拖拽</Text>
          <Text>右上角可以关闭</Text>
          <Text>窗体大小，由内容撑开</Text>
        </Window>
      </Fragment>
    );
  }
}

export default BaseWindow;
