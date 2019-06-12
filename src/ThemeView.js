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
    const module = modules[modulePath];
    const { Target, Info } = module ? module : {};
    const Result = Target ? Target : () => <div>找不到组件{modulePath}</div>;
    const viewClass = 'lugia_themeView';
    const theme = {
      [viewClass]: this.state.themeState[modulePath],
    };
    return [
      <Affix offsetTop={20}>
        <Result viewClass={viewClass} theme={theme} {...this.state.props[modulePath]} />
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
    const { modulePath } = this.props;
    const oldProps = this.state.props[modulePath] || {};
    if (oldProps[name] != value) {
      oldProps[name] = value;
      this.setState({ props: { ...this.state.props, [modulePath]: { ...oldProps } } });
    }
  };

  onThemeChange = value => {
    const { modulePath } = this.props;
    let res = {};
    try {
      res = JSON.parse(value);
      this.setState({ themeState: { [modulePath]: res } });
    } catch (err) {
      //
    }
  };
}
