/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { toNumber } from '../common/NumberUtils';
import {
  Wrap,
  CarouselContainer,
  PreButton,
  SwitchIcon,
  NextButton,
  IndicatorWrap,
  Indicator,
  IndicatorContainer,
  AllItemsContainer,
  ItemWrap,
} from '../css/carousel';

const defaultWidth = 400;
const defaultHeight = 200;
const defaultDelay = 4000;

type CarouselProps = {
  children?: React.Node[],
  getTheme?: Function,
  start?: number,
  autoPlay?: boolean,
  delay?: number,
  action?: 'hover' | 'click',
  indicatorType?: 'horizontal' | 'vertical' | 'outside',
  switchType?: 'horizontal' | 'vertical' | 'fade',
};

type CarouselState = {
  start: number,
};

export default class Carousel extends React.Component<any, CarouselProps> {
  static defaultProps = {
    getTheme: () => {},
    start: 0,
    autoPlay: false,
    delay: 3000,
    action: 'hover',
    indicatorType: 'horizontal',
    switchType: 'horizontal',
  };
  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      start: this.getInitStart(props),
    };
    this.clickDisabled = false;
    this.preStart = toNumber(props.start, 0);
  }
  clickDisabled: boolean;
  preStart: any;
  interval: any;

  getInitStart = (props: CarouselProps) => {
    const { children } = props;
    let start;
    if (children && children.length > 0) {
      const len = children.length;
      const propsStart = toNumber(props.start, 0);
      start = propsStart - len > 0 ? 0 : propsStart;
    } else {
      start = 0;
    }
    return start;
  };

  static getDerivedStateFromProps(props: CarouselProps, state: CarouselState) {
    if (!state) {
      return {};
    }
    return { start: state.start };
  }
  render() {
    const { width, height } = this.getShadowWidthAndHeight();
    const { indicatorType } = this.props;
    const isIndicatorAtOutSide = indicatorType === 'outside';
    return (
      <Wrap width={width} height={height} indicatorType={indicatorType}>
        <CarouselContainer height={height} width={width}>
          {this.getSwitchButton()}
          {this.getItems()}
          {isIndicatorAtOutSide ? null : this.getIndicators()}
        </CarouselContainer>
        {isIndicatorAtOutSide ? this.getIndicators() : null}
      </Wrap>
    );
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

  getIndicators = () => {
    const items = [];
    const { indicatorType, children } = this.props;
    if (children && children.length > 0) {
      const length = children.length;
      const { start } = this.state;
      children.forEach((item, index) => {
        let checked = false;
        if (start === index || (index === 0 && start === length)) {
          checked = true;
        }
        items.push(
          <IndicatorWrap
            indicatorType={indicatorType}
            onMouseEnter={this.handleMouseEnterIndicator.bind(this, index)}
            onClick={this.handleClickIndicator.bind(this, index)}
          >
            <Indicator indicatorType={indicatorType} key={index} checked={checked} />
          </IndicatorWrap>
        );
      });
    }

    return <IndicatorContainer indicatorType={indicatorType}>{items}</IndicatorContainer>;
  };

  handleMouseEnterIndicator(index: number) {
    const { action } = this.props;
    if (action === 'hover') {
      this.changeIndicatorState(index);
    }
  }

  handleClickIndicator(index: number) {
    const { action } = this.props;
    if (action !== 'hover') {
      this.changeIndicatorState(index);
    }
  }

  changeIndicatorState = (index: number) => {
    const { state, props } = this;
    const { start } = state;
    const len = props.children.length;
    clearInterval(this.interval);
    this.handleAutoPlay(props);
    if (index === start || (start === len && index === 0)) {
      return;
    }

    if (start === len) {
      this.preStart = 0;
    } else {
      this.preStart = start;
    }
    this.setState({ start: index });
  };

  clickSwitchButton = (switchType: string) => {
    if (this.clickDisabled) {
      return;
    }
    const { state, props } = this;
    const { start = 0 } = state;
    clearInterval(this.interval);
    this.handleAutoPlay(props);
    const len = props.children.length;
    let newStart;

    if (switchType === 'pre') {
      if (start === 0) {
        this.preStart = len;
        newStart = len - 1;
      } else {
        this.preStart = start;
        newStart = start - 1;
      }
    } else {
      if (start === len) {
        this.preStart = 0;
        newStart = 1;
      } else {
        this.preStart = start;
        newStart = start + 1;
      }
    }

    this.setState({
      start: newStart,
    });
    this.clickDisabled = true;
    setTimeout(() => {
      this.clickDisabled = false;
    }, 300);
  };

  preClick = () => {
    this.clickSwitchButton('pre');
  };

  nextClick = () => {
    this.clickSwitchButton('next');
  };

  getItems = () => {
    const { children, switchType } = this.props;

    if (children && children.length > 0) {
      const { start: nextStart } = this.state;
      const { start: initStart } = this.props;
      const len = children.length;
      const isVertical = switchType === 'vertical';
      const isFade = switchType === 'fade';
      const { width, height } = this.getShadowWidthAndHeight();
      const activeWidth = isVertical || isFade ? width : (len + 1) * width;
      const activeHeight = isVertical ? (len + 1) * height : height;
      return (
        <AllItemsContainer
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
    }
  };

  getChildren = (children: string[]) => {
    const { props, state } = this;
    const { switchType } = props;
    const { start } = state;
    const { width, height } = this.getShadowWidthAndHeight();
    const items = [];
    children.forEach((item, index) => {
      const checked = start === index;
      items.push(
        <ItemWrap switchType={switchType} checked={checked} width={width} height={height}>
          {item}
        </ItemWrap>
      );
    });
    const checked = start === children.length;
    items.push(
      <ItemWrap switchType={switchType} checked={checked} width={width} height={height}>
        {children[0]}
      </ItemWrap>
    );
    return items;
  };

  getShadowWidthAndHeight = () => {
    const { getTheme } = this.props;
    const theme = getTheme();
    const { width = defaultWidth, height = defaultHeight } = theme;

    return { width, height };
  };

  handleAutoPlay = (props: CarouselProps) => {
    const { autoPlay, delay } = props;
    let delayNumber = parseInt(delay);
    if (isNaN(delayNumber)) {
      delayNumber = defaultDelay;
    }

    if (autoPlay === true) {
      this.interval = setInterval(() => {
        this.nextClick();
      }, delayNumber);
    }
  };

  componentDidMount() {
    this.handleAutoPlay(this.props);
  }
}
