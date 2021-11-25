import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';

const { RangePicker } = DatePicker;
export const DemoItem = styled.span`
  display: inline-block;
  padding: 0 20px 20px 0;
`;
export default class BaseDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ['', '2021-11-25'],
    };
  }
  onChange = (param: { newValue: string }) => {
    const { newValue } = param;
    this.setState({ value: newValue });
  };
  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <DemoItem>
          <RangePicker
            showTime
            format={'YYYY-MM-DD'}
            placeholder={['开始时间', '结束时间']}
            value={value}
            onChange={this.onChange}
          />
        </DemoItem>
      </React.Fragment>
    );
  }
}
