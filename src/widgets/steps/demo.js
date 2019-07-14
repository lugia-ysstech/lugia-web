/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import * as React from 'react';
import Steps from './steps';
import Step from './step';
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
const hThemeConfig = {
  [Widget.Steps]: {
    StepsOutContainer: {
      normal: {},
    },
  },
  [Widget.Step]: {
    StepOutContainer: {
      normal: {
        width: 100,
      },
    },
    StepLine: {
      normal: {
        background: {
          color: 'red',
        },
      },
    },

    StepInnerContainer: {
      normal: {
        width: 40,
        height: 40,
      },
    },
    StepNumber: {
      normal: {
        color: 'red',
        fontSize: 30,
      },
    },
    StepDescription: {
      normal: {
        color: 'blue',
        fontSize: 16,
      },
    },
  },
};
const vThemeConfig = {
  [Widget.Steps]: {
    StepsOutContainer: {
      normal: {
        padding: 30,
        margin: 30,
      },
    },
  },
  [Widget.Step]: {
    StepOutContainer: {
      normal: {
        height: 100,
      },
    },
    StepLine: {
      normal: {
        background: {
          color: 'red',
        },
      },
    },
    StepInnerContainer: {
      normal: {
        width: 40,
        height: 40,
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
    StepInnerContainer: {
      normal: {
        width: 60,
        height: 60,
      },
    },
  },
};
const data = [
  { title: 'this is title1111', description: 'this is step description111', stepStatus: 'finish' },
  { title: 'this is title222', description: 'this is step description2', stepStatus: 'process' },
  { title: 'this is title33', description: 'this is step description33', stepStatus: 'next' },
  { title: 'this is title444', description: 'this is step description444', stepStatus: 'wait' },
  { title: 'this is title555', description: 'this is step description5555', stepStatus: 'error' },
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
            <Step
              title="this is title1"
              description={'this is step description111'}
              stepStatus="finish"
            />
            <Step
              title="this is title2"
              description={'this is step description2'}
              stepStatus="process"
            />
            <Step
              title="this is title3"
              description={'this is step description33'}
              stepStatus="next"
            />
            <Step
              title="this is title4"
              description={'this is step description444'}
              stepStatus="wait"
            />
            <Step
              title="this is title5"
              description={'this is step description5555'}
              stepStatus="error"
            />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>带有描述 居中显示</p>
          <Steps orientation="horizontal" size={'normal'} desAlign={'center'}>
            <Step
              title="this is title1"
              description={'this is step description111'}
              stepStatus="finish"
            />
            <Step
              title="this is title2"
              description={'this is step description2'}
              stepStatus="process"
            />
            <Step
              title="this is title3"
              description={'this is step description33'}
              stepStatus="next"
            />
            <Step
              title="this is title4"
              description={'this is step description444'}
              stepStatus="wait"
            />
            <Step
              title="this is title5"
              description={'this is step description5555'}
              stepStatus="error"
            />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>简洁风格 size mini</p>
          <Steps orientation="horizontal" stepType={'simple'} size={'mini'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" />
            <Step title="this is title3" stepStatus="next" />
            <Step title="this is title4" stepStatus="wait" />
            <Step title="this is title5" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'mini'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" />
            <Step title="this is title3" stepStatus="next" />
            <Step title="this is title4" stepStatus="wait" />
            <Step title="this is title5" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'normal'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" />
            <Step title="this is title3" stepStatus="next" />
            <Step title="this is title4" stepStatus="wait" />
            <Step title="this is title5" stepStatus="error" />
          </Steps>
        </Wrapper>

        <Wrapper>
          <p>icon</p>
          <Steps orientation="horizontal" stepType={'icon'} size={'mini'}>
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="finish" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="process" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="next" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="wait" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 虚线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" isDashed={true} />
            <Step title="this is title3" stepStatus="next" isDashed={true} />
            <Step title="this is title4" stepStatus="wait" isDashed={true} />
            <Step title="this is title5" stepStatus="error" isDashed={true} />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 实线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" />
            <Step title="this is title3" stepStatus="next" />
            <Step title="this is title4" stepStatus="wait" />
            <Step title="this is title5" stepStatus="error" />
          </Steps>
        </Wrapper>
      </Theme>
      <Theme config={vThemeConfig}>
        <VWrapper>
          <p>简洁风格 size mini</p>

          <Steps orientation="vertical" stepType="simple" size="mini">
            <Step
              title="this is title1"
              stepStatus="finish"
              description="this is step description1"
            />
            <Step
              title="this is title2"
              stepStatus="process"
              description="this is step description2"
              theme={singleThemeConfig}
            />
            <Step
              title="this is title3"
              stepStatus="next"
              description="this is step description3"
            />
            <Step
              title="this is title4"
              stepStatus="wait"
              description="this is step description4"
            />
            <Step
              title="this is title5"
              stepStatus="error"
              description="this is step description5"
            />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>简洁风格 size normal</p>

          <Steps orientation="vertical" stepType="simple" size="normal">
            <Step
              title="this is title1"
              stepStatus="finish"
              description="this is step description1"
            />
            <Step
              title="this is title2"
              stepStatus="process"
              description="this is step description2"
            />
            <Step
              title="this is title3"
              stepStatus="next"
              description="this is step description3"
            />
            <Step
              title="this is title4"
              stepStatus="wait"
              description="this is step description4"
            />
            <Step
              title="this is title5"
              stepStatus="error"
              description="this is step description5"
            />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>带有描述</p>
          <Steps orientation="vertical" stepType="simple" size={'normal'}>
            <Step
              title="this is title1"
              description={'this is step description111'}
              stepStatus="finish"
            />
            <Step
              title="this is title2"
              description={'this is step description2'}
              stepStatus="process"
            />
            <Step
              title="this is title3"
              description={'this is step description33'}
              stepStatus="next"
            />
            <Step
              title="this is title4"
              description={'this is step description444'}
              stepStatus="wait"
            />
            <Step
              title="this is title5"
              description={'this is step description5555'}
              stepStatus="error"
            />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>半扁平风格 size normal</p>

          <Steps orientation="vertical" stepType="flat" size="normal">
            <Step
              title="this is title1"
              stepStatus="finish"
              description="this is step description1"
            />
            <Step
              title="this is title2"
              stepStatus="process"
              description="this is step description2"
            />
            <Step
              title="this is title3"
              stepStatus="next"
              description="this is step description3"
            />
            <Step
              title="this is title4"
              stepStatus="wait"
              description="this is step description4"
            />
            <Step
              title="this is title5"
              stepStatus="error"
              description="this is step description5"
            />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>icon</p>
          <Steps orientation="vertical" stepType={'icon'} size={'mini'}>
            <Step icon={'lugia-icon-financial_cloud'} title="this is title1" stepStatus="finish" />
            <Step icon={'lugia-icon-financial_cloud'} title="this is title2" stepStatus="process" />
            <Step icon={'lugia-icon-financial_cloud'} title="333" stepStatus="next" />
            <Step icon={'lugia-icon-financial_cloud'} title="this is title4" stepStatus="wait" />
            <Step icon={'lugia-icon-financial_cloud'} title="this is title5" stepStatus="error" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状 虚线 size normal</p>
          <Steps orientation="vertical" stepType={'dot'}>
            <Step title="this is title1" stepStatus="finish" />
            <Step title="this is title2" stepStatus="process" isDashed={true} />
            <Step title="this is title3" stepStatus="next" isDashed={true} />
            <Step title="this is title4" stepStatus="wait" isDashed={true} />
            <Step title="this is title5" stepStatus="error" isDashed={true} />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状风格 size normal</p>
          <Steps orientation="vertical" stepType="dot" size="normal">
            <Step
              title="this is title1"
              stepStatus="finish"
              description="this is step description1"
            />
            <Step
              title="this is title2"
              stepStatus="process"
              description="this is step description2"
            />
            <Step
              title="this is title3"
              stepStatus="next"
              description="this is step description3"
            />
            <Step
              title="this is title4"
              stepStatus="wait"
              description="this is step description4"
            />
            <Step
              title="this is title5"
              stepStatus="error"
              description="this is step description5"
            />
          </Steps>
        </VWrapper>
      </Theme>
    </div>
  );
};
