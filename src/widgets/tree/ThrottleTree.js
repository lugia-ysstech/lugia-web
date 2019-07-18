/**
 *
 * create by ligx
 *
 * @flow
 */

import animation from '../common/openAnimation';
import * as React from 'react';
import Widget from '../consts/index';
import RcTree, { TreeNode } from './rc-tree';
import ThrottleScroller from '../scroller/ThrottleScroller';
import './index.css';
import TreeUtils from './utils';
import { adjustValue } from '../utils';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
import { getMenuItemHeight } from '../css/menu';
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
    const { data, size } = this.props;

    if (data) {
      const { mutliple, onExpand, utils, onSelect, id2ExtendInfo } = this.props;
      let { start, end } = this.props;
      start = Math.round(start);
      end = Math.round(end);
      const hasScroller = data.length > end;
      const { rows, parentCount } = utils.slice(data, start, end - start, id2ExtendInfo);
      const nodes = utils.generateTreeNode(rows);
      const itemHeight = getMenuItemHeight(size);
      console.log('itemHeight', itemHeight);
      // 显示不全最后一项++++++++++++++++++++++++++++++++++++++++++++++++++++++++，
      const top = -parentCount * 35;
      // console.log('offsetTop', top);
      const treeNodes = this.loopNode(nodes);
      const treeTheme = this.getTheme();
      if (hasScroller) {
        if (treeTheme.width) {
          treeTheme.width = treeTheme.width;
        }
      }
      return (
        <RcTree
          {...this.props}
          onSelect={onSelect}
          top={top}
          onExpand={onExpand}
          checkable={mutliple ? <span /> : mutliple}
        >
          {treeNodes}
        </RcTree>
      );
    }
    return null;
  }

  getTheme() {
    const { getTheme, themeStyle } = this.props;
    const { DefaultHeight, MenuItemHeight } = themeStyle;
    const theme = getTheme();

    const { height = DefaultHeight } = theme;
    theme.height = adjustValue(height, MenuItemHeight);
    return theme;
  }

  loopNode = (data: Array<RowData>) => {
    const { igronSelectField, themeStyle, inlineType, size, shape, ...res } = this.props;
    return data.map(item => {
      const { selectable, displayField, valueField, mutliple, getPartOfThemeHocProps } = this.props;
      const {
        children,
        [valueField]: key,
        [displayField]: title,
        isLeaf,
        describe = false,
        disabled,
        icon,
        switcher,
      } = item;
      const { color, paddingLeft } = this.getTheme();
      console.log('themeProps', getPartOfThemeHocProps('TreeItem'));
      const notCanSelect = item[igronSelectField] ? true : false;
      if (children !== undefined) {
        return (
          <TreeNode
            {...getPartOfThemeHocProps('TreeItem')}
            themeStyle={themeStyle}
            key={key}
            inlineType={inlineType}
            shape={shape}
            title={title}
            mutliple={mutliple}
            isLeaf={isLeaf}
            describe={describe}
            disabled={disabled}
            selectable={selectable}
            notCanSelect={notCanSelect}
            icon={icon}
            size={size}
            color={color}
            paddingLeft={paddingLeft}
          >
            {this.loopNode(children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...getPartOfThemeHocProps('TreeItem')}
          themeStyle={themeStyle}
          key={key}
          title={title}
          inlineType={inlineType}
          mutliple={mutliple}
          shape={shape}
          isLeaf={isLeaf}
          notCanSelect={notCanSelect}
          disabled={disabled}
          selectable={selectable}
          icon={icon}
          size={size}
          color={color}
          paddingLeft={paddingLeft}
        />
      );
    });
  };
}

export default ThrottleScroller(ScrollerTree, TreeItemHeight, 'TreeWrap', [
  'TreeItem',
  'TreeItemWrap',
]);
