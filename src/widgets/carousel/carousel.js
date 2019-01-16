/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
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
    indicatorType: 'horizontal',
    switchType: 'horizontal',
    animationTime: defaultAnimationTime,
  };
  clickDisabled: boolean;
  preStart: any;
  interval: any;

  constructor(props: CarouselProps) {
    super(props);
    this.clickDisabled = false;
    this.preStart = toNumber(props.start, 0);
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

  render() {
    const { width, height } = this.getShadowWidthAndHeight();
    const { indicatorType } = this.props;

    return (
      <Wrap width={width} height={height} indicatorType={indicatorType}>
        <CarouselContainer height={height} width={width}>
          {this.getSwitchButton()}
          {this.getItems()}
          {this.getIndicatros(indicatorType, false)}
        </CarouselContainer>
        {this.getIndicatros(indicatorType, true)}
      </Wrap>
    );
  }

  getIndicatros(indicatorType: IndicatorType, targetValue: boolean) {
    const isIndicatorAtOutSide = indicatorType === 'outside';
    const indicators = this.createIndicators();
    return isIndicatorAtOutSide === targetValue ? indicators : null;
  }

  getSwitchButton = () => {
    const { indicatorType, children } = this.props;
    if (!children || children.length === 0 || indicatorType === 'vertical') {
      return null;
    }
    const preItem = (
      <PreButton onClick={this.preClick}>
        <SwitchIcon iconClass={'lugia-icon-direction_left_circle'} />
      </PreButton>
    );

    const NextItem = (
      <NextButton onClick={this.nextClick}>
        <SwitchIcon iconClass={'lugia-icon-direction_right_circle'} />
      </NextButton>
    );

    return [preItem, NextItem];
  };

  getAnimationTime(props: CarouselProps): number {
    const { animationTime = defaultAnimationTime } = props;
    return limit(toNumber(animationTime, defaultAnimationTime), [200, 100000]);
  }

  createIndicators = () => {
    let items = [];
    const { indicatorType, children } = this.props;
    if (children) {
      const { start } = this.state;
      const length = children.length;
      const animationTime = this.getAnimationTime(this.props) / 1000;
      items = children.map((item, index) => {
        const checked = start === index || (index === 0 && start === length);
        return (
          <IndicatorWrap
            indicatorType={indicatorType}
            onMouseEnter={this.handleMouseEnterIndicator.bind(this, index)}
            onClick={this.handleClickIndicator.bind(this, index)}
          >
            <Indicator
              animationTime={animationTime}
              indicatorType={indicatorType}
              key={index}
              checked={checked}
            />
          </IndicatorWrap>
        );
      });
    }

    return <IndicatorContainer indicatorType={indicatorType}>{items}</IndicatorContainer>;
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
    }, this.getAnimationTime(props));
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
    const { children, switchType } = this.props;
    if (!children || children.length === 0) {
      return <Empty>暂无切换框</Empty>;
    }
    const { start: nextStart } = this.state;
    const { start: initStart } = this.props;
    const len = children.length;
    const isVertical = switchType === 'vertical';
    const isFade = switchType === 'fade';
    const { width, height } = this.getShadowWidthAndHeight();
    const activeWidth = isVertical || isFade ? width : (len + 1) * width;
    const activeHeight = isVertical ? (len + 1) * height : height;
    const animationTime = this.getAnimationTime(this.props) / 1000;
    return (
      <AllItemsContainer
        animationTime={animationTime}
        width={width}
        height={height}
        activeWidth={activeWidth}
        activeHeight={activeHeight}
        switchType={switchType}
        nextStart={nextStart}
        initStart={initStart}
        preStart={this.preStart}
      >
        {this.getChildren(children)}
      </AllItemsContainer>
    );
  };

  getChildren = (children: string[]) => {
    const { props, state } = this;
    const { switchType } = props;
    const { start = 0 } = state;
    const { width, height } = this.getShadowWidthAndHeight();
    const animationTime = this.getAnimationTime(props) / 1000;
    if (!children || children.length === 0) {
      return [];
    }

    const items = children.map((item, index) => {
      return this.getItemWrap({
        switchType,
        start,
        index,
        width,
        height,
        item,
        animationTime,
      });
    });
    items.push(
      this.getItemWrap({
        switchType,
        start,
        index: children.length,
        width,
        height,
        item: children[0],
        animationTime,
      })
    );
    return items;
  };

  getItemWrap(param: {
    switchType: SwitchType,
    start: number,
    index: number,
    width: number,
    height: number,
    item: any,
    animationTime: number,
  }) {
    const { switchType, start, index, width, height, item, animationTime } = param;
    return (
      <ItemWrap
        switchType={switchType}
        checked={start === index}
        width={width}
        height={height}
        animationTime={animationTime}
      >
        {item}
      </ItemWrap>
    );
  }

  getShadowWidthAndHeight = () => {
    const { getTheme } = this.props;
    const theme = getTheme();
    const { width = defaultWidth, height = defaultHeight } = theme;
    return { width, height };
  };

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
