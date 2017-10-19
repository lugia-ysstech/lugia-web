/**
 *
 * create by ligx
 *
 * @flow
 */
import animation from '../common/openAnimation';
import * as React from 'react';
import RcTree, { TreeNode, } from './rc-tree';
import classNames from 'classnames';
import ThemeProvider from '../common/ThemeProvider';
import ThrottleScroller from '../scroller/ThrottleScroller';
import * as Widget from '../consts/Widget';
import '../css/sv.css';
import './index.css';
import type { NodeId2ExtendInfo, } from 'sv-widget';
import TreeUtils from './utils';

const defaultHeight = 250;
const menuItemHeight = 18;

type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};
type TreeProps = {
  getTheme: Function,
  start: number,
  end: number,
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
  data?: Array<RowData>,
  setDataLen: Function,
};

type ExpandInfo = {
  target: Object,
  id2ExtendInfo: NodeId2ExtendInfo,
}
type TreeState = {
  expand: ExpandInfo,
  expandedKeys: Array<string>,
}

class KTree extends React.Component<any, any> {

  static defaultProps = {
    prefixCls: 'sv-tree',
    checkable: false,
    defaultExpandAll: false,
    showIcon: false,
    openAnimation: animation,
  };

  utils: TreeUtils;


  render () {
    const {
      prefixCls = Tree.defaultProps.prefixCls,
      className,
      showLine,
      checkable,
      data,
      start,
      end,
      onExpand,
      utils,
      onSelect,
    } = this.props;

    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    if (data) {
      const out = {};
      const { rows, parentCount, }  = utils.slice(data, start, end - start, out);
      const nodes = utils.generateTreeNode(rows);
      const top = parentCount * 17;
      const treeNodes = this.loopNode(nodes);
      return <RcTree {...this.props}
                     onSelect={onSelect}
                     style={{ position: 'absolute', top: `${top}px`, }}
                     className={classString}
                     onExpand={onExpand}
                     checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
        {treeNodes}
      </RcTree>;
    }


  }


  loopNode = (data: Array<RowData>) => data.map(item => {
    const { children, key, title, isLeaf, } = item;
    if (children !== undefined) {
      return (
        <TreeNode key={key} title={title} isLeaf={isLeaf}>
          {this.loopNode(children)}
        </TreeNode>
      );
    }
    return <TreeNode key={key} title={title} isLeaf={isLeaf}/>;
  });

}

const ThrottleTree = ThrottleScroller(KTree, menuItemHeight);

class Tree extends React.Component<TreeProps, TreeState> {

  static displayName = Widget.Tree;
  static defaultProps = {
    prefixCls: 'sv-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
  };

  static TreeNode: TreeNode;
  utils: TreeUtils;

  constructor (props: TreeProps) {
    super(props);
    this.createTreeUtils(props);
    const expand = this.getExpandInfo();
    this.utils.generateRealTreeData(expand);
    const expandedKeys = expand.expandedAll ? Object.keys(expand.id2ExtendInfo) : [];
    this.state = {
      expandedKeys,
      expand,
    };
  }

  getExpandInfo (): ExpandInfo {
    let array: Array<string> = [];
    const { props, } = this;
    const { expandedKeys = [], } = props;
    if ('expandedKeys' in props) {
      array = expandedKeys;
    }
    const target: Object = {};
    array.forEach(key => {
      target[ key ] = true;
    });
    return { target, id2ExtendInfo: {}, };
  }

  shouldComponentUpdate (nexProps: TreeProps, nextState: TreeState) {
    const dataChanged = nexProps.data !== this.props.data;
    if (dataChanged) {
      this.createTreeUtils(nexProps);
    }
    const needUpdate = dataChanged
      || nextState.expand !== this.state.expand;
    return needUpdate;
  }

  createTreeUtils (props: TreeProps) {
    const { data, defaultExpandAll = false, } = props;
    if (data) {
      this.utils = new TreeUtils(data, defaultExpandAll);
    }
  }

  realyDatas: Array<RowData>;

  render () {
    const {
      prefixCls = Tree.defaultProps.prefixCls,
      className,
      showLine,
      checkable,
      data,
    } = this.props;

    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    const { children, } = this.props;
    const { expand, expandedKeys, } = this.state;
    if (data) {
      this.realyDatas = this.utils.generateRealTreeData(expand);
      return <ThrottleTree {...this.props}
                           onCheck={this.onCheck}
                           data={this.realyDatas}
                           showLine={showLine}
                           mutliple={checkable}
                           utils={this.utils}
                           expandedKeys={expandedKeys}
                           onExpand={this.onExpand}></ThrottleTree>;
    }

    return <RcTree {...this.props} className={classString}
                   onExpand={this.onExpand}
                   checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
      {children}
    </RcTree>;

  }

  onCheck = (_, event) => {
    console.info('onselect');
    const { node, checked, } = event;
    const { props, } = node;
    const { eventKey, } = props;
    console.info(props, checked);
  };


  onExpand = (expandedKeys: Array<string>, rowData: { expanded: boolean, node: Object, }) => {
    const { onExpand, data = [], defaultExpandAll, } = this.props;
    const { expanded, node, } = rowData;
    const { expand, } = this.state;


    const noeKey = node.props.eventKey;

    const { target, id2ExtendInfo, } = expand;
    if (expanded) {
      this.utils.expandNode(noeKey, data, id2ExtendInfo);
    } else {
      this.utils.colapseNode(noeKey, data, id2ExtendInfo);
    }
    if (defaultExpandAll) {
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
    this.setState({ expand: Object.assign({}, this.state.expand, { target, id2ExtendInfo, }), expandedKeys, });
    onExpand && onExpand(expandedKeys, data);
  };


  loopNode = (data: Array<RowData>) => data.map(item => {
    const { children, key, title, isLeaf, } = item;
    if (children !== undefined) {
      return (
        <TreeNode key={key} title={title} isLeaf={isLeaf}>
          {this.loopNode(children)}
        </TreeNode>
      );
    }
    return <TreeNode key={key} title={title} isLeaf={isLeaf}/>;
  });
}

const SvTree = ThemeProvider(Tree, Widget.Tree);

export default SvTree;
Tree.TreeNode = TreeNode;
