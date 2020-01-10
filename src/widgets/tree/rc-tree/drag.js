/**
 *
 * create by fjz
 *
 * @flow
 */
import Listener from '@lugia/listener';
import React from 'react';
import { DragCopyWrap } from '../../css/tree';

type createTreeDragParameter = {
  groupKey?: string,
};

class TreeDragController {
  treeDrags: Object;
  groups: Object;
  dragOutInfo: Object;
  constructor() {
    this.treeDrags = {};
    this.groups = {};
    this.dragOutInfo = null;
  }
  createTreeDrag = (parps: createTreeDragParameter = {}) => {
    const treeGragUUID = this.createUUid();
    const treeListener = new Listener();
    const treeGrag = new TreeDrag(treeListener);
    treeGrag.uuid = treeGragUUID;
    this.treeDrags = { ...this.treeDrags, ...{ [treeGragUUID]: treeGrag } };

    const { groupKey } = parps;
    if (groupKey) {
      treeGrag.groupKey = groupKey;
      this.groups[groupKey]
        ? this.groups[groupKey].push(treeGrag.uuid)
        : (this.groups[groupKey] = [treeGrag.uuid]);
    }
    return treeGrag;
  };
  getTreeDrag = (key: String) => {
    return this.treeDrags[key];
  };
  getGroupAllData = () => {
    return this.groups;
  };
  getGroupDataByGroupKey = (key: string) => {
    return this.groups[key];
  };
  destroyInvalidGroupInfo = () => {
    Object.keys(this.groups).forEach(item => {
      if (this.groups[item].length <= 0) {
        delete this.groups[item];
      }
    });
  };
  deleteGroupRelationship = treeDragData => {
    const { uuid, groupKey } = treeDragData;
    const groupData = this.groups[groupKey];
    if (!groupData) return;
    const findIndex = groupData.indexOf(uuid);
    findIndex >= 0 && groupData.splice(findIndex, 1);
    this.destroyInvalidGroupInfo();
  };
  destroyTreeDrag = (treekey: String) => {
    const treeDragData = this.treeDrags[treekey];
    if (!treeDragData) return;
    this.deleteGroupRelationship(treeDragData);
    delete this.treeDrags[treekey];
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

  setDragOutInfo = (info: Object) => {
    this.dragOutInfo = info;
  };
  destroyDragOutInfo = () => {
    this.dragOutInfo = null;
  };
}
const treeDragController = new TreeDragController();

class TreeDrag extends Listener {
  constructor(listener: Listener) {
    super();
    this.nodesInformation = {};
    this.listener = listener;
  }
  mouseDown(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>) {
    const { clientX: mouseX, clientY: mouseY, button } = mouseEvent;
    if (button !== 0) return;
    this.dragStart = true;
    this.dargNode = this.calculationMouseHoverPosition({ mouseX, mouseY });
    this.oldMousePosition = {
      mouseX,
      mouseY,
    };
  }
  mouseUp(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, callback: Function) {
    this.dragStart = false;
    const { button } = mouseEvent;
    if (!this.Isdrag || button !== 0) return;
    this.Isdrag = false;
    const { preName } = this;
    preName && this.listener.emit(`${preName}-setDrageState`, '');
    this.listener.emit('copyEnd');
    const isSelf = treeDragController.source ? treeDragController.source === this.uuid : true;
    this.dragStart = false;
    this.Isdrag = false;
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
    if (pidArray.includes(dragkey) && isSelf) {
      return;
    }
    if (targetkey === dragkey && isSelf) return;
    const dropToGap = targetPositon !== 'dragOver' ? true : false;
    const res = {
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
      isSelf,
    };
    if (!translateTreeData) {
      res.dragInfo = {
        dargCurrentIndex,
        dargNextIndex,
        dargPreIndex,
        data: dargData,
        ...res.dragInfo,
      };
      res.targetInfo = {
        targetParentIndex,
        targetCurrentIndex,
        targetNextIndex,
        targetPreIndex,
        ...res.targetInfo,
      };
    }
    treeDragController.dragOutInfo = undefined;
    treeDragController.oldMousePosition = undefined;
    treeDragController.source = undefined;
    this.dargNode = undefined;
    callback(res);
  }
  mouseMove(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, calculateTelescopic: Function) {
    if (!this.dragStart) return;
    const { clientX: mouseX, clientY: mouseY } = mouseEvent;
    const { mouseX: oldX = 0, mouseY: oldY = 0 } = this.oldMousePosition || {};
    if (Math.abs(oldX - mouseX) < 20 && Math.abs(oldY - mouseY) < 20) return;
    this.Isdrag = true;
    if (!this.dargNode) return;
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
      if (!targetNode) return;
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
    if (this.dragStart && this.dargNode && this.oldMousePosition) {
      treeDragController.source = this.uuid;
      treeDragController.dragOutInfo = this.dargNode;
      treeDragController.oldMousePosition = this.oldMousePosition;
      document.addEventListener('mouseup', this.documentMouseUp);
    }
    this.dragStart = false;
    this.Isdrag = false;
    if (!treeDragController.getGroupDataByGroupKey(this.groupKey) && !this.dargNode) return;
    // Todo
    treeDragController.dragOutInfo = this.dargNode;
    document.addEventListener('mousemove', this.documentMouseMove);
    document.addEventListener('mouseup');
  }
  documentMouseMove(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>) {
    console.log('documentMouseMove');
  }
  documentMouseUp() {
    console.log('documentMouseUp');
  }
  mouseEnter() {
    // Todo 鼠标进入触发
    document.removeEventListener('mousemove', this.documentMouseMove);
    document.removeEventListener('mouseup', this.documentMouseUp);
  }

  documentMouseUp = () => {
    document.removeEventListener('mouseup', this.documentMouseUp);
    treeDragController.source = undefined;
    treeDragController.dragOutInfo = undefined;
    treeDragController.oldMousePosition = undefined;
  };
  onMouseEnter() {
    if (treeDragController.dragOutInfo) {
      this.dragStart = true;
      this.dargNode = treeDragController.dragOutInfo;
      this.oldMousePosition = treeDragController.oldMousePosition;
    } else {
      this.dargNode = undefined;
      this.oldMousePosition = undefined;
    }
  }
  calculationMouseHoverPosition(mouseInfo: Object) {
    const { mouseX, mouseY } = mouseInfo;
    if (!this.nodesInformation) return {};
    let hoverNode = undefined;
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
  deletetNodeInformation(nodeName: String) {
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
    const { listener: treeListener } = this.props;
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
