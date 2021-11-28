import React from 'react';
import styled from 'styled-components';
import DatePicker from '../index';
import Input from '../../input/input';
const { RangePicker } = DatePicker;
export const DemoItem = styled.div`
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
    console.log('param', param);
    this.setState({ value: newValue });
  };
  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <DemoItem>
          <DatePicker
            defaultValue={['2021-11-25', '2021-11-25']}
            placeholder={['开始', '结束']}
            value={value}
            onChange={this.onChange}
            type={'double'}
            validateStatus={'error'}
            validateType={'inner'}
            help={'格式有误'}
          />
        </DemoItem>
        <Input validateStatus={'error'} validateType={'inner'} help={'格式有误'} />
      </React.Fragment>
    );
  }
}
