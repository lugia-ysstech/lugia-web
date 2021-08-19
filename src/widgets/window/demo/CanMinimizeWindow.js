import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Window from '../index';
import Button from '../../button/index';

const Text = styled.p`
  line-height: 200px;
  text-align: center;
`;

export default class CanMinimizeWindow extends Component {
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
        <Button onClick={this.onClick}>打开窗体</Button>
        <Window
          visible={visible}
          onClose={this.onClose}
          middle
          canMinimize
          width={500}
          height={500}
        >
          <Text>窗体最小化点击头部最小化图标</Text>
          <Text>可实现窗体最小化</Text>
        </Window>
      </Fragment>
    );
  }
}
