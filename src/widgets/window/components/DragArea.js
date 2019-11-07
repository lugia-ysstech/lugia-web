/*
 *   @flow
 */
import React from 'react';
import { getMoveXY, dragCircle, dragRange, getLockingWay } from '../function/utils';
import { changeFloatTimes } from '../function/getZ';
import { dragXY } from '../function/event';
import { isNumber } from '../function/math';
import initialState, { normalDragFloatSize } from '../initialState';
import Icon from '../../icon/index';
import { DragWrap, DragBox, Close, Drag, Float, Image } from '../styled';
const { floatWidth, floatHeight } = normalDragFloatSize;
type TypeProps = {
  onClose?: boolean,
  canMinimize?: boolean,
  headReverse?: boolean,
  isLock?: boolean,
  hasClose?: boolean,
  mouseEvent: Object,
  onClose?: Function,
  onUp?: Function,
  onOpen?: Function,
  onDrag?: Function,
  onDragStart?: Function,
  onDragEnd?: Function,
  upDateZFn: Function,
  getHeadEvent?: Function,
  windowWidth: number,
  windowHeight: number,
  componentIndex: number,
  lockingWay?: string,
  zIndexArr: Array<number>,
  lockingIcon?: string,
  minimizeIcon?: string,
  id: number,
  lockDirection: string,
  width: number,
  height: number,
  maxX: number,
  maxY: number,
  x: number,
  y: number,
  lockTop: number,
};

