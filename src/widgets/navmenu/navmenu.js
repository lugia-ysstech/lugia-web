/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Tree from '../tree';
import Widget from '../consts/index';
import Theme from '../theme';
import Menu from '../menu';
import Tabs from '../tabs';
import styled from 'styled-components';
import Trigger from '../trigger';
import { getTreeData } from '../menu/utils';
import { getValue, getInitExpandedPath } from '../cascader/utils';
import { DefaultHeight, TreeUl, MenuItemHeight } from '../css/navmenu';
import { getMenuItemHeight } from '../css/menu';
import { DisplayField, ValueField } from '../consts/props';

import {
  themeColor,
  Switcher,
  NullSwitcher,
  Li,
  ChildrenUl,
  TitleWrap,
  TitleSpan,
} from '../css/navmenu';

const MenuWrap = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const Box = styled.div`
  display: block;
  width: 20px;
  height: 20px;
  background: red;
`;

type RowData = { [key: string]: any };
type NavMenuProps = {
  getTheme: Function,
  value: ?Array<string>,
  onSelect?: Function,
  onChange?: Function,
  inlineExpandAll?: boolean,
  data?: Array<RowData>,
  inlineType: 'primary' | 'ellipse',
  mode: 'vertical' | 'inline' | 'horizontal',
  onClick?: Function,
  valueField?: string,
  displayField?: string,
  theme: 'light' | 'dark',
  separator?: string,
  size: 'large' | 'default' | 'bigger',
};

type NavMenuState = {
  data: Array<RowData>,
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  activityValue: string,
  showMenuKey: string,
  isInTabs: boolean,
};
const openClassName = 'lugia-icon-direction_up';
const closeClassName = 'lugia-icon-direction_down';
const themeStyle = {
  DefaultHeight,
  TreeUl,
  themeColor,
  Switcher,
  NullSwitcher,
  Li,
  ChildrenUl,
  TitleWrap,
  TitleSpan,
  openClassName,
  closeClassName,
  MenuItemHeight,
};

export default class MenuTree extends React.Component<NavMenuProps, NavMenuState> {
  static defaultProps = {
    mode: 'inline',
    valueField: 'value',
    displayField: 'text',
    inlineExpandAll: true,
    theme: 'light',
    inlineType: 'primary',
    separator: '|',
  };

  treeData: Array<Object>;

  constructor(props: NavMenuProps) {
    super(props);
    this.state = {
      data: props.data ? props.data : [],
      popupVisible: false,
      value: getValue(props, null),
      expandedPath: getInitExpandedPath(props),
      showMenuKey: '',
      activityValue: '',
      isInTabs: false,
    };
    this.treeData = getTreeData(this.props);
  }

  static getDerivedStateFromProps(props: NavMenuProps, state: NavMenuState) {
    if (!state) {
      return {};
    }

    return {
      value: getValue(props, state),
      expandedPath: state.expandedPath,
    };
  }

  render() {
    return this.getNavMenu();
  }

  getNavMenu = () => {
    const { mode } = this.props;
    if (mode === 'vertical') {
      return this.getVerticalNavMenu();
    }

    if (mode === 'horizontal') {
      return this.getHorizontalNavMenu();
    }

    return this.getInlineNavMenu();
  };

  getVerticalNavMenu = () => {
    const { data, displayField, valueField, separator } = this.props;
    const { popupVisible, value, expandedPath } = this.state;
    const { width, height } = this.getThemeTarget();
    const menuConfig = {
      [Widget.Menu]: {
        width,
        height,
      },
    };
    return (
      <MenuWrap>
        <Theme config={menuConfig}>
          <Menu
            data={data}
            separator={separator}
            autoHeight={true}
            popupVisible={popupVisible}
            valueField={valueField}
            displayField={displayField}
            size={'large'}
            subsize={'bigger'}
            action={'hover'}
            mutliple={false}
            handleIsInMenu={this.handleIsInMenu}
            onClick={this.handleClickMenu}
            selectedKeys={value}
            expandedPath={expandedPath}
            onExpandPathChange={this.onExpandPathChange}
          />
        </Theme>
      </MenuWrap>
    );
  };

  onExpandPathChange = (expandedPath: string[]) => {
    this.setState({ expandedPath, popupVisible: true });
    this.setPopupVisible(true, { expandedPath });
  };

  handleClickMenu = (event: Object, keys: Object, item: Object) => {
    const { selectedKeys } = keys;
    if (!item || !item.children || item.children.length === 0) {
      this.setPopupVisible(false, { value: selectedKeys });
    }

    const exposeTarget = this.getExposeTarget(event, item, keys);
    const { onClick, onChange, onSelect } = this.props;
    onChange && onChange(exposeTarget);
    onSelect && onSelect(exposeTarget);
    onClick && onClick(exposeTarget);
  };

  getExposeTarget = (event: Object, item: Object, keys: string[]) => {
    const obj = {};
    obj.event = event;
    obj.item = item;
    obj.keys = keys;
    return obj;
  };

  setPopupVisible(popupVisible: boolean, otherTarget?: Object = {}) {
    this.setState({ popupVisible, ...otherTarget });
  }

  getThemeTarget = () => {
    const { getTheme } = this.props;
    return getTheme();
  };

  getHorizontalNavMenu = () => {
    const tabsData = this.getTabsData();
    const { width } = this.getThemeTarget();
    return (
      <Theme config={{ [Widget.Tabs]: { width } }}>
        <Tabs
          tabType={'line'}
          tabPosition={'top'}
          onTabClick={this.onTabClick}
          onTabMouseEnter={this.onTabMouseEnter}
          onTabMouseLeave={this.onTabMouseLeave}
          data={tabsData}
          activityValue={this.state.activityValue}
          getTabpane={this.getTabpane}
        />
      </Theme>
    );
  };

