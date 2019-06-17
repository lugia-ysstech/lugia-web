/**
 * 菜单
 * create by szfeng
 *
 * @flow
 */
import type { MenuItemProps } from './item';
import Item from './item';
import '../common/shirm';
import * as React from 'react';
import {
  DefaultHeight,
  DefaultMenuItemHeight,
  DefaultWidth,
  getMenuItemHeight,
  MenuContainer,
  MenuItemHeight,
  RightIcon,
  TextIcon,
} from '../css/menu';
import ThemeProvider from '../theme-provider';
import ThrolleScroller from '../scroller/ThrottleScroller';
import Widget from '../consts/index';
import Theme from '../theme';
import Empty from '../empty';
import Trigger from '../trigger';
import { findDOMNode } from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import CommonIcon from '../icon';
import { DisplayField, ValueField } from '../consts/props';
import contains from 'rc-util/lib/Dom/contains';
import { getCanSeeCountRealy } from '../scroller/support';
import {
  getExpandDataOrSelectData,
  getExpandedPath,
  getInitAllChildData,
  getInitChildData,
  getPopupVisible,
  getSelectedKeys,
  getTargetOrDefaultTarget,
  getTargetOrDefaultTargetLazy,
  getTreeData,
  getexpandedPathInProps,
} from './utils';

const Placeholder = {};

export type TreeDataItem = {
  value: string,
  text: string,
  pid: string,
  path: string,
  isLeaf: boolean,
};

export type MenuProps = {
  start: number,
  level: number,
  wrapItem: (element: Object) => Object,
  end: number,
  getTheme: Function,
  getPrefix: Function,
  getSuffix: Function,
  svThemVersion?: number,
  mutliple: boolean,
  children: Array<React.Element<typeof Item>>,
  data: Array<Object>,
  selectedKeys?: string[],
  defaultSelectedKeys?: string[],
  valueField?: string,
  displayField?: string,
  indexOffsetY?: number,
  onClick?: Function,
  onChange?: Function,
  onMouseEnter?: Function,
  onExpandPathChange?: Function,
  limitCount?: number,
  size: 'large' | 'default' | 'bigger',
  checkedCSS: 'none' | 'background' | 'mark' | 'checkbox',
  offsetX: number,
  offsetY: number,
  popupVisible?: boolean,
  separator: string,
  action: 'hover' | 'click',
  subsize: 'large' | 'default' | 'bigger',
  mouseDownInMenus?: Function,
  pushMenuInstance?: Function,
  deleteMenuInstance?: Function,
  setSelectedKeys?: Function,
  selectedKeysData?: string[],
  expandedData?: string[],
  expandedPath?: string[],
  handleIsInMenu?: Function,
  setExpandedPath: Function,
  allChildData?: Array<Object>,
  treeData?: TreeDataItem[],
  getIndexOffsetY?: Function,
  autoHeight?: boolean,
  expandedPathInProps?: boolean,
  divided: boolean,
};
const EmptyData = [];

export type MenuState = {
  selectedKeys: string[],
  expandedPath: string[],
  popupVisible: boolean,
  childData: Array<Object>,
  indexOffsetY: number,
  expandedPathInProps: boolean,
};

function addPropsConfig(themeProps: Object, propsConfig: Object) {
  const newThemeProps = { ...themeProps };

  newThemeProps.propsConfig = propsConfig;
  return newThemeProps;
}

