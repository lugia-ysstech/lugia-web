/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import type { StepType, StepStatus, SizeType, OrientationType, AlignType } from '../css/steps';
import { DotSize } from '../css/steps';
import {
  getStepColor,
  getFinishDisplay,
  getStepBackgroundColor,
  getLineSize,
  getStepOutContanerSize,
  getStepContainerWidth,
  getFinishIconColor,
  getStepNumberSize,
  getStepSize,
  getStepFontColor,
  stepContainerSize,
  getStepInnerContainerPosition,
  stepInnerContainerPosition,
  getStepContainerSize,
  getLinePadding,
  getShow,
  getContentPosition,
  getLineColor,
  getFlexDirection,
  getDotLineSize,
  getContentMargin,
  getStepInnerBorder,
  getTitleLineHeight,
  getBeforeGap,
  getAfterGap,
  getIndex,
  getTextAlign,
} from '../css/steps';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';

const em = px2emcss(1.2);

const BaseStep = styled.div`
  position: relative;
  cursor: pointer;
  ${getStepOutContanerSize};
  flex: 1;
`;
const HStep = BaseStep.extend`
  display: inline-flex;
  color: ${getStepColor};
`;
const Title = styled.div`
  font-size: 1.4rem;
  color: ${getStepFontColor};
  text-align: inherit;
  ${getTitleLineHeight};
`;
const Description = styled.div`
  font-weight: 400;
  color: ${getStepFontColor};
  margin-top: ${em(6)};
  text-align: inherit;
`;
const Content = styled.div`
  position: absolute;
  white-space: normal;
  display: block;
  color: ${getStepColor};
  ${getContentPosition};
  ${getContentMargin};
  ${getTextAlign};
`;
const BaseLine = styled.div`
  position: relative;
  ${getLineSize};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LineContainer = styled.div`
  display: inline-block;
  position: relative;
  ${getShow};
  ${getLinePadding};
  z-index: 10;
`;
const Line = BaseLine.extend`
  ${getLineColor};
  &::before {
    ${getBeforeGap};
  }
  &::after {
    ${getAfterGap};
  }
`;

const DotLine = BaseLine.extend`
  ${getDotLineSize}: ;
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
  width: ${em(DotSize)};
  height: ${em(DotSize)};
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
  color: ${getStepColor};
`;
const StepInner = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${getStepSize};
  height: ${getStepSize};
  box-sizing: border-box;
  border-radius: 50%;
  ${getStepInnerBorder};
  ${getLineColor};
  background-color: ${getStepBackgroundColor};
`;
const StepContainer = styled.div`
  position: relative;
  ${getStepContainerSize};
  display: flex;
  ${getFlexDirection};
`;
const DotContainer = styled.div`
  position: relative;
  display: flex;
  ${getFlexDirection};
  height: 100%;
`;

const BaseInnerContainer = styled.div`
  text-align: center;
  position: relative;
  display: flex;
`;
const StepInnerContainer = BaseInnerContainer.extend`
  ${getStepInnerContainerPosition};
  ${stepInnerContainerPosition}: ${getStepSize};
  ${getIndex};
`;
const DotInnerContainer = BaseInnerContainer.extend`
  width: ${em(DotSize)};
  height: ${em(DotSize)};
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
  font-size: ${stepContainerSize};
  border-color: ${getStepColor};
  color: ${getStepColor};
  top: 50%;
  transform: translateY(-50%);
`;

type StepState = { stepStatus: StepStatus };

type StepProps = {
  title: React.Node,
  icon: string,
  description: React.Node,
  stepType: StepType,
  stepNumber: number,
  currentStepNumber: number,
  stepStatus: StepStatus,
  orientation: OrientationType,
  size: SizeType,
  getTheme: Function,
  isFirst: boolean,
  isDashed: boolean,
  desAlign: AlignType,
};

class Step extends React.Component<StepProps, StepState> {
  static defaultProps = {};
  static displayName = Widget.Step;

