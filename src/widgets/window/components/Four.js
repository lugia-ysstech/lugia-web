/*
 *   @flow
 */
import React from 'react';
import DragLine from './DragLine';
import DragPiece from './DragPiece';
import { directions } from '../initialState';
import { onMouseMoveEvent } from '../function/event';
import { getLimitPosition, getXY, getDownXY } from '../function/utils';

type TypeProps = {
  x: number,
  y: number,
  z?: number,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  minWidth: number,
  minHeight: number,
  maxX: number,
  maxY: number,
  canScale?: boolean,
  isLock?: boolean,
  mouseEvent: Object,
  onChangeSizeStart?: Function,
  onChangeSize?: Function,
  onChangeSizeEnd?: Function,
  lockDirection?: string,
};
export default class Four extends React.Component<TypeProps, any> {
  onMouseDownClient: Object;
  sizes: Object;
  limitXY: Object;
  propsSize: Object;
  propsXY: Object;
  maxXY: Object;
  sourceXY: Object;
  throttle: boolean;
  move: boolean;
  isUp: boolean;
  newDirection: string;
  downDirection: string;
  onMouseDown: Function;
  onMouseEnterArea: Function;
  onMouseLeaveArea: Function;
  onMouseMove: Function;
  onMouseUp: Function;
  onDragUp: Function;
  onDoubleClick: Function;
  onFreshWindowSize: Function;
  getChildren: Function;
  constructor() {
    super();
    this.state = {
      topIsDown: false,
      rightIsDown: false,
      bottomIsDown: false,
      leftIsDown: false,
    };
    this.onMouseDownClient = {
      downX: 0,
      downY: 0,
    };
    this.sizes = {};
    this.throttle = false;
    this.isUp = true;
    this.move = false;
    this.limitXY = {
      limitX: 0,
      limitY: 0,
    };
    this.propsSize = {};
    this.propsXY = {};
    this.maxXY = {};
  }
  getScaleDirections = () => {
    const { isLock, lockDirection } = this.props;
    if (isLock && lockDirection) {
      if (lockDirection === 'left') {
        return { borders: ['right'], pieces: [] };
      }
      if (lockDirection === 'right') {
        return {
          borders: ['left'],
          pieces: [],
        };
      }
    }
    return {
      borders: [...directions],
      pieces: [...directions],
    };
  };

  getChildren = (Target: any, directions: Array<string>): Array<any> => {
    if (!Array.isArray(directions) || directions.length === 0) {
      return [];
    }
    return directions.map((direction: string) => {
      return (
        <Target
          {...this.props}
          {...this.state}
          direction={direction}
          onMouseDown={this.onMouseDown}
          onMouseEnter={this.onMouseEnterArea}
          onMouseLeave={this.onMouseLeaveArea}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        />
      );
    });
  };

  onMouseDown = (
    e: SyntheticMouseEvent<HTMLButtonElement>,
    direction: string,
    newDirection: string
  ) => {
    const {
      width,
      height,
      x,
      y,
      maxX,
      maxY,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
    } = this.props;
    this.propsSize = {
      width,
      height,
    };
    this.propsXY = {
      x,
      y,
    };
    this.maxXY = {
      maxX,
      maxY,
    };
    this.downDirection = direction;

    const key = this.isDownKey(direction);
    this.setState({ [key]: true }, () => {
      const { limitX, limitY } = getLimitPosition(
        { ...this.state, width, height, x, y },
        newDirection,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight
      );
      this.limitXY = { limitX, limitY };
    });
    const { clientX: downX, clientY: downY } = e;
    this.onChangeSizeStart({ x, y, width, height });
    const { newX, newY } = getDownXY({
      x,
      y,
      downX,
      downY,
      width,
      height,
      direction: newDirection,
    });
    this.onMouseDownClient = { downX, downY };
    this.sourceXY = { sourceX: newX, sourceY: newY };
    this.isUp = false;
    this.newDirection = newDirection;
    this.sizes = {
      width,
      height,
      x,
      y,
      direction: newDirection,
    };
  };
  onChangeSizeStart = (param: { x: number, y: number, width: number, height: number }) => {
    const { onChangeSizeStart } = this.props;
    if (onChangeSizeStart) {
      onChangeSizeStart({ ...param });
    }
  };
  onMouseMove = (e: SyntheticMouseEvent<HTMLButtonElement>, direction: string) => {
    if (this.isUp) {
      return;
    }
    const { clientX, clientY } = e;
    const { downX, downY } = this.onMouseDownClient;
    if (clientX === downX && clientY === downY) {
      return;
    }
    const key = this.isDownKey(direction);
    const isDown = this.state[key];
    if (!isDown) {
      return;
    }
    if (this.throttle) {
      return;
    }
    this.move = true;
    this.throttle = true;
    setTimeout(() => {
      this.getMove(clientX, clientY);
      this.throttle = false;
    }, 20);
  };
  getMove = (clientX: number, clientY: number) => {
    const { mouseEvent, minWidth, minHeight, maxWidth, maxHeight } = this.props;
    const { x, y } = this.propsXY;
    const { width, height } = this.propsSize;
    const { maxX, maxY } = this.maxXY;
    const { limitX, limitY } = this.limitXY;
    const { x: newX, y: newY } = getXY(
      { ...this.state, maxX, maxY },
      this.newDirection,
      limitX,
      limitY,
      clientX,
      clientY
    );
    const result = onMouseMoveEvent(
      { clientX: newX, clientY: newY },
      { ...this.state },
      this.sourceXY,
      this.newDirection,
      x,
      y,
      width,
      height,
      { minWidth, minHeight, maxWidth, maxHeight }
    );
    this.sizes = { ...result, isTransition: false };
    mouseEvent.emit('border_move', this.sizes);
    const { onChangeSize } = this.props;
    const { width: changeW, height: changeH } = result;
    if (onChangeSize) {
      onChangeSize({ x, y, width: changeW, height: changeH });
    }
  };
  onMouseUp = () => {
    this.isUp = true;
    const { mouseEvent } = this.props;
    const direction = this.downDirection;
    const key = this.isDownKey(direction);
    const isDown = this.state[key];
    this.resetDownState();
    if (isDown && !this.move) {
      this.exportOnChangeSizeEnd();
      return;
    }
    if (!isDown && !this.move) {
      return;
    }

    mouseEvent.emit('border_up', this.sizes);
    this.exportOnChangeSizeEnd();
    this.move = false;
  };
  exportOnChangeSizeEnd = () => {
    const { onChangeSizeEnd } = this.props;
    if (onChangeSizeEnd) {
      const { width: changeW, height: changeH, x, y } = this.sizes;
      onChangeSizeEnd({ x, y, width: changeW, height: changeH });
    }
  };
  resetDownState = () => {
    this.setState({
      topIsDown: false,
      rightIsDown: false,
      bottomIsDown: false,
      leftIsDown: false,
    });
  };
  isDownKey = (param: string) => {
    return `${param}IsDown`;
  };
  render() {
    const { borders, pieces } = this.getScaleDirections();
    return [...this.getChildren(DragLine, borders), ...this.getChildren(DragPiece, pieces)];
  }
}