type TypeDragWnd = {
  isUpdata: boolean,
  width: number,
  height: number,
  isFloat: boolean,
};
export default class DragArea extends React.Component<TypeProps, any> {
  changeFloat: Function;
  onMouseDownClient: Function;
  onFreshWindowSize: Function;
  xy: Object;
  propsSize: Object;
  propsXY: Object;
  oldSize: Object;
  throttle: boolean;
  up: boolean;
  move: boolean;
  moveTimes: number;
  lockDirection: string;
  haveDirection: string;
  currentlockDirection: string;
  constructor(props: TypeProps) {
    super(props);
    const { isFloat } = initialState;
    const { id, lockDirection } = props;
    const { changeFloat } = changeFloatTimes(id, isFloat);
    this.Drag = React.createRef();
    this.dragHeight = 0;
    this.changeFloat = changeFloat;
    this.lockDirection = lockDirection;
    this.haveDirection = lockDirection;
    this.state = {
      isDown: false,
      isFloat,
      isDoubleClick: false,
      right: '',
      isFixed: false,
      isClickBtn: false,
    };
    this.onMouseDownClient = {
      downX: 0,
      downY: 0,
    };
    this.xy = {
      x: 0,
      y: 0,
    };
    this.throttle = false;
    this.up = true;
    this.move = false;
    this.moveTimes = 0;
    this.propsSize = {};
    this.propsXY = {};
  }
  onUpDown = () => {
    this.setState({ isDown: false });
  };
  onUpUp = () => {
    const { isFixed } = this.state;
    if (isFixed) {
      return;
    }
    const { onUp, maxX, x, y } = this.props;
    const isFloat = true;
    const { left, right, x: newX } = dragCircle({ x, maxX, isFloat });
    this.changeFloatFun(isFloat);
    const sameState = {
      isFloat,
      isTransition: true,
    };
    const lockDirection = this.getFloatOpenLockDirection(right);
    if (onUp) {
      const param = {
        width: floatWidth,
        height: floatHeight,
        y: this.getIsFloatLimtY(isFloat, '', y),
        x: newX,
        left,
        right,
        ...sameState,
        lockDirection,
      };

      onUp(param);
    }
    this.setState({
      isDown: false,
      ...sameState,
      right,
    });
  };
  onOpen = () => {
    const { onOpen, mouseEvent } = this.props;
    const isFloat = false;
    const isTransition = true;
    this.changeFloatFun(isFloat);

    const { x, y, right, left } = this.getOpenPoint();
    const lockDirection = this.getFloatOpenLockDirection(right);
    const state = {
      x,
      y: this.getLockY(lockDirection, y),
      right,
      left,
      isTransition,
      lockDirection,
    };
    if (onOpen) {
      onOpen({ isFloat, lockDirection });
    }
    mouseEvent.emit('drag_open', state);
    this.setState({ isDown: false, isFloat, isTransition });
  };
  getFloatOpenLockDirection = (right: string) => {
    const { lockingWay } = this.props;
    const { isDrag } = getLockingWay(lockingWay);
    if (!isDrag) {
      return '';
    }
    return right ? 'right' : 'left';
  };
  changeFloatFun(isFloat: boolean) {
    const { id } = this.props;
    this.changeFloat(id, isFloat);
  }
  getOpenPoint() {
    const { x, y } = this.resetXY();
    const { maxX } = this.props;
    const { width } = this.propsSize;
    const { right: hasRight } = this.state;
    const direction = hasRight !== '' ? 'right' : 'left';
    const { left, right, x: newX } = dragCircle({ x, maxX, width, isFloat: false, direction });
    return {
      x: newX,
      y,
      right,
      left,
    };
  }
  resetXY = () => {
    const { right } = this.state;
    const { width, height } = this.propsSize;
    const { x, y } = this.propsXY;
    const { maxX, maxY } = this.props;
    let newX = x;
    let newY = y;
    if (right) {
      newX = maxX - width;
    }
    if (height > maxY - y) {
      newY = maxY - height;
    }
    return { x: newX, y: newY };
  };
  onDoubleClick = () => {
    const { isFixed } = this.state;
    if (isFixed) {
      return;
    }
    const { mouseEvent, windowWidth, windowHeight, isLock, canDoubleClickScale } = this.props;
    if (isLock || !canDoubleClickScale) {
      return;
    }
    const { isDoubleClick } = this.state;
    const isTransition = false;
    if (isDoubleClick) {
      mouseEvent.emit('onDoubleClick', {
        ...this.oldSize,
        isDoubleClick: false,
        isTransition,
      });
    } else {
      const { width, height } = this.propsSize;
      const { x, y } = this.propsXY;
      mouseEvent.emit('onDoubleClick', {
        width: windowWidth,
        height: windowHeight,
        x: 0,
        y: 0,
        isDoubleClick: true,
        isTransition,
      });
      this.oldSize = { width, height, x, y };
    }
    this.setState({ isDoubleClick: !isDoubleClick, isTransition });
  };
  onMouseDown = (e: Object) => {
    const { isFixed } = this.state;
    if (isFixed) {
      return;
    }
    const { isLock, lockingWay } = this.props;
    const { isClick } = getLockingWay(lockingWay);
    if (isLock && isClick) {
      return;
    }
    const { clientX: downX, clientY: downY } = e;
    this.onMouseDownClient = { downX, downY };
    this.setState({ isDown: true });
    this.up = false;
    const { width, height, x, y } = this.props;
    this.propsSize = { width, height };
    this.propsXY = { x, y };
    this.currentlockDirection = this.lockDirection;
    this.onDragStart(x, y, this.lockDirection);
  };
  onDragStart = (x: number, y: number, lockDirection: string) => {
    const { onDragStart } = this.props;
    if (onDragStart) {
      onDragStart({ x, y, lockDirection });
    }
  };
  onMouseMove = (e: Object) => {
    const { propsIsLock } = this.props;
    if (propsIsLock) {
      return;
    }
    const { isDown, isFixed } = this.state;
    const moveEqualDown = this.moveEqualDown(e);
    if (!isDown || this.up || isFixed || moveEqualDown || this.throttle) {
      return;
    }

    this.throttle = true;
    this.move = true;

    const { windowWidth, windowHeight, isLock, lockingWay, lockTop } = this.props;
    const { isDrag } = getLockingWay(lockingWay);
    const { currentX, currentY, lockDirection } = dragRange(
      e,
      isDrag,
      lockTop,
      windowWidth,
      windowHeight
    );
    if (isLock && isDrag) {
      this.intoFatherContainer();
    }

    if (lockDirection) {
      this.haveDirection = lockDirection;
    }
    setTimeout(() => {
      this.lockDirection = lockDirection;
      this.movePosition(currentX, currentY, lockDirection, isDrag);
      this.throttle = false;
    }, 20);
  };
  moveEqualDown = (e: Object) => {
    const { clientX, clientY } = e;
    const { downX, downY } = this.onMouseDownClient;
    return downX === clientX && downY === clientY;
  };
  movePosition = (currentX: number, currentY: number, lockDirection: string, isDrag: boolean) => {
    if (this.up) {
      return;
    }
    const { mouseEvent } = this.props;
    const { downX, downY } = this.onMouseDownClient;
    const { isFloat } = this.state;
    const { x, y } = this.propsXY;
    const position = getMoveXY(downX, downY, currentX, currentY);
    const { moveX, moveY } = position;
    const result = dragXY(x, y, moveX, moveY);
    const { x: resultX, y: resultY } = result;
    this.moveTimes += 1;
    const upDateSize =
      this.moveTimes === 1 && !isFloat && isDrag ? { width: 'auto', height: 'auto' } : {};
    mouseEvent.emit('onDragMove', {
      x: resultX,
      y: resultY,
      right: '',
      left: '',
      isTransition: false,
      lockDirection,
      ...upDateSize,
    });
    this.xy = { x: resultX, y: resultY };
    const { onDrag } = this.props;
    if (onDrag) {
      const newlockDirection = isFloat ? '' : lockDirection;
      const { zIndexArr = [0] } = this.props;
      const max = Math.max(...zIndexArr);
      onDrag({
        ...this.xy,
        clientX: currentX,
        clientY: currentY,
        lockDirection: newlockDirection,
        sideZIndex: max,
      });
    }
  };
  onMouseUp = (e: Object) => {
    this.up = true;
    const { mouseEvent } = this.props;
    const { isDown, isFloat } = this.state;
    const { width, height } = this.propsSize;

    if (!isDown) {
      return;
    }
    this.setState({ isDown: false });
    if (!this.move) {
      if (isFloat) {
        this.onOpen();
      } else {
        this.onDragEnd({
          isUpdata: false,
          width,
          height,
          isFloat,
          lockDirection: this.currentlockDirection,
        });
      }

      return;
    }
    if (this.moveEqualDown(e)) {
      return;
    }

    const lockDirection = isFloat ? '' : this.lockDirection;
    this.onDragEnd({ isUpdata: true, width, height, isFloat, lockDirection });
    const { left, right, newX, newY } = this.circleFloatXY(lockDirection);
    const isTransition = false;
    const isDoubleClick = false;
    mouseEvent.emit('onDragUp', {
      isUpDate: true,
      ...this.xy,
      y: this.getLockY(lockDirection, newY),
      x: newX,
      right,
      left,
      isDoubleClick,
      isTransition,
    });
    this.setState({
      isDoubleClick,
      isTransition,
      right,
    });
    this.move = false;
  };
  onDragEnd = ({ isUpdata, width, height, isFloat, lockDirection }: TypeDragWnd) => {
    const { onDragEnd } = this.props;
    if (onDragEnd) {
      this.lockupDateZIndex();
      onDragEnd({ isUpdata, width, height, isFloat, lockDirection });
    }
  };
  getLockY = (lockDirection: string, y: number) => {
    const { lockTop, lockingWay } = this.props;
    const { isDrag } = getLockingWay(lockingWay);
    return isDrag && lockDirection && isNumber(lockTop) ? lockTop : y;
  };
  lockupDateZIndex = () => {
    const { id, lockingWay } = this.props;
    const { isFloat } = this.state;
    const { isDrag } = getLockingWay(lockingWay);
    if (isFloat || !isDrag || !this.lockDirection) {
      return;
    }
    const hasFloat = this.changeFloat(id, false);
    const { upDateZFn, zIndexArr, mouseEvent, componentIndex } = this.props;
    const min = Math.min(...zIndexArr);
    const newZ = hasFloat ? min - 1 : min + 1;
    if (upDateZFn) {
      upDateZFn(componentIndex, newZ);
    }
    mouseEvent.emit('lockupDateZIndex', { z: newZ });
  };
  circleFloatXY = (lockDirection: string) => {
    const { x: currentX, y } = this.xy;
    const { isFloat } = this.state;
    const { maxX } = this.props;
    const { width } = this.propsSize;
    const { left, right, x } = dragCircle({
      x: currentX,
      maxX,
      isFloat,
      direction: lockDirection,
      width,
    });
    return {
      left,
      right,
      newX: x,
      newY: this.getIsFloatLimtY(isFloat, lockDirection, y),
    };
  };
  getIsFloatLimtY = (isFloat: boolean, lockDirection: string, y: number): number => {
    const { maxY } = this.props;
    const limitMaxY = maxY - floatHeight - 1;
    return lockDirection ? 0 : isFloat ? Math.max(1, Math.min(y, limitMaxY)) : y;
  };
  addListener = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  intoFatherContainer = () => {
    const { mouseEvent } = this.props;
    const { isLock } = this.props;
    mouseEvent.emit('upDate_isLock', { isLock: !isLock });
  };
  onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  componentDidMount() {
    this.addListener();
  }
  componentDidUpdate() {
    if (this.Drag.current) {
      const { offsetHeight } = this.Drag.current;

      const { mouseEvent, getHeadEvent } = this.props;
      if (!this.dragHeight) {
        mouseEvent.emit('upDateDragHeight', { dragHeight: offsetHeight });
        if (getHeadEvent) {
          getHeadEvent(this);
        }
        this.dragHeight = offsetHeight;
      }
    }
  }

