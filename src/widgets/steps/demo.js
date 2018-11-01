/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import * as React from 'react';
import Steps from './index';
import Button from '../button/index';
import Step from './step';
import Widget from '../consts/index';
import Theme from '../theme/';
import styled from 'styled-components';

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Third-content',
  },
];
const status = ['process', 'next', 'wait'];
const StepContent = styled.div`
  margin-top: 30px;
  margin-left: 45px;
`;

class StepsDemo extends React.Component<Object, Object> {
  constructor(props) {
    super(props);
    this.state = {
      currentStepNumber: 0,
    };
  }
  next() {
    const currentStepNumber = this.state.currentStepNumber + 1;
    status.splice(0, 0, 'finish');
    this.setState({ currentStepNumber });
  }
  render() {
    const { currentStepNumber } = this.state;
    const content =
      this.state.currentStepNumber < steps.length
        ? steps[this.state.currentStepNumber].content
        : '';
    return (
      <div>
        <Button type="primary" onClick={() => this.next()}>
          Next
        </Button>
        <Steps currentStepNumber={currentStepNumber} stepType={'simple'} size={'normal'}>
          {steps.map((item, i) => <Step stepStatus={status[i]} title={item.title} />)}
        </Steps>
        <StepContent>{content}</StepContent>
      </div>
    );
  }
}

const Wrapper = styled.div`
  text-align: left;
  margin: 50px;
`;

export default () => {
  const view = {
    [Widget.Steps]: {
      width: 1000,
    },
    [Widget.Step]: {
      width: 350,
    },
  };

  return (
    <Theme config={view}>
      <div>
        <Wrapper>
          <p>简洁风格 size normal</p>

          <Steps orientation={'h'} stepType={'simple'} size={'normal'}>
            <Step title="1111" stepStatus="finish" content="content1" />
            <Step title="222" stepStatus="process" content="content2" />
            <Step title="33" stepStatus="next" content="content3" />
            <Step title="444" stepStatus="wait" content="content4" />
            <Step title="555" stepStatus="error" content="content5" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>简洁风格 size mini</p>
          <Steps orientation={'h'} stepType={'simple'} size={'mini'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation={'h'} stepType={'flat'} size={'mini'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation={'h'} stepType={'flat'} size={'normal'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>带有描述</p>
          <Steps orientation={'h'} stepType={'description'} size={'mini'}>
            <Step title="1111" description={'description111'} stepStatus="finish" />
            <Step title="222" description={'description2'} stepStatus="process" />
            <Step title="33" description={'description33'} stepStatus="next" />
            <Step title="444" description={'description444'} stepStatus="wait" />
            <Step title="555" description={'description5555'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>icon</p>
          <Steps orientation={'h'} stepType={'icon'} size={'mini'}>
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="finish" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="process" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="next" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="wait" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 虚线</p>
          <Steps orientation={'h'} stepType={'dot'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" isDashed={true} />
            <Step title="33" stepStatus="next" isDashed={true} />
            <Step title="444" stepStatus="wait" isDashed={true} />
            <Step title="555" stepStatus="error" isDashed={true} />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 实线</p>
          <Steps orientation={'h'} stepType={'dot'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <StepsDemo />
      </div>
    </Theme>
  );
};
