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
  exchange1: Array<TreeDataItem>,
  exchange2: Array<TreeDataItem>,
};

type UpdataDataParameter = {
  pid: string,
  deleteCount: number,
  fixTargetCurrentIndex: number,
  nextPathArray: Array<string>,
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
  {
    value: '0.0.0',
    text: '朝阳支行办事处-1',
    pid: '0.0',
    path: '0/0.0',
    isLeaf: true,
    notCanSelect1: true,
  },
  { value: '0.0.1', text: '朝阳支行办事处-2', pid: '0.0', path: '0/0.0', isLeaf: true },
  { value: '0.1', text: '海淀支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '0.2', text: '石景山支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '1', text: '天津分行' },
  { value: '1.0', text: '和平支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.1', text: '河东支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.2', text: '南开支行办事处', pid: '1', path: '1', isLeaf: true },
];

const exchange1 = [
  {
    value: '0',
    text: '动物',
    children: [
      {
        value: '0-0',
        text: '运动分类',
        notCanSelect1: true,
        children: [
          { value: '0-0-0', text: '水中游', notCanSelect1: true },
          { value: '0-0-1', text: '地上走', notCanSelect1: true },
          { value: '0-0-2', text: '空中飞', notCanSelect1: true },
        ],
      },
      {
        value: '0-1',
        text: '生存方式',
        children: [
          { value: '0-1-0', text: '野生动物' },
          { value: '0-1-1', text: '饲养动物' },
        ],
      },
      {
        value: '0-2',
        text: '食性',
        children: [
          { value: '0-2-0', text: '植物动物' },
          { value: '0-2-1', text: '肉食动物' },
          { value: '0-2-2', text: '杂食动物' },
        ],
      },
      {
        value: '0-3',
        text: '身体特征',
        children: [
          { value: '0-3-0', text: '鱼类' },
          { value: '0-3-1', text: '鸟类' },
          { value: '0-3-2', text: '昆虫' },
          { value: '0-3-3', text: '哺乳类' },
          { value: '0-3-4', text: '软体类' },
        ],
      },
    ],
  },
];

const exchange2 = [
  {
    value: '0',
    text: '动物',
    children: [
      {
        value: '0-0',
        text: '运动分类',
        children: [{ value: '0-0-0', text: '水中游' }],
      },

      {
        value: '0-2',
        text: '食性',
        children: [
          { value: '0-2-0', text: '植物动物' },
          { value: '0-2-1', text: '肉食动物' },
        ],
      },
      {
        value: '0-3',
        text: '身体特征',
        children: [{ value: '0-3-1', text: '哺乳类' }],
      },
    ],
  },
];
const exchange3 = [
  {
    value: '0',
    text: '地球',
    children: [
      {
        value: '0-0',
        text: '陆地',
        children: [{ value: '0-0-0', text: '亚洲' }],
      },
      {
        value: '0-1',
        text: '海洋',
        children: [
          { value: '0-1-0', text: '太平洋' },
          { value: '0-1-1', text: '大西洋' },
        ],
      },
      {
        value: '0-2',
        text: '大气',
        children: [
          { value: '0-2-0', text: '平流层' },
          { value: '0-2-1', text: '对流层' },
        ],
      },
    ],
  },
];
const exchange4 = [
  {
    value: 'a',
    text: '中国',
    children: [
      {
        value: 'a-a',
        text: '气候',
        children: [
          { value: 'a-a-a', text: '热带气候' },
          { value: 'a-a-b', text: '温带气候' },
          { value: 'a-a-c', text: '寒带气候' },
        ],
      },
      {
        value: 'a-b',
        text: '省份/直辖市',
        children: [
          { value: 'a-b-a', text: '江苏省' },
          { value: 'a-b-b', text: '广东省' },
          { value: 'a-b-c', text: '北京市' },
        ],
      },
      {
        value: 'a-c',
        text: '地貌',
        children: [
          { value: 'a-c-a', text: '平原' },
          { value: 'a-c-b', text: '山区' },
          { value: 'a-c-c', text: '丘陵' },
          { value: 'a-c-d', text: '盆地' },
        ],
      },
    ],
  },
];
const exchange5 = [
  {
    value: 'z',
    text: '地表',
    children: [
      {
        value: 'z-a',
        text: '动物',
        children: [
          { value: 'z-a-a', text: '人类' },
          { value: 'z-a-b', text: '猴子' },
          { value: 'z-a-c', text: '山羊' },
        ],
      },
      {
        value: 'z-b',
        text: '植物',
        children: [
          { value: 'z-b-a', text: '小麦' },
          { value: 'z-b-b', text: '木棉' },
          { value: 'z-b-c', text: '梧桐' },
        ],
      },
      {
        value: 'z-c',
        text: '岩石',
        children: [
          { value: 'z-c-a', text: '大理石' },
          { value: 'z-c-b', text: '花岗岩' },
          { value: 'z-c-c', text: '普通石头' },
          { value: 'z-c-d', text: '矿石' },
        ],
      },
    ],
  },
];
const exchange6 = [
  {
    value: 'y',
    text: '运动',
    children: [
      {
        value: 'y-a',
        text: '篮球',
        children: [
          { value: 'y-a-a', text: 'NBA' },
          { value: 'y-a-b', text: 'CBA' },
          { value: 'y-a-c', text: '亚锦赛' },
        ],
      },
      {
        value: 'y-b',
        text: '乒乓球',
        children: [
          { value: 'y-b-a', text: '中国' },
          { value: 'y-b-b', text: '其它' },
        ],
      },
      {
        value: 'y-c',
        text: '游泳',
        children: [
          { value: 'y-c-a', text: '菲尔普斯' },
          { value: 'y-c-b', text: '孙杨' },
        ],
      },
    ],
  },
];

