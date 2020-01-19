/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { toNumber } from '../common/NumberUtils';
import { addMouseEvent } from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import {
  AllItemsContainer,
  CarouselContainer,
  Indicator,
  IndicatorContainer,
  IndicatorWrap,
  ItemWrap,
  NextButton,
  PreButton,
  Wrap,
  Empty,
  defaultWidth,
  defaultHeight,
  defaultButtonFontSize,
} from '../css/carousel';
import colorsFunc from '../css/stateColor';
import { limit } from '../common/Math';
import Icon from '../icon';
const { lightGreyColor } = colorsFunc();

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
  getPartOfThemeProps: Function,
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
    this.animationTime = this.getAnimationTime(props) / 1000;
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
    const { font: preButtonFont = {} } = PreButtonNormal;
    const { size: preButtonFontSize = defaultButtonFontSize } = preButtonFont;

    const { font: nextButtonFont = {} } = NextButtonNormal;
    const { size: nextButtonFontSize = defaultButtonFontSize } = nextButtonFont;
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

  addPropsConfig(name: string, params: Object) {
    return this.props.getPartOfThemeProps(name, { props: params });
  }

  render() {
    this.initPropsConfig();
    const channel = this.props.createEventChannel(['hover']);

    const { getPartOfThemeProps, indicatorType, indicator, switchButton } = this.props;
    const params = {
      indicatorType,
      preButtonFontSize: this.preButtonFontSize,
      nextButtonFontSize: this.nextButtonFontSize,
    };
    const WrapThemeProps = getPartOfThemeProps('CarouselWrap', { props: params });

    return (
      <Wrap themeProps={WrapThemeProps} {...addMouseEvent(this)}>
        <CarouselContainer themeProps={WrapThemeProps} lugiaConsumers={channel.consumer}>
          {switchButton ? this.getSwitchButton() : null}
          {this.getItems(channel)}
        </CarouselContainer>
        {this.getIndicatros(indicatorType, indicator)}
      </Wrap>
    );
  }

  getIndicatros(indicatorType: IndicatorType, isRenderIndicator: boolean) {
    const indicators = this.createIndicators();
    return isRenderIndicator ? indicators : null;
  }

  getSwitchTheme = (target: string) => {
    const { getPartOfThemeHocProps } = this.props;
    const { viewClass, theme } = getPartOfThemeHocProps(target);
    const { normal = {}, hover = {} } = theme[viewClass];
    normal.margin = {};
    normal.padding = {};
    hover.margin = {};
    const iconTheme = deepMerge(
      {
        [viewClass]: {
          normal: {
            font: { size: defaultButtonFontSize },
            color: lightGreyColor,
          },
        },
      },
      theme
    );

    return {
      viewClass,
      theme: iconTheme,
    };
  };

  getSwitchButton = () => {
    const { indicatorType, children, getPartOfThemeProps } = this.props;
    if (!children || children.length === 0 || indicatorType === 'vertical') {
      return null;
    }
    const PreButtonThemeProps = getPartOfThemeProps('PreButton');
    const preItem = (
      <PreButton onClick={this.preClick} themeProps={PreButtonThemeProps}>
        <Icon
          {...this.getSwitchTheme('PreButton')}
          singleTheme
          iconClass={'lugia-icon-direction_left_circle'}
        />
      </PreButton>
    );

    const NextButtonThemeProps = getPartOfThemeProps('NextButton');

    const NextItem = (
      <NextButton onClick={this.nextClick} themeProps={NextButtonThemeProps}>
        <Icon
          singleTheme
          {...this.getSwitchTheme('NextButton')}
          iconClass={'lugia-icon-direction_right_circle'}
        />
      </NextButton>
    );

    return [preItem, NextItem];
  };

  getAnimationTime(props: Object): number {
    const { animationTime = defaultAnimationTime } = props;
    return limit(toNumber(animationTime, defaultAnimationTime), [200, 100000]);
  }

  createIndicators = () => {
    let items = [];
    const { indicatorType, children } = this.props;
    if (children) {
      const { start } = this.state;
      const length = children.length;
      items = children.map((item, index) => {
        const checked = start === index || (index === 0 && start === length);

        const IndicatorThemeProps = this.addPropsConfig('Indicator', {
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
            <Indicator themeProps={IndicatorThemeProps} key={index} checked={checked} />
          </IndicatorContainer>
        );
      });
    }
    const IndicatorContainerThemeProps = this.addPropsConfig('Indicator', {
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

  getItems = (channel: Object) => {
    const { children, getPartOfThemeProps } = this.props;
    const EmptyThemeProps = getPartOfThemeProps('CarouselWrap');
    if (!children || children.length === 0) {
      return <Empty themeProps={EmptyThemeProps}>暂无切换框</Empty>;
    }
    const { start: nextStart } = this.state;
    const { start: initStart, switchType } = this.props;
    const len = children.length;
    const WrapThemeProps = this.addPropsConfig('CarouselWrap', {
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
      <AllItemsContainer {...channel.provider} themeProps={WrapThemeProps} initStart={initStart}>
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
    const ItemWrapThemeProps = this.addPropsConfig('CarouselWrap', {
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
