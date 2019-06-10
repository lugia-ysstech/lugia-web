import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  margin-top: 20px;
  margin-left: 10px;
`;
const Block = styled.div`
  margin: 20px;
`;

export default class extends Component<any, any> {
  render() {
    const { modulePath, modules } = this.props;
    const Target = modules[modulePath];
    const Result = Target ? Target : () => <div>找不到组件{modulePath}</div>;
    return [
      <Title>主题测试</Title>,
      <Block>
        <Result />
      </Block>,
    ];
  }
}
