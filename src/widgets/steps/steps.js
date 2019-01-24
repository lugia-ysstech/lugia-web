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
};
export const children = [
  <Step title="step1" stepStatus="finish" />,
  <Step title="step2" stepStatus="process" />,
  <Step title="step3" stepStatus="next" />,
  <Step title="step4" stepStatus="wait" />,
];

class Steps extends Component<StepsProps, StepsState> {
  static defaultProps = {
    currentStepNumber: 0,
    stepType: 'simple',
    size: 'normal',
    orientation: 'horizontal',
    desAlign: 'left',
    children,
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

  getChildren() {
    const { children, orientation, stepType, size, currentStepNumber, desAlign } = this.props;
    if (Array.isArray(children) && children.length > 0) {
      return React.Children.map(children, (child, i) => {
        return [
          React.cloneElement(child, {
            orientation,
            stepType,
            size,
            stepNumber: i + 1,
            isFirst: i === 0,
            currentStepNumber,
            desAlign,
          }),
        ];
      });
    }
  }
}

const TargetSteps = ThemeProvider(KeyBoardEventAdaptor(Steps), Widget.Steps);
export default TargetSteps;
