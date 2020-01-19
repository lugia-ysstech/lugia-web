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
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import changeColor from '../css/utilsColor';

const {
  themeColor,
  blackColor,
  darkGreyColor,
  successColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
} = colorsFunc();
const lightThemeColor = changeColor(themeColor, 20).rgb;

const { px2remcss } = units;

export const isHorizontal = (orientation: OrientationType): boolean => {
  return orientation === 'horizontal';
};
const isNormalSize = (size: 'normal' | 'mini'): boolean => {
  return size === 'normal';
};

const isDotType = (stepType: StepType): boolean => {
  return stepType === 'dot';
};

const isFlatType = (stepType: StepType): boolean => {
  return stepType === 'flat';
};

const getSize = (
  isWidth: boolean,
  value: number | string,
  orientation: OrientationType,
  defaultValue: number | string
): number | string => {
  if (value) {
    return value;
  }
  const widthAndHorizontal = isWidth ? isHorizontal(orientation) : !isHorizontal(orientation);
  return widthAndHorizontal ? '100%' : defaultValue;
};

const StepOutContainer = CSSComponent({
  tag: 'div',
  className: 'StepOutContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, orientation } = propsConfig;
      const { width, height } = themeMeta;
      const type = isHorizontal(orientation) ? 'width' : 'height';
      let theSize;
      if (type === 'width') {
        theSize = width ? width : isNormalSize(size) ? 212 : 204;
      } else {
        theSize = height ? height : isNormalSize(size) ? 82 : 74;
      }
      return {
        [type]: theSize,
      };
    },
  },
  css: css`
    display: inline-flex;
    position: relative;
    cursor: pointer;
  `,
});

