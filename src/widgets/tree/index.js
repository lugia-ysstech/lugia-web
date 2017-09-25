/**
 *
 * create by ligx
 *
 * @flow
 */
import animation from '../common/openAnimation';
import * as React from 'react';
import RcTree, { TreeNode, } from 'rc-tree';
import classNames from 'classnames';
import '../css/sv.css';
import './index.css';

type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
};
type TreeProps = {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Array<string>;
  /** （受控）展开指定的树节点 */
  expandedKeys?: Array<string>;
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Array<string> | { checked: Array<string>, halfChecked: Array<string> };
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Array<string>;
  /** （受控）设置选中的树节点 */
  selectedKeys?: Array<string>;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Array<string>;
  /** 展开/收起节点时触发 */
  onExpand?: Function,
  /** 点击复选框触发 */
  onCheck?: Function,
  /** 点击树节点触发 */
  onSelect?: Function,
  /** filter some AntTreeNodes as you need. it should return true */
  filterAntTreeNode?: Function,
  /** 异步加载数据 */
  loadData?: Function,
  /** 响应右键点击 */
  onRightClick?: Function,
  /** 设置节点可拖拽（IE>8）*/
  draggable?: boolean;
  /** 开始拖拽时调用 */
  onDragStart?: Function,
  /** dragenter 触发时调用 */
  onDragEnter?: Function,
  /** dragover 触发时调用 */
  onDragOver?: Function,
  /** dragleave 触发时调用 */
  onDragLeave?: Function,
  /** drop 触发时调用 */
  onDrop?: Function,
  prefixCls?: string;
  filterTreeNode?: Function,
  children: React.Node,
  rowData?: Array<RowData>

};

type ExpandInfo = {
  expandedAll: boolean,
  target: Object,
}
type TreeState = {
  expand: ExpandInfo
}

class Tree extends React.Component<TreeProps, TreeState> {

  static defaultProps = {
    prefixCls: 'sv-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
  };

  static TreeNode: TreeNode;

  constructor (props: TreeProps) {
    super(props);
    this.state = {
      expand: this.getExpandInfo(),
    };
  }

  getExpandInfo (): ExpandInfo {
    let array: Array<string> = [];
    const { props, } = this;
    const { expandedKeys = [], defaultExpandedKeys = [], defaultExpandAll, } = props;
    if ('expandedKeys' in props) {
      array = expandedKeys;
    } else if ('defaultExpandedKeys' in props) {
      array = defaultExpandedKeys;
    }
    const target: Object = {};
    array.forEach(key => {
      target[ key ] = true;
    });
    return { target, expandedAll: defaultExpandAll === true, };
  }

  render () {
    const { prefixCls = Tree.defaultProps.prefixCls, className, showLine, checkable, rowData, } = this.props;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    const { children, } = this.props;
    const { expand, } = this.state;
    if (rowData) {
      const nodes = this.slice(rowData, 0, 555555, expand);
      const expandedKeys = this.getKeys(nodes);
      return <RcTree {...this.props} className={classString}
                     expandedKeys={expandedKeys}
                     onExpand={this.onExpand}
                     checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
        {this.loopNode(nodes)}
      </RcTree>;
    }

    return <RcTree {...this.props} className={classString}
                   onExpand={this.onExpand}
                   checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
      {children}
    </RcTree>;

  }

  getKeys (nodes: Array<RowData>): Array<string> {
    const result = [];
    nodes && nodes.forEach((node: RowData) => {
      const { key, } = node;
      result.push(key);
    });
    return result;

  }

  onExpand = (expandedKeys: Array<string>, data: { expanded: boolean, node: Object, }) => {
    const { onExpand, } = this.props;
    const { expanded, node, } = data;
    const { expand, } = this.state;


    const noeKey = node.props.eventKey;

    const { target, expandedAll, } = expand;
    if (expandedAll) {
      if (!expanded) {
        target[ noeKey ] = true;
      } else {
        delete target[ noeKey ];
      }
    } else {
      if (expanded) {
        target[ noeKey ] = true;
      } else {
        delete target[ noeKey ];
      }
    }

    this.setState({ expand: this.state.expand, });
    onExpand && onExpand(expandedKeys, data);
  };


  loopNode = (data: Array<RowData>) => data.map(item => {
    const { children, key, title, } = item;
    if (children !== undefined) {
      return (
        <TreeNode key={key} title={title}>
          {this.loopNode(children)}
        </TreeNode>
      );
    }
    return <TreeNode key={key} title={title}/>;
  });

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

  slice (rowDatas: Array<RowData>, start: number, total: number, expandInfo?: ExpandInfo): Array<RowData> {
    if (rowDatas && rowDatas.length === 0) {
      return [];
    }

    const root = rowDatas[ start ];
    if (!root) {
      console.error('树形数据存在问题');
      return [];
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return this.generateTreeNode(this.sliceExpand(rowDatas, start, total, expandInfo));
    }

    const pathNode = this.getPathNodes(rowDatas, start, root.pid);
    return this.generateTreeNode(this.sliceExpand(rowDatas, start, total, expandInfo, pathNode));
  }

  sliceExpand (rowDatas: Array<RowData>, start: number, total: number, expandInfo?: ExpandInfo, parentNode?: Array<RowData> = []): Array<RowData> {

    if (!expandInfo) {
      return rowDatas.slice(start, start + total);
    }
    const { target, expandedAll, } = expandInfo;

    const result = [];
    let foundRow: number = 0;
    let inCollapseRange: boolean = false;
    let collapsePath: ?string = null;

    const processRow = (needComput: ?boolean = true) => (row: RowData) => {
      const { key, path, } = row;

      if (inCollapseRange) {
        if (!path || collapsePath === null || collapsePath === undefined || !path.startsWith(collapsePath)) {
          inCollapseRange = false;
        }
      }

      if (!inCollapseRange) {
        result.push(row);
        if (needComput) {
          foundRow++;
        }
      }

      const isNotExpanded = expandedAll ? target[ key ] : !target[ key ];

      if (!inCollapseRange && isNotExpanded) {
        inCollapseRange = true;
        collapsePath = key;
        if (path) {
          collapsePath = `${path}/${collapsePath}`;
        }
      }
    };

    parentNode.forEach(processRow(false));
    const processRowForRowDatas = processRow();
    for (let i = start; foundRow < total && i < rowDatas.length; i++) {
      const row = rowDatas[ i ];
      processRowForRowDatas(row);
    }

    return result;
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

}

export default Tree;
Tree.TreeNode = TreeNode;
