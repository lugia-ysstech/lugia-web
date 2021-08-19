import React from 'react';
import Tabs from '../../index';
import ForceRenderComponent from './ForceRenderComponent';
import styled from 'styled-components';
const H2 = styled.p`
  line-height: 50px;
  font-size: 14px;
`;
export default class ForceRender extends React.Component<any, any> {
  render() {
    const data = [
      {
        title: 'Tab1',
        content: <ForceRenderComponent />,
      },
      {
        title: 'Tab2',
        content: '1111',
      },
      {
        title: 'Tab3',
        content: 'content of Tab3',
      },
      {
        title: 'Tab3',
        content: 'content of Tab3',
      },
    ];
    return (
      <div>
        <H2>forceRender-true</H2>
        <Tabs data={data} forceRender={true} />
        <H2>forceRender-false</H2>
        <Tabs data={data} />
      </div>
    );
  }
}
