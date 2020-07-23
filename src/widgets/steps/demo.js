/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import * as React from 'react';
import Steps from './steps';
import Step from './step';
import Button from '../button/index';
import Widget from '../consts/index';
import Theme from '../theme/';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 50px;
`;
const VWrapper = styled.div`
  margin: 50px;
  display: inline-block;
`;

const steps = [
  {
    title: 'First Step',
    description: 'First Step Content',
  },
  {
    title: 'Second Step',
    description: 'Second  Step Content',
  },
  {
    title: 'Last Step',
    description: 'Third  Step Content',
  },
];
const StepDescription = styled.div`
  width: 400px;
  margin-top: 40px;
  border: 1px solid #ccc;
  height: 100px;
  text-align: center;
  padding-top: 20px;
`;

class StepsDemo extends React.Component<Object, Object> {
  constructor(props) {
    super(props);
    this.state = {
      currentStepNumber: 1,
    };
  }
  next() {
    const currentStepNumber =
      this.state.currentStepNumber > 3 ? 1 : this.state.currentStepNumber + 1;
    this.setState({ currentStepNumber });
  }
  pre() {
    const currentStepNumber =
      this.state.currentStepNumber <= 1 ? 3 : this.state.currentStepNumber - 1;
    this.setState({ currentStepNumber });
  }
  render() {
    const { currentStepNumber } = this.state;
    const matchCurrentNumber = currentStepNumber > 0 && currentStepNumber <= 3;
    const theCurrentStepNumber = matchCurrentNumber ? currentStepNumber : 1;
    const description = matchCurrentNumber ? steps[theCurrentStepNumber - 1].description : '';
    const view = {
      [Widget.Button]: {
        Container: {
          normal: {
            width: 80,
            margin: {
              top: 10,
              left: 10,
            },
          },
        },
      },
    };
    return (
      <Wrapper>
        <Theme config={view}>
          <Steps currentStepNumber={currentStepNumber} stepType={'simple'} size={'default'}>
            {steps.map((item, i) => (
              <Step currentStepNumber={currentStepNumber} title={item.title} />
            ))}
          </Steps>
          <StepDescription>{description}</StepDescription>
          <Button type="primary" onClick={() => this.pre()}>
            pre
          </Button>
          <Button type="primary" onClick={() => this.next()}>
            Next
          </Button>
        </Theme>
      </Wrapper>
    );
  }
}

const data = [
  { title: '步骤1', description: '描述性文本1', stepStatus: 'finish' },
  { title: '步骤2', description: '描述性文本2', stepStatus: 'process' },
  { title: '步骤3', description: '描述性文本3', stepStatus: 'next' },
  { title: '步骤4', description: '描述性文本4', stepStatus: 'wait' },
  { title: '步骤5', description: '描述性文本5', stepStatus: 'error' },
];
export default () => {
  return (
    <div>
      <Wrapper>
        <Wrapper>
          <Steps data={data} />
        </Wrapper>
        <p>带有描述</p>
        <Steps orientation="horizontal" size={'default'}>
          <Step title="步骤1" description={'描述性文本1'} stepStatus="finish" />
          <Step
            title="步骤1"
            description={
              <div>
                <div>很长很长的描述,想要撑开高度</div>
                <div>很长很长的描述,想要撑开高度</div>
                <div>很长很长的描述,想要撑开高度</div>
                <div>很长很长的描述,想要撑开高度</div>
                <div>很长很长的描述,想要撑开高度</div>
                <div>很长很长的描述,想要撑开高度</div>
              </div>
            }
            stepStatus="finish"
          />
          <Step title="步骤2" description={'描述性文本2'} stepStatus="process" />
          <Step title="步骤3" description={'描述性文本3'} stepStatus="next" />
          <Step title="步骤4" description={'描述性文本4'} stepStatus="wait" />
          <Step title="步骤5" description={'描述性文本5'} stepStatus="error" />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>带有描述 居中显示</p>
        <Steps orientation="horizontal" size={'default'} desAlign={'center'}>
          <Step title="步骤1" description={'描述性文本1'} stepStatus="finish" />
          <Step title="步骤2" description={'描述性文本2'} stepStatus="finish" />
          <Step title="步骤3" description={'描述性文本3'} stepStatus="process" />
          <Step title="步骤4" description={'描述性文本4'} stepStatus="next" />
          <Step title="步骤5" description={'描述性文本5'} stepStatus="wait" />
          <Step title="步骤6" description={'描述性文本6'} stepStatus="error" />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>简洁风格 size mini</p>
        <Steps orientation="horizontal" stepType={'simple'} size={'small'}>
          <Step title="步骤1" stepStatus="finish" description={'描述性文本'} />
          <Step title="步骤2" stepStatus="finish" description={'描述性文本'} />
          <Step title="步骤3" stepStatus="process" />
          <Step title="步骤4" stepStatus="next" />
          <Step title="步骤5" stepStatus="wait" />
          <Step title="步骤6" stepStatus="error" />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>半扁平风格</p>
        <Steps orientation="horizontal" stepType={'flat'} size={'small'}>
          <Step title="步骤1" stepStatus="finish" description={'描述性文本'} />
          <Step title="步骤2" stepStatus="finish" description={'描述性文本'} />
          <Step title="步骤3" stepStatus="process" />
          <Step title="步骤4" stepStatus="next" />
          <Step title="步骤5" stepStatus="wait" />
          <Step title="步骤6" stepStatus="error" />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>半扁平风格</p>
        <Steps orientation="horizontal" stepType={'flat'} size={'default'}>
          <Step title="步骤1" stepStatus="finish" />
          <Step title="步骤2" stepStatus="finish" />
          <Step title="步骤3" stepStatus="process" />
          <Step title="步骤4" stepStatus="next" />
          <Step title="步骤5" stepStatus="wait" />
          <Step title="步骤6" stepStatus="error" />
        </Steps>
      </Wrapper>

      <Wrapper>
        <p>icon 描述文本居中展示</p>
        <Steps orientation="horizontal" stepType={'icon'} size={'small'} desAlign={'center'}>
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="finish"
            title="步骤1"
            description={'描述性文本'}
          />
          <Step
            icon={'lugia-icon-financial_upload_cloud'}
            stepStatus="finish"
            title="步骤2"
            description={'描述性文本'}
          />
          <Step
            icon={'lugia-icon-financial_download_cloud'}
            stepStatus="process"
            title="步骤3"
            description={'描述性文本3'}
          />
          <Step
            icon={'lugia-icon-financial_download_cloud'}
            stepStatus="next"
            title="步骤4"
            description={'描述性文本4'}
          />
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="wait"
            title="步骤5"
            description={'描述性文本5'}
          />
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="error"
            title="步骤5"
            description={'描述性文本5'}
          />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>点状 虚线 描述文本居中展示</p>
        <Steps orientation="horizontal" stepType={'dot'} desAlign={'center'}>
          <Step description={'描述性文本1'} title="步骤1" stepStatus="finish" />
          <Step description={'描述性文本1'} title="步骤1" stepStatus="finish" />
          <Step description={'描述性文本'} title="步骤2" stepStatus="process" isDashed={true} />
          <Step description={'描述性文本3'} title="步骤3" stepStatus="next" isDashed={true} />
          <Step description={'描述性文本4'} title="步骤4" stepStatus="wait" isDashed={true} />
          <Step description={'描述性文本5'} title="步骤5" stepStatus="error" isDashed={true} />
        </Steps>
      </Wrapper>
      <Wrapper>
        <p>点状 实线</p>
        <Steps orientation="horizontal" stepType={'dot'}>
          <Step title="步骤1" stepStatus="finish" />
          <Step description={'描述性文本1'} title="步骤1" stepStatus="finish" />
          <Step description={'描述性文本1'} title="步骤2" stepStatus="process" />
          <Step description={'描述性文本'} title="步骤3" stepStatus="next" />
          <Step description={'描述性文本4'} title="步骤4" stepStatus="wait" />
          <Step description={'描述性文本5'} title="步骤5" stepStatus="error" />
        </Steps>
      </Wrapper>
      <VWrapper>
        <p>简洁风格 size mini</p>
        <Steps orientation="vertical" stepType="simple" size="mini">
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤2" stepStatus="process" description="描述性文本" />
          <Step title="步骤3" stepStatus="next" description="描述性文本3" />
          <Step title="步骤4" stepStatus="wait" description="描述性文本4" />
          <Step title="步骤5" stepStatus="error" description="描述性文本5" />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>简洁风格 size normal</p>

        <Steps orientation="vertical" stepType="simple" size="normal">
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤2" stepStatus="process" description="描述性文本" />
          <Step title="步骤3" stepStatus="next" description="描述性文本3" />
          <Step title="步骤4" stepStatus="wait" description="描述性文本4" />
          <Step title="步骤5" stepStatus="error" description="描述性文本5" />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>带有描述</p>
        <Steps orientation="vertical" stepType="simple" size={'default'}>
          <Step title="步骤1" description={'描述性文本'} stepStatus="finish" />
          <Step title="步骤1" description={'描述性文本'} stepStatus="finish" />
          <Step
            title="步骤2"
            description={
              <div>
                很长很长的描述想要撑开宽度很长很长的描述想要撑开宽度很长很长的描述想要撑开宽度很长很长的描述想要撑开宽度
              </div>
            }
            stepStatus="process"
          />
          <Step title="步骤3" description={'描述性文本'} stepStatus="next" />
          <Step title="步骤4" description={'描述性文本'} stepStatus="wait" />
          <Step title="步骤5" description={'描述性文本'} stepStatus="error" />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>半扁平风格 size normal</p>
        <Steps orientation="vertical" stepType="flat" size="normal">
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤1" stepStatus="finish" description="描述性文本1" />
          <Step title="步骤2" stepStatus="process" description="描述性文本2" />
          <Step title="步骤3" stepStatus="next" description="描述性文本3" />
          <Step title="步骤4" stepStatus="wait" description="描述性文本4" />
          <Step title="步骤5" stepStatus="error" description="描述性文本5" />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>icon</p>
        <Steps orientation="vertical" stepType={'icon'} size={'small'}>
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="finish"
            title="步骤1"
            description={'描述性文本1'}
          />
          <Step
            icon={'lugia-icon-financial_upload_cloud'}
            stepStatus="finish"
            title="步骤2"
            description={'描述性文本2'}
          />
          <Step
            icon={'lugia-icon-financial_download_cloud'}
            stepStatus="process"
            title="步骤3"
            description={'描述性文本3'}
          />
          <Step
            icon={'lugia-icon-financial_download_cloud'}
            stepStatus="next"
            title="步骤4"
            description={'描述性文本4'}
          />
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="wait"
            title="步骤5"
            description={'描述性文本5'}
          />
          <Step
            icon={'lugia-icon-financial_cloud'}
            stepStatus="error"
            title="步骤5"
            description={'描述性文本5'}
          />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>点状 虚线 size normal</p>
        <Steps orientation="vertical" stepType={'dot'}>
          <Step title="步骤1" stepStatus="finish" />
          <Step title="步骤1" stepStatus="finish" isDashed={true} />
          <Step title="步骤2" stepStatus="process" isDashed={true} />
          <Step title="步骤3" stepStatus="next" isDashed={true} />
          <Step title="步骤4" stepStatus="wait" isDashed={true} />
          <Step title="步骤5" stepStatus="error" isDashed={true} />
        </Steps>
      </VWrapper>
      <VWrapper>
        <p>点状风格 size normal</p>
        <Steps orientation="vertical" stepType="dot" size="normal">
          <Step title="步骤1" stepStatus="finish" description="描述性文本" />
          <Step title="步骤1" stepStatus="finish" description="描述性文本" />
          <Step title="步骤2" stepStatus="process" description="描述性文本2" />
          <Step title="步骤3" stepStatus="next" description="描述性文本3" />
          <Step title="步骤4" stepStatus="wait" description="描述性文本4" />
          <Step title="步骤5" stepStatus="error" description="描述性文本5" />
        </Steps>
      </VWrapper>
      <StepsDemo />
    </div>
  );
};
