/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
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
  className: 'BaseStep',
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
      return {
        type: theSize,
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
  className: 'HStep',
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
      return {
        type: theSize,
      };
    },
  },
  css: css`
    display: inline-flex;
  `,
});
const Title = CSSComponent({
  tag: 'div',
  className: 'StepTitle',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    font-size: 1.4rem;
    text-align: inherit;
    ${getTitleLineHeight};
  `,
});
const Description = CSSComponent({
  tag: 'div',
  className: 'StepDescription',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    font-weight: 400;
    margin-top: ${px2remcss(6)};
    text-align: inherit;
  `,
});
const Content = CSSComponent({
  tag: 'div',
  className: 'StepContent',
  normal: {
    selectNames: [['margin']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, stepType, orientation, desAlign } = propsConfig;
      const dir = orientation === 'horizontal' ? 'top' : 'left';
      const top =
        stepType === 'dot' ? px2remcss(10) : size === 'normal' ? px2remcss(30) : px2remcss(20);
      const position = orientation === 'horizontal' ? `top: ${top};` : `left:${top};`;
      const textAlign = orientation === 'horizontal' && desAlign === 'center' ? 'center' : 'left';
      const transform =
        textAlign === 'center' ? `transform: translateX(-40%);width:${px2remcss(150)};` : '';
      return `margin-${dir}: ${px2remcss(10)};${position}text-align: ${textAlign};${transform}`;
    },
  },
  css: css`
    position: absolute;
    white-space: normal;
    display: block;
  `,
});
const BaseLine = CSSComponent({
  tag: 'div',
  className: 'StepBaseLine',
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
  className: 'StepLineContainer',
  normal: {
    selectNames: [['width'], ['height']],
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
    getThemeMeta(themeMeta, themeProps) {
      const { height, width } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : '';
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? '' : '100%';
      if (orientation === 'horizontal')
        return {
          width: theWidth,
        };
      return {
        height: theHeight,
      };
    },
  },
  css: css`
    display: inline-block;
    position: relative;
    z-index: 10;
  `,
});
const FlatLineContainer = CSSComponent({
  tag: 'div',
  className: 'StepFlatLineContainer',
  normal: {
    selectNames: [['width'], ['height']],
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
    getThemeMeta(themeMeta, themeProps) {
      const { height, width } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const theWidth = width && width > 0 ? width : orientation === 'horizontal' ? '100%' : 10;
      const theHeight = height && height > 0 ? height : orientation === 'horizontal' ? 10 : '100%';
      if (orientation === 'horizontal')
        return {
          width: theWidth,
          height: theHeight,
        };
      return {
        width: theWidth,
        height: theHeight,
      };
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
  className: 'StepLine',
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
      console.log(theHeight, 11111111);
      return {
        height: theHeight,
        width: theWidth,
      };
    },
  },
});

