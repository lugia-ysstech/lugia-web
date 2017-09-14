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

class Tree extends React.Component<TreeProps> {

  static defaultProps = {
    prefixCls: 'sv-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
  };

  static TreeNode: TreeNode;

  render () {
    const { prefixCls = Tree.defaultProps.prefixCls, className, showLine, checkable, rowData, } = this.props;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    const { children, } = this.props;

    if (rowData) {
      const nodes = this.generateTreeNode(rowData);
      return <RcTree {...this.props} className={classString}
                     checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
        {this.loopNode(nodes)}
      </RcTree>;
    }

    return <RcTree {...this.props} className={classString}
                   checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
      {children}
    </RcTree>;

  }

  loopNode = (data: Array<RowData>) => data.map(item => {
    const { children, key, title, } = item;
    if (children != undefined) {
      return (
        <TreeNode key={key} title={title}>
          {this.loopNode(children)}
        </TreeNode>
      );
    }
    return <TreeNode key={key} title={title}/>;
  });

  generateTreeNode (rowData: Array<RowData>) {
    const result = [];
    if (rowData) {
      const node = {};
      rowData.forEach(row => {
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
}

export default Tree;
Tree.TreeNode = TreeNode;
