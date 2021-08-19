import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';

export const DemoItem = styled.span`
  display: inline-block;
  padding: 0 20px 20px 0;
`;
const { YearPicker, MonthPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;
export default class BaseDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <DatePicker defaultValue={'2019-01-01'} disabled />
        </DemoItem>
        <DemoItem>
          <YearPicker defaultValue={'2019'} disabled />
        </DemoItem>
        <DemoItem>
          <MonthPicker defaultValue={'2019-01'} disabled />
        </DemoItem>
        <br />
        <DemoItem>
          <WeekPicker defaultValue={'2019-01'} disabled />
        </DemoItem>
        <DemoItem>
          <WeeksPicker defaultValue={'2019-01'} disabled />
        </DemoItem>
        <br />
        <DemoItem>
          <RangePicker defaultValue={['2019-01-01', '2019-02-03']} disabled />
        </DemoItem>
      </React.Fragment>
    );
  }
}
