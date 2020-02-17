import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import toArray from 'rc-util/lib/Children/toArray';
import { contextTypes } from './Tree';
import Icon from '../../icon';
import CheckBox from '../../checkbox';
import { deepMerge } from '@lugia/object-utils';
import ThemeHoc from '@lugia/theme-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';

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
  SuffixWrap,
  CheckboxContainer,
  spiritColor,
} from '../../css/tree';
import { mediumGreyColor, themeColor, lightGreyColor } from '../../css/stateColor';

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
    const { item } = this.props;
    e.preventDefault();
    this.props.root.onContextMenu(e, this, item);
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
    const { describe, mutliple, disabled, __navmenu, switchIconNames } = this.props;
    const { viewClass, theme } = this.getSwitchIconTheme(expandedState);

    if (describe) {
      return (
        <NullSwitch>
          <Icon
            viewClass={viewClass}
            theme={theme}
            singleTheme
            iconClass={'lugia-icon-financial_omit'}
          />
        </NullSwitch>
      );
    }
    if (mutliple || !describe || __navmenu) {
      const { open, close } = switchIconNames;
      const iconClass = expandedState === 'open' ? open : close;
      return (
        <Switch disabled={disabled} onClick={this.onExpand}>
          <Icon
            viewClass={viewClass}
            theme={theme}
            disabled={disabled}
            singleTheme
            iconClass={iconClass}
          />
        </Switch>
      );
    }

    return (
      <NullSwitch>
        <Icon
          viewClass={viewClass}
          theme={theme}
          singleTheme
          iconClass={'lugia-icon-financial_omit'}
        />
      </NullSwitch>
    );
  }

  renderCheckbox() {
    const {
      checked,
      halfChecked: indeterminate,
      title,
      disabled,
      mutliple,
      itemHeight,
    } = this.props;

    return (
      <TitleWrap
        disabled={disabled}
        themeProps={this.getTitleWrapThemeProps('Text', 'SelectedText', { mutliple, itemHeight })}
      >
        <CheckboxContainer>
          {this.getPreIcon()}
          <CheckBox
            {...this.getCheckBoxTheme()}
            checked={checked}
            disabled={disabled}
            indeterminate={indeterminate}
            onChange={this.onCheck}
          >
            {title}
          </CheckBox>
          {this.getSuffixIcon()}
        </CheckboxContainer>
      </TitleWrap>
    );
  }

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    const treeTheme = {
      viewClass,
      theme: themeHoc,
    };
    return treeTheme;
  };

  getCheckBoxTheme() {
    const defaultTheme = this.getCheckboxTextDefaultTheme();
    return this.mergeTheme('Checkbox', defaultTheme);
  }

  getCheckboxTextDefaultTheme() {
    const {
      themeConfig: {
        normal: { color: normalColor = mediumGreyColor, font: { size: normalSize = 13 } = {} } = {},
        hover: { color: hoverColor = themeColor, font: { size: hoverSize = normalSize } = {} } = {},
        disabled: { color: disabledColor, font: { size: disabledSize = normalSize } = {} } = {},
      } = {},
    } = this.getTitleWrapThemeProps('Text', 'SelectedText', {});

    return {
      CheckboxText: {
        normal: {
          color: normalColor,
          font: { size: normalSize, fontWeight: 500 },
        },
        hover: {
          color: hoverColor,
          font: { size: hoverSize, fontWeight: 500 },
        },
        disabled: {
          color: disabledColor,
          font: { size: disabledSize, fontWeight: 500 },
        },
      },
    };
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

      newChildren = (
        <Animate
          {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >
          {!props.expanded ? null : (
            <SubTreeWrap
              themeProps={this.props.getPartOfThemeProps('SubTreeWrap')}
              data-expanded={props.expanded}
              propsConfig={{ expanded: props.expanded }}
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

  isChecked() {
    const { mutliple, checked, selected } = this.props;
    return mutliple ? checked : selected;
  }

  getSelectedTitleWrapThemeProps(target: string, params: Object) {
    const { expanded, isLeaf } = this.props;
    const themeProps = this.props.getPartOfThemeProps(target, params);
    const { themeConfig = {} } = themeProps;
    const { normal = {} } = themeConfig;
    if (expanded && !isLeaf) {
      const { normal: TextExpanded = {} } = this.props.getPartOfThemeProps('TextExpanded');
      themeConfig.normal = deepMerge(
        deepMerge(this.getDefaultTitleWrapTheme('normal', params.props), normal),
        TextExpanded
      );
    } else {
      themeConfig.normal = deepMerge(this.getDefaultTitleWrapTheme('normal', params.props), normal);
    }
    return themeProps;
  }

  getDefaultTitleWrapThemeProps(target: string, params: Object) {
    const { expanded, isLeaf } = this.props;
    const themeProps = this.props.getPartOfThemeProps(target, params);
    const { themeConfig = {} } = themeProps;

    const { hover = {}, normal = {} } = themeConfig;

    if (expanded && !isLeaf) {
      const { themeConfig: { normal: TextExpanded = {} } = {} } = this.props.getPartOfThemeProps(
        'TextExpanded'
      );
      themeConfig.normal = deepMerge(normal, TextExpanded);
    }
    themeConfig.hover = deepMerge(this.getDefaultTitleWrapTheme('hover', params.props), hover);
    return themeProps;
  }

  getDefaultTitleWrapTheme(state: string, props: Object) {
    const { mutliple, __navmenu } = props;

    return __navmenu || mutliple === true
      ? {}
      : state === 'hover'
      ? {
          background: {
            color: spiritColor,
          },
        }
      : {
          background: {
            color: 'rgba(77,99,255,0.2)',
          },
        };
  }

  getTitleWrapThemeProps(defaultName: string, selectedName: string, params: Object = {}): Object {
    const { parentIsHighlight } = this.props;

    return this.isChecked() || parentIsHighlight
      ? this.getSelectedTitleWrapThemeProps(selectedName, { props: params })
      : this.getDefaultTitleWrapThemeProps(defaultName, { props: params });
  }

  getThemeProps(defaultName: string, selectedName: string, params: Object = {}): Object {
    const { getPartOfThemeProps, parentIsHighlight } = this.props;

    return this.isChecked() || parentIsHighlight
      ? getPartOfThemeProps(selectedName, { props: params })
      : getPartOfThemeProps(defaultName, { props: params });
  }

  getPreIcon() {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { prefixIconClass, prefixIconSrc } = icons;
    const iconClass = prefixIconClass ? prefixIconClass : icon;

    if (!iconClass && !prefixIconSrc) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('PrefixIcon');

    return (
      <Icon
        iconClass={iconClass}
        src={prefixIconSrc}
        disabled={disabled}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSuffixIcon() {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { suffixIconClass, suffixIconSrc } = icons;
    if (!suffixIconClass && !suffixIconSrc) {
      return null;
    }

    const { viewClass, theme } = this.getIconTheme('SuffixIcon');

    return (
      <Icon
        iconClass={suffixIconClass}
        src={suffixIconSrc}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        disabled={disabled}
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSwitchIconTheme = (expandedState: string) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('SwitchIcon');

    const {
      viewClass: expandedViewClass,
      theme: expandedTheme,
    } = this.props.getPartOfThemeHocProps('SwitchIconExpanded');
    const defaultTheme = {
      normal: {
        margin: {
          left: 3,
          right: 3,
        },
      },
    };

    if (expandedState === 'open') {
      return {
        viewClass,
        theme: deepMerge(
          deepMerge(
            {
              [viewClass]: { ...defaultTheme },
            },
            theme
          ),
          {
            [viewClass]: { ...expandedTheme[expandedViewClass] },
          }
        ),
      };
    }

    return {
      viewClass,
      theme: deepMerge({ [viewClass]: { ...defaultTheme } }, theme),
    };
  };

  getIconTheme = (iconType: string) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(iconType);
    const marginLeft = iconType === 'SuffixIcon' ? 3 : 0;
    const marginRight = iconType === 'PrefixIcon' ? 3 : 0;
    const defaultTheme = {
      normal: {
        margin: {
          left: marginLeft,
          right: marginRight,
        },
      },
    };

    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...defaultTheme },
        },
        theme
      ),
    };
  };

  setNodeDragState = dragState => {
    this.setState({ dragState });
  };

  componentDidMount() {
    const { eventKey: nodeName, draggable, treeDrag } = this.props;
    const { listener: treeListener } = treeDrag;
    if (!this.selectHandle || !draggable) return;
    treeDrag.collectNodeInformation({ nodeName, nodeRef: this.selectHandle, node: this });
    this.unSetNodeDragStateListener = treeListener.on(
      `${nodeName}-setDrageState`,
      this.setNodeDragState
    );
  }

  componentWillUnmount() {
    const { eventKey: nodeName, treeDrag, draggable } = this.props;
    if (!draggable) return;
    const { unSetNodeDragStateListener = {} } = this;
    treeDrag.deletetNodeInformation(nodeName);
    const { removeListener: removeSetNodeDragStateListener } = unSetNodeDragStateListener;
    removeSetNodeDragStateListener && removeSetNodeDragStateListener();
  }

  getRenderSuffixItems = (itemObj: Object) => {
    const { renderSuffixItems } = this.props;
    const items = renderSuffixItems(itemObj);
    const suffixItems = React.Children.map(items, item => {
      const { props } = item;
      return React.cloneElement(item, {
        ...props,
        ...this.props.dispatchEvent([['hover'], ['active']], 'f2c'),
      });
    });
    return <SuffixWrap>{suffixItems}</SuffixWrap>;
  };

  render() {
    const { props } = this;
    const {
      checked,
      selected,
      parentIsHighlight,
      disabled,
      inlineType,
      pos,
      describe = false,
      color,
      isLeaf,
      title,
      item,
      shape,
      mutliple,
      itemHeight,
      showSwitch,
      __navmenu,
      expanded,
      onlySelectLeaf,
      switchAtEnd,
      renderSuffixItems,
      eventKey,
    } = props;
    const { dragState } = this.state;
    const expandedState = expanded ? 'open' : 'close';
    let canRenderSwitch = true;
    const content = props.title;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      newChildren = null;
      if (isLeaf) {
        canRenderSwitch = false;
      }
    }

    const TextThemeProps = this.getTitleWrapThemeProps('Text', 'SelectedText', {
      pos,
      mutliple,
      shape,
      selected: selected || parentIsHighlight,
      describe,
      inlineType,
      __navmenu,
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
          {this.getPreIcon()}
          {content}
          {this.getSuffixIcon()}
        </TitleSpan>
      );
      const domProps = {
        // onMouseEnter: this.onMouseEnter,
        // onMouseLeave: this.onMouseLeave,
        onContextMenu: this.onContextMenu,
      };

      if (!props.disabled) {
        domProps.onClick = e => {
          e.preventDefault();

          if (this.isSelectable()) {
            this.onSelect();
            if ((!props.describe && onlySelectLeaf) || expandedState === 'close') {
              this.onExpand();
            }
          }
        };
        if (props.draggable) {
          // domProps.draggable = true;
          // domProps['aria-grabbed'] = true;
          // domProps.onDragStart = this.onDragStart;
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
        >
          {title}
        </TitleWrap>
      );
    };

    const liProps = {};
    if (props.draggable) {
      // liProps.onDragEnter = this.onDragEnter;
      // liProps.onDragOver = this.onDragOver;
      // liProps.onDragLeave = this.onDragLeave;
      // liProps.onDrop = this.onDrop;
      // liProps.onDragEnd = this.onDragEnd;
    }

    const renderNoopSwitch = () => {
      const { viewClass, theme } = this.getIconTheme('SwitchIcon');

      return (
        <NullSwitch>
          <Icon
            viewClass={viewClass}
            theme={theme}
            singleTheme
            iconClass={'lugia-icon-financial_omit'}
          />
        </NullSwitch>
      );
    };
    const TreeItemWrapThemeProps = this.getThemeProps('TreeItemWrap', 'SelectedTreeItemWrap', {
      dragState,
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
        key={eventKey}
        themeProps={TreeItemWrapThemeProps}
        unselectable="on"
        inlineType={inlineType}
        {...liProps}
        isLeaf={isLeaf}
        selected={selected}
        title={title}
        color={color}
        height={itemHeight}
        {...addMouseEvent(this)}
      >
        <FlexWrap disabled={disabled} themeProps={TreeItemWrapThemeProps}>
          <FlexBox disabled={disabled} themeProps={TreeItemWrapThemeProps}>
            {!showSwitch || switchAtEnd
              ? null
              : canRenderSwitch
              ? this.renderSwitch(expandedState)
              : renderNoopSwitch()}

            {props.checkable ? this.renderCheckbox() : selectHandle()}
            {renderSuffixItems ? this.getRenderSuffixItems(item) : null}

            {switchAtEnd && canRenderSwitch ? this.renderSwitch(expandedState) : null}
          </FlexBox>
        </FlexWrap>
        {newChildren}
      </ItemWrap>
    );
  }
}

TreeNode.isTreeNode = 1;

export default ThemeHoc(TreeNode, 'TreeItem', { hover: true });