  constructor(props: StepProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: StepProps, state: StepState) {
    const { currentStepNumber, stepNumber, stepStatus } = props;
    const hasStatusInprops = 'stepStatus' in props;
    const theStepStatus = hasStatusInprops
      ? stepStatus
      : currentStepNumber > stepNumber
      ? 'finish'
      : currentStepNumber === stepNumber
      ? 'process'
      : 'wait';
    if (hasStatusInprops) {
      return { stepStatus };
    }
    return { stepStatus: theStepStatus };
  }

  render() {
    const { getTheme, size, isFirst, orientation } = this.props;
    if (isFirst) {
      return this.getStepContainer();
    }
    return (
      <HStep {...this.getConfigs()} theme={getTheme()} size={size} orientation={orientation}>
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

  getDesc() {
    const { description } = this.props;
    const { stepStatus } = this.state;
    if (description && description !== undefined) {
      return <Description stepStatus={stepStatus}>{description}</Description>;
    }
    return null;
  }
  getContent() {
    const { title, description, size, orientation, desAlign } = this.props;
    return (
      <Content {...this.getConfigs()} orientation={orientation} size={size} desAlign={desAlign}>
        <Title
          {...this.getConfigs()}
          orientation={orientation}
          size={size}
          description={description}
        >
          {title}
        </Title>
        {this.getDesc()}
      </Content>
    );
  }

  getStepHead() {
    const { isFirst, stepType, size, orientation } = this.props;
    if (stepType === 'dot') {
      return (
        <DotContainer isFirst={isFirst} orientation={orientation}>
          {this.matchLine()}
          <DotInnerContainer {...this.getConfigs()} size={size}>
            <Dot {...this.getConfigs()} />
            {this.getContent()}
          </DotInnerContainer>
        </DotContainer>
      );
    }
    return (
      <StepContainer size={size} isFirst={isFirst} orientation={orientation}>
        {this.matchLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matchLine() {
    const { stepType, isFirst, orientation } = this.props;
    if (!isFirst)
      return (
        <LineContainer orientation={orientation} stepType={stepType} {...this.getConfigs()}>
          {this.getLine()}
        </LineContainer>
      );
    return null;
  }

  getLine() {
    const { isDashed, stepType, isFirst, orientation } = this.props;
    if (stepType === 'dot') {
      return (
        <DotLine
          {...this.getConfigs()}
          isDashed={isDashed}
          isFirst={isFirst}
          orientation={orientation}
        />
      );
    }
    return <Line {...this.getConfigs()} isFirst={isFirst} orientation={orientation} />;
  }

  getIcon(stepStatus: StepStatus): string {
    return stepStatus === 'finish'
      ? 'lugia-icon-reminder_check'
      : stepStatus === 'error'
      ? 'lugia-icon-reminder_close'
      : '';
  }

  getStep() {
    const { icon, stepType, size, orientation } = this.props;
    const { stepStatus } = this.state;
    const theIcon = this.getIcon(stepStatus);
    if (stepType === 'flat' || stepType === 'simple') {
      return (
        <StepInnerContainer size={size} {...this.getConfigs()} orientation={orientation}>
          <StepInner {...this.getConfigs()} size={size} orientation={orientation}>
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
  getStepValue(stepNumber: number, stepStatus: StepStatus): number {
    return (stepStatus === 'finish' || stepStatus === 'process') && stepNumber > 0 ? stepNumber : 0;
  }
  getStepNumber() {
    const { size, stepNumber } = this.props;
    const { stepStatus } = this.state;
    const theStepNumber = this.getStepValue(stepNumber, stepStatus);
    if (stepStatus !== 'finish' && stepStatus !== 'error') {
      return <StepNumber size={size}>{theStepNumber}</StepNumber>;
    }
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
export const _Step = Step;
const TargetStep = ThemeProvider(KeyBoardEventAdaptor(Step), Widget.Step);
export default TargetStep;
