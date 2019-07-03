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
import type { AlignType, OrientationType, SizeType, StepStatus, StepType } from '../css/steps';
import {
  DotSize,
  getAfterGap,
  getBeforeGap,
  getContentMargin,
  getContentPosition,
  getDotLineSize,
  getFinishDisplay,
  getFinishIconColor,
  getFlexDirection,
  getIndex,
  getLineColor,
  getLinePadding,
  getLineSize,
  getShow,
  getStepBackgroundColor,
  getStepColor,
  getStepContainerSize,
  getStepContainerWidth,
  getStepFontColor,
  getStepInnerBorder,
  getStepInnerContainerPosition,
  getStepNumberSize,
  getStepOutContanerSize,
  getStepSize,
  getTextAlign,
  getTitleLineHeight,
  stepContainerSize,
  stepInnerContainerPosition,
} from '../css/steps';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { units } from '@lugia/css';

const { px2remcss } = units;

const BaseStep = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    cursor: pointer;
    ${getStepOutContanerSize};
    flex: 1;
  `,
});
const HStep = CSSComponent({
  extend: BaseStep,
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    display: inline-flex;
    color: ${getStepColor};
  `,
});
const Title = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    font-size: 1.4rem;
    color: ${getStepFontColor};
    text-align: inherit;
    ${getTitleLineHeight};
  `,
});
const Description = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    font-weight: 400;
    color: ${getStepFontColor};
    margin-top: ${px2remcss(6)};
    text-align: inherit;
  `,
});
const Content = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: absolute;
    white-space: normal;
    display: block;
    color: ${getStepColor};
    ${getContentPosition};
    ${getContentMargin};
    ${getTextAlign};
  `,
});
const BaseLine = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { stepType, orientation } = propsConfig;
      const size = stepType === 'flat' ? px2remcss(6) : px2remcss(1);
      const theSize =
        orientation === 'horizontal' ? `height:${size};width:100%;` : `width:${size};height:100%;`;
      return theSize;
    },
  },
  css: css`
    position: relative;
    ${getLineSize};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
});
const LineContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    display: inline-block;
    position: relative;
    ${getShow};
    ${getLinePadding};
    z-index: 10;
  `,
});
const Line = CSSComponent({
  extend: BaseLine,
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    ${getLineColor};
    &::before {
      ${getBeforeGap};
    }
    &::after {
      ${getAfterGap};
    }
  `,
});

const DotLine = CSSComponent({
  extend: BaseLine,
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    ${getDotLineSize};
  `,
});
const StepHeadContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    ${getStepContainerWidth};
  `,
});

const Dot = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    background-color: ${getStepColor};
    display: inLine-block;
    border-radius: 50%;
    width: ${px2remcss(DotSize)};
    height: ${px2remcss(DotSize)};
  `,
});
const IconContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    display: inLine-block;
    width: ${getStepSize};
    height: ${getStepSize};
  `,
});
const StepNumber = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    display: inLine-block;
    user-select: none;
    text-align: center;
    font-weight: 700;
    line-height: 1;
    font-size: ${getStepNumberSize};
    color: ${getStepColor};
  `,
});
const StepInner = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
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
  `,
});
const StepContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    ${getStepContainerSize};
    display: flex;
    ${getFlexDirection};
  `,
});
const DotContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
    display: flex;
    ${getFlexDirection};
    height: 100%;
  `,
});

const BaseInnerContainer = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    text-align: center;
    position: relative;
    display: flex;
  `,
});
const getMargin = (props: Object) => {
  return `${stepInnerContainerPosition(props)}: ${getStepSize(props)};`;
};
const StepInnerContainer = styled(BaseInnerContainer)`
  ${getStepInnerContainerPosition};
  ${getMargin}
  ${getIndex};
