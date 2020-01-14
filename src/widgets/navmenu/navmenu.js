/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Tree from '../tree';
import { deepMerge } from '@lugia/object-utils';
import DropMenu from '../dropmenu';
import Menu from '../menu';
import Tabs from '../tabs';
import styled from 'styled-components';
import { getTreeData } from '../menu/utils';
import { getValue, getInitExpandedPath } from '../cascader/utils';
import { DisplayField, ValueField } from '../consts/props';
import {
  HorizontalLightTheme,
  HorizontalDarkTheme,
  DarkTabsMenuTheme,
  LightTabsMenuTheme,
  PrimaryLightTheme,
  EllipseLightTheme,
  PrimaryDarkTheme,
  EllipseDarkTheme,
  LightMenuTheme,
  DarkMenuTheme,
} from '../css/navmenu';
import Icon from '../icon';

const MenuWrap = styled.div`
  display: inline-block;
  vertical-align: top;
`;

type RowData = { [key: string]: any };
type NavMenuProps = {
  pathSeparator?: string,
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
  themeStyle: 'light' | 'dark',
  separator?: string,
  igronSelectField?: String,
  autoHeight: boolean,
  switchAtEnd: boolean,
  getPartOfThemeHocProps: Function,
  activityValue: number,
  switchIconNames?: Object,
  renderSuffixItems?: Function,
};

type NavMenuState = {
  data: Array<RowData>,
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  activityValue: number,
};

export default class MenuTree extends React.Component<NavMenuProps, NavMenuState> {
  static defaultProps = {
    mode: 'inline',
    valueField: 'value',
    displayField: 'text',
    inlineExpandAll: true,
    themeStyle: 'light',
    inlineType: 'primary',
    pathSeparator: '/',
    separator: '|',
    switchAtEnd: true,
    igronSelectField: 'disabled',
    switchIconNames: {
      open: 'lugia-icon-direction_up',
      close: 'lugia-icon-direction_down',
    },
  };

  treeData: Array<Object>;

  constructor(props: NavMenuProps) {
    super(props);
    this.state = {
      data: props.data ? props.data : [],
      popupVisible: false,
      value: getValue(props, null),
      expandedPath: getInitExpandedPath(props),
      activityValue: props.activityValue ? props.activityValue : '',
    };
    const { pathSeparator } = props;
    this.treeData = getTreeData(this.props, pathSeparator);
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

  shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState) {
    const { props, state } = this;
    return (
      state.data !== nextState.data ||
      state.value !== nextState.value ||
      state.popupVisible !== nextState.popupVisible ||
      state.expandedPath !== nextState.expandedPath ||
      state.activityValue !== nextState.activityValue ||
      props.value !== nextProps.value ||
      props.inlineExpandAll !== nextProps.inlineExpandAll ||
      props.data !== nextProps.data ||
      props.inlineType !== nextProps.inlineType ||
      props.mode !== nextProps.mode ||
      props.valueField !== nextProps.valueField ||
      props.displayField !== nextProps.displayField ||
      props.themeStyle !== nextProps.themeStyle ||
      props.separator !== nextProps.separator ||
      props.autoHeight !== nextProps.autoHeight ||
      props.switchAtEnd !== nextProps.switchAtEnd ||
      props.activityValue !== nextProps.activityValue ||
      props.switchIconNames !== nextProps.switchIconNames ||
      props.renderSuffixItems !== nextProps.renderSuffixItems ||
      props.igronSelectField !== nextProps.igronSelectField
    );
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
    const {
      data,
      displayField,
      valueField,
      separator,
      autoHeight = false,
      themeStyle,
      divided,
      renderSuffixItems,
    } = this.props;
    const { popupVisible, value, expandedPath } = this.state;
    return (
      <MenuWrap>
        <Menu
          {...this.getMenuTheme(themeStyle)}
          data={data}
          separator={separator}
          autoHeight={autoHeight}
          popupVisible={popupVisible}
          valueField={valueField}
          displayField={displayField}
          action={'hover'}
          divided={divided}
          mutliple={false}
          handleIsInMenu={this.handleIsInMenu}
          onClick={this.handleClickMenu}
          selectedKeys={value}
          expandedPath={expandedPath}
          onExpandPathChange={this.onExpandPathChange}
          renderSuffixItems={renderSuffixItems}
        />
      </MenuWrap>
    );
  };

