import React from 'react';
import styled from 'styled-components';
import NumberInput from '../index';

export default class PrecisionNumberInput extends React.Component<any, any> {
  render() {
    return (
      <div>
        <NumberInput max={10} min={0} step={0.5} defaultValue="0.5" precision={1} />
      </div>
    );
  }
}
