/*
 *
 * 滚动条
 * @flow
 * create by ligx 170911
 */
import * as React from 'react';
import Dragdealer from 'dragdealer';
import { mouseWheel, } from './mouseWheel';
import $ from 'jquery';
import styled from 'styled-components';
import { scroller, } from './index.css';
import Support from '../common/FormFieldWidgetSupport';

const BarDefaultSize = 12;
const Container = styled.div`
  background: #fff;
  width: 20px;
  height: 300px;
  border-radius: 5px;
  z-index: 996;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  text-align: center;
  border-radius: 8px;
  background: ${props => (props.disabled ? '#898989' : '#49a9ee')};
  color: #FFF;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  :hover {
    background-color: #49a9ee96;
  }
`;
const XContainer = Container.extend`
  height: ${BarDefaultSize}px;
  bottom: 0px;
`;
const YContainer = Container.extend`
  width: ${BarDefaultSize}px;
  top: 0px;
`;
const BarDefaultSizePadding = 4;

const XBar = Bar.extend`
  height: ${BarDefaultSize - BarDefaultSizePadding}px;
  margin-bottom: 2px;
  margin-top: 2px;
`;

const YBar = Bar.extend`
  width: ${BarDefaultSize - BarDefaultSizePadding}px;
  margin-left: 2px;
  margin-right: 2px;
`;

const XScroller = 'x', YScroller = 'y';

type ScrollerProps = {
  totalSize: number,
  viewSize: number,
  type: 'x' | 'y',
  onChange?: Function,
  value?: number,
  defaultValue?: number,
};
type ScrollerState = {
  value: number,
};

class Scroller extends React.Component<ScrollerProps, ScrollerState> {

  static defaultProps = {
    type: YScroller,
  };

  scrollerSize: number;
  htmlScroller: HTMLElement;
  scroller: Object;
  drag: boolean;
  state: ScrollerState;

  constructor (props: ScrollerProps) {
    super(props);
    this.componentWillReceiveProps(props);
    const { value, defaultValue, } = props;
    this.state = {
      value: Support.getNumberValue({
        value,
        defaultValue,
      }),
    };
  }

  componentWillReceiveProps (props: ScrollerProps) {
    const { totalSize, viewSize, } = props;
    this.scrollerSize = totalSize - viewSize;
  }


  render () {
    const { viewSize, totalSize, type, } = this.props;

    const style: Object = {};
    const barStyle = {};

    let barSize = viewSize / (totalSize / viewSize);
    if (barSize < 10) {
      barSize = 10;
    }
    let Target, TargetContainer;
    switch (type) {
      case XScroller:
        style.width = viewSize + 'px';
        barStyle.width = barSize + 'px';
        Target = XBar;
        TargetContainer = XContainer;
        break;
      case YScroller:
        style.height = viewSize + 'px';
        barStyle.height = barSize + 'px';
        Target = YBar;
        TargetContainer = YContainer;
        break;
      default:
    }
    if (!TargetContainer || !Target) {
      return '';
    }

    return <TargetContainer style={style} innerRef={cmp => this.htmlScroller = cmp} onMouseEnter={this.reflow}>
      <Target className={scroller} style={barStyle} onMouseEnter={this.reflow}>
      </Target>
    </TargetContainer>;
  }

  setScrollerValue (value: number, igron: boolean = false): void {
    if (!this.scroller) {
      return;
    }
    this.reflow();

    const { type, } = this.props;

    const pos = this.value2pos(value);
    switch (type) {
      case XScroller:
        this.scroller.setValue(pos, 0, false, igron);
        break;
      case YScroller:
        this.scroller.setValue(0, pos, false, igron);
        break;
      default:
    }
  }

  shouldComponentUpdate (nextProps: ScrollerProps, nextState: ScrollerState) {

    return this.props.viewSize != nextProps.viewSize
      || !this.scroller
      || this.state.value != nextState.value
      || this.props.totalSize !== nextProps.totalSize;
  }

  componentDidMount () {
    this.componentDidUpdate();
  }

  componentDidUpdate () {
    if (!this.scroller) {
      mouseWheel($);
      $(this.htmlScroller).mousewheel(event => {
        this.onWheel(event);
      });
      this.scroller = this.createJQueryScrollerPlugin();
      const { value, } = this.state;
      this.setScrollerValue(value);
    } else {
      const { value, } = this.state;
      this.setScrollerValue(value);
      this.reflow();
    }
  }

  onWheel = (event: Object) => {
    const { deltaY, } = event;
    const { value, } = this.state;
    this.setState({ value: value + deltaY, });
    event.preventDefault();
  };

  createJQueryScrollerPlugin () {
    const { onChange, type, } = this.props;

    const callback = (x, y) => {
      const value = this.computeValue([x, y,]);
      this.setState({ value, });
      onChange && onChange(value);
    };

    const animationCallback = (x, y) => {
      if (this.drag) {
        callback(x, y);
      }
    };

    return new Dragdealer(this.htmlScroller, {
      horizontal: type === XScroller,
      vertical: type === YScroller,
      yPrecision: 1,
      xPrecision: 1,
      dragStartCallback: () => {
        this.drag = true;
      },
      dragStopCallback: () => {
        this.drag = false;
      },
      handleClass: scroller,
      callback,
      animationCallback,
    });
  }

  computeValue ([x, y,]: Array<number>) {
    const { type, } = this.props;

    switch (type) {
      case XScroller:
        return this.pos2value(x);
      case YScroller:
        return this.pos2value(y);
      default:
        return 0;
    }
  }


  pos2value (pos: number) {
    return pos * this.scrollerSize;
  }

  value2pos (value: number) {
    return value / this.scrollerSize;
  }

  isDrag () {
    return this.drag;
  }

  reflow = () => {
    this.scroller && this.scroller.reflow();
  }
}

export default Scroller;
