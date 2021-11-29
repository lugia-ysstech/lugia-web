/**
 * @Author:cuixiawang
 * @Date:2021/11/29
 */
import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';
const { RangePicker } = DatePicker;

export const DemoItem = styled.div`
  padding: 0 20px 20px 0;
`;
export default class DoubleRangeValid extends React.Component {
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
            defaultValue={['2021-11-25', '2021-11-25']}
            placeholder={['开始', '结束']}
            value={value}
            onChange={this.onChange}
            type={'double'}
            validateType={'top'}
            doubleValid={[
              { help: '开始时间有误', validateStatus: 'error' },
              { help: '结束时间有误', validateStatus: 'error' },
            ]}
          />
        </DemoItem>
      </React.Fragment>
    );
  }
}
