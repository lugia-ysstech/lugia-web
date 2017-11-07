/*
 *
 * 滚动条
 * @flow
 * create by ligx 170911
 */
import * as React from 'react';
import styled from 'styled-components';
import { scroller, } from './index.css';
import Support from '../common/FormFieldWidgetSupport';

import addEventListener from 'rc-util/lib/Dom/addEventListener';

const BarDefaultSize = 12;
const Container = styled.div`
  position: relative;
  background: #e3e3e6;
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
`;
const YContainer = Container.extend`
  width: ${BarDefaultSize}px;
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
  throttle: number,
  defaultValue?: number,
  step: number,
};
type ScrollerState = {
  value: number,
  sliderSize: number,
};
const maxZoom = 10;

class Scroller extends React.Component<ScrollerProps, ScrollerState> {

  static defaultProps = {
    type: YScroller,
    throttle: 200,
    step: 5,
  };

  htmlScroller: HTMLElement;
  scroller: ?Object;
  drag: boolean;
  state: ScrollerState;
  throttleTimer: number;

  constructor (props: ScrollerProps) {
    super(props);
    this.componentWillReceiveProps(props);
    const { value, defaultValue, } = props;
    this.state = {
      value: Support.getNumberValue({
        value,
        defaultValue,
      }),
      sliderSize: this.getSliderBarSize(this.props),
    };


  }

  componentWillReceiveProps (props: ScrollerProps) {
    this.setState({ sliderSize: this.getSliderBarSize(props), });
  }

  getSliderBarSize (props: ScrollerProps) {
    let result = 0;
    const { viewSize, totalSize, } = props;
    const hidenWidthOrHeight = (totalSize - viewSize);

    if (hidenWidthOrHeight > 0) {
      const computeValue = (hidenWidthOrHeight / viewSize);
      result = Math.max(10, computeValue);
    }

    return result;
  }

  bodyMouseMoveHandle: Object;
  bodyMouseUpHandle: Object;

  componentDidMount () {
    if (document.body) {

      if (this.bodyMouseMoveHandle === undefined) {
        this.bodyMouseMoveHandle = this.bindDoc('mousemove', (e: Object) => {
          if (this.isDrag) {
            this.setValue(e);
          }
        });
      }

      if (this.bodyMouseUpHandle === undefined) {
        this.bodyMouseUpHandle = this.bindDoc('mouseup', (e: Object) => {
          this.isDrag = false;
        });
      }
    }
  }

  componentWillUnmount () {
    this.bodyMouseMoveHandle && this.bodyMouseMoveHandle.remove();
    this.bodyMouseUpHandle && this.bodyMouseUpHandle.remove();
  }

  bindDoc (event: string, callback: Function): Object {
    return addEventListener(document, event, callback);
  }

  containerPos: Object;

  getElementPosition (e: Object) {

    if (this.containerPos) {
      return this.containerPos;
    }

    let x = 0, y = 0;
    while ( e ) {
      x += e.offsetLeft;
      y += e.offsetTop;
      e = e.offsetParent;
    }
    return this.containerPos = { x, y, };
  }


  getPX (val: number): string {
    return `${val}px`;
  }

  render () {
    const { value, sliderSize, } = this.state;
    const { viewSize, } = this.props;

    const style: Object = {};
    const barStyle = {};
    let Target, TargetContainer;
    const viewPx = this.getPX(viewSize);
    const barPx = this.getPX(sliderSize);
    const posPx = this.getPX(this.value2pos(value));

    this.selectType(() => {

      style.width = viewPx;
      barStyle.width = barPx;
      barStyle.left = posPx;
      Target = XBar;
      TargetContainer = XContainer;

    }, () => {

      style.height = viewPx;
      barStyle.height = barPx;
      barStyle.top = posPx;
      Target = YBar;
      TargetContainer = YContainer;

    });

    if (!TargetContainer || !Target) {
      return '';
    }

    return <TargetContainer style={style} innerRef={cmp => this.htmlScroller = cmp}
                            onMouseMove={this.onMouseMove}
                            onMouseDown={this.onContainerMouseDown}>
      <Target className={scroller} style={barStyle}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}

      >
      </Target>
    </TargetContainer>;
  }

  setValue (e: Object) {

    const value = this.pos2value(this.getPos(e));
    this.setState({ value, });
  }

  getPos (e: Object) {
    const arg = this.getElementPosition(this.htmlScroller);

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

    const min = Math.max(0, pos);
    const { viewSize: max, } = this.props;
    return Math.min(min, max);
  }

  async selectType (x: Function, y: Function) {
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

  isDrag: boolean;

  onMouseDown = () => {
    this.isDrag = true;
  };

  onContainerMouseDown = (e: Object) => {
    this.setValue(e);
  };
  onMouseUp = () => {
    this.isDrag = false;
  };
  onMouseMove = (e: Object) => {
    if (this.isDrag) {
      this.setValue(e);
    }
  };

  shouldComponentUpdate (nextProps: ScrollerProps, nextState: ScrollerState) {
    return this.props.viewSize !== nextProps.viewSize
      || !this.scroller
      || this.state.value !== nextState.value
      || this.props.totalSize !== nextProps.totalSize;
  }


  pos2value (pos: number) {
    const { totalSize, viewSize, } = this.props;
    return (pos / viewSize) * totalSize;
  }

  value2pos (value: number) {
    const { state, props, } = this;
    const { sliderSize, } = state;
    const { totalSize, viewSize, } = props;
    return (value / totalSize) * (viewSize - sliderSize);
  }
}

export default Scroller;
