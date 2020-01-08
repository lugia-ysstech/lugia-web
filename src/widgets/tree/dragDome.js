/**
 *
 * create by fjz
 *
 * @flow
 */
import * as React from 'react';
import Tree from './index.js';
import Widget from '../consts/index';
import { getBorderRadius } from '@lugia/theme-utils';

const config = {
  [Widget.Tree]: {
    TreeWrap: {
      normal: {
        width: 500,
      },
    },

    TreeItem: {
      TreeItemWrap: {
        normal: {
          height: 50,
        },
      },
      SelectedTreeItemWrap: {},
      Text: {
        normal: {
          font: {
            size: 16,
          },
          border: {
            bottom: { color: '#DBDBDB', style: 'solid', width: 1 },
          },
          borderRadius: getBorderRadius(0),

          background: {},
        },
        hover: {
          background: {
            color: 'none',
          },
          color: '#4d63ff',
        },
      },
      SelectedText: {
        normal: {
          font: {
            size: 16,
          },
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
          border: {
            bottom: { color: '#DBDBDB', style: 'solid', width: 1 },
          },
          borderRadius: getBorderRadius(0),
        },
        hover: {
          background: {
            color: 'transparent',
          },
          color: '#4d63ff',
        },
      },
      SubTreeWrap: {
        normal: {
          background: { color: '#F8F8FF' },
        },
      },
      Checkbox: {
        normal: {
          color: '#4d63ff',
        },
      },
    },
  },
};
export type TreeDataItem = {
  value: string,
  text: string,
  pid?: string,
  path?: string,
  isLeaf?: boolean,
  children?: Array<TreeDataItem>,
};

export type TreeState = {
  info: Array<TreeDataItem>,
  info1: Array<TreeDataItem>,
};

export type TreeProps = {};
const info = [
  {
    value: '0',
    text: '北京分行',
    children: [
      {
        value: '0-0',
        text: '朝阳支行办事处',
        children: [
          { value: '0-0-0', text: '朝阳支行办事处-1' },
          { value: '0-0-1', text: '朝阳支行办事处-2' },
        ],
      },
      { value: '0-1', text: '海淀支行办事处' },
      { value: '0-2', text: '石景山支行办事处' },
    ],
  },
  {
    value: '1',
    text: '天津分行',
    children: [
      { value: '和平支行办事处', text: '和平支行办事处' },
      { value: '河东支行办事处', text: '河东支行办事处' },
      { value: '南开支行办事处', text: '南开支行办事处' },
    ],
  },
];
const info1 = [
  { value: '0', text: '北京分行' },
  { value: '0.0', text: '朝阳支行办事处', pid: '0', path: '0' },
  { value: '0.0.0', text: '朝阳支行办事处-1', pid: '0.0', path: '0/0.0', isLeaf: true },
  // { value: '0.0.0.0', text: '朝阳支行办事处-1-1', pid: '0.0.0', path: '0/0.0/0.0.0', isLeaf: true },
  { value: '0.0.1', text: '朝阳支行办事处-2', pid: '0.0', path: '0/0.0', isLeaf: true },
  { value: '0.1', text: '海淀支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '0.2', text: '石景山支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '1', text: '天津分行' },
  { value: '1.0', text: '和平支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.1', text: '河东支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.2', text: '南开支行办事处', pid: '1', path: '1', isLeaf: true },
];

