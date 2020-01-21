/*
 *   @flow
 */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Four from './Four';
import DragArea from './DragArea';
import { getZ } from '../function/getZ';
import initialState, { lockingWayFlag } from '../initialState';
import { Box, Content, Children, Mask } from '../styled';
import { getComponentSize, getLockingWay } from '../function/utils';
import { getNodeSize } from '../function/event';
type PropsType = {
  x?: number,
  y?: number,
  z?: number,
  width?: number,
  height?: number,
  canScale?: boolean,
  mouseEvents: Object,
  onChangeLock?: Function,
  isLock: boolean,
  dom?: any,
  onClose: Function,
  children?: any,
  onMouseMove?: Function,
  onMouseUp?: Function,
  hasClose: boolean,
  lockingWay?: string,
  lockingIcon?: string,
  minimizeIcon?: string,
  canMinimize?: boolean,
  headReverse?: boolean,
  onDragStart?: Function,
  onDrag?: Function,
  onDragEnd?: Function,
  onChangeSizeStart?: Function,
  onChangeSize?: Function,
  onChangeSizeEnd?: Function,
  onUp?: Function,
  onOpen?: Function,
  getHeadEvent?: Function,
  defaultIsLock?: boolean,
  middle?: boolean,
  mask?: boolean,
  lockDirection?: string,
  lockTop: number,
  lockBottom: number,
  maxWidth?: number,
  maxHeight?: number,
  minHeight: number,
  minWidth: number,
  autoLevel: boolean,
  propsIsLock: boolean,
  onFixed?: Function,
  canDoubleClickScale?: boolean,
  head: any,
};
const { clickLock } = lockingWayFlag;
export default class Window extends React.Component<PropsType, any> {
  box: any;
  zIndexArr: Array<number>;
  upDateZFn: Function;
  mouseEvents: Function;
  oldSize: Object;
  onDragMove: Object;
  onDragUp: Object;
  onDoubleClick: Object;
  dragOpen: Object;
  borderMove: Object;
  borderUp: Object;
  upDateIsLock: Object;
  shrink: Object;
  zIndex: Object;
  lockupDateZ: Object;
  dragArea: any;
  windowCenter: boolean;
  upDateDragHeight: Object;

  constructor(props: PropsType) {
    super(props);
    this.box = React.createRef();
    this.dragArea = React.createRef();
    const { x: normalX, id, y: normalY, z: normalZ, index, zIndexArr, upDateZFn } = getZ();
    const { width: normalWidth, height: normalHeight } = initialState;
    const { middle } = props;
    const {
      x = middle ? undefined : normalX,
      y = middle ? undefined : normalY,
      z,
      width,
      height,
      maxWidth,
      maxHeight,
      canScale = false,
      lockDirection,
    } = props;
    const { newWidth, newHeight } = getComponentSize(
      width,
      height,
      normalWidth,
      normalHeight,
      maxWidth,
      maxHeight,
      canScale
    );
    const maxZ = zIndexArr.length === 0 ? 0 : Math.max(...zIndexArr);
    this.state = {
      isAboveLeft: false,
      isShow: false,
      isHide: false,
      zIndex: z || maxZ || normalZ,
      ...initialState,
      width: newWidth,
      height: newHeight,
      windowWidth: 0,
      x,
      y,
      isDoubleClick: false,
      componentIndex: index,
      id,
      canScale,
      right: null,
      left: null,
      lockDirection,
      dragHeight: 0,
      isDidMount: false,
    };
    this.zIndexArr = zIndexArr;
    this.upDateZFn = upDateZFn;
    this.oldSize = {
      width: 0,
      height: 0,
    };
    const { mouseEvents } = props;
    this.mouseEvents = mouseEvents;
    this.windowCenter = false;
  }

