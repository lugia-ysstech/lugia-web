/**
 *
 * create by ligx
 *
 * @flow
 */
import type { NodeExtendInfo, NodeId2ExtendInfo, } from 'sv-widget';

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
  expandedAll: boolean,
  target: Object,
  id2ExtendInfo: NodeId2ExtendInfo,
}


const notEmpty = (obj: any) => {
  return obj !== null && obj !== undefined && obj !== '';
};
const VirtualRoot = 'sv_tree_root';

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

  constructor (treeData: Array<RowData>) {
    this.Error = ErrorDefine;
    this.version = 0;
    this.oldVersion = isInit;
    this.oldTreeData = treeData;
    this.treeData = treeData;
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
        const pidPath = pidPathArray.join('/');
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

  slice (rowDatas: Array<RowData>, start: number, total: number, out?: Object): Array<RowData> {
    if (rowDatas && rowDatas.length === 0) {
      return [];
    }
    const result = rowDatas.slice(start, start + total);
    const root = result[ 0 ];
    if (!root) {
      console.error('树形数据存在问题');
      return [];
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return result;
    }

    const pathNode = this.getPathNodes(rowDatas, start, root.pid);
    if(out){
      out.parentCount = pathNode.length;
    }
    console.info('pathNode', pathNode );
    Array.prototype.push.apply(pathNode, result);
    return pathNode;
  }


  getPathNodes (rowDatas: Array<RowData>, start: number, targetPid?: string) {
    const result = [];
    if (!targetPid) {
      return result;
    }
    for (let findPidIdx = start; findPidIdx >= 0; findPidIdx--) {
      const node = rowDatas[ findPidIdx ];
      const { key, pid, } = node;
      if (key === targetPid) {
        result.push(node);
        if (!pid) {
          break;
        }
        targetPid = pid;
      }
    }
    return result.reverse();
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
                       id2nodeExtendInfo: NodeId2ExtendInfo,
                       expandedAll: boolean = false): NodeExtendInfo {

    this.initAllNodeIndexAndTopRoot(nodes, id2nodeExtendInfo, expandedAll);

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
        const pathArray = path.split('/');
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
    return this.generateExtendInfo(nodeId, expandedAll, begats, children, id2nodeExtendInfo, childrenIdx);
  }

  initAllNodeIndexAndTopRoot (nodes: Array<RowData>,
                              id2nodeExpandInfo: NodeId2ExtendInfo,
                              expandedAll: boolean) {
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
      this.generateExtendInfo(VirtualRoot, expandedAll, len, children, id2nodeExpandInfo, childrenIdx);
    }
  }

  generateExtendInfo (nodeId: string, expandedAll: boolean,
                      begats: number, children: number,
                      id2nodeExtendInfo: NodeId2ExtendInfo,
                      childrenIdx: Array<number>): NodeExtendInfo {

    const nowAndRealVisible = expandedAll ? begats : (nodeId === this.VirtualRoot ? children : 0);
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
              id2nodeExtendInfo: NodeId2ExtendInfo,
              expandedAll: boolean = false): void {

    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2nodeExtendInfo, expandedAll);
    const info = fetchNodeInfo(nodeId);
    const { children, expanded, begats = 0, } = info;
    const isInitStatus = expanded === undefined;

    if (!expandedAll && isInitStatus) {
      info.nowVisible = info.realyVisible = children;
    }

    const willNotCollapsed = expandedAll && isInitStatus;
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
                           id2nodeExtendInfo: NodeId2ExtendInfo,
                           expandedAll: boolean = false) {
    return (nodeId: string): NodeExtendInfo => {
      return this.fetchNodeExtendInfo(nodeId, nodes, id2nodeExtendInfo, expandedAll);
    };
  }

  colapseNode (nodeId: string,
               nodes: Array<RowData>,
               id2nodeExtendInfo: NodeId2ExtendInfo,
               expandedAll: boolean = false): void {
    const fetchNodeInfo = this.fetchNodeExtendInfoById(nodes, id2nodeExtendInfo, expandedAll);

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
      Array.prototype.push.apply(pathArray, path.split('/'));
    }

    const len = pathArray.length;
    for (let i = 0; i < len; i++) {
      doCall(pathArray[ i ]);
    }
  }


  generateRealTreeData (expandInfo: ExpandInfo): Array<RowData> {

    let c = 0;
    if (this.version === this.oldVersion) {
      console.info(c);
      return this.oldTreeData;
    }

    this.oldVersion = this.version;
    const datas = this.treeData;
    const { expandedAll, id2ExtendInfo, } = expandInfo;
    const fetchNodeInfo = this.fetchNodeExtendInfoById(datas, id2ExtendInfo, expandedAll);
    const { childrenIdx = [], nowVisible = 0, children = 0, begats = 0, } = fetchNodeInfo(this.VirtualRoot);
    if (nowVisible === 0) {
      return [];
    }

    if (this.oldVersion === isInit) {
      return this.oldTreeData = expandedAll ? datas : this.fetchLevelOneChild(datas, childrenIdx);
    }


    if (nowVisible === children) {
      console.info(c);
      return this.oldTreeData = this.fetchLevelOneChild(datas, childrenIdx);
    }
    if (nowVisible === begats) {
      console.info(c);
      return this.oldTreeData = datas;
    }

    const totalLen = datas.length;
    const result = [];
    for (let i = 0; i < totalLen; i++) {
      c++;
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
    console.info(c);
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
}


export default TreeUtils;