let SubMenu = () => <div />;

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    mutliple: false,
    start: 0,
    level: 0,
    displayField: DisplayField,
    valueField: ValueField,
    end: 0,
    separator: '|',
    checkedCSS: 'none',
    action: 'click',
    divided: false,
    getTheme: () => {
      return {};
    },
    size: 'default',
  };
  static displayName = Widget.Menu;
  isSelect: Function;
  allChildData: Object;
  trigger: Object | null;
  expandedData: string[];
  level2MenuInstance: { [level: string]: Object };
  treeData: Object[] | [];
  clickOutsideHandler: Function | null;
  touchOutsideHandler: Function | null;
  childMenu: any;

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      selectedKeys: getSelectedKeys(props, null),
      expandedPath: getExpandedPath(props, null),
      popupVisible: false,
      childData: getInitChildData(props, null),
      expandedPathInProps: getexpandedPathInProps(props),
      indexOffsetY: 0,
      start: 0,
    };

    this.treeData = getTreeData(props);
    this.updateIsSelect(this.state, this.props);
    this.updataExpandedData(this.state, this.props);
    this.allChildData = getInitAllChildData(props, this.state);
    this.level2MenuInstance = {};
  }

  static getDerivedStateFromProps(props: MenuProps, state: MenuState) {
    if (!state) {
      return {};
    }

    return {
      selectedKeys: getSelectedKeys(props, state),
      expandedPath: getExpandedPath(props, state),
      childData: getInitChildData(props, state),
      popupVisible: getPopupVisible(props, state),
    };
  }

  shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState) {
    const { props, state } = this;
    const dataChanged = props.data !== nextProps.data || props.children !== nextProps.children;
    const selectedChange = state.selectedKeys !== nextState.selectedKeys;
    if (dataChanged || selectedChange) {
      this.updateIsSelect(nextState, nextProps);
    }

    const expandedPathChanged = nextState.expandedPath !== state.expandedPath;
    if (expandedPathChanged) {
      this.allChildData = getInitAllChildData(nextProps, nextState);
      this.updataExpandedData(nextState, nextProps);
    }
    const popupChanged =
      nextState.popupVisible !== state.popupVisible || nextState.childData !== state.childData;

    return (
      dataChanged ||
      popupChanged ||
      props.start !== nextProps.start ||
      props.svThemVersion !== nextProps.svThemVersion ||
      selectedChange ||
      expandedPathChanged
    );
  }

  render() {
    const { props } = this;
    const items = this.getItems(props);

    const { data = [], size, autoHeight = false, getPartOfThemeProps } = props;

    const length = data ? data.length : 0;
    const menuItemHeight = getMenuItemHeight(size);
    const WrapThemeProps = addPropsConfig(getPartOfThemeProps('MenuWrap'), {
      length,
      size,
      autoHeight,
    });

    const bodyContent = (
      <MenuContainer themeProps={WrapThemeProps} level={this.props.level}>
        {items}
      </MenuContainer>
    );

    if (!Array.isArray(this.state.childData) || this.state.childData.length === 0) {
      return bodyContent;
    }

    const { offsetX, offsetY } = this.props;
    const { indexOffsetY } = this.state;

    const isOffsetX = !!(offsetX === 0 || offsetX);
    const activeOffsetX = getTargetOrDefaultTarget(isOffsetX, offsetX, 4);

    const isOffsetY = !!(offsetY === 0 || offsetY);
    const activeOffsetY = getTargetOrDefaultTarget(
      isOffsetY,
      offsetY,
      indexOffsetY * menuItemHeight
    );

    const { popupVisible = false, childData } = this.state;
    return (
      <Trigger
        ref={cmp => (this.trigger = cmp)}
        align={'rightTop'}
        lazy={false}
        offsetX={activeOffsetX}
        offsetY={activeOffsetY}
        createPortal
        popupVisible={popupVisible}
        popup={this.getPopupMenu(childData)}
      >
        {bodyContent}
      </Trigger>
    );
  }

  getItems(props: MenuProps): Object[] {
    let { start, end, checkedCSS = 'none', mutliple, data } = props;
    start = Math.round(start);
    end = Math.round(end);
    if (data && data.length > 0) {
      return this.computeItems(data, start, end, (obj: Object, isFirst: boolean) => {
        const { valueField, displayField, size, divided: propsDivided, getTheme } = this.props;

        const { [valueField]: key, [displayField]: value, disabled, children, icon, divided } = obj;
        const { getPrefix, getSuffix } = props;

        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        const isShowRightIconCondition = checkedCSS !== 'none' || mutliple === true;
        const rightIcon = getTargetOrDefaultTargetLazy(
          isShowRightIconCondition,
          () => null,
          () => this.getCascaderIcon(children)
        );

        if (obj === Placeholder) {
          return <li />;
        }
        const iconElement = icon ? <TextIcon iconClass={icon} /> : null;
        const { wrapItem, getPartOfThemeHocProps } = this.props;
        const { viewClass, theme } = getPartOfThemeHocProps('MenuItem');

        const result = (
          <Item
            key={key}
            size={size}
            disabled={disabled}
            checkedCSS={checkedCSS}
            divided={divided || propsDivided}
            theme={theme}
            viewClass={viewClass}
            isFirst={isFirst}
          >
            {prefix}
            {iconElement}
            {value}
            {suffix}
            {rightIcon}
          </Item>
        );
        return wrapItem ? wrapItem(result, { key, value }) : result;
      });
    }

    const { children } = props;
    if (children && children.length > 0) {
      return this.computeItems(children, start, end, (obj: Object) => obj);
    }

    const { width } = this.getTheme();
    return [
      <Theme config={{ [Widget.Empty]: { width } }}>
        <Empty />
      </Theme>,
    ];
  }

  getTheme() {
    const { getTheme } = this.props;
    const theme = getTheme();
    const { width = DefaultWidth } = theme;
    theme.width = width;
    return theme;
  }

  computeItems(data: Array<Object>, start: number, end: number, getItem: Function): Array<Object> {
    const items = [];
    let isFirst = true;
    for (let i = start; i < end; i++) {
      const item = data[i];
      const indexOffsetY = i - start;
      items.push(
        this.createMenuItemElement(getItem(item, isFirst), this.isSelect, item, indexOffsetY)
      );
      isFirst = false;
    }
    return items;
  }

  createMenuItemElement = (
    child: React.Element<typeof Item>,
    isSelect: Function,
    item: Object,
    indexOffsetY: number
  ) => {
    const { key, props } = child;
    const { disabled } = props;
    return React.cloneElement(
      child,
      this.fetchExtendProps(key, isSelect, item, disabled, indexOffsetY)
    );
  };

  fetchExtendProps(
    key: null | number | string,
    isSelect: Function,
    item: Object,
    disabled: boolean,
    indexOffsetY: number
  ): MenuItemProps {
    const { mutliple } = this.props;
    const eventConfig = this.onMenuItemEventHandler(key, item, disabled, indexOffsetY);

    if (!key || !isSelect(key)) {
      return { mutliple, ...eventConfig, checked: false, disabled };
    }

    return { checked: true, mutliple, ...eventConfig, disabled };
  }

  updateIsSelect(state: MenuState, props: MenuProps) {
    this.isSelect = this.createIsSelectFunction(state, props);
  }

  updataExpandedData(state: MenuState, props: MenuProps) {
    this.expandedData = this.createExpandedData(state, props);
  }

  createExpandedData(state: MenuState, props: MenuProps) {
    const { expandedPath } = state;
    return getExpandDataOrSelectData(props, expandedPath);
  }

  onMenuItemEventHandler = (
    key?: null | number | string,
    item: Object,
    disabled: boolean,
    indexOffsetY: number
  ): Object => {
    if (!key || disabled) {
      return {};
    }
    const { mutliple, onClick, onChange, limitCount = 999999, separator } = this.props;
    return {
      onClick: (event: Object) => {
        if (!key) {
          return;
        }

        this.setState({ indexOffsetY });

        const { selectedKeys } = this.state;

        let index = -1;
        index = selectedKeys.indexOf(key);

        const newSelectedKeys = this.fetchSelectedKeys({
          mutliple,
          key,
          separator,
          selectedKeys,
          index,
        });

        if (mutliple) {
          const canSelect = newSelectedKeys.length > limitCount;
          if (canSelect) {
            return;
          }
        }

        if (!mutliple) {
          const { children } = item;
          if (children) {
            this.updateExpandedPath('click', newSelectedKeys);
          } else {
            this.clearExpandedPath();
          }
        }
        const setSelectedKeys = this.getSetSelectedKeys();
        setSelectedKeys(newSelectedKeys);

        const keys = { selectedKeys: [...newSelectedKeys] };
        onClick && onClick(event, keys, item);
        onChange && onChange(keys);

        event.preventDefault();
        event.stopPropagation();
      },
      onMouseEnter: (event: Object) => {
        const { onMouseEnter } = this.props;
        if (mutliple === true) {
          return;
        }
        this.setState({ indexOffsetY });

        const expandedPath = this.getSelectedKeysOrExpandedPath(key, separator);
        this.updateExpandedPath('hover', expandedPath);
        onMouseEnter && onMouseEnter(event, item);
      },
      getIndexOffsetY: () => {
        const { getIndexOffsetY } = this.props;
        getIndexOffsetY && getIndexOffsetY(indexOffsetY);
      },
    };
  };

  clearExpandedPath = () => {
    const expandedPathInProps = getTargetOrDefaultTarget(
      this.isRoot(),
      this.state.expandedPathInProps,
      this.props.expandedPathInProps
    );
    if (!expandedPathInProps) {
      setTimeout(() => {
        this.updateExpandedPath('click', []);
        this.updateExpandedPath('hover', []);
      }, 100);
    }
  };

  fetchSelectedKeys = (config: {
    mutliple: boolean,
    key: any,
    separator: string,
    selectedKeys: string[],
    index: number,
  }): string[] => {
    const { mutliple, separator } = config;

    let { key } = config;
    key = key + '';
    if (!mutliple) {
      return this.getSelectedKeysOrExpandedPath(key, separator);
    }

    const { selectedKeys, index } = config;
    const newSelectedKeys = [...selectedKeys];
    const isNotInSelectedKeys = index === -1;
    if (isNotInSelectedKeys) {
      newSelectedKeys.push(key);
    } else {
      newSelectedKeys.splice(index, 1);
    }

    return newSelectedKeys;
  };

  updateExpandedPath(targetAction: string, expandedPath: string[]): boolean {
    const { props } = this;

    const { onExpandPathChange } = props;
    onExpandPathChange && onExpandPathChange(expandedPath);

    const { action, checkedCSS, level } = props;
    const isExpandedPathInProps = 'expandedPath' in props && level === 0;
    const notSetExpandedPathCondition =
      action !== targetAction || checkedCSS !== 'none' || isExpandedPathInProps;

    if (notSetExpandedPathCondition) {
      return false;
    }

    const setExpandedPath = this.getSetExpandedPath();
    setExpandedPath(expandedPath);
    return true;
  }

  getNewExpandedPathData = (key: string | number): any => {
    if (this.isRoot()) {
      return [key];
    }
    return this.mapTreeDataAndGetPath(key);
  };

  mapTreeDataAndGetPath(key: any): string[] {
    const { treeData = [] } = this.props;
    const targetItem = treeData.find(item => key === item.value);
    if (!targetItem) {
      return [];
    }
    const { path } = targetItem;
    return this.getNewPath(path, key);
  }

  getNewPath(oldPath: string, key: string) {
    const newPathData = oldPath.split('/');
    newPathData.push(key);
    return newPathData;
  }

  getSelectedKeysOrExpandedPath(key: any, separator: string) {
    const newExpandedData = this.getNewExpandedPathData(key);
    return [newExpandedData.join(separator)];
  }

  pushMenuInstance = (level: number, instance: Object) => {
    this.level2MenuInstance[level + ''] = instance;
  };

  deleteMenuInstance = (level: number) => {
    delete this.level2MenuInstance[level + ''];
  };

  mouseDownInMenus = (target: Object) => {
    const { handleIsInMenu } = this.props;
    const isInMenuRange = Object.values(this.level2MenuInstance).some((instance: any) => {
      const domNode = findDOMNode(instance);
      if (!domNode || !domNode.parentNode || !domNode.parentNode.parentNode) {
        return false;
      }
      return contains(domNode.parentNode.parentNode, target);
    });
    if (!isInMenuRange) {
      setTimeout(() => {
        this.clearExpandedPath();
      }, 100);
    }
    handleIsInMenu && handleIsInMenu(isInMenuRange);
    return isInMenuRange;
  };

  setSelectedKeys = (selectedKeys: string[]) => {
    this.setState({ selectedKeys });
  };

  setExpandedPath = (expandedPath: string[]) => {
    this.setState({ expandedPath });
  };

  getPopupMenu(childrenData: Object[] = []) {
    const {
      action,
      checkedCSS,
      offsetX,
      offsetY,
      separator,
      level,
      onClick,
      onMouseEnter,
      onExpandPathChange,
      onChange,
      popupVisible,
      displayField,
      valueField,
      mutliple,
      subsize,
      autoHeight,
    } = this.props;

    const { selectedKeys, expandedPath } = this.state;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    const y = offsetY === 0 || offsetY ? offsetY : null;
    const subMenuItenHeight = getMenuItemHeight(subsize);
    return (
      <SubMenu
        mutliple={mutliple}
        size={subsize}
        subsize={subsize}
        autoHeight={autoHeight}
        menuItemHeight={subMenuItenHeight}
        displayField={displayField}
        valueField={valueField}
        popupVisible={popupVisible}
        checkedCSS={checkedCSS}
        action={action}
        separator={separator}
        selectedKeys={selectedKeys}
        expandedPath={expandedPath}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onChange={onChange}
        onExpandPathChange={onExpandPathChange}
        ref={cmp => (this.childMenu = cmp)}
        data={childrenData}
        offsetX={x}
        offsetY={y}
        level={level + 1}
        pushMenuInstance={this.getPushMenuInstance()}
        deleteMenuInstance={this.getDeleteMenuInstance()}
        mouseDownInMenus={this.getMouseDownInMenus()}
        allChildData={this.getAllChildData()}
        treeData={this.getTreeData()}
        setSelectedKeys={this.getSetSelectedKeys()}
        setExpandedPath={this.getSetExpandedPath()}
        expandedData={this.getExpandedData()}
        selectedKeysData={this.getSelectedKeysData()}
        expandedPathInProps={this.getExpandedPathInProps()}
      />
    );
  }

  isRoot() {
    return this.props.level === 0;
  }

  getTreeData() {
    return getTargetOrDefaultTarget(this.isRoot(), this.treeData, this.props.treeData);
  }

  getExpandedData() {
    return getTargetOrDefaultTarget(this.isRoot(), this.expandedData, this.props.expandedData);
  }

  getAllChildData() {
    return getTargetOrDefaultTarget(this.isRoot(), this.allChildData, this.props.allChildData);
  }

  getSelectedKeysData() {
    const { props, state } = this;
    const { selectedKeys = [] } = state;
    return getTargetOrDefaultTargetLazy(
      this.isRoot(),
      () => getExpandDataOrSelectData(props, selectedKeys),
      () => props.selectedKeysData
    );
  }

  getMouseDownInMenus() {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.mouseDownInMenus,
      this.props.mouseDownInMenus
    );
  }

  getPushMenuInstance() {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.pushMenuInstance,
      this.props.pushMenuInstance
    );
  }

  getDeleteMenuInstance() {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.deleteMenuInstance,
      this.props.deleteMenuInstance
    );
  }

  getSetSelectedKeys = () => {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.setSelectedKeys,
      this.props.setSelectedKeys
    );
  };

  getSetExpandedPath = () => {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.setExpandedPath,
      this.props.setExpandedPath
    );
  };

  getExpandedPathInProps = () => {
    return getTargetOrDefaultTarget(
      this.isRoot(),
      this.state.expandedPathInProps,
      this.props.expandedPathInProps
    );
  };

  createIsSelectFunction = (state: MenuState, props: MenuProps) => {
    const existKey = {};
    let { selectedKeys = [] } = state;
    if (typeof selectedKeys === 'number') {
      selectedKeys = selectedKeys.toString();
    }

    const { level, separator } = props;
    const len = selectedKeys.length;
    if (selectedKeys && len > 0) {
      const { mutliple } = props;
      if (mutliple) {
        for (let i = 0; i < len; i++) {
          existKey[selectedKeys[i]] = true;
        }
      } else {
        const { selectedKeysData } = props;

        if (selectedKeys.length === 0) {
          return () => {};
        }

        const selectedKey = selectedKeys[0] + '';
        if (selectedKey.indexOf(separator) === -1) {
          existKey[selectedKeys[selectedKeys.length - 1]] = true;
        } else {
          const target = getTargetOrDefaultTargetLazy(
            this.isRoot(),
            () => getExpandDataOrSelectData(props, selectedKeys),
            () => selectedKeysData
          );
          existKey[target[level]] = true;
        }
      }
    }
    return (key: number | string) => {
      return existKey[key];
    };
  };

  forceAlign() {
    this.trigger && this.trigger.getThemeTarget().forceAlign();
    if (this.childMenu) {
      this.childMenu.getThemeTarget().scrollerTarget.forceAlign();
    }
  }

  componentDidUpdate() {
    const { level } = this.props;
    if (level === 0) {
      this.forceAlign();
    }
  }

  componentDidMount() {
    const { level } = this.props;
    if (level === 0) {
      this.forceAlign();
    }
    const pushMenuInstance = this.getPushMenuInstance();
    pushMenuInstance(this.props.level, this);

    let currentDocument;
    if (!this.clickOutsideHandler) {
      currentDocument = document;
      this.clickOutsideHandler = addEventListener(
        currentDocument,
        'mousedown',
        this.onDocumentClick
      );
    }
    // always hide on mobile
    if (!this.touchOutsideHandler) {
      currentDocument = currentDocument || document;
      this.touchOutsideHandler = addEventListener(
        currentDocument,
        'touchstart',
        this.onDocumentClick
      );
    }
  }

  clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }
  }

  onDocumentClick = (e: Object) => {
    const mouseDownInMenus = this.getMouseDownInMenus();
    if (mouseDownInMenus && !mouseDownInMenus(e.target)) {
      this.setState({ childData: EmptyData, popupVisible: false });
    }
  };

  componentWillUnmount() {
    const deleteMenuInstance = this.getDeleteMenuInstance();
    deleteMenuInstance && deleteMenuInstance(this.props.level);
    this.clearOutsideHandler();
  }

  getCascaderIcon = (children: Object[]) => {
    if (children && children.length > 0) {
      return (
        <RightIcon>
          <CommonIcon iconClass="lugia-icon-direction_right" />
        </RightIcon>
      );
    }
    return null;
  };
}

const Result = ThemeProvider(ThrolleScroller(Menu, MenuItemHeight, 'MenuWrap'), Widget.Menu);

Result.Placeholder = Placeholder;
Result.computeCanSeeCount = (
  height?: number = DefaultHeight,
  menuItemHeight?: number = DefaultMenuItemHeight
): number => {
  return Math.floor(getCanSeeCountRealy(height, menuItemHeight));
};

SubMenu = ThemeProvider(
  class SubMenu extends React.Component<MenuProps> {
    static displayName = Widget.SubMenu;
    svtarget: ?Object;

    render() {
      const { props } = this;
      const { getTheme } = props;
      return (
        <Theme config={{ [Widget.Menu]: getTheme() }}>
          <Result {...props} ref={cmp => (this.svtarget = cmp)} />
        </Theme>
      );
    }
  },
  Widget.SubMenu
);

export default Result;
