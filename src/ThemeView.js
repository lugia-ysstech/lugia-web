import React, { Component } from 'react';
import styled from 'styled-components';

import PropsEdit from './PropsEdit';
import Affix from './widgets/affix';

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
      props: {},
    };
  }

  render() {
    const { modulePath, modules } = this.props;
    const { Target, Info } = modules[modulePath];
    const Result = Target ? Target : () => <div>找不到组件{modulePath}</div>;
    const viewClass = 'lugia_themeView';
    const theme = {
      [viewClass]: this.state.themeState,
    };
    return [
      <Affix offsetTop={20}>
        <Result viewClass={viewClass} theme={theme} {...this.state.props} />
      </Affix>,
      <Title>属性测试</Title>,
      <Block>
        <PropsEdit info={Info} onChange={this.onChangeProps} />
      </Block>,
      <Title>主题测试</Title>,
      <Block>
        <JSONEditorReact onChange={this.onThemeChange} height={500} />
      </Block>,
    ];
  }

  onChangeProps = (name: string, value: any) => {
    const oldProps = this.state.props;
    if (oldProps[name] == value) {
      return;
    }
    this.setState({ props: { ...oldProps, [name]: value } });
  };

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