`;
const DotInnerContainer = styled(BaseInnerContainer)`
  width: ${px2remcss(DotSize)};
  height: ${px2remcss(DotSize)};
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
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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
    const { themeProps, size, isFirst, orientation } = this.props;
    if (isFirst) {
      return this.getStepContainer();
    }
    return (
      <HStep {...this.getConfigs()} themeProps={themeProps} size={size} orientation={orientation}>
        {this.getStepContainer()}
      </HStep>
    );
  }

  getStepContainer() {
    const { stepType, isFirst, size, themeProps } = this.props;
    return (
      <StepHeadContainer themeProps={themeProps} isFirst={isFirst} size={size} stepType={stepType}>
        {this.getStepHead()}
      </StepHeadContainer>
    );
  }

  getDesc() {
    const { description, themeProps } = this.props;
    const { stepStatus } = this.state;
    if (description && description !== undefined) {
      return (
        <Description themeProps={themeProps} stepStatus={stepStatus}>
          {description}
        </Description>
      );
    }
    return null;
  }

  getContent() {
    const { title, description, size, orientation, desAlign, themeProps } = this.props;
    return (
      <Content
        themeProps={themeProps}
        {...this.getConfigs()}
        orientation={orientation}
        size={size}
        desAlign={desAlign}
      >
        <Title
          themeProps={themeProps}
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
    const { isFirst, stepType, size, orientation, themeProps } = this.props;
    if (stepType === 'dot') {
      return (
        <DotContainer isFirst={isFirst} orientation={orientation} themeProps={themeProps}>
          {this.matchLine()}
          <DotInnerContainer {...this.getConfigs()} size={size} themeProps={themeProps}>
            <Dot {...this.getConfigs()} themeProps={themeProps} />
            {this.getContent()}
          </DotInnerContainer>
        </DotContainer>
      );
    }
    return (
      <StepContainer
        size={size}
        isFirst={isFirst}
        orientation={orientation}
        themeProps={themeProps}
      >
        {this.matchLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matchLine() {
    const { stepType, isFirst, orientation, themeProps } = this.props;
    if (!isFirst)
      return (
        <LineContainer
          orientation={orientation}
          stepType={stepType}
          {...this.getConfigs()}
          themeProps={themeProps}
        >
          {this.getLine()}
        </LineContainer>
      );
    return null;
  }

  getLine() {
    const { isDashed, stepType, isFirst, orientation, themeProps } = this.props;
    if (stepType === 'dot') {
      return (
        <DotLine
          themeProps={themeProps}
          {...this.getConfigs()}
          isDashed={isDashed}
          isFirst={isFirst}
          orientation={orientation}
        />
      );
    }
    return (
      <Line
        {...this.getConfigs()}
        isFirst={isFirst}
        orientation={orientation}
        themeProps={themeProps}
      />
    );
  }

  getIcon(stepStatus: StepStatus): string {
    return stepStatus === 'finish'
      ? 'lugia-icon-reminder_check'
      : stepStatus === 'error'
      ? 'lugia-icon-reminder_close'
      : '';
  }

  getStep() {
    const { icon, stepType, size, orientation, themeProps } = this.props;
    const { stepStatus } = this.state;
    const theIcon = this.getIcon(stepStatus);
    if (stepType === 'flat' || stepType === 'simple') {
      return (
        <StepInnerContainer
          size={size}
          {...this.getConfigs()}
          orientation={orientation}
          themeProps={themeProps}
        >
          <StepInner
            {...this.getConfigs()}
            size={size}
            orientation={orientation}
            themeProps={themeProps}
          >
            <IconFinish {...this.getConfigs()} iconClass={theIcon} themeProps={themeProps} />
            {this.getStepNumber()}
          </StepInner>
          {this.getContent()}
        </StepInnerContainer>
      );
    }
    if (stepType === 'icon') {
      return (
        <IconContainer size={size} themeProps={themeProps}>
          <IconStep iconClass={icon} {...this.getConfigs()} themeProps={themeProps} />
          {this.getContent()}
        </IconContainer>
      );
    }
  }

  getStepValue(stepNumber: number, stepStatus: StepStatus): number {
    return (stepStatus === 'finish' || stepStatus === 'process') && stepNumber > 0 ? stepNumber : 0;
  }

  getStepNumber() {
    const { size, stepNumber, themeProps } = this.props;
    const { stepStatus } = this.state;
    const theStepNumber = this.getStepValue(stepNumber, stepStatus);
    if (stepStatus !== 'finish' && stepStatus !== 'error') {
      return (
        <StepNumber size={size} themeProps={themeProps}>
          {theStepNumber}
        </StepNumber>
      );
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