const switchIconNames = {
  open: 'lugia-icon-direction_down',
  close: 'lugia-icon-direction_right',
};
export default class TreeDome extends React.Component<TreeProps, TreeState> {
  constructor(props: TreeProps) {
    super(props);
    this.state = {
      info,
      info1,
    };
  }
  recursion = (data: Array<TreeDataItem>, key: string, callback: Function) => {
    let flag = false;
    const fn = (data, key, xx) => {
      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (flag) {
            return;
          }
          const info = data[i];
          if (info.value === key) {
            flag = true;
            return callback(info, i, data);
          }
          if (Array.isArray(info.children) && info.children.length > 0) {
            fn(info.children, key, callback);
          }
        }
      }
    };
    fn(data, key, callback);
  };

  onDrop = (obj: Object) => {
    const {
      dragInfo: { key } = {},
      targetInfo: { pid, key: targetKye, pos, dropPosition },
      dropToGap,
    } = obj;
    const { info } = this.state;
    const positionArray = pos.split('-');
    const InsertPosition = positionArray[positionArray.length - 1];
    let dragObj: TreeDataItem = {};
    this.recursion(info, key, (item, index, data) => {
      data.splice(index, 1);
      dragObj = item;
    });
    if (dropToGap) {
      if (pid) {
        this.recursion(info, pid, (item, index, data) => {
          item.children = item.children || [];
          dropPosition === 'top'
            ? item.children.splice(InsertPosition, 0, dragObj)
            : item.children.splice(InsertPosition + 1, 0, dragObj);
        });
      } else {
        dropPosition === 'top'
          ? info.splice(InsertPosition, 0, dragObj)
          : info.splice(InsertPosition + 1, 0, dragObj);
      }
    } else {
      this.recursion(info, targetKye, (item, index, data) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    }
    this.setState({ info: [...info] });
  };

  onDrop1 = (obj: Object) => {
    const { info1: metadata } = this.state;
    let {
      dragInfo: { dargCurrentIndex, dargNextIndex, dargPreIndex } = {},
      targetInfo: { dropPosition, targetParentIndex, targetCurrentIndex },
      dropToGap,
      translateTreeData,
    } = obj;
    if (translateTreeData) return;
    let dragObj = [];
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
    if (dropToGap) {
      if (dropPosition === 'top') {
        this.dragTargetToTopHandler(targetCurrentIndex, dragObj, targetParentIndex);
      } else {
        this.dragTargetToBottomHandler(targetCurrentIndex, dragObj, targetParentIndex);
      }
    } else {
      this.dragTargetToInHandler(targetCurrentIndex, dragObj);
    }
    this.setState({ info1: [...metadata] });
  };

  dragTargetToTopHandler(targetIndex, InsertNodeinfos = [], targetParentIndex) {
    const { info1: metadata } = this.state;
    // 拖拽数据插入到响应位置
    const { pid: targetPid = null } = metadata[targetIndex];
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

  dragTargetToBottomHandler(targetIndex, InsertNodeinfos = [], targetParentIndex) {
    const { info1: metadata } = this.state;
    const count = this.calculationDragCount(targetIndex);
    const { pid: targetPid = null } = metadata[targetIndex];
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

  dragTargetToInHandler(targetIndex, InsertNodeinfos = []) {
    const { info1: metadata } = this.state;
    metadata.splice(targetIndex + 1, 0, ...InsertNodeinfos);
    const { value = null } = metadata[targetIndex];
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

  calculationDragCount(dargCurrentIndex) {
    const { info1: metadata } = this.state;
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

  updataDataPath(parameter) {
    const { info1: metadata } = this.state;
    const { pid, deleteCount, fixTargetCurrentIndex, nextPathArray } = parameter;
    const startIndex = fixTargetCurrentIndex;
    const endIndex = fixTargetCurrentIndex + deleteCount;
    let prePathArray;
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

  render() {
    const { info = [], info1 = [] } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Tree
            data={info}
            expandAll
            theme={config}
            translateTreeData
            autoHeight
            draggable
            parentIsHighlight
            onDrop={this.onDrop}
            // mutliple
            // __navmenu
            switchIconNames={switchIconNames}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Tree
            data={info1}
            expandAll
            theme={config}
            autoHeight
            draggable
            parentIsHighlight
            onDrop={this.onDrop1}
            // mutliple
            // __navmenu
            switchIconNames={switchIconNames}
          />
        </div>
      </div>
    );
  }
}
