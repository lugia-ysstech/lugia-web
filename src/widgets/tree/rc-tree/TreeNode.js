import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import toArray from 'rc-util/lib/Children/toArray';
import { contextTypes } from './Tree';
import CommonIcon from '../../icon';
import CheckBox from '../../checkbox';
import Widget from '../../consts';
import ThemeHoc from '@lugia/theme-hoc';
import { getMenuItemHeight, TextIcon } from '../../css/menu';
import {
  FlexBox,
  FlexWrap,
  SubTreeWrap,
  TitleWrap,
  Switch,
  NullSwitch,
  TitleSpan,
  Li,
  NavLi,
} from '../../css/tree';

const defaultTitle = '---';
const openClassName = 'lugia-icon-direction_caret_down';
const closeClassName = 'lugia-icon-direction_caret_right';

const navOpenClassName = 'lugia-icon-direction_up';
const navCloseClassName = 'lugia-icon-direction_down';
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

  renderSwitch(expandedState) {
    const { describe, mutliple, switcher = true, disabled, __navmenu } = this.props;
    console.log('__navmenu 11', __navmenu);
    if (describe) {
      return (
        <NullSwitch themeProps={this.props.getPartOfThemeProps('Switch')}>
          <CommonIcon iconClass={'lugia-icon-financial_omit'} />
        </NullSwitch>
      );
    }
    if (mutliple || !describe || __navmenu) {
      let iconClass;
      if (__navmenu) {
        iconClass = expandedState === 'open' ? navOpenClassName : navCloseClassName;
      } else {
        iconClass = expandedState === 'open' ? openClassName : closeClassName;
      }
      return (
        <Switch
          mutliple={mutliple}
          disabled={disabled}
          onClick={this.onExpand}
          expandedState={expandedState}
          themeProps={this.props.getPartOfThemeProps('Switch')}
        >
          <CommonIcon iconClass={iconClass} />
        </Switch>
      );
    }

    return (
      <NullSwitch themeProps={this.props.getPartOfThemeProps('Switch')}>
        <CommonIcon iconClass={'lugia-icon-financial_omit'} />
      </NullSwitch>
    );
  }

  renderCheckbox() {
    const {
      checked,
      halfChecked: indeterminate,
      notCanSelect,
      title,
      disabled: dataDisabled,
      icon,
      mutliple,
      itemHeight,
    } = this.props;
    const disabled = notCanSelect || dataDisabled;
    return (
      <TitleWrap
        disabled
        themeProps={this.getThemeProps('Text', 'SelectedText', { mutliple, itemHeight })}
      >
        {icon ? <CommonIcon iconClass={icon} /> : null}
        <CheckBox
          theme={this.getCheckBoxTheme()}
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={this.onCheck}
        >
          {title}
        </CheckBox>
      </TitleWrap>
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
        children.every(item => item.type && item.type.__OrginalWidget__.isTreeNode)) ||
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

      const { inlineType, getPartOfThemeProps } = this.props;
      newChildren = (
        <Animate
          {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >
          {!props.expanded ? null : (
            <SubTreeWrap
              themeProps={getPartOfThemeProps('SubTreeWrap')}
              data-expanded={props.expanded}
              propsConfig={{ expanded: props.expanded }}
              inlineType={inlineType}
            >
              {React.Children.map(
                children,
                (item, index) => {
                  return props.root.renderTreeNode(item, index, props.pos);
                },
                props.root
              )}
            </SubTreeWrap>
          )}
        </Animate>
      );
    }
    return newChildren;
  }

  renderSuffix(suffix: Object) {
    return <Switch themeProps={this.props.getPartOfThemeProps('Switch')}>{suffix}</Switch>;
  }

  isChecked() {
    const { mutliple, checked, selected } = this.props;
    return mutliple ? checked : selected;
  }

  getThemeProps(defaultName: string, selectedName: string, params: Object = {}): Object {
    const { getPartOfThemeProps } = this.props;
    return this.isChecked()
      ? getPartOfThemeProps(selectedName, { props: params })
      : getPartOfThemeProps(defaultName, { props: params });
  }

  render() {
    const { props } = this;
    const {
      checked,
      selected,
      notCanSelect,
      disabled: dataDisabled,
      inlineType,
      pos,
      describe = false,
      icon,
      size,
      color,
      isLeaf,
      title,
      shape,
      mutliple,
      itemHeight,
      showSwitch,
      __navmenu,
    } = this.props;
    const expandedState = props.expanded ? 'open' : 'close';
    let iconState = expandedState;
    const disabled = notCanSelect || dataDisabled;

    let canRenderSwitch = true;
    const content = props.title;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      newChildren = null;
      if (isLeaf) {
        canRenderSwitch = false;
        iconState = 'docu';
      }
    }

    const TextThemeProps = this.getThemeProps('Text', 'SelectedText', {
      pos,
      mutliple,
      shape,
      selected,
      describe,
    });
    const selectHandle = () => {
      const title = (
        <TitleSpan
          themeProps={TextThemeProps}
          color={color}
          pos={pos}
          selected={selected}
          inlineType={inlineType}
          title={content}
          height={itemHeight}
        >
          {icon ? <TextIcon iconClass={icon} /> : null}
          {content}
        </TitleSpan>
      );
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
            if (!props.describe) {
              this.onExpand();
            }
          }
        };
        if (props.draggable) {
          domProps.draggable = true;
          domProps['aria-grabbed'] = true;
          domProps.onDragStart = this.onDragStart;
        }
      }

      return (
        <TitleWrap
          themeProps={TextThemeProps}
          ref={this.saveSelectHandle}
          title={typeof content === 'string' ? content : ''}
          {...domProps}
          pos={props.pos}
          inlineType={inlineType}
          shape={shape}
          checked={checked}
          selected={selected}
          describe={describe}
          disabled={disabled}
          notCanSelect={disabled}
          color={color}
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

    const renderNoopSwitch = () => {
      const { mutliple, showSwitch } = this.props;
      return (
        <NullSwitch themeProps={this.props.getPartOfThemeProps('Switch')}>
          <CommonIcon iconClass={'lugia-icon-financial_omit'} />
        </NullSwitch>
      );
    };
    const TreeItemWrapThemeProps = this.getThemeProps('TreeItemWrap', 'SelectedTreeItemWrap', {
      pos,
      itemHeight,
      inlineType,
      selected,
    });

    if (this.isChecked()) {
      const { themeConfig } = TreeItemWrapThemeProps;
      const { normal = {} } = themeConfig;
      if (normal.height) {
        delete normal.height;
      }
    }
    const ItemWrap = __navmenu ? NavLi : Li;
    return (
      <ItemWrap
        themeProps={TreeItemWrapThemeProps}
        unselectable="on"
        inlineType={inlineType}
        {...liProps}
        pos={pos}
        isLeaf={isLeaf}
        selected={selected}
        title={title}
        color={color}
        height={itemHeight}
      >
        <FlexWrap themeProps={TreeItemWrapThemeProps}>
          <FlexBox themeProps={TreeItemWrapThemeProps}>
            {(!showSwitch && !mutliple) || __navmenu
              ? null
              : canRenderSwitch
              ? this.renderSwitch(expandedState)
              : renderNoopSwitch()}
            {props.checkable ? this.renderCheckbox() : null}
            {props.checkable ? null : selectHandle()}
            {/* {props.suffix ? this.renderSuffix(props.suffix) : null} */}
            {!__navmenu
              ? null
              : canRenderSwitch
              ? this.renderSwitch(expandedState)
              : renderNoopSwitch()}
          </FlexBox>
        </FlexWrap>
        {newChildren}
      </ItemWrap>
    );
  }

  getCheckBoxTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const config = {
      [Widget.Checkbox]: getPartOfThemeConfig('Checkbox'),
    };
    return config;
  };
}

TreeNode.isTreeNode = 1;

export default ThemeHoc(TreeNode, 'TreeItem', { hover: true });
