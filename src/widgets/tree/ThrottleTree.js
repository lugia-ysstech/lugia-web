/**
 *
 * create by szfeng
 *
 * @flow
 */

import animation from '../common/openAnimation';
import * as React from 'react';
import LugiaTree, { TreeNode } from './rc-tree';
import ThrottleScroller from '../scroller/ThrottleScroller';
import './index.css';
import TreeUtils from './utils';
import { TreeItemHeight } from '../css/tree';

type RowData = { [key: string]: any };

class ScrollerTree extends React.Component<any, any> {
  static defaultProps = {
    mutliple: false,
    displayField: 'title',
    expandAll: false,
    onlySelectLeaf: false,
    showIcon: false,
    openAnimation: animation,
  };

  utils: TreeUtils;

  shouldComponentUpdate(nexProps: Object, nextState: Object) {
    const endChange = nexProps.end != this.props.end;
    if (endChange) {
      this.onScrollerEndChange(nexProps.end);
    }
    const canSeeCountChange = nexProps.canSeeCount != this.props.canSeeCount;
    if (canSeeCountChange) {
      this.onCanSeeCountChange(nexProps.canSeeCount);
    }
    return (
      nexProps.mutliple !== this.props.mutliple ||
      nexProps.utils != this.props.utils ||
      nexProps.onSelect != this.props.onSelect ||
      nexProps.getTheme() != this.props.getTheme() ||
      nexProps.id2ExtendInfo != this.props.id2ExtendInfo ||
      nexProps.start != this.props.start ||
      endChange
    );
  }

  componentDidMount() {
    this.onScrollerEndChange(this.props.end);
    this.onCanSeeCountChange(this.props.canSeeCount);
  }

  onScrollerEndChange = (end: number) => {
    const { onScrollerEndChange } = this.props;
    onScrollerEndChange && onScrollerEndChange(end);
  };
  onCanSeeCountChange = (end: number) => {
    const { onCanSeeCountChange } = this.props;
    onCanSeeCountChange && onCanSeeCountChange(end);
  };

  render() {
    const { data } = this.props;
    if (data) {
      const { mutliple, onExpand, utils, onSelect, id2ExtendInfo, itemHeight } = this.props;
      let { start, end } = this.props;
      start = Math.round(start);
      end = Math.round(end);
      const hasScroller = data.length > end;
      const { rows, parentCount } = utils.slice(data, start, end - start, id2ExtendInfo);
      const nodes = utils.generateTreeNode(rows);
      const top = -parentCount * itemHeight;
      const treeNodes = this.loopNode(nodes);
      const treeTheme = this.getTheme();
      if (hasScroller) {
        if (treeTheme.width) {
          treeTheme.width = treeTheme.width;
        }
      }
      return (
        <LugiaTree
          {...this.props}
          onSelect={onSelect}
          top={top}
          onExpand={onExpand}
          checkable={mutliple ? <span /> : mutliple}
        >
          {treeNodes}
        </LugiaTree>
      );
    }
    return null;
  }

  getTheme() {
    const { getTheme } = this.props;
    const theme = getTheme();

    return theme;
  }

  loopNode = (data: Array<RowData>) => {
    const { inlineType, shape, id2ExtendInfo, translateTreeData, draggable } = this.props;
    return data.map(item => {
      const {
        selectable,
        displayField,
        valueField,
        mutliple,
        itemHeight,
        getPartOfThemeHocProps,
        showSwitch,
        __navmenu,
        renderSuffix,
        onRightClick,
        switchIconNames,
        igronSelectField,
        onlySelectLeaf,
        switchAtEnd,
      } = this.props;

      const {
        children,
        [valueField]: key,
        [displayField]: title,
        isLeaf,
        describe = false,
        icon,
        icons,
        suffix,
        value,
        pid,
      } = item;
      if (draggable) {
        const currentNodeIndex = id2ExtendInfo[value].index;
        const parentIndex = id2ExtendInfo[pid] ? id2ExtendInfo[pid].index : null;
        const maxIndex = Number(id2ExtendInfo.lugia_tree_root.canTotal - 1);
        let preNodeIndex = Number(currentNodeIndex - 1);
        preNodeIndex = currentNodeIndex === 0 ? null : preNodeIndex;
        let nextNodeIndex = Number(currentNodeIndex + 1);
        nextNodeIndex = currentNodeIndex === maxIndex ? null : nextNodeIndex;
        item.currentNodeIndex = currentNodeIndex;
        item.preNodeIndex = preNodeIndex;
        item.nextNodeIndex = nextNodeIndex;
        item.parentIndex = parentIndex;
      }
      const disabled = item[igronSelectField] ? true : false;
      if (children !== undefined) {
        return (
          <TreeNode
            {...getPartOfThemeHocProps('TreeItem')}
            showSwitch={showSwitch}
            suffix={suffix}
            __navmenu={__navmenu}
            switchAtEnd={switchAtEnd}
            renderSuffix={renderSuffix}
            onRightClick={onRightClick}
            switchIconNames={switchIconNames}
            key={key}
            item={item}
            itemHeight={itemHeight}
            inlineType={inlineType}
            shape={shape}
            title={title}
            mutliple={mutliple}
            isLeaf={isLeaf}
            describe={describe}
            disabled={disabled}
            selectable={selectable}
            onlySelectLeaf={onlySelectLeaf}
            translateTreeData={translateTreeData}
            icon={icon}
            icons={icons}
          >
            {this.loopNode(children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...getPartOfThemeHocProps('TreeItem')}
          showSwitch={showSwitch}
          suffix={suffix}
          __navmenu={__navmenu}
          switchAtEnd={switchAtEnd}
          renderSuffix={renderSuffix}
          onRightClick={onRightClick}
          switchIconNames={switchIconNames}
          key={key}
          title={title}
          item={item}
          itemHeight={itemHeight}
          inlineType={inlineType}
          mutliple={mutliple}
          shape={shape}
          isLeaf={isLeaf}
          disabled={disabled}
          selectable={selectable}
          onlySelectLeaf={onlySelectLeaf}
          translateTreeData={translateTreeData}
          icon={icon}
        />
      );
    });
  };
}

export default ThrottleScroller(ScrollerTree, TreeItemHeight, 'Container', [
  'TreeItem',
  'TreeItemWrap',
]);
