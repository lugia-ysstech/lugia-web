/**
 *
 * create by fjz
 *
 * @flow
 */
import Listener from '@lugia/listener';
import React from 'react';
import { DragCopyWrap } from '../../css/tree';
import ReactDom from 'react-dom';

type createTreeDragParameter = {
  groupKey?: string,
};

class TreeDragController {
  treeDrags: Object;
  groups: Object;
  isDrag: boolean;
  dragCopyListener: Listener;
  dragNode: Object;
  previousDragEnd: Function;
  dragStart: boolean;
  oldMousePosition: Object;
  treeSource: string;
  constructor() {
    this.treeDrags = {};
    this.groups = {};
  }
  createTreeDrag = (props: createTreeDragParameter = {}) => {
    const treeGragUUID = this.createUUid();
    const treeListener = new Listener();
    const treeGrag = new TreeDrag(treeListener);
    treeGrag.uuid = treeGragUUID;
    this.treeDrags = { ...this.treeDrags, ...{ [treeGragUUID]: treeGrag } };
    const { groupKey } = props;
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

  deleteGroupRelationship = (treeDragData: Object) => {
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
  createDragCopyDiv = () => {
    if (!this.isDrag) return;
    document.addEventListener('mousemove', this.documentMouseMove);
    document.addEventListener('mouseup', this.documentMouseUp);
    if (!this.dragCopyListener) {
      const maskNode = document.createElement('div');
      window.document.body.appendChild(maskNode);
      const treeListener = new Listener();
      this.dragCopyListener = treeListener;
      ReactDom.render(<DragCopy listener={treeListener} />, maskNode);
    }
  };
  destroyDragCopyDiv = () => {
    if (this.dragCopyListener) {
      this.dragCopyListener.emit('copyEnd');
      document.removeEventListener('mousemove', this.documentMouseMove);
      document.removeEventListener('mouseup', this.documentMouseUp);
    }
  };
  documentMouseMove = (mouseEvent: MouseEvent) => {
    const { clientX: mouseX, clientY: mouseY } = mouseEvent;
    const { node: { props: { title = '' } = {} } = {} } = treeDragController.dragNode;
    this.dragCopyListener.emit('copyStart', {
      top: mouseY + 22,
      left: mouseX,
      title,
    });
  };
  documentMouseUp = () => {
    document.removeEventListener('mousemove', this.documentMouseMove);
    document.removeEventListener('mouseup', this.documentMouseUp);
    this.previousDragEnd && this.previousDragEnd();
    this.dragNode = undefined;
    this.isDrag = false;
    this.dragStart = false;
    this.oldMousePosition = undefined;
    this.previousDragEnd = undefined;
    this.dragCopyListener.emit('copyEnd');
  };
  isSameGroup = (groupKey: string, currentTreeKey: string) => {
    if (this.treeSource === currentTreeKey) return true;
    const groupData = this.getGroupDataByGroupKey(groupKey);
    return groupData ? groupData.includes(currentTreeKey) : false;
  };
  getDragNodeData() {
    let res: Object = {};
    if (!this.dragNode) return res;
    const {
      node: {
        props: {
          disabled,
          expanded,
          isLeaf,
          item: { path, pid, value, text, currentNodeIndex } = {},
        },
      } = {},
    } = this.dragNode;
    res = { text, value, pid, path, disabled, expanded, isLeaf, currentNodeIndex };
    return res;
  }
}
const treeDragController = new TreeDragController();

class TreeDrag {
  nodesInformation: Object;
  listener: Listener;
  uuid: string;
  groupKey: string;
  preName: string;
  targetNode: Object;
  mouseTimer: TimeoutID;
  constructor(listener: Listener) {
    this.nodesInformation = {};
    this.listener = listener;
  }
  mouseDown(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>) {
    const { clientX: mouseX, clientY: mouseY, button } = mouseEvent;
    if (button !== 0) return;
    const dragNode = this.calculationMouseHoverPosition({ mouseX, mouseY });
    const { node: { props: { disabled } = {} } = {} } = dragNode || {};
    if (dragNode && !disabled) {
      treeDragController.dragNode = dragNode;
      treeDragController.dragStart = true;
      treeDragController.treeSource = this.uuid;
      treeDragController.oldMousePosition = {
        mouseX,
        mouseY,
      };
    }
  }
  mouseUp(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, callback: Function) {
    treeDragController.dragStart = false;
    const { button } = mouseEvent;
    if (!treeDragController.isDrag || button !== 0) return;
    treeDragController.isDrag = false;
    const { preName } = this;
    preName && this.listener.emit(`${preName}-setDrageState`, '');
    this.listener.emit('copyEnd');
    const isSelf = treeDragController.treeSource
      ? treeDragController.treeSource === this.uuid
      : true;
    treeDragController.dragStart = false;
    treeDragController.isDrag = false;
    if (!this.targetNode || !treeDragController.dragNode) return;
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
    } = treeDragController.dragNode;

    const {
      pid: dragtPid,
      path: dragPath = '',
      currentNodeIndex: dargCurrentIndex,
      nextNodeIndex: dargNextIndex,
      preNodeIndex: dargPreIndex,
    } = dargData;
    const pidArray = targetPath.split('/');
    if (pidArray.includes(dragkey) && isSelf) return;
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
    const sameGroup = treeDragController.isSameGroup(this.groupKey, this.uuid);
    sameGroup && callback(res);
    treeDragController.previousDragEnd && treeDragController.previousDragEnd();
    treeDragController.oldMousePosition = undefined;
    treeDragController.treeSource = '';
    treeDragController.dragNode = undefined;
  }
  mouseMove(
    mouseEvent: SyntheticMouseEvent<HTMLButtonElement>,
    calculateTelescopic: Function,
    onDrop: Function
  ) {
    if (!treeDragController.dragStart) return;
    const { clientX: mouseX, clientY: mouseY } = mouseEvent;
    const { mouseX: oldX = 0, mouseY: oldY = 0 } = treeDragController.oldMousePosition || {};
    if (Math.abs(oldX - mouseX) < 20 && Math.abs(oldY - mouseY) < 20) return;
    treeDragController.isDrag = true;
    if (!treeDragController.dragNode) return;
    const { node: { props: { title = '' } = {} } = {} } = treeDragController.dragNode;
    this.listener.emit('copyStart', {
      top: mouseY + 22,
      left: mouseX,
      title,
    });
    if (!onDrop) return;
    const { node: treeNode } = treeDragController.dragNode;
    if (!treeNode) return;
    const { props: { isLeaf, expanded } = {} } = treeNode;
    if (!isLeaf && expanded) {
      calculateTelescopic(treeNode);
    }
    clearTimeout(this.mouseTimer);
    this.mouseTimer = setTimeout(() => {
      if (!treeDragController.dragStart) return;
      const targetNode = this.calculationMouseHoverPosition({
        mouseX,
        mouseY,
      });
      if (!targetNode) return;
      const { nodeEmitName, position } = targetNode;
      const { preName } = this;
      this.targetNode = targetNode;
      preName && this.listener.emit(`${preName}-setDrageState`, '');
      const sameGroup = treeDragController.isSameGroup(this.groupKey, this.uuid);
      const dragState = sameGroup ? position : 'noDrop';
      nodeEmitName && position && this.listener.emit(`${nodeEmitName}-setDrageState`, dragState);
      this.preName = nodeEmitName;
    }, 100);
  }
  mouseLeave(
    mouseEvent: SyntheticMouseEvent<HTMLButtonElement>,
    eventFn: Function,
    onDragEnd: Function
  ) {
    if (!treeDragController.isDrag || !treeDragController.dragNode) return;
    clearTimeout(this.mouseTimer);
    this.listener.emit(`${this.preName}-setDrageState`, '');
    this.listener.emit('copyEnd');
    if (this.isShowDargCopyDiv()) {
      treeDragController.dragStart = false;
      treeDragController.isDrag = false;
    } else {
      treeDragController.createDragCopyDiv();
      treeDragController.previousDragEnd = onDragEnd;
    }
    const nodeData = treeDragController.getDragNodeData();
    eventFn && eventFn({ mouseEvent, nodeData });
  }
  onMouseEnter(mouseEvent: SyntheticMouseEvent<HTMLButtonElement>, onMouseEnter: Function) {
    if (!treeDragController.isDrag) return;
    treeDragController.destroyDragCopyDiv();
    const nodeData = treeDragController.getDragNodeData();
    onMouseEnter && onMouseEnter({ mouseEvent, nodeData });
  }

  isShowDargCopyDiv() {
    const groupData = treeDragController.getGroupDataByGroupKey(this.groupKey);
    let res = false;
    if (treeDragController.treeSource === this.uuid && groupData && groupData.length <= 1) {
      res = true;
    } else if (treeDragController.treeSource === this.uuid && !groupData) {
      res = true;
    }
    return res;
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
  listener: Listener,
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
