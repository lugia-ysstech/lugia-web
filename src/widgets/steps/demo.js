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
  text-align: left;
  margin: 50px;
`;
const VWrapper = styled.div`
  text-align: left;
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
      [Widget.Steps]: {
        StepsOutContainer: {
          normal: {
            width: 400,
          },
        },
      },
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
          <Steps currentStepNumber={currentStepNumber} stepType={'simple'} size={'normal'}>
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

const hThemeConfig = {
  [Widget.Steps]: {
    StepsOutContainer: {
      normal: {
        width: 800,
      },
    },
  },
};
const vThemeConfig = {
  [Widget.Steps]: {
    StepsOutContainer: {
      normal: {
        margin: 10,
      },
    },
  },
};
const singleThemeConfig = {
  [Widget.Step]: {
    StepLine: {
      normal: {
        background: {
          color: 'purple',
        },
      },
    },
  },
};
const data = [
  { title: 'title1111', description: 'description111', stepStatus: 'finish' },
  { title: 'title222', description: 'description2', stepStatus: 'process' },
  { title: 'title33', description: 'description33', stepStatus: 'next' },
  { title: 'title444', description: 'description444', stepStatus: 'wait' },
  { title: 'title555', description: 'description5555', stepStatus: 'error' },
];
export default () => {
  return (
    <div>
      <Theme config={hThemeConfig}>
        <Wrapper>
          <Wrapper>
            <Steps data={data} />
          </Wrapper>
          <p>带有描述</p>
          <Steps orientation="horizontal" size={'normal'}>
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title2" description={'description2'} stepStatus="process" />
            <Step title="title3" description={'description33'} stepStatus="next" />
            <Step title="title4" description={'description444'} stepStatus="wait" />
            <Step title="title5" description={'description5555'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>带有描述 居中显示</p>
          <Steps orientation="horizontal" size={'normal'} desAlign={'center'}>
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title2" description={'description2'} stepStatus="process" />
            <Step title="title3" description={'description33'} stepStatus="next" />
            <Step title="title4" description={'description444'} stepStatus="wait" />
            <Step title="title5" description={'description5555'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>简洁风格 size mini</p>
          <Steps orientation="horizontal" stepType={'simple'} size={'mini'}>
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" />
            <Step title="title2" stepStatus="process" />
            <Step title="title3" stepStatus="next" />
            <Step title="title4" stepStatus="wait" />
            <Step title="title5" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'mini'}>
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" />
            <Step title="title2" stepStatus="process" />
            <Step title="title3" stepStatus="next" />
            <Step title="title4" stepStatus="wait" />
            <Step title="title5" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'normal'}>
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" />
            <Step title="title2" stepStatus="process" />
            <Step title="title3" stepStatus="next" />
            <Step title="title4" stepStatus="wait" />
            <Step title="title5" stepStatus="error" />
          </Steps>
        </Wrapper>

        <Wrapper>
          <p>icon</p>
          <Steps orientation="horizontal" stepType={'icon'} size={'mini'}>
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="finish"
              title="title1"
              description={'description111'}
            />
            <Step
              icon={'lugia-icon-financial_upload_cloud'}
              stepStatus="finish"
              title="title2"
              description={'description2'}
            />
            <Step
              icon={'lugia-icon-financial_download_cloud'}
              stepStatus="process"
              title="title3"
              description={'description3'}
            />
            <Step
              icon={'lugia-icon-financial_download_cloud'}
              stepStatus="next"
              title="title4"
              description={'description4'}
            />
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="wait"
              title="title5"
              description={'description5'}
            />
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="error"
              title="title5"
              description={'description5'}
            />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 虚线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step description={'description1'} title="title1" stepStatus="finish" />
            <Step description={'description1'} title="title1" stepStatus="finish" />
            <Step
              description={'description2'}
              title="title2"
              stepStatus="process"
              isDashed={true}
            />
            <Step description={'description3'} title="title3" stepStatus="next" isDashed={true} />
            <Step description={'description4'} title="title4" stepStatus="wait" isDashed={true} />
            <Step description={'description5'} title="title5" stepStatus="error" isDashed={true} />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 实线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="title1" stepStatus="finish" />
            <Step description={'description1'} title="title1" stepStatus="finish" />
            <Step description={'description1'} title="title2" stepStatus="process" />
            <Step description={'description2'} title="title3" stepStatus="next" />
            <Step description={'description4'} title="title4" stepStatus="wait" />
            <Step description={'description5'} title="title5" stepStatus="error" />
          </Steps>
        </Wrapper>
      </Theme>
      <Theme config={vThemeConfig}>
        <VWrapper>
          <p>简洁风格 size mini</p>

          <Steps orientation="vertical" stepType="simple" size="mini">
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step
              title="title2"
              stepStatus="process"
              description="description2"
              theme={singleThemeConfig}
            />
            <Step title="title3" stepStatus="next" description="description3" />
            <Step title="title4" stepStatus="wait" description="description4" />
            <Step title="title5" stepStatus="error" description="description5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>简洁风格 size normal</p>

          <Steps orientation="vertical" stepType="simple" size="normal">
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title2" stepStatus="process" description="description2" />
            <Step title="title3" stepStatus="next" description="description3" />
            <Step title="title4" stepStatus="wait" description="description4" />
            <Step title="title5" stepStatus="error" description="description5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>带有描述</p>
          <Steps orientation="vertical" stepType="simple" size={'normal'}>
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title1" description={'description111'} stepStatus="finish" />
            <Step title="title2" description={'description2'} stepStatus="process" />
            <Step title="title3" description={'description33'} stepStatus="next" />
            <Step title="title4" description={'description444'} stepStatus="wait" />
            <Step title="title5" description={'description5555'} stepStatus="error" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>半扁平风格 size normal</p>

          <Steps orientation="vertical" stepType="flat" size="normal">
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title2" stepStatus="process" description="description2" />
            <Step title="title3" stepStatus="next" description="description3" />
            <Step title="title4" stepStatus="wait" description="description4" />
            <Step title="title5" stepStatus="error" description="description5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>icon</p>
          <Steps orientation="vertical" stepType={'icon'} size={'mini'}>
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="finish"
              title="title1"
              description={'description111'}
            />
            <Step
              icon={'lugia-icon-financial_upload_cloud'}
              stepStatus="finish"
              title="title2"
              description={'description2'}
            />
            <Step
              icon={'lugia-icon-financial_download_cloud'}
              stepStatus="process"
              title="title3"
              description={'description3'}
            />
            <Step
              icon={'lugia-icon-financial_download_cloud'}
              stepStatus="next"
              title="title4"
              description={'description4'}
            />
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="wait"
              title="title5"
              description={'description5'}
            />
            <Step
              icon={'lugia-icon-financial_cloud'}
              stepStatus="error"
              title="title5"
              description={'description5'}
            />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状 虚线 size normal</p>
          <Steps orientation="vertical" stepType={'dot'}>
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" isDashed={true} />
            <Step title="title2" stepStatus="process" isDashed={true} />
            <Step title="title3" stepStatus="next" isDashed={true} />
            <Step title="title4" stepStatus="wait" isDashed={true} />
            <Step title="title5" stepStatus="error" isDashed={true} />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状风格 size normal</p>
          <Steps orientation="vertical" stepType="dot" size="normal">
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title1" stepStatus="finish" description="description1" />
            <Step title="title2" stepStatus="process" description="description2" />
            <Step title="title3" stepStatus="next" description="description3" />
            <Step title="title4" stepStatus="wait" description="description4" />
            <Step title="title5" stepStatus="error" description="description5" />
          </Steps>
        </VWrapper>
      </Theme>
      <StepsDemo />
    </div>
  );
};
