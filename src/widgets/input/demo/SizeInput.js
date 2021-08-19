import React from 'react';
import styled from 'styled-components';
import Input from '../index';

const Wrapper = styled.div`
  display: inline-block;
`;
const InputWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
const onChange = cmpName => (value: any) => {};
export default class SizeInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return (
      <Wrapper>
        <InputWrapper>
          <Input size={'small'} placeholder={'请填写金额'} />
        </InputWrapper>
        <InputWrapper>
          <Input size={'default'} placeholder={'请填写金额'} />
        </InputWrapper>
        <InputWrapper>
          <Input size={'large'} placeholder={'请填写金额'} />
        </InputWrapper>
      </Wrapper>
    );
  }
}
