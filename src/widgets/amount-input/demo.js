/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import AmountInput from './index';
import styled from 'styled-components';

class LimitAmountInput extends React.Component<any, any> {
  state = { value: '' };
  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    return <AmountInput value={this.state.value} onChange={this.onChange} />;
  }
}
class DefaultValueAmountInput extends React.Component<any, any> {
  render() {
    return <AmountInput defaultValue={'123456'} onChange={this.props.onChange} />;
  }
}

class ValidateInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = { value: '' };

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    const { validateType } = this.props;
    const value = this.state.value;
    const validateStatus = String(value).indexOf('5') !== -1 ? 'error' : 'default';
    return (
      <AmountInput
        value={value}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

const Wrapper = styled.div`
  margin-left: 50px;
`;

export class FocusInput extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.inputFocus();
          }}
        >
          点击主动聚焦
        </button>
        <AmountInput
          getFocus={focus => {
            this.inputFocus = focus;
          }}
        />
      </div>
    );
  }
}
const onChange = (cmpName: string) => (value: any) => {};
export function ValidateAmountInputDemo() {
  return (
    <Wrapper>
      <p>校验信息显示类型 top 输入值 是否含有5</p>
      <ValidateInput validateType="top" onChange={onChange('limit')} validateStatus={'error'} />
      <p>校验信息显示类型 bottom 输入值 是否含有5</p>
      <ValidateInput validateType="bottom" onChange={onChange('limit')} validateStatus={'error'} />
      <p>校验信息显示类型 inner 输入值 是否含有5</p>
      <ValidateInput validateType="inner" onChange={onChange('limit')} validateStatus={'error'} />
    </Wrapper>
  );
}

export function DefaultAmountInputDemo() {
  return (
    <div>
      <Wrapper>
        <p>formatter AmountInput</p>
        <AmountInput placeholder={'请填写金额'} />
        <p>default AmountInput</p>
        <AmountInput placeholder={'请填写金额'} />
        <p>禁用状态 </p>
        <AmountInput size={'default'} disabled={true} />
      </Wrapper>
      <Wrapper>
        <p>small size</p>
        <AmountInput size={'small'} placeholder={'请填写金额'} />
        <p>default size</p>
        <AmountInput placeholder={'请填写金额'} />
        <p>large size</p>
        <AmountInput size={'large'} placeholder={'请填写金额'} disabled={true} />
      </Wrapper>
      <Wrapper>
        <p>受限Input</p>
        <LimitAmountInput onChange={onChange('limit')} />
        <p>有默认值的 受限Input</p>
        <DefaultValueAmountInput value={'123456'} onChange={onChange('limit')} />
        <p>主动聚焦的 Input</p>
        {<FocusInput />}
      </Wrapper>
      <Wrapper>
        <p>amountPrefix: '¥' transform: false </p>
        <AmountInput amountPrefix="¥" transform={false} />
        <p>amountPrefix: '$' transform: false </p>
        <AmountInput amountPrefix="$" transform={false} />
      </Wrapper>
    </div>
  );
}
export default () => {
  return [<DefaultAmountInputDemo />, <ValidateAmountInputDemo />];
};
