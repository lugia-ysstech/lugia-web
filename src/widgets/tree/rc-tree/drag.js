/**
 *
 * create by fjz
 *
 * @flow
 */
import Listener from '@lugia/listener';
import React from 'react';
import { DragCopyWrap } from '../../css/tree';

class TreeDrag extends Listener {
  constructor(listener: Listener) {
    super();
    this.nodesInformation = {};
    this.listener = listener;
  }
  mouseDown(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>) {
    const { button } = mouseEvent;
    if (button !== 0) return;
    this.dragStart = true;
    const { clientX: mouseX, clientY: mouseY } = mouseEvent;
    this.dargNode = this.calculationMouseHoverPosition({ mouseX, mouseY });
    this.oldMousePosition = { mouseX, mouseY };
  }
  mouseUp(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, callback: Function) {
    this.dragStart = false;
    const { button } = mouseEvent;
    if (!this.Isdrag || button !== 0) return;
    this.Isdrag = false;
    const { preName } = this;
    preName && this.listener.emit(`${preName}-setDrageState`, '');
    this.listener.emit('copyEnd');
    if (!this.targetNode || !this.dargNode) return;
    const {
      nodeEmitName: targetkey,
      node: {
        props: { item: targetData, pos },
      },
      position: targetPositon,
    } = this.targetNode;
    const {
      pid: targetPid,
      path: targetPath = '',
      currentNodeIndex: targetCurrentIndex,
      nextNodeIndex: targetNextIndex,
      preNodeIndex: targetPreIndex,
      parentIndex: targetParentIndex,
    } = targetData;

    const {
      nodeEmitName: dragkey,
      node: {
        props: { item: dargData, translateTreeData },
      },
    } = this.dargNode;

    const {
      pid: dragtPid,
      path: dragPath = '',
      currentNodeIndex: dargCurrentIndex,
      nextNodeIndex: dargNextIndex,
      preNodeIndex: dargPreIndex,
    } = dargData;
    const pidArray = targetPath.split('/');
    if (pidArray.includes(dragkey)) {
      return;
    }
    if (targetkey === dragkey) return;
    const dropToGap = targetPositon !== 'dragOver' ? true : false;
    let res = {};
    if (!translateTreeData) {
      res = {
        dragInfo: {
          key: dragkey,
          pid: dragtPid,
          dargCurrentIndex,
          dargNextIndex,
          dargPreIndex,
          data: dargData,
        },
        targetInfo: {
          pid: targetPid,
          key: targetkey,
          targetParentIndex,
          targetCurrentIndex,
          targetNextIndex,
          targetPreIndex,
          data: targetData,
          pos,
          dropPosition:
            targetPositon === 'dragOver'
              ? 'in'
              : targetPositon === 'dragOverGapTop'
              ? 'top'
              : 'bottom',
        },
        dropToGap,
        translateTreeData,
      };
    } else {
      res = {
        dragInfo: {
          key: dragkey,
          pid: dragtPid,
          dragPath,
          data: dargData,
        },
        targetInfo: {
          pid: targetPid,
          key: targetkey,
          pos,
          data: targetData,
          dropPosition:
            targetPositon === 'dragOver'
              ? 'in'
              : targetPositon === 'dragOverGapTop'
              ? 'top'
              : 'bottom',
        },
        dropToGap,
        translateTreeData,
      };
    }

    callback(res);
  }
  mouseMove(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, calculateTelescopic: Function) {
    if (!this.dragStart) return;
    const { clientX: mouseX, clientY: mouseY } = mouseEvent;
    const { mouseX: oldX = 0, mouseY: oldY = 0 } = this.oldMousePosition || {};
    if (Math.abs(oldX - mouseX) < 20 && Math.abs(oldY - mouseY) < 20) return;
    this.Isdrag = true;
    const { node: { props: { title = '' } = {} } = {} } = this.dargNode;
    this.listener.emit('copyStart', {
      top: mouseY + 22,
      left: mouseX,
      title,
    });
    const { node: treeNode } = this.dargNode;
    if (!treeNode) return;
    const { props: { isLeaf, expanded } = {} } = treeNode;
    if (!isLeaf && expanded) {
      calculateTelescopic(treeNode);
    }
    clearTimeout(this.mouseTimer);
    this.mouseTimer = setTimeout(() => {
      if (!this.dragStart) return;
      const targetNode = this.calculationMouseHoverPosition({
        mouseX,
        mouseY,
      });
      const { nodeEmitName, position } = targetNode;
      const { preName } = this;
      this.targetNode = targetNode;
      preName && this.listener.emit(`${preName}-setDrageState`, '');
      nodeEmitName && position && this.listener.emit(`${nodeEmitName}-setDrageState`, position);
      this.preName = nodeEmitName;
    }, 100);
  }
  mouseLeave() {
    clearTimeout(this.mouseTimer);
    this.listener.emit(`${this.preName}-setDrageState`, '');
    this.listener.emit('copyEnd');
    this.dragStart = false;
    this.Isdrag = false;
  }
  calculationMouseHoverPosition(mouseInfo: Object) {
    const { mouseX, mouseY } = mouseInfo;
    if (!this.nodesInformation) return {};
    let hoverNode = {};
    Object.keys(this.nodesInformation).some((item, index, array) => {
      const { nodeRef, node } = this.nodesInformation[item];
      const {
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY,
        height,
      } = nodeRef.getBoundingClientRect();
      if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
        let position = '';
        const des = Math.max(height * 0.2, 4);
        if (mouseY <= minY + des) {
          position = 'dragOverGapTop';
        } else if (mouseY >= maxY - des) {
          position = 'dragOverGapBottom';
        } else {
          position = 'dragOver';
        }
        hoverNode = { position, nodeEmitName: item, node };
        return true;
      }
      return false;
    });
    return hoverNode;
  }
  deltetNodeInformation(nodeName: String) {
    const { nodesInformation } = this;
    nodeName && delete nodesInformation[nodeName];
  }
  collectNodeInformation(nodeInformation: Object = {}) {
    const { nodeName, nodeRef, node } = nodeInformation;
    if (!nodeName || !nodeRef) return;
    this.nodesInformation = this.nodesInformation
      ? { ...this.nodesInformation, [nodeName]: { nodeRef, node } }
      : { [nodeName]: { nodeRef, node } };
  }
}

