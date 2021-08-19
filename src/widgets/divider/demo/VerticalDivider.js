import React from 'react';
import styled from 'styled-components';
import Divider from '../index';

const Wrapper = styled.div`
  height: 20;
`;
export default class VerticalDivider extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <div style={{ height: 20 }}>
          text
          <Divider type="vertical" />
          text
          <Divider type="vertical" />
          text
          <Divider type="vertical" />
          text
          <Divider type="vertical" />
          text
        </div>
      </Wrapper>
    );
  }
}
