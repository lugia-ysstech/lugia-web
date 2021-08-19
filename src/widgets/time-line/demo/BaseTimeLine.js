import React from 'react';
import styled from 'styled-components';
import TimeLine from '../index';

const TimeLineItem = TimeLine.TimeLineItem;
const Wrapper = styled.div`
  display: inline-block;
`;
export default class BaseTimeLine extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <TimeLine>
          <TimeLineItem time="2018-01-01" />
          <TimeLineItem time="2018-01-02" />
          <TimeLineItem time="2018-01-03" />
          <TimeLineItem time="2018-01-04" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
    );
  }
}
