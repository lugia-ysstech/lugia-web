/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { getFlexDirection, getWidth } from '../css/steps';
import type { AlignType, StepType, OrientationType, SizeType } from '../css/steps';
import Step from './step';
import { getAttributeFromObject } from '../common/ObjectUtils';

const OutContainer = styled.div`
  display: inline-block;
  position: relative;
  ${getWidth}
`;
OutContainer.displayName = Widget.TabsContainer;

const HStepsOutContainer = styled.div`
  font-variant: tabular-nums;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  list-style: none;
  display: flex;
  ${getFlexDirection};
`;

type StepsState = {};

type StepsProps = {
  stepType: StepType,
  currentStepNumber: number,
  orientation: OrientationType,
  size: SizeType,
  getTheme: Function,
  children: React$Element<any>,
  desAlign: AlignType,
  data: Array<Object>,
  defaultData: Array<Object>,
};
export const defaultData = [
  { title: 'step1', stepStatus: 'finish' },
  {
    title: 'step2',
    stepStatus: 'process',
  },
  {
    title: 'step3',
    stepStatus: 'next',
  },
  { title: 'step4', stepStatus: 'wait' },
];

class Steps extends Component<StepsProps, StepsState> {
  static defaultProps = {
    currentStepNumber: 0,
    stepType: 'simple',
    size: 'normal',
    orientation: 'horizontal',
    desAlign: 'left',
    defaultData,
  };
  static displayName = Widget.Steps;

  constructor(props: StepsProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: StepsProps, state: StepsState) {}

  render() {
    const { getTheme, orientation } = this.props;

    return (
      <OutContainer theme={getTheme()} orientation={orientation}>
        {this.getHSteps()}
      </OutContainer>
    );
  }

  getHSteps() {
    const { orientation, stepType } = this.props;
    return (
      <HStepsOutContainer orientation={orientation} stepType={stepType}>
        {this.getChildren()}
      </HStepsOutContainer>
    );
  }
  getStepsConfig(child: React$Element<any>, i: number) {
    const { orientation, stepType, size, currentStepNumber, desAlign } = this.props;
    return {
      orientation,
      stepType,
      size,
      stepNumber: i + 1,
      isFirst: i === 0,
      currentStepNumber,
      desAlign,
      title: getAttributeFromObject(
        child,
        'title',
        getAttributeFromObject(child.props, 'title', '')
      ),
      stepStatus: getAttributeFromObject(
        child,
        'stepStatus',
        getAttributeFromObject(child.props, 'stepStatus', 'wait')
      ),
      description: getAttributeFromObject(
        child,
        'description',
        getAttributeFromObject(child.props, 'description', '')
      ),
      icon: getAttributeFromObject(child, 'icon', getAttributeFromObject(child.props, 'icon', '')),
      isDashed: getAttributeFromObject(
        child,
        'isDashed',
        getAttributeFromObject(child.props, 'isDashed', false)
      ),
    };
  }

  getChildren() {
    const { children, data, defaultData } = this.props;
    return data
      ? this.data2Step(data)
      : Array.isArray(children) && children.length > 0
      ? React.Children.map(children, (child, i) => {
          return React.cloneElement(child, this.getStepsConfig(child, i));
        })
      : this.data2Step(defaultData);
  }

  data2Step(data) {
    return data.map((child, i) => {
      return this.getStep(child, i);
    });
  }

  getStep(child, i) {
    return <Step {...this.getStepsConfig(child, i)} />;
  }
}

const TargetSteps = ThemeProvider(KeyBoardEventAdaptor(Steps), Widget.Steps);
export default TargetSteps;
