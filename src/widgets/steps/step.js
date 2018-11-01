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
import type { StepType, StepStatus, SizeType } from '../css/steps';
import {
  getStepColor,
  getFinishDisplay,
  getStepBackgroundColor,
  getLineHeight,
  getStepWidth,
  getStepContainerWidth,
  getFinishIconColor,
  getStepNumberSize,
  getStepSize,
  getStepFontColor,
  getStepContainerSize,
  getDashed,
  getLineMargin,
  getShow,
  getContentTop,
  getLineBorder,
} from '../css/steps';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';

const em = px2emcss(1.2);

const BaseStep = styled.div`
  position: relative;
  cursor: pointer;
  ${getStepWidth};
  flex: 1;
`;
const HStep = BaseStep.extend`
  display: inline-flex;
  color: ${getStepColor};
`;
const Title = styled.div`
  font-size: 1.4rem;
  color: ${getStepFontColor};
  margin-top: ${em(10)};
  text-align: left;
`;
const Description = styled.div`
  line-height: ${em(20)};
  font-weight: 400;
  color: ${getStepFontColor};
  margin-top: ${em(6)};
`;
const Content = styled.div`
  position: absolute;
  white-space: normal;
  text-align: right;
  display: block;
  color: ${getStepColor};
  ${getContentTop};
`;
const BaseLine = styled.div`
  position: relative;
  height: ${getLineHeight};
  ${getLineBorder};
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LineContainer = styled.div`
  display: inline-block;
  position: relative;
  ${getShow};
  ${getLineMargin};
`;
const Line = BaseLine.extend`
  background-color: ${getStepColor};
`;

const DotLine = BaseLine.extend`
  border-bottom: ${em(1)} ${getDashed} ${getStepColor};
`;
const StepHeadContainer = styled.div`
  position: relative;
  ${getStepContainerWidth};
`;

const Dot = styled.div`
  position: relative;
  background-color: ${getStepColor};
  display: inLine-block;
  border-radius: 50%;
  width: ${em(12)};
  height: ${em(12)};
`;
const IconContainer = styled.div`
  position: relative;
  display: inLine-block;
  width: ${getStepSize};
  height: ${getStepSize};
`;
const StepNumber = styled.div`
  display: inLine-block;
  user-select: none;
  text-align: center;
  font-weight: 700;
  line-height: 1;
  font-size: ${getStepNumberSize};
  z-index: 9;
  color: ${getStepColor};
`;
const StepInner = styled.div`
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${getStepSize};
  height: ${getStepSize};
  box-sizing: border-box;
  background-color: ${getStepBackgroundColor};
  border-radius: 50%;
  border: ${em(1)} solid;
  border-color: ${getStepColor};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
const StepContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${getStepContainerSize};
  display: flex;
`;
const DotContainer = styled.div`
  position: relative;
  display: flex;
`;

const BaseInnerContainer = styled.div`
  z-index: 99;
  text-align: center;
  position: relative;
`;
const StepInnerContainer = BaseInnerContainer.extend`
  width: ${getStepSize};
`;
const DotInnerContainer = BaseInnerContainer.extend`
  width: ${12};
  height: ${12};
`;

const IconFinish: Object = styled(Icon)`
  ${getFinishDisplay};
  user-select: none;
  text-align: center;
  font-weight: 700;
  line-height: 1;
  color: ${getFinishIconColor};
  z-index: 5;
`;
const IconStep: Object = styled(Icon)`
  position: absolute;
  user-select: none;
  text-align: center;
  font-weight: 700;
  line-height: 1;
  font-size: ${getStepContainerSize};
  border-color: ${getStepColor};
  color: ${getStepColor};
  top: 50%;
  transform: translateY(-50%);
