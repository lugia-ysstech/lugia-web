import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import toArray from 'rc-util/lib/Children/toArray';
import { contextTypes } from './Tree';
import CommonIcon from '../../icon';
import styled from 'styled-components';
import CheckBox from '../../checkbox';
import {
  MenuItemHeight,
  mediumGreyColor,
  darkGreyColor,
  ItemBackgroundColor,
  themeColor,
} from '../../css/tree';
import Widget from '../../consts';
import Theme from '../../theme';
import { px2emcss } from '../../css/units';
const em = px2emcss(1.2);

const Li = styled.li`
  min-height: ${em(MenuItemHeight)};
  line-height: ${em(MenuItemHeight)};
  list-style: none;
  white-space: nowrap;
  outline: 0;
  overflow: hidden;
`;
Li.displayName = 'liItem';

const ChildrenUl = styled.ul`
  margin: 0;
  padding: 0 0 0 ${em(18)};
`;

function getChecked(props) {
  if (props.checked) {
    return `color: ${themeColor}`;
  }
  return `color:${darkGreyColor}`;
}

function getCheckedStyled(props) {
  if (props.notCanSelect) {
    return `color: ${mediumGreyColor}`;
  }

  return props.selected ? `background-color: ${ItemBackgroundColor}` : null;
}
const ChildrenTitle = styled.span`
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding-left: ${em(6)};
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  vertical-align: top;
  transition: all 0.5s ease;
  font-size: ${em(14)};
  ${getChecked};
  ${getCheckedStyled};
  &:hover {
    background-color: ${ItemBackgroundColor};
  }
`;

const Switcher = styled.span`
  font-size: ${em(12)};
  color: ${mediumGreyColor};
  display: inline-block;
  margin-left: ${em(10)};
  vertical-align: top;
`;

const NullSwitcher = Switcher.extend`
  opacity: 0;
`;

const Wrap = styled.span`
  display: inline-block;
  z-index: 100;
  width: 18px;
  height: 100%;
  overflow: hidden;
  margin-left: 6px;
`;
Wrap.displayName = 'checkboxWrap';
const defaultTitle = '---';

