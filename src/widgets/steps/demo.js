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
      <Wrapper>
        <Steps data={data} />
      </Wrapper>
    </div>
  );
};
