import React, { Component } from 'react';
import styled from 'styled-components';

import JSONEditorReact from './JSONEditorReact.js';

const Title = styled.h3`
  margin-top: 20px;
  margin-left: 10px;
`;
const Block = styled.div`
  margin: 20px;
`;

export default class extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      themeState: {},
    };
  }

  render() {
    const { modulePath, modules } = this.props;
    const Target = modules[modulePath];
    const Result = Target ? Target : () => <div>找不到组件{modulePath}</div>;

    const viewClass = 'lugia_themeView';
    const theme = {
      [viewClass]: this.state.themeState,
    };
    return [
      <Title>主题测试</Title>,
      <Block>
        <JSONEditorReact onChange={this.onThemeChange} />
      </Block>,

      <Block>
        <Result viewClass={viewClass} theme={theme} />
      </Block>,
    ];
  }

  onThemeChange = value => {
    let res = {};
    try {
      res = JSON.parse(value);
      this.setState({ themeState: res });
    } catch (err) {
      //
    }
  };
}