class TreeNode extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    disableCheckbox: PropTypes.bool,
    expanded: PropTypes.bool,
    isLeaf: PropTypes.bool,
    root: PropTypes.object,
    onSelect: PropTypes.func,
  };

  static contextTypes = contextTypes;

  static defaultProps = {
    title: defaultTitle,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      dragNodeHighlight: false,
    };
  }

  onCheck = e => {
    this.props.root.onCheck(this, e);
  };

  onSelect() {
    this.props.root.onSelect(this);
  }

  onMouseEnter = e => {
    e.preventDefault();
    this.props.root.onMouseEnter(e, this);
  };

  onMouseLeave = e => {
    e.preventDefault();
    this.props.root.onMouseLeave(e, this);
  };

  onContextMenu = e => {
    e.preventDefault();
    this.props.root.onContextMenu(e, this);
  };

  onDragStart = e => {
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: true,
    });
    this.props.root.onDragStart(e, this);
    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {
      // empty
    }
  };

  onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragEnter(e, this);
  };

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragOver(e, this);
  };

  onDragLeave = e => {
    e.stopPropagation();
    this.props.root.onDragLeave(e, this);
  };

  onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false,
    });
    this.props.root.onDrop(e, this);
  };

  onDragEnd = e => {
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false,
    });
    this.props.root.onDragEnd(e, this);
  };

  onExpand = () => {
    const callbackPromise = this.props.root.onExpand(this);
    if (callbackPromise && typeof callbackPromise === 'object') {
      const setLoading = dataLoading => {
        this.setState({ dataLoading });
      };
      setLoading(true);
      callbackPromise.then(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    }
  };

  // keyboard event support
  onKeyDown(e) {
    e.preventDefault();
  }

  isSelectable() {
    const { props, context } = this;
    return 'selectable' in props ? props.selectable : context.rcTree.selectable;
  }

  saveSelectHandle = node => {
    this.selectHandle = node;
  };

  renderSwitcher(props, expandedState) {
    const iconClass =
      expandedState === 'open'
        ? 'lugia-icon-direction_caret_down'
        : 'lugia-icon-direction_caret_right';
    return (
      <Switcher onClick={props.disabled ? null : this.onExpand}>
        <CommonIcon iconClass={iconClass} />
      </Switcher>
    );
  }

  renderCheckbox(props) {
    const { checked, halfChecked: indeterminate, notCanSelect: disabled } = props;
    const view = {
      [Widget.CheckBox]: { color: themeColor },
    };
    return (
      <Wrap onClick={this.onCheck}>
        <Theme config={view}>
          <CheckBox
            checked={checked}
            disabled={disabled}
            indeterminate={indeterminate}
            onClick={this.onCheck}
          />
        </Theme>
      </Wrap>
    );
  }

  renderChildren(props) {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    let transitionAppear = true;
    if (!renderFirst && props.expanded) {
      transitionAppear = false;
    }
    let children = null;
    if (props.children) {
      children = toArray(props.children).filter(item => !!item);
    }
    let newChildren = children;
    if (
      children &&
      ((Array.isArray(children) &&
        children.length &&
        children.every(item => item.type && item.type.isTreeNode)) ||
        (children.type && children.type.isTreeNode))
    ) {
      const animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = { ...props.openAnimation };
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      const cls = classNames(`${props.prefixCls}-child-tree`, {
        [`${props.prefixCls}-child-tree-open`]: props.expanded,
      });
      newChildren = (
        <Animate
          {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >
          {!props.expanded ? null : (
            <ChildrenUl className={cls} data-expanded={props.expanded}>
              {React.Children.map(
                children,
                (item, index) => {
                  return props.root.renderTreeNode(item, index, props.pos);
                },
                props.root
              )}
            </ChildrenUl>
          )}
        </Animate>
      );
    }
    return newChildren;
  }

  render() {
    const { props } = this;
    const prefixCls = props.prefixCls;
    const expandedState = props.expanded ? 'open' : 'close';
    let iconState = expandedState;

    let canRenderSwitcher = true;
    const content = props.title;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      newChildren = null;
      if (props.isLeaf) {
        canRenderSwitcher = false;
        iconState = 'docu';
      }
    }

    const selectHandle = () => {
      const title = <span className={`${prefixCls}-title`}>{content}</span>;
      const wrap = `${prefixCls}-node-content-wrapper`;
      const domProps = {
        className: `${wrap} ${wrap}-${iconState === expandedState ? iconState : 'normal'}`,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onContextMenu: this.onContextMenu,
      };

      if (!props.disabled) {
        if (props.selected || this.state.dragNodeHighlight) {
          domProps.className += ` ${prefixCls}-node-selected`;
        }
        if (props.hightLight || this.state.dragNodeHighlight) {
          domProps.className += ` ${prefixCls}-node-highlight`;
        }
        domProps.onClick = e => {
          e.preventDefault();

          if (this.isSelectable()) {
            this.onSelect();
          }
        };
        if (props.draggable) {
          domProps.className += ' draggable';
          domProps.draggable = true;
          domProps['aria-grabbed'] = true;
          domProps.onDragStart = this.onDragStart;
        }
      }

      const { checked, selected, notCanSelect } = this.props;
      return (
        <ChildrenTitle
          ref={this.saveSelectHandle}
          title={typeof content === 'string' ? content : ''}
          {...domProps}
          checked={checked}
          selected={selected}
          notCanSelect={notCanSelect}
        >
          {title}
        </ChildrenTitle>
      );
    };

    const liProps = {};
    if (props.draggable) {
      liProps.onDragEnter = this.onDragEnter;
      liProps.onDragOver = this.onDragOver;
      liProps.onDragLeave = this.onDragLeave;
      liProps.onDrop = this.onDrop;
      liProps.onDragEnd = this.onDragEnd;
    }

    const renderNoopSwitcher = () => (
      <NullSwitcher>
        <CommonIcon iconClass={'lugia-icon-direction_caret_down'} />
      </NullSwitcher>
    );

    return (
      <Li unselectable="on" {...liProps} isLeaf={props.isLeaf} selected={props.selected}>
        {/* 前边的小箭头和小书籍图标*/}
        {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : renderNoopSwitcher()}
        {/* 小方格 */}
        {props.checkable ? this.renderCheckbox(props) : null}
        {/* 内容 */}
        {selectHandle()}
        {newChildren}
      </Li>
    );
  }
}

TreeNode.isTreeNode = 1;

export default TreeNode;
