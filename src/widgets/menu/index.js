/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import Item from './item';
import { DefaultHeight, MenuItemHeight, LeftIcon, RightIcon, MenuContainer } from '../css/menu';
import ThemeProvider from '../theme-provider';
import ThrolleScroller from '../scroller/ThrottleScroller';
import Widget from '../consts/index';
import '../css/sv.css';
import Theme from '../theme';
import { adjustValue } from '../utils';
import Trigger from '../trigger';
import { findDOMNode } from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import CommonIcon from '../icon';
import { DisplayField, ValueField } from '../consts/props';
import contains from 'rc-util/lib/Dom/contains';
import { getCanSeeCountRealy } from '../scroller/support';
import {
  getTreeData,
  getSelectedKeys,
  getPopupVisible,
  getExpandedPath,
  getInitChildData,
  getInitAllChildData,
  getTargetOrDefaultTarget,
  getExpandDataOrSelectData,
} from './utils';

const Placeholder = {};

type MenuItemProps = {|
  mutliple: boolean,
  action: string,
  onClick: Function,
  popupVisible?: boolean,
  separator: string,
  size: 'large' | 'small' | 'bigger',
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
|};

type treeDataItem = {
  key: string,
  title: string,
  pid: string,
  path: string,
  isLeaf: boolean,
};

type MenuProps = {
  start: number,
  level: number,
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
  onMouseLeave?: Function,
  limitCount?: number,
  disabled?: boolean,
  checkbox?: boolean,
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
  offsetX: number,
  offsetY: number,
  popupVisible?: boolean,
  separator: string,
  cancelData: Array<Object>,
  action: 'hover' | 'click',
  size: string,
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
  treeData?: treeDataItem[],
  getIndexOffsetY?: Function,
};
const EmptyData = [];
type MenuState = {
  selectedKeys: string[],
  expandedPath: string[],
  popupVisible: boolean,
  childData: Array<Object>,
  indexOffsetY: number,
};