  getHeadIconNumber = () => {
    const { hasClose, lockingWay, canMinimize } = this.props;
    let number = 0;
    const { isClick } = getLockingWay(lockingWay);
    if (hasClose || isClick || canMinimize) {
      number += 1;
    }
    return number;
  };
  onFixed = () => {
    const { isFixed } = this.state;
    const newIsFixed = !isFixed;
    this.setState({ isFixed: newIsFixed });
    const { onFixed } = this.props;
    if (onFixed) {
      onFixed({ isFixed: newIsFixed });
    }
  };
  headLock = () => {
    const { isFloat, isFixed } = this.state;
    const {
      lockingWay,
      headReverse,
      canMinimize,
      isLock,
      lockingIcon,
      minimizeIcon,
      onFixed,
    } = this.props;
    const { isClick } = getLockingWay(lockingWay);
    const disableUp = (isClick && isLock) || !canMinimize;
    const hasOnFixed = 'onFixed' in this.props && typeof onFixed === 'function';
    const minComponentProps = {
      //onClick: disableUp ? null : this.onUp,
      onMouseDown: disableUp ? null : this.onUpDown,
      onMouseUp: disableUp ? null : this.onUpUp,
      disableUp,
      isFloat,
      isLock,
      headReverse,
      iconClass: minimizeIcon || 'lugia-icon-reminder_minus',
    };
    const lockComponentProps = {
      onClick: this.intoFatherContainer,
      isFloat,
      headReverse,
      iconClass: lockingIcon || 'lugia-icon-financial_tag',
    };
    const fixedComponentProps = {
      onClick: this.onFixed,
      isFloat,
      isFixed,
      headReverse,
      iconClass: 'lugia-icon-financial_pin',
    };
    const scaleComponent = disableUp ? null : this.iconComponent(minComponentProps);
    const modeComponent = isClick ? this.iconComponent(lockComponentProps) : null;
    const fixedComponent = hasOnFixed && !isLock ? this.iconComponent(fixedComponentProps) : null;
    return (
      <React.Fragment>
        {headReverse ? null : fixedComponent}
        {headReverse ? scaleComponent : modeComponent}
        {headReverse ? modeComponent : scaleComponent}
        {headReverse ? fixedComponent : null}
      </React.Fragment>
    );
  };