  onUp = (param: Object) => {
    const { width, height } = this.state;
    this.setState({ ...param });
    this.oldSize = { width, height };
    this.upDateEventZindex();
    const { onUp } = this.props;
    if (onUp) {
      const { lockDirection } = param;
      onUp({ lockDirection });
    }
  };
  onOpen = (param: Object) => {
    const { onOpen } = this.props;
    if (onOpen) {
      const { lockDirection, isLock } = param;
      onOpen({ lockDirection, isLock });
    }
    this.setState({ ...this.oldSize, ...param });
  };
  freshWindowSize = () => {
    const { offsetWidth: innerWidth, offsetHeight: innerHeight } = document.body || {};
    const { width, height, x, y, isDoubleClick } = this.state;
    const size = isDoubleClick ? { width: innerWidth, height: innerHeight } : { width, height };
    this.setState({
      windowWidth: innerWidth,
      windowHeight: innerHeight,
      x,
      y,
      ...size,
      isTransition: false,
      maxX: innerWidth,
      maxY: innerHeight,
    });
    this.mouseEvents.emit('onFreshWindowSize', {
      x,
      y,
      maxX: innerWidth,
      maxY: innerHeight,
      ...size,
    });
  };
  upDateSize = (param: Object) => {
    this.setState({ ...param });
  };
  upDateDrag = (param: Object) => {
    this.setState({ ...param });
  };
  upDateDragOpen = (param: Object) => {
    const { right, x } = param;
    let newX = x;
    if (right) {
      const { windowWidth } = this.state;
      const { width } = this.oldSize;
      newX = windowWidth - width;
    }

    this.setState({ ...param, x: newX });
  };
  upDateIsLock = (param: Object) => {
    const { onChangeLock } = this.props;
    if (onChangeLock) {
      onChangeLock(param);
    }
  };
  upDateOnDoubleClick = (param: Object) => {
    this.setState({ ...param });
  };
  upDateZIndex = (param: Object) => {
    const { z } = param;
    const { upDateZFn } = this;
    const { componentIndex } = this.state;
    const zIndex = z + 2;
    upDateZFn(componentIndex, zIndex);
    this.setState({ zIndex });
  };
  lockupDateZIndex = (param: Object) => {
    const { z } = param;
    this.setState({ zIndex: z });
  };
  onMouseDown = (e: Object) => {
    const { isLock } = this.props;
    if (isLock) {
      return;
    }
    this.upDateEventZindex();
  };
  upDateEventZindex = () => {
    const { autoLevel } = this.props;
    if (!autoLevel) {
      return;
    }
    const { zIndexArr, upDateZFn } = this;
    const { componentIndex } = this.state;
    const max = Math.max(...zIndexArr);
    const isMax = this.getMaxZ();
    if (isMax) {
      return;
    }
    const newZ = max + 1 * 1;
    upDateZFn(componentIndex, newZ);
    this.setState({ zIndex: newZ });
  };
  getMaxZ = () => {
    const { zIndexArr } = this;
    const { zIndex } = this.state;
    const max = Math.max(...zIndexArr);
    let number = 0;
    zIndexArr.forEach(list => {
      if (list === max) {
        number += 1;
      }
    });
    return zIndex === max && number === 1;
  };
  onClick = (e: SyntheticMouseEvent<HTMLButtonElement>) => {};
  onClose = () => {
    const { dom, onClose } = this.props;
    if (dom) {
      unmountComponentAtNode(dom);
    }
    if (onClose) {
      onClose({ isRemove: true });
    }
  };
  upDateDragHeightFun = ({ dragHeight }: Object) => {
    this.setState({ dragHeight });
  };
  componentDidMount() {
    this.freshWindowSize();
    window.addEventListener('resize', this.freshWindowSize);
    this.onDragMove = this.mouseEvents.on('onDragMove', this.upDateDrag);
    this.onDragUp = this.mouseEvents.on('onDragUp', this.upDateDrag);
    this.onDoubleClick = this.mouseEvents.on('onDoubleClick', this.upDateOnDoubleClick);
    this.dragOpen = this.mouseEvents.on('drag_open', this.upDateDragOpen);
    this.borderMove = this.mouseEvents.on('border_move', this.upDateSize);
    this.borderUp = this.mouseEvents.on('border_up', this.upDateSize);
    this.upDateIsLock = this.mouseEvents.on('upDate_isLock', this.upDateIsLock);
    this.shrink = this.mouseEvents.on('shrink', this.upDateSize);
    this.zIndex = this.mouseEvents.on('upDate_zIndex', this.upDateZIndex);
    this.lockupDateZ = this.mouseEvents.on('lockupDateZIndex', this.lockupDateZIndex);
    this.upDateDragHeight = this.mouseEvents.on('upDateDragHeight', this.upDateDragHeightFun);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.freshWindowSize);
    this.onDragMove.removeListener();
    this.onDragUp.removeListener();
    this.dragOpen.removeListener();
    this.borderMove.removeListener();
    this.borderUp.removeListener();
    this.upDateIsLock.removeListener();
    this.zIndex.removeListener();
    this.lockupDateZ.removeListener();
    this.onDoubleClick.removeListener();
    this.upDateDragHeight.removeListener();
  }
  shouldComponentUpdate(props: PropsType, state: any) {
    const { width, height, windowWidth, windowHeight, right, left, isDidMount } = state;
    const {
      lockDirection,
      lockTop,
      minHeight,
      minWidth,
      maxWidth = windowWidth,
      maxHeight = windowHeight,
      lockingWay,
      isLock,
      x,
      y,
      middle,
    } = props;
    const param = { node: this.box, minWidth, minHeight, maxWidth, maxHeight };
    let newWidth = typeof width === 'string' ? 0 : width;
    let newHeight = typeof height === 'string' ? 0 : height;
    if (width === 'auto') {
      setTimeout(() => {
        const { w } = getNodeSize(param);
        newWidth = w;
        this.setState({ width: w });
      }, 0);
    }
    if (height === 'auto') {
      setTimeout(() => {
        const { h } = getNodeSize(param);
        newHeight = h;
        this.setState({ height: h });
      }, 0);
    }

    const { isDrag } = getLockingWay(lockingWay);
    if (middle && !isLock && !this.windowCenter && width !== 'auto' && height !== 'auto') {
      this.setState({
        x: x || (windowWidth - newWidth) / 2,
        y: y || (windowHeight - newHeight) / 2,
      });
      this.windowCenter = true;
    }
    if (isLock && isDrag) {
      if (right === null && lockDirection === 'right') {
        if (windowWidth && newWidth !== 'auto') {
          this.setState({
            right: 'right:0px',
            x: windowWidth - newWidth,
            y: lockTop,
          });
        }
      }
      if (left === null && lockDirection === 'left') {
        this.setState({
          x: 0,
          y: lockTop,
          left: 'left:0px',
        });
      }
    }
    if (!isDidMount) {
      this.setState({ isDidMount: true });
    }
    return true;
  }
  render() {
    const {
      windowWidth,
      windowHeight,
      zIndex,
      width,
      height,
      x,
      y,
      isFloat,
      right,
      left,
      lockDirection,
      isTransition,
      componentIndex,
      id,
      maxX,
      maxY,
      canScale,
      dragHeight,
      isDidMount,
    } = this.state;
    const {
      children,
      isLock,
      hasClose,
      lockingWay,
      width: propsWidth,
      height: propsHeight,
      canMinimize = false,
      headReverse,
      onDragStart,
      onDrag,
      onDragEnd,
      onChangeSizeStart,
      onChangeSize,
      onChangeSizeEnd,
      onChangeLock,
      lockingIcon,
      minimizeIcon,
      lockTop,
      maxWidth = windowWidth,
      maxHeight = windowHeight,
      minWidth,
      minHeight,
      lockBottom,
      propsIsLock,
      onFixed,
      canDoubleClickScale,
      head,
      getHeadEvent,
      mask,
      autoLevel,
    } = this.props;
    const newMaxWidth = maxWidth < minWidth ? windowWidth : maxWidth;
    const newMaxHeight = maxHeight < minHeight ? windowHeight : maxHeight;
    const config = {
      windowWidth,
      windowHeight,
      width,
      height,
      isLock,
      propsIsLock,
      lockingWay,
      canMinimize,
      headReverse,
      id,
      lockingIcon,
      minimizeIcon,
      propsWidth,
      propsHeight,
      boxNode: this.box,
      maxX,
      maxY,
      x,
      y,
      lockTop,
      lockDirection,
      onFixed,
      canDoubleClickScale,
      head,
      getHeadEvent,
    };
    return (
      <React.Fragment>
        <Box
          ref={this.box}
          width={width}
          height={height}
          x={x}
          left={left}
          right={right}
          top={y}
          zIndex={zIndex}
          onMouseDown={this.onMouseDown}
          onClick={this.onClick}
          isLock={isLock}
          isFloat={isFloat}
          lockDirection={lockDirection}
          lockingWay={lockingWay}
          isTransition={isTransition}
          minWidth={minWidth}
          minHeight={minHeight}
          lockBottom={lockBottom}
        >
          <Content>
            <React.Fragment>
              <DragArea
                ref={this.dragArea}
                onUp={this.onUp}
                onOpen={this.onOpen}
                mouseEvent={this.mouseEvents}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onClose={this.onClose}
                upDateZFn={autoLevel && this.upDateZFn}
                zIndexArr={this.zIndexArr}
                componentIndex={componentIndex}
                onChangeLock={onChangeLock}
                hasClose={hasClose}
                {...config}
              />
              {((lockingWay === clickLock && !isLock) || lockingWay !== clickLock) &&
              !isFloat &&
              canScale ? (
                <Four
                  mouseEvent={this.mouseEvents}
                  x={x}
                  y={y}
                  maxX={maxX}
                  maxY={maxY}
                  isLock={isLock}
                  width={width}
                  height={height}
                  minWidth={minWidth}
                  minHeight={minHeight}
                  maxWidth={newMaxWidth}
                  maxHeight={newMaxHeight}
                  canScale={canScale}
                  onChangeSizeStart={onChangeSizeStart}
                  onChangeSize={onChangeSize}
                  onChangeSizeEnd={onChangeSizeEnd}
                  boxNode={this.box}
                  lockDirection={lockDirection}
                  isLock={isLock}
                />
              ) : null}
            </React.Fragment>
            <Children
              isFloat={isFloat}
              isLock={isLock}
              lockingWay={lockingWay}
              dragHeight={dragHeight}
            >
              {children}
            </Children>
          </Content>
        </Box>
        {mask && isDidMount ? <Mask zIndex={zIndex - 1} /> : null}
      </React.Fragment>
    );
  }
}