let Result = () => <div />;

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
    getTheme: () => {
      return {};
    },
    size: 'bigger',
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
    let { start, end, checkedCSS = 'none', mutliple, size, data } = props;
    start = Math.round(start);
    end = Math.round(end);
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { valueField, displayField } = this.props;
        const { [valueField]: key, [displayField]: value, disabled, children, icon } = obj;
        const { getPrefix, getSuffix } = props;

        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        const isShowRightIconCondition = checkedCSS !== 'none' || mutliple === true;
        const rightIcon = getTargetOrDefaultTarget(
          isShowRightIconCondition,
          null,
          this.getCascaderIcon(children)
        );

        if (obj === Placeholder) {
          return <li />;
        }

        const Icon = icon ? <LeftIcon iconClass={icon} /> : null;
        return (
          <Item key={key} size={size} disabled={disabled} checkedCSS={checkedCSS}>
            {prefix}
            {Icon}
            {value}
            {suffix}
            {rightIcon}
          </Item>
        );
      });
    } else {
      const { children } = props;
      if (children && children.length > 0) {
        items = this.computeItems(children, start, end, (obj: Object) => obj);
      }
    }
    const bodyContent = (
      <MenuContainer theme={this.getTheme()} level={this.props.level}>
        {items}
      </MenuContainer>
    );
    if (!Array.isArray(this.state.childData) || this.state.childData.length === 0) {
      return bodyContent;
    }

    const { offsetX, offsetY, getTheme } = this.props;
    const { popupVisible = false, childData, indexOffsetY } = this.state;
    const isOffsetX = offsetX === 0 || offsetX;
    const isOffsetY = offsetY === 0 || offsetY;
    const activeOffsetX = getTargetOrDefaultTarget(!!isOffsetX, offsetX, 4);
    const activeOffsetY = getTargetOrDefaultTarget(
      !!isOffsetY,
      offsetY,
      indexOffsetY * MenuItemHeight
    );
    const { submenuWidth } = getTheme();
    return (
      <Theme config={{ [Widget.Trigger]: { width: submenuWidth } }}>
        <Trigger
          ref={cmp => (this.trigger = cmp)}
          align={'rightTop'}
          offsetX={activeOffsetX}
          offsetY={activeOffsetY}
          createPortal
          popupVisible={popupVisible}
          popup={this.getPopupMenu(childData)}
        >
          {bodyContent}
        </Trigger>
      </Theme>
    );
  }

  getTheme() {
    const { getTheme } = this.props;
    const theme = getTheme();
    const { height = DefaultHeight } = theme;
    theme.height = adjustValue(height, MenuItemHeight);
    return theme;
  }

  onMouseLeave = (e: Object) => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  computeItems(data: Array<Object>, start: number, end: number, getItem: Function): Array<Object> {
    const items = [];
    for (let i = start; i < end; i++) {
      const item = data[i];
      const indexOffsetY = i - start;
      items.push(this.renderMenuItem(getItem(item), this.isSelect, item, indexOffsetY));
    }
    return items;
  }

  renderMenuItem = (
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
    key?: null | number | string,
    isSelect: Function,
    item: Object,
    disabled: boolean,
    indexOffsetY: number
  ): MenuItemProps {
    const { mutliple, checkbox } = this.props;
    const eventConfig = this.onMenuItemEventHandler(key, item, disabled, indexOffsetY);
    if (!key || !isSelect(key)) {
      return { mutliple, ...eventConfig, checked: false, checkbox, disabled };
    }

    return { checked: true, mutliple, ...eventConfig, disabled };
  }

  updateIsSelect(state: MenuState, props: MenuProps) {
    this.isSelect = this.createSelect(state, props);
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
        const str = key + '';
        let { selectedKeys = [] } = this.state;

        if (mutliple) {
          const index = selectedKeys.indexOf(str);
          const noIn = index === -1;
          if (noIn) {
            if (selectedKeys.length < limitCount) {
              selectedKeys.push(str);
            } else {
              return;
            }
          } else {
            selectedKeys.splice(index, 1);
          }
        } else {
          selectedKeys = this.getSelectedKeysOrExpandedPath(key, separator);
          const setSelectedKeys = this.getSetSelectedKeys();
          setSelectedKeys(selectedKeys);

          this.IsSetExpandedPath('click', selectedKeys);
        }

        /**
         *  add by szfeng
         */

        const keys = { selectedKeys: [...selectedKeys] };
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

        const expandedPath = this.getSelectedKeysOrExpandedPath(key, separator);
        this.IsSetExpandedPath('hover', expandedPath);

        onMouseEnter && onMouseEnter(event, expandedPath, item);
      },
      getIndexOffsetY: () => {
        const { getIndexOffsetY } = this.props;
        getIndexOffsetY && getIndexOffsetY(indexOffsetY);
      },
    };
  };

  IsSetExpandedPath(targetAction: string, expandedPath: string[]) {
    const { props } = this;
    const { action, checkedCSS, level } = props;
    const isExpandedPathInProps = 'expandedPath' in props && level === 0;
    const notSetExpandedPathCondition =
      action !== targetAction || checkedCSS !== 'none' || isExpandedPathInProps;
    if (notSetExpandedPathCondition) {
      return;
    }

    const setExpandedPath = this.getSetExpandedPath();
    setExpandedPath(expandedPath);
  }

  getNewExpandedPathData = (key: string | number): any => {
    if (this.isRoot()) {
      return [key];
    }
    return this.mapTreeDataAndGetPath(key);
  };

  mapTreeDataAndGetPath(key: string | number): string[] {
    const { treeData = [], separator } = this.props;
    let newPath = [];
    treeData.forEach(item => {
      if (key === item.key) {
        newPath = this.getNewPath(item.path, separator, key);
      }
    });
    return newPath;
  }

  getNewPath(oldPath: string, separator: string, key: string | number) {
    const newPathData = oldPath.split('/');
    newPathData.push(key);
    return newPathData;
  }

  getSelectedKeysOrExpandedPath(key: number | string, separator: string) {
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
      return contains(domNode.parentNode.parentNode, target);
    });
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
      onChange,
      popupVisible,
      displayField,
      valueField,
    } = this.props;
    const { selectedKeys, expandedPath } = this.state;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    const y = offsetY === 0 || offsetY ? offsetY : null;
    return (
      <Result
        mutliple={false}
        ref={cmp => (this.childMenu = cmp)}
        data={childrenData}
        displayField={displayField}
        valueField={valueField}
        popupVisible={popupVisible}
        checkedCSS={checkedCSS}
        action={action}
        separator={separator}
        selectedKeys={selectedKeys}
        expandedPath={expandedPath}
        offsetX={x}
        offsetY={y}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onChange={onChange}
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
    return getTargetOrDefaultTarget(
      this.isRoot(),
      getExpandDataOrSelectData(props, selectedKeys),
      props.selectedKeysData
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

  createSelect = (state: MenuState, props: MenuProps) => {
    const existKey = {};
    const { selectedKeys = [] } = state;
    const { level } = props;
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

        const target = getTargetOrDefaultTarget(
          this.isRoot(),
          getExpandDataOrSelectData(props, selectedKeys),
          selectedKeysData
        );

        existKey[target[level]] = true;
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
    if (!mouseDownInMenus(e.target)) {
      this.setState({ childData: EmptyData, popupVisible: false });
    }
  };

  componentWillUnmount() {
    const deleteMenuInstance = this.getDeleteMenuInstance();
    deleteMenuInstance(this.props.level);
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

Result = ThemeProvider(ThrolleScroller(Menu, MenuItemHeight), Widget.Menu);

Result.Placeholder = Placeholder;
Result.computeCanSeeCount = (height?: number = DefaultHeight): number => {
  return Math.floor(getCanSeeCountRealy(height, MenuItemHeight));
};
Result.MenuItem = Item;
export default Result;
