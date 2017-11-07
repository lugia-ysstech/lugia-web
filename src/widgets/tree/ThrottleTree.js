/**
 *
 * create by ligx
 *
 * @flow
 */

import type { ExpandInfo, NodeId2ExtendInfo, NodeId2SelectInfo, } from 'sv-widget';
import animation from '../common/openAnimation';
import * as React from 'react';
import RcTree, { TreeNode, } from './rc-tree';
import classNames from 'classnames';
import ThrottleScroller from '../scroller/ThrottleScroller';
import '../css/sv.css';
import './index.css';
import TreeUtils from './utils';
import 'babel-polyfill';

const menuItemHeight = 18;
type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};

class ScrollerTree extends React.Component<any, any> {

  static defaultProps = {
    prefixCls: 'sv-tree',
    multiple: false,
    expandAll: false,
    onlySelectLeaf: false,
    showIcon: false,
    openAnimation: animation,
  };

  utils: TreeUtils;

  constructor (props) {
    super(props);
  }

  render () {
    const {
      prefixCls,
      className,
      showLine,
      multiple,
      data,
      start,
      end,
      onExpand,
      utils,
      onSelect,
      id2ExtendInfo,
    } = this.props;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    if (data) {
      const { rows, parentCount, } = utils.slice(data, start, end - start, id2ExtendInfo);
      const nodes = utils.generateTreeNode(rows);

      const top = -parentCount * 17;
      const treeNodes = this.loopNode(nodes);
      return <RcTree {...this.props}
                     onSelect={onSelect}
                     style={{ position: 'relative', top: `${top}px`, }}
                     className={classString}
                     onExpand={onExpand}
                     checkable={multiple ? <span className={`${prefixCls}-checkbox-inner`}/> : multiple}>
        {treeNodes}
      </RcTree>;
    }


  }


  loopNode = (data: Array<RowData>) => data.map(item => {
    const { children, key, title, isLeaf, } = item;
    const { selectable, } = this.props;
    if (children !== undefined) {
      return (
        <TreeNode key={key} title={title} isLeaf={isLeaf} selectable={selectable}>
          {this.loopNode(children)}
        </TreeNode>
      );
    }
    return <TreeNode key={key} title={title} isLeaf={isLeaf} selectable={selectable}/>;
  });

}

export default ThrottleScroller(ScrollerTree, menuItemHeight);
