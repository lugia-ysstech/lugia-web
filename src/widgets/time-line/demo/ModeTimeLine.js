import React from 'react';
import styled from 'styled-components';
import TimeLine from '../index';

const TimeLineItem = TimeLine.TimeLineItem;
const Wrapper = styled.div`
  display: inline-block;
  margin-left: 100px;
`;
export default class ModeTimeLine extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <TimeLine mode={'alternate'}>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
    );
  }
}
