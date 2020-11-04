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
} from '@lugia/lugia-web';
import { updateVersion } from './version';

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
};

const notEmpty = (obj: any) => {
  return obj !== null && obj !== undefined && obj !== '';
};

const VirtualRoot: string = 'lugia_tree_root';

class TreeUtils {
  VirtualRoot: string = VirtualRoot;

  checkTree(datas: Array<Object>): Array<string> {
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
  blackList: ?(string[]);
  whiteList: ?(string[]);
  oldTreeData: Array<RowData>;
  orignalData: Array<RowData>;
  treeData: Array<RowData>;
  oldVersion: number;
  expandAll: boolean;
  onlySelectLeaf: boolean;
  notInTree: { [key: string]: string };
  inTree: { [key: string]: boolean };
  displayField: string;
  valueField: string;
  igronSelectField: ?string;
  limitCount: ?number;
  splitQuery: ?string;
  selCount: number;
  pathField: string;
  pidField: string;

  constructor(treeData: Array<RowData>, config: Object) {
    const {
      expandAll,
      onlySelectLeaf = false,
      displayField = 'title',
      valueField = 'key',
      igronSelectField,
      limitCount,
      splitQuery,
      pathSeparator = '|',
      pathField = 'path',
      pidField = 'pid',
    } = config;
    this.Error = ErrorDefine;
    this.version = 0;
    this.oldVersion = isInit;
    this.oldTreeData = treeData;
    this.treeData = treeData;
    this.orignalData = treeData;
    this.query = null;
    this.blackList = [];
    this.whiteList = [];
    this.expandAll = expandAll;
    this.catchPathArray = {};
    this.onlySelectLeaf = onlySelectLeaf;
    this.displayField = displayField;
    this.valueField = valueField;
    this.notInTree = {};
    this.inTree = {};
    this.igronSelectField = igronSelectField;
    this.limitCount = limitCount;
    this.splitQuery = splitQuery;
    this.selCount = 0;
    this.pathSeparator = pathSeparator;
    this.pathField = pathField;
    this.pidField = pidField;
    return this;
  }

  updateVersion(): void {
    updateVersion.call(this);
  }

  isRightTreeRowData(data: Object): string {
    const {
      [this.valueField]: key,
      [this.displayField]: title,
      [this.pidField]: pid,
      [this.pathField]: path,
    } = data;

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

  isRightLevel(datas: Array<Object>): Array<string> {
    const result = [];
    const pidIsNotExist = pid => `找不到key:${pid}的结点.`;
    const levelIsError = ({ [this.valueField]: key, pid }) =>
      `${key}结点的层级位置错误，必须处于父节点【${pid}】的范围内!`;

    const eachRowDatas = (keys: Object = {}) => {
      return (callback = (keys: Object, data: Object) => {}) => {
        datas.forEach((data: Object) => {
          const { [this.valueField]: key } = data;
          keys[key] = data;
          callback && callback(keys, data);
        });
      };
    };

    const keys = {},
      pids = [];
    eachRowDatas(keys)((keys: Object, data: Object) => {
      const { [this.pidField]: pid } = data;
      if (notEmpty(pid)) {
        pids.push(pid);
      }
    });

    pids.forEach(pid => {
      if (!notEmpty(keys[pid])) {
        result.push(pidIsNotExist(pid));
      }
    });

    if (result.length > 0) {
      return result;
    }

    const key2PidIndex = {};
    let index = 0;
    eachRowDatas()((keys: Object, data: Object) => {
      const { [this.pidField]: pid, [this.valueField]: key } = data;
      key2PidIndex[key] = index++;
      if (notEmpty(pid) && !keys[pid]) {
        result.push(levelIsError(data));
      }
    });

    const fetchPidPath = pid => {
      const pidPath = [];
      let node = keys[pid];
      while (node) {
        const { [this.valueField]: key, [this.pidField]: pid } = node;
        pidPath.push(key);
        node = keys[pid];
      }
      return pidPath.reverse();
    };

    const pathIsError = ({ [this.valueField]: key }) => `${key}结点path信息错误!`;
    const isPathError = {};
    datas.forEach((data: Object) => {
      const { [this.pidField]: pid, [this.pathField]: path, [this.valueField]: key } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pidPath = pidPathArray.join(this.pathSeparator);
        if (pidPath !== path) {
          isPathError[key] = true;
          result.push(pathIsError(data));
        }
      }
    });

    datas.forEach((data: Object, index: number) => {
      const { [this.pidField]: pid } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pathIndex = pidPathArray.map(pid => key2PidIndex[pid]);
        const pathLen = pathIndex.length;
        if (pathLen > 0) {
          const start = pathIndex[pathLen - 1];
          const { [this.pathField]: path, [this.valueField]: key } = datas[start];
          const prePath = (path ? `${path}${this.pathSeparator}` : '') + key;
          for (let i = start + 1; i < index; i++) {
            const node = datas[i];
            const { [this.pathField]: path } = node;
            if (path) {
              if (!path.startsWith(prePath) && !isPathError[data[this.valueField]]) {
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

  generateTreeNode(rowData: Array<RowData>): Array<RowData> {
    const result = [];
    if (rowData) {
      const node = {};
      rowData.forEach(data => {
        const row = { ...data };
        const { [this.pidField]: pid, [this.valueField]: key } = row;
        node[key] = row;
        if (pid) {
          const parent = node[pid];
          let { children } = parent;
          if (!children) {
            children = [];
            parent.children = children;
          }
          children.push(row);
        } else {
          result.push(node[key]);
        }
      });
    }
    return result;
  }

  slice(
    rowDatas: Array<RowData>,
    start: number,
    total: number,
    id2ExtendInfo: NodeId2ExtendInfo
  ): { rows: Array<RowData>, parentCount: number } {
    const empty = { rows: [], parentCount: 0 };
    if (rowDatas && rowDatas.length === 0) {
      return empty;
    }
    const result = rowDatas.slice(start, start + total);
    const root = result[0];
    if (!root) {
      console.warn('树形数据存在问题');
      return empty;
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return { rows: result, parentCount: 0 };
    }

    const pathNode = this.getPathNodes(rowDatas, start, id2ExtendInfo);

    const parentCount = pathNode.length;
    Array.prototype.push.apply(pathNode, result);
    return { rows: pathNode, parentCount };
  }

  getPathNodes(rowDatas: Array<RowData>, start: number, id2ExtendInfo: NodeId2ExtendInfo) {
    const result = [];
    const row = rowDatas[start];
    if (!row) {
      return result;
    }
    const { [this.pathField]: path } = row;
    if (path) {
      const pathArray = this.getPathArray(path);
      const len = pathArray.length;
      for (let i = 0; i < len; i++) {
        const row = this.getRow(pathArray[i], id2ExtendInfo);
        if (row) {
          result.push(row);
        }
      }
    }
    return result;
  }

  catchPathArray: Object;

  getPathArray(path: ?string): Array<string> {
    if (!path) {
      return [];
    }
    const cacheValue = this.catchPathArray[path];
    if (cacheValue) {
      return cacheValue;
    }
    this.catchPathArray[path] = path.split(this.pathSeparator);
    return this.catchPathArray[path];
  }

  getKeys(nodes: Array<RowData>): Array<string> {
    if (!nodes) {
      return [];
    }
    return nodes.map((node: RowData) => {
      const { [this.valueField]: key } = node;
      return key;
    });
  }

  fetchNodeExtendInfo(
    nodeId: string,
    nodes: Array<RowData>,
    id2ExtendInfo: NodeId2ExtendInfo
  ): NodeExtendInfo {
    if (!id2ExtendInfo[VirtualRoot]) {
      this.initAllNodeIndexAndTopRoot(nodes, id2ExtendInfo);
    }
    const existData = id2ExtendInfo[nodeId];

    const { index: begin, can } = existData;
    const row = nodes[begin];
    if (row) {
      const { isLeaf = false } = row;

      if (isLeaf) {
        return {
          can,
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
    const { [this.pathField]: path } = row;
    let startWiths = nodeId;
    if (path) {
      startWiths = `${path}${this.pathSeparator}${nodeId}`;
    }

    for (let i = begin + 1; i < end; i++) {
      let founded = false;
      const row = nodes[i];
      const { [this.pidField]: pid, [this.pathField]: path, [this.valueField]: key } = row;
      const isChildren = pid === nodeId;
      if (isChildren) {
        children++;
        childrenIdx.push(i);
        const { begats: childBegats = -1 } = id2ExtendInfo[key];
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
    return this.generateExtendInfo(
      nodeId,
      begats,
      children,
      id2ExtendInfo,
      childrenIdx,
      begin,
      can
    );
  }

  initAllNodeIndexAndTopRoot(nodes: Array<RowData>, id2nodeExpandInfo: NodeId2ExtendInfo) {
    const childrenIdx = [];
    let canTotal = 0;
    if (!id2nodeExpandInfo[VirtualRoot]) {
      const begats = nodes.length;
      for (let index = 0; index < begats; index++) {
        const row = nodes[index];
        const { pid, [this.valueField]: key } = row;
        if (!pid) {
          childrenIdx.push(index);
        }
        const can = this.can(row);
        can && canTotal++;
        id2nodeExpandInfo[key] = { index, can };
      }

      const length = childrenIdx.length;
      const nowAndRealVisible = this.expandAll ? begats : length;
      id2nodeExpandInfo[VirtualRoot] = {
        can: false,
        canTotal,
        nowVisible: nowAndRealVisible,
        realyVisible: nowAndRealVisible,
        childrenIdx,
        children: length,
        begats,
        index: -1,
      };
    }
  }

  generateExtendInfo(
    nodeId: string,
    begats: number,
    children: number,
    id2ExtendInfo: NodeId2ExtendInfo,
    childrenIdx: Array<number>,
    index: number,
    can: boolean
  ): NodeExtendInfo {
    const nowAndRealVisible = this.expandAll ? begats : nodeId === this.VirtualRoot ? children : 0;

    return (id2ExtendInfo[nodeId] = {
      can,
      nowVisible: nowAndRealVisible,
      realyVisible: nowAndRealVisible,
      childrenIdx,
      children,
      begats,
      index,
    });
  }

  /**
   * 只支持逐级进行展开
   * @param nodeId
   * @param nodes
   * @param id2ExtendInfo
   * @param expandAll
   */
  expandNode(nodeId: string, id2ExtendInfo: NodeId2ExtendInfo): void {
    const nodes: Array<RowData> = this.treeData;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2ExtendInfo);
    const info = fetchNodeInfo(nodeId);
    const { children, expanded, begats = 0 } = info;
    const isInitStatus = expanded === undefined;

    if (!this.expandAll && isInitStatus) {
      info.nowVisible = info.realyVisible = children;
    }

    const willNotCollapsed = this.expandAll && isInitStatus;
    if (willNotCollapsed || expanded === true || begats == 0) {
      return;
    }

    const { realyVisible, index } = info;
    info.nowVisible = realyVisible;

    this.processPath(nodes[index], (nodeId: string) => {
      const childInfo = fetchNodeInfo(nodeId);
      const { nowVisible: childNow, realyVisible: childRealy } = childInfo;
      childInfo.nowVisible = childNow + realyVisible;
      childInfo.realyVisible = childRealy + realyVisible;
    });
    info.expanded = true;
    this.updateVersion();
  }

  fetchNodeExtendInfoById(nodes: Array<RowData>, id2ExtendInfo: NodeId2ExtendInfo) {
    return (nodeId: string): NodeExtendInfo => {
      return this.fetchNodeExtendInfo(nodeId, nodes, id2ExtendInfo);
    };
  }

  colapseNode(nodeId: string, id2ExtendInfo: NodeId2ExtendInfo): void {
    const nodes: Array<RowData> = this.treeData;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2ExtendInfo);

    const info = fetchNodeInfo(nodeId);
    const { expanded, realyVisible = 0, begats = 0 } = info;
    if (expanded === false || begats == 0) {
      return;
    }

    const { index } = info;

    info.nowVisible = 0;
    this.processPath(nodes[index], (nodeId: string) => {
      const childInfo = fetchNodeInfo(nodeId);
      const { realyVisible: childRealy = 0 } = childInfo;
      childInfo.realyVisible = childRealy - realyVisible;
      if (childInfo.nowVisible !== 0) {
        childInfo.nowVisible = childInfo.realyVisible;
      }
    });
    info.expanded = false;
    this.updateVersion();
  }

  processPath(info: RowData, doCall: Function): void {
    const { [this.pathField]: path } = info;
    const pathArray = [this.VirtualRoot];
    if (path) {
      Array.prototype.push.apply(pathArray, this.getPathArray(path));
    }

    const len = pathArray.length;
    for (let i = 0; i < len; i++) {
      doCall(pathArray[i]);
    }
  }

  fixedNullAndUndefined(val: any): string {
    return val === null || val === undefined ? '' : val;
  }

  fixedNullAndUndefinedArray(val: any): any {
    return val === null || val === undefined ? [] : val;
  }

  whiteOrBlackListChanged: boolean;
  isWhiteOrBlackListChanged() {
    return this.whiteOrBlackListChanged;
  }
  search(
    expandInfo: ExpandInfo,
    query: string,
    searchType: QueryType = 'include',
    blackList: ?(string[]),
    whiteList: ?(string[])
  ): Array<RowData> {
    const queryChanging =
      this.fixedNullAndUndefined(query) !== this.fixedNullAndUndefined(this.query);
    const blackListChanging =
      JSON.stringify(this.fixedNullAndUndefinedArray(blackList)) !==
      JSON.stringify(this.fixedNullAndUndefinedArray(this.blackList));
    const whiteListChanging =
      JSON.stringify(this.fixedNullAndUndefinedArray(whiteList)) !==
      JSON.stringify(this.fixedNullAndUndefinedArray(this.whiteList));
    this.whiteOrBlackListChanged = blackListChanging || whiteListChanging;
    const conditionChanging = queryChanging || blackListChanging || whiteListChanging;
    if (conditionChanging) {
      this.updateVersion();
    }
    //  要做性能优化，不然会一直重新遍历
    if (!this.isVersionChange()) {
      return this.oldTreeData;
    }

    if (conditionChanging) {
      expandInfo.id2ExtendInfo = {};
    }

    const queryAll = query === '';
    if (queryAll) {
      this.treeData = this.getFilterResult(blackList, whiteList);
    } else if (queryChanging) {
      const queryArray = this.getQueryArray(query);
      const rows = this.getFilterResult(blackList, whiteList);
      const matchCondition = (row: Object) => {
        const { [this.displayField]: title } = row;
        return this.match(title, queryArray, searchType);
      };
      const needPushCondition = () => true;
      const rowSet = this.getRowSet(rows, matchCondition, needPushCondition);

      if (rowSet.length === rows.length) {
        this.treeData = rows;
      } else {
        this.treeData = rowSet.reverse();
      }
    }
    this.query = query;
    this.blackList = blackList;
    this.whiteList = whiteList;
    this.oldTreeData = this.generateRealTreeData(expandInfo);

    return this.oldTreeData;
  }

  getRowSet(rows: Array<Object>, matchCondition: Function, needPushCondition: Function) {
    const need: Object = {};
    const containPath: Object = {};
    const rowSet = [];
    const len = rows.length - 1;
    const discardChildrenRow = [];
    for (let i = len; i >= 0; i--) {
      const row: RowData = rows[i];
      const { [this.valueField]: key, [this.pathField]: path, isLeaf } = row;
      if (matchCondition(row)) {
        if (needPushCondition(row, need) && path !== undefined && containPath[path] === undefined) {
          const pathArray = this.getPathArray(path);
          containPath[path] = true;
          const len = pathArray.length;
          for (let i = 0; i < len; i++) {
            const key = pathArray[i];
            need[key] = true;
          }
        }
        if (!isLeaf) {
          const delIndex = [];
          const newChildren = discardChildrenRow.filter((item, index) => {
            const pathStartWiths = path ? `${path}${this.pathSeparator}${key}` : key;
            delIndex.push(index);
            return item.path && item.path.startsWith(pathStartWiths);
          });
          delIndex.length > 0 && discardChildrenRow.slice(delIndex[0], delIndex.length);
          rowSet.unshift(...newChildren);
        }
        needPushCondition(row, need) && rowSet.push(row);
      } else if (need[key] === true) {
        rowSet.push(row);
        delete need[key];
      } else {
        discardChildrenRow.push(row);
      }
    }
    return rowSet;
  }

  getFilterResult(blackList: ?(string[]), whiteList: ?(string[])): Array<Object> {
    if (!blackList && !whiteList) {
      return this.orignalData;
    }
    const rows = this.orignalData;
    const isMatch = (row: Object) => {
      const { [this.valueField]: key } = row;
      if (blackList) {
        return !blackList.includes(key);
      } else if (whiteList) {
        return whiteList.includes(key);
      }
    };

    const needPushCondition = (row, need) => {
      const { [this.valueField]: key, isLeaf } = row;
      return isLeaf || need[key] || !blackList;
    };
    const rowSet = this.getRowSet(rows, isMatch, needPushCondition);

    if (rowSet.length === this.orignalData.length) {
      return this.orignalData;
    }
    return rowSet.reverse();
  }
  isVersionChange() {
    return this.version !== this.oldVersion;
  }

  match(val: ?string, query: Array<string>, type: QueryType): boolean {
    if (val === undefined || val === null) {
      return false;
    }
    if (!query) {
      return false;
    }
    val += '';

    switch (type) {
      case 'start': {
        return this.toMach(val, query, (val: string, query: string) => {
          return val.startsWith(query);
        });
      }
      case 'end': {
        return this.toMach(val, query, (val: string, query: string) => {
          return val.endsWith(query);
        });
      }
      case 'include': {
        return this.toMach(val, query, (val: string, query: string) => {
          return !!~val.indexOf(query);
        });
      }
      case 'eql': {
        return this.toMach(val, query, (val: string, query: string) => {
          return val === query;
        });
      }
      default:
        return false;
    }
  }

  getQueryArray(query: string): Array<string> {
    if (this.splitQuery) {
      return query.split(this.splitQuery);
    }
    return [query];
  }

  toMach(val: string, queryArray: Array<string>, match: Function): boolean {
    for (let i = 0; i < queryArray.length; i++) {
      const oneQuery = queryArray[i];
      if (!oneQuery || oneQuery === '') {
        continue;
      }
      if (match(val, oneQuery)) {
        return true;
      }
    }
    return false;
  }

  generateRealTreeData(expandInfo: ExpandInfo): Array<RowData> {
    const datas = this.treeData;
    const noChanged = !this.isVersionChange();
    if (noChanged) {
      return this.oldTreeData;
    }

    const { id2ExtendInfo } = expandInfo;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(datas, id2ExtendInfo);
    const nodeInfo = fetchNodeInfo(this.VirtualRoot);
    const { nowVisible } = nodeInfo;

    if (nowVisible === 0) {
      return [];
    }
    this.oldVersion = this.version;
    const { childrenIdx = [] } = nodeInfo;

    const { children = 0, begats = 0 } = nodeInfo;

    if (nowVisible === children) {
      return (this.oldTreeData = this.fetchLevelOneChild(datas, childrenIdx));
    }

    if (nowVisible === begats) {
      return (this.oldTreeData = datas);
    }
    const totalLen = datas.length;
    const result = [];
    for (let i = 0; i < totalLen; i++) {
      const row = datas[i];
      result.push(row);
      const { [this.valueField]: key } = row;
      const { childrenIdx = [], nowVisible = 0, children = 0, begats = 0 } = fetchNodeInfo(key);
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
    return (this.oldTreeData = result);
  }

  fetchLevelOneChild(datas: Array<RowData>, childrenIdx: Array<number>) {
    const result = [];
    const len = childrenIdx.length;
    for (let i = 0; i < len; i++) {
      result.push(datas[childrenIdx[i]]);
    }
    return result;
  }

  selectNode(key: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo): void {
    const { checked } = selectInfo;
    if (checked[key] === true) {
      return;
    }
    const operType = TreeUtils.Selected;
    const { [this.pathField]: path } = this.updateSelectedStatusForChildren(
      key,
      selectInfo,
      id2ExtendInfo,
      operType
    );

    const { begats = 0 } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
    const maxHalfCount = begats + 1;

    this.updateSelectedStatusForParent(path, selectInfo, maxHalfCount, operType, id2ExtendInfo);
  }

  selectDirNode(
    key: string,
    selectInfo: NodeId2SelectInfo,
    id2ExtendInfo: NodeId2ExtendInfo
  ): void {
    const { checked } = selectInfo;
    if (checked[key] === true) {
      return;
    }
    const row = this.getRow(key, id2ExtendInfo);
    if (!row) {
      console.warn('选择的结点不存在');
      return;
    }
    this.selectDirNodeByRow(row, selectInfo, id2ExtendInfo);
  }

  selectDirNodeByRow(
    row: RowData,
    selectInfo: NodeId2SelectInfo,
    id2ExtendInfo: NodeId2ExtendInfo
  ): void {
    const { [this.valueField]: key } = row;
    const { checked } = selectInfo;
    if (checked[key] === true) {
      return;
    }
    const { isLeaf = false } = row;
    if (isLeaf === true) {
      this.selectNode(key, selectInfo, id2ExtendInfo);
      return;
    }

    const { halfchecked, value } = selectInfo;
    const nowHalf = halfchecked[key];
    const extendInfo = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
    if (nowHalf !== undefined) {
      const { begats = 0 } = extendInfo;
      if (nowHalf === begats) {
        halfchecked[key] = nowHalf + 1;
        checked[key] = true;
      }
    } else {
      halfchecked[key] = 1;
    }
    this.selectRow(value, key, row, extendInfo);
    const { [this.pathField]: path } = row;
    this.updateSelectedStatusForParent(path, selectInfo, 1, TreeUtils.Selected, id2ExtendInfo);
  }

  unSelectNode(key: string, selectInfo: NodeId2SelectInfo, id2ExtendInfo: NodeId2ExtendInfo): void {
    const notLeaf = !this.isLeaf(key, id2ExtendInfo);
    let halfCount = 1;

    if (notLeaf) {
      const { halfchecked } = selectInfo;
      const childHalfCount = halfchecked[key];
      const onlyYourSelf = childHalfCount === 1;

      if (onlyYourSelf) {
        halfCount = 1;
      } else {
        const { begats = 0 } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
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
    const { [this.pathField]: path } = this.updateSelectedStatusForChildren(
      key,
      selectInfo,
      id2ExtendInfo,
      operatorType
    );
    this.updateSelectedStatusForParent(path, selectInfo, halfCount, operatorType, id2ExtendInfo);
  }

  updateSelectedStatusForParent(
    path?: string,
    selectInfo: NodeId2SelectInfo,
    halfCount: number,
    operatorType: SelectType,
    id2ExtendInfo: NodeId2ExtendInfo
  ) {
    if (path) {
      const { checked, halfchecked } = selectInfo;
      const pathArray = this.getPathArray(path);
      const len = pathArray.length;
      switch (operatorType) {
        case TreeUtils.Selected: {
          for (let i = 0; i < len; i++) {
            const key = pathArray[i];
            if (!checked[key]) {
              this.halfCheckForParent(key, selectInfo, operatorType, halfCount);
              const { begats = 0 } = this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
              if (halfchecked[key] === begats + 1) {
                checked[key] = true;
              }
            }
          }
          break;
        }
        case TreeUtils.UnSelected: {
          for (let i = 0; i < len; i++) {
            const key = pathArray[i];
            delete checked[key];
            this.halfCheckForParent(key, selectInfo, operatorType, halfCount);
          }
          break;
        }
        default:
      }
    }
  }

  isLeaf(key: string, id2ExtendInfo: NodeId2ExtendInfo) {
    const row = this.getRow(key, id2ExtendInfo);
    if (!row) {
      return false;
    }
    const { isLeaf = false } = row;
    return isLeaf;
  }

  getRow(key: string, id2ExtendInfo: NodeId2ExtendInfo): Object | null {
    if (!id2ExtendInfo[VirtualRoot]) {
      this.initAllNodeIndexAndTopRoot(this.treeData, id2ExtendInfo);
    }
    const extendInfo = id2ExtendInfo[key];
    if (extendInfo) {
      const { index } = id2ExtendInfo[key];
      return this.treeData[index];
    }
    return null;
  }

  getTitle(value: Array<string>, id2ExtendInfo: NodeId2ExtendInfo): Array<string> {
    if (!value || value.length === 0) {
      return [];
    }
    const result = [];
    const len = value.length;
    for (let i = 0; i < len; i++) {
      const key = value[i];
      const row = this.getRow(key, id2ExtendInfo);
      if (row) {
        const { [this.displayField]: title } = row;
        result.push(title);
      } else {
        result.push(this.getNoInTreeTitle(key));
      }
    }
    return result;
  }

  getNoInTreeTitle(key: string): string {
    const result = this.notInTree[key];
    return result ? result : '';
  }

  getNotInTree() {
    const { notInTree = {} } = this;
    return notInTree;
  }
  getInTree() {
    const { inTree = {} } = this;
    return inTree;
  }

  updateSelectedStatusForChildren(
    targetKey: string,
    selectInfo: NodeId2SelectInfo,
    id2ExtendInfo: NodeId2ExtendInfo,
    type: SelectType
  ): RowData {
    const datas = this.treeData;
    const { index: targetNode, begats } = this.fetchNodeExtendInfo(targetKey, datas, id2ExtendInfo);
    const len = datas.length;
    const range = targetNode + begats;

    for (let i = targetNode; i <= range && i < len; i++) {
      const row = datas[i];
      const { [this.valueField]: key } = row;
      switch (type) {
        case TreeUtils.Selected: {
          const extendInfo = this.fetchNodeExtendInfo(key, datas, id2ExtendInfo);

          const { checked, value } = selectInfo;
          if (!this.selectRow(value, key, row, extendInfo)) {
            break;
          }
          checked[key] = true;
          const { isLeaf = false } = row;

          const { begats = 0 } = this.fetchNodeExtendInfo(key, datas, id2ExtendInfo);
          const isTargetNode = i === targetNode;
          const childHalfCount = isTargetNode || !isLeaf ? begats + 1 : begats;

          if (childHalfCount > 0) {
            const { halfchecked } = selectInfo;
            halfchecked[key] = childHalfCount;
          }
          break;
        }

        case TreeUtils.UnSelected:
          this.clearSelectInfo(key, selectInfo);
          break;
        default:
      }
    }
    return datas[targetNode];
  }

  halfCheckForParent(
    key: string,
    selectInfo: NodeId2SelectInfo,
    type: SelectType,
    childHalf: number
  ) {
    if (childHalf === 0) {
      this.clearSelectInfo(key, selectInfo);
      return;
    }

    const { halfchecked } = selectInfo;
    const notHalfCheck = !halfchecked[key];

    switch (type) {
      case TreeUtils.Selected: {
        this.halfSelectedForParent(key, selectInfo, childHalf);
        break;
      }
      case TreeUtils.UnSelected: {
        const halfValue = halfchecked[key];
        if (halfValue) {
          halfchecked[key] = halfValue - childHalf;
        }
        if (notHalfCheck || halfchecked[key] <= 0) {
          this.clearSelectInfo(key, selectInfo);
        }
        break;
      }
      default:
    }
  }

  halfSelectedForParent(key: string, selectInfo: NodeId2SelectInfo, childHalf: number): void {
    const { halfchecked } = selectInfo;
    const notHalfCheck = !halfchecked[key];
    if (notHalfCheck) {
      halfchecked[key] = 0;
    }
    halfchecked[key] = halfchecked[key] + childHalf;
  }

  clearSelectInfo(key: string, selectInfo: NodeId2SelectInfo) {
    const { value, halfchecked, checked } = selectInfo;
    delete halfchecked[key];
    delete checked[key];
    delete value[key];
  }

  value2SelectInfo(
    keys: Array<string>,
    displayValue: Array<string>,
    valueObject: NodeId2Checked,
    id2ExtendInfo: NodeId2ExtendInfo
  ): NodeId2SelectInfo {
    const len = keys.length;
    this.selCount = 0;
    this.notInTree = {};
    this.inTree = {};
    if (!valueObject || !len) {
      return { value: {}, halfchecked: {}, checked: {} };
    }
    const value = {},
      halfchecked = {},
      checked = {};

    this.initAllNodeIndexAndTopRoot(this.treeData, id2ExtendInfo);
    const levelArray = [];
    const path2Nodes = {};
    const allPathArray = {};
    const rootChildNode = [];
    const isDo = {};
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      if (isDo[key]) {
        continue;
      }
      const row = this.getRow(key, id2ExtendInfo);
      if (row) {
        this.selCount++;
        const { isLeaf = false, [this.pathField]: rowPath } = row;
        if (isLeaf) {
          if (!rowPath) {
            rootChildNode.push(row);
          } else {
            if (!allPathArray[rowPath]) {
              allPathArray[rowPath] = this.getPathArray(rowPath);
            }
            if (!path2Nodes[rowPath]) {
              path2Nodes[rowPath] = [];
            }
            path2Nodes[rowPath].push(row);
          }
        } else {
          const path = this.getPathArray(rowPath);
          const level = path.length;
          let rows = levelArray[level];
          if (!rows) {
            rows = levelArray[level] = [];
          }
          rows.push(row);
        }
        this.inTree[key] = true;
      } else {
        value[key] = true;
        const disp = displayValue[i];
        this.notInTree[key] = disp ? disp : key;
      }
      isDo[key] = true;
    }

    const selectedInfo = { value, halfchecked, checked };
    const levelArrayLen = levelArray.length;
    for (let i = levelArrayLen - 1; i >= 0; i--) {
      const rows = levelArray[i];
      if (rows) {
        const rowLen = rows.length;
        for (let j = 0; j < rowLen; j++) {
          const { [this.valueField]: key } = rows[j];
          this.fetchNodeExtendInfo(key, this.treeData, id2ExtendInfo);
        }
      }
    }
    for (let i = 0; i < levelArrayLen; i++) {
      const rows = levelArray[i];
      if (rows) {
        const rowLen = rows.length;
        for (let j = 0; j < rowLen; j++) {
          this.selectDirNodeByRow(rows[j], selectedInfo, id2ExtendInfo);
        }
      }
    }

    const data = this.treeData;
    const paths = Object.keys(allPathArray);
    const pathCount = paths.length;
    for (let i = 0; i < pathCount; i++) {
      const path = paths[i];
      const rows = path2Nodes[path];
      const rowLen = rows.length;
      let totalHalfCount = 0;
      // 选择子节点
      for (let i = 0; i < rowLen; i++) {
        const targetRow = rows[i];
        const { [this.valueField]: key } = targetRow;
        checked[key] = true;
        const { begats = 0 } = this.fetchNodeExtendInfo(key, data, id2ExtendInfo);
        totalHalfCount += halfchecked[key] = begats + 1;
      }

      // 更新父结点
      const pathArray = allPathArray[path];
      const len = pathArray.length;
      for (let i = 0; i < len; i++) {
        const key = pathArray[i];
        if (!checked[key]) {
          this.halfSelectedForParent(key, selectedInfo, totalHalfCount);
          const { begats = 0 } = this.fetchNodeExtendInfo(key, data, id2ExtendInfo);
          if (halfchecked[key] === begats + 1) {
            checked[key] = true;
          }
        }
      }
    }
    const rootChildNodeLen = rootChildNode.length;
    for (let i = 0; i < rootChildNodeLen; i++) {
      const { [this.valueField]: key } = rootChildNode[i];
      checked[key] = true;
    }
    return { value: valueObject, halfchecked, checked };
  }

  selectRow(value: Object, key: string, row: Object, extendINfo: NodeExtendInfo): boolean {
    if (value[key]) {
      return false;
    }
    if (!extendINfo.can) {
      return false;
    }
    value[key] = true;

    if (this.limitCount != undefined) {
      if (Object.keys(value).length > this.limitCount) {
        delete value[key];
        return false;
      }
    }
    return true;
  }

  can(row: Object) {
    if (this.igronSelectField) {
      if (row[this.igronSelectField] === true) {
        return false;
      }
    }
    if (this.onlySelectLeaf) {
      const { isLeaf = false } = row;
      if (!isLeaf) {
        return false;
      }
    }

    return true;
  }

  getCanTotal(id2ExtendInfo: NodeId2ExtendInfo): number {
    const info = this.fetchNodeExtendInfo(VirtualRoot, this.treeData, id2ExtendInfo);
    if (!info) {
      return 0;
    }
    const { canTotal = 0 } = info;
    return canTotal;
  }

  static Selected: 1 = 1;
  static UnSelected: 0 = 0;
}

export default TreeUtils;
