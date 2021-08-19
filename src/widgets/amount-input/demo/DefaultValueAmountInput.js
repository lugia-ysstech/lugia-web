import React from 'react';
import AmountInput from '../index';

export default class DefaultValueAmountInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '123456' };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return <AmountInput value={this.state.value} onChange={this.onChange} />;
  }
}
