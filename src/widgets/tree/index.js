import React, { Component } from 'react';
import OriginTree from './OriginTree';
import type { TreeDataItem } from './dragDome';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { recursion } from './utils';

type UpdataDataParameter = {
  pid: string,
  deleteCount: number,
  fixTargetCurrentIndex: number,
  nextPathArray: Array<string>,
};

function getCurrentDragData(dragData: Object, sourceData: Object[]) {
  const { isLeaf, value, text, icons } = dragData;
  if (isLeaf) {
    return { value, text };
  }

  const res = { value, text, icons };
  let recursionRes = [];
  sourceData &&
    sourceData.forEach(item => {
      const { pid } = item;
      if (pid === value) {
        recursionRes = [...recursionRes, getCurrentDragData(item, sourceData)];
      }
    });
  res.children = recursionRes;
  return res;
}
function getCurrentDragFlatData(dragData: Object, sourceData: Object[]) {
  const { isLeaf = false } = dragData;

  return isLeaf ? [dragData] : [dragData, ...getDragSonData(dragData, sourceData)];
}
function getDragSonData(dragData: Object, sourceData: Object[]) {
  const { value } = dragData;
  let res = [];

  sourceData &&
    sourceData.forEach(item => {
      const { pid, isLeaf = false } = item;
      if (pid === value) {
        res = [...res, item];
        if (!isLeaf) {
          const newRes = getDragSonData(item, sourceData);
          res = [...res, ...newRes];
        }
      }
    });

  return res;
}
function formatDragData(data: Object) {
  let res = [];

  if (data.children && data.children.length !== 0) {
    const fatherItemData = {};
    for (const item in data) {
      if (item !== 'children') {
        fatherItemData[item] = data[item];
      }
    }
    res.push(fatherItemData);

    data.children.forEach(item => {
      res = [...res, ...formatDragData(item)];
    });
  } else {
    res = [{ ...data }];
  }

  return res;
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      prevPropsData: props.data,
    };
    this.dragData = null;
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const { data } = nextProps;
    const { data: prevStateData, prevPropsData } = preState;

    if (prevPropsData !== data) {
      return { data, prevPropsData: data };
    }

    if (prevStateData !== data) {
      const newData = JSON.parse(JSON.stringify(prevStateData));

      return {
        data: newData,
      };
    }

    return null;
  }

  handleDragComplete = (data: Object, changeItem: Object[]) => {
    const { onDragComplete } = this.props;
    onDragComplete && onDragComplete({ data, changeItem });

    this.dragData = null;
  };

  handleDragLeave = (node: Object) => {
    const { translateTreeData = false, onDragLeave } = this.props;
    onDragLeave && onDragLeave(node);

    const { nodeData = {}, derivedTreeData } = node;
    const { pid } = nodeData;

    if (translateTreeData) {
      const dragDataInfo = JSON.parse(
        JSON.stringify(getCurrentDragData(nodeData, derivedTreeData))
      );
      dragDataInfo.pid = pid;

      this.dragData = [dragDataInfo];
    } else {
      this.dragData = getCurrentDragFlatData(nodeData, derivedTreeData);
    }
  };
  handleDragEnter = (node: Object) => {
    const { onDragEnter } = this.props;
    onDragEnter && onDragEnter(node);
  };
  handleDrop = (obj: Object) => {
    const { onDrop, translateTreeData = false } = this.props;
    onDrop && onDrop(obj);

    translateTreeData ? this.normalDataDrop(obj) : this.flatDataDrop(obj);
  };
  handleDragEnd = (isMoveSuccess: boolean) => {
    const { deleteDragItems = true, translateTreeData = false, onDragEnd } = this.props;
    onDragEnd && onDragEnd();

    if (!isMoveSuccess) {
      this.dragData = null;
      return;
    }

    if (this.dragData) {
      const { data } = this.state;
      const tempData = JSON.parse(JSON.stringify(data));

      if (!deleteDragItems) {
        this.handleDragComplete(tempData, this.dragData);
        return;
      }

      translateTreeData ? this.normalDataDragEnd(tempData) : this.flatDataDragEnd(tempData);
    }
  };

  flatDataDragEnd = (data: Object[]) => {
    const dragDataValues = this.dragData.map(item => {
      const { value } = item;
      return value;
    });

    const filterData =
      data &&
      data.filter(item => {
        const { value } = item;

        return !dragDataValues.includes(value);
      });

    const resDataPids = [];
    filterData.forEach(item => {
      const { pid } = item;
      if (pid) {
        resDataPids.push(pid);
      }
    });

    const resData = filterData.map(item => {
      const { value } = item;

      return { ...item, isLeaf: !resDataPids.includes(value) };
    });

    this.handleDragComplete(resData, this.dragData);
    this.setState({ data: resData });
  };
  normalDataDragEnd = (data: Object[]) => {
    const { pid, value, text } = this.dragData[0];

    recursion(data, pid, (item, index, data) => {
      const { value: dragItemValue } = this.dragData[0];
      const leaveItemChildren = item.children || [];
      const newItemChildren = leaveItemChildren.filter(item => {
        const { value } = item;
        return value !== dragItemValue;
      });

      item.children = newItemChildren;
    });

    this.handleDragComplete(data, this.dragData);
    this.setState({ data });
  };

  normalDataDrop = (obj: Object) => {
    const {
      dragInfo,
      targetInfo: { pid, key: targetKye, pos, dropPosition },
      dropToGap,
      isSelf,
      derivedTreeData,
    } = obj;

    const { key = {} } = dragInfo;
    const { data } = this.state;

    const oldData = JSON.parse(JSON.stringify(data));
    const positionArray = pos.split('-');
    const InsertPosition = positionArray[positionArray.length - 1];
    let dragObj: TreeDataItem = {};
    if (isSelf) {
      recursion(oldData, key, (item, index, data) => {
        data.splice(index, 1);
        dragObj = item;
      });
    } else {
      const { data } = dragInfo;

      dragObj = getCurrentDragData(data, derivedTreeData);
    }

    const newData = JSON.parse(JSON.stringify(oldData));

    if (!dragObj) return;
    if (dropToGap) {
      if (pid) {
        recursion(newData, pid, (item, index, data) => {
          item.children = item.children || [];
          dropPosition === 'top'
            ? item.children.splice(InsertPosition, 0, dragObj)
            : item.children.splice(Number(InsertPosition) + 1, 0, dragObj);
        });
      } else {
        dropPosition === 'top'
          ? newData.splice(InsertPosition, 0, dragObj)
          : newData.splice(Number(InsertPosition) + 1, 0, dragObj);
      }
    } else {
      recursion(newData, targetKye, (item, index, data) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    }

    this.handleDragComplete(newData, [dragObj]);
    this.setState({ data: [...newData] });
  };
  flatDataDrop = (obj: Object) => {
    const { data: metadata } = this.state;
    let {
      dragInfo: { dargCurrentIndex, dargNextIndex, dargPreIndex, data: dragInfoData } = {},
      targetInfo: { dropPosition, targetParentIndex, targetCurrentIndex },
      dropToGap,
      isSelf,
    } = obj;

    let dragObj = [];

    if (isSelf) {
      const dragCurrentData = metadata[dargCurrentIndex];
      const dragPreData = metadata[dargPreIndex];
      const dragNextdata = metadata[dargNextIndex];
      if (
        dragNextdata &&
        dragCurrentData.pid !== dragNextdata.pid &&
        dragPreData &&
        dragCurrentData.pid !== dragPreData.pid
      ) {
        dragPreData.isLeaf = true;
      }
      if (!dragNextdata && dragCurrentData.pid !== dragPreData.pid) {
        dragPreData.isLeaf = true;
      }
      const deleteCount = this.calculationDragCount(dargCurrentIndex);
      dragObj = metadata.splice(dargCurrentIndex, deleteCount);
      targetCurrentIndex =
        targetCurrentIndex >= dargCurrentIndex
          ? targetCurrentIndex - deleteCount
          : targetCurrentIndex;
      targetParentIndex =
        targetParentIndex >= dargCurrentIndex ? targetParentIndex - deleteCount : targetParentIndex;
    } else {
      dragObj = formatDragData(dragInfoData);
    }

    if (dropToGap) {
      if (dropPosition === 'top') {
        this.dragTargetToTopHandler(targetCurrentIndex, dragObj, targetParentIndex);
      } else {
        this.dragTargetToBottomHandler(targetCurrentIndex, dragObj, targetParentIndex);
      }
    } else {
      this.dragTargetToInHandler(targetCurrentIndex, dragObj);
    }

    this.handleDragComplete([...metadata], dragObj);

    this.setState({ data: [...metadata] });
  };
  calculationDragCount(dargCurrentIndex: number) {
    const { data: metadata } = this.state;
    let deleteCount = 1;
    for (let i = dargCurrentIndex + 1, max = metadata.length; i < max; i++) {
      const tem = metadata[i];
      const { path = '' } = tem;
      const pidArray = path.split('/');
      if (pidArray.indexOf(metadata[dargCurrentIndex].value) === -1) {
        break;
      }
      deleteCount += 1;
    }
    return deleteCount;
  }
  dragTargetToInHandler(targetIndex: number, InsertNodeinfos: Array<Object> = []) {
    const { data: metadata } = this.state;
    metadata.splice(targetIndex + 1, 0, ...InsertNodeinfos);
    const { value = '' } = metadata[targetIndex];
    let nextPathArray = [];
    const updataItem = metadata[targetIndex];
    updataItem.isLeaf = false;
    nextPathArray = updataItem.path ? [updataItem.path, updataItem.value] : [updataItem.value];
    this.updataDataPath({
      pid: value,
      deleteCount: InsertNodeinfos.length,
      fixTargetCurrentIndex: targetIndex + 1,
      nextPathArray,
    });
  }
  updataDataPath(parameter: UpdataDataParameter) {
    const { data: metadata } = this.state;
    const { pid, deleteCount, fixTargetCurrentIndex, nextPathArray } = parameter;
    const startIndex = fixTargetCurrentIndex;
    const endIndex = fixTargetCurrentIndex + deleteCount;
    let prePathArray: Array<string> = [];
    for (let i = startIndex; i < endIndex; i++) {
      const tem = metadata[i];
      if (i === startIndex) {
        tem.pid = pid;
        prePathArray = tem.path ? tem.path.split('/') : [];
        tem.path = nextPathArray.join('/');
      } else {
        const currentPathArray = tem.path ? tem.path.split('/') : [];
        currentPathArray.splice(0, prePathArray.length);
        tem.path = nextPathArray.concat(currentPathArray).join('/');
      }
    }
  }
  dragTargetToTopHandler(
    targetIndex: number,
    InsertNodeinfos: Array<Object> = [],
    targetParentIndex: number
  ) {
    const { data: metadata } = this.state;
    // 拖拽数据插入到响应位置
    const { pid: targetPid = '' } = metadata[targetIndex];
    metadata.splice(targetIndex, 0, ...InsertNodeinfos);
    let nextPathArray = [];
    // 重新计算path
    if (targetPid) {
      const updataItem = metadata[targetParentIndex];
      updataItem.isLeaf = false;
      nextPathArray = updataItem.path ? [updataItem.path, updataItem.value] : [updataItem.value];
    }
    this.updataDataPath({
      pid: targetPid,
      deleteCount: InsertNodeinfos.length,
      fixTargetCurrentIndex: targetIndex,
      nextPathArray,
    });
  }
  dragTargetToBottomHandler(
    targetIndex: number,
    InsertNodeinfos: Array<Object> = [],
    targetParentIndex: number
  ) {
    const { data: metadata } = this.state;
    const count = this.calculationDragCount(targetIndex);
    const { pid: targetPid = '' } = metadata[targetIndex];
    metadata.splice(targetIndex + count, 0, ...InsertNodeinfos);
    let nextPathArray = [];
    if (targetPid) {
      const updataItem = metadata[targetParentIndex];
      updataItem.isLeaf = false;
      nextPathArray = updataItem.path ? [updataItem.path, updataItem.value] : [updataItem.value];
    }
    this.updataDataPath({
      pid: targetPid,
      deleteCount: InsertNodeinfos.length,
      fixTargetCurrentIndex: targetIndex + count,
      nextPathArray,
    });
  }

  render() {
    const { data } = this.state;

    return (
      <OriginTree
        {...this.props}
        data={data}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragEnd={this.handleDragEnd}
        onDrop={this.handleDrop}
      />
    );
  }
}

export default ThemeProvider(Tree, Widget.Tree);