  headFloat = () => {
    const { isFloat } = this.state;
    const { isLock, hasClose, headReverse } = this.props;
    const componentProps = {
      onClick: this.onClose,
      isFloat,
      isLock,
      headReverse,
      iconClass: 'lugia-icon-reminder_close',
    };
    return hasClose ? this.iconComponent(componentProps) : null;
  };

  iconComponent = (props: Object) => {
    const { iconClass, isFixed } = props;
    return (
      <Close {...props} isChecked={isFixed}>
        <Icon iconClass={iconClass} />
      </Close>
    );
  };

  render() {
    const { isFloat, isTransition } = this.state;
    const { isLock, headReverse, head } = this.props;
    const iconNumber = this.getHeadIconNumber();
    const headFloat = !isFloat ? this.headFloat() : null;
    const headLock = !isFloat ? this.headLock() : null;
    return (
      <React.Fragment>
        <DragWrap ref={this.Drag}>
          {head && !isFloat ? (
            <Drag
              isFloat={isFloat}
              isLock={isLock}
              onMouseDown={this.onMouseDown}
              iconNumber={iconNumber}
              onDoubleClick={this.onDoubleClick}
              height={'auto'}
              width={'100%'}
              display={'block'}
            >
              <div>{!isFloat ? head : null}</div>
            </Drag>
          ) : (
            <DragBox isFloat={isFloat} isTransition={isTransition}>
              {headReverse ? headFloat : headLock}
              {isFloat ? (
                <React.Fragment>
                  <Float onMouseDown={this.onMouseDown}>
                    <Image />
                  </Float>
                </React.Fragment>
              ) : (
                <Drag
                  isFloat={isFloat}
                  isLock={isLock}
                  onMouseDown={this.onMouseDown}
                  iconNumber={iconNumber}
                  onDoubleClick={this.onDoubleClick}
                >
                  <div>{!isFloat ? head : null}</div>
                </Drag>
              )}
              {headReverse ? headLock : headFloat}
            </DragBox>
          )}
        </DragWrap>
      </React.Fragment>
    );
  }
}
