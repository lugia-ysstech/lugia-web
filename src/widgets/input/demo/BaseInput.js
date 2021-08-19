import React from 'react';
import Input from '../index';

export default class BaseInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return <Input value={this.state.value} onChange={this.onChange} />;
  }
}
