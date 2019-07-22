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
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" />
            <Step title="title2" stepStatus="process" isDashed={true} />
            <Step title="title3" stepStatus="next" isDashed={true} />
            <Step title="title4" stepStatus="wait" isDashed={true} />
            <Step title="title5" stepStatus="error" isDashed={true} />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 实线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="title1" stepStatus="finish" />
            <Step title="title1" stepStatus="finish" />
            <Step title="title2" stepStatus="process" />
            <Step title="title3" stepStatus="next" />
            <Step title="title4" stepStatus="wait" />
            <Step title="title5" stepStatus="error" />
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
    </div>
  );
};
