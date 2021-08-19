import React from 'react';
import styled from 'styled-components';
import AmountInput from '../index';

export default class TransformAmountInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <AmountInput transform={true} />
      </div>
    );
  }
}
