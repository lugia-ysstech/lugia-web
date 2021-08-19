import React from 'react';
import styled from 'styled-components';
import NumberInput from '../index';

const Wrapper = styled.div`
  display: inline-block;
`;
const InputWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class SizeNumberInput extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <InputWrapper>
          <NumberInput size={'small'} />
        </InputWrapper>
        <InputWrapper>
          <NumberInput />
        </InputWrapper>
        <InputWrapper>
          <NumberInput size={'large'} />
        </InputWrapper>
      </Wrapper>
    );
  }
}
