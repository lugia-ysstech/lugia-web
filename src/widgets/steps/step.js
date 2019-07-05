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
import { addPropsConfig } from '../avatar';
import { getBoxShadow } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import changeColor from '../css/utilsColor';
const {
  themeColor,
  blackColor,
  successColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
} = colorsFunc();
const lightThemeColor = changeColor(themeColor, 20).rgb;

const { px2remcss } = units;

const BaseStep = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, orientation } = propsConfig;
      const { width, height } = themeMeta;
      const type = orientation === 'horizontal' ? 'width' : 'height';
      let theSize;
      if (type === 'width') {
        theSize = width && width > 0 ? width : size === 'normal' ? 212 : 204;
      } else {
        theSize = height && height > 0 ? height : size === 'normal' ? 82 : 74;
      }
      const a = {
        type: theSize,
      };
      console.log(a, 111111112);
      return {
        type: theSize,
        background: {
          color: 'red',
        },
      };
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
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
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['boxShadow'],
    ],
  },
  css: css`
    position: relative;
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
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { isFirst, stepType, orientation } = propsConfig;
      const padding = stepType === 'flat' ? 0 : px2remcss(6);
      let hsize = padding;
      let vsize = 0;
      if (orientation === 'horizontal') {
        hsize = 0;
        vsize = padding;
      }
      const display = isFirst ? 'width:0;' : 'flex: 1;';
      return `padding: ${hsize} ${vsize};${display}`;
    },
  },
  css: css`
    display: inline-block;
    position: relative;
    z-index: 10;
  `,
});
const Line = CSSComponent({
  extend: BaseLine,
  className: 'AmountInputTitle',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 1 : '100%';
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : 1;
      return {
        height: theHeight,
        width: theWidth,
      };
    },
  },
});

const DotLine = CSSComponent({
  extend: BaseLine,
  className: 'AmountInputTitle',
  normal: {
    selectNames: [
      ['border'],
      ['background'],
      ['width'],
      ['height'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { background } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation, isDashed } = propsConfig;
      const styled = isDashed ? 'dashed' : 'solid';
      const direction = orientation === 'horizontal' ? 'bottom' : 'left';
      const { height, width } = themeMeta;
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 1 : '100%';
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : 1;
      return {
        height: theHeight,
        width: theWidth,
        border: {
          [direction]: {
            width: 1,
            style: styled,
            color: background.color,
          },
        },
      };
    },
  },
});
const FlatLine = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow']],
    getCSS(themeMeta, themeProps) {
      // const { propsConfig } = themeProps;
      // const { height, width, boxShadow } = themeMeta;
      // const { orientation } = propsConfig;
      // const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 6 : '100%';
      return '';
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width, boxShadow } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 6 : '100%';
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : 6;
      const theBoxShadow = boxShadow
        ? boxShadow
        : getBoxShadow('0 0 4 rgba(104, 79, 255,0.3) inset');
      const theThemeMeta = {
        height: theHeight,
        width: theWidth,
        boxShadow: theBoxShadow,
      };
      return theThemeMeta;
    },
  },
  css: css`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      ${getBeforeGap};
    }
    &::after {
      ${getAfterGap};
    }
  `,
});
const NormalFlatLine = CSSComponent({
  tag: 'div',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['cursor'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 6 : '100%';
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : 6;
      const theThemeMeta = {
        height: theHeight,
        width: theWidth,
      };
      return theThemeMeta;
    },
  },
  css: css`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    const theThemeProps = addPropsConfig(themeProps, { isFirst, stepType, orientation });
    if (!isFirst)
      return (
        <LineContainer
          orientation={orientation}
          stepType={stepType}
          {...this.getConfigs()}
          themeProps={theThemeProps}
        >
          {this.getLine()}
        </LineContainer>
      );
    return null;
  }

  getLine() {
    const { isDashed, stepType, isFirst, orientation, stepStatus } = this.props;
    let resultTheme;
    switch (stepStatus) {
      case 'finish':
        const finishColor =
          stepType === 'flat'
            ? lightThemeColor
            : stepType === 'simple' || stepType === 'dot'
            ? successColor
            : themeColor;
        resultTheme = deepMerge(
          { themeConfig: { normal: { background: { color: finishColor } } } },
          this.props.getPartOfThemeProps('StepLine')
        );
        break;
      case 'process':
        const processColor = stepType === 'flat' ? lightThemeColor : themeColor;
        resultTheme = deepMerge(
          { themeConfig: { normal: { background: { color: processColor } } } },
          this.props.getPartOfThemeProps('StepLine')
        );
        break;
      case 'next':
        resultTheme = deepMerge(
          { themeConfig: { normal: { background: { color: themeColor } } } },
          this.props.getPartOfThemeProps('StepLine')
        );
        break;
      case 'wait':
        resultTheme = deepMerge(
          { themeConfig: { normal: { background: { color: lightGreyColor } } } },
          this.props.getPartOfThemeProps('StepLine')
        );
        break;
      case 'error':
      default:
        resultTheme = deepMerge(
          { themeConfig: { normal: { background: { color: dangerColor } } } },
          this.props.getPartOfThemeProps('StepLine')
        );
        break;
    }
    const theThemeProps = addPropsConfig(resultTheme, {
      orientation,
      isDashed,
      stepType,
    });
    if (stepType === 'dot') {
      return (
        <DotLine
          themeProps={theThemeProps}
          {...this.getConfigs()}
          isDashed={isDashed}
          isFirst={isFirst}
          orientation={orientation}
        />
      );
    }
    if (stepType === 'flat') {
      if (stepStatus === 'wait' || stepStatus === 'next') {
        return (
          <FlatLine
            themeProps={theThemeProps}
            {...this.getConfigs()}
            isDashed={isDashed}
            isFirst={isFirst}
            orientation={orientation}
          />
        );
      }
      return (
        <NormalFlatLine
          themeProps={theThemeProps}
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
        themeProps={theThemeProps}
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
