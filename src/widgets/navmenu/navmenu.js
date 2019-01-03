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
import styled from 'styled-components';
import { getTreeData } from '../menu/utils';
import { getValue, getInitExpandedPath } from '../cascader/utils';
import { MenuItemHeight, DefaultHeight } from '../css/navmenu';
import { TreeUl } from '../css/navmenu';
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
`;

type RowData = { [key: string]: any };
type NavMenuProps = {
  getTheme: Function,
  onScroller?: Function,
  onlySelectLeaf: boolean,
  displayField: string,
  igronSelectField?: string,
  value: ?Array<string>,
  displayValue: ?Array<string>,
  defaultValue: ?Array<string>,
  onExpand?: Function,
  onSelect?: Function,
  onChange?: Function,
  inlineExpandAll?: boolean,
  data?: Array<RowData>,
  inlineType: 'primary' | 'ellipse',
  mode: 'vertical' | 'inline',
  onClick?: Function,
  valueField?: string,
  displayField?: string,
  theme: 'light' | 'dark',
  separator?: string,
};

type NavMenuState = {
  data: Array<RowData>,
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
};
const openClassName = 'lugia-icon-direction_up';
const closeClassName = 'lugia-icon-direction_down';
const themeStyle = {
  MenuItemHeight,
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

    return this.getInlineNavMenu();
  };

  getVerticalNavMenu = () => {
    const { data, displayField, valueField, separator } = this.props;
    const { popupVisible, value, expandedPath } = this.state;
    const { width, submenuWidth, height } = this.getThemeTarget();
    const menuConfig = {
      [Widget.Menu]: {
        width,
        submenuWidth,
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

    const { onClick, onChange } = this.props;
    onChange && onChange(keys, item);
    onClick && onClick(keys, item);
  };

  setPopupVisible(popupVisible: boolean, otherTarget?: Object = {}) {
    this.setState({ popupVisible, ...otherTarget });
  }

  getThemeTarget = () => {
    const { getTheme } = this.props;
    return getTheme();
  };

  getInlineNavMenu = () => {
    const { value } = this.state;
    const { inlineType, inlineExpandAll, valueField, displayField, theme } = this.props;
    const { width, color, height } = this.getThemeTarget();
    const config = {
      [Widget.Tree]: {
        width,
        height,
        color,
      },
    };
    const treeData = this.treeData;
    return (
      <Theme config={config}>
        <Tree
          expandAll={inlineExpandAll}
          theme={theme}
          autoHeight={true}
          inlineType={inlineType}
          data={treeData}
          size={'bigger'}
          value={value}
          mutliple={false}
          valueField={valueField}
          displayField={displayField}
          onlySelectLeaf={true}
          onChange={this.onChange}
          themeStyle={themeStyle}
        />
      </Theme>
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
    this.setState({ popupVisible: isInMenu });
  };

  onChange = (value: string[]) => {
    const key = value[0];
    const treeItem = this.getCheckedItem(key);
    const item = this.getExposeItem(treeItem);
    const { onChange, onSelect } = this.props;
    onChange && onChange(item);
    onSelect && onSelect(item);
    this.setState({ value });
  };

  getCheckedItem(key: string): ?Object {
    if (!key) {
      return {};
    }
    const { valueField = 'value' } = this.props;
    return this.treeData.find(item => item[valueField] === key);
  }
}
