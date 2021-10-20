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
  NextButton,
  PreButton,
  Wrap,
  Empty,
  defaultButtonFontSize,
} from '../css/carousel';
import colorsFunc from '../css/stateColor';
import Icon from '../icon';
import Item from './item';

const { lightGreyColor } = colorsFunc();

const defaultDelay = 4000;
const defaultAnimationTime = 500;
type IndicatorType = 'horizontal' | 'vertical' | 'outside';
type SwitchType = 'horizontal' | 'vertical' | 'fade';
type clickButtonType = 'pre' | 'next';
type Children = React.ReactNode | React.ReactNode[] | undefined;
type CarouselProps = {
  children?: Children,
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

export const getReactChildrenLength = (children: Children) => {
  return React.Children.count(children);
};

export const getInitStart = (start: number, len: number): number => {
  if (len === 0) {
    return 0;
  }
  const numberStart = toNumber(start, 0);
  return len >= numberStart ? start : numberStart % len;
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
  width: number;
  height: number;
  preButtonFontSize: number;
  nextButtonFontSize: number;

  constructor(props: CarouselProps) {
    super(props);
    const { start = 0, children } = props;
    this.clickDisabled = false;
    this.preStart = getInitStart(start, getReactChildrenLength(children));
    this.initSwitchButtonFontSize();
  }

  static getDerivedStateFromProps(props: CarouselProps, state: CarouselState) {
    const { start = 0, defaultStart, children } = props;
    const len = getReactChildrenLength(children);

    if ('start' in props) {
      return { start: getInitStart(start, len) };
    }

    if (!state) {
      return { start: getInitStart(defaultStart, len) };
    }
    return state;
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

  getChildrenLength = () => {
    const { children } = this.props;
    if (!children) {
      return 0;
    }
    return getReactChildrenLength(children);
  };

  initPropsConfig = () => {
    const { state, props } = this;

    const { start: nextStart } = state;
    const { themeProps, indicatorType, switchType, animationTime } = props;

    const len = this.getChildrenLength();
    const preStart = this.preStart;

    themeProps.propsConfig = {
      indicatorType,
      animationTime,
      switchType,
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
    const WrapThemeProps = getPartOfThemeProps('Container', { props: params });

    return (
      <Wrap themeProps={WrapThemeProps} {...addMouseEvent(this)}>
        <CarouselContainer themeProps={WrapThemeProps} lugiaConsumers={channel.consumer}>
          {switchButton ? this.getSwitchButton() : null}
          {this.getItems(channel)}
        </CarouselContainer>
        {this.getIndicators(indicatorType, indicator)}
      </Wrap>
    );
  }

  getIndicators(indicatorType: IndicatorType, isRenderIndicator: boolean) {
    return isRenderIndicator ? this.createIndicators() : null;
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
    const { indicatorType, getPartOfThemeProps } = this.props;
    const len = this.getChildrenLength();
    if (len === 0 || len === 1 || indicatorType === 'vertical') {
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

  createIndicators = () => {
    const items = [];
    const { indicatorType, animationTime } = this.props;
    const childrenLength = this.getChildrenLength();

    if (childrenLength > 0) {
      const { start } = this.state;
      for (let index = 0; index < childrenLength; index++) {
        const checked = start === index || (index === 0 && start === childrenLength);
        const IndicatorThemeProps = this.addPropsConfig('Indicator', {
          indicatorType,
          checked,
          animationTime,
        });
        items.push(
          <IndicatorContainer
            key={`_indicator_container_${index}_`}
            themeProps={IndicatorThemeProps}
            onMouseEnter={this.handleMouseEnterIndicator.bind(this, index)}
            onClick={this.handleClickIndicator.bind(this, index)}
          >
            <Indicator themeProps={IndicatorThemeProps} key={index} checked={checked} />
          </IndicatorContainer>
        );
      }
    }
    const IndicatorWrapThemeProps = this.addPropsConfig('IndicatorWrap', {
      indicatorType,
    });
    return <IndicatorWrap themeProps={IndicatorWrapThemeProps}>{items}</IndicatorWrap>;
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

  clickSwitchButton = (clickButtonType: clickButtonType) => {
    if (this.clickDisabled) {
      return;
    }
    this.clickDisabled = true;

    const { animationTime } = this.props;
    this.resetHandleAutoPlay(this.props);
    const { start = 0 } = this.state;
    const len = this.getChildrenLength();
    const { newStart, preStart } = this.getPreStart(clickButtonType, start, len);

    this.preStart = preStart;
    this.setStart(newStart);

    setTimeout(() => {
      this.clickDisabled = false;
    }, animationTime);
  };

  preClick = () => {
    this.clickSwitchButton('pre');
  };

  nextClick = () => {
    this.clickSwitchButton('next');
  };

  changeIndicatorState = (index: number) => {
    this.resetHandleAutoPlay(this.props);
    const { state } = this;
    const { start } = state;
    const len = this.getChildrenLength();
    if (index === start || (start === len && index === 0)) {
      return;
    }
    this.preStart = start === len ? 0 : start;
    this.setStart(index);
  };

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
    const { getPartOfThemeProps } = this.props;

    const len = this.getChildrenLength();

    const EmptyThemeProps = getPartOfThemeProps('Container');

    if (len === 0) {
      return <Empty themeProps={EmptyThemeProps}>暂无切换框</Empty>;
    }

    const { start: nextStart } = this.state;
    const { switchType, animationTime } = this.props;

    const WrapThemeProps = this.addPropsConfig('Container', {
      len,
      switchType,
      nextStart,
      preStart: this.preStart,
      animationTime,
    });

    return (
      <AllItemsContainer {...channel.provider} themeProps={WrapThemeProps}>
        {this.getChildren()}
      </AllItemsContainer>
    );
  };

  getChildren = (): Array<Object> => {
    const len = this.getChildrenLength();
    if (len === 0) {
      return null;
    }

    const { props, state } = this;
    const { switchType, children } = props;
    const { start = 0 } = state;

    if (len === 1) {
      return children;
    }

    const items = React.Children.map(children, (child, index) => {
      return this.getItemWrap({
        switchType,
        start,
        index,
        child,
        len,
      });
    });

    items.push(
      this.getItemWrap({
        switchType,
        start,
        index: len,
        child: children[0],
        len,
      })
    );

    return items;
  };

  getItemWrap(param: {
    switchType: SwitchType,
    start: number,
    index: number,
    child: React.ReactNode,
    len: number,
  }) {
    const { switchType, start, index, child, len } = param;
    const { animationTime } = this.props;
    const checked = start === index;
    const ItemWrapThemeProps = this.addPropsConfig('Container', {
      checked,
      switchType,
      len,
      animationTime,
    });

    return (
      <Item key={`${index}`} themeProps={ItemWrapThemeProps}>
        {child}
      </Item>
    );
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
