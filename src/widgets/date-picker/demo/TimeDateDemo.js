import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';

const { RangePicker } = DatePicker;
export const DemoItem = styled.span`
  display: inline-block;
  padding: 0 20px 20px 0;
`;
export default class BaseDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} placeholder={'选择时间'} />
        </DemoItem>
        <br />
        <DemoItem>
          <RangePicker
            showTime
            format={'YYYY-MM-DD HH:mm:ss'}
            placeholder={['开始时间', '结束时间']}
          />
        </DemoItem>
      </React.Fragment>
    );
  }
}
