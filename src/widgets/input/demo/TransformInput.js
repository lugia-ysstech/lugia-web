import React from 'react';
import Input from '../index';

export default class TransformInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const formatter = value => {
      return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const parser = value => {
      return value.replace(/\$\s?|(,*)/g, '');
    };
    return (
      <div>
        <Input placeholder={'请填写金额'} formatter={formatter} parser={parser} />
      </div>
    );
  }
}