`;

type StepState = { stepStatus: StepStatus };

type StepProps = {
  title: string,
  icon: string,
  description: string,
  stepType: StepType,
  stepNumber: number,
  currentNumber: number,
  stepStatus: StepStatus,
  descDirection: string,
  orientation: string,
  size: SizeType,
  getTheme: Function,
  isFirst: boolean,
  isDashed: boolean,
};

class Step extends Component<StepProps, StepState> {
  static defaultProps = {};
  static displayName = Widget.Step;

  constructor(props: StepProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: StepProps, state: StepState) {
    const { currentNumber, stepNumber, stepStatus } = props;
    const hasStatusInprops = 'stepStatus' in props;
    if (!state) {
      const theStepStatus = hasStatusInprops
        ? stepStatus
        : currentNumber > stepNumber
          ? 'finish'
          : 'wait';
      return { stepStatus: theStepStatus };
    }
    if (hasStatusInprops) {
      return { stepStatus };
    }
  }

  render() {
    const { getTheme, size, isFirst } = this.props;
    if (isFirst) {
      return this.getStepContainer();
    }
    return (
      <HStep {...this.getConfigs()} theme={getTheme()} size={size}>
        {this.getStepContainer()}
      </HStep>
    );
  }

  getStepContainer() {
    const { stepType, isFirst, size } = this.props;
    return (
      <StepHeadContainer isFirst={isFirst} size={size} stepType={stepType}>
        {this.getStepHead()}
      </StepHeadContainer>
    );
  }

  getDesc(description, stepStatus) {
    if (description) {
      return <Description stepStatus={stepStatus}>{description}</Description>;
    }
    return null;
  }
  getContent() {
    const { title, description, stepType } = this.props;
    const { stepStatus } = this.state;
    return (
      <Content stepStatus={stepStatus}>
        <Title stepType={stepType} stepStatus={stepStatus}>
          {title}
        </Title>
        {this.getDesc(description, stepStatus)}
      </Content>
    );
  }

  getStepHead() {
    const { isFirst, stepType, size } = this.props;
    if (stepType === 'dot') {
      return (
        <DotContainer isFirst={isFirst}>
          {this.matchLine()}
          <DotInnerContainer size={size} {...this.getConfigs()}>
            <Dot {...this.getConfigs()} />
          </DotInnerContainer>
        </DotContainer>
      );
    }
    return (
      <StepContainer size={size} isFirst={isFirst}>
        {this.matchLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matchLine() {
    const { stepType, isFirst } = this.props;
    if (!isFirst) return <LineContainer stepType={stepType}>{this.getLine()}</LineContainer>;
    return null;
  }

  getLine() {
    const { isDashed, stepType, isFirst } = this.props;
    if (stepType === 'dot') {
      return <DotLine {...this.getConfigs()} isDashed={isDashed} isFirst={isFirst} />;
    }
    return <Line {...this.getConfigs()} isFirst={isFirst} />;
  }

  getStep() {
    const { icon, stepType, size } = this.props;
    const { stepStatus } = this.state;
    const theIcon =
      stepStatus === 'finish'
        ? 'lugia-icon-reminder_check'
        : stepStatus === 'error'
          ? 'lugia-icon-reminder_close'
          : '';
    if (stepType === 'flat' || stepType === 'description' || stepType === 'simple') {
      return (
        <StepInnerContainer size={size} stepStatus={stepStatus}>
          <StepInner {...this.getConfigs()} size={size}>
            <IconFinish {...this.getConfigs()} iconClass={theIcon} />
            {this.getStepNumber()}
          </StepInner>
          {this.getContent()}
        </StepInnerContainer>
      );
    }
    if (stepType === 'icon') {
      return (
        <IconContainer size={size}>
          <IconStep iconClass={icon} {...this.getConfigs()} />
          {this.getContent()}
        </IconContainer>
      );
    }
  }

  getStepNumber() {
    const { size, stepNumber } = this.props;
    const { stepStatus } = this.state;
    const theStepNumber =
      (stepStatus === 'finish' || stepStatus === 'process') && stepNumber > 0 ? stepNumber : '';
    if (stepStatus !== 'finish' && stepStatus !== 'error')
      return <StepNumber size={size}>{theStepNumber}</StepNumber>;
    return null;
  }

  getConfigs() {
    const { stepType } = this.props;
    const { stepStatus } = this.state;
    return {
      stepType,
      stepStatus,
    };
  }
}

const TargetStep = ThemeProvider(KeyBoardEventAdaptor(Step), Widget.Step);
export default TargetStep;
