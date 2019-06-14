/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import { toNumber } from '../common/NumberUtils';
import {
  AllItemsContainer,
  CarouselContainer,
  Indicator,
  IndicatorContainer,
  IndicatorWrap,
  ItemWrap,
  NextButton,
  PreButton,
  SwitchIcon,
  Wrap,
  Empty,
  defaultWidth,
  defaultHeight,
  defaultButtonFontSize,
} from '../css/carousel';
import { limit } from '../common/Math';

const defaultDelay = 4000;
const defaultAnimationTime = 500;
type IndicatorType = 'horizontal' | 'vertical' | 'outside';
type SwitchType = 'horizontal' | 'vertical' | 'fade';
type clickButtonType = 'pre' | 'next';
type CarouselProps = {
  children?: React.Node[],
  getTheme?: Function,
  start?: number,
  defaultStart?: number,
  autoPlay?: boolean,
  onChange?: Function,
  delay?: number,
  action?: 'hover' | 'click',
  indicatorType?: IndicatorType,
  switchType?: SwitchType,
  animationTime?: number,
  indicator: boolean,
  switchButton: boolean,
};

type CarouselState = {
  start: number,
};

export const getInitStart = (props: CarouselProps, start: number): number => {
  const { children } = props;
  if (!children || children.length === 0) {
    return 0;
  }
  const len = children.length;
  start = toNumber(start, 0);
  start = start > len ? 0 : start;
  return limit(start, [0, len]);
};

export const isHasStart = (props: CarouselProps): boolean => {
  return 'start' in props;
};
export default class Carousel extends React.Component<any, CarouselProps> {
  static defaultProps = {
    getTheme: () => {},
    defaultStart: 0,
    autoPlay: true,
    delay: 3000,
    action: 'hover',
    indicator: true,
    switchButton: true,
    indicatorType: 'horizontal',
    switchType: 'horizontal',
    animationTime: defaultAnimationTime,
  };
  clickDisabled: boolean;
  preStart: any;
  interval: any;
  animationTime: number;
  width: number;
  height: number;
  preButtonFontSize: number;
  nextButtonFontSize: number;

  constructor(props: CarouselProps) {
    super(props);
    this.clickDisabled = false;
    this.preStart = toNumber(props.start, 0);
    this.animationTime = this.getAnimationTime() / 1000;
    this.initWidthAndHeight();
    this.initSwitchButtonFontSize();
  }

  static getDerivedStateFromProps(props: CarouselProps, state: CarouselState) {
    const { start = 0, defaultStart } = props;

    if (isHasStart(props)) {
      return { start: getInitStart(props, start) };
    }
    if (!state) {
      return { start: defaultStart };
    }
  }

  initWidthAndHeight() {
    const { normal = {} } = this.props.getPartOfThemeConfig('CarouselWrap');
    const { width = defaultWidth, height = defaultHeight } = normal;
    this.width = toNumber(width, defaultWidth);
    this.height = toNumber(height, defaultHeight);
  }

  initSwitchButtonFontSize() {
    const { getPartOfThemeConfig } = this.props;
    const { normal: PreButtonNormal = {} } = getPartOfThemeConfig('PreButton');
    const { normal: NextButtonNormal = {} } = getPartOfThemeConfig('NextButton');
    const { fontSize: preButtonFontSize = defaultButtonFontSize } = PreButtonNormal;
    const { fontSize: nextButtonFontSize = defaultButtonFontSize } = NextButtonNormal;
    this.preButtonFontSize = toNumber(preButtonFontSize, defaultButtonFontSize);
    this.nextButtonFontSize = toNumber(nextButtonFontSize, defaultButtonFontSize);
  }

  initPropsConfig = () => {
    const { state, props } = this;

    const { start: nextStart } = state;
    const { children, themeProps, indicatorType, switchType, start: initStart } = props;
    const len = children ? children.length : 0;
    const animationTime = this.animationTime;
    const preStart = this.preStart;
    themeProps.propsConfig = {
      indicatorType,
      animationTime,
      switchType,
      initStart,
      preStart,
      nextStart,
      len,
    };
  };