  getTabpane = (target: Object, i: number) => {
    const { popupVisible } = this.state;
    const popup = this.getHorizontaMenu(i);
    return (
      <Trigger
        offsetY={4}
        align={'bottomLeft'}
        createPortal
        popup={popup}
        action={'hover'}
        hideAction={'hover'}
        popupVisible={popupVisible}
      >
        {target}
      </Trigger>
    );
  };

  getHorizontaMenu = (i: number) => {
    const { data = [], valueField = ValueField } = this.props;
    const { showMenuKey } = this.state;
    const { children } = data[i];
    if (!children || children.length === 0 || showMenuKey !== data[i][valueField]) {
      return <div />;
    }
    return (
      <Theme config={{ [Widget.Menu]: { width: 120 } }}>
        <Menu
          action={'hover'}
          autoHeight
          data={children}
          onClick={this.onClickTabsMenu}
          handleIsInMenu={this.tabsHandleIsInMenu}
        />
      </Theme>
    );
  };

  getParentValueField = (text: string) => {
    const { valueField } = this.props;
    return this.treeData.filter(treeItem => text === treeItem[valueField])[0].path.split('/')[0];
  };

  onClickTabsMenu = (event: Object, keys: string[], item: Object) => {
    const { valueField } = this.props;
    const { children } = item;
    if (!children || children.length === 0) {
      const activityValue = this.getParentValueField(item[valueField]);
      this.setState({ activityValue });
      this.exposeOnChange(item);
      setTimeout(() => {
        this.setState({ popupVisible: false });
      }, 100);
    }
  };

  isHasChildren = (activeKeys: string) => {
    const { data = [], valueField = ValueField } = this.props;
    const children = data.filter(item => item[valueField] === activeKeys)[0].children;
    return !!children && !!children.length;
  };

  getExposeTabsItem = (activityValue: string): Object => {
    const { data = [], valueField = ValueField } = this.props;
    return data.find(item => item[valueField] === activityValue);
  };

  onTabClick = (activityValue: string) => {
    const isHasChildren = this.isHasChildren(activityValue);
    if (!isHasChildren) {
      const item = this.getExposeTabsItem(activityValue);
      this.exposeOnChange(item);
      this.setState({ activityValue });
    } else {
      return;
    }
  };

  onTabMouseEnter = (activeKey: string) => {
    const isHasChildren = this.isHasChildren(activeKey);
    const popupVisible = isHasChildren ? true : false;
    this.setState({ popupVisible, showMenuKey: activeKey, isInTabs: true });
  };

  onTabMouseLeave = (activeKey: string) => {
    this.setState({ isInTabs: false });
  };

  getTabsData = () => {
    const { data = [], displayField = DisplayField, valueField = ValueField } = this.props;
    const tabsData = [];
    data.forEach((item, i) => {
      const target = {};
      target.title = item[displayField];
      target.content = <div />;
      target.activityValue = item[valueField];
      tabsData.push(target);
    });
    return tabsData;
  };

  getInlineNavMenu = () => {
    const { value } = this.state;
    const {
      inlineType,
      inlineExpandAll,
      valueField,
      displayField,
      theme,
      size = 'bigger',
    } = this.props;
    const { width, color, height, paddingLeft } = this.getThemeTarget();
    const config = {
      [Widget.Tree]: {
        width,
        height,
        paddingLeft,
        color,
      },
    };
    const treeData = this.treeData;
    const activeMenuItemHeight = getMenuItemHeight(size);
    themeStyle.MenuItemHeight = activeMenuItemHeight;
    return (
      <MenuWrap>
        <Theme config={config}>
          <Tree
            expandAll={inlineExpandAll}
            theme={theme}
            autoHeight={true}
            inlineType={inlineType}
            data={treeData}
            size={size}
            value={value}
            mutliple={false}
            valueField={valueField}
            displayField={displayField}
            onlySelectLeaf={true}
            onChange={this.onChange}
            themeStyle={themeStyle}
          />
        </Theme>
      </MenuWrap>
    );
  };

  getExposeItem = (treeItem: ?Object) => {
    const obj = {};
    if (!treeItem) {
      return obj;
    }
    const { valueField = 'value', displayField = 'text' } = this.props;
    obj[valueField] = treeItem[valueField];
    obj[displayField] = treeItem[displayField];
    return obj;
  };

  tabsHandleIsInMenu = (isInMenu: boolean) => {
    const { isInTabs } = this.state;
    if (isInTabs || isInMenu) {
      return;
    }
    setTimeout(() => {
      this.setState({ popupVisible: false });
    }, 220);
  };

  handleIsInMenu = (isInMenu: boolean) => {
    const { popupVisible } = this.state;
    if (popupVisible && isInMenu) {
      return;
    }
    setTimeout(() => {
      this.setState({ popupVisible: isInMenu });
    }, 220);
  };

  exposeOnChange(obj: Object) {
    const { onChange, onSelect } = this.props;
    onChange && onChange(obj);
    onSelect && onSelect(obj);
  }

  onChange = (value: string[]) => {
    const key = value[0];
    const treeItem = this.getCheckedItem(key);
    const item = this.getExposeItem(treeItem);
    this.exposeOnChange(item);
    this.setState({ value });
  };

  getCheckedItem(key: string): ?Object {
    if (!key) {
      return {};
    }
    const { valueField = ValueField } = this.props;
    return this.treeData.find(item => item[valueField] === key);
  }
}