  onExpandPathChange = (expandedPath: string[]) => {
    this.setState({ expandedPath, popupVisible: true });
    this.setPopupVisible(true, { expandedPath });
  };

  getMenuValue = (value: string) => {
    const { separator } = this.props;
    const keyArray = value.split(separator);
    const len = keyArray.length;

    return keyArray[len];
  };

  handleClickMenu = (event: Object, keys: Object, item: Object) => {
    const { selectedKeys } = keys;

    if (!item || !item.children || item.children.length === 0) {
      this.setPopupVisible(false, { value: selectedKeys });
    }

    this.exposeOnChange(this.getMenuValue(selectedKeys[0]));
  };

  setPopupVisible(popupVisible: boolean, otherTarget?: Object = {}) {
    this.setState({ popupVisible, ...otherTarget });
  }

  getHorizontalNavMenu = () => {
    const tabsData = this.getTabsData();
    if (tabsData.length === 0) {
      const defaultTabsData = [
        {
          title: '皮卡丘',
          activityValue: '皮卡丘',
        },
        {
          title: '独角虫',
          activityValue: '独角虫',
        },
        {
          title: '小拉达',
          activityValue: '小拉达',
        },
        {
          title: '尼多兰',
          activityValue: '尼多兰',
        },
        {
          title: '皮皮',
          activityValue: '皮皮',
        },
      ];
      return (
        <Tabs
          tabType={'line'}
          {...this.getTabsTheme(this.props.themeStyle)}
          tabPosition={'top'}
          hideContent={true}
          data={defaultTabsData}
        />
      );
    }
    return (
      <Tabs
        tabType={'line'}
        {...this.getTabsTheme(this.props.themeStyle)}
        tabPosition={'top'}
        hideContent={true}
        onTabClick={this.onTabClick}
        data={tabsData}
        activityValue={this.state.activityValue}
        getTabpane={this.getTabpane}
      />
    );
  };

  getTabpane = (target: Object, i: number) => {
    const popup = this.getHorizontaMenu(i);
    return (
      <DropMenu
        offsetY={4}
        align={'bottomLeft'}
        menus={popup}
        action={'click'}
        hideAction={'click'}
      >
        {target}
      </DropMenu>
    );
  };

  getHorizontaMenu = (i: number) => {
    const { data = [], autoHeight = true, themeStyle } = this.props;
    const { children } = data[i];
    if (!children || children.length === 0) {
      return <span />;
    }
    return (
      <Menu
        action={'hover'}
        {...this.getTabsMenuTheme(themeStyle)}
        autoHeight={autoHeight}
        data={children}
        onClick={this.onClickTabsMenu}
      />
    );
  };

  getParentTarget = (text: string) => {
    const { valueField, data = [] } = this.props;
    const key = this.treeData
      .filter(treeItem => text === treeItem[valueField])[0]
      .path.split('/')[0];

    let parentItem;
    data.forEach((item, i) => {
      if (item[valueField] === key) {
        parentItem = item;
      }
    });
    return parentItem;
  };

  onClickTabsMenu = (event: Object, keys: string[], item: Object) => {
    const { valueField } = this.props;
    const { selectedKeys = [] } = keys;
    const { children } = item;
    if (!children || children.length === 0) {
      const activityValue = this.getParentTarget(item[valueField])[valueField];

      this.setState({ activityValue });
      this.exposeOnChange(this.getMenuValue(selectedKeys[0]));
    }
  };

  isHasChildren = (index: number) => {
    const { data = [] } = this.props;
    const children = data[index].children;
    return !!children && !!children.length;
  };

  onTabClick = (obj: Object) => {
    const { index, activityValue } = obj;
    const isHasChildren = this.isHasChildren(index);
    if (!isHasChildren) {
      this.exposeOnChange(activityValue);
      this.setState({ activityValue });
    }
  };

