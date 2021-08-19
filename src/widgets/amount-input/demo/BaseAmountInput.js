import React from 'react';
import AmountInput from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

export default class BaseAmountInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return <AmountInput value={this.state.value} onChange={this.onChange} />;
  }
}