  addPropsConfig(themeProps: Object, propsConfig: Object) {
    const newThemeProps = { ...themeProps };

    newThemeProps.propsConfig = propsConfig;
    return newThemeProps;
  }

  render() {
    this.initPropsConfig();
    const { getPartOfThemeProps, indicatorType, indicator, switchButton } = this.props;
    const WrapThemeProps = this.addPropsConfig(getPartOfThemeProps('CarouselWrap'), {
      indicatorType,
      preButtonFontSize: this.preButtonFontSize,
      nextButtonFontSize: this.nextButtonFontSize,
    });

    return (
      <Wrap themeProps={WrapThemeProps}>
        <CarouselContainer themeProps={WrapThemeProps}>
          {switchButton ? this.getSwitchButton() : null}
          {this.getItems()}
        </CarouselContainer>
        {this.getIndicatros(indicatorType, indicator)}
      </Wrap>
    );
  }

  getIndicatros(indicatorType: IndicatorType, isRenderIndicator: boolean) {
    const indicators = this.createIndicators();
    return isRenderIndicator ? indicators : null;
  }

  getSwitchButton = () => {
    const {
      indicatorType,
      children,
      themePorps,
      getPartOfThemeProps,
      getPartOfThemeHocProps,
    } = this.props;
    if (!children || children.length === 0 || indicatorType === 'vertical') {
      return null;
    }
    const PreButtonThemeProps = getPartOfThemeProps('PreButton');
    const { theme: preTheme, viewClass: preViewClass } = getPartOfThemeHocProps('PreButton');

    const preItem = (
      <PreButton onClick={this.preClick} theme={preTheme} viewClass={preViewClass}>
        <SwitchIcon
          themeProps={PreButtonThemeProps}
          iconClass={'lugia-icon-direction_left_circle'}
        />
      </PreButton>
    );

    const NextButtonThemeProps = getPartOfThemeProps('NextButton');

    const { theme: nextTheme, viewClass: nextViewClass } = getPartOfThemeHocProps('NextButton');

    const NextItem = (
      <NextButton onClick={this.nextClick} theme={nextTheme} viewClass={nextViewClass}>
        <SwitchIcon
          themeProps={NextButtonThemeProps}
          iconClass={'lugia-icon-direction_right_circle'}
        />
      </NextButton>
    );

    return [preItem, NextItem];
  };

  getAnimationTime(): number {
    const { animationTime = defaultAnimationTime } = this.props;
    return limit(toNumber(animationTime, defaultAnimationTime), [200, 100000]);
  }

  createIndicators = () => {
    let items = [];
    const { indicatorType, children, getPartOfThemeProps, getPartOfThemeHocProps } = this.props;
    if (children) {
      const { start } = this.state;
      const length = children.length;
      items = children.map((item, index) => {
        const checked = start === index || (index === 0 && start === length);

        const IndicatorThemeProps = this.addPropsConfig(getPartOfThemeProps('Indicator'), {
          indicatorType,
          checked,
          animationTime: this.animationTime,
        });

        return (
          <IndicatorContainer
            themeProps={IndicatorThemeProps}
            onMouseEnter={this.handleMouseEnterIndicator.bind(this, index)}
            onClick={this.handleClickIndicator.bind(this, index)}
          >
            <Indicator themeProps={IndicatorThemeProps} key={index} />
          </IndicatorContainer>
        );
      });
    }
    const IndicatorContainerThemeProps = this.addPropsConfig(getPartOfThemeProps('Indicator'), {
      indicatorType,
      width: this.width,
      height: this.height,
    });
    return <IndicatorWrap themeProps={IndicatorContainerThemeProps}>{items}</IndicatorWrap>;
  };

  handleMouseEnterIndicator(index: number) {
    const { action } = this.props;
    if (action !== 'hover') {
      return;
    }
    this.changeIndicatorState(index);
  }

  handleClickIndicator(index: number) {
    const { action } = this.props;
    if (action === 'hover') {
      return;
    }
    this.changeIndicatorState(index);
  }