  getTabsData = () => {
    const { data = [], displayField = DisplayField, valueField = ValueField } = this.props;
    const tabsData = [];
    data.forEach(item => {
      const target = {};
      target.title = item[displayField];
      target.key = item[valueField];
      target.disabled = item.disabled;
      const { children = [] } = item;
      if (children && children.length !== 0) {
        target.suffixIcon = <Icon iconClass={'lugia-icon-direction_down'} />;
      }
      tabsData.push(target);
    });
    return tabsData;
  };

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

  getTabsTheme = (themeStyle: 'light' | 'dark') => {
    let defaultTheme;
    if (themeStyle === 'dark') {
      defaultTheme = HorizontalDarkTheme;
    } else {
      defaultTheme = HorizontalLightTheme;
    }

    return this.mergeTheme('Tabs', defaultTheme);
  };

  getTabsMenuTheme = (themeStyle: 'light' | 'dark') => {
    let defaultTheme;
    if (themeStyle === 'dark') {
      defaultTheme = DarkTabsMenuTheme;
    } else {
      defaultTheme = LightTabsMenuTheme;
    }

    return this.mergeTheme('Menu', defaultTheme);
  };

  getMenuTheme = (themeStyle: 'light' | 'dark') => {
    let defaultTheme;
    if (themeStyle === 'dark') {
      defaultTheme = DarkMenuTheme;
    } else {
      defaultTheme = LightMenuTheme;
    }

    return this.mergeTheme('Menu', defaultTheme);
  };

  getTreeTheme = (inlineType: 'primary' | 'ellipse', themeStyle: 'light' | 'dark') => {
    let defaultTheme;
    if (inlineType === 'ellipse') {
      if (themeStyle === 'dark') {
        defaultTheme = EllipseDarkTheme;
      } else {
        defaultTheme = EllipseLightTheme;
      }
    } else {
      if (themeStyle === 'dark') {
        defaultTheme = PrimaryDarkTheme;
      } else {
        defaultTheme = PrimaryLightTheme;
      }
    }
    return this.mergeTheme('Tree', defaultTheme);
  };

  getInlineNavMenu = () => {
    const { value } = this.state;
    const {
      inlineType,
      inlineExpandAll,
      valueField,
      displayField,
      autoHeight = true,
      themeStyle,
      switchIconNames,
      renderSuffixItems,
      pathSeparator,
      switchAtEnd,
      igronSelectField,
    } = this.props;

    const treeTheme = this.getTreeTheme(inlineType, themeStyle);

    return (
      <MenuWrap>
        <Tree
          {...treeTheme}
          switchIconNames={switchIconNames}
          expandAll={inlineExpandAll}
          switchAtEnd={switchAtEnd}
          autoHeight={autoHeight}
          showSwitch={true}
          __navmenu
          inlineType={inlineType}
          data={this.treeData}
          value={value}
          mutliple={false}
          valueField={valueField}
          displayField={displayField}
          onlySelectLeaf={true}
          onChange={this.onChange}
          igronSelectField={igronSelectField}
          pathSeparator={pathSeparator}
          renderSuffixItems={renderSuffixItems}
        />
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

  handleIsInMenu = (isInMenu: boolean) => {
    const { popupVisible } = this.state;
    if (popupVisible && isInMenu) {
      return;
    }
    setTimeout(() => {
      this.setState({ popupVisible: isInMenu });
    }, 220);
  };

  exposeOnChange(newValue: Object) {
    const { value = [] } = this.state;

    const oldValue = value[0];
    const { onChange, onSelect, onClick, displayField } = this.props;
    const newItem = this.getCheckedItem(newValue);
    const oldItem = this.getCheckedItem(oldValue);
    const obj = {
      newValue,
      oldValue,
      newItem,
      oldItem,
      newDisplayValue: newItem[displayField],
    };
    onChange && onChange(obj);
    onSelect && onSelect(obj);
    onClick && onClick(obj);
  }

  onChange = (value: string[]) => {
    const key = value[0];
    this.exposeOnChange(key);
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