const exchange7 = [
  {
    value: 'y',
    text: '运动',
    canDrag: false,
    children: [
      {
        value: 'y-a',
        text: '篮球',
        children: [
          { value: 'y-a-a', text: 'NBA' },
          { value: 'y-a-b', text: 'CBA' },
          { value: 'y-a-c', text: '亚锦赛' },
        ],
      },
      {
        value: 'y-b',
        text: '乒乓球',
        children: [
          { value: 'y-b-a', text: '中国__不可拖动', canDrag: false },
          { value: 'y-b-b', text: '其它' },
        ],
      },
      {
        value: 'y-c',
        text: '游泳',
        children: [
          { value: 'y-c-a', text: '菲尔普斯' },
          { value: 'y-c-b', text: '孙杨' },
        ],
      },
    ],
  },
];
const exchange8 = [
  {
    value: 'z',
    text: '地表',
    children: [
      {
        value: 'z-a',
        text: '动物',
        children: [
          { value: 'z-a-a', text: '人类' },
          { value: 'z-a-b', text: '猴子' },
          { value: 'z-a-c', text: '山羊' },
        ],
      },
      {
        value: 'z-b',
        text: '植物',
        children: [
          { value: 'z-b-a', text: '小麦' },
          { value: 'z-b-b', text: '木棉' },
          { value: 'z-b-c', text: '梧桐' },
        ],
      },
      {
        value: 'z-c',
        text: '岩石',
        children: [
          { value: 'z-c-a', text: '大理石' },
          { value: 'z-c-b', text: '花岗岩' },
          { value: 'z-c-c', text: '普通石头' },
          { value: 'z-c-d', text: '矿石' },
        ],
      },
    ],
  },
];