const DotLine = CSSComponent({
  extend: BaseLine,
  className: 'StepDotLine',
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
  className: 'StepFlatLine',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow']],
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
  className: 'StepNormalFlatLine',
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
      return {
        height: theHeight,
        width: theWidth,
      };
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
  className: 'StepStepHeadContainer',
  normal: {
    selectNames: ['width'],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
    position: relative;
  `,
});

const Dot = CSSComponent({
  tag: 'div',
  className: 'StepDot',
  normal: {
    selectNames: [['background'], ['width'], ['height']],
    defaultTheme: {
      width: 12,
      height: 12,
    },
  },
  css: css`
    position: relative;
    display: inLine-block;
    border-radius: 50%;
  `,
});
const IconContainer = CSSComponent({
  tag: 'div',
  className: 'StepIconContainer',
  normal: {
    selectNames: [['fontSize'], ['width'], ['height']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size } = propsConfig;
      const { fontSize } = themeMeta;
      const theSize = fontSize ? fontSize : size === 'normal' ? 32 : 24;
      return {
        width: theSize,
        height: theSize,
      };
    },
  },
  css: css`
    position: relative;
    display: inLine-block;
  `,
});
const StepNumber = CSSComponent({
  tag: 'div',
  className: 'StepNumber',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size } = propsConfig;
      const { fontSize } = themeMeta;
      const theFontSize = fontSize ? fontSize : size === 'normal' ? 20 : 12;
      return { fontSize: theFontSize };
    },
  },
  css: css`
    display: inLine-block;
    user-select: none;
    text-align: center;
    font-weight: 700;
    line-height: 1;
  `,
});
const StepInner = CSSComponent({
  tag: 'div',
  className: 'StepInner',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
  },
  css: css`
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
  className: 'StepContainer',
  normal: {
    selectNames: [['height'], ['width']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const direction = orientation === 'horizontal' ? 'row' : 'column';
      return `flex-direction: ${direction};`;
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation, size } = propsConfig;
      const { width, height } = themeMeta;
      const theWidth = width
        ? width
        : orientation === 'horizontal'
        ? '100%'
        : size === 'normal'
        ? 32
        : 24;
      const theHeight = height
        ? height
        : orientation !== 'horizontal'
        ? '100%'
        : size === 'normal'
        ? 32
        : 24;
      return {
        height: theHeight,
        width: theWidth,
      };
    },
  },
  css: css`
    position: relative;
    display: flex;
  `,
});
const DotContainer = CSSComponent({
  tag: 'div',
  className: 'StepDotContainer',
  normal: {
    selectNames: [],
    getThemeMeta(themeMeta, themeProps) {},
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const direction = orientation === 'horizontal' ? 'row' : 'column';
      return `flex-direction: ${direction};`;
    },
  },
  css: css`
    position: relative;
    display: flex;
    height: 100%;
  `,
});

