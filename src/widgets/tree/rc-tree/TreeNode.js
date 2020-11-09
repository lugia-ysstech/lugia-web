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
import { getBorderRadius } from '../../theme/CSSProvider';
import get from '../../css/theme-common-dict';

import {
  FlexBox,
  FlexWrap,
  SubTreeWrap,
  TitleWrap,
  Switch,
  NullSwitch,
  TitleSpan,
  Li,
  Text,
  NavLi,
  SuffixWrap,
  CheckBoxContainer,
  SelectLine,
} from '../../css/tree';
import { getTreeThemeDefaultConfig } from '../../css/tree';

const defaultTitle = '---';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';

class TreeNode extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    disableCheckbox: PropTypes.bool,
    expanded: PropTypes.bool,
    isLeaf: PropTypes.bool,
    root: PropTypes.object,
    onSelect: PropTypes.func,
    checkedCSS: 'checkbox' | 'none',
  };

  static contextTypes = contextTypes;

  static defaultProps = {
    title: defaultTitle,
    checkedCSS: 'checkbox',
  };

  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      dragNodeHighlight: false,
    };
  }

  onCheck = e => {
    this.props.root.onCheck(this, e, this.props.item);
  };

  onSelect() {
    this.props.root.onSelect(this, this.props.item);
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
            {...this.props.dispatchEvent([['hover']], 'f2c')}
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
      halfChecked: indeterminate,
      title,
      disabled,
      parentIsHighlight,
      pos,
      shape,
      selected,
      describe,
      inlineType,
      checked,
    } = this.props;

    const TextThemeProps = this.getTitleWrapThemeProps('Text', 'SelectedText', {
      parentIsHighlight,
    });
    const domProps = {
      onContextMenu: this.onContextMenu,
    };
    return (
      <CheckBoxContainer>
        <CheckBox
          {...this.getCheckBoxTheme()}
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={this.onCheck}
        ></CheckBox>
        <TitleWrap
          themeProps={TextThemeProps}
          ref={this.saveSelectHandle}
          title={typeof title === 'string' ? title : ''}
          {...domProps}
          pos={pos}
          inlineType={inlineType}
          shape={shape}
          checked={checked}
          selected={selected}
          describe={describe}
          disabled={disabled}
          onClick={this.onCheck}
        >
          {this.getPreIcon()}
          <Text>{title}</Text>
          {this.getSuffixIcon()}
        </TitleWrap>
      </CheckBoxContainer>
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
    const { size } = this.props;
    const defaultTheme = getTreeThemeDefaultConfig(size, 'Checkbox');
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

  getSubTreeWrapTheme = () => {
    const { marginBottom, subTreeLevel } = this.props;
    const themeProps = this.props.getPartOfThemeProps('SubTreeWrap', {
      props: { paddingTop: marginBottom },
    });
    const { themeConfig: { normal } = {} } = themeProps;
    if (subTreeLevel !== 0 && normal && normal.background) {
      normal.background = 'transparent';
    }
    return themeProps;
  };

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
              themeProps={this.getSubTreeWrapTheme()}
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
        deepMerge(this.getDefaultTitleWrapTheme('normal', params.props, target), normal),
        TextExpanded
      );
    } else {
      themeConfig.normal = deepMerge(
        this.getDefaultTitleWrapTheme('normal', params.props, target),
        normal
      );
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
      themeConfig.normal = deepMerge(
        deepMerge(this.getDefaultTitleWrapTheme('normal', params.props, target), normal),
        TextExpanded
      );
    } else {
      themeConfig.normal = deepMerge(
        this.getDefaultTitleWrapTheme('normal', params.props, target),
        normal
      );
    }
    themeConfig.hover = deepMerge(
      this.getDefaultTitleWrapTheme('hover', params.props, target),
      hover
    );
    return themeProps;
  }

  getDefaultTitleWrapTheme(state: string, props: Object, target: string) {
    const { size, draggable } = this.props;
    const { mutliple, __navmenu } = props;
    const { dragState } = this.state;
    if (__navmenu || mutliple === true) {
      return {};
    }
    if (draggable && dragState === 'dragOver') {
      return deepMerge(getTreeThemeDefaultConfig(size, target)[state], {
        background: { color: 'transparent' },
      });
    }
    return getTreeThemeDefaultConfig(size, target)[state];
  }

  getSelectedParentTextThemeProps = (target, params) => {
    const themeProps = this.props.getPartOfThemeProps(target, params);
    const { themeConfig = {} } = themeProps;
    const { normal = {} } = themeConfig;
    const { themeConfig: parentTexThemeConfig = {} } = this.props.getPartOfThemeProps(
      'SelectedParentText'
    );
    const { normal: TextExpanded = {} } = this.props.getPartOfThemeProps('TextExpanded');
    themeConfig.normal = deepMerge(
      deepMerge(
        this.getDefaultTitleWrapTheme('normal', params.props, target),
        normal,
        parentTexThemeConfig.normal
      ),
      TextExpanded
    );
    return themeProps;
  };

  getTitleWrapThemeProps(defaultName: string, selectedName: string, params: Object = {}): Object {
    const { parentIsHighlight } = this.props;
    const targetName = this.isChecked() || parentIsHighlight ? selectedName : defaultName;
    if (this.isChecked()) {
      return this.getSelectedTitleWrapThemeProps(targetName, {
        props: params,
      });
    } else if (parentIsHighlight) {
      return this.getSelectedParentTextThemeProps(targetName, {
        props: params,
      });
    }
    return this.getDefaultTitleWrapThemeProps(targetName, {
      props: params,
    });
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
    const { viewClass, theme } = this.getIconTheme('PrefixIcon', 'SelectedPrefixIcon');

    return (
      <Icon
        iconClass={iconClass}
        src={prefixIconSrc}
        disabled={disabled}
        {...this.props.dispatchEvent([['hover'], ['active'], ['focus']], 'f2c')}
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

    const { viewClass, theme } = this.getIconTheme('SuffixIcon', 'SelectedSuffixIcon');

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
    const { size, parentIsHighlight, item } = this.props;
    let switchIconThemeHocProps;
    const defaultMarginLeft = {
      normal: {
        padding: {
          left: get('padding'),
        },
      },
    };
    const { viewClass: notOpenViewClass, theme: notOpenTheme } = this.props.getPartOfThemeHocProps(
      'SwitchIcon'
    );

    if (expandedState === 'open') {
      const { viewClass, theme } = parentIsHighlight
        ? this.props.getPartOfThemeHocProps('SelectedParentSwitchIconExpanded')
        : this.props.getPartOfThemeHocProps('SwitchIconExpanded');
      switchIconThemeHocProps = {
        viewClass,
        theme: {
          [viewClass]: deepMerge(
            getTreeThemeDefaultConfig(size, 'SwitchIconExpanded'),
            defaultMarginLeft,
            notOpenTheme[notOpenViewClass],
            theme[viewClass]
          ),
        },
      };
    } else {
      const { viewClass, theme } = parentIsHighlight
        ? this.props.getPartOfThemeHocProps('SelectedParentSwitchIcon')
        : this.props.getPartOfThemeHocProps('SwitchIcon');
      switchIconThemeHocProps = {
        viewClass: notOpenViewClass,
        theme: {
          [notOpenViewClass]: deepMerge(
            getTreeThemeDefaultConfig(size, 'SwitchIcon'),
            defaultMarginLeft,
            notOpenTheme[notOpenViewClass],
            theme[viewClass]
          ),
        },
      };
    }
    return switchIconThemeHocProps;
  };

  getIconTheme = (iconType: string, selectedIconType: string) => {
    const { checked, selected, size } = this.props;
    const { viewClass, theme } =
      checked || selected
        ? this.props.getPartOfThemeHocProps(selectedIconType)
        : this.props.getPartOfThemeHocProps(iconType);
    const marginLeft = iconType === 'SuffixIcon' ? get('paddingToText') : 0;
    const marginRight = iconType === 'PrefixIcon' ? get('marginToSameElement') : 0;
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
          [viewClass]: deepMerge(defaultTheme, getTreeThemeDefaultConfig(size, iconType)),
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
    const items = renderSuffixItems(
      itemObj,
      this.props.dispatchEvent([['hover'], ['active']], 'f2c')
    );
    const suffixItems = React.Children.map(items, item => {
      const { props } = item;
      return React.cloneElement(item, {
        ...props,
        ...this.props.dispatchEvent([['hover'], ['active']], 'f2c'),
      });
    });
    return <SuffixWrap>{suffixItems}</SuffixWrap>;
  };

  getSelectLineTheme = () => {
    const { getPartOfThemeProps, itemHeight, selectLinePosition } = this.props;
    const defaultSelectLineTheme = {
      themeConfig: {
        normal: {
          height: itemHeight,
          width: 4,
          borderRadius: getBorderRadius(2),
          background: { color: themeColor },
        },
      },
    };
    return deepMerge(
      defaultSelectLineTheme,
      getPartOfThemeProps('SelectLine', { props: { position: selectLinePosition } })
    );
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
      checkedCSS,
      marginBottom,
      indentDistance,
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
          <Text>{content}</Text>
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
          mutliple && this.onCheck(e);
          if (this.isSelectable()) {
            this.onSelect();
            if (onlySelectLeaf && (!props.describe || expandedState === 'close')) {
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
      const defaultMarginLeft = {
        normal: {
          padding: {
            left: get('padding'),
          },
        },
      };
      const {
        viewClass: switchIconViewClass,
        theme: switchIconTheme,
      } = this.props.getPartOfThemeHocProps('SwitchIcon');
      const { viewClass, theme } = {
        viewClass: switchIconViewClass,
        theme: {
          [switchIconViewClass]: deepMerge(defaultMarginLeft, switchIconTheme[switchIconViewClass]),
        },
      };
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
      marginBottom,
      hasChildren: !!item.children,
      indentDistance,
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
      >
        <FlexWrap disabled={disabled} themeProps={TreeItemWrapThemeProps} {...addMouseEvent(this)}>
          {__navmenu && inlineType === 'primary' && selected && (
            <SelectLine themeProps={this.getSelectLineTheme()} />
          )}
          <FlexBox disabled={disabled} themeProps={TreeItemWrapThemeProps}>
            {!showSwitch || switchAtEnd
              ? null
              : canRenderSwitch
              ? this.renderSwitch(expandedState)
              : renderNoopSwitch()}
            {props.checkable && checkedCSS === 'checkbox' ? this.renderCheckbox() : selectHandle()}
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
