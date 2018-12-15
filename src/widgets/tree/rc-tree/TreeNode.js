import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import toArray from 'rc-util/lib/Children/toArray';
import { contextTypes } from './Tree';
import CommonIcon from '../../icon';
import CheckBox from '../../checkbox';

import Widget from '../../consts';
import Theme from '../../theme';

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
    const { Switcher } = props.themeStyle;

    return (
      <Switcher onClick={props.disabled ? null : this.onExpand} expandedState={expandedState}>
        <CommonIcon iconClass={iconClass} />
      </Switcher>
    );
  }

  renderCheckbox(props) {
    const { checked, halfChecked: indeterminate, notCanSelect: disabled, title } = props;
    const { themeColor } = props.themeStyle;

    const view = {
      [Widget.CheckBox]: { color: themeColor },
    };
    return (
      <Theme config={view}>
        <CheckBox
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={this.onCheck}
        >
          {title}
        </CheckBox>
      </Theme>
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
      const { ChildrenUl } = props.themeStyle;
      newChildren = (
        <Animate
          {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >
          {!props.expanded ? null : (
            <ChildrenUl data-expanded={props.expanded}>
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
    const { TitleWrap, NullSwitcher, Li, TitleSpan } = props.themeStyle;

    const selectHandle = () => {
      const title = <TitleSpan title={content}>{content}</TitleSpan>;
      const domProps = {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onContextMenu: this.onContextMenu,
      };

      if (!props.disabled) {
        domProps.onClick = e => {
          e.preventDefault();

          if (this.isSelectable()) {
            this.onSelect();
          }
        };
        if (props.draggable) {
          domProps.draggable = true;
          domProps['aria-grabbed'] = true;
          domProps.onDragStart = this.onDragStart;
        }
      }

      const { checked, selected, notCanSelect } = this.props;

      return (
        <TitleWrap
          ref={this.saveSelectHandle}
          title={typeof content === 'string' ? content : ''}
          {...domProps}
          checked={checked}
          selected={selected}
          notCanSelect={notCanSelect}
        >
          {title}
        </TitleWrap>
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
      <Li
        unselectable="on"
        {...liProps}
        isLeaf={props.isLeaf}
        selected={props.selected}
        title={props.title}
      >
        {/* 小箭头*/}
        {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : renderNoopSwitcher()}
        {/* 小方格 */}
        {props.checkable ? this.renderCheckbox(props) : null}
        {/* 内容 */}
        {props.checkable ? null : selectHandle()}
        {newChildren}
      </Li>
    );
  }
}

TreeNode.isTreeNode = 1;

export default TreeNode;