class TreeDragController {
  treeDrags: Object;
  constructor() {
    this.treeDrags = {};
    this.Grouping = {};
  }
  createTreeDrag = () => {
    const treeGragUUID = this.createUUid();
    const treeListener = new Listener();
    const treeGrag = new TreeDrag(treeListener);
    treeGrag.uuid = treeGragUUID;
    this.treeDrags = { ...this.treeDrags, ...{ [treeGragUUID]: treeGrag } };
    return treeGrag;
  };
  getTreeDrag = (key: String) => {
    return this.treeDrags[key];
  };
  destroyTreeDrag = (key: String) => {
    delete this.treeDrags[key];
  };
  createUUid = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((Number(s[19]) & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  };
}
const treeDragController = new TreeDragController();

export { treeDragController };

export type DragPosition = {
  top: number,
  left: number,
};
export type DragCopyState = {
  isShow: boolean,
  title: string,
  position: DragPosition,
};
export type PropsCopyState = {
  treeDrag: TreeDrag,
};
export default class DragCopy extends React.Component<PropsCopyState, DragCopyState> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isShow: false,
      title: '',
      position: { top: 0, left: 0 },
    };
  }
  floatContent: React$Node;
  DragCopy = (node: React$Node) => {
    this.floatContent = node;
  };
  componentDidMount() {
    const {
      treeDrag: { listener: treeListener },
    } = this.props;
    treeListener.on('copyStart', copyInfo => {
      const { top, left, title } = copyInfo;
      this.setState({ isShow: true, title, position: { top, left } });
    });
    treeListener.on('copyEnd', copyInfo => {
      this.setState({ isShow: false, title: '' });
    });
  }
  render() {
    const {
      isShow,
      title,
      position: { top = 0, left = 0 },
    } = this.state;
    return (
      isShow && (
        <DragCopyWrap
          ref={this.DragCopy}
          style={{
            left,
            top,
          }}
        >
          {title}
        </DragCopyWrap>
      )
    );
  }
}
