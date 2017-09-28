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
import Utils from './utils';
import '../css/sv.css';
import './index.css';

type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};
type TreeProps = {
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
  data?: Array<RowData>

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
    const { expandedKeys = [], defaultExpandAll, } = props;
    if ('expandedKeys' in props) {
      array = expandedKeys;
    }
    const target: Object = {};
    array.forEach(key => {
      target[ key ] = true;
    });
    return { target, expandedAll: defaultExpandAll === true, };
  }

  render () {
    const { prefixCls = Tree.defaultProps.prefixCls, className, showLine, checkable, data, start, end,} = this.props;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    const { children, } = this.props;
    const { expand, } = this.state;
    if (data) {
      const nodes = Utils.slice(data, start, end - start, expand);
      return <RcTree {...this.props} className={classString}
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

export default ThemeProvider(ThrottleScroller(Tree, 21), Widget.Tree);
Tree.TreeNode = TreeNode;
