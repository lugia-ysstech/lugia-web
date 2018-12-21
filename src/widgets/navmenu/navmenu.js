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
  motif: 'light' | 'dark',
  separator?: string,
};

type NavMenuState = {
  data: Array<RowData>,
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  selectedKeys: string[],
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
    motif: 'light',
  };

  treeData: Array<Object>;

  constructor(props: NavMenuProps) {
    super(props);
    this.state = {
      data: props.data ? props.data : [],
      popupVisible: false,
      value: getValue(props, null),
      expandedPath: getInitExpandedPath(props),
      selectedKeys: getInitExpandedPath(props),
    };
    this.treeData = getTreeData(this.props);
  }

  static getDerivedStateFromProps(props: NavMenuProps, state: NavMenuState) {
    if (!state) {
      return {};
    }

    return {
      value: getValue(props, state),
      selectedKeys: state.value,
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
    const { popupVisible, selectedKeys, expandedPath } = this.state;
    const { width, submenuWidth, height } = this.getThemeTarget();
    const menuConfig = {
      [Widget.Menu]: {
        width,
        submenuWidth,
        height,
        autoHeight: true,
      },
    };
    return (
      <MenuWrap>
        <Theme config={menuConfig}>
          <Menu
            data={data}
            separator={separator}
            popupVisible={popupVisible}
            valueField={valueField}
            displayField={displayField}
            size={'large'}
            subsize={'bigger'}
            action={'hover'}
            mutliple={false}
            handleIsInMenu={this.handleIsInMenu}
            onClick={this.handleClickMenu}
            selectedKeys={selectedKeys}
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
    const { inlineType, inlineExpandAll, valueField, displayField, motif } = this.props;
    const { width, color } = this.getThemeTarget();
    const config = {
      [Widget.Tree]: {
        width,
        autoHeight: true,
        color,
      },
    };
    const treeData = this.treeData;
    return (
      <Theme config={config}>
        <Tree
          expandAll={inlineExpandAll}
          motif={motif}
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

  getExposeItem = (treeItem: Object) => {
    const { valueField = 'value', displayField = 'text' } = this.props;
    const obj = {};
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
    const treeItem = this.getCheckedItem(value);
    const item = this.getExposeItem(treeItem);
    const { onChange, onSelect } = this.props;
    onChange && onChange(item);
    onSelect && onSelect(item);
    this.setState({ value });
  };

  getCheckedItem(value: string[]): any {
    const key = value[0];
    const { valueField = 'value' } = this.props;
    return this.treeData.find(item => item[valueField] === key);
  }
}