const BaseText = CSSComponent({
  tag: 'div',
  className: 'StepBaseText',
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
    position: absolute;
    white-space: normal;
    display: block;
    word-break: keep-all;
  `,
});

const Title = CSSComponent({
  extend: BaseText,
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
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, stepType, orientation, desAlign } = propsConfig;
      let dirCSS = '';
      let positionCSS = '';
      const top = isDotType(stepType) || stepType === 'icon' ? -20 : isNormalSize(size) ? -20 : -25;
      const left = isDotType(stepType) ? 20 : isNormalSize(size) ? 35 : 30;
      if (isHorizontal(orientation)) {
        dirCSS = `bottom:${px2remcss(top)};`;
      } else {
        positionCSS = `transform: translateY(-50%);top:50%;left:${px2remcss(left)};`;
      }
      const alignCSS = `text-align:${desAlign && desAlign === 'center' ? 'center' : 'left'};`;
      return `${dirCSS}${positionCSS}${alignCSS}`;
    },
    defaultTheme: {
      fontSize: 14,
    },
  },
  css: css`
    white-space: nowrap;
  `,
});

const Description = CSSComponent({
  extend: BaseText,
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
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size, stepType, orientation, stepContainerWidth, desAlign } = propsConfig;
      let top = 0;
      let left = 0;
      let maxWidthCSS;
      if (isHorizontal(orientation)) {
        top = isDotType(stepType) ? 35 : stepType === 'icon' ? 45 : isNormalSize(size) ? 50 : 40;
        const maxWidth =
          stepContainerWidth && stepContainerWidth > 220 ? stepContainerWidth - 15 : 200;
        maxWidthCSS = `max-width:${px2remcss(maxWidth)};`;
      } else {
        top = isDotType(stepType) ? 15 : isNormalSize(size) ? 25 : 25;
        left = isDotType(stepType) ? 20 : isNormalSize(size) ? 35 : 30;
      }
      const topCSS = `top:${px2remcss(top)};`;
      const leftPosition = !isHorizontal(orientation) ? `left:${px2remcss(left)};` : '';
      const alignCSS = `text-align:${desAlign && desAlign === 'center' ? 'center' : 'left'};`;
      return `${topCSS}${leftPosition}${maxWidthCSS}${alignCSS}`;
    },
    defaultTheme: {
      fontSize: 12,
    },
  },
  css: css`
    white-space: inherit;
    overflow: hidden;
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
      const padding = isFlatType(stepType) ? 0 : px2remcss(6);
      let hSize = padding;
      let vSize = 0;
      if (isHorizontal(orientation)) {
        hSize = 0;
        vSize = padding;
      }
      const display = isFirst ? 'width:0;' : 'flex: 1;';
      return `padding: ${hSize} ${vSize};${display}`;
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const { width, height } = themeMeta;
      const theWidth = getSize(true, width, orientation, 32);
      const theHeight = getSize(false, height, orientation, 32);

      return {
        width: theWidth,
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
const SimpleLineContainer = CSSComponent({
  tag: 'div',
  className: 'StepSimpleLineContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { isFirst, orientation } = propsConfig;
      const padding = px2remcss(6);
      let hSize = padding;
      let vSize = 0;
      if (isHorizontal(orientation)) {
        hSize = 0;
        vSize = padding;
      }
      const display = isFirst ? 'width:0;' : 'flex: 1;';
      return `padding: ${hSize} ${vSize};${display}`;
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const { width, height } = themeMeta;
      const lineWith = isHorizontal(orientation) ? '50%' : '100%';
      const theWidth = getSize(true, width, orientation, lineWith);
      const theHeight = getSize(false, height, orientation, lineWith);

      return {
        width: theWidth,
        height: theHeight,
      };
    },
  },
  css: css`
    display: inline-flex;
    position: relative;
  `,
});
const SimpleLine = CSSComponent({
  tag: 'div',
  className: 'StepSimpleLine',
  normal: {
    selectNames: [['width'], ['height'], ['border']],
    getThemeMeta(themeMeta, themeProps) {
      const { background = {} } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation, isDashed } = propsConfig;
      const styled = isDashed ? 'dashed' : 'solid';
      const direction = isHorizontal(orientation) ? 'bottom' : 'left';
      const { height, width } = themeMeta;
      const theWidth = getSize(true, width, orientation, 1);
      const theHeight = getSize(false, height, orientation, 1);

      const size = isHorizontal(orientation) ? theHeight : theWidth;
      const theSize = orientation => {
        return isHorizontal(orientation) ? { width: theWidth } : { height: theHeight };
      };
      return {
        ...theSize(orientation),
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
      const theWidth = getSize(true, width, orientation, 6);
      const theHeight = getSize(false, height, orientation, 6);
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
        const beforeDirection = isHorizontal(orientation) ? 'top' : 'left';
        const HAfterDirection = before ? 'left' : 'right';
        const VAfterDirection = before ? 'top' : 'bottom';
        const afterDirection = isHorizontal(orientation) ? HAfterDirection : VAfterDirection;
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
      const theWidth = getSize(true, width, orientation, 6);
      const theHeight = getSize(false, height, orientation, 6);
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
      const theSize = fontSize ? fontSize : isNormalSize(size) ? 32 : 24;
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
      const theFontSize = font && font.size ? font.size : isNormalSize(size) ? 20 : 12;
      const theFontWeight = font && font.weight ? font.weight : 700;
      return {
        font: {
          weight: theFontWeight,
          size: theFontSize,
        },
      };
    },
  },
  css: css`
    display: inLine-block;
    user-select: none;
    text-align: center;
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
          theSize = isNormalSize(size) ? 32 : 24;
          break;
        case 'next':
        case 'wait':
          theSize =
            isNormalSize(size) && isFlatType(stepType)
              ? 32
              : size === 'mini' && isFlatType(stepType)
              ? 24
              : isNormalSize(size)
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
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: auto;
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
      const direction = isHorizontal(orientation) ? 'row' : 'column';
      return `flex-direction: ${direction};`;
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
      const direction = isHorizontal(orientation) ? 'row' : 'column';
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
      const { size } = propsConfig;
      const theSize = isNormalSize(size) ? 32 : 24;
      const theWidth = width ? width : theSize;
      const theHeight = height ? height : theSize;
      return {
        width: theWidth,
        height: theHeight,
      };
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation, stepStatus, stepType, desAlign } = propsConfig;
      const position = isHorizontal(orientation)
        ? 'align-items: center;top: 50%;transform: translateY(-50%);'
        : 'justify-content: center;';
      const center = desAlign === 'center' ? 'justify-content: center;' : '';
      const index =
        isFlatType(stepType) && (stepStatus === 'wait' || stepStatus === 'next') ? 9 : 11;
      return `z-index: ${index};${position};${center};`;
    },
  },
});
const DotInnerContainer = CSSComponent({
  extend: BaseInnerContainer,
  className: 'StepDotInnerContainer',
  normal: {
    selectNames: [['width'], ['height']],
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
  getChildWidths: Function,
};

class Step extends React.Component<StepProps, StepState> {
  static defaultProps = {};
  static displayName = Widget.Step;

  constructor(props: StepProps) {
    super(props);
    this.title = React.createRef();
    this.desc = React.createRef();
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

  getThemeByPartName(partName: string) {
    const { getPartOfThemeProps } = this.props;
    const { stepStatus } = this.state;
    let theme;
    switch (stepStatus) {
      case 'finish':
        theme = getPartOfThemeProps(`Finish${partName}`);
        break;
      case 'process':
        theme = getPartOfThemeProps(`Process${partName}`);
        break;
      case 'next':
        theme = getPartOfThemeProps(`Next${partName}`);
        break;
      case 'error':
        theme = getPartOfThemeProps(`Error${partName}`);
        break;
      case 'wait':
      default:
        theme = getPartOfThemeProps(`Wait${partName}`);
        break;
    }
    return theme;
  }

  componentDidMount() {
    if (this.title.current) {
      this.titleHeight = this.title.current.offsetHeight;
      this.titleWidth = this.title.current.offsetWidth;
    }
    if (this.desc.current) {
      this.descHeight = this.desc.current.offsetHeight;
      this.descWidth = this.desc.current.offsetWidth;
    }

    const { getChildWidths } = this.props;
    getChildWidths &&
      getChildWidths({
        titleWidth: this.titleWidth,
        titleHeight: this.titleHeight,
        descWidth: this.descWidth,
        descHeight: this.descHeight,
      });
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
    const theThemeProps = this.getThemeByPartName('StepOutContainer');
    const {
      themeConfig: { normal },
    } = theThemeProps;
    if (normal && normal.width) {
      this.stepContainerWidth = normal.width;
    }
    theThemeProps.propsConfig = {
      size,
      orientation,
    };
    const stepOutThemeProps = deepMerge(resultTheme, theThemeProps);

    return (
      <StepOutContainer themeProps={stepOutThemeProps}>{this.getStepContainer()}</StepOutContainer>
    );
  }

  getThemeColorConfig(CSSType: string, color: string): Object {
    return CSSType === 'background' ? { background: { color } } : { color };
  }

  getStepFontColor(stepStatus: StepStatus, stepType: StepType, type: string) {
    let resultConfigColor;
    switch (stepStatus) {
      case 'error':
        const errorColor = dangerColor;
        resultConfigColor = errorColor;
        break;
      case 'finish':
        const finishColor = isFlatType(stepType)
          ? lightThemeColor
          : type === 'desc'
          ? darkGreyColor
          : blackColor;
        resultConfigColor = finishColor;
        break;
      case 'process':
        const processColor = type === 'desc' ? darkGreyColor : blackColor;
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
        const finishColor = isFlatType(stepType) ? lightThemeColor : successColor;
        resultConfigColor = finishColor;
        break;
      case 'process':
        const processColor = isFlatType(stepType) ? lightThemeColor : themeColor;
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

    const type = isHorizontal(orientation) ? 'width' : 'height';
    const theSize =
      isDotType(stepType) && isFirst
        ? 12
        : isNormalSize(size) && isFirst
        ? 32
        : size === 'mini' && isFirst
        ? 24
        : '100%';

    const stepContainerTheme = {
      themeConfig: {
        normal: {
          [type]: theSize,
        },
      },
    };
    const theThemeProps = this.getThemeByPartName('StepContainer');
    theThemeProps.propsConfig = { isFirst };
    const finalThemeProps = deepMerge(stepContainerTheme, theThemeProps);
    return <StepHeadContainer themeProps={finalThemeProps}>{this.getStepHead()}</StepHeadContainer>;
  }

  getDesc() {
    const { description, size, stepType, orientation, desAlign } = this.props;
    const { stepStatus } = this.state;
    if (description && description !== undefined) {
      const resultTheme = this.getThemeNormalConfig(
        this.getThemeColorConfig('color', this.getStepFontColor(stepStatus, stepType, 'desc'))
      );
      const theThemeProps = this.getThemeByPartName('StepDescription');

      theThemeProps.propsConfig = {
        size,
        stepType,
        orientation,
        desAlign,
        stepContainerWidth: this.stepContainerWidth,
      };

      const desThemeProps = deepMerge(resultTheme, theThemeProps);

      return (
        <Description ref={this.desc} themeProps={desThemeProps}>
          {description}
        </Description>
      );
    }
    return null;
  }

  getTitle() {
    const { title, size, orientation, stepType, desAlign } = this.props;
    const { stepStatus } = this.state;
    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('color', this.getStepFontColor(stepStatus, stepType))
    );
    const theThemeProps = this.getThemeByPartName('StepTitle');
    theThemeProps.propsConfig = {
      size,
      stepType,
      orientation,
      desAlign,
    };
    const titleThemeProps = deepMerge(resultTheme, theThemeProps);
    return (
      <Title ref={this.title} themeProps={titleThemeProps}>
        {title}
      </Title>
    );
  }

  getStepHead() {
    const { stepType, orientation } = this.props;
    const { stepStatus } = this.state;

    const theThemeProps = this.getThemeByPartName('StepContainer');
    theThemeProps.propsConfig = {
      orientation,
    };
    const dotThemeProps = this.getThemeByPartName('StepDot');
    dotThemeProps.propsConfig = {
      orientation,
    };

    if (isDotType(stepType)) {
      const resultTheme = this.getThemeNormalConfig(
        this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
      );
      const theDotThemeProps = deepMerge(resultTheme, dotThemeProps);
      return (
        <DotContainer themeProps={theDotThemeProps}>
          {this.matchLine()}
          <DotInnerContainer themeProps={theDotThemeProps}>
            <Dot themeProps={theDotThemeProps} />
            {this.getTitle()}
            {this.getDesc()}
          </DotInnerContainer>
        </DotContainer>
      );
    }

    return (
      <StepContainer themeProps={theThemeProps}>
        {this.matchLine()}
        {this.getStep()}
      </StepContainer>
    );
  }

  matchLine() {
    const { stepType, isFirst, orientation } = this.props;
    if (isFirst) {
      return null;
    }

    const theThemeProps = this.getThemeByPartName('StepLine');
    theThemeProps.propsConfig = {
      isFirst,
      stepType,
      orientation,
    };

    return isFlatType(stepType) ? (
      <FlatLineContainer themeProps={theThemeProps}>{this.getFlatLine()}</FlatLineContainer>
    ) : (
      <SimpleLineContainer themeProps={theThemeProps}>{this.getSimpleLine()}</SimpleLineContainer>
    );
  }

  getFlatLine() {
    const { isDashed, stepType, orientation } = this.props;
    const { stepStatus } = this.state;
    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
    );
    const theThemeProps = this.getThemeByPartName('StepFlatLine');
    theThemeProps.propsConfig = {
      orientation,
      isDashed,
      stepType,
      stepStatus,
    };

    const finalThemeProps = deepMerge(resultTheme, theThemeProps);
    if (stepStatus === 'wait' || stepStatus === 'next') {
      return <FlatLine themeProps={finalThemeProps} />;
    }
    return <NormalFlatLine themeProps={finalThemeProps} />;
  }
  getSimpleLine() {
    const { isDashed, stepType, orientation } = this.props;
    const { stepStatus } = this.state;
    const resultTheme = this.getThemeNormalConfig(
      this.getThemeColorConfig('background', this.getStepStatusColor(stepStatus, stepType))
    );
    const theThemeProps = this.getThemeByPartName('StepLine');
    theThemeProps.propsConfig = {
      orientation,
      isDashed,
      stepType,
      stepStatus,
    };
    const lineThemeProps = deepMerge(resultTheme, theThemeProps);
    return <SimpleLine themeProps={lineThemeProps} />;
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
      (stepStatus === 'finish' || stepStatus === 'process') && isFlatType(stepType)
        ? lightThemeColor
        : stepStatus === 'process'
        ? themeColor
        : stepStatus === 'error' && isFlatType(stepType)
        ? dangerColor
        : defaultColor;
    return color;
  }
  getStep() {
    const {
      icon = 'lugia-icon-financial_cloud',
      stepType,
      size,
      orientation,
      desAlign,
    } = this.props;
    const { stepStatus } = this.state;
    const theIcon = this.getIcon(stepStatus);
    if (isFlatType(stepType) || stepType === 'simple') {
      const innerContainerThemeProps = this.getThemeByPartName('StepInnerContainer');
      innerContainerThemeProps.propsConfig = {
        stepType,
        size,
        orientation,
        stepStatus,
        desAlign,
      };

      const boxShadowConfig =
        isFlatType(stepType) && (stepStatus === 'wait' || stepStatus === 'next')
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
        innerContainerThemeProps
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
                  : isFlatType(stepType)
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
          {this.getTitle()}
          {this.getDesc()}
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
                const theFontSize = fontSize ? fontSize : isNormalSize(size) ? 32 : 24;
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
          {this.getTitle()}
          {this.getDesc()}
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
    if (stepStatus === 'process') {
      const theThemeProps = this.getThemeByPartName('StepNumber');
      theThemeProps.propsConfig = { size };

      const stepNumberThemeProps = deepMerge(
        this.getThemeNormalConfig({ color: defaultColor }),
        theThemeProps
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
