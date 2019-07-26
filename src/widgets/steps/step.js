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

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { units } from '@lugia/css';
import { getBoxShadow, getBorder } from '@lugia/theme-utils';
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
  },
  css: css`
    position: relative;
    cursor: pointer;
    flex: 1;
  `,
});
const StepOutContainer = CSSComponent({
  extend: BaseStep,
  className: 'StepOutContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, orientation } = propsConfig;
      const { width, height } = themeMeta;
      const type = orientation === 'horizontal' ? 'width' : 'height';
      let theSize;
      if (type === 'width') {
        theSize = width ? width : size === 'normal' ? 212 : 204;
      } else {
        theSize = height ? height : size === 'normal' ? 82 : 74;
      }
      return {
        [type]: theSize,
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
    selectNames: [
      ['fontSize'],
      ['font'],
      ['color'],
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
    ],
    defaultTheme: {
      fontSize: 14,
    },
  },
  css: css`
    text-align: inherit;
  `,
});
const Description = CSSComponent({
  tag: 'div',
  className: 'StepDescription',
  normal: {
    selectNames: [
      ['fontSize'],
      ['font'],
      ['color'],
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
    ],
  },
  css: css`
    margin-top: ${px2remcss(6)};
    text-align: inherit;
  `,
});
const Content = CSSComponent({
  tag: 'div',
  className: 'StepContent',
  normal: {
    selectNames: [],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, stepType, orientation, desAlign } = propsConfig;
      const dir = orientation === 'horizontal' ? 'top' : 'left';
      const position = orientation !== 'horizontal' ? `left:${px2remcss(5)};` : '';
      const top = stepType === 'dot' ? 20 : size === 'normal' ? 40 : 30;
      const textAlign = orientation === 'horizontal' && desAlign === 'center' ? 'center' : 'left';
      const transform = textAlign === 'center' ? 'transform: translateX(-40%);' : '';
      return `width:${px2remcss(200)};margin-${dir}: ${px2remcss(
        top
      )};${position}text-align: ${textAlign};${transform}`;
    },
  },
  css: css`
    position: absolute;
    white-space: normal;
    display: block;
  `,
});
const SimpleLineContainer = CSSComponent({
  tag: 'div',
  className: 'StepSimpleLineContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { isFirst, stepType, orientation } = propsConfig;
      const padding = stepType === 'flat' ? 0 : px2remcss(6);
      let hSize = padding;
      let vSize = 0;
      if (orientation === 'horizontal') {
        hSize = 0;
        vSize = padding;
      }
      const display = isFirst ? 'width:0;' : 'flex: 1;';
      return `padding: ${hSize} ${vSize};${display}`;
    },
    getThemeMeta(themeMeta, themeProps) {
      const { height, width } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : '';
      const theHeight = height ? height : orientation === 'horizontal' ? '' : '100%';
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
    display: inline-flex;
    position: relative;
    z-index: 10;
  `,
});
const OtherLineContainer = CSSComponent({
  tag: 'div',
  className: 'StepOtherLineContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { isFirst, orientation } = propsConfig;
      const padding = px2remcss(6);
      let hSize = padding;
      let vSize = 0;
      if (orientation === 'horizontal') {
        hSize = 0;
        vSize = padding;
      }
      const display = isFirst ? 'width:0;' : 'flex: 1;';
      return `padding: ${hSize} ${vSize};${display}`;
    },
    getThemeMeta(themeMeta, themeProps) {
      const { height, width } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : '';
      const theHeight = height ? height : orientation === 'horizontal' ? '' : '100%';
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
    display: inline-flex;
    position: relative;
  `,
});
const Line = CSSComponent({
  tag: 'div',
  className: 'StepLine',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height ? height : orientation === 'horizontal' ? 1 : '100%';
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : 1;
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
const DotLine = CSSComponent({
  tag: 'div',
  className: 'StepDotLine',
  normal: {
    selectNames: [['width'], ['height'], ['border']],
    getThemeMeta(themeMeta, themeProps) {
      const { background = {} } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation, isDashed } = propsConfig;
      const styled = isDashed ? 'dashed' : 'solid';
      const direction = orientation === 'horizontal' ? 'bottom' : 'left';
      const { height, width } = themeMeta;
      const theHeight = height ? height : orientation === 'horizontal' ? 1 : '100%';
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : 1;
      const size = orientation === 'horizontal' ? theHeight : theWidth;
      return {
        width: theWidth,
        height: theHeight,
        border: {
          [direction]: {
            width: size,
            style: styled,
            color: background.color,
          },
        },
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
const FlatLine = CSSComponent({
  tag: 'div',
  className: 'StepFlatLine',
  normal: {
    selectNames: [['width'], ['height'], ['boxShadow']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width, boxShadow } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height ? height : orientation === 'horizontal' ? 6 : '100%';
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : 6;
      const theBoxShadow = '0 0 2 rgba(104, 79, 255,0.3) inset';
      const resBoxShadow = boxShadow ? boxShadow : getBoxShadow(theBoxShadow);
      const theThemeMeta = {
        height: theHeight,
        width: theWidth,
        boxShadow: resBoxShadow,
      };
      return theThemeMeta;
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;

      const getPosition = (type: 'after' | 'before') => {
        const before = type === 'before';
        const beforeDirection = orientation === 'horizontal' ? 'top' : 'left';
        const HAfterDirection = before ? 'left' : 'right';
        const VAfterDirection = before ? 'top' : 'bottom';
        const afterDirection = orientation === 'horizontal' ? HAfterDirection : VAfterDirection;
        return `  
           ${beforeDirection}:${px2remcss(1)};
           ${afterDirection}:${px2remcss(-2)};
       `;
      };
      const commonCSS = ` content: '';
        opacity: 1;
        position: absolute;
        width: ${px2remcss(4)};
        height: ${px2remcss(4)};
        background: ${defaultColor};`;
      return `
       &::before {
        ${commonCSS}
        ${getPosition('before')}
    }
       &::after {
        ${commonCSS}
        ${getPosition('after')}
    }`;
    },
  },
  css: css`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
});
const NormalFlatLine = CSSComponent({
  tag: 'div',
  className: 'StepNormalFlatLine',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height, width } = themeMeta;
      const { orientation } = propsConfig;
      const theHeight = height ? height : orientation === 'horizontal' ? 6 : '100%';
      const theWidth = width ? width : orientation === 'horizontal' ? '100%' : 6;
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
    selectNames: [['width'], ['height']],
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
    text-align: left;
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
      const { font } = themeMeta;
      const theFontSize = font && font.size ? font.size : size === 'normal' ? 20 : 12;
      const theFontweight = font && font.weight ? font.weight : 700;
      return {
        font: {
          weight: theFontweight,
          size: theFontSize,
        },
      };
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
    selectNames: [['fontSize'], ['width'], ['height'], ['background'], ['border'], ['boxShadow']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { width, height } = themeMeta;
      const { size, stepType, stepStatus } = propsConfig;
      let theSize = 24;
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

      const theWidth = width ? width : theSize;
      const theHeight = height ? height : theSize;
      return {
        width: theWidth,
        height: theHeight,
      };
    },
  },
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 50%;
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
      const textAlign = orientation !== 'horizontal' ? 'text-align: -webkit-center;' : '';
      return `flex-direction: ${direction};${textAlign}`;
    },
  },
  css: css`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
  `,
});
const DotContainer = CSSComponent({
  tag: 'div',
  className: 'StepDotContainer',
  normal: {
    selectNames: [],
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
    selectNames: [['width'], ['height']],
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
      const { width, height } = themeMeta;
      const { size, stepType, stepStatus } = propsConfig;
      let theSize = 24;
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
      const theWidth = width ? width : theSize;
      const theHeight = height ? height : theSize;
      return {
        width: theWidth,
        height: theHeight,
      };
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation, stepStatus, stepType } = propsConfig;
      const position =
        orientation === 'horizontal'
          ? 'align-items: center;top: 50%;transform: translateY(-50%);'
          : 'justify-content: center;';
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
    const hasStatusInprops = stepStatus && stepStatus !== undefined;
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
    const resultTheme = this.getThemeColorConfig(
      'color',
      this.getStepStatusColor(stepStatus, stepType)
    );
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepOutContainer', {
        props: {
          size,
          orientation,
        },
      })
    );

    return (
      <StepOutContainer themeProps={theThemeProps}>{this.getStepContainer()}</StepOutContainer>
    );
  }

  getThemeColorConfig(CSSType: string, color: string): Object {
    return CSSType === 'background'
      ? {
          background: {
            color,
          },
        }
      : { color };
  }

  getStepFontColor(stepStatus: StepStatus, stepType: StepType) {
    let resultConfigColor;
    switch (stepStatus) {
      case 'error':
        const errorColor = dangerColor;
        resultConfigColor = errorColor;
        break;
      case 'finish':
        const finishColor = stepType === 'flat' ? lightThemeColor : blackColor;
        resultConfigColor = finishColor;
        break;
      case 'process':
        const processColor = blackColor;
        resultConfigColor = processColor;
        break;
      case 'next':
      case 'wait':
      default:
        resultConfigColor = lightGreyColor;
        break;
    }
    return resultConfigColor;
  }
  getStepStatusColor(stepStatus: StepStatus, stepType: StepType) {
    let resultConfigColor;
    switch (stepStatus) {
      case 'finish':
        const finishColor = stepType === 'flat' ? lightThemeColor : successColor;
        resultConfigColor = finishColor;
        break;
      case 'process':
        const processColor = stepType === 'flat' ? lightThemeColor : themeColor;
        resultConfigColor = processColor;
        break;
      case 'next':
        resultConfigColor = themeColor;
        break;
      case 'wait':
        resultConfigColor = lightGreyColor;
        break;
      case 'error':
      default:
        resultConfigColor = dangerColor;
        break;
    }
    return resultConfigColor;
  }

  getStepContainer() {
    const { stepType, isFirst, size, orientation } = this.props;

    const type = orientation === 'horizontal' ? 'width' : 'height';
    const theVWidth = orientation !== 'horizontal' && !isFirst ? '100%' : '';
    const theSize =
      stepType === 'dot' && isFirst
        ? 12
        : size === 'normal' && isFirst
        ? 32
        : size === 'mini' && isFirst
        ? 24
        : '100%';

    const stepContainerTheme = {
      themeConfig: {
        normal: {
          width: theVWidth,
          [type]: theSize,
        },
      },
    };
    const theThemeProps = deepMerge(
      stepContainerTheme,
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
      const resultTheme = this.getThemeNormalConfig(
        this.getThemeColorConfig('color', this.getStepFontColor(stepStatus, stepType))
      );
      const desThemeProps = deepMerge(
        resultTheme,
        this.props.getPartOfThemeProps('StepDescription')
      );
      return <Description themeProps={desThemeProps}>{description}</Description>;
    }
    return null;
  }

  getContent() {
    const { title, size, orientation, desAlign, stepType } = this.props;
    const { stepStatus } = this.state;
    const contentThemeProps = this.props.getPartOfThemeProps('StepOutContainer', {
      props: {
        size,
        stepType,
        orientation,
        desAlign,
      },
    });

    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('color', this.getStepFontColor(stepStatus, stepType))
    );

    const titleThemeProps = deepMerge(resultTheme, this.props.getPartOfThemeProps('StepTitle'));
    return (
      <Content
        themeProps={contentThemeProps}
        orientation={orientation}
        size={size}
        desAlign={desAlign}
      >
        <Title themeProps={titleThemeProps}>{title}</Title>
        {this.getDesc()}
      </Content>
    );
  }

  getStepHead() {
    const { isFirst, stepType, size, orientation } = this.props;
    const { stepStatus } = this.state;

    if (stepType === 'dot') {
      const resultTheme = this.getThemeNormalConfig(
        this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
      );
      const dotThemeProps = deepMerge(
        resultTheme,
        this.props.getPartOfThemeProps('StepDot', { props: { orientation, isFirst, size } })
      );
      return (
        <DotContainer themeProps={dotThemeProps}>
          {this.matcLine()}
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
        {this.matcLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matcLine() {
    const { stepType, isFirst, orientation } = this.props;
    if (isFirst) {
      return null;
    }
    const theThemeProps = this.props.getPartOfThemeProps('StepInnerContainer', {
      props: {
        isFirst,
        stepType,
        orientation,
      },
    });

    if (stepType === 'icon' || stepType === 'dot') {
      return (
        <OtherLineContainer
          themeProps={this.props.getPartOfThemeProps('LineContainer', {
            props: { orientation, isFirst },
          })}
        >
          {this.getOtherLine()}
        </OtherLineContainer>
      );
    }
    return (
      <SimpleLineContainer themeProps={theThemeProps}>{this.getSimpleLine()}</SimpleLineContainer>
    );
  }

  getSimpleLine() {
    const { isDashed, stepType, orientation } = this.props;
    const { stepStatus } = this.state;
    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
    );
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepLine', {
        props: {
          orientation,
          isDashed,
          stepType,
          stepStatus,
        },
      })
    );
    if (stepType === 'flat') {
      if (stepStatus === 'wait' || stepStatus === 'next') {
        return <FlatLine themeProps={theThemeProps} />;
      }
      return <NormalFlatLine themeProps={theThemeProps} />;
    }
    return <Line themeProps={theThemeProps} />;
  }
  getOtherLine() {
    const { isDashed, stepType, orientation } = this.props;
    const { stepStatus } = this.state;
    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
    );
    const theThemeProps = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('StepLine', {
        props: {
          orientation,
          isDashed,
          stepType,
          stepStatus,
        },
      })
    );
    if (stepType === 'dot') {
      return <DotLine themeProps={theThemeProps} />;
    }
    return <Line themeProps={theThemeProps} />;
  }

  getIcon(stepStatus: StepStatus): string {
    return stepStatus === 'finish'
      ? 'lugia-icon-reminder_check'
      : stepStatus === 'error'
      ? 'lugia-icon-reminder_close'
      : '';
  }
  getStepBackgroundColor(stepStatus: StepStatus, stepType: StepType) {
    const color =
      (stepStatus === 'finish' || stepStatus === 'process') && stepType === 'flat'
        ? lightThemeColor
        : stepStatus === 'process'
        ? themeColor
        : stepStatus === 'error' && stepType === 'flat'
        ? dangerColor
        : defaultColor;
    return color;
  }
  getStep() {
    const { icon, stepType, size, orientation } = this.props;
    const { stepStatus } = this.state;
    const theIcon = this.getIcon(stepStatus);
    if (stepType === 'flat' || stepType === 'simple') {
      const innerContainerThemeProps = this.props.getPartOfThemeProps('StepInnerContainer', {
        props: {
          stepType,
          size,
          orientation,
          stepStatus,
        },
      });

      const boxShadowConfig =
        stepType === 'flat' && (stepStatus === 'wait' || stepStatus === 'next')
          ? this.getThemeNormalConfig({
              boxShadow: getBoxShadow('0 0 2 rgba(104, 79, 255,0.3) inset'),
            })
          : {};

      const borderConfig =
        stepType !== 'flat'
          ? this.getThemeNormalConfig({
              border: getBorder({
                color: this.getStepStatusColor(stepStatus, stepType),
                width: 1,
                style: 'solid',
              }),
            })
          : {};
      const innerThemeProps = deepMerge(
        boxShadowConfig,
        borderConfig,
        this.getThemeNormalConfig(
          this.getThemeColorConfig('background', this.getStepBackgroundColor(stepStatus, stepType))
        ),
        this.props.getPartOfThemeProps('StepInnerContainer', {
          props: {
            stepType,
            size,
            orientation,
            stepStatus,
          },
        })
      );
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
                  fontSize: 18,
                };
              },
            },
          },
        },
        iconThemeProps
      );
      return (
        <StepInnerContainer themeProps={innerContainerThemeProps}>
          <StepInner
            themeProps={innerThemeProps}
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
              singleTheme
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
                  : stepStatus === 'finish'
                  ? successColor
                  : stepStatus === 'process' || stepStatus === 'next'
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
            singleTheme
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
        this.getThemeNormalConfig({ color: defaultColor }),
        this.props.getPartOfThemeProps('StepNumber', { props: { size } })
      );
      return (
        <StepNumber size={size} themeProps={stepNumberThemeProps}>
          {theStepNumber}
        </StepNumber>
      );
    }
    return null;
  }
  getThemeNormalConfig(normalConfig: Object) {
    return { themeConfig: { normal: normalConfig } };
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