const BaseInnerContainer = CSSComponent({
  tag: 'div',
  className: 'StepBaseInnerContainer',
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
const StepInnerContainer = CSSComponent({
  extend: BaseInnerContainer,
  className: 'StepInnerContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, orientation, stepType, stepStatus } = propsConfig;
      let theSize = 24;
      const newSize = orientation === 'horizontal' ? 'width' : 'height';
      switch (stepStatus) {
        case 'finish':
        case 'process':
        case 'error':
          theSize = size === 'normal' ? 32 : 24;
          break;
        case 'next':
        case 'wait':
          theSize =
            size === 'normal' && stepType === 'flat'
              ? 32
              : size === 'mini' && stepType === 'flat'
              ? 24
              : size === 'normal'
              ? 20
              : 12;
          break;
        default:
          break;
      }
      return {
        [newSize]: theSize,
      };
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation, stepStatus, stepType } = propsConfig;
      const position =
        orientation === 'horizontal' ? 'align-items: center;' : 'justify-content: center;';
      const index =
        stepType === 'flat' && (stepStatus === 'wait' || stepStatus === 'next') ? 9 : 11;
      return `z-index: ${index};${position};`;
    },
  },
});
const DotInnerContainer = CSSComponent({
  extend: BaseInnerContainer,
  className: 'StepDotInnerContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getThemeMeta(themeMeta, themeProps) {},
    defaultTheme: {
      width: 12,
      height: 12,
    },
  },
});

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
    const { stepStatus, size, isFirst, orientation, stepType } = this.props;
    if (isFirst) {
      return this.getStepContainer();
    }
    const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'color');
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepLine', {
        props: {
          size,
          orientation,
        },
      })
    );

    return <HStep themeProps={theThemeProps}>{this.getStepContainer()}</HStep>;
  }
  getDiffColor(CSSType: string, color: string): Object {
    if (CSSType === 'background') {
      return {
        background: {
          color,
        },
      };
    }
    return { color };
  }
  // let color = defaultColor;
  // switch (stepStatus) {
  // case 'finish':
  //   if (stepType === 'simple' || stepType === 'dot') return (color = successColor);
  //   if (stepType === 'flat') return (color = lightThemeColor);
  //   return (color = themeColor);
  // case 'process':
  //   if (stepType === 'flat') return (color = lightThemeColor);
  // case 'next':
  //   color = themeColor;
  //   break;
  // case 'wait':
  //   color = lightGreyColor;
  //   break;
  // case 'error':
  //   color = dangerColor;
  //   break;
  // default:
  //   break;
  // }
  // return color;

  getStepStatusColor(stepStatus: string, stepType: string, CSSType: string) {
    let resultTheme;
    switch (stepStatus) {
      case 'finish':
        const finishColor =
          stepType === 'flat'
            ? lightThemeColor
            : stepType === 'simple' || stepType === 'dot'
            ? successColor
            : themeColor;
        resultTheme = { themeConfig: { normal: this.getDiffColor(CSSType, finishColor) } };
        break;
      case 'process':
        const processColor = stepType === 'flat' ? lightThemeColor : themeColor;
        resultTheme = { themeConfig: { normal: this.getDiffColor(CSSType, processColor) } };
        break;
      case 'next':
        resultTheme = { themeConfig: { normal: this.getDiffColor(CSSType, themeColor) } };
        break;
      case 'wait':
        resultTheme = { themeConfig: { normal: this.getDiffColor(CSSType, lightGreyColor) } };
        break;
      case 'error':
      default:
        resultTheme = { themeConfig: { normal: this.getDiffColor(CSSType, dangerColor) } };
        break;
    }
    return resultTheme;
  }

  getStepContainer() {
    const { stepType, isFirst, size } = this.props;

    const theWidth =
      stepType === 'dot' && isFirst
        ? 12
        : size === 'normal' && isFirst
        ? 32
        : size === 'mini' && isFirst
        ? 24
        : '100%';
    const widthTheme = {
      themeConfig: {
        normal: {
          width: theWidth,
        },
      },
    };
    const theThemeProps = deepMerge(
      widthTheme,
      this.props.getPartOfThemeProps('StepContainer', {
        props: { isFirst, size, stepType },
      })
    );
    return <StepHeadContainer themeProps={theThemeProps}>{this.getStepHead()}</StepHeadContainer>;
  }

  getDesc() {
    const { description, stepType } = this.props;
    const { stepStatus } = this.state;
    if (description && description !== undefined) {
      const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'color');
      const desThemeProps = deepMerge(resultTheme, this.props.getPartOfThemeProps('StepTitle'));
      return (
        <Description themeProps={desThemeProps} stepStatus={stepStatus}>
          {description}
        </Description>
      );
    }
    return null;
  }

  getContent() {
    const { title, description, size, orientation, desAlign, stepType, stepStatus } = this.props;

    const contentThemeProps = this.props.getPartOfThemeProps('StepContent', {
      props: {
        size,
        stepType,
        orientation,
        desAlign,
      },
    });

    const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'color');
    const titleThemeProps = deepMerge(resultTheme, this.props.getPartOfThemeProps('StepTitle'));
    return (
      <Content
        themeProps={contentThemeProps}
        {...this.getConfigs()}
        orientation={orientation}
        size={size}
        desAlign={desAlign}
      >
        <Title
          themeProps={titleThemeProps}
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
    const { isFirst, stepType, size, orientation, stepStatus } = this.props;

    if (stepType === 'dot') {
      const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'background');
      const dotThemeProps = deepMerge(
        resultTheme,
        this.props.getPartOfThemeProps('StepDot', { props: { orientation, isFirst, size } })
      );
      return (
        <DotContainer isFirst={isFirst} orientation={orientation} themeProps={dotThemeProps}>
          {this.matchLine()}
          <DotInnerContainer themeProps={dotThemeProps}>
            <Dot themeProps={dotThemeProps} />
            {this.getContent()}
          </DotInnerContainer>
        </DotContainer>
      );
    }
    return (
      <StepContainer
        themeProps={this.props.getPartOfThemeProps('StepContainer', {
          props: {
            orientation,
            size,
          },
        })}
      >
        {this.matchLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matchLine() {
    const { stepType, isFirst, orientation } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('StepsLine', {
      props: {
        isFirst,
        stepType,
        orientation,
      },
    });
    if (!isFirst) {
      if (stepType === 'flat') {
        return (
          <FlatLineContainer themeProps={theThemeProps}> {this.getFlatLine()}</FlatLineContainer>
        );
      }
      return <LineContainer themeProps={theThemeProps}>{this.getLine()}</LineContainer>;
    }
    return null;
  }
  getFlatLine() {
    const { isDashed, stepType, isFirst, orientation, stepStatus } = this.props;
    const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'background');
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepLine', {
        props: {
          orientation,
          isDashed,
          stepType,
        },
      })
    );
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

  getLine() {
    const { isDashed, stepType, isFirst, orientation, stepStatus } = this.props;
    const resultTheme = this.getStepStatusColor(stepStatus, stepType, 'background');
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepLine', {
        props: {
          orientation,
          isDashed,
          stepType,
        },
      })
    );
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
      const { theme: iconThemeProps, viewClass: iconViewClass } = this.props.getPartOfThemeHocProps(
        'StepInnerIcon'
      );
      const newIconTheme = deepMerge(
        {
          [iconViewClass]: {
            normal: {
              getCSS() {
                return `  
                display: inline-block;
                user-select: none;
                text-align: center;
                font-weight: 700;
                line-height: 1;
                z-index: 5;`;
              },
              getThemeMeta(themeMeta, themeProps) {
                const { color } = themeMeta;
                const { propsConfig } = themeProps;
                const { stepType, stepStatus } = propsConfig;
                const theColor = color
                  ? color
                  : stepType === 'flat'
                  ? defaultColor
                  : stepStatus === 'finish'
                  ? successColor
                  : stepStatus === 'error'
                  ? dangerColor
                  : themeColor;
                return {
                  color: theColor,
                };
              },
            },
          },
        },
        iconThemeProps
      );
      const innerContainerThemeProps = this.props.getPartOfThemeProps('StepInnerContainer', {
        props: {
          stepType,
          size,
          orientation,
          stepStatus,
        },
      });
      console.log(innerContainerThemeProps, 1111111111);
      return (
        <StepInnerContainer themeProps={innerContainerThemeProps}>
          <StepInner
            themeProps={innerContainerThemeProps}
            stepType={stepType}
            size={size}
            orientation={orientation}
            stepStatus={stepStatus}
          >
            <Icon
              propsConfig={{ ...this.getConfigs() }}
              iconClass={theIcon}
              theme={newIconTheme}
              viewClass={iconViewClass}
            />
            {this.getStepNumber()}
          </StepInner>
          {this.getContent()}
        </StepInnerContainer>
      );
    }
    if (stepType === 'icon') {
      const { theme: iconThemeProps, viewClass: iconViewClass } = this.props.getPartOfThemeHocProps(
        'StepIcon'
      );
      const newIconTheme = deepMerge(
        {
          [iconViewClass]: {
            normal: {
              getCSS() {
                return `  
                  position: absolute;
                  user-select: none;
                  text-align: center;
                  font-weight: 700;
                  line-height: 1;
                  top: 50%;
                  transform: translateY(-50%);`;
              },
              getThemeMeta(themeMeta, themeProps) {
                const { color, fontSize } = themeMeta;
                const { propsConfig } = themeProps;
                const { stepStatus } = propsConfig;
                const theFontSize = fontSize ? fontSize : size === 'normal' ? 32 : 24;
                const theColor = color
                  ? color
                  : stepStatus === 'finish' || stepStatus === 'process' || stepStatus === 'next'
                  ? themeColor
                  : stepStatus === 'wait'
                  ? lightGreyColor
                  : stepStatus === 'error'
                  ? dangerColor
                  : themeColor;
                return {
                  fontSize: theFontSize,
                  color: theColor,
                };
              },
            },
          },
        },
        iconThemeProps
      );

      return (
        <IconContainer themeProps={this.props.getPartOfThemeProps('StepIcon', { props: { size } })}>
          <Icon
            iconClass={icon}
            propsConfig={{ stepStatus }}
            theme={newIconTheme}
            viewClass={iconViewClass}
          />
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
      const stepNumberThemeProps = deepMerge(
        { themeConfig: { normal: { color: defaultColor } } },
        this.props.getPartOfThemeProps('StepTitle', { props: { size } })
      );
      return (
        <StepNumber size={size} themeProps={stepNumberThemeProps}>
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
