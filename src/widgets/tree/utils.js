/**
 *
 * create by ligx
 *
 * @flow
 */
import type {
  NodeExtendInfo,
  NodeId2Checked,
  NodeId2ExtendInfo,
  NodeId2SelectInfo,
  QueryType,
  SelectType,
} from 'sv-widget';
import { updateVersion, } from './version';

const EmptyError = '结点不能为空',
  PathEqlKey = 'path不能等于key',
  PidEqlKey = 'pid不能等于key',
  PathNotContainerPid = 'path必须包含pid',
  PidPathMustSameExist = 'pid&path必须同时存在';
const isInit = -1;

const ErrorDefine = {
  EmptyError,
  PathEqlKey,
  PidEqlKey,
  PidPathMustSameExist,
  PathNotContainerPid,
};
type RowData = { [key: string]: any };
type ExpandInfo = {
  id2ExtendInfo: NodeId2ExtendInfo,
}

const Seperator = '/';
const notEmpty = (obj: any) => {
  return obj !== null && obj !== undefined && obj !== '';
};

const VirtualRoot: string = 'sv_tree_root';

class TreeUtils {
  VirtualRoot: string = VirtualRoot;

  checkTree (datas: Array<Object>): Array<string> {
    let result = [];
    datas.forEach(data => {
      const reseult = this.isRightTreeRowData(data);
      if (reseult !== '') {
        result.push(`${JSON.stringify(data)}==>${reseult}`);
      }
    });
    result = result.concat(this.isRightLevel(datas));
    return result;
  }

  Error: Object;
  version: number;
  query: ?string;
  oldTreeData: Array<RowData>;
  orignalData: Array<RowData>;
  treeData: Array<RowData>;
  oldVersion: number;
  expandAll: boolean;
  onlySelectLeaf: boolean;
  notInTree: { [key: string]: string };
  displayField: string;
  igronSelectField: ?string;
  limitCount: ?number;

  constructor (treeData: Array<RowData>, config: Object) {
    const { expandAll, onlySelectLeaf = false, displayField = 'title', igronSelectField, limitCount, } = config;
    this.Error = ErrorDefine;
    this.version = 0;
    this.oldVersion = isInit;
    this.oldTreeData = treeData;
    this.treeData = treeData;
    this.orignalData = treeData;
    this.query = null;
    this.expandAll = expandAll;
    this.catchPathArray = {};
    this.onlySelectLeaf = onlySelectLeaf;
    this.displayField = displayField;
    this.notInTree = {};
    this.igronSelectField = igronSelectField;
    this.limitCount = limitCount;
    return this;
  }

  updateVersion (): void {
    updateVersion.call(this);
  }

  isRightTreeRowData (data: Object): string {

    const { key, [this.displayField]: title, pid, path, } = data;

    const required = notEmpty(key) && notEmpty(title);
    const existPid = notEmpty(pid);
    const existPath = notEmpty(path);

    const notKey = (v: any) => v != key;

    const notExistPathAndPid = !existPid && !existPath;
    const pidAndPathMustSameExists = notExistPathAndPid || (existPid && existPath);

    const pidNotEqlKey = !pidAndPathMustSameExists || notKey(pid);

    const pathNotEqlKey = !pidAndPathMustSameExists || notKey(path);

    const existPathOrExistPidIsHas = !existPath || !existPid;
    const pathNotEndwithsPid = existPathOrExistPidIsHas || path.endsWith(pid);

    if (!required) {
      return EmptyError;
    }
    if (!pidAndPathMustSameExists) {
      return PidPathMustSameExist;
    }
    if (!pidNotEqlKey) {
      return PidEqlKey;
    }
    if (!pathNotEqlKey) {
      return PathEqlKey;
    }
    if (!pathNotEndwithsPid) {
      return PathNotContainerPid;
    }
    return '';
  }

