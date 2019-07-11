/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import type { AlignType, StepType, OrientationType, SizeType } from '../css/steps';
import Step from './step';
import { getAttributeFromObject } from '../common/ObjectUtils';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { units } from '@lugia/css';

const { px2remcss } = units;

const OutContainer = CSSComponent({
  tag: 'div',
  className: 'StepOutContainer',
  normal: {
    selectNames: [['width']],
    getThemeMeta(themeMeta, themeProps) {
      const { width } = themeMeta;
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const theWidth =
        orientation === 'vertical' ? '' : width && width > 0 ? px2remcss(width) : px2remcss(500);
      return { width: theWidth };
    },
  },
  css: css`
    display: inline-block;
    position: relative;
    font-size: 1.2rem;
  `,
});

const HStepsOutContainer = CSSComponent({
  tag: 'div',
  className: 'HStepsOutContainer',
  normal: {
    selectNames: [['width']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { orientation } = propsConfig;
      const direction = orientation === 'horizontal' ? 'row' : 'column';
      return ` flex-direction: ${direction};`;
    },
  },
  css: css`
    font-variant: tabular-nums;
    box-sizing: border-box;
    list-style: none;
    display: flex;
  `,
});

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
  themeProps: Object,
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
    const { orientation } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('StepsContainer', {
      props: {
        orientation,
      },
    });
    return (
      <OutContainer
        themeProps={theThemeProps}
        orientation={orientation}
        viewClass={'stepsContainer'}
      >
        {this.getHSteps()}
      </OutContainer>
    );
  }

  getHSteps() {
    const { orientation, stepType } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('StepsContainer', {
      props: {
        orientation,
      },
    });
    return (
      <HStepsOutContainer orientation={orientation} stepType={stepType} themeProps={theThemeProps}>
        {this.getChildren()}
      </HStepsOutContainer>
    );
  }
  getStepsConfig(child: Object, i: number) {
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

  data2Step(data: Array<Object>) {
    return data.map((child, i) => {
      return this.getStep(child, i);
    });
  }

  getStep(child: Object, i: number) {
    return <Step {...this.getStepsConfig(child, i)} />;
  }
}

const TargetSteps = ThemeProvider(KeyBoardEventAdaptor(Steps), Widget.Steps);
export default TargetSteps;
