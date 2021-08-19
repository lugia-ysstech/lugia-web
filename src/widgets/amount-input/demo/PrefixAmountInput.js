import React from 'react';
import styled from 'styled-components';
import AmountInput from '../index';

const Wrapper = styled.div`
  display: inline-block;
`;
const InputWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class PrefixAmountInput extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <InputWrapper>
          <AmountInput amountPrefix="¥" />
        </InputWrapper>
        <InputWrapper>
          <AmountInput amountPrefix="$" transform={false} />
        </InputWrapper>
      </Wrapper>
    );
  }
}
