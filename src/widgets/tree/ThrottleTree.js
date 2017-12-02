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
import styled from 'styled-components';

const menuItemHeight = 18;
type RowData = { [key: string]: any };

const getTop = props => props.top;
const getWidth = props => {
  const { theme = {}, } = props;
  const { width, } = theme;

  return width ? `width:${props.theme.width}px;` : 'width: 100%';
};
const WrapRcTree = styled(RcTree)`
  position: relative;
  top: ${getTop}px;
  ${getWidth}
`;

class ScrollerTree extends React.Component<any, any> {

  static defaultProps = {
    prefixCls: 'sv-tree',
    mutliple: false,
    displayField: 'title',
    expandAll: false,
    onlySelectLeaf: false,
    showIcon: false,
    openAnimation: animation,
  };

  utils: TreeUtils;

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate (nexProps: Object, nextState: Object) {

    const endChange = nexProps.end != this.props.end;
    if (endChange) {
      this.onScrollerEndChange(nexProps.end);
    }
    const canSeeCountChange = nexProps.canSeeCount != this.props.canSeeCount;
    if (canSeeCountChange) {
      this.onCanSeeCountChange(nexProps.canSeeCount);
    }
    return nexProps.mutliple !== this.props.mutliple ||
      nexProps.utils != this.props.utils ||
      nexProps.onSelect != this.props.onSelect ||
      nexProps.getTheme() != this.props.getTheme() ||
      nexProps.id2ExtendInfo != this.props.id2ExtendInfo ||
      nexProps.start != this.props.start ||
      endChange;
  }

  componentDidMount () {
    this.onScrollerEndChange(this.props.end);
    this.onCanSeeCountChange(this.props.canSeeCount);
  }

  onScrollerEndChange = (end: number) => {
    const { onScrollerEndChange, } = this.props;
    onScrollerEndChange && onScrollerEndChange(end);
  };
  onCanSeeCountChange = (end: number) => {
    const { onCanSeeCountChange, } = this.props;
    onCanSeeCountChange && onCanSeeCountChange(end);
  };

  render () {
    const {
      prefixCls,
      className,
      data,
    } = this.props;

    const classString = classNames(
      `${prefixCls}-show-line`, className);
    if (data) {
      const {
        mutliple,
        end,
        onExpand,
        utils,
        onSelect,
        getTheme,
        id2ExtendInfo,
      } = this.props;
      let { start, } = this.props;
      start = Math.ceil(start);
      console.info('rc',this.props.selectedKeys);
      const { rows, parentCount, } = utils.slice(data, start, end - start, id2ExtendInfo);
      const nodes = utils.generateTreeNode(rows);
      const top = -parentCount * 17;
      const treeNodes = this.loopNode(nodes);
      return <WrapRcTree {...this.props}
                         onSelect={onSelect}
                         top={top}
                         theme={getTheme()}
                         className={classString}
                         onExpand={onExpand}
                         checkable={mutliple ? <span className={`${prefixCls}-checkbox-inner`}/> : mutliple}>
        {treeNodes}
      </WrapRcTree>;
    }


  }


  loopNode = (data: Array<RowData>) => data.map(item => {

    const { selectable, displayField, } = this.props;
    const { children, key, [displayField]: title, isLeaf, } = item;
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
