/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
import AmountInput from './index';
import Widget from '../consts/index';
import styled from 'styled-components';

class LimitAmountInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

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
const Wrapper = styled.div`
  float: left;
  margin-left: 50px;
`;
export default () => {
  const view = {
    [Widget.AmountInput]: {
      [Widget.Input]: {
        Input: {
          normal: {
            width: 400,
            height: 50,
            opacity: 0.8,
          },
        },
      },
      AmountInputPrefix: { normal: { fontSize: 14, color: 'blue' } },
    },
    [Widget.Tooltip]: {
      TooltipContent: {
        normal: {
          background: {
            color: '#eee',
          },
        },
      },
      TooltipTitle: {
        normal: {
          color: '#4d63ff',
          fontSize: 16,
        },
      },
    },
  };
  const onChange = (cmpName: string) => (value: any) => {};
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
        <Theme config={view}>
          <p>small size</p>
          <AmountInput size={'small'} placeholder={'请填写金额'} />
          <p>default size</p>
          <AmountInput placeholder={'请填写金额'} />
          <p>large size</p>
          <AmountInput size={'large'} placeholder={'请填写金额'} disabled={true} />
        </Theme>
      </Wrapper>
      <Wrapper>
        <p>受限Input</p>
        <LimitAmountInput onChange={onChange('limit')} />
        <p>有默认值的 受限Input</p>
        <DefaultValueAmountInput value={'123456'} onChange={onChange('limit')} />
      </Wrapper>
      <Wrapper>
        <p>amountPrefix: '¥' transform: false </p>
        <AmountInput amountPrefix="¥" transform={false} />
        <p>amountPrefix: '$' transform: false </p>
        <AmountInput amountPrefix="$" transform={false} />
      </Wrapper>
    </div>
  );
};
