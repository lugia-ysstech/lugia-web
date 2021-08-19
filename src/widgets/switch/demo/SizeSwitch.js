import React from 'react';
import styled from 'styled-components';
import Switch from '../index';

export const DemoItem = styled.div`
  padding: 0;
  padding-bottom: 10px;
`;
export default class BaseSwitch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <Switch defaultValue />
        </DemoItem>
        <DemoItem>
          <Switch defaultValue size={'small'} />
        </DemoItem>
      </React.Fragment>
    );
  }
}
