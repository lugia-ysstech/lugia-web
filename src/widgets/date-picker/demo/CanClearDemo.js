import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';

const { YearPicker, MonthPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;
export const DemoItem = styled.span`
  display: inline-block;
  padding: 0 20px 20px 0;
`;
export default class BaseDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <DatePicker canClear={false} />
        </DemoItem>
        <DemoItem>
          <YearPicker canClear={false} />
        </DemoItem>
        <DemoItem>
          <MonthPicker canClear={false} />
        </DemoItem>
        <br />
        <DemoItem>
          <WeekPicker canClear={false} />
        </DemoItem>
        <DemoItem>
          <WeeksPicker canClear={false} />
        </DemoItem>
        <br />
        <DemoItem></DemoItem>
      </React.Fragment>
    );
  }
}