  isRightLevel (datas: Array<Object>): Array<string> {
    const result = [];
    const pidIsNotExist = pid => `找不到key:${pid}的结点.`;
    const levelIsError = ({ key, pid, }) => `${key}结点的层级位置错误，必须处于父节点【${pid}】的范围内!`;


    function eachRowDatas (keys: Object = {}) {

      return (callback = (keys: Object, data: Object) => {}) => {
        datas.forEach((data: Object) => {
          const { key, } = data;
          keys[ key ] = data;
          callback && callback(keys, data);
        });
      };
    }

    const keys = {},
      pids = [];
    eachRowDatas(keys)((keys: Object, data: Object) => {
      const { pid, } = data;
      if (notEmpty(pid)) {
        pids.push(pid);
      }
    });

    pids.forEach(pid => {
      if (!notEmpty(keys[ pid ])) {
        result.push(pidIsNotExist(pid));
      }
    });

    if (result.length > 0) {
      return result;
    }

    const key2PidIndex = {};
    let index = 0;
    eachRowDatas()((keys: Object, data: Object) => {
      const { pid, key, } = data;
      key2PidIndex[ key ] = index++;
      if (notEmpty(pid) && !keys[ pid ]) {
        result.push(levelIsError(data));
      }
    });

    const fetchPidPath = function (pid) {
      const pidPath = [];
      let node = keys[ pid ];
      while ( node ) {
        const { key, pid, } = node;
        pidPath.push(key);
        node = keys[ pid ];
      }
      return pidPath.reverse();
    };

    const pathIsError = ({ key, }) => `${key}结点path信息错误!`;
    const isPathError = {};
    datas.forEach((data: Object) => {
      const { pid, path, key, } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pidPath = pidPathArray.join(Seperator);
        if (pidPath !== path) {
          isPathError[ key ] = true;
          result.push(pathIsError(data));
        }
      }
    });

