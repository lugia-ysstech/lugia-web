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
    const { inlineType, shape } = this.props;
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
      } = this.props;
      const {
        children,
        [valueField]: key,
        [displayField]: title,
        isLeaf,
        describe = false,
        icon,
        suffix,
      } = item;

      const disabled = item[igronSelectField] ? true : false;
      if (children !== undefined) {
        return (
          <TreeNode
            {...getPartOfThemeHocProps('TreeItem')}
            showSwitch={showSwitch}
            suffix={suffix}
            __navmenu={__navmenu}
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
            icon={icon}
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
          icon={icon}
        />
      );
    });
  };
}

export default ThrottleScroller(ScrollerTree, TreeItemHeight, 'TreeWrap', [
  'TreeItem',
  'TreeItemWrap',
]);
