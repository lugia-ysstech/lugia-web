import React from 'react';
import styled from 'styled-components';
import Loading from '../index';

export const DemoItem = styled.span`
  display: inline-block;
  padding: 0 10px 10px 0;
`;
export default class BaseLoad extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <Loading size={'small'} />
        </DemoItem>
        <DemoItem>
          <Loading />
        </DemoItem>
        <DemoItem>
          <Loading size={'large'} />
        </DemoItem>
      </React.Fragment>
    );
  }
}
