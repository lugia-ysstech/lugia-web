import React, { Component } from 'react';
import OriginTree from './OriginTree';
import type { TreeDataItem } from './dragDome';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { recursion } from './utils';

function getNewDragObj(dragData, sourceData) {
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
        recursionRes = [...recursionRes, getNewDragObj(item, sourceData)];
      }
    });
  res.children = recursionRes;
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

  handleDragLeave = (node: Object) => {
    const { onDragLeave } = this.props;
    onDragLeave && onDragLeave(node);

    const { nodeData = {}, derivedTreeData } = node;
    const { pid } = nodeData;

    this.dragData = JSON.parse(JSON.stringify(getNewDragObj(nodeData, derivedTreeData)));
    this.dragData.pid = pid;
  };
  handleDragEnter = (node: Object) => {
    const { onDragEnter } = this.props;
    onDragEnter && onDragEnter(node);
  };
  handleDrop = (obj: Object) => {
    const { onDrop, onDragComplete } = this.props;
    onDrop && onDrop(obj);

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

      dragObj = getNewDragObj(data, derivedTreeData);
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

    onDragComplete && onDragComplete({ data: newData, changeItem: dragObj });
    this.setState({ data: [...newData] });
  };

  handleDragEnd = (isMoveSuccess: boolean) => {
    const { onDragEnd, onDragComplete } = this.props;
    onDragEnd && onDragEnd();

    if (!isMoveSuccess) {
      this.dragData = null;
      return;
    }

    if (this.dragData) {
      const { data } = this.state;
      const tempData = JSON.parse(JSON.stringify(data));

      const { pid, value, text } = this.dragData;

      recursion(tempData, pid, (item, index, data) => {
        const { value: dragItemValue } = this.dragData;
        const leaveItemChildren = item.children || [];
        const newItemChildren = leaveItemChildren.filter(item => {
          const { value } = item;
          return value !== dragItemValue;
        });

        item.children = newItemChildren;
      });

      onDragComplete && onDragComplete({ data: tempData, changeItem: this.dragData });

      this.setState({ data: tempData });
    }

    this.dragData = null;
  };

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