    datas.forEach((data: Object, index: number) => {
      const { pid, } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pathIndex = pidPathArray.map(pid => key2PidIndex[ pid ]);
        const pathLen = pathIndex.length;
        if (pathLen > 0) {
          const start = pathIndex[ pathLen - 1 ];
          const { path, key, } = datas[ start ];
          const prePath = (path ? `${path}/` : '') + key;
          for (let i = start + 1; i < index; i++) {
            const node = datas[ i ];
            const { path, } = node;
            if (path) {
              if (!path.startsWith(prePath) && !isPathError[ data.key ]) {
                result.push(levelIsError(data));
                break;
              }
            }
          }
        }
      }
    });


    return result;
  }


  generateTreeNode (rowData: Array<RowData>): Array<RowData> {
    const result = [];
    if (rowData) {
      const node = {};
      rowData.forEach(data => {
        const row = { ...data, };
        const { pid, key, } = row;
        node[ key ] = row;
        if (pid) {
          const parent = node[ pid ];
          let { children, } = parent;
          if (!children) {
            children = [];
            parent.children = children;
          }
          children.push(row);
        } else {
          result.push(node[ key ]);
        }
      });
    }
    return result;
  }

  slice (rowDatas: Array<RowData>, start: number, total: number, id2ExtendInfo: NodeId2ExtendInfo): { rows: Array<RowData>, parentCount: number } {
    const empty = { rows: [], parentCount: 0, };
    if (rowDatas && rowDatas.length === 0) {
      return empty;
    }
    const result = rowDatas.slice(start, start + total);
    const root = result[ 0 ];
    if (!root) {
      console.warn('树形数据存在问题');
      return empty;
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return { rows: result, parentCount: 0, };
    }

    const pathNode = this.getPathNodes(rowDatas, start, id2ExtendInfo);

    const parentCount = pathNode.length;
    Array.prototype.push.apply(pathNode, result);
    return { rows: pathNode, parentCount, };
  }


  getPathNodes (rowDatas: Array<RowData>, start: number, id2ExtendInfo: NodeId2ExtendInfo) {
    const result = [];
    const row = rowDatas[ start ];
    if (!row) {
      return result;
    }
    const { path, } = row;
    if (path) {
      const pathArray = this.getPathArray(path);
      const len = pathArray.length;
      for (let i = 0; i < len; i++) {
        const row = this.getRow(pathArray[ i ], id2ExtendInfo);
        if (row) {
          result.push(row);
        }
      }

    }
    return result;
  }

  catchPathArray: Object;

  getPathArray (path: ?string): Array<string> {
    if (!path) {
      return [];
    }
    const cacheValue = this.catchPathArray[ path ];
    if (cacheValue) {
      return cacheValue;
    }
    this.catchPathArray[ path ] = path.split(Seperator);
    return this.catchPathArray[ path ];
  }

  getKeys (nodes: Array<RowData>): Array<string> {
    if (!nodes) {
      return [];
    }
    return nodes.map((node: RowData) => {
      const { key, } = node;
      return key;
    });
  }

  fetchNodeExtendInfo (nodeId: string,
                       nodes: Array<RowData>,
                       id2ExtendInfo: NodeId2ExtendInfo): NodeExtendInfo {
    if (!id2ExtendInfo[ VirtualRoot ]) {
      this.initAllNodeIndexAndTopRoot(nodes, id2ExtendInfo);
    }
    const existData = id2ExtendInfo[ nodeId ];

    const { index: begin, } = existData;
    const row = nodes[ begin ];
    if (row) {
      const { isLeaf = false, } = row;

      if (isLeaf) {
        return {
          nowVisible: 0,
          realyVisible: 0,
          childrenIdx: [],
          children: 0,
          begats: 0,
          index: existData.index,
        };
      }
    }


    const isExist = existData.begats !== undefined;
    if (isExist) {
      return existData;
    }

    const end = nodes.length;
    let children = 0;
    let begats = 0;

    const childrenIdx = [];
    const { path, } = row;
    let startWiths = nodeId;
    if (path) {
      startWiths = `${path}/${nodeId}`;
    }

    for (let i = begin + 1; i < end; i++) {

      let founded = false;
      const row = nodes[ i ];
      const { pid, path, key, } = row;
      const isChildren = pid === nodeId;
      if (isChildren) {
        children++;
        childrenIdx.push(i);
        const { begats: childBegats = -1, } = id2ExtendInfo[ key ];
        if (childBegats > 0) {
          begats += childBegats;
          i += childBegats;
        }
        begats++;
        founded = true;
      } else if (path) {
        if (path.indexOf(startWiths) === 0) {
          begats++;
          founded = true;
        }
      }
      if (!founded) {
        break;
      }
    }
    return this.generateExtendInfo(nodeId, begats, children, id2ExtendInfo, childrenIdx, begin);
  }

  initAllNodeIndexAndTopRoot (nodes: Array<RowData>,
                              id2nodeExpandInfo: NodeId2ExtendInfo) {
    const childrenIdx = [];
    if (!id2nodeExpandInfo[ VirtualRoot ]) {
      const begats = nodes.length;
      for (let index = 0; index < begats; index++) {
        const { pid, key, } = nodes[ index ];
        if (!pid) {
          childrenIdx.push(index);
        }
        if (!id2nodeExpandInfo[ key ]) {
          id2nodeExpandInfo[ key ] = { index, };
        }
      }
      this.generateExtendInfo(VirtualRoot, begats, childrenIdx.length, id2nodeExpandInfo, childrenIdx, -1);
    }
  }

  generateExtendInfo (nodeId: string, begats: number, children: number,
                      id2ExtendInfo: NodeId2ExtendInfo,
                      childrenIdx: Array<number>, index: number): NodeExtendInfo {

    const nowAndRealVisible = this.expandAll ? begats : (nodeId === this.VirtualRoot ? children : 0);

    return id2ExtendInfo[ nodeId ] = {
      nowVisible: nowAndRealVisible,
      realyVisible: nowAndRealVisible,
      childrenIdx,
      children,
      begats,
      index,
    };
  }

  /**
   * 只支持逐级进行展开
   * @param nodeId
   * @param nodes
   * @param id2ExtendInfo
   * @param expandAll
   */
  expandNode (nodeId: string,
              id2ExtendInfo: NodeId2ExtendInfo): void {
    const nodes: Array<RowData> = this.treeData;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2ExtendInfo);
    const info = fetchNodeInfo(nodeId);
    const { children, expanded, begats = 0, } = info;
    const isInitStatus = expanded === undefined;

    if (!this.expandAll && isInitStatus) {
      info.nowVisible = info.realyVisible = children;
    }

    const willNotCollapsed = this.expandAll && isInitStatus;
    if (willNotCollapsed || expanded === true || begats == 0) {
      return;
    }

    const { realyVisible, index, } = info;
    info.nowVisible = realyVisible;

    this.processPath(nodes[ index ], (nodeId: string) => {
      const childInfo = fetchNodeInfo(nodeId);
      const {
        nowVisible: childNow,
        realyVisible: childRealy,
      } = childInfo;
      childInfo.nowVisible = childNow + realyVisible;
      childInfo.realyVisible = childRealy + realyVisible;

    });
    info.expanded = true;
    this.updateVersion();
  }


  fetchNodeExtendInfoById (nodes: Array<RowData>,
                           id2ExtendInfo: NodeId2ExtendInfo) {
    return (nodeId: string): NodeExtendInfo => {
      return this.fetchNodeExtendInfo(nodeId, nodes, id2ExtendInfo);
    };
  }

  colapseNode (nodeId: string,
               id2ExtendInfo: NodeId2ExtendInfo): void {
    const nodes: Array<RowData> = this.treeData;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2ExtendInfo);

    const info = fetchNodeInfo(nodeId);
    const { expanded, realyVisible = 0, begats = 0, } = info;
    if (expanded === false || begats == 0) {
      return;
    }

    const { index, } = info;

    info.nowVisible = 0;
    this.processPath(nodes[ index ], (nodeId: string) => {
      const childInfo = fetchNodeInfo(nodeId);
      const {
        realyVisible: childRealy = 0,
      } = childInfo;
      childInfo.realyVisible = childRealy - realyVisible;
      if (childInfo.nowVisible !== 0) {
        childInfo.nowVisible = childInfo.realyVisible;
      }
    });
    info.expanded = false;
    this.updateVersion();
  }

  processPath (info: RowData, doCall: Function): void {

    const { path, } = info;
    const pathArray = [ this.VirtualRoot, ];
    if (path) {
      Array.prototype.push.apply(pathArray, this.getPathArray(path));
    }

    const len = pathArray.length;
    for (let i = 0; i < len; i++) {
      doCall(pathArray[ i ]);
    }
  }


  search (expandInfo: ExpandInfo, query: string, searchType: QueryType = 'include'): Array<RowData> {
    const queryChanging = query !== this.query;
    const noChanged = this.version === this.oldVersion && !queryChanging;

    if (noChanged) {
      return this.oldTreeData;
    }


    if (queryChanging) {
      this.updateVersion();
      expandInfo.id2ExtendInfo = {};
    }

    const queryAll = query === '';
    if (queryAll) {
      this.treeData = this.orignalData;
    } else if (queryChanging) {

      const need: Object = {};
      const containPath: Object = {};
      const rowSet = [];
      const len = this.orignalData.length - 1;
      for (let i = len; i >= 0; i--) {
        const row: RowData = this.orignalData[ i ];
        const { [this.displayField]: title, key, path, } = row;
        if (this.match(title, query, searchType)) {
          if (path !== undefined && containPath[ path ] === undefined) {
            const pathArray = this.getPathArray(path);
            containPath[ path ] = true;
            const len = pathArray.length;
            for (let i = 0; i < len; i++) {
              const key = pathArray[ i ];
              need[ key ] = true;
            }
          }
          rowSet.push(row);
        } else if (need[ key ] === true) {
          rowSet.push(row);
          delete need[ key ];
        }
      }
      if (rowSet.length === this.orignalData.length) {
        this.treeData = this.orignalData;
      } else {
        this.treeData = rowSet.reverse();
      }
    }
    this.query = query;
    this.oldTreeData = this.generateRealTreeData(expandInfo);
    return this.oldTreeData;
  }

  match (val: ?string, query: string, type: QueryType): boolean {
    if (val === undefined || val === null) {
      return false;
    }
    val += '';
    switch (type) {
      case 'start': {
        return val.startsWith(query);
      }
      case 'end': {
        return val.endsWith(query);
      }
      case 'include': {
        return !!~val.indexOf(query);
      }
      case 'eql': {
        return val === query;
      }
      default:
        return false;
    }
  }


  generateRealTreeData (expandInfo: ExpandInfo): Array<RowData> {
    const datas = this.treeData;
    const noChanged = this.version === this.oldVersion;
    if (noChanged) {
      return this.oldTreeData;
    }

    this.oldVersion = this.version;
    const { id2ExtendInfo, } = expandInfo;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(datas, id2ExtendInfo);
    const nodeInfo = fetchNodeInfo(this.VirtualRoot);
    const { nowVisible, } = nodeInfo;

    if (nowVisible === 0) {
      return [];
    }

    const { childrenIdx = [], } = nodeInfo;

    const { children = 0, begats = 0, } = nodeInfo;

    if (nowVisible === children) {
      return this.oldTreeData = this.fetchLevelOneChild(datas, childrenIdx);
    }

    if (nowVisible === begats) {
      return this.oldTreeData = datas;
    }
    const totalLen = datas.length;
    const result = [];
    for (let i = 0; i < totalLen; i++) {
      const row = datas[ i ];
      result.push(row);
      const { key, } = row;
      const { childrenIdx = [], nowVisible = 0, children = 0, begats = 0, } = fetchNodeInfo(key);
      if (nowVisible === 0) {
        i += begats;
      } else {
        if (nowVisible === children) {
          Array.prototype.push.apply(result, this.fetchLevelOneChild(datas, childrenIdx));
          i += begats;
        } else if (nowVisible === begats) {
          const start = i + 1;
          Array.prototype.push.apply(result, datas.slice(start, start + begats));
          i += begats;
        }
      }
    }

    return this.oldTreeData = result;
  }

  fetchLevelOneChild (datas: Array<RowData>, childrenIdx: Array<number>) {
    const result = [];
    const len = childrenIdx.length;
    for (let i = 0; i < len; i++) {
      result.push(datas[ childrenIdx[ i ] ]);
    }
    return result;
  }

  selectNode (key: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo): void {
    const { checked, } = selectInfo;
    if (checked[ key ] === true) {
      return;
    }
    const operType = TreeUtils.Selected;
    const { path, } = this.updateSelectedStatusForChildren(key, selectInfo, id2ExtendInfo, operType);

    const { begats = 0, } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
    const maxHalfCount = begats + 1;

    this.updateSelectedStatusForParent(path, selectInfo, maxHalfCount, operType, id2ExtendInfo);

  }


  selectDirNode (key: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo): void {
    const { checked, } = selectInfo;
    if (checked[ key ] === true) {
      return;
    }
    const row = this.getRow(key, id2ExtendInfo);
    if (!row) {
      console.warn('选择的结点不存在');
      return;
    }
    this.selectDirNodeByRow(row, selectInfo, id2ExtendInfo);
  }

  selectDirNodeByRow (row: RowData, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo, isValue2SelectedInfo: boolean = false): void {
    const { key, } = row;
    const { checked, } = selectInfo;
    if (checked[ key ] === true) {
      return;
    }
    const { isLeaf = false, } = row;
    if (isLeaf === true) {
      this.selectNode(key, selectInfo, id2ExtendInfo);
      return;
    }

    const { halfchecked, value, } = selectInfo;
    const nowHalf = halfchecked[ key ];
    if (nowHalf !== undefined) {
      const { begats = 0, } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
      if (nowHalf === begats) {
        halfchecked[ key ] = nowHalf + 1;
        checked[ key ] = true;
      }
    } else {
      halfchecked[ key ] = 1;
    }
    if (!isValue2SelectedInfo) {
      this.selectRow(value, key, id2ExtendInfo, row);
    }
    const { path, } = row;
    this.updateSelectedStatusForParent(path, selectInfo, 1, TreeUtils.Selected, id2ExtendInfo);

  }


  unSelectNode (key: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo): void {
    const notLeaf = !this.isLeaf(key, id2ExtendInfo);
    let halfCount = 1;

    if (notLeaf) {
      const { halfchecked, } = selectInfo;
      const childHalfCount = halfchecked[ key ];
      const onlyYourSelf = childHalfCount === 1;

      if (onlyYourSelf) {
        halfCount = 1;
      } else {
        const { begats = 0, } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
        const fullHalf = begats + 1;

        halfCount = Math.min(childHalfCount + 1, fullHalf); // 加上自身

        const notFullHalf = childHalfCount < fullHalf;
        if (notFullHalf) {
          // 非满结点 扣除自身
          halfCount -= 1;
        }
      }
    }

    const operatorType = TreeUtils.UnSelected;
    const { path, } = this.updateSelectedStatusForChildren(key, selectInfo, id2ExtendInfo, operatorType);
    this.updateSelectedStatusForParent(path, selectInfo, halfCount, operatorType, id2ExtendInfo);
  }

  updateSelectedStatusForParent (path?: string, selectInfo: NodeId2SelectInfo, halfCount: number, operatorType: SelectType, id2ExtendInfo: NodeId2ExtendInfo) {

    if (path) {

      const { checked, halfchecked, } = selectInfo;
      const pathArray = this.getPathArray(path);
      const len = pathArray.length;
      switch (operatorType) {
        case TreeUtils.Selected: {
          for (let i = 0; i < len; i++) {
            const key = pathArray[ i ];
            if (!checked[ key ]) {
              this.halfCheckForParent(key, selectInfo, operatorType, halfCount);
              const { begats = 0, } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
              if (halfchecked[ key ] === begats + 1) {
                checked[ key ] = true;
              }
            }
          }
          break;
        }
        case TreeUtils.UnSelected: {
          for (let i = 0; i < len; i++) {
            const key = pathArray[ i ];
            delete checked[ key ];
            this.halfCheckForParent(key, selectInfo, operatorType, halfCount);
          }
          break;
        }
        default:
      }
    }
  }


  isLeaf (key: string, id2ExtendInfo: NodeId2ExtendInfo) {
    const row = this.getRow(key, id2ExtendInfo);
    if (!row) {
      return false;
    }
    const { isLeaf = false, } = row;
    return isLeaf;
  }

  getRow (key: string, id2ExtendInfo: NodeId2ExtendInfo): Object | null {
    if (!id2ExtendInfo[ VirtualRoot ]) {
      this.initAllNodeIndexAndTopRoot(this.treeData, id2ExtendInfo);
    }
    const extendInfo = id2ExtendInfo[ key ];
    if (extendInfo) {
      const { index, } = id2ExtendInfo[ key ];
      return this.treeData[ index ];
    }
    return null;
  }

  getTitle (value: Array<string>, id2ExtendInfo: NodeId2ExtendInfo): Array<string> {
    if (!value || value.length === 0) {
      return [];
    }
    const result = [];
    const len = value.length;
    for (let i = 0; i < len; i++) {
      const key = value[ i ];
      const row = this.getRow(key, id2ExtendInfo);
      if (row) {
        const { [this.displayField]: title, } = row;
        result.push(title);
      } else {
        result.push(this.notInTree[ key ]);
      }
    }
    return result;
  }

  updateSelectedStatusForChildren (targetKey: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo, type: SelectType): RowData {

    const datas = this.treeData;
    const { index: targetNode, begats, } = this.fetchNodeExtendInfo(targetKey, datas, id2ExtendInfo);
    const len = datas.length;
    const range = targetNode + begats;

    for (let i = targetNode; i <= range && i < len; i++) {
      const row = datas[ i ];
      const { key, } = row;
      switch (type) {
        case TreeUtils.Selected: {
          const { checked, value, } = selectInfo;
          checked[ key ] = true;
          const { isLeaf = false, } = row;
          this.selectRow(value, key, id2ExtendInfo, row);

          const { begats = 0, } = this.fetchNodeExtendInfo(key, datas, id2ExtendInfo);
          const isTargetNode = i === targetNode;
          const childHalfCount = (isTargetNode || !isLeaf) ? begats + 1 : begats;

          if (childHalfCount > 0) {
            const { halfchecked, } = selectInfo;
            halfchecked[ key ] = childHalfCount;
          }
          break;
        }

        case TreeUtils.UnSelected:
          this.clearSelectInfo(key, selectInfo);
          break;
        default:
      }

    }
    return datas[ targetNode ];
  }


  halfCheckForParent (key: string, selectInfo: NodeId2SelectInfo, type: SelectType, childHalf: number) {
    if (childHalf === 0) {
      this.clearSelectInfo(key, selectInfo);
      return;
    }

    const { halfchecked, } = selectInfo;
    const notHalfCheck = !halfchecked[ key ];

    switch (type) {
      case TreeUtils.Selected: {
        this.halfSelectedForParent(key, selectInfo, childHalf);
        break;
      }
      case TreeUtils.UnSelected: {
        const halfValue = halfchecked[ key ];
        if (halfValue) {
          halfchecked[ key ] = halfValue - childHalf;
        }
        if (notHalfCheck || halfchecked[ key ] <= 0) {
          this.clearSelectInfo(key, selectInfo);
        }
        break;
      }
      default:
    }
  }


  halfSelectedForParent (key: string, selectInfo: NodeId2SelectInfo, childHalf: number): void {
    const { halfchecked, } = selectInfo;
    const notHalfCheck = !halfchecked[ key ];
    if (notHalfCheck) {
      halfchecked[ key ] = 0;
    }
    halfchecked[ key ] = halfchecked[ key ] + childHalf;
  }

  clearSelectInfo (key: string, selectInfo: NodeId2SelectInfo) {
    const { value, halfchecked, checked, } = selectInfo;
    delete halfchecked[ key ];
    delete checked[ key ];
    delete value[ key ];
  }


  value2SelectInfo (keys: Array<string>, displayValue: Array<string>, oldValue: NodeId2Checked, id2ExtendInfo: NodeId2ExtendInfo): NodeId2SelectInfo {
    const len = keys.length;
    if (!oldValue || !len) {
      return { value: {}, halfchecked: {}, checked: {}, };
    }
    const value = {}, halfchecked = {}, checked = {};

    this.initAllNodeIndexAndTopRoot(this.treeData, id2ExtendInfo);
    const levelArray = [];
    const path2Nodes = [];
    const allPathArray = [];
    let nowPath = '';
    let nowPathIndex = 0;
    let currNodes = [];
    const rootChildNode = [];
    for (let i = 0; i < len; i++) {
      const key = keys[ i ];
      const row = this.getRow(key, id2ExtendInfo);
      if (row) {
        const { isLeaf = false, path: rowPath, } = row;
        if (isLeaf) {
          if (!rowPath) {
            rootChildNode.push(row);
          } else if (nowPath != rowPath) {
            allPathArray[ nowPathIndex ] = this.getPathArray(rowPath);
            nowPath = rowPath;
            currNodes = path2Nodes[ nowPathIndex ] = [];
            nowPathIndex++;
          }
          currNodes.push(row);
        } else {
          const path = this.getPathArray(rowPath);
          const level = path.length;
          let rows = levelArray[ level ];
          if (!rows) {
            rows = levelArray[ level ] = [];
          }
          rows.push(row);
        }
      } else {
        value[ key ] = true;
        const disp = displayValue[ i ];
        this.notInTree[ key ] = disp ? disp : key;
      }
    }

    const selectedInfo = { value, halfchecked, checked, };
    const levelArrayLen = levelArray.length;
    for (let i = levelArrayLen - 1; i >= 0; i--) {
      const rows = levelArray[ i ];
      if (rows) {
        const rowLen = rows.length;
        for (let j = 0; j < rowLen; j++) {
          const { key, } = rows[ j ];
          this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
        }
      }
    }
    for (let i = 0; i < levelArrayLen; i++) {
      const rows = levelArray[ i ];
      if (rows) {
        const rowLen = rows.length;
        for (let j = 0; j < rowLen; j++) {
          this.selectDirNodeByRow(rows[ j ], selectedInfo, id2ExtendInfo, true);
        }
      }
    }

    const data = this.treeData;

    for (let i = 0; i < nowPathIndex; i++) {
      const rows = path2Nodes[ i ];
      const rowLen = rows.length;
      let totalHalfCount = 0;
      // 选择子节点
      for (let i = 0; i < rowLen; i++) {
        const targetRow = rows[ i ];
        const { key, } = targetRow;
        checked[ key ] = true;
        const { begats = 0, } = this.fetchNodeExtendInfo(key, data, id2ExtendInfo);
        totalHalfCount += halfchecked[ key ] = begats + 1;
      }

      // 更新父结点
      const pathArray = allPathArray[ i ];
      const len = pathArray.length;
      for (let i = 0; i < len; i++) {
        const key = pathArray[ i ];
        if (!checked[ key ]) {
          this.halfSelectedForParent(key, selectedInfo, totalHalfCount);
          const { begats = 0, } = this.fetchNodeExtendInfo(key, data, id2ExtendInfo);
          if (halfchecked[ key ] === begats + 1) {
            checked[ key ] = true;
          }
        }
      }
    }
    const rootChildNodeLen = rootChildNode.length;
    for (let i = 0; i < rootChildNodeLen; i++) {
      const { key, } = rootChildNode[ i ];
      checked[ key ] = true;
    }
    return { value: oldValue, halfchecked, checked, };
  }

  selectRow (value: Object, key: string, id2ExtendInfo: NodeId2ExtendInfo, row: ?Object): boolean {
    if (value[ key ]) {
      return false;
    }

    if (this.igronSelectField) {
      row = row ? row : this.getRow(key, id2ExtendInfo);
      if (!row) {
        return false;
      }
      if (!!row[ this.igronSelectField ] === true) {
        return false;
      }
    }
    if (this.onlySelectLeaf) {
      row = row ? row : this.getRow(key, id2ExtendInfo);
      if (!row) {
        return false;
      }
      const { isLeaf = false, } = row;
      if (!isLeaf) {
        return false;
      }
    }
    value[ key ] = true;

    if (this.limitCount != undefined) {
      if (Object.keys(value).length > this.limitCount) {
        delete value[ key ];
        return false;
      }
    }
    return true;
  }

  static Selected: 1 = 1;
  static UnSelected: 0 = 0;
}


export default TreeUtils;
