/*
 *
 * 滚动条
 * @flow
 * create by ligx 170911
 */
import * as React from 'react';
import styled from 'styled-components';
import Support from '../common/FormFieldWidgetSupport';
import { cacheOnlyFirstCall, getElementPosition, } from '../../utils';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

type ScrollerProps = {
  totalSize: number,
  viewSize: number,
  type?: 'x' | 'y',
  onChange?: Function,
  value?: number,
  throttle?: number,
  defaultValue?: number,
  step?: number,
};
type ScrollerState = {
  value: number,
  sliderSize: number,
};
type Direction = 'down' | 'up' | 'none';

const Container = styled.div`
  position: relative;
  background: #e3e3e6;
  width: 20px;
  height: 300px;
  border-radius: 5px;
  z-index: 996;
`;

const BarDefaultSize = 12;
const XContainer = Container.extend`
  height: ${BarDefaultSize}px;
`;
const YContainer = Container.extend`
  width: ${BarDefaultSize}px;
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
const Down = 'down';
const Up = 'up';
const None = 'none';
const DefaultStep = 1;

class Scroller extends React.Component<ScrollerProps, ScrollerState> {

  static defaultProps = {
    type: YScroller,
    throttle: 100,
    step: DefaultStep,
  };

  bodyMouseUpHandle: Object;
  bodyMouseMoveHandle: Object;
  fastStep: number;
  htmlScroller: HTMLElement;
  isDrag: boolean;
  lastFx: string;
  lastTime: number;
  maxValue: number;
  posGetter: Object;
  state: ScrollerState;
  throttleTimer: ?number;
  sliderAbsoulateSize: number;
  step: number;
  move: number;

  constructor (props: ScrollerProps) {
    super(props);
    this.componentWillReceiveProps(props);
  }


  componentWillReceiveProps (props: ScrollerProps) {

    const { defaultValue = 0, } = props;

    this.state = {
      value: defaultValue,
      sliderSize: this.getSliderBarSize(props),
    };

    const { totalSize, viewSize, step = DefaultStep, } = props;
    this.posGetter = cacheOnlyFirstCall(getElementPosition);
    this.step = step;
    this.maxValue = totalSize - viewSize;
    this.fastStep = totalSize / 4;
    this.sliderAbsoulateSize = 0;
  }


  getSliderBarSize (props: ScrollerProps) {
    const { viewSize, totalSize, } = props;
    const notNeed = totalSize <= viewSize;
    if (notNeed) {
      return 0;
    }
    const barSize = viewSize * this.unitValuePos(props);
    return Math.round(Math.max(barSize, 10));
  }


  render () {

    let barStyle = {};
    let style: Object = {};
    let Target, TargetContainer;

    const { viewSize, } = this.props;
    const { sliderSize, } = this.state;

    const barPx = this.getPX(sliderSize);
    const posPx = this.getPX(this.getCurrentPos());
    const viewPx = this.getPX(viewSize);

    this.selectType(() => {
      barStyle = {
        width: barPx,
        left: posPx,
      };
      style = { width: viewPx, };
      style.width = viewPx;
      Target = XBar;
      TargetContainer = XContainer;

    }, () => {
      barStyle = {
        height: barPx,
        top: posPx,
      };
      style = { height: viewPx, };
      Target = YBar;
      TargetContainer = YContainer;
    });

    if (!Target || !TargetContainer) {
      return '';
    }


    const getScroller = cmp => this.htmlScroller = cmp;
    return <TargetContainer style={style}
                            innerRef={getScroller}
                            onMouseMove={this.onContainerMouseMove}
                            onMouseDown={this.onContainerMouseDown}
                            onMouseUp={this.onContainerMouseUp}
                            onWheel={this.onWheel}
                            onMouseOut={this.onContainerMouseOut}>
      <Target style={barStyle}
              onMouseDown={this.onSliderBarMouseDown}
              onMouseUp={this.onSliderBarMouseUp}/>
    </TargetContainer>;
  }

  getCurrentPos (): number {
    const value = Support.getNumberValue(this.props, this.state);
    return this.value2pos(value);
  }

  getPX (val: number): string {
    return `${val}px`;
  }

  componentDidMount () {
    if (document.body) {
      if (this.bodyMouseMoveHandle === undefined) {
        this.bodyMouseMoveHandle = this.bindDoc('mousemove', (e: Object) => {
          if (this.isDrag) {
            this.processDomEvent(this.getRealSliderPos(e));
          }
        });
      }
      if (this.bodyMouseUpHandle === undefined) {
        this.bodyMouseUpHandle = this.bindDoc('mouseup', () => {
          this.isDrag = false;
        });
      }
    }
  }

  bindDoc (event: string, callback: Function): Object {
    return addEventListener(document, event, callback);
  }


  onSliderBarMouseDown = (e: Object) => {
    this.sliderAbsoulateSize = this.getPos(e) - this.getCurrentPos();
    this.isDrag = true;
  };


  getDirection (fx: number): Direction {
    if (fx === 0) {
      return None;
    }
    return fx < 0 ? Down : Up;
  }

  onContainerMouseDown = (e: Object) => {
    if (this.isDrag) {
      return;
    }
    const { step = DefaultStep, } = this.props;
    this.step = step;
    this.clearMove();
    let fx = None;
    const mousePos = this.getPos(e);
    const targetValue = this.pos2value(mousePos);
    if (this.value2pos(this.state.value) > mousePos) {
      fx = Down;
    } else {
      fx = Up;
    }
    this.move = setInterval(() => {
      if (fx === Down) {
        this.fastMove(fx, 2, 0, targetValue);
      } else {
        this.fastMove(fx, 2, targetValue, this.maxValue);
      }
      if (this.state.value >= targetValue) {
        this.clearMove();
      }
    }, 200);
  };

  onContainerMouseUp = (e: Object) => {
    if (this.isDrag === true) {
      return;
    }
    this.processDomEvent(this.getPos(e));
    this.clearMove();
    this.isDrag = false;
  };

  getPos (e: Object) {
    const arg = this.posGetter.func(this.htmlScroller);
    let pos = 0;

    this.selectType(() => {
      const { clientX, } = e;
      const { x, } = arg;
      pos = clientX - x;
    }, () => {
      const { clientY, } = e;
      const { y, } = arg;
      pos = clientY - y;
    });
    return Math.min(this.props.viewSize, pos);
  }

  onSliderBarMouseUp = (e: Object) => {
    e.preventDefault();
    e.stopPropagation();
    this.isDrag = false;
  };

  onContainerMouseOut = () => {
    this.clearMove();
  };

  clearMove () {
    if (this.move) {
      clearInterval(this.move);
    }
  }

  onContainerMouseMove = (e: Object) => {
    if (this.isDrag) {
      this.processDomEvent(this.getRealSliderPos(e));
    }
  };

  getRealSliderPos (e: Object): number {
    return this.getPos(e) - this.sliderAbsoulateSize;
  }

  processDomEvent (pos: number) {
    this.setValue(this.pos2value(pos));
  }


  componentWillUnmount () {
    this.bodyMouseMoveHandle && this.bodyMouseMoveHandle.remove();
    this.bodyMouseUpHandle && this.bodyMouseUpHandle.remove();
  }


  onWheel = (event: Object) => {
    const { deltaY, } = event;
    this.fastMove(this.getDirection(deltaY), 0.03, 0, this.maxValue);
  };


  fastMove = (fx: Direction, percent: number, minValue: number, maxValue: number) => {
    if (fx === None) {
      return;
    }

    const now = new Date();
    const timeSpan = now - this.lastTime;
    const { step = DefaultStep, } = this.props;
    const { value, } = this.state;

    if (this.lastTime && timeSpan < 500) {
      this.step = this.step * (1 + percent);
    } else {
      this.step = step;
    }
    this.step = Math.min(this.fastStep, this.step);
    const realStep = this.getMoveStep(fx, this.step);
    let newValue = value + realStep;
    newValue = Math.min(newValue, maxValue);
    newValue = Math.max(newValue, minValue);
    if (this.lastFx !== undefined && this.lastFx !== fx) {
      const timeSpan = new Date() - this.lastTime;
      if (timeSpan < 200) {
        this.lastFx = fx;
        return;
      }
    }

    this.setValue(newValue);
    this.lastFx = fx;
    this.lastTime = now;
  };

  getMoveStep (fx: Direction, step: number): number {
    if (fx === None) {
      return step;
    }
    return fx === Down ? step : -step;
  }

  setValue (theValue: number) {
    if (theValue === this.state.value) {
      return;
    }
    const min = Math.max(0, theValue);
    const max = this.maxValue;
    const value = Math.min(min, max);

    this.setState({ value, }, () => {
      this.scrolling(value);
    });
  }

  scrolling (value: number) {
    if (this.throttleTimer !== undefined) {
      clearTimeout(this.throttleTimer);
    }
    const { props, } = this;
    const { throttle, } = props;
    this.throttleTimer = setTimeout(() => {
      this.onChange(value);
    }, throttle);
  }

  onChange = (value: number) => {
    const { onChange, } = this.props;
    onChange && onChange(value);
  };


  selectType (x: Function, y: Function) {
    const { type, } = this.props;
    switch (type) {
      case XScroller:
        x();
        break;
      case YScroller:
        y();
        break;
      default:
    }
  }


  shouldComponentUpdate (nextProps: ScrollerProps, nextState: ScrollerState) {
    return this.props.viewSize !== nextProps.viewSize
      || this.state.value !== nextState.value
      || this.props.totalSize !== nextProps.totalSize;
  }


  value2pos (value: number) {
    const { viewSize, } = this.props;
    const { sliderSize, } = this.state;
    return Math.min(value * this.unitValuePos(this.props), viewSize - sliderSize);
  }


  pos2value (pos: number) {
    return pos / this.unitValuePos(this.props);
  }

  unitValuePos (props: ScrollerProps): number {
    const { viewSize, totalSize, } = props;
    return viewSize / totalSize;
  }

}

export default Scroller;
