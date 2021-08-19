import React from 'react';
import styled from 'styled-components';
import Divider from '../index';

const DividerContent = styled.div`
  line-height: 1.5;
  padding: 0 10px;
`;
export default class ContentDivider extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Divider />
        <DividerContent>"不用思考.因为我帮你想好了",这是lugia设计的重要原则之一.</DividerContent>
        <Divider />
      </div>
    );
  }
}
