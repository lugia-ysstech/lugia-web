/*
 *   @flow
 */
import React from 'react';
import Event from '@lugia/listener';
import Window from './Window';
import { minSize } from '../initialState';
import ReactDOM from 'react-dom';
import { Edge } from '../styled';
import { getLockingWay } from '../function/utils';
type TypeProps = {
  x?: number,
  y?: number,
  z?: number,
  width?: number,
  height?: number,
  lockTop?: number,
  lockBottom?: number,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  lockingWay?: string, //窗口锁定方式  default|click|drag
  canScale?: boolean, // 是否开启窗体拉伸缩放
  canMinimize?: boolean, //是否开启窗体最小化
  headReverse?: boolean, //窗体头部标签是否反序排列 默认false
  onClose?: Function,
  onOpen?: Function,
  onDrag?: Function,
  onDragEnd?: Function,
  onChangeSize?: Function,
  onChangeSizeEnd?: Function,
  onChangeLock?: Function,
  defaultIsLock?: boolean,
  isLock?: boolean,
  visible?: boolean,
  lockDirection?: string,
  head: any,
};
export default class Container extends React.Component<TypeProps, any> {
  static displayName = 'WindowContainer';
  dom: any;
  mouseEvents: any;
  lockDirection: string;

  constructor(props: TypeProps) {
    super(props);
    const { defaultIsLock = false, isLock, lockDirection = '' } = props;
    this.dom = document.createElement('div');
    const normalLock = isLock || defaultIsLock;
    this.state = {
      isLock: normalLock,
      lockDirection: normalLock ? lockDirection : '',
      isShowSide: false,
    };
    this.mouseEvents = new Event();
  }
  onOpen = (param: Object) => {
    const { lockDirection } = param;
    const { lockingWay, onOpen } = this.props;
    const { isDrag } = getLockingWay(lockingWay);
    this.setState({ isLock: isDrag, lockDirection });
    if (onOpen) {
      onOpen({ lockDirection, isLock: isDrag });
    }
  };
  onDragStart = (param: Object) => {
    const { lockDirection } = param;
    this.lockDirection = lockDirection;
    const { onDragStart } = this.props;
    if (onDragStart) {
      onDragStart({ ...param });
    }
  };
  onDrag = (param: Object) => {
    const { lockDirection } = param;
    this.lockDirection = lockDirection;
    const { x, y, clientX, clientY, sideZIndex } = param;
    const { onDrag, lockingWay } = this.props;
    const { isDrag } = getLockingWay(lockingWay);
    if (onDrag) {
      onDrag({ left: x, top: y, clientX, clientY });
    }
    const isShowSide = !!lockDirection && isDrag;

    this.setState({ lockDirection, isShowSide, sideZIndex });
  };
  onDragEnd = (param: Object) => {
    const { isLock } = this.getEndState();
    const { width, height, lockDirection, sizeZIndex, isUpdata } = param;
    isUpdata && this.setState({ isLock, isShowSide: false, width, height, sizeZIndex });
    const { onDragEnd } = this.props;
    if (onDragEnd) {
      onDragEnd({ isLock, lockDirection });
    }
  };
  getEndState = () => {
    const { lockingWay } = this.props;
    let isLock = false;
    const { isDrag } = getLockingWay(lockingWay);
    if (isDrag && this.lockDirection) {
      isLock = true;
    }
    return {
      isLock,
    };
  };
  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.dom);
    }
    let { z } = this.props;
    if (!z) {
      z = this.getMaxZindex();
    }
    this.mouseEvents.emit('upDate_zIndex', { z });
  }

  getMaxZindex = () => {
    const nodes =
      document.body &&
      document.body.getElementsByTagName &&
      document.body.getElementsByTagName('*');
    if (!nodes) {
      return 0;
    }
    const { length } = nodes;
    const zIndexs = [];
    for (let i = 0; i < length; i += 1) {
      const node = nodes[i];
      const { zIndex } = window.getComputedStyle(node, null);
      if (zIndex !== 'auto') {
        zIndexs.push(zIndex);
      }
    }
    if (zIndexs.length === 0) {
      return 0;
    }
    const max = Math.max(...zIndexs);
    return max;
  };

  onChangeLock = (param: Object) => {
    const { isLock } = param;
    const { onChangeLock, lockingWay } = this.props;
    const { isClick } = getLockingWay(lockingWay);
    if (onChangeLock && isClick) {
      onChangeLock({ isLock });
    }
    this.setState({ isLock });
  };
  onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
  hasOnClose = () => {
    const { onClose } = this.props;
    return onClose && typeof onClose === 'function';
  };
  getComponent = () => {
    const { isLock, lockDirection, isShowSide, sideZIndex } = this.state;
    const { minWidth: minW, minHeight: minH } = minSize;
    const {
      lockingWay,
      lockTop = 0,
      lockBottom = 0,
      minWidth = minW,
      minHeight = minH,
      isLock: propsIsLock,
      visible = true,
    } = this.props;
    const hasClose = this.hasOnClose();
    const config = {
      ...this.props,
      lockTop,
      lockBottom,
      minWidth,
      minHeight,
      onChangeLock: this.onChangeLock,
      mouseEvents: this.mouseEvents,
      isLock,
      propsIsLock,
      hasClose,
      lockDirection,
      onDragStart: this.onDragStart,
      onDrag: this.onDrag,
      onDragEnd: this.onDragEnd,
      onClose: this.onClose,
      onOpen: this.onOpen,
    };
    if (!visible) {
      return null;
    }
    const { isClick } = getLockingWay(lockingWay);

    if (isLock && isClick) {
      this.mouseEvents.emit('render_intoState', { isInto: true });
      return <Window {...config} />;
    }
    return ReactDOM.createPortal(
      <React.Fragment>
        <Window {...config} dom={this.dom} />
        <Edge
          lockDirection={lockDirection}
          isShowSide={isShowSide && lockDirection}
          sideZIndex={sideZIndex}
          lockTop={lockTop}
          lockBottom={lockBottom}
        />
      </React.Fragment>,
      this.dom
    );
  };

  render() {
    return this.getComponent();
  }
}