const flatData = [
  { value: '0', text: '北京分行' },
  { value: '0.0', text: '朝阳支行办事处', pid: '0', path: '0' },
  {
    value: '0.0.0',
    text: '朝阳支行办事处-1',
    pid: '0.0',
    path: '0/0.0',
    isLeaf: true,
    notCanSelect1: true,
  },
  { value: '0.0.1', text: '朝阳支行办事处-2', pid: '0.0', path: '0/0.0', isLeaf: true },
  { value: '0.1', text: '海淀支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '0.2', text: '石景山支行办事处', pid: '0', path: '0', isLeaf: true },
  { value: '1', text: '天津分行' },
  { value: '1.0', text: '和平支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.1', text: '河东支行办事处', pid: '1', path: '1', isLeaf: true },
  { value: '1.2', text: '南开支行办事处', pid: '1', path: '1', isLeaf: true },
];
const flatDataTwo = [
  { value: 'a', text: '北京分行' },
  { value: 'a.a', text: '朝阳支行', pid: 'a', path: 'a' },
  {
    value: 'a.a.a',
    text: '朝阳支行-1',
    pid: 'a.a',
    path: 'a/a.a',
    isLeaf: true,
    notCanSelect1: true,
  },
  { value: 'a.a.b', text: '朝阳支行-2', pid: 'a.a', path: 'a/a.a', isLeaf: true },
  { value: 'a.b', text: '海淀支行', pid: 'a', path: 'a', isLeaf: true },
  { value: 'a.c', text: '石景山支行', pid: 'a', path: 'a', isLeaf: true },
  { value: 'b', text: '天津分行' },
  { value: 'b.a', text: '和平支行', pid: 'b', path: 'b', isLeaf: true },
  { value: 'b.b', text: '河东支行', pid: 'b', path: 'b', isLeaf: true },
  { value: 'b.c', text: '南开支行', pid: 'b', path: 'b', isLeaf: true },
];
const flatDataThree = [
  { value: 'z', text: '电子产品' },
  { value: 'z.z', text: '平板电脑', pid: 'z', path: 'z' },
  { value: 'z.y', text: '手机', pid: 'z', path: 'z', isLeaf: true },
  { value: 'z.x', text: '手环', pid: 'z', path: 'z', isLeaf: true },
  {
    value: 'z.z.z',
    text: 'ipad',
    pid: 'z.z',
    path: 'z/z.z',
    isLeaf: true,
    notCanSelect1: true,
  },
  { value: 'y', text: '家电' },
  { value: 'y.y', text: '电视', pid: 'y', path: 'y' },
  { value: 'y.y.y', text: '小米电视', pid: 'y.y', path: 'y/y.y', isLeaf: true },
  { value: 'y.x', text: '冰箱', pid: 'y', path: 'y', isLeaf: true },
];

const switchIconNames = {
  open: 'lugia-icon-direction_down',
  close: 'lugia-icon-direction_right',
};
export default class TreeDome extends React.Component<TreeProps, TreeState> {
  dragObj: Object;
  constructor(props: TreeProps) {
    super(props);
    this.state = {
      info,
      info1,
      exchange1,
      exchange2,
      showFlag: true,
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

  dragTargetToTopHandler(
    targetIndex: number,
    InsertNodeinfos: Array<Object> = [],
    targetParentIndex: number
  ) {
    const { info1: metadata } = this.state;
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
    const { info1: metadata } = this.state;
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

  dragTargetToInHandler(targetIndex: number, InsertNodeinfos: Array<Object> = []) {
    const { info1: metadata } = this.state;
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

  calculationDragCount(dargCurrentIndex: number) {
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

  updataDataPath(parameter: UpdataDataParameter) {
    const { info1: metadata } = this.state;
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

  mouseLeave = (node: Object) => {
    const { nodeData: { value: nodeKey } = {} } = node;
    const { exchange1: info } = this.state;
    let dragObj: TreeDataItem = {};
    this.recursion(info, nodeKey, (item, index, data) => {
      dragObj = item;
    });
    this.dragObj = JSON.parse(JSON.stringify(dragObj));
  };

  mouseEnter = (node: Object) => {
    console.log('todo', node);
  };
  onDragEnd = () => {
    this.dragObj = null;
  };
  exchangeOnDrop = (obj: Object) => {
    const {
      dragInfo: { key } = {},
      targetInfo: { pid, key: targetKye, pos, dropPosition },
      dropToGap,
      isSelf,
    } = obj;
    const { exchange2: info } = this.state;
    const positionArray = pos.split('-');
    const InsertPosition = positionArray[positionArray.length - 1];
    let dragObj: TreeDataItem = {};
    if (isSelf) {
      this.recursion(info, key, (item, index, data) => {
        data.splice(index, 1);
        dragObj = item;
      });
    } else {
      dragObj = this.dragObj;
    }
    if (!dragObj) return;
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
    this.setState({ exchange2: [...info] });
  };

  handleDragThreeComplete = (obj: Object) => {
    const { data, changeItem } = obj;
    console.log('data_three', data);
    console.log('data_changeItem', changeItem);
  };
  handleDragFourComplete = (obj: Object) => {
    const { data, changeItem } = obj;
    console.log('data_four', data);
    console.log('changeItem_four', changeItem);
  };

  handleFlatTreeDragComplete = (obj: Object) => {
    console.log('obj_flat', obj);
  };
  handleFlatTreeDragTwoComplete = (obj: Object) => {
    console.log('obj_flat_two', obj);
  };

  judgeNodeIsCanDrag = (obj: Object = {}) => {
    const { targetNode = {} } = obj;
    if (!targetNode) return;
    const { props: { item: { canDrag = true } = {} } = {} } = targetNode;

    return canDrag;
  };

  render() {
    const { info = [], info1 = [], exchange1, exchange2 } = this.state;
    return [
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ padding: '20px 0' }}>树和树之间拖拽</h1>
        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <Tree
              data={exchange1}
              igronSelectField={'notCanSelect1'}
              groupKey={'111'}
              expandAll
              theme={config}
              translateTreeData
              autoHeight
              onDragLeave={this.mouseLeave}
              onDragEnd={this.onDragEnd}
              draggable
              parentIsHighlight
              switchIconNames={switchIconNames}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Tree
              data={exchange2}
              draggable
              onDragEnter={this.mouseEnter}
              onDragEnd={this.onDragEnd}
              onDrop={this.exchangeOnDrop}
              groupKey={'111'}
              translateTreeData
              expandAll
              theme={config}
              autoHeight
              parentIsHighlight
              switchIconNames={switchIconNames}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Tree
              data={exchange2}
              translateTreeData
              expandAll
              theme={config}
              autoHeight
              draggable
              parentIsHighlight
              onDrop={this.exchangeOnDrop}
              switchIconNames={switchIconNames}
            />
          </div>
        </div>
        <h1 style={{ padding: '20px 0' }}>单棵树拖拽</h1>
        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <Tree
              data={info}
              expandAll
              theme={config}
              translateTreeData
              groupKey={'111'}
              draggable
              parentIsHighlight
              onDrop={this.onDrop}
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
              switchIconNames={switchIconNames}
            />
          </div>
        </div>
      </div>,
      <h1>树组拖拽</h1>,
      <div
        style={{
          width: '1500px',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Tree
            data={exchange3}
            draggable
            groupKey={'111'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            onDragComplete={this.handleDragThreeComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'blue' }}>111</span>
          </p>
        </div>
        <div>
          <Tree
            data={exchange4}
            draggable
            groupKey={'111'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            onDragComplete={this.handleDragFourComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'blue' }}>111</span>
          </p>
        </div>

        <div>
          <Tree
            data={exchange5}
            draggable
            deleteDragItems={false}
            groupKey={'888'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'red' }}>888</span>, 拖拽后不删除
          </p>
        </div>
        <div>
          <Tree
            data={exchange6}
            draggable
            groupKey={'888'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'red' }}>888</span>
          </p>
        </div>
      </div>,

      <h1>拍平数据树组拖拽</h1>,
      <div
        style={{
          width: '1200px',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Tree
            data={flatData}
            draggable
            groupKey={'flat666'}
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            onDragComplete={this.handleFlatTreeDragComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'red' }}>flat666</span>
          </p>
        </div>
        <div>
          <Tree
            data={flatDataTwo}
            draggable
            deleteDragItems={false}
            groupKey={'flat666'}
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            onDragComplete={this.handleFlatTreeDragTwoComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'red' }}>flat666</span>,拖拽后不删除
          </p>
        </div>
        <div>
          <Tree
            data={flatDataThree}
            draggable
            groupKey={'flat888'}
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'blue' }}>flat888</span>
          </p>
        </div>
      </div>,

      <h1>指定拖动节点</h1>,
      <div
        style={{
          width: '600px',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Tree
            data={exchange7}
            draggable
            groupKey={'111'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            isNodeCanDrag={this.judgeNodeIsCanDrag}
            onDragComplete={this.handleDragThreeComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'blue' }}>111</span>
          </p>
        </div>
        <div>
          <Tree
            data={exchange8}
            draggable
            groupKey={'111'}
            translateTreeData
            expandAll
            autoHeight
            parentIsHighlight
            switchIconNames={switchIconNames}
            onDragComplete={this.handleDragFourComplete}
          />
          <p>
            groupKey: <span style={{ fontSize: '18px', color: 'blue' }}>111</span>
          </p>
        </div>
      </div>,
    ];
  }
}