  preClick = () => {
    this.clickSwitchButton('pre');
  };

  nextClick = () => {
    this.clickSwitchButton('next');
  };

  changeIndicatorState = (index: number) => {
    this.resetHandleAutoPlay(this.props);
    const { state, props } = this;
    const { start } = state;
    const len = props.children.length;
    if (index === start || (start === len && index === 0)) {
      return;
    }
    this.preStart = start === len ? 0 : start;
    this.setStart(index);
  };

  clickSwitchButton = (clickButtonType: clickButtonType) => {
    if (this.clickDisabled) {
      return;
    }
    this.clickDisabled = true;
    this.resetHandleAutoPlay(this.props);
    const { state, props } = this;
    const { children = [] } = props;
    const { start = 0 } = state;
    const len = children.length;
    const { newStart, preStart } = this.getPreStart(clickButtonType, start, len);
    this.preStart = preStart;
    this.setStart(newStart);

    setTimeout(() => {
      this.clickDisabled = false;
    }, this.animationTime);
  };

  getPreStart(
    clickButtonType: clickButtonType,
    start: number,
    len: number
  ): { preStart: number, newStart: number } {
    if (clickButtonType === 'pre') {
      const preStart = start === 0 ? len : start;
      return { preStart, newStart: preStart - 1 };
    }
    const preStart = start === len ? 0 : start;
    return { preStart, newStart: preStart + 1 };
  }

  setStart(start: number) {
    const { onChange } = this.props;
    onChange &&
      onChange({
        newValue: start,
        oldValue: this.state.start,
      });
    if (!isHasStart(this.props)) {
      this.setState({
        start,
      });
    }
  }

  getItems = () => {
    const { children, getPartOfThemeProps } = this.props;
    const EmptyThemeProps = getPartOfThemeProps('CarouselWrap');
    if (!children || children.length === 0) {
      return <Empty themeProps={EmptyThemeProps}>暂无切换框</Empty>;
    }
    const { start: nextStart } = this.state;
    const { start: initStart, switchType } = this.props;
    const len = children.length;
    const WrapThemeProps = this.addPropsConfig(EmptyThemeProps, {
      len,
      switchType,
      initStart,
      nextStart,
      width: this.width,
      height: this.height,
      preStart: this.preStart,
      animationTime: this.animationTime,
    });

    return (
      <AllItemsContainer themeProps={WrapThemeProps} initStart={initStart}>
        {this.getChildren(children)}
      </AllItemsContainer>
    );
  };

  getChildren = (children: Array<Object>): Array<Object> => {
    const { props, state } = this;
    const { switchType } = props;
    const { start = 0 } = state;
    if (!children || children.length === 0) {
      return [];
    }

    const items = children.map((item, index) => {
      return this.getItemWrap({
        switchType,
        start,
        index,
        item,
      });
    });
    items.push(
      this.getItemWrap({
        switchType,
        start,
        index: children.length,
        item: children[0],
      })
    );
    return items;
  };

  getItemWrap(param: { switchType: SwitchType, start: number, index: number, item: any }) {
    const { switchType, start, index, item } = param;
    const checked = start === index;
    const ItemWrapThemeProps = this.addPropsConfig(this.props.getPartOfThemeProps('CarouselWrap'), {
      checked,
      switchType,
      width: this.width,
      height: this.height,
      animationTime: this.animationTime,
    });

    return <ItemWrap themeProps={ItemWrapThemeProps}>{item}</ItemWrap>;
  }

  componentDidMount() {
    this.handleAutoPlay(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  resetHandleAutoPlay(props: CarouselProps) {
    clearInterval(this.interval);
    this.handleAutoPlay(props);
  }

  handleAutoPlay = (props: CarouselProps) => {
    const { autoPlay } = props;
    if (!autoPlay) {
      return;
    }
    const { delay } = props;
    const delayNumber = toNumber(delay, defaultDelay);
    this.interval = setInterval(() => {
      this.nextClick();
    }, delayNumber);
  };
}
