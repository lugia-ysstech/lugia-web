/**
 *
 * create by ligx
 *
 * @flow
 */
import type { HalfType, NodeExtendInfo, NodeId2ExtendInfo, NodeId2SelectInfo, SelectType, } from 'sv-widget';

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
type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};

type ExpandInfo = {
  target: Object,
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
  oldTreeData: Array<RowData>;
  treeData: Array<RowData>;
  oldVersion: number;
  expandedAll: boolean;

  constructor (treeData: Array<RowData>, expandedAll: boolean) {
    this.Error = ErrorDefine;
    this.version = 0;
    this.oldVersion = isInit;
    this.oldTreeData = treeData;
    this.treeData = treeData;
    this.expandedAll = expandedAll;
    return this;
  }

  updateVersion (): void {
    this.version++;
    if (this.version >= Number.MAX_VALUE) {
      this.version = 0;
    }
  }

  isRightTreeRowData (data: Object): string {

    const { key, title, pid, path, } = data;

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
      if (notEmpty(pid)) {
        if (!keys[ pid ]) {
          result.push(levelIsError(data));
        }
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
    datas.forEach((data: Object, index: number) => {
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

  slice (rowDatas: Array<RowData>, start: number, total: number, id2nodeExtendInfo: NodeId2ExtendInfo): { rows: Array<RowData>, parentCount: number } {
    const empty = { rows: [], parentCount: 0, };
    if (rowDatas && rowDatas.length === 0) {
      return empty;
    }
    const result = rowDatas.slice(start, start + total);
    const root = result[ 0 ];
    if (!root) {
      console.error('树形数据存在问题');
      return empty;
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return { rows: result, parentCount: 0, };
    }

    const pathNode = this.getPathNodes(rowDatas, start, id2nodeExtendInfo);
    const parentCount = pathNode.length;
    Array.prototype.push.apply(pathNode, result);
    return { rows: pathNode, parentCount, };
  }


  getPathNodes (rowDatas: Array<RowData>, start: number, id2nodeExtendInfo: NodeId2ExtendInfo) {
    const result = [];
    const row = rowDatas[ start ];
    if (!row) {
      return result;
    }
    const { path, } = row;
    if (path) {
      const pathArray = path.split(Seperator);
      for (let i = 0; i < pathArray.length; i++) {
        const key = pathArray[ i ];
        const { index, } = this.fetchNodeExtendInfo(key, this.treeData, id2nodeExtendInfo);
        result.push(this.treeData[ index ]);
      }
    }
    return result;
  }

  getKeys (nodes: Array<RowData>): Array<string> {
    const result = [];
    nodes && nodes.forEach((node: RowData) => {
      const { key, } = node;
      result.push(key);
    });
    return result;

  }

  fetchNodeExtendInfo (nodeId: string,
                       nodes: Array<RowData>,
                       id2nodeExtendInfo: NodeId2ExtendInfo): NodeExtendInfo {

    this.initAllNodeIndexAndTopRoot(nodes, id2nodeExtendInfo);

    const existData = id2nodeExtendInfo[ nodeId ];
    const isExist = existData && existData.begats !== undefined;
    if (isExist) {
      return existData;
    }

    const end = nodes.length;
    let children = 0;
    let begats = 0;
    const begin = existData && existData.index !== undefined ? existData.index : 0;
    const childrenIdx = [];

    for (let i = begin + 1; i < end; i++) {

      let founded = false;
      const { pid, path, } = nodes[ i ];

      const isChildren = pid === nodeId;
      if (isChildren) {
        children++;
        childrenIdx.push(i);
        begats++;
        founded = true;
      } else if (path) {
        const pathArray = path.split(Seperator);
        const isInPath = ~pathArray.indexOf(nodeId);
        if (isInPath) {
          begats++;
          founded = true;
        }
      }
      if (!founded) {
        break;
      }

    }
    return this.generateExtendInfo(nodeId, begats, children, id2nodeExtendInfo, childrenIdx);
  }

  initAllNodeIndexAndTopRoot (nodes: Array<RowData>,
                              id2nodeExpandInfo: NodeId2ExtendInfo) {
    const childrenIdx = [];
    if (!id2nodeExpandInfo[ VirtualRoot ]) {
      const len = nodes.length;
      let children = 0;
      for (let index = 0; index < len; index++) {
        const { pid, key, } = nodes[ index ];
        if (!pid) {
          childrenIdx.push(index);
          children++;
        }
        if (!id2nodeExpandInfo[ key ]) {
          id2nodeExpandInfo[ key ] = { index, };
        }
      }
      this.generateExtendInfo(VirtualRoot, len, children, id2nodeExpandInfo, childrenIdx);
    }
  }

  generateExtendInfo (nodeId: string, begats: number, children: number,
                      id2nodeExtendInfo: NodeId2ExtendInfo,
                      childrenIdx: Array<number>): NodeExtendInfo {

    const nowAndRealVisible = this.expandedAll ? begats : (nodeId === this.VirtualRoot ? children : 0);
    const nodeInfo = id2nodeExtendInfo[ nodeId ];
    const index = nodeInfo && nodeInfo.index !== undefined ? nodeInfo.index : -1;

    id2nodeExtendInfo[ nodeId ] = {
      nowVisible: nowAndRealVisible,
      realyVisible: nowAndRealVisible,
      childrenIdx,
      children,
      begats,
      index,
    };
    return id2nodeExtendInfo[ nodeId ];
  }

  /**
   * 只支持逐级进行展开
   * @param nodeId
   * @param nodes
   * @param id2nodeExtendInfo
   * @param expandedAll
   */
  expandNode (nodeId: string,
              nodes: Array<RowData>,
              id2nodeExtendInfo: NodeId2ExtendInfo): void {

    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2nodeExtendInfo);
    const info = fetchNodeInfo(nodeId);
    const { children, expanded, begats = 0, } = info;
    const isInitStatus = expanded === undefined;

    if (!this.expandedAll && isInitStatus) {
      info.nowVisible = info.realyVisible = children;
    }

    const willNotCollapsed = this.expandedAll && isInitStatus;
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
                           id2nodeExtendInfo: NodeId2ExtendInfo) {
    return (nodeId: string): NodeExtendInfo => {
      return this.fetchNodeExtendInfo(nodeId, nodes, id2nodeExtendInfo);
    };
  }

  colapseNode (nodeId: string,
               nodes: Array<RowData>,
               id2nodeExtendInfo: NodeId2ExtendInfo): void {
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2nodeExtendInfo);

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
    const pathArray = [this.VirtualRoot,];
    if (path) {
      Array.prototype.push.apply(pathArray, path.split(Seperator));
    }

    const len = pathArray.length;
    for (let i = 0; i < len; i++) {
      doCall(pathArray[ i ]);
    }
  }


  generateRealTreeData (expandInfo: ExpandInfo): Array<RowData> {
    if (this.version === this.oldVersion) {
      return this.oldTreeData;
    }

    this.oldVersion = this.version;
    const datas = this.treeData;
    const { id2ExtendInfo, } = expandInfo;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(datas, id2ExtendInfo);
    const { childrenIdx = [], nowVisible = 0, children = 0, begats = 0, } = fetchNodeInfo(this.VirtualRoot);
    if (nowVisible === 0) {
      return [];
    }

    if (this.oldVersion === isInit) {
      return this.oldTreeData = this.expandedAll ? datas : this.fetchLevelOneChild(datas, childrenIdx);
    }


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

  selectNode (key: string, selectInfo: NodeId2SelectInfo, id2nodeExtendInfo: NodeId2ExtendInfo): void {
    const { path, } = this.updateSelectedStatus(key, selectInfo, id2nodeExtendInfo, TreeUtils.Selected);
    const { checked, } = selectInfo;
    if (path) {
      const pathArray = path.split('/');
      const len = pathArray.length;
      const { begats = 0, } = this.fetchNodeExtendInfo(key, this.treeData, id2nodeExtendInfo);

      for (let i = 0; i < len; i++) {
        const key = pathArray[ i ];
        if (checked[ key ] !== true) {
          this.half(key, selectInfo, TreeUtils.Half, begats + 1);
        }
      }
    }
  }

  unSelectNode (key: string, selectInfo: NodeId2SelectInfo, id2nodeExtendInfo: NodeId2ExtendInfo): void {
    const { halfchecked, checked,} = selectInfo;
    const halfCount = halfchecked[ key ] + 1;
    const { path, } = this.updateSelectedStatus(key, selectInfo, id2nodeExtendInfo, TreeUtils.UnSelected);
    if (path) {
      const pathArray = path.split('/');
      const len = pathArray.length;
      for (let i = 0; i < len; i++) {
        const key = pathArray[ i ];
        delete checked[key];
        this.half(key, selectInfo, TreeUtils.UnHalf, halfCount);
      }
    }
  }

  updateSelectedStatus (key: string, selectInfo: NodeId2SelectInfo, id2nodeExtendInfo: NodeId2ExtendInfo, type: SelectType): RowData {

    const datas = this.treeData;
    const { index, begats, } = this.fetchNodeExtendInfo(key, datas, id2nodeExtendInfo);
    const len = datas.length;
    for (let i = index; i <= index + begats && i < len; i++) {
      const { key, } = datas[ i ];
      const { begats = 0, } = this.fetchNodeExtendInfo(key, datas, id2nodeExtendInfo);
      this.check(key, selectInfo, type);
      switch (type) {
        case TreeUtils.Selected:
          this.half(key, selectInfo, TreeUtils.Half, begats);
          break;
        case TreeUtils.UnSelected:
          this.half(key, selectInfo, TreeUtils.UnHalf, begats);
          break;
        default:

      }
    }
    return datas[ index ];
  }

  check (key: string, selectInfo: NodeId2SelectInfo, type: SelectType) {
    const { checked, value, } = selectInfo;

    switch (type) {
      case TreeUtils.Selected:
        checked[ key ] = true;
        value[ key ] = true;
        break;
      case TreeUtils.UnSelected:
        delete checked[ key ];
        delete value[ key ];
        break;
      default:
    }
  }

  half (key: string, selectInfo: NodeId2SelectInfo, type: HalfType, begats: number) {
    if(begats === 0){
      return;
    }
    const { value, halfchecked, checked,} = selectInfo;

    switch (type) {


      case TreeUtils.Half: {

        if (halfchecked[ key ] === undefined) {
          halfchecked[ key ] = 0;
        }
        halfchecked[ key ] = halfchecked[ key ] + begats;
        break;

      }
      case TreeUtils.UnHalf: {
        if (halfchecked[ key ] === undefined) {
          halfchecked[ key ] = 0;
        }
        halfchecked[ key ] = halfchecked[ key ] - begats;

        if (halfchecked[ key ] <= 0) {
          delete halfchecked[ key ];
          delete checked[ key ];
          delete value[ key ];
        }
        break;

      }
      default:
    }
  }

  static Selected: 1 = 1;
  static UnSelected: 0 = 0;
  static Half: 2 = 2;
  static UnHalf: 3 = 3;
}


export default TreeUtils;
